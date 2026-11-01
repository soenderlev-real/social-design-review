/**
 * Headline counts for the Rebuild.net directory snapshot.
 *
 * Kept in its own module so the landing page can quote the numbers without
 * importing the ~136KB dataset, which is lazily loaded everywhere else.
 * Regenerate alongside rebuildDirectory.js if the directory is re-scraped.
 */
export const REBUILD_COUNT = 624;
export const REBUILD_COUNTRIES = 35;
export const REBUILD_SNAPSHOT = '2026-11-01';
