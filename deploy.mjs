#!/usr/bin/env node
/**
 * deploy.mjs — Deploy social-design-review to Bunny.net Storage
 *
 * Usage:
 *   node deploy.mjs
 *
 * Required env vars (put them in .env.bunny or export them):
 *   BUNNY_STORAGE_KEY      — Storage zone API key (from Storage Zone → FTP & API Access)
 *   BUNNY_STORAGE_ZONE     — Storage zone name (e.g. "social-design-review")
 *   BUNNY_STORAGE_REGION   — Region prefix: "" (default/EU), "de", "se", "ny", "la", "sg", "syd"
 *
 * Optional (enables cache purge after deploy):
 *   BUNNY_ACCOUNT_KEY      — Main account API key (from Account Settings)
 *   BUNNY_PULL_ZONE_ID     — Pull Zone ID (numeric, from Pull Zone settings)
 */

import { execSync } from 'child_process';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, extname } from 'path';
import { fileURLToPath } from 'url';

// ─── Load .env.bunny if present ───────────────────────────────────────────────
const __dir = fileURLToPath(new URL('.', import.meta.url));
try {
  const raw = readFileSync(join(__dir, '.env.bunny'), 'utf8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key && !process.env[key]) process.env[key] = rest.join('=').trim();
  }
} catch { /* .env.bunny not present — rely on shell env */ }

// ─── Config ───────────────────────────────────────────────────────────────────
const STORAGE_KEY    = process.env.BUNNY_STORAGE_KEY;
const STORAGE_ZONE   = process.env.BUNNY_STORAGE_ZONE;
const STORAGE_REGION = (process.env.BUNNY_STORAGE_REGION || '').toLowerCase();
const ACCOUNT_KEY    = process.env.BUNNY_ACCOUNT_KEY;
const PULL_ZONE_ID   = process.env.BUNNY_PULL_ZONE_ID;

if (!STORAGE_KEY || !STORAGE_ZONE) {
  console.error('❌  Missing BUNNY_STORAGE_KEY or BUNNY_STORAGE_ZONE');
  console.error('    Copy .env.bunny.example → .env.bunny and fill in your values.');
  process.exit(1);
}

// Region-specific storage hostname
const storageHost = STORAGE_REGION
  ? `${STORAGE_REGION}.storage.bunnycdn.com`
  : 'storage.bunnycdn.com';

// ─── MIME types ───────────────────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml',
  '.webmanifest': 'application/manifest+json',
};

function mime(filepath) {
  return MIME[extname(filepath).toLowerCase()] || 'application/octet-stream';
}

// ─── Walk dist/ recursively ───────────────────────────────────────────────────
function walk(dir, base = dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walk(full, base));
    else files.push({ full, rel: relative(base, full).replace(/\\/g, '/') });
  }
  return files;
}

// ─── Upload one file ──────────────────────────────────────────────────────────
async function upload(file) {
  const url = `https://${storageHost}/${STORAGE_ZONE}/${file.rel}`;
  const body = readFileSync(file.full);
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      AccessKey:       STORAGE_KEY,
      'Content-Type':  mime(file.full),
    },
    body,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`HTTP ${res.status} for ${file.rel}: ${msg}`);
  }
}

// ─── Purge pull zone cache ────────────────────────────────────────────────────
async function purgeCache() {
  if (!ACCOUNT_KEY || !PULL_ZONE_ID) {
    console.log('ℹ️   Cache purge skipped (BUNNY_ACCOUNT_KEY / BUNNY_PULL_ZONE_ID not set)');
    return;
  }
  process.stdout.write('🗑️   Purging pull zone cache... ');
  const res = await fetch(
    `https://api.bunny.net/pullzone/${PULL_ZONE_ID}/purgeCache`,
    {
      method: 'POST',
      headers: { AccessKey: ACCOUNT_KEY, 'Content-Type': 'application/json' },
    }
  );
  if (!res.ok) {
    console.warn(`\n⚠️   Cache purge returned HTTP ${res.status} — you may need to purge manually.`);
  } else {
    console.log('done');
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🔨  Building...');
  execSync('npm run build', { stdio: 'inherit', cwd: __dir });

  const distDir = join(__dir, 'dist');
  const files   = walk(distDir);

  console.log(`\n📤  Uploading ${files.length} files to ${storageHost}/${STORAGE_ZONE}/\n`);

  let done = 0;
  const CONCURRENCY = 8;

  // Upload in batches to avoid overwhelming the API
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async f => {
        await upload(f);
        done++;
        process.stdout.write(`\r  ✓ ${done}/${files.length}  ${f.rel.padEnd(60)}`);
      })
    );
  }

  console.log('\n');
  await purgeCache();
  console.log('✅  Deploy complete!\n');
}

main().catch(err => {
  console.error('\n❌ ', err.message);
  process.exit(1);
});
