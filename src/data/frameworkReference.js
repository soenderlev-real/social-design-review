/**
 * The three reference layers the framework applies on top of the dimensions.
 *
 * These mirror blocks that live as prose inside ANALYSIS_SYSTEM_PROMPT and
 * DESIGN_SYSTEM_PROMPT — the vocabulary the model is told to use. Kept here as
 * data so the page can show a reader what the prompts are actually working
 * with, rather than asserting it separately.
 */

export const FRAMEWORK_REFERENCE = [
  {
    id: 'finitude',
    title: 'Finitude principles',
    lede: 'Social media’s foundational achievement was the engineered removal of edges — no end to the scroll, no boundary between audiences, no natural stopping point. These ten principles put edges back, and each inverts a specific extraction pattern.',
    items: [
      { name: 'ExplorativeUI', desc: 'Restores wayfinding: the user moves through a space whose shape they can see, choosing direction. Inverts the algorithmic feed — a terrain rather than a conveyor belt.', promptContext: 'Wayfinding versus the conveyor belt. The test is whether a user can see the shape of the space they are in and choose a direction, rather than being fed a sequence someone else ordered.', keyQuestion: 'Can a user see where the edges of your platform are, and choose where to go next?' },
      { name: 'EndDesign', desc: 'Re-installs the terminus. The newspaper had a back page; the album had a last track. Genuine endings that release the user, not cliffhangers that re-engage them.', promptContext: 'The terminus. Newspapers had a back page, albums a last track; infinite scroll abolished the moment where a user decides whether to continue. EndDesign restores an ending that releases rather than a cliffhanger that re-engages.', keyQuestion: 'Where does your platform end — and does that ending release the user or bait them back?' },
      { name: 'SpatialUI', desc: 'Bounded contexts — rooms, registers — with their own norms and audiences. Inverts context collapse; grounded in Nissenbaum’s contextual integrity.', promptContext: 'Bounded contexts with their own norms and audiences — rooms rather than one global timeline. Grounded in Nissenbaum\'s contextual integrity, where privacy means information flowing appropriately to its context.', keyQuestion: 'Which contexts does your platform keep separate, and which does it collapse into one?' },
      { name: 'SaveForLater', desc: 'Decouples capture from consumption. Seeing something interesting and consuming it are not the same act.', promptContext: 'Decoupling capture from consumption. Seeing something interesting and consuming it are different acts, and collapsing them turns a glance into a session.', keyQuestion: 'Can someone capture something without being pulled into consuming it now?' },
      { name: 'DefaultMultilingual', desc: 'Genuine multilingualism as a baseline, not an add-on. Generative AI collapsed the cost, so failing to implement it is now a choice.', promptContext: 'Multilingualism as a baseline rather than a feature request. Generative AI collapsed the cost, so for a European platform this is now a choice rather than a constraint.', keyQuestion: 'Who is excluded from your platform by language, and what would including them require?' },
      { name: 'ConstraintTimeLocking', desc: 'Time budgets as design defaults rather than buried settings. The ethical hinge: the user must author and hold the key — a platform-imposed lock is paternalism.', promptContext: 'Time budgets as defaults rather than buried settings. The ethical hinge is authorship: a user-authored constraint is sovereignty, a platform-imposed one is paternalism.', keyQuestion: 'Would your platform help someone hold a limit they set themselves — and who holds the key?' },
      { name: 'DifferentiatedTimeExperiences', desc: 'Editorial cadence as interaction design — the daily five minutes, the weekly deep read, the monthly synthesis. Different tempos afford different kinds of thinking.', promptContext: 'Editorial cadence as interaction design — the daily five minutes, the weekly deep read, the monthly synthesis. The feed collapses every rhythm into one continuous now.', keyQuestion: 'What are the different rhythms of your platform, and does its design distinguish them?' },
      { name: 'LegibleCuration', desc: 'The user can see, and ideally author, the ranking: why this content, why now, in what order. Without it, every other principle can be undermined underneath.', promptContext: 'Ranking the user can see and ideally author: why this content, why now, in what order. Without it, every other principle can be quietly undermined by an opaque recommender underneath.', keyQuestion: 'If your platform orders anything, can a user see why — and change it?' },
      { name: 'ReflectiveFriction', desc: 'A deliberate pause before posting, reacting or resharing. Not blocking action — restoring the "do I want to do this?" decision point before amplification.', promptContext: 'A deliberate pause at the point of action, before posting, reacting or resharing. Not blocking the action — restoring the decision point that frictionlessness removed.', keyQuestion: 'Where would a pause before acting genuinely help someone on your platform?' },
      { name: 'Completability', desc: 'The interface measures whether you finished and left satisfied, not whether you stayed. A graceful exit is a feature, not a failure.', promptContext: 'Success measured by whether someone finished and left satisfied, not by how long they stayed. A graceful exit is a feature.', keyQuestion: 'What does \'done\' look like on your platform, and would you call a short visit a success?' },
    ],
  },
  {
    id: 'ui-patterns',
    title: 'UI patterns',
    lede: 'Guidance that stops at the level of values is easy to agree with and hard to build. Every dimension has to land as something concrete on a screen — these are the five layers a review or workshop is asked to name.',
    items: [
      { name: 'Screens and components', desc: 'The specific element that carries the dimension — a composer, a feed card, a settings pane, an onboarding step, a group header — and what belongs in it.', promptContext: 'The translation layer: which concrete element carries a principle. A composer, a feed card, a settings pane, a group header. Guidance that stops at values is easy to agree with and impossible to build.', keyQuestion: 'Which screen or component in your platform carries this, and what belongs in it?' },
      { name: 'Information hierarchy', desc: 'What is primary, what is secondary, what is deliberately de-emphasised. Placement is a value judgement: a control three menus deep is a different design from the same control in the primary nav.', promptContext: 'Placement is a value judgement. A control in the primary nav and the same control three menus deep are two different designs, whatever the settings page claims.', keyQuestion: 'What does someone see first on your platform, and what do they have to go looking for?' },
      { name: 'States', desc: 'The empty state, the first-run state, the error state and — critically for this framework — the end state. Most extraction patterns hide in states nobody designed.', promptContext: 'The empty state, the first run, the error, and — critically for this framework — the end state. Most extraction patterns hide in states nobody designed.', keyQuestion: 'Which state in your platform has nobody designed yet, and what happens there now?' },
      { name: 'Interaction and friction', desc: 'What a tap does, what confirms, what is reversible, and where a deliberate pause belongs. ReflectiveFriction is a UI decision before it is a philosophy.', promptContext: 'What a tap does, what confirms, what is reversible, and where a deliberate pause belongs. ReflectiveFriction is an interaction decision before it is a philosophy.', keyQuestion: 'Where in your platform is an action too easy to take back — or impossible to?' },
      { name: 'Microcopy', desc: 'The actual words on the button, the label, the empty state. Here copy often is the design: "You’re all caught up" is EndDesign; "3 people are typing" is presence pressure.', promptContext: 'The words on the button, the label, the empty state. In this framework copy often is the design: "You\'re all caught up" is an ending; "3 people are typing" is pressure.', keyQuestion: 'What words on your platform are doing design work you have not examined?' },
    ],
  },
  {
    id: 'regulatory',
    title: 'Regulatory framework',
    lede: 'For EU-facing platforms much of this is law, not preference. Reviews cite the relevant article where one applies, and design guidance is expected to stay clear of these lines from the start rather than retrofit compliance.',
    items: [
      { name: 'DSA Art. 25 — dark patterns', desc: 'Prohibits interface design that deceives, manipulates or materially distorts users’ ability to make free and informed decisions. Makes the EDPB categories below a legal requirement, not best practice.', promptContext: 'Prohibits interface design that deceives or manipulates, or materially distorts a user\'s ability to make free and informed decisions. The EDPB\'s six categories are the practical lens.', keyQuestion: 'Which interface on your platform would be hardest to defend as neutral presentation?' },
      { name: 'DSA Art. 27 & 38 — recommender transparency', desc: 'Ranking parameters must be explained in plain language, and very large platforms must offer at least one recommender option not based on profiling.', promptContext: 'Ranking parameters must be explained in plain language, and very large platforms must offer at least one option not based on profiling.', keyQuestion: 'If your platform orders anything, could you explain the ordering in plain language — and is there a non-profiling option?' },
      { name: 'DSA Art. 28 — protection of minors', desc: 'No advertising based on profiling where the platform knows a user is a minor, and a high level of privacy, safety and security by design.', promptContext: 'No profiling-based advertising where the platform knows a user is a minor, and a high level of privacy and safety by design for them.', keyQuestion: 'How would your platform know a user is a minor, and what changes for them if it does?' },
      { name: 'DSA Art. 34 & 35 — systemic risk', desc: 'Very large platforms must assess and mitigate systemic risks arising from their design — including effects on civic discourse, mental wellbeing and fundamental rights.', promptContext: 'Very large platforms must assess and mitigate systemic risks arising from their design — including effects on civic discourse, mental wellbeing and fundamental rights.', keyQuestion: 'What systemic risk does your platform\'s design create, and what would mitigating it look like?' },
      { name: 'AI Act Art. 5 — prohibited practices', desc: 'Bans manipulative or deceptive AI techniques that materially distort behaviour and cause harm, exploitation of vulnerabilities tied to age, disability or socioeconomic situation, and social scoring. A legal red line, not a UX judgement call.', promptContext: 'Bans manipulative or deceptive AI techniques that materially distort behaviour and cause harm, exploitation of vulnerabilities tied to age, disability or socioeconomic situation, and social scoring. A legal red line, not a UX judgement call.', keyQuestion: 'Where could AI-driven personalisation on your platform cross from persuasive into exploitative?' },
      { name: 'GDPR — minimisation & privacy by design', desc: 'Collect only what the feature strictly requires, and make the protective configuration the default rather than something a user has to find.', promptContext: 'Collect only what the feature strictly requires, and make the protective configuration the default rather than an option someone has to find.', keyQuestion: 'What does your platform collect that no feature strictly needs?' },
      { name: 'EDPB Guidelines 03/2022 — deceptive design', desc: 'Six categories used as a cross-cutting lens: Overloading, Skipping, Stirring, Obstructing, Fickle, and Left in the Dark. Reviews name the category when one applies.', promptContext: 'Six categories as a cross-cutting lens: Overloading, Skipping, Stirring, Obstructing, Fickle, Left in the Dark. Naming the category makes a finding actionable.', keyQuestion: 'Which of the six categories would an auditor most plausibly find on your platform?' },
    ],
  },
];

/**
 * The finitude principles as a walkthrough track.
 *
 * Shaped like CONCEPTS so the guided walkthrough can step through them with the
 * same machinery — but they are a different kind of thing: properties of an
 * interface rather than areas of social life. The questions differ in kind too
 * ("where does your platform have no edge?" rather than "what is your social
 * object?"), so they get their own prompt builders.
 */
export const FINITUDE_PRINCIPLES = FRAMEWORK_REFERENCE
  .find(g => g.id === 'finitude')
  .items.map(i => ({
    id: i.name.toLowerCase(),
    title: i.name,
    shortDesc: i.desc,
    promptContext: i.promptContext,
    keyQuestion: i.keyQuestion,
  }));

/**
 * How to facilitate each reference group as a chat session.
 *
 * One track machine drives all of them, so what differs is the framing: what
 * this group of things IS, what a good answer looks like, and what the wrap-up
 * should conclude. Kept beside the content it describes rather than in
 * framework.js, so adding a group means editing one file.
 */
export const REFERENCE_FACILITATION = {
  finitude: {
    label: 'Finitude principles',
    unit: 'principle',
    framing: `## What finitude means here
Social media's foundational achievement was the engineered removal of edges: no end to the scroll, no boundary between audiences, no temporal rhythm, no natural stopping point. This was not an accident — it is the structural consequence of revenue tied to attention. These principles put edges back: temporal, spatial, contextual and terminal. The lineage is calm technology (Weiser & Brown), Amber Case's Calm Tech Institute, and the time-well-spent movement.

Each principle inverts a specific extraction pattern. Your job is to make that inversion concrete for the platform in front of you.

## Facilitating this group
- **Name what it inverts.** A principle only makes sense against the thing it corrects — say what that is.
- **Some will not apply.** A principle can be irrelevant to a given platform, and saying so is a legitimate answer. DefaultMultilingual may not matter to a single-neighbourhood tool library. Note it and move on rather than forcing a fit.
- **Watch the trap.** These principles are largely unmonetisable under advertising — a feed that ends and helps you leave loses the ad auction. If their platform has ad revenue, say so plainly when it becomes relevant.`,
    wrapUp: [
      ['Where your platform already has edges', 'The limits their answers show are already there, in their own terms — including any they may not have realised counted. Two short paragraphs.'],
      ['Where the edges are missing', 'The two or three places their answers reveal no boundary, no ending or no stopping point. Name the specific answers. A wrap-up that finds nothing missing is not reading carefully.'],
      ['The three moves worth making first', 'Three concrete changes, each tied to a principle by name, ordered by what would matter most. Say what to design, not what to consider.'],
      ['The business-model question', 'One paragraph: these principles are hard to monetise through advertising. Say plainly what that means for their platform, and where this design language usually has to live — the commons, public institutions, education, civic infrastructure.'],
    ],
  },

  'ui-patterns': {
    label: 'UI patterns',
    unit: 'pattern',
    framing: `## What this group is
The translation layer between principle and screen. Design guidance that stops at the level of values is easy to agree with and impossible to build; these five are how a dimension becomes something a team could put in a wireframe this week.

## Facilitating this group
- **Push for the concrete.** If they answer with an intention, ask which screen. If they name a screen, ask what is on it. The test of a good answer is whether someone could draw it.
- **Placement is the finding.** The same control in the primary nav and three menus deep are two different designs — press on where things sit, not just whether they exist.
- **Quote copy.** When they describe a button or an empty state, ask for the actual words. In this framework copy often is the design.`,
    wrapUp: [
      ['What you could draw tomorrow', 'The screens, components, states and copy their answers already specify concretely enough to wireframe. Two short paragraphs.'],
      ['Where it is still abstract', 'Two or three places their answers stayed at the level of intention rather than interface. Name them, and say what question would make each concrete.'],
      ['The states nobody has designed', 'Which of empty, first-run, error and end state remain undefined for their platform, and what each would need to contain. Most extraction patterns hide here.'],
      ['The three screens to design first', 'Three specific screens or components, ordered by what would unblock the most. Name the element and where it sits.'],
    ],
  },

  regulatory: {
    label: 'Regulatory framework',
    unit: 'instrument',
    /**
     * Rendered by the interface, not left to the model.
     *
     * A live run showed the model skipping this: the system prompt asked for it
     * "once and early", but the turn-level instruction enumerates what the first
     * turn contains and it followed that instead. A disclaimer that appears only
     * when the model remembers is not a disclaimer.
     */
    notice: 'A design conversation, not a compliance assessment. This explains what EU law asks of design; it cannot tell you whether your platform complies, or whether an obligation applies to you. Take anything load-bearing to a lawyer.',
    framing: `## What this group is
The EU instruments that turn several of this framework's commitments into legal obligations for platforms serving European users: the Digital Services Act, the AI Act, the GDPR, and the EDPB's deceptive-design guidelines.

## This is not legal advice, and you must not pretend otherwise
You explain what each instrument asks of design, and help someone see where their platform touches it. You do not determine whether a platform complies, whether an obligation applies to them, or what their legal exposure is. Thresholds matter and you will rarely know them — most DSA obligations scale with size, and the very-large-platform duties apply only above 45 million monthly EU users.

So: say plainly, once and early, that this is a design conversation rather than a compliance assessment, and that anything load-bearing needs a lawyer. Then be genuinely useful about design. Do not repeat the disclaimer every turn — say it once and get on with the work.

## Facilitating this group
- **Ask where it touches, not whether they comply.** "Which interface would be hardest to defend as neutral?" is answerable and useful. "Are you compliant?" is neither.
- **Evidence, not intent.** Ask what they could show an auditor — a screen, a default, a log — rather than what they meant to do.
- **Say when a threshold decides it.** If an obligation depends on size or on knowing a user is a minor, name that rather than implying it applies universally.`,
    wrapUp: [
      ['Where your design already meets these', 'The choices their answers show that align with what these instruments ask of design, in their own terms. Two short paragraphs.'],
      ['Where the design would be hard to defend', 'Two or three interfaces or defaults their answers reveal as difficult to justify as neutral, and which instrument each speaks to. Be specific about the answers involved.'],
      ['What to change in the design', 'Three concrete design changes, each tied to an instrument by name, ordered by what would matter most. Say what to design, not what to consider.'],
      ['What needs a lawyer, not a designer', 'One short paragraph naming the questions here that are genuinely legal rather than design — thresholds, applicability, obligations that turn on facts about their organisation — and which are worth taking to counsel.'],
    ],
  },
};

/** A reference group as a walkthrough track, shaped like CONCEPTS. */
export function referenceTrack(groupId) {
  const group = FRAMEWORK_REFERENCE.find(g => g.id === groupId);
  if (!group) return null;
  return {
    id: group.id,
    title: group.title,
    ...REFERENCE_FACILITATION[groupId],
    items: group.items.map(i => ({
      id: `${group.id}:${i.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
      title: i.name,
      shortDesc: i.desc,
      promptContext: i.promptContext,
      keyQuestion: i.keyQuestion,
    })),
  };
}
