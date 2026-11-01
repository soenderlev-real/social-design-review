/**
 * Dynamic imports that survive a deploy.
 *
 * Vite names each lazily-loaded chunk by content hash, so every deploy renames
 * them. A tab opened before the deploy still holds the old filenames, and the
 * first lazy import after that fetches a file which no longer exists. The
 * browser reports it as "Importing a module script failed" — accurate, useless,
 * and indistinguishable from a bug in our own code.
 *
 * This is not a hypothetical: the tool is meant to be run as an hour-long
 * workshop, so a tab is open across most deploys we make.
 *
 * The chunk cannot be recovered — it is genuinely gone from the server — so the
 * only cure is a reload. What this module adds is the ability to say so.
 */

/** A lazy chunk that no longer exists on the server, because the build moved on. */
export class StaleBuildError extends Error {
  constructor() {
    super('This page was loaded before the last update, so part of it is no longer available. Reload to get the current version.');
    this.name = 'StaleBuildError';
  }
}

/**
 * Browsers word this differently and none of them use an error code:
 * Chrome "Failed to fetch dynamically imported module", Safari "Importing a
 * module script failed", Firefox "error loading dynamically imported module".
 * Matching on text is unpleasant but it is the only signal on offer.
 */
function isChunkLoadFailure(err) {
  const m = String(err?.message || err);
  return /dynamically imported module|importing a module script failed|failed to fetch dynamically/i.test(m);
}

/**
 * Run a dynamic import, turning a missing chunk into something explainable.
 * Any other failure is passed through untouched — a genuine bug should not be
 * dressed up as a stale deploy.
 */
export async function loadChunk(load) {
  try {
    return await load();
  } catch (err) {
    if (isChunkLoadFailure(err)) throw new StaleBuildError();
    throw err;
  }
}
