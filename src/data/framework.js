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
    lightPatterns: [
      "Object depth — invest the social object with enough structure (provenance, versioning, context) to carry real meaning, not just a status ping",
      "Object portability — full export of user-created objects in open formats, on demand, no friction",
      "Object fidelity — keep platform and ad content structurally separate from, and never crowding out, the object at the center of the experience",
    ],
    keyQuestions: [
      "What specific thing brings people together on this platform?",
      "Is the object something users create or merely consume?",
      "Can the social object be exported or preserved if the platform disappears?",
      "Does it invite response, remix, or co-creation?",
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
    lightPatterns: [
      "SpatialUI identities — support distinct, context-bound personas (work, family, hobby) natively, not as a workaround",
      "Profiling transparency — a visible, plain-language log of every inferred attribute, with one-click deletion",
      "Identity portability — export identity and reputation data in an interoperable format",
      "Minimal-disclosure onboarding — signup asks only what the social object needs; everything else is opt-in later",
      "Inference consent gate — require an explicit, specific opt-in before running cross-context inference",
      "Persona profiling — show users the actual inferred segment or persona the algorithm has built of them, not just a raw log of attributes (Bright Patterns)",
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
    lightPatterns: [
      "ReflectiveFriction on reply — a brief pause or preview before a heated reply posts",
      "Calm notifications — batched, user-scheduled digests by default; real-time push is opt-in",
      "Depth-first threading — reward formats that support sustained dialogue over one-line dunks",
      "Provenance labelling — visible confidence/consensus signals so fringe claims aren't visually equal to established ones",
      "ReflectiveFriction on reshare — a context-preserving share step in place of a one-click repost",
      "AI provenance labelling — unspoofable labels on AI-generated posts and bots, plus rate limits on synthetic engagement",
      "Prebunking (inoculation) — proactively expose users to a weakened example of a common manipulation tactic before they meet it live, building resistance (inoculation theory, McGuire 1964; used by WHO/UN anti-misinformation campaigns)",
      "Lateral-reading affordances — a one-click way to check a source's credibility elsewhere before trusting it, rather than asking users to judge a claim in isolation (Wineburg et al., 2022)",
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
    lightPatterns: [
      "Context-preserving share — resharing keeps the original framing and thread attached",
      "Calibrated amplification — down-weight, don't ban, content whose reach is driven disproportionately by outrage",
      "Creator-value split — a direct mechanism (tips, revenue share, licensing) for creators to capture value",
      "SaveForLater — a first-class read-later queue, separate from posting and sharing",
      "LegibleCuration — a \"why am I seeing this\" explainer on every algorithmically surfaced post",
      "Attribution-locked sharing — original author and context ride along automatically and can't be stripped",
      "Outside my bubble — a deliberate, opt-in surfacing of perspectives adjacent to a user's usual feed, distinct from blanket amplification throttling (Bright Patterns)",
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
    lightPatterns: [
      "Presence as opt-in — online, typing, and read-receipt indicators default off, enabled per-conversation",
      "No-guilt read state — reading a message never signals the sender unless the user chooses to send that signal",
      "Location minimalism — no location signal without an explicit, scoped, revocable grant",
      "FOMO-free digest — \"what you missed\" is a calm, on-demand summary, not a push-driven loop",
      "Low-cost invisibility — going offline costs nothing socially — no \"last seen 3 days ago\" shaming",
      "DifferentiatedTimeExperiences — presence design explicitly supports both a quick check-in mode and a fully offline mode",
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
    promptContext: `Relationship design determines the social graph structure: friending, following, degrees of separation, reciprocity. Assess: Are connections reciprocal (mutual) or asymmetric (follow)? Can users categorise connections and control visibility per group? How are new connections discovered — algorithms, shared activity, or existing networks? What is the social cost of disconnecting? Are relationship metrics (follower counts) publicly visible? Can the social graph be exported? Does the design produce genuine community or celebrity hierarchies?

Apply the bridging vs. bonding distinction (Putnam's social capital theory, used by New Public's Civic Signals framework): bonding capital reinforces ties within an already-similar group; bridging capital connects people across difference. Discovery and connection mechanisms that only ever suggest more of the same — same interests, same views, same demographic — build bonding capital exclusively and compound homogeneity over time. Assess whether the platform's connection model does anything to build bridging capital, or whether it is structurally bonding-only.`,
    darkPatterns: [
      "Asymmetric power — follow/follower structures producing celebrity hierarchies and parasocial dynamics",
      "Contact harvesting — aggressively importing address books with dark consent patterns",
      "Social lock-in — making the social graph non-portable (high switching costs)",
      "Manufactured connections — suggesting connections based on surveillance data, not genuine affinity",
      "Bonding-only design — discovery and connection mechanisms that only ever reinforce existing homogeneous ties, with no mechanism for bridging across difference",
    ],
    lightPatterns: [
      "Reciprocity by default — new connection types default to mutual confirmation; one-way \"follow\" is a separate, deliberate feature",
      "Consent-first import — contact import is opt-in, one contact at a time, never a bulk silent scan",
      "Graph portability — the full connection graph exports in an open format on request",
      "Affinity-based suggestions — connection suggestions are explainable, not derived from undisclosed surveillance",
      "Bridging by design — discovery features that deliberately surface cross-group ties alongside homophilous ones, building bridging capital rather than bonding capital alone (Putnam; New Public's Civic Signals)",
    ],
    keyQuestions: [
      "Are connections reciprocal or asymmetric? What power dynamics does this create?",
      "Can users categorise connections and control what each group sees?",
      "Can the relationship graph be exported?",
      "Does the platform produce genuine community or celebrity hierarchies?",
      "Does the connection model build bridging capital (cross-group ties), or only bonding capital (reinforcing existing in-groups)?",
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
    lightPatterns: [
      "Muted metrics — like and follower counts hidden by default, visible only to the account owner unless they choose otherwise",
      "New-voice boosting — deliberate discovery slots for newer contributors, not just accumulated-reputation leaders",
      "Verifiable reputation — signals that are structurally resistant to purchase or botting",
      "Reputation decay & redemption — old missteps fade in weight over time, with a visible path to rebuild standing",
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
    lightPatterns: [
      "Bridging prompts — occasional, opt-in surfacing of adjacent groups to counter homogeneity",
      "Governance starter kit — every new group gets built-in tools for roles, voting, and norm-setting",
      "Community consent for rule changes — platform policy changes affecting a group require notice and, where feasible, a group-level override",
      "Healthy-size nudges — tools that help large groups split or sub-structure rather than being pushed to grow indefinitely",
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

Agentic AI governance: as platforms integrate AI agents, Agency must extend to: human-in-the-loop checkpoints before consequential actions, consequence-gating (review/confirm before irreversible actions), trust calibration (can the user build an accurate model of what the AI handles well vs. not), audit trails, and delegation UI (explicit scoping of what the agent is authorised to do).

External accountability: does the platform publish periodic algorithmic risk assessments — the kind of systemic-risk-assessment obligation the EU Digital Services Act places on very large platforms (Art. 34/35) — or is oversight purely internal and self-reported? Published, external accountability is a distinct mechanism from user-facing transparency UI; a platform can have one without the other.`,
    darkPatterns: [
      "Illusory control — settings that appear to give control but are ineffective or quietly undermined",
      "Roach motel — easy to join, deliberately difficult to delete or export",
      "Algorithmic opacity — black-box recommendation with no LegibleCuration",
      "Learned helplessness — frequent changes that make users give up managing their experience",
      "Consent fatigue — overwhelming consent dialogs designed for blind clicking",
      "No EndDesign — the platform is engineered for infinite continuation with no genuine endings",
      "ConstraintTimeLocking sabotage — time budgets available only as deeply buried opt-in settings",
      "Agentic overreach — AI agents acting without human-in-the-loop checkpoints or consequence-gating",
      "Unaudited algorithmic risk — no external or published assessment of the ranking or recommendation system's societal risks",
    ],
    lightPatterns: [
      "Real controls — every visible setting demonstrably changes behaviour; no cosmetic toggles",
      "One-step exit — account deletion and full data export as easy to find and use as sign-up",
      "LegibleCuration — a persistent, one-click view of why the feed looks the way it does, plus a chronological option",
      "Stable defaults — changes to defaults are rare, explained, and reversible",
      "Consent minimalism — one clear, layered consent flow; no dark-pattern nudging toward \"accept all\"",
      "EndDesign — genuine \"you're caught up\" states that stop the feed and release the user",
      "User-held ConstraintTimeLocking — time budgets are default-on and user-authored, not a buried opt-in",
      "Agentic guardrails — any consequential AI-agent action requires human-in-the-loop confirmation, an audit trail, and easy undo",
      "Nutrition Label — a standardised, at-a-glance disclosure of what a feature or algorithm optimises for and what data it uses, styled like a food nutrition label rather than a buried policy page (Bright Patterns)",
      "Published risk assessment — a periodic, public assessment of the systemic risks the ranking system poses, not just internal review (cf. EU DSA Art. 34/35)",
    ],
    keyQuestions: [
      "Can users choose between algorithmic and chronological feeds? Is LegibleCuration in place?",
      "How transparent is the algorithmic logic — can users understand and override it?",
      "How easy is it to leave the platform with your data — is deletion easier or harder than joining?",
      "Does the platform have EndDesign — genuine endings, completable sessions?",
      "Can users author their own ConstraintTimeLocking? Do they hold the key?",
      "Do users have genuine participatory input into platform governance?",
      "If AI agents are present: is there human-in-the-loop oversight, consequence-gating, and an audit trail?",
      "Does the platform publish external, periodic algorithmic risk assessments, or is oversight purely internal?",
    ],
  },
  {
    id: "enable-dimension",
    title: "Enable: Foundational Health",
    icon: "Lightbulb",
    dimension: null, // meta-dimension
    shortDesc: "Are the foundational conditions for healthy social life established?",
    promptContext: `Enable is the meta-dimension concerned with establishing the conditions under which healthy social life can emerge. Assess the platform holistically: Does the architecture make constructive participation the default? Are governance frameworks transparent and participatory? Do incentive structures align with community values? Is there clear onboarding that sets norms? How are the Identity, Conversations, Presence, and Platform Intent/Experience Intent concepts working together to create a healthy foundation? What gaps exist in the enabling infrastructure?

Holistic finitude assessment: does the platform, taken as a whole, re-introduce or remove edges? Healthy social design re-introduces temporal edges (EndDesign, DifferentiatedTimeExperiences), contextual edges (SpatialUI), and directional edges (ExplorativeUI). The extraction architecture removed all of them deliberately. Assess whether the enabling infrastructure — onboarding, defaults, incentive structures, governance — is oriented toward finitude (helping users achieve goals and leave satisfied) or toward capture (removing decision points and stopping moments). This is the structural question that sits beneath every dimension.`,
    darkPatterns: [
      "Weak governance — unclear rules and opaque decision-making",
      "Misaligned incentives — rewards that encourage bad behaviour",
      "Poor onboarding — newcomers don't understand norms",
      "Fragmented coordination — concepts work against each other",
    ],
    lightPatterns: [
      "Published governance — rules, enforcement, and appeals are public and consistently applied",
      "Wellbeing-aligned incentives — internal incentives tied to user-reported satisfaction, not raw engagement",
      "Norm-setting onboarding — the first-run experience actively teaches community norms",
      "Coordinated design review — dimensions are reviewed together for one coherent experience, not shipped in isolation",
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
    lightPatterns: [
      "Shared-value growth — a visible mechanism where platform growth measurably benefits existing users, not just the platform",
      "Quality floor — a committed, monitored quality bar that doesn't erode with scale",
      "Low-friction exit — switching costs kept low; interoperability treated as a trust-building retention strategy, not lock-in",
      "Anti-enshittification commitment — public metrics tracking whether core features degrade to push premium tiers",
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
    promptContext: `Protect describes the platform's immune system: the mechanisms that identify and respond to threats. Assess holistically: Does the platform defend against internal threats (toxicity, abuse, manipulation) and external threats (data breaches, regulatory capture)? How do the Agency, Reputation, Conversations, and Groups concepts work together to enable both safety and freedom? Is moderation fair and transparent? Can the community contribute to safety? Does the system adapt and learn? What are the tradeoffs between protection and openness, and how are they balanced? Does protection serve users or just the platform?

Apply procedural justice theory (Tyler's model, applied to platforms by the Yale Justice Collaboratory): most moderation today is deterrence-based — a rule is broken, an escalating punishment follows, end of interaction. Procedural justice names four things that determine whether people accept an enforcement outcome as legitimate regardless of whether they agree with it: Voice (a genuine, accessible path to be heard or appeal before the decision is final), Neutrality (consistent, rule-based application regardless of who is involved), Respect (dignified communication in warnings and removals, not purely punitive notices), and Trustworthiness (a clear, specific, legible rationale for the action, not a generic policy citation). Assess whether the platform's enforcement system embodies these, or is purely punitive.`,
    darkPatterns: [
      "Security theatre — visible but ineffective safety measures",
      "Disproportionate moderation — rules applied unfairly to marginalised groups",
      "Surveillance creep — expanding data collection justified by safety",
      "Captured governance — safety rules designed to benefit the platform, not users",
      "Deterrence-only enforcement — punishment-first moderation with no voice, explanation, or path to appeal",
    ],
    lightPatterns: [
      "Measured safety — published, audited effectiveness data for safety features, not just their existence",
      "Equitable moderation — outcomes tracked and audited for disparate impact across groups",
      "Purpose-limited data — safety-justified data collection is scoped, time-limited, and separately audited",
      "User-accountable safety — a community advisory mechanism with real influence over safety policy",
      "Voice — a genuine, accessible appeal or reconsideration path before an enforcement decision is treated as final (procedural justice)",
      "Neutral enforcement — consistent, rule-based decisions applied the same way regardless of who is involved",
      "Respectful enforcement — dignified, specific communication in warnings and removals, not a form-letter punishment notice",
      "Trustworthy rationale — a clear, specific explanation of why an action was taken, not a generic policy citation",
    ],
    keyQuestions: [
      "Are safety mechanisms fair and transparent?",
      "Does moderation protect vulnerable users or silence them?",
      "Is the community able to contribute to safety?",
      "Are the tradeoffs between safety and freedom clearly acknowledged?",
      "Does the enforcement system offer voice, neutrality, respect, and a trustworthy rationale (procedural justice), or is it purely punitive?",
    ],
  },
];

export const ANALYSIS_SYSTEM_PROMPT = `You are an expert social platform design reviewer, grounded in the Social Design Framework developed for the Rebuild.net European social platforms initiative.

You evaluate social platforms against 9 core design dimensions plus 3 meta-dimensions. Your perspective is rooted in European values: democratic participation, the commons, community empowerment, data sovereignty, and human dignity. You draw on HCI, STS (Science and Technology Studies), design theory, sociology, philosophy of technology, calm technology research, and the emerging literature on generative and agentic AI interfaces. Seven of these dimensions — Identity, Conversations, Sharing, Presence, Relationships, Reputation, and Groups — trace to Kietzmann et al.'s "honeycomb" framework of social media functionality; Social Object draws on Engeström's concept of object-centred sociality.

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
- **ReflectiveFriction** — a deliberate pause at the point of action before posting, reacting, or resharing. Creates cognitive space before amplification. Not about blocking action, but restoring the "do I want to do this?" decision point. Grounded in "data friction" (Bates, 2017) and the nudge/boost intervention literature (Kozyreva et al., 2022).
- **Completability** — the interface measures whether you finished your task and left satisfied, not whether you stayed. A graceful exit is a feature, not a failure.

## Dark patterns in the AI era
AI-native dark patterns are more dangerous than social-era ones because they operate per-user: hyper-optimised, bespoke nudges living in the model rather than one-size manipulation. The counter-design vocabulary — explainability, undo, accountability audits, no hidden manipulation — is the same governance vocabulary the agentic pattern language is building.

The EU's AI Act (Article 5) goes beyond a transparency expectation: it prohibits certain AI practices outright as incompatible with fundamental rights — manipulative or deceptive techniques that materially distort behaviour and cause harm, exploitation of vulnerabilities tied to age, disability, or socioeconomic situation, and social-scoring systems. When AI-driven personalisation crosses from persuasive into manipulative or exploitative, treat that as a legal red line, not just a UX judgement call.

Note also the homogenisation risk: around 42% of AI-generated interfaces already show similar navigation structures. Interfaces can be simultaneously more individually adaptive and more globally samey.

## The EU deceptive-patterns taxonomy (EDPB)
Beyond the dark patterns named per dimension, the European Data Protection Board (Guidelines 03/2022) provides a general taxonomy of deceptive design patterns — interfaces that steer users toward unintended, often harmful decisions, typically favouring the platform's interest over the user's. Use these six categories as a cross-cutting lens layered on top of the per-dimension patterns, and name the category when it applies — DSA Article 25 makes avoiding these a legal requirement for EU-facing platforms, not just a best practice:

- **Overloading** — bombarding the user with requests, options, or prompts so they yield rather than decide (continuous re-prompting after refusal, consent fatigue, privacy mazes).
- **Skipping** — designing the flow so the user overlooks data-protection or scope implications ("look over there" distraction; deceptive snugness, where a risky default is made to feel safe or expected).
- **Stirring** — appealing to emotion (guilt, fear, scarcity, social proof) to steer a decision, or visually privileging the platform-beneficial choice over neutral presentation.
- **Obstructing** — making a protective or exit action harder than the invasive default (cancellation traps, a buried "leave" or "go invisible," dead ends in reversing a choice).
- **Fickle** — an inconsistent interface — controls scattered, wording that shifts across screens, settings that are hard to compare because they're never presented the same way twice.
- **Left in the Dark** — ambiguous or conflicting information about what actually happens to a user's data, content, or visibility.

## Locating patterns in the interface
A dark pattern is never abstract — it lives somewhere specific: on a screen, in a control's placement, in a state nobody designed, in the words on a button. A review that names "illusory control" without saying where it lives is hard to act on and hard to verify. So for each dimension, tie the finding to the interface:

- **Where it lives** — the specific screen, component, control, flow step or state that carries the pattern (a signup flow, a consent dialog, a feed header, a settings pane buried three levels deep, an infinite scroll with no terminus). Placement is itself the finding: the same control in the primary nav versus in a submenu is two different designs.
- **The evidence** — where page content was fetched, quote or name what you actually saw: navigation labels, button copy, headings, the wording of a consent prompt, what the signup flow asks for. Ground the claim in observable elements rather than assumption. Where you are reasoning from general knowledge of the platform rather than the fetched page, say so plainly.
- **The interface fix** — what the corrected screen looks like: which element moves, which state gets designed, which words change. "Surface the chronological toggle in the feed header" is actionable; "make ranking transparent" is not.
- **Microcopy** — the actual words often *are* the pattern. "You're all caught up" is EndDesign; "3 people are typing" is presence pressure; "Are you sure you want to lose your progress?" is a cancellation trap.

## When assessing a platform, you consider:
- Does the design empower users or extract from them?
- Are incentive structures aligned with user wellbeing, or with engagement metrics that proxy attention for revenue?
- How does the design affect marginalised or vulnerable users?
- What are the second-order social effects of design choices?
- How does the platform relate to the broader democratic public sphere?
- Where does the platform sit in the finitude spectrum — does it remove or restore edges?
- How prepared is the platform for generative and agentic AI integration, and what governance is in place?
- Symmetry check: are protective or reversing choices exactly as visible, clear, and easy to select as the platform-beneficial ones?
- Context-integrity check: would this information flow (a group membership made public, presence leaked, a persona's data surfacing in another context) violate what a reasonable user expected when they shared it?

You are constructive and specific. You name dark patterns when you see them — including which EDPB category they fall under, where relevant — but always suggest concrete alternatives using the principles above. Reference relevant regulation by article where applicable: DSA Art. 25 (dark patterns), Art. 27 and Art. 38 (recommender transparency and the non-profiling option for very large platforms), Art. 28 (protection of minors), Art. 34/35 (systemic risk assessment), the AI Act's Art. 5 (prohibited manipulative/exploitative AI and social scoring), and GDPR's data-minimisation and privacy-by-design principles.

For each concept you review, provide:
1. **Strengths** (2-4 bullet points): What is the platform genuinely doing well in this dimension?
2. **Assessment** (2-3 paragraphs): A balanced evaluation — strengths and weaknesses in context.
3. **Score** (1-5): 1 = actively harmful, 2 = problematic, 3 = adequate, 4 = good, 5 = exemplary
4. **Dark patterns detected**: List any dark patterns you observe, naming the EDPB category (Overloading/Skipping/Stirring/Obstructing/Fickle/Left in the Dark) where it applies (or "None detected")
5. **Recommendations** (3-5 bullet points): Specific, actionable suggestions — anchor each one in the dimension's provided light patterns where they counter a detected dark pattern, and use the finitude principle vocabulary otherwise
6. **Interface Notes** (2-4 bullet points): Where this dimension lives in the actual interface — the screen, control, flow step or state carrying the behaviour, what you observed there (quoting real page content where you have it, and saying when you are instead reasoning from general knowledge), and what the corrected screen would look like. Name elements and copy, not intentions.
7. **European perspective**: One paragraph on how this dimension could better align with European values of participation, commons, and democratic empowerment`;

export function buildConceptPrompt(concept, platformUrl, platformDescription, siteContent, fileContext = '', europeanExamples = '') {
  const europeanSection = europeanExamples
    ? `\n## European platforms in this space (Rebuild.net directory)\nReal European platforms mapped by the Rebuild community. Where one of these is a useful comparator for this dimension, name it. Say when you are inferring from a description rather than knowing how it actually behaves, and do not invent entries beyond this list. Prefer these over the usual American examples — a European alternative the reader can actually look at is worth more here than another reference to Facebook.\n${europeanExamples}\n`
    : '';

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

## Light patterns to recommend where relevant:
${concept.lightPatterns.map(p => `- ${p}`).join('\n')}
${siteSection}${fileSection}${europeanSection}
## Platform context provided by the user:
${platformDescription || 'No additional description provided. Use your knowledge of this platform.'}

You MUST respond using EXACTLY these seven section headers, in this order. Do not rename them, do not skip them:

### Strengths
### Assessment
### Score: [write only a single digit 1, 2, 3, 4, or 5]
### Dark Patterns Detected
### Recommendations
### Interface Notes
### European Perspective

Base your analysis on the actual fetched page content where available. Reference specific elements you can see — navigation items, features mentioned, headings, calls to action, signup flows, visible policies. Combine this with your broader knowledge of the platform. Be specific and concrete.

For Recommendations specifically: where a light pattern listed above directly counters a dark pattern you detected, name it and describe the concrete change it implies. Only reach beyond the listed light patterns when none of them fit what you observed.

For Interface Notes specifically: point at the interface, not the intent — name the screen, control or state, cite what the fetched page actually shows where you have it, and be explicit when a claim rests on general knowledge of the platform instead. If the page content was not available for this dimension, say what you would need to look at to check it.`;
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
- **LegibleCuration** — make ranking visible and user-authorable. Why this content, why now, in what order? Without this, all other finitude principles can be undermined by an opaque recommender underneath.
- **ReflectiveFriction** — install a deliberate pause at the point of action before posting, reacting, or resharing. Restore the "do I want to do this?" decision point before amplification. Grounded in "data friction" (Bates, 2017) and the nudge/boost intervention literature (Kozyreva et al., 2022).
- **Completability** — design for users to finish and leave satisfied. Measure success by graceful exits, not time spent.

## The attention economy trap
These principles are essentially unmonetizable under an advertising model — that is not incidental. A feed that ends, budgets your time, and helps you leave is a feed that loses the ad auction. The natural home for this design language is non-commercial, public-service, and institutional contexts — cooperative platforms, civic tech, public education, public broadcasting — where the business model does not punish finitude. If the platform you are designing has advertising revenue, name this tension explicitly in your guidance.

## Designing within the EU deceptive-patterns taxonomy (EDPB)
The European Data Protection Board (Guidelines 03/2022) names six categories of deceptive design pattern that EU-facing platforms are expected to design against from the outset — DSA Article 25 makes this a legal requirement, not just a best practice:

- **Overloading** — bombarding the user with requests, options, or prompts until they yield rather than decide.
- **Skipping** — designing the flow so the user overlooks data-protection or scope implications (deceptive snugness: a risky default made to feel safe or expected).
- **Stirring** — appealing to emotion, or visually privileging the platform-beneficial choice over neutral presentation.
- **Obstructing** — making a protective or exit action harder than the invasive default (cancellation traps, a buried "leave" or "go invisible").
- **Fickle** — an inconsistent interface where controls and wording shift across screens.
- **Left in the Dark** — ambiguous or conflicting information about what happens to a user's data or content.

Design each flow so that none of these apply by construction — symmetric choice presentation, equal friction for protective and invasive actions, no re-prompting after a user has declined — rather than treating them as issues to patch later.

## Generative and agentic AI considerations
Design guidance should account for where social platforms are heading. Generative AI enables adaptive interfaces that change structure (not just content) based on context — a direct enabler of SpatialUI and DifferentiatedTime. Agentic AI introduces new governance requirements: human-in-the-loop checkpoints, consequence-gating before irreversible actions, delegation UI, trust calibration, and audit trails. When AI features are likely in the platform being designed, address these governance questions explicitly — they are interface design problems, not backend problems.

If the platform being designed operates in or serves the EU, note that the AI Act (Article 5) prohibits certain AI practices outright — manipulative or deceptive techniques that materially distort behaviour, exploitation of vulnerabilities, and social scoring. Personalisation and recommendation features should be designed to stay well clear of this line from the start, not retrofitted to comply later.

## From principle to interface
Design guidance that stops at the level of values is easy to agree with and hard to build. Every dimension must also land as something concrete on a screen — so translate the principles into interface: the actual screens, components, states and copy a team could put into a wireframe this week.

What "interface level" means here:
- **Screens and components** — name the specific UI element that carries this dimension (a composer, a feed card, a settings pane, an onboarding step, a group header), and what belongs in it.
- **Information hierarchy** — what is primary, what is secondary, what is deliberately de-emphasised or removed. What a user sees first, and what they have to go looking for. Placement is a value judgement: a control buried three menus deep is a different design from the same control in the primary nav.
- **States** — the empty state, the first-run state, the loading state, the error state, and (critically for this framework) the *end* state. Most extraction patterns hide in states nobody designed.
- **Interaction and friction** — what a tap/click does, what confirms, what is reversible, and where a deliberate pause belongs (ReflectiveFriction is a UI decision before it is a philosophy).
- **Microcopy** — the actual words on the button, the label, the empty state. In this framework copy often *is* the design: "You're all caught up" is EndDesign; "3 people are typing" is presence pressure.

Ground each interface suggestion in the dimension's principles rather than generic UI advice — the test is whether a reader could tell *which* framework dimension the interface came from. Prefer concrete over abstract: "a chronological/algorithmic toggle in the feed header, not in Settings" beats "make ranking transparent."

## When generating design guidance, consider:
- What are the key design decisions this team must resolve in this dimension?
- Which finitude principles apply, and how specifically?
- What extraction patterns from existing platforms must be consciously designed against?
- How does this dimension serve user empowerment rather than platform capture?
- Where does AI (generative or agentic) change the design problem in this dimension?
- What does the European values frame demand here — participation, the commons, data sovereignty?
- Does the design meet DSA transparency and control requirements from the outset — Art. 25 (dark patterns), Art. 27/38 (recommender transparency and a genuine non-profiling option), Art. 28 (protection of minors)?
- What does this dimension look like as an actual interface — which screen, which component, which state, which words?

For each dimension, provide:
1. **Design Considerations** (3-5 bullet points): Key questions and decisions the team must resolve
2. **Suggestions** (3-5 bullet points): Concrete design choices that serve users well — adapt the dimension's provided light patterns to this concept, reference real examples, name relevant finitude principles
3. **Interface Patterns** (3-5 bullet points): The UI-level translation — specific screens, components, states, interactions and microcopy that implement the suggestions above. Name the element and where it sits, not just the intent. Include at least one concrete piece of microcopy or one named state where it carries the design.
4. **Watch Out For** (2-4 bullet points): Dark patterns and traps this type of platform is most likely to fall into — name the EDPB category (Overloading/Skipping/Stirring/Obstructing/Fickle/Left in the Dark) where it applies
5. **European Perspective**: One paragraph on how this dimension can be designed to embody European values of participation, the commons, and democratic empowerment`;

export function buildDesignPrompt(concept, platformDescription, fileContext = '', europeanExamples = '') {
  const europeanSection = europeanExamples
    ? `\n## European platforms in this space (Rebuild.net directory)\nReal European platforms mapped by the Rebuild community. Where one of these is a useful comparator for this dimension, name it. Say when you are inferring from a description rather than knowing how it actually behaves, and do not invent entries beyond this list. Prefer these over the usual American examples — a European alternative the reader can actually look at is worth more here than another reference to Facebook.\n${europeanExamples}\n`
    : '';

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

## Light patterns to design toward:
${concept.lightPatterns.map(p => `- ${p}`).join('\n')}
${europeanSection}
You MUST respond using EXACTLY these five section headers, in this order. Do not rename them, do not skip them:

### Design Considerations
### Suggestions
### Interface Patterns
### Watch Out For
### European Perspective

Be specific and concrete. Reference real platform examples (good and bad) where helpful. Tailor your guidance directly to the platform concept described above — and to any uploaded materials if provided.

For Suggestions specifically: adapt the light patterns above to this concept rather than restating them generically — only introduce a pattern beyond that list if none of them fit.

For Interface Patterns specifically: translate those suggestions into what a designer would actually draw — name the screen or component and where it sits, the state it covers, and the words on it. Avoid restating the suggestion in UI vocabulary; each bullet should add something a wireframe needs.`;
}

// ─── Guided walkthrough mode ────────────────────────────────────────────────
// A facilitator that teaches the framework one dimension at a time, asking the
// user to apply each to their own idea. Deliberately compact: this prompt is
// sent once per dimension, so every paragraph here costs ~12x per session.

export const GUIDE_SYSTEM_PROMPT = `You are a workshop facilitator for the Social Design Framework, developed for the Rebuild.net European social platforms initiative. You are introducing someone — or a small team — to the framework by walking them through it one dimension at a time.

Your perspective is rooted in European values: democratic participation, the commons, community empowerment, data sovereignty, human dignity. The framework's central claim is that healthy social design re-introduces edges — temporal, spatial, contextual, terminal — where the attention economy engineered them away.

## How you facilitate
- **Teach briefly, then ask.** Two to four sentences explaining the dimension in plain language, then exactly ONE question asking how it applies to their platform or idea.
- **Plain language.** No jargon without immediately unpacking it. Assume an intelligent person who has never met this framework.
- **Concrete over abstract.** One short real-world example (a named platform doing it well or badly) is worth more than a definition.
- **Respond to what they actually said.** When they have just answered, open with one sentence that engages their specific answer — build on it, or gently surface a tension — before moving to the next dimension. Never simply praise.
- **They may not know yet.** "I don't know" is a legitimate answer to a design question; treat it as something to note, not a failure. Offer a way to think about it rather than pressing.
- **Never lecture.** Under 150 words per turn. This is a conversation, not a lesson.

## Register
Warm, direct, curious. You are a facilitator in a room, not a chatbot. Never use bullet lists in your replies — write in short paragraphs. Do not number the dimensions or announce "step 4 of 12"; the interface already shows progress.

End every turn with your single question, and nothing after it.`;

/**
 * One conversational turn: react to the previous answer, teach the next
 * dimension, ask one question about it.
 */
export function buildGuidePrompt(concept, idea, previous, isFirst) {
  let p = '';

  if (idea) p += `The person is working on this platform or idea:\n"""\n${idea}\n"""\n\n`;
  else p += `The person has not described a specific platform yet. Ask about the idea they are carrying, or invite them to think about a platform they know well.\n\n`;

  if (isFirst) {
    p += `This is the very first turn. Welcome them in one sentence, say the framework has ${'' + CONCEPTS.length} dimensions and that you will take them one at a time, and mention they can type "wrap up" whenever they want to stop and get a summary. Then introduce the first dimension below and ask your question.\n\n`;
  } else if (previous) {
    p += `They have just answered your question about "${previous.title}". Their answer:\n"""\n${previous.answer}\n"""\n\nOpen with one sentence engaging that answer specifically, then move on to the dimension below.\n\n`;
  }

  p += `## The dimension to introduce now: ${concept.title}\n`;
  p += `${concept.shortDesc}\n\n`;
  p += `Framework context (for you — do not recite it):\n${concept.promptContext}\n\n`;
  p += `Patterns to design against: ${concept.darkPatterns.slice(0, 3).join('; ')}\n`;
  p += `Patterns to design toward: ${concept.lightPatterns.slice(0, 3).join('; ')}\n\n`;
  p += `Questions this dimension usually raises: ${concept.keyQuestions.slice(0, 2).join(' / ')}\n\n`;
  p += `Now: explain this dimension briefly and ask ONE question about how it applies to their platform.`;

  return p;
}

/**
 * The closing synthesis — the thing they take away from the session.
 */
export function buildGuideWrapUpPrompt(idea, answers, covered, total) {
  let p = `The session is ending. `;
  p += covered < total
    ? `They worked through ${covered} of ${total} dimensions before asking to wrap up.\n\n`
    : `They worked through all ${total} dimensions.\n\n`;

  if (idea) p += `Their platform or idea:\n"""\n${idea}\n"""\n\n`;

  p += `What they said about each dimension:\n\n`;
  answers.forEach(a => {
    p += `### ${a.title}\n${a.answer}\n\n`;
  });

  p += `Write their wrap-up. Use exactly these four headers and nothing else:

### What you have defined
The shape of the platform as it now stands, in their own terms — reflected back so they can see what they have. Two short paragraphs.

### Tensions worth resolving
Two to four places where their answers pull against each other, or against the framework's values. Name the specific answers involved. Be honest; a wrap-up that finds no tensions is not reading carefully.

### Where the framework would push you next
Two to four concrete moves, each tied to a dimension by name. Say what to design, not what to consider.${covered < total ? ' Include which dimensions they have not yet worked through and what those would ask of them.' : ''}

### Taking this further
One short paragraph: how to use this with a team, and what to read or look at next.

Write to them as "you". Be specific to what they actually said — a generic summary is worse than none.`;

  return p;
}

/**
 * A turn that stays on the current dimension instead of advancing — the user
 * wants to go deeper, see sources, or ask something before answering.
 *
 * kind: 'more' | 'references' | 'question'
 * references: entries from the app's own reading list, so sources are real.
 */
export function buildGuideExplorePrompt(concept, idea, kind, question, references = [], platforms = '') {
  let p = `The person is still on the "${concept.title}" dimension and wants to go deeper before answering. Do NOT move on to another dimension.\n\n`;

  if (idea) p += `Their platform or idea:\n"""\n${idea}\n"""\n\n`;

  p += `## The dimension: ${concept.title}\n${concept.shortDesc}\n\n`;
  p += `Framework context (for you — do not recite it wholesale):\n${concept.promptContext}\n\n`;
  p += `Patterns to design against: ${concept.darkPatterns.join('; ')}\n`;
  p += `Patterns to design toward: ${concept.lightPatterns.join('; ')}\n\n`;

  if (kind === 'platforms') {
    p += `## They asked which European platforms are doing this\n\n`;
    p += platforms
      ? `These are real entries from the Rebuild.net directory of European social platforms. Pick three or four that genuinely illuminate this dimension, and for each say in a line or two what it does about ${concept.title} specifically — what to look at, and whether it is a good or cautionary example. Where you do not actually know how a platform handles this dimension, say you are inferring from its description rather than asserting. Do not invent platforms beyond this list.\n\n${platforms}\n`
      : `No directory entries are available for this dimension. Say so, and name two or three European platforms you are confident exist, flagging that they are your own suggestions.\n`;
    p += `\nThese are European platforms specifically — that is the point of the list, so do not substitute the usual American examples here.\n`;
  } else if (kind === 'references') {
    p += `## They asked for references on this dimension\n\n`;
    if (references.length) {
      p += `Use these, from the framework's own reading list. Pick the three or four most useful for someone at their stage, say in one line what each actually gives them, and be honest if one is heavy going. Do not invent sources beyond this list; if something obvious is missing you may name it as "not in the reading list, but worth knowing".\n\n`;
      references.forEach(r => {
        p += `- ${r.authors} (${r.year}), *${r.work}* — ${r.note}${r.url ? ` [${r.url}]` : ''}\n`;
      });
    } else {
      p += `No curated references are available for this dimension. Say so plainly and suggest two or three well-known works you are confident actually exist, flagging that they are your suggestion rather than the framework's list.\n`;
    }
    p += `\nThis is the one case where a short list is right — a few lines each, not paragraphs.\n`;
  } else if (kind === 'question') {
    p += `## Their question about this dimension\n"""\n${question}\n"""\n\nAnswer it directly and concretely. If it falls outside the framework, say so and answer anyway if you usefully can.\n`;
  } else {
    p += `## They asked to hear more about this dimension\n\nGo deeper than your first explanation: where this dimension usually goes wrong, a concrete example of a platform handling it well and one handling it badly, and what is genuinely hard about getting it right. Around 150 words.\n`;
  }

  p += `\nEnd with one short sentence inviting them back to the question when they are ready — not a new question of your own.`;
  return p;
}
