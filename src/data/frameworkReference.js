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
      { name: 'ExplorativeUI', desc: 'Restores wayfinding: the user moves through a space whose shape they can see, choosing direction. Inverts the algorithmic feed — a terrain rather than a conveyor belt.' },
      { name: 'EndDesign', desc: 'Re-installs the terminus. The newspaper had a back page; the album had a last track. Genuine endings that release the user, not cliffhangers that re-engage them.' },
      { name: 'SpatialUI', desc: 'Bounded contexts — rooms, registers — with their own norms and audiences. Inverts context collapse; grounded in Nissenbaum’s contextual integrity.' },
      { name: 'SaveForLater', desc: 'Decouples capture from consumption. Seeing something interesting and consuming it are not the same act.' },
      { name: 'DefaultMultilingual', desc: 'Genuine multilingualism as a baseline, not an add-on. Generative AI collapsed the cost, so failing to implement it is now a choice.' },
      { name: 'ConstraintTimeLocking', desc: 'Time budgets as design defaults rather than buried settings. The ethical hinge: the user must author and hold the key — a platform-imposed lock is paternalism.' },
      { name: 'DifferentiatedTimeExperiences', desc: 'Editorial cadence as interaction design — the daily five minutes, the weekly deep read, the monthly synthesis. Different tempos afford different kinds of thinking.' },
      { name: 'LegibleCuration', desc: 'The user can see, and ideally author, the ranking: why this content, why now, in what order. Without it, every other principle can be undermined underneath.' },
      { name: 'ReflectiveFriction', desc: 'A deliberate pause before posting, reacting or resharing. Not blocking action — restoring the "do I want to do this?" decision point before amplification.' },
      { name: 'Completability', desc: 'The interface measures whether you finished and left satisfied, not whether you stayed. A graceful exit is a feature, not a failure.' },
    ],
  },
  {
    id: 'ui-patterns',
    title: 'UI patterns',
    lede: 'Guidance that stops at the level of values is easy to agree with and hard to build. Every dimension has to land as something concrete on a screen — these are the five layers a review or workshop is asked to name.',
    items: [
      { name: 'Screens and components', desc: 'The specific element that carries the dimension — a composer, a feed card, a settings pane, an onboarding step, a group header — and what belongs in it.' },
      { name: 'Information hierarchy', desc: 'What is primary, what is secondary, what is deliberately de-emphasised. Placement is a value judgement: a control three menus deep is a different design from the same control in the primary nav.' },
      { name: 'States', desc: 'The empty state, the first-run state, the error state and — critically for this framework — the end state. Most extraction patterns hide in states nobody designed.' },
      { name: 'Interaction and friction', desc: 'What a tap does, what confirms, what is reversible, and where a deliberate pause belongs. ReflectiveFriction is a UI decision before it is a philosophy.' },
      { name: 'Microcopy', desc: 'The actual words on the button, the label, the empty state. Here copy often is the design: "You’re all caught up" is EndDesign; "3 people are typing" is presence pressure.' },
    ],
  },
  {
    id: 'regulatory',
    title: 'Regulatory framework',
    lede: 'For EU-facing platforms much of this is law, not preference. Reviews cite the relevant article where one applies, and design guidance is expected to stay clear of these lines from the start rather than retrofit compliance.',
    items: [
      { name: 'DSA Art. 25 — dark patterns', desc: 'Prohibits interface design that deceives, manipulates or materially distorts users’ ability to make free and informed decisions. Makes the EDPB categories below a legal requirement, not best practice.' },
      { name: 'DSA Art. 27 & 38 — recommender transparency', desc: 'Ranking parameters must be explained in plain language, and very large platforms must offer at least one recommender option not based on profiling.' },
      { name: 'DSA Art. 28 — protection of minors', desc: 'No advertising based on profiling where the platform knows a user is a minor, and a high level of privacy, safety and security by design.' },
      { name: 'DSA Art. 34 & 35 — systemic risk', desc: 'Very large platforms must assess and mitigate systemic risks arising from their design — including effects on civic discourse, mental wellbeing and fundamental rights.' },
      { name: 'AI Act Art. 5 — prohibited practices', desc: 'Bans manipulative or deceptive AI techniques that materially distort behaviour and cause harm, exploitation of vulnerabilities tied to age, disability or socioeconomic situation, and social scoring. A legal red line, not a UX judgement call.' },
      { name: 'GDPR — minimisation & privacy by design', desc: 'Collect only what the feature strictly requires, and make the protective configuration the default rather than something a user has to find.' },
      { name: 'EDPB Guidelines 03/2022 — deceptive design', desc: 'Six categories used as a cross-cutting lens: Overloading, Skipping, Stirring, Obstructing, Fickle, and Left in the Dark. Reviews name the category when one applies.' },
    ],
  },
];
