import { ANALYSIS_SYSTEM_PROMPT, DESIGN_SYSTEM_PROMPT, buildConceptPrompt, buildDesignPrompt } from '../data/framework';
import { createProvider } from '../providers';
import { parseAnalysisResponse, parseDesignResponse } from '../providers/base';
import { buildFileContext } from './fileProcessing';

/**
 * Fetch the actual page content from a URL via CORS proxies.
 */
async function fetchPageContent(url) {
  const PROXIES = [
    (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
  ];

  for (const proxyFn of PROXIES) {
    try {
      const proxyUrl = proxyFn(url);
      const resp = await fetch(proxyUrl, { signal: AbortSignal.timeout(15000) });
      if (!resp.ok) continue;
      const html = await resp.text();
      if (html.length < 100) continue;
      return stripHtmlToText(html);
    } catch {
      continue;
    }
  }
  return null;
}

/**
 * Strip HTML and extract meaningful text.
 */
function stripHtmlToText(html) {
  let clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '');

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);

  let meta = '';
  if (titleMatch) meta += `Page title: ${titleMatch[1].trim()}\n`;
  if (descMatch) meta += `Meta description: ${descMatch[1].trim()}\n`;
  if (ogDescMatch) meta += `OG description: ${ogDescMatch[1].trim()}\n`;

  const links = [];
  const linkRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(html)) !== null && links.length < 40) {
    const href = linkMatch[1];
    const text = linkMatch[2].replace(/<[^>]+>/g, '').trim();
    if (text && text.length > 1 && text.length < 100 && !href.startsWith('#') && !href.startsWith('javascript')) {
      links.push(`${text} -> ${href}`);
    }
  }

  const headings = [];
  const headingRegex = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi;
  let hMatch;
  while ((hMatch = headingRegex.exec(html)) !== null && headings.length < 30) {
    const text = hMatch[1].replace(/<[^>]+>/g, '').trim();
    if (text) headings.push(text);
  }

  let bodyText = clean
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  if (bodyText.length > 6000) {
    bodyText = bodyText.slice(0, 6000) + '... [truncated]';
  }

  let result = '';
  if (meta) result += `=== META INFO ===\n${meta}\n`;
  if (headings.length) result += `=== PAGE HEADINGS ===\n${headings.join('\n')}\n\n`;
  if (links.length) result += `=== NAVIGATION & LINKS ===\n${links.join('\n')}\n\n`;
  result += `=== PAGE CONTENT ===\n${bodyText}\n`;

  return result;
}


/**
 * Rebuild directory lines per dimension, loaded once per run. Lazily imported
 * so the ~146KB dataset stays out of the main bundle, and failure is non-fatal:
 * a review without European comparators is still a review.
 */
async function loadEuropeanExamples(concepts) {
  try {
    const { directoryLines } = await import('../data/rebuildDirectory');
    const map = {};
    concepts.forEach(c => { map[c.id] = directoryLines(c.id, 6); });
    return map;
  } catch {
    return {};
  }
}

/**
 * Rate limits are a normal condition here, not an exceptional one.
 *
 * A full 13-dimension run costs roughly 96k tokens (a ~3.7k-token system prompt
 * plus page content, times thirteen, plus reserved output). On a 30k tokens-per-
 * minute key that cannot physically complete inside one minute — so the ceiling
 * WILL be reached on any tier-1 key, and the correct response is to wait, not to
 * discard the dimension. Previously a 429 became a permanent per-dimension error
 * even though the API had replied "try again in 5.572s".
 */
const RETRYABLE_STATUS = new Set([408, 409, 425, 429, 500, 502, 503, 504]);
const MAX_ATTEMPTS = 5;
const MAX_BACKOFF_MS = 60000;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function isRetryable(err) {
  if (RETRYABLE_STATUS.has(err?.status)) return true;
  // Network blips surface as TypeError with no status
  if (err?.status === undefined && /fetch|network|load failed/i.test(err?.message || '')) return true;
  return false;
}

/**
 * Prefer the server's own hint; otherwise exponential backoff with jitter so a
 * whole batch does not wake up and retry in lockstep.
 */
function backoffMs(err, attempt) {
  if (Number.isFinite(err?.retryAfterMs) && err.retryAfterMs > 0) {
    return Math.min(err.retryAfterMs + 500, MAX_BACKOFF_MS);
  }
  const base = Math.min(2000 * Math.pow(2, attempt - 1), MAX_BACKOFF_MS);
  return base + Math.random() * 1000;
}

async function withRetry(fn, { label, onStatus } = {}) {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (!isRetryable(err) || attempt === MAX_ATTEMPTS) throw err;
      const wait = backoffMs(err, attempt);
      onStatus?.(
        `Rate limited on ${label} — waiting ${(wait / 1000).toFixed(1)}s (attempt ${attempt} of ${MAX_ATTEMPTS - 1})...`
      );
      await sleep(wait);
    }
  }
  throw lastErr;
}

/**
 * Analyze a single concept using the selected provider.
 * processedFiles: array of { type: 'image'|'pdf', base64?, mediaType?, text?, name }
 */
export async function analyzeConcept(provider, concept, platformUrl, platformDescription, siteContent, processedFiles = [], europeanExamples = '') {
  const images   = processedFiles.filter(f => f.type === 'image');
  const pdfs     = processedFiles.filter(f => f.type === 'pdf');

  // PDF text + image note (for non-vision providers) always goes into the prompt
  const fileContext = buildFileContext(processedFiles);
  const userPrompt  = buildConceptPrompt(concept, platformUrl, platformDescription, siteContent, fileContext, europeanExamples);

  // Vision providers get the actual images; others get text-only
  const imagesToSend = provider.supportsVision ? images : [];
  const text = await provider.sendMessage(ANALYSIS_SYSTEM_PROMPT, userPrompt, imagesToSend);
  return parseAnalysisResponse(text);
}

/**
 * Run the full analysis for all concepts in parallel (with concurrency limit).
 * Ollama (local) runs sequentially to avoid overwhelming the local model.
 */
export async function analyzeAll(providerId, apiKey, concepts, platformUrl, platformDescription, onProgress, onStatus, ollamaConfig, processedFiles = []) {
  // Create provider instance
  let provider;
  try {
    const config = ollamaConfig || {};
    provider = createProvider(providerId, apiKey, config);
  } catch (err) {
    throw new Error(`Failed to initialise provider: ${err.message}`);
  }

  // Fetch site content once, shared across all concept analyses
  onStatus?.('Fetching platform content...');
  let siteContent = null;
  try {
    siteContent = await fetchPageContent(platformUrl);
    if (siteContent) {
      onStatus?.(`Fetched ${Math.round(siteContent.length / 1024)}KB of page content. Starting analysis...`);
    } else {
      onStatus?.('Could not fetch page directly — analysing based on URL and description...');
    }
  } catch {
    onStatus?.('Could not fetch page — analysing based on URL and description...');
  }

  // Local Ollama runs sequentially to avoid overloading the local model.
  // Cloud batches are 3, not 5: at ~7.4k tokens per call a batch of 5 costs
  // ~37k, which exceeds a 30k-TPM key's entire per-minute budget in one go.
  const isLocal = providerId === 'ollama';
  const CONCURRENCY = isLocal ? 1 : 3;

  const euExamples = await loadEuropeanExamples(concepts);
  const results = {};

  // Run in parallel batches
  async function runConcept(concept) {
    try {
      const result = await withRetry(
        () => analyzeConcept(provider, concept, platformUrl, platformDescription, siteContent, processedFiles, euExamples[concept.id]),
        { label: concept.title, onStatus }
      );
      results[concept.id] = { status: 'done', ...result };
    } catch (err) {
      results[concept.id] = { status: 'error', error: err.message };
    }
    onProgress(concept.id, results[concept.id]);
  }

  // Process concepts in batches of CONCURRENCY
  for (let i = 0; i < concepts.length; i += CONCURRENCY) {
    const batch = concepts.slice(i, i + CONCURRENCY);
    const remaining = concepts.length - i - batch.length;
    onStatus?.(`Analysing ${batch.length} dimensions in parallel${remaining > 0 ? ` · ${remaining} queued` : ''}...`);
    await Promise.all(batch.map(runConcept));
  }

  return results;
}

// ─── Design mode ────────────────────────────────────────────────────────────

export async function designConcept(provider, concept, platformDescription, processedFiles = [], europeanExamples = '') {
  const fileContext = buildFileContext(processedFiles);
  const userPrompt = buildDesignPrompt(concept, platformDescription, fileContext, europeanExamples);
  const images = provider.supportsVision ? processedFiles.filter(f => f.type === 'image') : [];
  const text = await provider.sendMessage(DESIGN_SYSTEM_PROMPT, userPrompt, images);
  return parseDesignResponse(text);
}

export async function designAll(providerId, apiKey, concepts, platformDescription, onProgress, onStatus, ollamaConfig, processedFiles = []) {
  let provider;
  try {
    provider = createProvider(providerId, apiKey, ollamaConfig || {});
  } catch (err) {
    throw new Error(`Failed to initialise provider: ${err.message}`);
  }

  const isLocal = providerId === 'ollama';
  const CONCURRENCY = isLocal ? 1 : 3;
  const euExamples = await loadEuropeanExamples(concepts);
  const results = {};

  async function runConcept(concept) {
    try {
      const result = await withRetry(
        () => designConcept(provider, concept, platformDescription, processedFiles, euExamples[concept.id]),
        { label: concept.title, onStatus }
      );
      results[concept.id] = { status: 'done', ...result };
    } catch (err) {
      results[concept.id] = { status: 'error', error: err.message };
    }
    onProgress(concept.id, results[concept.id]);
  }

  for (let i = 0; i < concepts.length; i += CONCURRENCY) {
    const batch = concepts.slice(i, i + CONCURRENCY);
    const remaining = concepts.length - i - batch.length;
    onStatus?.(`Mapping ${batch.length} dimensions${remaining > 0 ? ` · ${remaining} queued` : ''}...`);
    await Promise.all(batch.map(runConcept));
  }

  return results;
}
