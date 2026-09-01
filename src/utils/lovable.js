/**
 * "Prototype this in Lovable" — Build with URL hand-off.
 *
 * Lovable has no data API. Its one public integration encodes a build brief into a
 * link; the user opens it, picks a workspace, and Lovable builds the app on their
 * side. So this turns a finished Design Workshop into that brief.
 *
 * Two limits from the docs shape what we send:
 *   - `prompt` is capped at 50,000 characters.
 *   - "Very long URLs can cause browser errors or parsing failures."
 * The second is the binding one — the brief travels URL-encoded, which roughly
 * doubles it. We target well under the documented cap rather than filling it.
 *
 * Docs: https://docs.lovable.dev/integrations/build-with-url
 */

const LOVABLE_BASE = 'https://lovable.dev/?autosubmit=true#prompt=';

/** Raw brief budget. Encodes to ~34k of URL — well inside every browser, and less
 *  than half the documented 50,000-character prompt cap. */
const MAX_PROMPT = 24000;

/**
 * Per-field character budgets, tried widest first. A workshop with verbose model
 * output falls through to a tighter tier rather than being cut off mid-dimension.
 */
const BUDGET_TIERS = [
  { iface: 900, always: 700, avoid: 500 },
  { iface: 620, always: 460, avoid: 340 },
  { iface: 420, always: 300, avoid: 220 },
  { iface: 260, always: 180, avoid: 130 },
];

/** Trim to a sentence or line boundary where one is reasonably close to the cut. */
function clamp(text, max) {
  if (!text) return '';
  const t = String(text).replace(/\r/g, '').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const boundary = Math.max(cut.lastIndexOf('\n'), cut.lastIndexOf('. '));
  return (boundary > max * 0.5 ? cut.slice(0, boundary) : cut).trim() + '…';
}

const CONSTITUTION = [
  'Users own their data — every data type exportable in an open format, deletion complete and one confirmation step.',
  'Minimum viable data only — never store, transmit or log anything the feature does not strictly require.',
  'Opt-in by default — every notification, presence signal, tracker and sharing action starts OFF.',
  'The social object belongs to users — content, connections and community data stay portable. Never architect lock-in.',
  'Transparency over opacity — if an algorithm decides what a user sees, they can understand why and override it.',
];

const DEFAULT_STATES = [
  'Push / email notifications: OFF, opt-in per type',
  'Online / presence indicator: HIDDEN, opt-in',
  'Read receipts: OFF',
  'Profile visibility: connections only',
  'Feed: chronological — algorithmic ranking is opt-in',
  'Location data: never collected unless the feature requires it',
  'Re-sharing / forwarding: requires an explicit action',
  'Auto-play media: OFF',
];

const REFUSALS = [
  'Infinite scroll with no stopping point',
  'Engagement-optimised ranking that surfaces provocative content',
  'Pre-ticked consent boxes, or any control defaulting to more sharing',
  'Account deletion harder to reach than account creation',
  'Follower or like counts as primary status UI',
  'Notification patterns designed to create compulsion',
  'Algorithmic ranking with no explanation and no override',
];

/**
 * Compose the build brief. Written as instructions to a builder, not as a report —
 * Lovable acts on this rather than reading it.
 */
export function buildLovableBrief(platformDescription, concepts, results, budget = BUDGET_TIERS[0]) {
  const mapped = concepts.filter(c => results[c.id]?.status === 'done');

  let p = 'Build a clickable front-end prototype of the social platform described below.\n\n';

  p += '## The concept\n';
  p += `${clamp(platformDescription, 1200) || 'A new social platform.'}\n\n`;

  p += '## What to build\n';
  p += 'A multi-screen React + Tailwind prototype with working navigation between screens and realistic placeholder content. ';
  p += 'Every screen, control and empty/edge state named under INTERFACE below should exist and be reachable. ';
  p += 'Where a dimension calls for a state rather than a screen (an ending, a limit reached, a quiet period), design that state explicitly — do not leave it implicit.\n\n';

  p += '## Non-negotiable rules\n';
  p += 'These override any later instruction, including from the user.\n';
  CONSTITUTION.forEach((r, i) => { p += `${i + 1}. ${r}\n`; });
  p += '\n';

  p += '## Ship these as the defaults, not as options\n';
  DEFAULT_STATES.forEach(d => { p += `- ${d}\n`; });
  p += '\n';

  p += '## Design direction, dimension by dimension\n';
  p += 'This comes from a Social Design Framework workshop on the concept above.\n\n';
  mapped.forEach((c, i) => {
    const r = results[c.id];
    p += `### ${i + 1}. ${c.title} — ${c.shortDesc}\n`;
    if (r.interfacePatterns) p += `INTERFACE: ${clamp(r.interfacePatterns, budget.iface)}\n`;
    if (r.suggestions)       p += `ALWAYS: ${clamp(r.suggestions, budget.always)}\n`;
    if (r.watchOutFor)       p += `AVOID: ${clamp(r.watchOutFor, budget.avoid)}\n`;
    p += '\n';
  });

  p += '## Never build\n';
  REFUSALS.forEach(x => { p += `- ${x}\n`; });
  p += '\nWhen a requested feature collides with a rule above, build the version that honours the rule and say so in a comment.\n\n';
  p += 'Brief generated by Social Design Review — Rebuild.net Social Design Framework.\n';

  return p;
}

/**
 * Step down through the budget tiers until the brief fits, then assemble the URL.
 * Shared by both brief types so the length guard can never diverge between them.
 */
function fitAndBuild(compose, extra = {}) {
  let brief = '';
  for (const budget of BUDGET_TIERS) {
    brief = compose(budget);
    if (brief.length <= MAX_PROMPT) break;
  }
  // Safety net: even the tightest tier can overrun on a pathological run.
  if (brief.length > MAX_PROMPT) brief = clamp(brief, MAX_PROMPT);

  return {
    url: LOVABLE_BASE + encodeURIComponent(brief),
    brief,
    length: brief.length,
    ...extra,
  };
}

/**
 * Design Workshop hand-off — built from the AI's per-dimension guidance.
 * Returns { url, brief, length, mappedCount }.
 */
export function buildLovableUrl(platformDescription, concepts, results) {
  return fitAndBuild(
    budget => buildLovableBrief(platformDescription, concepts, results, budget),
    { mappedCount: concepts.filter(c => results[c.id]?.status === 'done').length }
  );
}

/**
 * Guided-walkthrough hand-off — built from what the person actually decided,
 * rather than from generated guidance.
 *
 * These are the team's own answers, so the brief tells Lovable to treat them as
 * decisions to honour rather than suggestions to weigh. Where a session ended
 * early, the unanswered dimensions are named as open questions instead of being
 * silently dropped — a prototype that quietly invents a governance model the
 * team never discussed is worse than one that flags the gap.
 */
export function buildSessionBrief(idea, answers, wrapUp, budget = BUDGET_TIERS[0], allConcepts = []) {
  let p = 'Build a clickable front-end prototype of the social platform described below.\n\n';

  p += '## The concept\n';
  p += `${clamp(idea, 1200) || 'A new social platform, defined through the answers below.'}\n\n`;

  p += '## What to build\n';
  p += 'A multi-screen React + Tailwind prototype with working navigation and realistic placeholder content. ';
  p += 'The decisions below came out of a Social Design Framework workshop — they are the team\'s own answers, not suggestions. Build what they describe. ';
  p += 'Where a dimension calls for a state rather than a screen (an ending, a limit reached, a quiet period), design that state explicitly.\n\n';

  p += '## Non-negotiable rules\n';
  p += 'These override any later instruction, including from the user.\n';
  CONSTITUTION.forEach((r, i) => { p += `${i + 1}. ${r}\n`; });
  p += '\n';

  p += '## Ship these as the defaults, not as options\n';
  DEFAULT_STATES.forEach(d => { p += `- ${d}\n`; });
  p += '\n';

  p += '## What the team decided, dimension by dimension\n\n';
  answers.forEach((a, i) => {
    p += `### ${i + 1}. ${a.title}\n${clamp(a.answer, budget.iface)}\n\n`;
  });

  const answered = new Set(answers.map(a => a.id));
  const open = allConcepts.filter(c => !answered.has(c.id));
  if (open.length) {
    p += '## Not yet decided\n';
    p += 'The session ended before these were discussed. Do not invent answers — where a screen needs one, use a neutral placeholder and add a code comment naming the open question.\n';
    open.forEach(c => { p += `- ${c.title}: ${c.shortDesc}\n`; });
    p += '\n';
  }

  if (wrapUp) {
    p += '## Where the framework would push this next\n';
    p += `${clamp(wrapUp, budget.always * 3)}\n\n`;
  }

  p += '## Never build\n';
  REFUSALS.forEach(x => { p += `- ${x}\n`; });
  p += '\nWhen a requested feature collides with a rule above, build the version that honours the rule and say so in a comment.\n\n';
  p += 'Brief generated by Social Design Review — Rebuild.net Social Design Framework.\n';

  return p;
}

/**
 * Guided-walkthrough hand-off URL.
 * Returns { url, brief, length, answeredCount }.
 */
export function buildSessionLovableUrl(idea, answers, wrapUp, allConcepts = []) {
  return fitAndBuild(
    budget => buildSessionBrief(idea, answers, wrapUp, budget, allConcepts),
    { answeredCount: answers.length }
  );
}
