# design-sync notes — social-design-review

## Repo shape (read this before re-syncing)

This repo is **not a published design-system package** — it's a Vite+React application (the
Social Design Review tool). It ended up here anyway at the user's explicit request, with two
known limitations accepted going in:

- **No TypeScript anywhere** (`find src -iname "*.ts" -o -iname "*.tsx"` is empty). Prop
  contracts (`<Name>Props`) will be synthesized from JS usage, not extracted from real types —
  expect them to be thin/approximate, not authoritative.
- **No library build.** `vite.config.js` has no `build.lib` config — `npm run build` produces
  an app bundle (`dist/assets/index-*.js`, calls `ReactDOM.createRoot().render(<App/>)`), not a
  module with named component exports. The converter runs in **synth-entry mode** (scans `src/`
  for PascalCase exports) rather than pointing `--entry` at a real dist entry.

## Scope decision (user-confirmed at sync time)

The app's 8 top-level components split into two kinds:
- **Presentational / prop-driven** — `ConceptCard`, `ScoreRadar`, `RadialFramework`, `Header`.
  These are what's scoped IN.
- **Page-level, wired to live app state** — `LandingView`, `ReviewDashboard`,
  `InstructionsView`, `ChatPanel`. These need real API keys, network calls, or router/hash
  state to render meaningfully and would produce broken/empty preview cards in isolation.
  Excluded via `componentSrcMap: {"<Name>": null}` in config.json.

If a future re-sync wants to bring any of the excluded four in, they'll need either mocked
provider/data context (`cfg.provider` / `extraEntries`) or a hand-authored preview that stubs
their required props — don't just remove the `null` and rebuild.

## Design tokens source

Colors/type live in `tailwind.config.js` (the `rb.*` palette, `enable`/`grow`/`protect`/`accent`
aliases) and are compiled into `dist/assets/index-*.css` by `npm run build`. `cssEntry` in
config.json points at that compiled file — **the hash changes every build**, so re-verify/update
`cssEntry` after any `npm run build` before re-running the converter (or re-run the build and
grep the new hash from `dist/assets/`).

## Required self-symlink (synth-entry mode)

This repo is not installed as an npm package anywhere, so the converter's package-shape adapter
has nowhere to resolve `social-design-review` from inside `--node-modules`. **Never pass
`--entry`** — any existing path given to `--entry` is treated as a literal, real dist entry
(`resolveDistEntry` returns it unconditionally when it exists — see
`.ds-sync/lib/bundle.mjs:14`), which silently bypasses synth-from-`src/` mode entirely and
produces `[ZERO_MATCH]` (this happened once: pointing `--entry` at `package.json` made esbuild
bundle the JSON file itself as "the entry"). Instead, self-symlink the repo into its own
`node_modules` so plain `PKG_DIR = join(NODE_MODULES, PKG)` resolution finds it:

```sh
ln -sfn .. node_modules/social-design-review
```

Then run with no `--entry` flag at all:

```sh
node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle
```

**`npm install`/`npm ci` prunes this symlink** (npm removes anything in `node_modules` it
doesn't recognize from the lockfile) — recreate it after every install, including on a fresh
clone, before running the converter or `resync.mjs`.

## Re-sync risks

- The self-symlink above must be recreated after every `npm install`/`npm ci` — see above. A
  `[NO_DIST]`/`[ZERO_MATCH]` on a fresh machine almost certainly means this.
- `cssEntry`'s filename hash is not stable across builds — the single most likely thing to go
  stale. Check it first if `[CSS_IMPORT_MISSING]` fires on a re-sync.
- The excluded-component list (`componentSrcMap` nulls) reflects a scope decision, not a
  technical limitation discovered by the converter — don't "fix" it by removing entries without
  re-confirming with the user, since those components will still fail to render meaningfully
  without real app state.
- Font: the app loads Space Mono from Google Fonts via a `<link>` in `index.html`, not a
  shipped `@font-face`/woff2 — expect `[FONT_MISSING]` or `[FONT_REMOTE]` and treat it as
  informational (the family loads at runtime), not something to source and bundle.
