/**
 * Paces streamed text for reading.
 *
 * The network delivers a reply far faster than anyone reads it, which makes the
 * text appear to slam into place rather than arrive. This queues what the
 * provider sends and releases it at a steady rate, so a reply unfolds at
 * roughly the speed of being spoken.
 *
 * The pacing is presentational only — nothing is delayed on the wire, and the
 * full text is never at risk: whatever is queued is always rendered.
 */

/** Reading pace while text is still arriving. Raise to speed up, lower to slow. */
const CHARS_PER_SECOND = 75;

/**
 * Once the provider has finished, the remaining backlog is drained within this
 * window rather than at the reading pace. Without it, a long reply that arrived
 * in two seconds would keep typing for another twenty, and the person is left
 * watching an animation of something the app already has.
 */
const MAX_TAIL_MS = 1800;

export function createPacer({ onUpdate, charsPerSecond = CHARS_PER_SECOND, maxTailMs = MAX_TAIL_MS } = {}) {
  let pending = '';       // received but not yet shown
  let shown = '';
  let ended = false;
  let frame = null;
  let lastTs = null;
  let resolve;
  const settled = new Promise(r => { resolve = r; });

  function tick(ts) {
    if (lastTs === null) lastTs = ts;
    const elapsed = ts - lastTs;
    lastTs = ts;

    // Catch-up applies only after the provider is done. While text is still
    // arriving the pace stays steady, so a fast provider does not simply
    // outrun the pacing and defeat the point of it.
    const rate = ended && pending.length
      ? Math.max(charsPerSecond, pending.length / (maxTailMs / 1000))
      : charsPerSecond;

    const take = Math.max(1, Math.round((elapsed / 1000) * rate));

    if (pending.length) {
      shown += pending.slice(0, take);
      pending = pending.slice(take);
      onUpdate(shown);
    }

    if (!pending.length && ended) {
      frame = null;
      resolve(shown);
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  function start() {
    if (frame === null) {
      lastTs = null;
      frame = requestAnimationFrame(tick);
    }
  }

  return {
    /** Queue a chunk from the provider. */
    push(text) {
      if (!text) return;
      pending += text;
      start();
    },
    /** Provider finished. Resolves once everything queued has been rendered. */
    end() {
      ended = true;
      if (pending.length) start();
      else { if (frame !== null) { cancelAnimationFrame(frame); frame = null; } resolve(shown); }
      return settled;
    },
    /** Abandon pacing — used when a turn errors. */
    cancel() {
      if (frame !== null) { cancelAnimationFrame(frame); frame = null; }
      resolve(shown);
    },
    /** Everything received so far, paced or not. */
    get full() { return shown + pending; },
  };
}
