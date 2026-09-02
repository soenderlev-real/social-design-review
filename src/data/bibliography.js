/**
 * Reading list — theory & literature behind the Social Design Framework.
 * Sourced from social-design-review-bibliography.md; organised by framework element.
 */

export const BIBLIOGRAPHY = [
  {
    id: 'foundations',
    title: 'Foundations',
    subtitle: 'Read across everything',
    entries: [
      {
        authors: 'Kietzmann, Hermkens, McCarthy & Silvestre', year: '2011',
        work: 'Social media? Get serious! Understanding the functional building blocks of social media',
        source: 'Business Horizons 54(3)',
        note: 'The honeycomb — the source of seven of the core elements (Identity, Conversations, Sharing, Presence, Relationships, Reputation, Groups).',
        links: [
          { label: 'DOI', url: 'https://doi.org/10.1016/j.bushor.2011.01.005' },
          { label: 'open copy', url: 'https://ssrn.com/abstract=2519365' },
        ],
      },
      {
        authors: 'McLuhan, Marshall', year: '1964 / 1967',
        work: 'Understanding Media; The Medium Is the Massage',
        note: '"The medium is the message" — the origin of the media-ecology lens the whole framework sits inside.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Understanding_Media' }],
      },
      {
        authors: 'Castells, Manuel', year: '2001',
        work: 'The Internet Galaxy: Reflections on the Internet, Business, and Society',
        source: 'Oxford University Press',
        note: 'The internet as the infrastructure of the network society — a decentralised "galaxy" of networks, seeding the shift from bounded groups to networked individualism. (See also: Groups, Relationships.)',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/The_Internet_Galaxy' }],
      },
      {
        authors: 'Postman, Neil', year: '1985 / 1992',
        work: 'Amusing Ourselves to Death; Technopoly',
        note: 'Media ecology: each medium reshapes public discourse and smuggles in its own cultural values. (See also: Platform Intent, Conversations.)',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Amusing_Ourselves_to_Death' }],
      },
      {
        authors: 'Verbeek, Peter-Paul', year: '2005 / 2011',
        work: 'What Things Do; Moralizing Technology',
        note: 'Postphenomenology: artifacts mediate perception and even morality — the philosophical warrant for the whole premise that design shapes behaviour. (See also: Agency.)',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Peter-Paul_Verbeek' }],
      },
      {
        authors: 'Winner, Langdon', year: '1980',
        work: 'Do Artifacts Have Politics?',
        source: 'Daedalus 109(1); reprinted in The Whale and the Reactor, 1986',
        note: 'Technologies are not neutral — some embody specific arrangements of power and authority. The political twin of Verbeek’s moral mediation. (See also: Platform Intent, Agency.)',
        links: [
          { label: 'JSTOR', url: 'https://www.jstor.org/stable/20024652' },
          { label: 'overview', url: 'https://en.wikipedia.org/wiki/Do_Artifacts_Have_Politics%3F' },
        ],
      },
      {
        authors: 'Latour, Bruno', year: '2005',
        work: 'Reassembling the Social: An Introduction to Actor-Network-Theory',
        source: 'also: We Have Never Been Modern (1991), Science in Action (1987)',
        note: 'Actor-Network Theory: the social is a web of associations in which nonhuman actors carry agency of their own — the direct root of the social-object idea. (See also: Social Object; Groups / networks; Agency.)',
        links: [
          { label: 'overview', url: 'https://en.wikipedia.org/wiki/Bruno_Latour' },
          { label: 'ANT', url: 'https://en.wikipedia.org/wiki/Actor%E2%80%93network_theory' },
        ],
      },
      {
        authors: 'Harari, Yuval Noah', year: '2024',
        work: 'Nexus: A Brief History of Information Networks from the Stone Age to AI',
        source: 'Penguin Random House',
        note: 'A civilisational history of information networks — how they manufacture order, myth and power. Frames social platforms as the latest information network. (See also: Platform Intent, Conversations.)',
        links: [
          { label: 'overview', url: 'https://en.wikipedia.org/wiki/Nexus:_A_Brief_History_of_Information_Networks_from_the_Stone_Age_to_AI' },
          { label: 'publisher', url: 'https://www.ynharari.com/book/nexus/' },
        ],
      },
    ],
  },
  {
    id: 'social-object',
    number: '01',
    title: 'Social Object',
    subtitle: 'The shared "thing" that mediates ties between people',
    entries: [
      {
        authors: 'Engeström, Jyri', year: '2005',
        work: 'Why some social network services work and others don’t — the case for object-centered sociality',
        note: 'Coined "social objects" for social software; the direct ancestor of this element.',
        links: [{ label: 'essay', url: 'https://www.zengestrom.com/blog/2005/04/why-some-social-network-services-work-and-others-dont-or-the-case-for-object-centered-sociality.html' }],
      },
      {
        authors: 'Knorr Cetina, Karin', year: '1997',
        work: 'Sociality with Objects',
        source: 'Theory, Culture & Society 14(1)',
        note: 'The sociology Engeström draws on — objects as genuine partners in social relations, not props.',
        links: [{ label: 'DOI', url: 'https://doi.org/10.1177/026327697014001001' }],
      },
      {
        authors: null, year: null,
        work: 'Social objects',
        source: 'Wikipedia',
        note: 'Overview tracing the Durkheim / Latour / ANT lineage.',
        links: [{ label: 'read', url: 'https://en.wikipedia.org/wiki/Social_objects' }],
      },
    ],
  },
  {
    id: 'platform-intent',
    number: '02',
    title: 'Platform & Experience Intent',
    subtitle: 'ROI (business logic) vs ROX (user-centred logic) — and whether they diverge',
    entries: [
      {
        authors: 'Zuboff, Shoshana', year: '2019',
        work: 'The Age of Surveillance Capitalism',
        note: 'The extraction business model in full — why attention-for-revenue diverges from user value.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/The_Age_of_Surveillance_Capitalism' }],
      },
      {
        authors: 'Wu, Tim', year: '2016',
        work: 'The Attention Merchants',
        note: 'A century-long history of monetising attention; grounds the "capture" side of the finitude/capture axis.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/The_Attention_Merchants' }],
      },
      {
        authors: 'Simon, Herbert A.', year: '1971',
        work: 'Designing organizations for an information-rich world',
        note: 'Origin of the attention-economy premise ("a wealth of information creates a poverty of attention").',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Attention_economy' }],
      },
      {
        authors: 'Searls, Doc', year: '2012',
        work: 'The Intention Economy; The Cluetrain Manifesto (1999, with Weinberger et al.); Project VRM',
        note: 'The intention economy as the counter-model to the attention economy — user-side sovereignty. (See also: Agency.)',
        links: [
          { label: 'Project VRM', url: 'https://cyber.harvard.edu/projectvrm/Main_Page' },
          { label: 'Cluetrain', url: 'https://en.wikipedia.org/wiki/The_Cluetrain_Manifesto' },
        ],
      },
      {
        authors: 'Papanek, Victor', year: '1971',
        work: 'Design for the Real World: Human Ecology and Social Change',
        note: 'The founding manifesto of socially responsible design — a broadside against design that serves advertising and consumption rather than genuine human need. (See also: Engholm’s Design for the New World, in the finitude / humane-design lineage.)',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Design_for_the_Real_World' }],
      },
      {
        authors: 'Williams, James', year: '2018',
        work: 'Stand Out of Our Light: Freedom and Resistance in the Attention Economy',
        source: 'Cambridge University Press; open access',
        note: 'Ex-Google strategist turned philosopher of attention: attention as the scarce resource, and "freedom of attention" as the defining task. (See also: the finitude / humane-design lineage.)',
        links: [{ label: 'open access', url: 'https://philpapers.org/rec/WILSOO-3' }],
      },
    ],
    seeAlso: 'Postman, under Foundations.',
  },
  {
    id: 'identity',
    number: '03',
    title: 'Identity',
    subtitle: 'Who you get to be — and whether contexts stay separate',
    entries: [
      {
        authors: 'Goffman, Erving', year: '1959',
        work: 'The Presentation of Self in Everyday Life',
        note: 'Front-stage / back-stage self-presentation — the baseline for all identity work online.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/The_Presentation_of_Self_in_Everyday_Life' }],
      },
      {
        authors: 'Bourdieu, Pierre', year: '1977 / 1984',
        work: 'Outline of a Theory of Practice (habitus); Distinction: A Social Critique of the Judgement of Taste',
        note: 'Habitus — durable, class-structured dispositions that generate practice, perception and taste — is the substrate beneath Goffman’s performance. Completes the habitus–field–capital triad with The Forms of Capital (see Reputation). (See also: Sharing / taste, Reputation.)',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Pierre_Bourdieu' }],
      },
      {
        authors: 'Marwick & boyd', year: '2011',
        work: 'I tweet honestly, I tweet passionately: Twitter users, context collapse, and the imagined audience',
        source: 'New Media & Society 13(1)',
        note: 'The context-collapse paper behind SpatialUI.',
        links: [{ label: 'DOI', url: 'https://doi.org/10.1177/1461444810365313' }],
      },
      {
        authors: 'Nissenbaum, Helen', year: '2010 / 2004',
        work: 'Privacy in Context; Privacy as Contextual Integrity',
        note: 'Information flows must stay appropriate to their context.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Contextual_integrity' }],
      },
      {
        authors: 'Turkle, Sherry', year: '1995',
        work: 'Life on the Screen',
        note: 'Identity as fluid, multiple, and performed online — the early optimistic account. (See also her later, darker work under Presence & Conversations.)',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Sherry_Turkle' }],
      },
      {
        authors: 'Giddens, Anthony', year: '1991',
        work: 'Modernity and Self-Identity',
        note: 'The self as a reflexive project — an ongoing narrative the late-modern individual must actively author and revise. (See also: structuration / the duality of structure, under Agency; the "pure relationship," under Relationships.)',
        links: [
          { label: 'overview', url: 'https://en.wikipedia.org/wiki/Anthony_Giddens' },
          { label: 'structuration', url: 'https://en.wikipedia.org/wiki/Structuration_theory' },
        ],
      },
    ],
  },
  {
    id: 'conversations',
    number: '04',
    title: 'Conversations',
    subtitle: 'Whether the architecture yields deliberation or provocation',
    entries: [
      {
        authors: 'Habermas, Jürgen', year: '1962/1989',
        work: 'The Structural Transformation of the Public Sphere',
        note: 'The deliberation ideal the "deliberation vs provocation" prompt measures against.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/The_Structural_Transformation_of_the_Public_Sphere' }],
      },
      {
        authors: 'Sunstein, Cass', year: '2017',
        work: '#Republic: Divided Democracy in the Age of Social Media',
        note: 'Polarisation, echo chambers, and architecture’s effect on discourse.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/%23Republic' }],
      },
      {
        authors: 'Grice, H. P.', year: '1975',
        work: 'Logic and Conversation (the cooperative principle)',
        note: 'The pragmatics of what makes an exchange cooperative rather than adversarial.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Cooperative_principle' }],
      },
      {
        authors: 'Papacharissi, Zizi', year: '2015',
        work: 'Affective Publics: Sentiment, Technology, and Politics',
        source: 'Oxford University Press',
        note: 'How networked conversation runs on affect, not just reasoned deliberation.',
        links: [],
      },
      {
        authors: 'Turkle, Sherry', year: '2015',
        work: 'Reclaiming Conversation: The Power of Talk in a Digital Age',
        note: 'How always-on devices crowd out sustained, face-to-face talk.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Sherry_Turkle' }],
      },
    ],
    seeAlso: 'Sengers, Reflective Design, and Suchman, situated action, under Agency.',
  },
  {
    id: 'sharing',
    number: '05',
    title: 'Sharing',
    subtitle: 'What circulates, to whom, and on whose terms',
    entries: [
      {
        authors: 'Benkler, Yochai', year: '2006',
        work: 'The Wealth of Networks',
        note: 'Commons-based peer production — sharing as a mode of production, not a feature.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/The_Wealth_of_Networks' }],
      },
      {
        authors: 'boyd, danah', year: '2010',
        work: 'Social Network Sites as Networked Publics: Affordances, Dynamics, and Implications',
        note: 'Persistence, replicability, scalability, searchability — the affordances that make "sharing" behave as it does.',
        links: [{ label: 'papers', url: 'https://www.danah.org/papers/' }],
      },
      {
        authors: 'John, Nicholas A.', year: '2017',
        work: 'The Age of Sharing',
        source: 'Polity',
        note: 'A critical genealogy of "sharing" as the defining verb of social media.',
        links: [],
      },
      {
        authors: 'Tapscott & Williams', year: '2006',
        work: 'Wikinomics: How Mass Collaboration Changes Everything',
        note: 'Mass collaboration as genuine value creation, not just posting. (See also: Groups.)',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Wikinomics' }],
      },
      {
        authors: 'Weinberger, David', year: '2007',
        work: 'Everything Is Miscellaneous',
        source: 'also: Small Pieces Loosely Joined (2002), Too Big to Know (2011)',
        note: 'How digital order is made — tagging, the "third order of order," legible organisation. Directly informs LegibleCuration / Agency.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/David_Weinberger' }],
      },
    ],
    seeAlso: 'Shirky, Cognitive Surplus, under Groups.',
  },
  {
    id: 'presence',
    number: '06',
    title: 'Presence',
    subtitle: 'Being seen as online, active, available — and who that serves',
    entries: [
      {
        authors: 'Short, Williams & Christie', year: '1976',
        work: 'The Social Psychology of Telecommunications — social presence theory',
        note: 'The founding account of mediated "being there."',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Social_presence_theory' }],
      },
      {
        authors: 'Licoppe, Christian', year: '2004',
        work: '‘Connected’ presence: the emergence of a new repertoire for managing social relationships',
        source: 'Environment and Planning D 22(1)',
        note: 'Theorises always-available presence and its pressures.',
        links: [{ label: 'DOI', url: 'https://doi.org/10.1068/d323t' }],
      },
      {
        authors: 'Nardi, Whittaker & Bradner', year: '2000',
        work: 'Interaction and Outeraction: Instant Messaging in Action',
        source: 'CSCW',
        note: 'Presence signalling as its own social act.',
        links: [{ label: 'DOI', url: 'https://doi.org/10.1145/358916.358975' }],
      },
      {
        authors: 'Turkle, Sherry', year: '2011',
        work: 'Alone Together: Why We Expect More from Technology and Less from Each Other',
        note: 'Constant connection as a new form of solitude — presence pressure made intimate. (See also: Relationships.)',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Sherry_Turkle' }],
      },
      {
        authors: 'Csikszentmihalyi, Mihaly', year: '1990',
        work: 'Flow: The Psychology of Optimal Experience',
        note: 'The psychology of absorption — indispensable and double-edged, since the engagement machine manufactures a counterfeit of autotelic flow. (See also: the finitude lineage.)',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Flow_(psychology)' }],
      },
      {
        authors: 'Weiser, Mark', year: '1991 / 1996',
        work: 'The Computer for the 21st Century; The Coming Age of Calm Technology (with Brown)',
        note: 'Ubiquitous, calm computing — tech that recedes to the periphery. (See also: Agency, finitude lineage.)',
        links: [
          { label: 'overview', url: 'https://en.wikipedia.org/wiki/Ubiquitous_computing' },
          { label: 'calmtech.com', url: 'https://calmtech.com/' },
        ],
      },
    ],
  },
  {
    id: 'relationships',
    number: '07',
    title: 'Relationships',
    subtitle: 'How ties form — and whether they’re genuine or inflated',
    entries: [
      {
        authors: 'Granovetter, Mark', year: '1973',
        work: 'The Strength of Weak Ties',
        source: 'American Journal of Sociology 78(6)',
        note: 'The tie-strength distinction underneath "genuine vs inflated" ties.',
        links: [{ label: 'DOI', url: 'https://doi.org/10.1086/225469' }],
      },
      {
        authors: 'Dunbar, Robin', year: '1992',
        work: 'Cognitive limits to group size — "Dunbar’s number"',
        note: 'The human-scale ceiling behind the Relationships slide.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Dunbar%27s_number' }],
      },
      {
        authors: 'Ellison, Steinfield & Lampe', year: '2007',
        work: 'The benefits of Facebook "friends": Social capital and college students’ use of online social network sites',
        source: 'JCMC 12(4)',
        note: 'Bonding vs bridging capital in social network sites.',
        links: [{ label: 'DOI', url: 'https://doi.org/10.1111/j.1083-6101.2007.00367.x' }],
      },
      {
        authors: 'Bauman, Zygmunt', year: '2003 / 2000',
        work: 'Liquid Love: On the Frailty of Human Bonds; Liquid Modernity',
        note: 'Bonds made easy to form and easy to break — connection displacing commitment. Together with Giddens’s "pure relationship," the canonical late-modern account of disposable, elective ties. (See also: Groups — Community, 2001; Platform Intent — Consuming Life.)',
        links: [
          { label: 'overview', url: 'https://en.wikipedia.org/wiki/Zygmunt_Bauman' },
          { label: 'concept', url: 'https://en.wikipedia.org/wiki/Liquid_modernity' },
        ],
      },
    ],
    seeAlso: 'Turkle, Alone Together, under Presence.',
  },
  {
    id: 'reputation',
    number: '08',
    title: 'Reputation',
    subtitle: 'How standing is built and shown — and whether it serves or exploits',
    entries: [
      {
        authors: 'Bourdieu, Pierre', year: '1986',
        work: 'The Forms of Capital',
        note: 'Symbolic capital — the theory of standing that follower-counts and scores operationalise (and distort). (See also: habitus, under Identity.)',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/The_Forms_of_Capital' }],
      },
      {
        authors: 'Marwick, Alice', year: '2013',
        work: 'Status Update: Celebrity, Publicity, and Branding in the Social Media Age',
        source: 'Yale University Press',
        note: 'Micro-celebrity and self-branding as the reputation logic of the feed.',
        links: [],
      },
      {
        authors: 'Origgi, Gloria', year: '2018',
        work: 'Reputation: What It Is and Why It Matters',
        source: 'Princeton University Press',
        note: 'A full theory of reputation as a second self.',
        links: [{ label: 'essay version', url: 'https://aeon.co/essays/say-goodbye-to-the-information-age-its-all-about-reputation' }],
      },
      {
        authors: 'Gandini, Alessandro', year: '2016',
        work: 'The Reputation Economy',
        source: 'Palgrave Macmillan',
        note: 'Reputation as an asset class in platform labour markets.',
        links: [],
      },
    ],
  },
  {
    id: 'groups',
    number: '09',
    title: 'Groups',
    subtitle: 'How communities form, govern themselves, and protect their culture',
    entries: [
      {
        authors: 'Ostrom, Elinor', year: '1990',
        work: 'Governing the Commons',
        note: 'The design principles for durable self-governance — the backbone of the Protect meta-dimension.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Governing_the_Commons' }],
      },
      {
        authors: 'Grimmelmann, James', year: '2015',
        work: 'The Virtues of Moderation',
        source: 'Yale J.L. & Tech. 17',
        note: 'The clearest taxonomy of moderation as a community immune system.',
        links: [{ label: 'read', url: 'https://yjolt.org/virtues-moderation' }],
      },
      {
        authors: 'Gillespie, Tarleton', year: '2018',
        work: 'Custodians of the Internet',
        source: 'Yale University Press',
        note: 'Moderation as the essential, hidden labour that constitutes platforms.',
        links: [],
      },
      {
        authors: 'Kraut & Resnick', year: '2012',
        work: 'Building Successful Online Communities: Evidence-Based Social Design',
        source: 'MIT Press',
        note: 'Community design as a body of testable claims, not folklore.',
        links: [],
      },
      {
        authors: 'Rheingold, Howard', year: '1993 / 2002',
        work: 'The Virtual Community; Smart Mobs',
        note: 'The founding text on online community, then on networked collective action.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Howard_Rheingold' }],
      },
      {
        authors: 'Shirky, Clay', year: '2008 / 2010',
        work: 'Here Comes Everybody; Cognitive Surplus',
        note: 'Organising without organisations; participation as latent surplus platforms can channel or squander.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Clay_Shirky' }],
      },
      {
        authors: 'Costanza-Chock, Sasha', year: '2020',
        work: 'Design Justice: Community-Led Practices to Build the Worlds We Need',
        source: 'MIT Press; open access',
        note: 'Equity and participation — designing with, not for, marginalised communities; the justice dimension of Protect.',
        links: [{ label: 'open access', url: 'https://mitpress.mit.edu/9780262043458/design-justice/' }],
      },
      {
        authors: 'Ehn, Pelle; Bødker, Susanne', year: '1988 / 1991',
        work: 'Scandinavian Participatory Design — Work-Oriented Design of Computer Artifacts; Through the Interface',
        note: 'The Nordic tradition of designing with users, treating participation and democratic control as design commitments. (See also: Interaction design, HCI & design method.)',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Participatory_design' }],
      },
    ],
  },
  {
    id: 'agency',
    number: '10',
    title: 'Agency',
    subtitle: 'Control over feed, data, and attention — where the finitude principles converge',
    entries: [
      {
        authors: 'Seaver, Nick', year: '2019',
        work: 'Captivating algorithms: Recommender systems as traps',
        source: 'Journal of Material Culture 24(4)',
        note: '"Captivation metrics" and capture-by-design — the precise opposite of user agency.',
        links: [{ label: 'DOI', url: 'https://doi.org/10.1177/1359183518820366' }],
      },
      {
        authors: 'Mathur et al.', year: '2019',
        work: 'Dark Patterns at Scale',
        source: 'Proc. ACM HCI 3(CSCW)',
        note: 'The empirical dark-pattern taxonomy the "counters" lines draw on.',
        links: [
          { label: 'DOI', url: 'https://doi.org/10.1145/3359183' },
          { label: 'open', url: 'https://arxiv.org/abs/1907.07032' },
        ],
      },
      {
        authors: 'Brignull, Harry', year: null,
        work: 'Deceptive Design',
        note: 'The original dark-patterns catalogue.',
        links: [{ label: 'site', url: 'https://www.deceptive.design/' }],
      },
      {
        authors: 'Eslami et al.', year: '2015',
        work: '"I always assumed that I wasn’t really that close to [her]": Reasoning about invisible algorithms in news feeds',
        source: 'CHI',
        note: 'Folk theories and algorithm awareness — the legibility problem.',
        links: [{ label: 'DOI', url: 'https://doi.org/10.1145/2702123.2702556' }],
      },
      {
        authors: 'Schüll, Natasha Dow', year: '2012',
        work: 'Addiction by Design: Machine Gambling in Las Vegas',
        source: 'Princeton University Press',
        note: '"The machine zone" and design for maximum "time on device" — the definitive account of engineered compulsion, and the direct ancestor of slot-machine feeds and infinite scroll.',
        links: [{ label: 'publisher', url: 'https://press.princeton.edu/books/paperback/9780691278285/addiction-by-design' }],
      },
      {
        authors: 'Fogg, B.J.; Eyal, Nir', year: '2003 / 2014',
        work: 'Persuasive Technology; Hooked: How to Build Habit-Forming Products',
        note: 'The persuasion and "hook" playbook — the explicit craft of habit-forming design, read here as the anti-exemplar the framework answers.',
        links: [
          { label: 'overview', url: 'https://en.wikipedia.org/wiki/Persuasive_technology' },
          { label: 'nirandfar.com', url: 'https://www.nirandfar.com/hooked/' },
        ],
      },
      {
        authors: 'Alexander, Christopher', year: '1977',
        work: 'A Pattern Language',
        source: 'with The Timeless Way of Building, 1979',
        note: 'The life-giving design patterns that "dark patterns" deliberately invert — the counters in this framework are Alexander’s patterns turned back toward the user.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/A_Pattern_Language' }],
      },
      {
        authors: 'Norman, Donald', year: '1988 / 2004',
        work: 'The Design of Everyday Things; Emotional Design',
        note: 'Affordances and signifiers, plus the visceral–behavioural–reflective layers — worth reading against the grain, since "emotional design" is also how capture is made pleasurable.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Don_Norman' }],
      },
      {
        authors: 'Suchman, Lucy', year: '1987',
        work: 'Plans and Situated Actions',
        source: '2nd ed. Human–Machine Reconfigurations, 2007',
        note: 'Situated action: real use is improvised, not executed from a script — a standing caution against deterministic, over-engineered design.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Lucy_Suchman' }],
      },
      {
        authors: 'Sengers, Boehner, David & Kaye', year: '2005',
        work: 'Reflective Design',
        source: '4th Decennial Conference on Critical Computing, Aarhus',
        note: 'Designing to surface unconscious values and provoke reflection — the scholarly root of the ReflectiveFriction principle.',
        links: [
          { label: 'DOI', url: 'https://doi.org/10.1145/1094562.1094569' },
          { label: 'open PDF', url: 'https://alumni.media.mit.edu/~jofish/writing/sengersetalRDfinalfinal.pdf' },
        ],
      },
      {
        authors: 'Krippendorff, Klaus', year: '2006',
        work: 'The Semantic Turn: A New Foundation for Design',
        source: 'CRC Press',
        note: 'Design as making sense of things — the theory beneath LegibleCuration: an interface’s legibility is whether users can make sense of it.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Klaus_Krippendorff' }],
      },
    ],
    seeAlso: 'Verbeek, under Foundations; Searls / Project VRM, under Platform Intent; Weiser, under Presence.',
  },
  {
    id: 'meta-dimensions',
    title: 'Meta-Dimensions — Enable · Grow · Protect',
    subtitle: 'The meta layer is holistic; it reuses the sources above rather than adding a separate canon',
    prose: [
      { label: 'Enable', text: 'Foundational health — community-design evidence and norms: Kraut & Resnick and Rheingold (Groups); constructive defaults informed by Norman (Agency).' },
      { label: 'Grow', text: 'Value without extraction — non-extractive economics: Benkler (Sharing), Tapscott (Sharing), Searls / intention economy (Platform Intent).' },
      { label: 'Protect', text: 'The immune system — governance and moderation: Ostrom, Grimmelmann, Gillespie (Groups).' },
    ],
  },
  {
    id: 'interaction-design',
    title: 'Interaction Design, HCI & Design Method',
    subtitle: 'The design and HCI foundations the review draws on, cutting across the elements above',
    seeAlsoIntro: 'Under Agency: Norman, Suchman, Sengers, Krippendorff, Alexander. In the finitude lineage: Hallnäs & Redström’s Slow Technology.',
    entries: [
      {
        authors: 'Simon, Herbert A.', year: '1969',
        work: 'The Sciences of the Artificial',
        source: 'MIT Press',
        note: 'Design as the science of the artificial — "everyone designs who devises courses of action aimed at changing existing situations into preferred ones."',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/The_Sciences_of_the_Artificial' }],
      },
      {
        authors: 'Winograd, Terry & Flores, Fernando', year: '1986',
        work: 'Understanding Computers and Cognition',
        note: 'The Heideggerian foundation of software design — computers as opening a space for action; the ground Suchman and Dourish build on.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Understanding_Computers_and_Cognition' }],
      },
      {
        authors: 'Dourish, Paul', year: '2001',
        work: 'Where the Action Is: The Foundations of Embodied Interaction',
        source: 'MIT Press',
        note: 'Embodiment and phenomenology in HCI — meaning made through situated, embodied action; grounding for SpatialUI and situated presence.',
        links: [{ label: 'publisher', url: 'https://mitpress.mit.edu/9780262541787/where-the-action-is/' }],
      },
      {
        authors: 'Schön, Donald', year: '1983',
        work: 'The Reflective Practitioner',
        note: 'Reflection-in-action — the shared root of Sengers’ Reflective Design and Löwgren & Stolterman’s thoughtful interaction design.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Donald_Sch%C3%B6n' }],
      },
      {
        authors: 'Löwgren, Jonas & Stolterman, Erik', year: '2004',
        work: 'Thoughtful Interaction Design',
        source: 'MIT Press',
        note: 'Interaction design as reflective, ethical-and-aesthetic judgment rather than usability optimisation — the Nordic design-theory counterweight to engagement metrics.',
        links: [{ label: 'publisher', url: 'https://mitpress.mit.edu/9780262622097/thoughtful-interaction-design/' }],
      },
      {
        authors: 'Friedman, Batya & Hendry, David', year: '2019',
        work: 'Value Sensitive Design: Shaping Technology with Moral Imagination',
        source: 'MIT Press',
        note: 'The method that operationalises "design carries values" — accounting for human values throughout the design process.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Value_sensitive_design' }],
      },
      {
        authors: 'Dunne, Anthony & Raby, Fiona', year: '2013',
        work: 'Speculative Everything: Design, Fiction, and Social Dreaming',
        source: 'MIT Press',
        note: 'Critical and speculative design — design that questions and imagines alternatives rather than sells.',
        links: [{ label: 'publisher', url: 'https://mitpress.mit.edu/9780262019842/speculative-everything/' }],
      },
    ],
  },
  {
    id: 'finitude-lineage',
    title: 'The Finitude / Humane-Design Lineage',
    subtitle: 'The design tradition — and the critical theory — the framework’s own principles extend',
    entries: [
      {
        authors: 'Rosa, Hartmut', year: '2019',
        work: 'Resonance: A Sociology of Our Relationship to the World',
        source: 'Polity (German 2016), building on Social Acceleration (Columbia UP, 2013)',
        note: 'Resonance — a responsive, mutually transforming relationship to world, time and others — as the antithesis of alienation. The deepest critical-theory grounding for why edges matter. (See also: Presence / DifferentiatedTime, Platform Intent.)',
        links: [
          { label: 'overview', url: 'https://en.wikipedia.org/wiki/Hartmut_Rosa' },
          { label: 'publisher', url: 'https://www.wiley.com/en-us/Resonance:+A+Sociology+of+Our+Relationship+to+the+World-p-9781509519927' },
        ],
      },
      {
        authors: 'Welzer, Harald', year: '2025',
        work: 'Das Haus der Gefühle: Warum Zukunft Herkunft braucht',
        source: 'S. Fischer; in German',
        note: 'A "politics of feelings": emotions, not information, structure our decisions and our bonds — built on resonance, belonging (Heimat), and the longing for others; a direct warning about fear as the emotion most easily politically exploited. (See also: Conversations, Relationships.)',
        links: [{ label: 'publisher', url: 'https://www.fischerverlage.de/buch/harald-welzer-das-haus-der-gefuehle-9783103976915' }],
      },
      {
        authors: 'Illich, Ivan', year: '1973',
        work: 'Tools for Conviviality',
        note: 'The deep root of the humane-tech argument: convivial tools that extend human autonomy versus tools that dominate and de-skill their users.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Tools_for_Conviviality' }],
      },
      {
        authors: 'Crary, Jonathan', year: '2013',
        work: '24/7: Late Capitalism and the Ends of Sleep',
        source: 'Verso',
        note: 'Capitalism’s erosion of downtime, attention and sleep — the temporal critique behind ConstraintTimeLocking and DifferentiatedTime.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Jonathan_Crary' }],
      },
      {
        authors: 'Weiser & Brown; Case, Amber', year: '1996 / 2015',
        work: 'The Coming Age of Calm Technology; Calm Technology',
        note: 'Tech that stays at the periphery until needed.',
        links: [{ label: 'calmtech.com', url: 'https://calmtech.com/' }],
      },
      {
        authors: 'Hallnäs, Lars & Redström, Johan', year: '2001',
        work: 'Slow Technology — Designing for Reflection',
        source: 'Personal and Ubiquitous Computing 5',
        note: 'A design agenda aimed at reflection and mental rest rather than efficiency, treating time as an explicit design variable — DifferentiatedTime, ReflectiveFriction and EndDesign articulated in HCI two decades early.',
        links: [{ label: 'DOI', url: 'https://doi.org/10.1007/PL00000019' }],
      },
      {
        authors: 'Center for Humane Technology', year: null,
        work: '"Time Well Spent" (Tristan Harris et al.)',
        note: 'The applied critique of engagement design.',
        links: [{ label: 'site', url: 'https://www.humanetech.com/' }],
      },
      {
        authors: 'Odell, Jenny', year: '2019',
        work: 'How to Do Nothing: Resisting the Attention Economy',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/How_to_Do_Nothing' }],
      },
      {
        authors: 'Doctorow, Cory', year: '2023',
        work: 'Enshittification',
        note: 'Names the decay pattern the Platform Intent slide diagnoses.',
        links: [{ label: 'overview', url: 'https://en.wikipedia.org/wiki/Enshittification' }],
      },
      {
        authors: 'Engholm, Ida', year: '2023',
        work: 'Design for the New World: From Human Design to Planet Design',
        source: 'Intellect; open access',
        note: 'The planet-centred successor to Papanek — shifting design from human scales toward a planetary frame of balanced coexistence with other species. (See also: Papanek, under Platform Intent; the more-than-human STS line — Latour / Verbeek — under Foundations.)',
        links: [
          { label: 'DOI', url: 'https://doi.org/10.2307/jj.2458924' },
          { label: 'open access', url: 'https://library.oapen.org/handle/20.500.12657/61683' },
        ],
      },
    ],
    seeAlso: 'Bracketing the argument: Csikszentmihalyi (Presence) on the psychology being exploited; Sengers (Agency) on reflective method; Verbeek (Foundations) on why design carries values at all.',
  },
];

export const BIBLIOGRAPHY_NOTE =
  'Link types: DOIs resolve via doi.org; book/author entries point to publisher or overview (Wikipedia / Aeon / SEP) pages, not paywalled PDFs. Many entries were confirmed against a live source; the remainder use canonical DOIs and stable publisher/overview pages, and a few link author or publisher pages not separately verified.';

/**
 * The reading-list section that matches a framework dimension, so the guided
 * walkthrough can cite real sources instead of inventing them. The three meta
 * dimensions share one section.
 */
export function referencesForConcept(conceptId, limit = 5) {
  const sectionId = ['enable-dimension', 'grow-dimension', 'protect-dimension'].includes(conceptId)
    ? 'meta-dimensions'
    : conceptId;
  const section = BIBLIOGRAPHY.find(s => s.id === sectionId);
  if (!section) return [];
  return section.entries.slice(0, limit).map(e => ({
    authors: e.authors,
    year: e.year,
    work: e.work,
    note: e.note,
    url: e.links?.[0]?.url || null,
  }));
}
