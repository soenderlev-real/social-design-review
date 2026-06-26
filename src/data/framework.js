/**
 * Social Design Framework — structured data model
 * Based on the Rebuild.net Social Design Framework canvas
 */

export const DIMENSIONS = {
  enable: {
    label: "Enable",
    color: "enable",
    description: "Foundational conditions for healthy social life",
  },
  grow: {
    label: "Grow",
    color: "grow",
    description: "Sustainable development and value creation",
  },
  protect: {
    label: "Protect",
    color: "protect",
    description: "The platform immune system against threats",
  },
};

export const CONCEPTS = [
  {
    id: "social-object",
    title: "Social Object",
    icon: "Gem",
    dimension: null, // centre of the framework
    shortDesc: "The shared thing that gives people a reason to interact",
    promptContext: `The Social Object is the conceptual centre of the Social Design Framework — the shared "thing" that mediates ties between people. It could be a photo (Flickr), code (GitHub), a run (Strava), a neighbourhood issue, or a collaboratively edited document. Assess: What is the platform's core social object? Is it rich enough to sustain meaningful sociality? Is it user-created or platform-controlled? Can it be exported? Does it invite co-creation or just consumption? Does it have value outside the platform?`,
    darkPatterns: [
      "Object hollowing — making the social object too thin (likes, status updates) to sustain real sociality",
      "Object capture — locking user-created objects inside the platform with no export",
      "Object substitution — gradually shifting focus from user content to ads/platform content",
    ],
    keyQuestions: [
      "What specific thing brings people together on this platform?",
      "Is the object something users create or merely consume?",
      "Can the social object be exported or preserved if the platform disappears?",
      "Does it invite response, remix, or co-creation?",
    ],
  },
  {
    id: "platform-intent",
    title: "Platform Intent & Experience Intent",
    icon: "Scale",
    dimension: null,
    shortDesc: "Alignment between business logic (ROI) and user value (ROX)",
    promptContext: `Platform Intent is the business logic (ROI — Return on Investment). Experience Intent is user-centred logic (ROX — Return on Experience). Assess: Is the business model transparent? Does revenue come from advertising (structurally misaligned — engagement is the product) or from subscription/cooperative/public models? Are success metrics proxies for user value or for extraction? Could the platform publish its business logic without users feeling betrayed? Where do Platform Intent and Experience Intent diverge, and how is that managed?

The structural point: revenue tied to engagement is the root cause of the extraction pattern library — infinite scroll, notification harassment, algorithmic amplification, FOMO framing. These patterns did not converge by accident across every major platform; they converged because engagement metrics were proxied for revenue. Generative and agentic AI do not change this dynamic — they give it a more powerful engine. A hyper-personalised nudge living in a model is more dangerous than a one-size dark pattern. The counter-design vocabulary requires a different business model, or explicit commitments to utility metrics over engagement metrics.

Key test: is the platform's design language rooted in finitude (helping users achieve goals and leave satisfied) or in capture (removing edges to maximise time spent)?`,
    darkPatterns: [
      "Misaligned metrics — optimising for engagement (time spent, clicks) rather than utility or user satisfaction",
      "Bait and switch / enshittification — launching user-centric, then degrading for advertiser or platform revenue",
      "Manufactured necessity — creating artificial needs (pay for visibility that was previously free)",
      "Data maximalism — collecting far more data than the service requires",
      "AI-native dark patterns — hyper-personalised per-user nudges in the model, more dangerous than one-size social-era manipulation",
      "Engagement-as-proxy — using time spent, clicks, and returns as success metrics when they measure capture, not value",
    ],
    keyQuestions: [
      "Can you explain the business model in one sentence that also describes something genuinely good for users?",
      "Are key metrics proxies for user value, or for engagement that proxies for revenue?",
      "Who are the customers vs. the users? Whose interests does the design actually serve?",
      "If the platform became wildly successful, would its incentives still align with user wellbeing?",
      "Does the platform measure Completability (users finishing and leaving satisfied) or capture (users staying longer)?",
    ],
  },
  {
    id: "identity",
    title: "Identity",
    icon: "User",
    dimension: null,
    shortDesc: "How users reveal, manage, and control who they are",
    promptContext: `Identity design determines the social contract of the platform. It covers real names vs. pseudonymity vs. anonymity, context-specific identities, profile granularity, and data minimisation. Assess: What minimum identity information is needed? Can users maintain context-specific identities? Is there forced identity collapse (single real-name identity)? How does it affect marginalised users? What happens to identity data on exit? Is there pseudonymous accountability? How does identity interact with moderation?

Critical lens — SpatialUI and contextual integrity: danah boyd and Alice Marwick identified context collapse as a core social media pathology — behaviour appropriate to one social context (family, colleagues, strangers) exposed to all simultaneously. The SpatialUI principle addresses this directly: bounded contexts with their own norms and audiences, grounded in Helen Nissenbaum's contextual integrity (privacy as the preservation of context-appropriate information flows). Assess whether the platform's identity architecture enables or prevents context collapse. Generative AI worsens this risk by enabling platforms to infer and recombine identity signals across contexts at scale.`,
    darkPatterns: [
      "Forced identity collapse — requiring a single real-name identity across all contexts, exposing users to context collapse",
      "Dark profiling — collecting identity signals beyond explicit provision (device fingerprinting, shadow profiles, cross-context inference)",
      "Identity lock-in — making identity data non-portable, raising switching costs",
      "Compulsory disclosure — requiring more personal info than the social object requires",
      "AI-amplified profiling — using generative models to infer sensitive attributes from innocuous identity signals",
    ],
    keyQuestions: [
      "What is the minimum identity information needed for the social object to function?",
      "Can users maintain different context-specific identities (SpatialUI)? Or does the platform enforce a single identity across all social contexts?",
      "How does the identity system affect marginalised or vulnerable users?",
      "What happens to identity data when a user leaves?",
      "How does the platform protect against AI-amplified identity inference and profiling?",
    ],
  },
  {
    id: "conversations",
    title: "Conversations",
    icon: "MessageCircle",
    dimension: null,
    shortDesc: "How users communicate, respond, and interact",
    promptContext: `Conversation design shapes whether a platform produces deliberation or provocation, depth or superficiality. Assess: What kinds of conversation does the platform enable? Does the architecture handle disagreement constructively or escalate conflict? What is the default visibility? Do notifications create pressure for immediate response? Are there affordances for listening (not just speaking)? How do conversations scale? Is content sorted by algorithmic engagement or by relevance/quality?

Apply the ReflectiveFriction principle: is there a deliberate pause at the point of action — before posting, reacting, or resharing? Does the platform restore the "do I want to do this?" decision point before amplification, or does it make action as frictionless as possible regardless of consequences? Frictionless immediacy is the extraction pattern; reflective friction is the counter-design.

Generative AI lens: AI-generated content at scale changes conversation design fundamentally. Assess whether the platform has governance for AI-generated posts, synthetic personas, and automated engagement — or whether it is effectively undefended against them.`,
    darkPatterns: [
      "Rage amplification — algorithmically surfacing the most emotionally provocative replies to maximise engagement",
      "Notification harassment — aggressive push patterns pulling users back compulsively",
      "Performative conversation — designing for public performance (likes, reactions) rather than genuine exchange",
      "False equivalence — algorithmically treating fringe positions as equivalent to established knowledge",
      "Frictionless amplification — one-click reactions and reposts with no ReflectiveFriction before the action",
      "AI content laundering — no governance for AI-generated posts, synthetic personas, or automated engagement",
    ],
    keyQuestions: [
      "What kinds of conversation is this platform designed to enable?",
      "How does the conversation architecture handle disagreement — does it escalate or deliberate?",
      "Does the notification system create pressure for immediate response?",
      "Is there ReflectiveFriction before posting, reacting, or resharing?",
      "What governance exists for AI-generated content and synthetic engagement?",
    ],
  },
  {
    id: "sharing",
    title: "Sharing",
    icon: "Share2",
    dimension: null,
    shortDesc: "How content flows, spreads, and creates value",
    promptContext: `Sharing design determines what circulates, who sees it, how it spreads, and what value it creates or extracts. Assess: What types of content can be shared? What is the default audience (network, platform, algorithmic strangers)? Is content flow push-based (algorithmic) or pull-based (user choice)? Who benefits from sharing — creator or platform? Is there friction before sharing (read-before-share)? How does the platform handle attribution and licensing? What happens to shared content over time?

Apply two finitude principles: SaveForLater (decoupling capture from consumption — seeing something interesting should not automatically pull the user into sharing or consuming it now) and ReflectiveFriction (a deliberate pause before resharing — was it read? Is the context preserved? Is attribution clear?). Frictionless virality is the extraction pattern; both principles work against it.

Also assess LegibleCuration: does the user understand why content is being surfaced to them and in what order? A sharing architecture that surfaces content by opaque algorithmic amplification is not legible, regardless of how much control the UI appears to offer.`,
    darkPatterns: [
      "Frictionless virality — one-click repost with no context, maximising spread regardless of accuracy or intent",
      "Algorithmic amplification of extremity — rewarding emotional provocation for engagement metrics",
      "Value extraction — users create content, platform captures all economic value",
      "Context stripping — removing content from its original social context, enabling misinterpretation",
      "No SaveForLater — conflating capture (seeing something) with consumption and sharing (acting on it now)",
      "Opaque amplification — users cannot see why content is being surfaced or what the ranking logic rewards",
    ],
    keyQuestions: [
      "What is the default audience for shared content?",
      "Is content flow algorithmic-push or user-pull? Is LegibleCuration in place?",
      "Who benefits from sharing — the creator, the community, or the platform?",
      "Is there ReflectiveFriction before sharing — was it read, is context preserved, is attribution clear?",
      "Is there a SaveForLater path that decouples encountering content from acting on it immediately?",
    ],
  },
  {
    id: "presence",
    title: "Presence",
    icon: "Radio",
    dimension: null,
    shortDesc: "Whether users can know if others are available and accessible",
    promptContext: `Presence covers online/offline indicators, typing signals, read receipts, last-seen timestamps, and location. Assess: What presence signals does the platform provide? Can users control their own presence visibility? Does presence design create pressure to respond immediately? Does presence serve the user or the platform? How does location-based presence interact with safety? What is the default presence state — maximally visible (opt-out) or minimally visible (opt-in)?

Apply the ConstraintTimeLocking and DifferentiatedTimeExperiences principles: does the presence architecture assume and reinforce constant availability, or does it support different temporal modes — the quick check-in, the focused session, the offline period? Presence signals that broadcast availability at all times are incompatible with ConstraintTimeLocking (user-authored time budgets) and DifferentiatedTime (distinct slow and fast modes). The key ethical question: who benefits from presence visibility — the user being visible, or the platform and other users creating social pressure for response?`,
    darkPatterns: [
      "Compulsory availability — presence indicators non-optional, creating social pressure to respond",
      "Guilt mechanics — read receipts and last-seen used to pressure response times",
      "Surveillance by design — broadcasting location/activity without meaningful user control",
      "FOMO engineering — showing what users are missing to drive compulsive checking",
      "Presence as social coercion — opt-out presence defaults that are socially costly to disable",
      "Incompatibility with finitude — presence architecture designed for constant availability, incompatible with time-budgeted or differentiated-tempo use",
    ],
    keyQuestions: [
      "What presence signals does the platform provide, and who do they serve?",
      "Can users fully control their own presence visibility with low social cost?",
      "Does the platform create an expectation of constant availability?",
      "Is the default presence state opt-in or opt-out?",
      "Does the presence design support DifferentiatedTimeExperiences — offline periods, focused sessions, slow modes?",
    ],
  },
  {
    id: "relationships",
    title: "Relationships",
    icon: "Users",
    dimension: null,
    shortDesc: "How users connect, associate, and form social graphs",
    promptContext: `Relationship design determines the social graph structure: friending, following, degrees of separation, reciprocity. Assess: Are connections reciprocal (mutual) or asymmetric (follow)? Can users categorise connections and control visibility per group? How are new connections discovered — algorithms, shared activity, or existing networks? What is the social cost of disconnecting? Are relationship metrics (follower counts) publicly visible? Can the social graph be exported? Does the design produce genuine community or celebrity hierarchies?`,
    darkPatterns: [
      "Asymmetric power — follow/follower structures producing celebrity hierarchies and parasocial dynamics",
      "Contact harvesting — aggressively importing address books with dark consent patterns",
      "Social lock-in — making the social graph non-portable (high switching costs)",
      "Manufactured connections — suggesting connections based on surveillance data, not genuine affinity",
    ],
    keyQuestions: [
      "Are connections reciprocal or asymmetric? What power dynamics does this create?",
      "Can users categorise connections and control what each group sees?",
      "Can the relationship graph be exported?",
      "Does the platform produce genuine community or celebrity hierarchies?",
    ],
  },
  {
    id: "reputation",
    title: "Reputation",
    icon: "Award",
    dimension: null,
    shortDesc: "How trustworthiness, standing, and quality are assessed",
    promptContext: `Reputation systems (likes, followers, karma, ratings, verification) create the incentive structures driving what people create and how they interact. Assess: What does the reputation system actually measure — popularity, quality, helpfulness? Is reputation contextual or collapsed into a single score? Who assigns it — algorithms, peers, moderators? Can it be gamed? Are metrics publicly visible (and what does that incentivise)? Does it value sustained contribution or viral moments? How does reputation decay or allow for growth?`,
    darkPatterns: [
      "Vanity metrics — making simplistic metrics (likes, followers) highly visible to drive status competition",
      "Reputation inequality — early adopters accumulate disproportionate reputation through network effects",
      "Social proof manipulation — allowing reputation signals to be purchased or botted",
      "Permanent record — all reputation history permanently visible with no path to redemption",
    ],
    keyQuestions: [
      "What does the reputation system actually measure?",
      "Is reputation contextual or a single collapsed score?",
      "Can reputation be gamed? What are the obvious strategies?",
      "Does the system value sustained quality or viral moments?",
    ],
  },
  {
    id: "groups",
    title: "Groups",
    icon: "CircleDot",
    dimension: null,
    shortDesc: "How communities and sub-communities form and govern themselves",
    promptContext: `Groups are where abstract platform potential becomes concrete community — lists, open/closed/secret groups, membership, permissions, boundaries. Assess: What kinds of groups can users form? What governance tools exist for decision-making, role assignment, norm-setting? How does governance work within groups vs. platform-level? How do groups scale? Can groups federate or maintain inter-group relationships? Does the platform design for genuine communities of practice or merely audience collections?`,
    darkPatterns: [
      "Echo chamber amplification — algorithmically reinforcing group homogeneity",
      "Governance void — providing group creation without governance tools",
      "Platform override — unilaterally changing group rules without community consent",
      "Growth-at-all-costs — pushing groups to grow beyond their healthy size",
    ],
    keyQuestions: [
      "What governance tools exist within groups?",
      "How do groups handle the transition from small community to larger scale?",
      "Can groups set and enforce their own norms independently?",
      "Does the platform design for communities of practice or audience collections?",
    ],
  },
  {
    id: "agency",
    title: "Agency",
    icon: "Shield",
    dimension: null,
    shortDesc: "How users take control of their experience and protect their autonomy",
    promptContext: `Agency is the user's capacity to protect their own attention, wellbeing, and autonomy — the immune response, and the dimension where the finitude principles converge most directly. Assess: Can users control their feed (algorithmic vs. chronological, own filters)? How transparent is algorithmic logic? What notification controls exist? Can data/content be exported in usable formats? How easy is account deletion? Can users set boundaries around AI features? Do users have meaningful input into governance? Is the platform auditable?

Assess against the full finitude principle vocabulary:
- **ExplorativeUI**: can users navigate the platform as a space they can see the shape of, or are they on a conveyor belt?
- **EndDesign**: does the platform have genuine endings — "you're all caught up," completable sessions — or is it engineered for infinite continuation?
- **LegibleCuration**: can users see and author the ranking? Why this content, why now, in what order? Or is the recommender a black box?
- **ConstraintTimeLocking**: can users set and enforce their own time budgets as a design default, not an opt-in buried in settings? Critically: do they hold the key, or does the platform?
- **DifferentiatedTimeExperiences**: does the platform support distinct temporal modes — a quick daily check-in, a slower weekly deep engagement — or is all use the same texture?
- **Completability**: does the platform measure and optimise for users finishing their goals and leaving satisfied?

Agentic AI governance: as platforms integrate AI agents, Agency must extend to: human-in-the-loop checkpoints before consequential actions, consequence-gating (review/confirm before irreversible actions), trust calibration (can the user build an accurate model of what the AI handles well vs. not), audit trails, and delegation UI (explicit scoping of what the agent is authorised to do).`,
    darkPatterns: [
      "Illusory control — settings that appear to give control but are ineffective or quietly undermined",
      "Roach motel — easy to join, deliberately difficult to delete or export",
      "Algorithmic opacity — black-box recommendation with no LegibleCuration",
      "Learned helplessness — frequent changes that make users give up managing their experience",
      "Consent fatigue — overwhelming consent dialogs designed for blind clicking",
      "No EndDesign — the platform is engineered for infinite continuation with no genuine endings",
      "ConstraintTimeLocking sabotage — time budgets available only as deeply buried opt-in settings",
      "Agentic overreach — AI agents acting without human-in-the-loop checkpoints or consequence-gating",
    ],
    keyQuestions: [
      "Can users choose between algorithmic and chronological feeds? Is LegibleCuration in place?",
      "How transparent is the algorithmic logic — can users understand and override it?",
      "How easy is it to leave the platform with your data — is deletion easier or harder than joining?",
      "Does the platform have EndDesign — genuine endings, completable sessions?",
      "Can users author their own ConstraintTimeLocking? Do they hold the key?",
      "Do users have genuine participatory input into platform governance?",
      "If AI agents are present: is there human-in-the-loop oversight, consequence-gating, and an audit trail?",
    ],
  },
  {
    id: "enable-dimension",
    title: "Enable: Foundational Health",
    icon: "Lightbulb",
    dimension: null, // meta-dimension
    shortDesc: "Are the foundational conditions for healthy social life established?",
    promptContext: `Enable is the meta-dimension concerned with establishing the conditions under which healthy social life can emerge. Assess the platform holistically: Does the architecture make constructive participation the default? Are governance frameworks transparent and participatory? Do incentive structures align with community values? Is there clear onboarding that sets norms? How are the Identity, Conversations, Presence, and Platform Intent/Experience Intent concepts working together to create a healthy foundation? What gaps exist in the enabling infrastructure?

Holistic finitude assessment: does the platform, taken as a whole, re-introduce or remove edges? Healthy social design re-introduces temporal edges (EndDesign, DifferentiatedTimeExperiences), contextual edges (SpatialUI), and directional edges (ExplorativeUI). The extraction architecture removed all of them deliberately. Assess whether the enabling infrastructure — onboarding, defaults, incentive structures, governance — is oriented toward finitude (helping users achieve goals and leave satisfied) or toward capture (removing decision points and stopping moments). This is the structural question that sits beneath all 13 dimensions.`,
    darkPatterns: [
      "Weak governance — unclear rules and opaque decision-making",
      "Misaligned incentives — rewards that encourage bad behaviour",
      "Poor onboarding — newcomers don't understand norms",
      "Fragmented coordination — concepts work against each other",
    ],
    keyQuestions: [
      "Do the foundational design choices align with democratic values?",
      "Are the platform's rules clear and fairly enforced?",
      "Does the incentive structure encourage positive behaviour?",
      "Is governance participatory and transparent?",
    ],
  },
  {
    id: "grow-dimension",
    title: "Grow: Sustainable Development",
    icon: "TrendingUp",
    dimension: null, // meta-dimension
    shortDesc: "Does the platform create value sustainably without extraction?",
    promptContext: `Grow addresses how the platform sustains itself and develops over time. Assess holistically: Does growth create meaningful value or just extract user attention? Is the business model transparent and aligned with user wellbeing? How do the Sharing, Relationships, Reputation, and Groups concepts work together to create network effects that benefit everyone? Are there positive feedback loops where community participation creates more value? What happens as the platform scales — does it remain healthy? How does financial sustainability interact with the user experience?`,
    darkPatterns: [
      "Extractive growth — platform captures all value, users capture none",
      "Degrading experience — as platform grows, quality drops for existing users",
      "Network lock-in — switching costs trap users despite poor service",
      "Algorithmic enshittification — quality degrades to push premium features",
    ],
    keyQuestions: [
      "Does growth create value for users and community, or just for the platform?",
      "Is the business model sustainable without becoming exploitative?",
      "Do network effects work in users' favour or against them?",
      "Does quality improve or degrade as the platform scales?",
    ],
  },
  {
    id: "protect-dimension",
    title: "Protect: Immune System Health",
    icon: "ShieldCheck",
    dimension: null, // meta-dimension
    shortDesc: "Is the platform's immune system strong, fair, and adaptive?",
    promptContext: `Protect describes the platform's immune system: the mechanisms that identify and respond to threats. Assess holistically: Does the platform defend against internal threats (toxicity, abuse, manipulation) and external threats (data breaches, regulatory capture)? How do the Agency, Reputation, Conversations, and Groups concepts work together to enable both safety and freedom? Is moderation fair and transparent? Can the community contribute to safety? Does the system adapt and learn? What are the tradeoffs between protection and openness, and how are they balanced? Does protection serve users or just the platform?`,
    darkPatterns: [
      "Security theatre — visible but ineffective safety measures",
      "Disproportionate moderation — rules applied unfairly to marginalised groups",
      "Surveillance creep — expanding data collection justified by safety",
      "Captured governance — safety rules designed to benefit the platform, not users",
    ],
    keyQuestions: [
      "Are safety mechanisms fair and transparent?",
      "Does moderation protect vulnerable users or silence them?",
      "Is the community able to contribute to safety?",
      "Are the tradeoffs between safety and freedom clearly acknowledged?",
    ],
  },
];

export const ANALYSIS_SYSTEM_PROMPT = `You are an expert social platform design reviewer, grounded in the Social Design Framework developed for the Rebuild.net European social platforms initiative.

You evaluate social platforms against 13 core design dimensions plus 3 meta-dimensions. Your perspective is rooted in European values: democratic participation, the commons, community empowerment, data sovereignty, and human dignity. You draw on HCI, STS (Science and Technology Studies), design theory, sociology, philosophy of technology, calm technology research, and the emerging literature on generative and agentic AI interfaces.

## Structural lens: three eras of interface design
You understand social platforms in the context of three overlapping design eras:

1. **The social/media era** — patterns optimised not for usability but for engagement extraction. The mechanism is the habit loop (trigger → action → variable reward → investment), engineered to keep turning. The canonical extraction patterns are infinite scroll (removing the user's cognitive decision point), algorithmic amplification of emotion, notification harassment, social proof exploitation, and FOMO framing. These are not accidents — they are the structural consequence of revenue tied to attention. Revenue tied to engagement is the variable that does not disappear when AI arrives; it gets a more powerful engine.

2. **The generative AI era** — a shift from command-based to intent-based outcome specification. The user states what outcome they want; the locus of control reverses. This created new usability debt: the chat-wall problem (scrolling conversation is a poor substrate for structured work), the iteration norm (users almost always engage in multi-step refinement), and the emergence of "prompt engineering" as a displaced competence. The settling pattern language: design-time AI helps build interfaces; run-time AI personalises and adapts them. Adaptation goes further than personalisation — it changes layout, navigation, and density, not just content.

3. **The agentic AI era** — the shift from response to proactive problem-solving. The agent perceives, plans, executes, and acts. The user flow stops being linear; buttons-and-pages thinking breaks down. The entire emerging pattern vocabulary is about governance: human-in-the-loop (HITL) as a first-class feature, trust calibration (building an accurate user model of where the agent is competent and where it isn't), supervisory control with progressive disclosure, delegation UI (explicit scoping of what the agent handles), consequence-gating (review/confirm before irreversible actions), and undo + audit trails. The governing principle from academic HCI: meaningful human oversight at points of business or social impact, not micromanagement.

## The finitude framework
The deepest structural insight across all three eras: social media's foundational achievement was the engineered removal of edges — no end to the scroll, no boundary between audiences, no temporal rhythm, no natural stopping point. Healthy design re-introduces edges: temporal, spatial, contextual, and terminal. This sits in the lineage of calm technology (Weiser & Brown), Amber Case's Calm Tech Institute, and the time-well-spent movement.

When reviewing a platform, assess it against these constructive design principles — use them as a vocabulary for recommendations:

- **ExplorativeUI** — restores wayfinding: the user moves through a space they can see the shape of, choosing direction. Inverts the algorithmic feed (conveyor belt) with a user-directed terrain. Test: can the user see where the edges are?
- **EndDesign** — re-installs the terminus. The newspaper had a back page; the album had a last track. Infinite scroll deliberately abolished the "do I want to continue?" decision. EndDesign re-introduces genuine endings that release the user, not cliffhangers that re-engage them.
- **SpatialUI** — re-introduces bounded contexts (rooms, registers) with their own norms and audiences, inverting context collapse (danah boyd / Alice Marwick). Grounded in Helen Nissenbaum's contextual integrity: privacy as context-appropriate information flow. Different social contexts get different places, not one global timeline.
- **SaveForLater** — decouples capture from consumption. Seeing something interesting and consuming it are not the same act. Enables asynchronous engagement as a default, not a workaround.
- **DefaultMultilingual** — genuine multilingualism as baseline expectation, not add-on. Generative AI collapses the cost to near-zero; failure to implement is now a choice, not a constraint.
- **ConstraintTimeLocking** — time budgets enforced as design defaults, not opt-in settings. Ethical hinge: the user must author and hold the key to their own constraints. A platform-imposed lock is paternalism; a user-authored lock is sovereignty.
- **DifferentiatedTimeExperiences** — re-introduces editorial cadence: the daily 5-min, the weekly 15-min deep, the monthly synthesis. Different tempos afford different cognitive modes (System 1 skim vs System 2 deliberation). Inverts the feed's collapse of all rhythms into one continuous now.
- **LegibleCuration** — the user can see, and ideally author, the ranking: why this content, why now, in what order. Without this, explorative and time-bounded interfaces can still be optimised against the user underneath.
- **ReflectiveFriction** — a deliberate pause at the point of action before posting, reacting, or resharing. Creates cognitive space before amplification. Not about blocking action, but restoring the "do I want to do this?" decision point.
- **Completability** — the interface measures whether you finished your task and left satisfied, not whether you stayed. A graceful exit is a feature, not a failure.

## Dark patterns in the AI era
AI-native dark patterns are more dangerous than social-era ones because they operate per-user: hyper-optimised, bespoke nudges living in the model rather than one-size manipulation. The counter-design vocabulary — explainability, undo, accountability audits, no hidden manipulation — is the same governance vocabulary the agentic pattern language is building.

Note also the homogenisation risk: around 42% of AI-generated interfaces already show similar navigation structures. Interfaces can be simultaneously more individually adaptive and more globally samey.

## When assessing a platform, you consider:
- Does the design empower users or extract from them?
- Are incentive structures aligned with user wellbeing, or with engagement metrics that proxy attention for revenue?
- How does the design affect marginalised or vulnerable users?
- What are the second-order social effects of design choices?
- How does the platform relate to the broader democratic public sphere?
- Where does the platform sit in the finitude spectrum — does it remove or restore edges?
- How prepared is the platform for generative and agentic AI integration, and what governance is in place?

You are constructive and specific. You name dark patterns when you see them, but always suggest concrete alternatives using the principles above. Reference relevant research and regulatory frameworks (GDPR, DSA, DMA) where applicable.

For each concept you review, provide:
1. **Strengths** (2-4 bullet points): What is the platform genuinely doing well in this dimension?
2. **Assessment** (2-3 paragraphs): A balanced evaluation — strengths and weaknesses in context.
3. **Score** (1-5): 1 = actively harmful, 2 = problematic, 3 = adequate, 4 = good, 5 = exemplary
4. **Dark patterns detected**: List any dark patterns you observe (or "None detected")
5. **Recommendations** (3-5 bullet points): Specific, actionable suggestions — use the finitude principle vocabulary where relevant
6. **European perspective**: One paragraph on how this dimension could better align with European values of participation, commons, and democratic empowerment`;

export function buildConceptPrompt(concept, platformUrl, platformDescription, siteContent, fileContext = '') {
  let siteSection = '';
  if (siteContent) {
    const truncated = siteContent.length > 4000
      ? siteContent.slice(0, 4000) + '\n... [truncated]'
      : siteContent;
    siteSection = `\n## Actual page content fetched from ${platformUrl}:\n\`\`\`\n${truncated}\n\`\`\`\n`;
  }

  let fileSection = '';
  if (fileContext) {
    fileSection = `\n## User-provided materials (screenshots, documents):\n${fileContext}\n`;
  }

  return `Analyse the social platform at ${platformUrl} for the following Social Design Framework dimension:

## ${concept.title}
${concept.promptContext}

## Known dark patterns to watch for:
${concept.darkPatterns.map(p => `- ${p}`).join('\n')}
${siteSection}${fileSection}
## Platform context provided by the user:
${platformDescription || 'No additional description provided. Use your knowledge of this platform.'}

You MUST respond using EXACTLY these six section headers, in this order. Do not rename them, do not skip them:

### Strengths
### Assessment
### Score: [write only a single digit 1, 2, 3, 4, or 5]
### Dark Patterns Detected
### Recommendations
### European Perspective

Base your analysis on the actual fetched page content where available. Reference specific elements you can see — navigation items, features mentioned, headings, calls to action, signup flows, visible policies. Combine this with your broader knowledge of the platform. Be specific and concrete.`;
}

// ─── Design mode ────────────────────────────────────────────────────────────

export const DESIGN_SYSTEM_PROMPT = `You are an expert social platform design consultant, grounded in the Social Design Framework developed for the Rebuild.net European social platforms initiative.

Your role is to help people design NEW social platforms — not to review what already exists. You generate concrete, actionable design guidance for each dimension of the Social Design Framework, tailored to a specific platform concept.

Your perspective is rooted in European values: democratic participation, the commons, community empowerment, data sovereignty, and human dignity. You draw on HCI research, calm technology, design theory, the finitude framework, and exemplary platforms from cooperative, public, and civic tech spaces.

## The finitude philosophy
The single most important design commitment for new social platforms: social media's foundational achievement was the engineered removal of edges — no end to the scroll, no boundary between audiences, no temporal rhythm, no natural stopping point. This was not an accident; it is the structural consequence of revenue tied to engagement. Your platform should consciously re-introduce edges: temporal, spatial, contextual, and terminal.

Apply the following design principles as a vocabulary throughout your guidance. They are not features — they are a coherent philosophy, and each inverts a specific extraction pattern:

- **ExplorativeUI** — give users a space with visible shape and edges they navigate by agency, not a conveyor belt they consume. Ask: can the user see where the edges are?
- **EndDesign** — design genuine endings that release the user. The interface should say "you're done" and mean it — not manufacture a cliffhanger. "Re-Gutenberging" the interface: books end; feeds don't.
- **SpatialUI** — design bounded contexts (rooms, registers, spaces) with their own norms and audiences. Invert context collapse (danah boyd / Alice Marwick). Ground decisions in Helen Nissenbaum's contextual integrity: information should flow in ways appropriate to each social context, not collapse into one global timeline.
- **SaveForLater** — decouple capture from consumption. Seeing something interesting should not automatically pull the user into a session now. Design for asynchronous intent.
- **DefaultMultilingual** — genuine multilingualism as a baseline, not an add-on. Generative AI makes this affordable; failing to implement it is now a design choice.
- **ConstraintTimeLocking** — time budgets as design defaults, not opt-in settings. Critical ethical hinge: the user must author and hold the key. A user-authored constraint is sovereignty; a platform-imposed constraint is paternalism.
- **DifferentiatedTimeExperiences** — design distinct temporal modes: the daily 5-minute skim, the weekly 15-minute deep read, the monthly synthesis. Different tempos afford different cognitive modes. Re-introduce editorial cadence as interaction design.
- **LegibleCuration** — make ranking visible and user-autherable. Why this content, why now, in what order? Without this, all other finitude principles can be undermined by an opaque recommender underneath.
- **ReflectiveFriction** — install a deliberate pause at the point of action before posting, reacting, or resharing. Restore the "do I want to do this?" decision point before amplification.
- **Completability** — design for users to finish and leave satisfied. Measure success by graceful exits, not time spent.

## The attention economy trap
These principles are essentially unmonetizable under an advertising model — that is not incidental. A feed that ends, budgets your time, and helps you leave is a feed that loses the ad auction. The natural home for this design language is non-commercial, public-service, and institutional contexts — cooperative platforms, civic tech, public education, public broadcasting — where the business model does not punish finitude. If the platform you are designing has advertising revenue, name this tension explicitly in your guidance.

## Generative and agentic AI considerations
Design guidance should account for where social platforms are heading. Generative AI enables adaptive interfaces that change structure (not just content) based on context — a direct enabler of SpatialUI and DifferentiatedTime. Agentic AI introduces new governance requirements: human-in-the-loop checkpoints, consequence-gating before irreversible actions, delegation UI, trust calibration, and audit trails. When AI features are likely in the platform being designed, address these governance questions explicitly — they are interface design problems, not backend problems.

## When generating design guidance, consider:
- What are the key design decisions this team must resolve in this dimension?
- Which finitude principles apply, and how specifically?
- What extraction patterns from existing platforms must be consciously designed against?
- How does this dimension serve user empowerment rather than platform capture?
- Where does AI (generative or agentic) change the design problem in this dimension?
- What does the European values frame demand here — participation, the commons, data sovereignty?

For each dimension, provide:
1. **Design Considerations** (3-5 bullet points): Key questions and decisions the team must resolve
2. **Suggestions** (3-5 bullet points): Concrete design choices that serve users well — reference real examples, name relevant finitude principles
3. **Watch Out For** (2-4 bullet points): Dark patterns and traps this type of platform is most likely to fall into
4. **European Perspective**: One paragraph on how this dimension can be designed to embody European values of participation, the commons, and democratic empowerment`;

export function buildDesignPrompt(concept, platformDescription, fileContext = '') {
  const fileSection = fileContext
    ? `\n## Uploaded materials (concept docs, wireframes, pitch deck):\n${fileContext}\n`
    : '';

  return `You are helping design a new social platform. Here is the concept:

## Platform Concept:
${platformDescription}
${fileSection}
Now provide design guidance for the following Social Design Framework dimension:

## ${concept.title}
${concept.promptContext}

## Known dark patterns to design against:
${concept.darkPatterns.map(p => `- ${p}`).join('\n')}

You MUST respond using EXACTLY these four section headers, in this order. Do not rename them, do not skip them:

### Design Considerations
### Suggestions
### Watch Out For
### European Perspective

Be specific and concrete. Reference real platform examples (good and bad) where helpful. Tailor your guidance directly to the platform concept described above — and to any uploaded materials if provided.`;
}
