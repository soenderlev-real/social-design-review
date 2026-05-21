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
    promptContext: `Platform Intent is the business logic (ROI — Return on Investment). Experience Intent is user-centred logic (ROX — Return on Experience). Assess: Is the business model transparent? Does revenue come from advertising (misaligned incentives) or from subscription/cooperative/public models? Are success metrics proxies for user value or extraction? Could the platform publish its business logic without users feeling betrayed? Where do Platform Intent and Experience Intent diverge, and how is that managed?`,
    darkPatterns: [
      "Misaligned metrics — optimising for engagement (time spent, clicks) rather than user satisfaction",
      "Bait and switch / enshittification — launching user-centric, then degrading for revenue",
      "Manufactured necessity — creating artificial needs (pay for visibility that was free)",
      "Data maximalism — collecting far more data than the service requires",
    ],
    keyQuestions: [
      "Can you explain the business model in one sentence that also describes something good for users?",
      "Are key metrics proxies for user value or for extraction?",
      "Who are the customers vs. the users? Whose interests does design serve?",
      "If the platform became wildly successful, would incentives still align with user wellbeing?",
    ],
  },
  {
    id: "identity",
    title: "Identity",
    icon: "User",
    dimension: null,
    shortDesc: "How users reveal, manage, and control who they are",
    promptContext: `Identity design determines the social contract of the platform. It covers real names vs. pseudonymity vs. anonymity, context-specific identities, profile granularity, and data minimisation. Assess: What minimum identity information is needed? Can users maintain context-specific identities? Is there forced identity collapse (single real-name identity)? How does it affect marginalised users? What happens to identity data on exit? Is there pseudonymous accountability? How does identity interact with moderation?`,
    darkPatterns: [
      "Forced identity collapse — requiring a single real-name identity across all contexts",
      "Dark profiling — collecting identity signals beyond explicit provision (device fingerprinting, shadow profiles)",
      "Identity lock-in — making identity data non-portable",
      "Compulsory disclosure — requiring more personal info than necessary",
    ],
    keyQuestions: [
      "What is the minimum identity information needed for the social object to function?",
      "Can users maintain different context-specific identities?",
      "How does the identity system affect marginalised or vulnerable users?",
      "What happens to identity data when a user leaves?",
    ],
  },
  {
    id: "conversations",
    title: "Conversations",
    icon: "MessageCircle",
    dimension: null,
    shortDesc: "How users communicate, respond, and interact",
    promptContext: `Conversation design shapes whether a platform produces deliberation or provocation, depth or superficiality. Assess: What kinds of conversation does the platform enable? Does the architecture handle disagreement constructively or escalate conflict? What is the default visibility? Do notifications create pressure for immediate response? Are there affordances for listening (not just speaking)? How do conversations scale? Is content sorted by algorithmic engagement or by relevance/quality?`,
    darkPatterns: [
      "Rage amplification — algorithmically surfacing the most emotionally provocative replies",
      "Notification harassment — aggressive push patterns pulling users back compulsively",
      "Performative conversation — designing for public performance (likes) rather than genuine exchange",
      "False equivalence — algorithmically treating fringe positions as equivalent to established knowledge",
    ],
    keyQuestions: [
      "What kinds of conversation is this platform designed to enable?",
      "How does the conversation architecture handle disagreement?",
      "Does the notification system create pressure for immediate response?",
      "Are there structural affordances for listening, not just speaking?",
    ],
  },
  {
    id: "sharing",
    title: "Sharing",
    icon: "Share2",
    dimension: null,
    shortDesc: "How content flows, spreads, and creates value",
    promptContext: `Sharing design determines what circulates, who sees it, how it spreads, and what value it creates or extracts. Assess: What types of content can be shared? What is the default audience (network, platform, algorithmic strangers)? Is content flow push-based (algorithmic) or pull-based (user choice)? Who benefits from sharing — creator or platform? Is there friction before sharing (read-before-share)? How does the platform handle attribution and licensing? What happens to shared content over time?`,
    darkPatterns: [
      "Frictionless virality — one-click repost with no context, maximising spread regardless of accuracy",
      "Algorithmic amplification of extremity — rewarding emotional provocation for engagement",
      "Value extraction — users create content, platform captures all revenue",
      "Context stripping — removing content from its original context, enabling misinterpretation",
    ],
    keyQuestions: [
      "What is the default audience for shared content?",
      "Is content flow algorithmic-push or user-pull?",
      "Who benefits from sharing — the creator or the platform?",
      "What friction exists before sharing?",
    ],
  },
  {
    id: "presence",
    title: "Presence",
    icon: "Radio",
    dimension: null,
    shortDesc: "Whether users can know if others are available and accessible",
    promptContext: `Presence covers online/offline indicators, typing signals, read receipts, last-seen timestamps, and location. Assess: What presence signals does the platform provide? Can users control their own presence visibility? Does presence design create pressure to respond immediately? Does presence serve the user or the platform? How does location-based presence interact with safety? What is the default presence state — maximally visible (opt-out) or minimally visible (opt-in)?`,
    darkPatterns: [
      "Compulsory availability — making presence indicators non-optional, creating social pressure",
      "Guilt mechanics — using read receipts and last-seen to pressure response times",
      "Surveillance by design — broadcasting location/activity without meaningful user control",
      "FOMO engineering — showing what users are missing to drive compulsive checking",
    ],
    keyQuestions: [
      "What presence signals does the platform provide?",
      "Can users fully control their own presence visibility?",
      "Does the platform create an expectation of constant availability?",
      "Is the default presence state opt-in or opt-out?",
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
    promptContext: `Agency is the user's capacity to protect their own attention, wellbeing, and autonomy — the immune response. Assess: Can users control their feed (algorithmic vs. chronological, own filters)? How transparent is algorithmic logic? What notification controls exist? Can data/content be exported in usable formats? How easy is account deletion? Can users set boundaries around AI features? Do users have meaningful input into governance? Is the platform auditable?`,
    darkPatterns: [
      "Illusory control — settings that appear to give control but are ineffective or undermined",
      "Roach motel — easy to join, deliberately difficult to delete/export",
      "Algorithmic opacity — black-box recommendation with no user understanding",
      "Learned helplessness — frequent changes that make users give up managing their experience",
      "Consent fatigue — overwhelming consent dialogs that lead to blind clicking",
    ],
    keyQuestions: [
      "Can users choose between algorithmic and chronological feeds?",
      "How transparent is the algorithmic logic?",
      "How easy is it to leave the platform with your data?",
      "Do users have genuine participatory input into platform governance?",
    ],
  },
  {
    id: "enable-dimension",
    title: "Enable: Foundational Health",
    icon: "Lightbulb",
    dimension: null, // meta-dimension
    shortDesc: "Are the foundational conditions for healthy social life established?",
    promptContext: `Enable is the meta-dimension concerned with establishing the conditions under which healthy social life can emerge. Assess the platform holistically: Does the architecture make constructive participation the default? Are governance frameworks transparent and participatory? Do incentive structures align with community values? Is there clear onboarding that sets norms? How are the Identity, Conversations, Presence, and Platform Intent/Experience Intent concepts working together to create a healthy foundation? What gaps exist in the enabling infrastructure?`,
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

You evaluate social platforms against 13 core design dimensions plus 3 meta-dimensions. The core concepts are: Social Object, Platform Intent & Experience Intent, Identity, Conversations, Sharing, Presence, Relationships, Reputation, Groups, and Agency. The three meta-dimensions—Enable, Grow, and Protect—are assessed holistically to evaluate the overall health of the platform's foundational systems, sustainable growth, and immune health.

Your perspective is rooted in European values: democratic participation, the commons, community empowerment, data sovereignty, and human dignity. You draw on scholarship from HCI, STS (Science and Technology Studies), design theory, sociology, and philosophy of technology.

You are constructive and specific. You name dark patterns when you see them, but you also suggest concrete alternatives. You reference relevant research and regulatory frameworks (GDPR, DSA, DMA) where applicable.

When assessing a platform, you consider:
- Does the design empower users or extract from them?
- Are incentive structures aligned with user wellbeing?
- How does the design affect marginalised or vulnerable users?
- What are the second-order social effects of design choices?
- How does the platform relate to the broader democratic public sphere?

For each concept you review, provide:
1. **Strengths** (2-4 bullet points): What is the platform genuinely doing well in this dimension? Be specific and credit real positive design choices.
2. **Assessment** (2-3 paragraphs): A balanced evaluation of this dimension — both strengths and weaknesses in context.
3. **Score** (1-5): 1 = actively harmful, 2 = problematic, 3 = adequate, 4 = good, 5 = exemplary
4. **Dark patterns detected**: List any dark patterns you observe (or "None detected")
5. **Recommendations** (3-5 bullet points): Specific, actionable suggestions for improvement
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

Your perspective is rooted in European values: democratic participation, the commons, community empowerment, data sovereignty, and human dignity. You draw on HCI research, design theory, and exemplary platforms from cooperative, public, and civic tech spaces.

When generating design guidance, you consider:
- What are the key design decisions this team must make in this dimension?
- What patterns from existing platforms are worth emulating?
- What dark patterns must be consciously designed against?
- How can this dimension serve user empowerment, not extraction?

For each dimension, provide:
1. **Design Considerations** (3-5 bullet points): The key questions and decisions the team must resolve in this dimension
2. **Suggestions** (3-5 bullet points): Concrete, specific design choices that would serve users well — reference real examples where helpful
3. **Watch Out For** (2-4 bullet points): The specific dark patterns and traps this type of platform is most likely to fall into
4. **European Perspective**: One paragraph on how this dimension can be intentionally designed to embody European values of participation, the commons, and democratic empowerment`;

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
