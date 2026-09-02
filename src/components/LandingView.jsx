import { useState, useEffect, useRef, useCallback } from 'react';
import { Globe, Key, FileText, ArrowRight, ExternalLink, AlertCircle, Check, Upload, X, ImageIcon, FileText as FileTextIcon, Loader2, Search, Lightbulb, Bot, Download, MessageSquare, BarChart3, GitFork, Maximize2, Presentation, Users, Smile, BookOpen, ArrowUpRight, GraduationCap, MapPin, Rocket } from 'lucide-react';
import { PROVIDERS } from '../providers';
import { CONCEPTS } from '../data/framework';
import { REBUILD_COUNT, REBUILD_COUNTRIES } from '../data/rebuildDirectoryMeta';
import { processFiles, IMAGE_TYPES, PDF_TYPE, MAX_IMAGES, MAX_PDFS } from '../utils/fileProcessing';
import Lightbox from './Lightbox';

const FRAMEWORK_ALT =
  'Social Design Framework diagram — Social Object at the centre, surrounded by Platform Intent and Experience Intent, the eight core dimensions (Conversations, Agency, Reputation, Presence, Relationships, Sharing, Identity, Groups), and the Enable, Grow and Protect meta-dimensions';

const RESOURCES = [
  {
    icon: Presentation,
    title: 'Social Design Framework presentation',
    desc: 'The full deck — the framework explained slide by slide, ready to present to a team or a class.',
    href: 'https://claude.ai/code/artifact/8049b9af-09a1-4af7-b7f1-541d4e81bc6f',
  },
  {
    icon: Users,
    title: 'Workshop Kit — Helsinki',
    desc: 'Run the framework as a workshop: the session structure, exercises and materials used in Helsinki.',
    href: 'https://claude.ai/code/artifact/1f8a2687-1589-4c53-8e70-08b5d4b37a64',
  },
  {
    icon: Smile,
    title: 'Workshop Kit — Helsinki, for kids',
    desc: 'The same platform-design workshop, adapted for children — simpler language, hands-on exercises.',
    href: 'https://claude.ai/code/artifact/a544e152-b418-4226-92a8-384d9adc97ba',
  },
  {
    icon: BookOpen,
    title: 'Go to the library',
    desc: 'Get smart on social design — the theory and literature behind every dimension of the framework.',
    internal: 'reading-list',
  },
];

/** Plain-language notes on each dimension, for the accordion below the model. */
const DIMENSION_NOTES = [
  { name: 'Social Object', desc: 'The shared thing that gives people a reason to interact — a photo, a repair, a neighbourhood issue. Whether it is rich enough to sustain real sociality, who controls it, and whether it has value outside the platform.' },
  { name: 'Identity', desc: 'How the platform lets people present themselves — authentically, selectively, or anonymously — and who controls that representation.' },
  { name: 'Conversations', desc: 'The structures that shape how people talk: threading, reach, moderation, and whether dialogue can go somewhere meaningful.' },
  { name: 'Sharing', desc: 'What gets shared, with whom, and on whose terms — including defaults around re-sharing, attribution, and visibility.' },
  { name: 'Presence', desc: 'Whether people can be seen as online, active, or available — and how much control they have over their own visibility.' },
  { name: 'Relationships', desc: 'How connections form, what they mean, and whether the platform fosters genuine ties or inflates shallow ones.' },
  { name: 'Reputation', desc: 'How standing is built and displayed — scores, follower counts, badges — and whether these systems serve users or exploit them.' },
  { name: 'Groups', desc: 'How communities form, govern themselves, and protect their culture as they grow.' },
  { name: 'Agency', desc: 'The degree to which users can understand, shape, and override what the platform does — including its algorithms and defaults.' },
  { name: 'Enable', meta: true, desc: 'The foundational conditions for healthy social life: whether the architecture makes constructive participation the default, whether governance is transparent and participatory, and whether the platform as a whole restores edges or removes them.' },
  { name: 'Grow', meta: true, desc: 'Sustainable value without extraction — shared-value growth, a quality floor rather than a volume target, and low-friction exit treated as a trust strategy rather than a leak.' },
  { name: 'Protect', meta: true, desc: 'The immune system against threats to safety and trust, judged by procedural justice: voice, neutrality, respect and a trustworthy rationale — not deterrence alone.' },
];

/** Icon sits on the heading line; one short line of copy beneath. */
function Feature({ icon: Icon, title, body, link }) {
  return (
    <div>
      <h3 className="font-bold text-sm text-dark mb-2 flex items-center gap-2">
        <Icon size={16} className="flex-shrink-0" />
        {title}
      </h3>
      <p className="text-xs text-muted leading-relaxed">{body}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs inline-flex items-center gap-1 mt-2 underline underline-offset-2 text-darker hover:text-dark break-all"
        >
          {link.replace(/^https?:\/\//, '')} <ExternalLink size={10} className="flex-shrink-0" />
        </a>
      )}
    </div>
  );
}

/**
 * What each mode gives you back, shown under the selector once it is chosen.
 *
 * These used to be a standalone feature grid further up the page, which
 * restated the mode cards, the upload step and the provider step in different
 * words. Shown here they answer the live question instead: having picked this,
 * what do I get?
 */
/**
 * Feedback link. A mailto rather than a hosted form: the app has no backend to
 * post to, and a third-party form service would mean routing someone's words
 * through a company this tool never mentions — which sits badly with a page
 * that promises keys and PDFs never leave the browser.
 */
const FEEDBACK_EMAIL = 'soenderlev@gmail.com';
const FEEDBACK_MAILTO =
  `mailto:${FEEDBACK_EMAIL}` +
  `?subject=${encodeURIComponent('Social Design Review — feedback')}` +
  `&body=${encodeURIComponent(
    'What I was doing:\n\n\nWhat worked:\n\n\nWhat did not:\n\n\nWhat the framework is missing:\n\n'
  )}`;

const MODE_FEATURES = {
  review: [
    { icon: BarChart3,     title: 'Radar chart & report',  body: `A radar across all ${CONCEPTS.length} dimensions, plus the full report as Markdown.` },
    { icon: MessageSquare, title: 'Chat about the results', body: 'Ask follow-up questions with the whole analysis already loaded.' },
    { icon: MapPin,        title: 'European comparators',   body: `${REBUILD_COUNT} platforms from the Rebuild.net directory, per dimension, with links.` },
    { icon: Bot,           title: 'Agent .md export',       body: 'Findings as a CLAUDE.md, .cursorrules or Windsurf instruction file.' },
  ],
  design: [
    { icon: Rocket,        title: 'Prototype in Lovable',   body: 'Send the workshop straight to Lovable as a build brief, in one click.' },
    { icon: MessageSquare, title: 'Chat about the results', body: 'Ask follow-up questions with the whole workshop already loaded.' },
    { icon: MapPin,        title: 'European comparators',   body: `${REBUILD_COUNT} platforms from the Rebuild.net directory, per dimension, with links.` },
    { icon: Bot,           title: 'Agent .md export',       body: 'Guidance as a CLAUDE.md, .cursorrules or Windsurf instruction file.' },
  ],
  guide: [
    { icon: MapPin,        title: 'European examples',      body: `Good examples from the ${REBUILD_COUNT} Rebuild.net platforms, per dimension, with links.` },
    { icon: BookOpen,      title: 'Go deeper on any dimension', body: 'Ask questions, request references, or linger before moving on.' },
    { icon: Download,      title: 'Export the session',     body: 'Answers, wrap-up and full transcript as Markdown — a workshop record.' },
    { icon: Rocket,        title: 'Prototype in Lovable',   body: 'Turn what your team decided into a build brief, in one click.' },
  ],
};

export default function LandingView({ onStart, onReadingList }) {
  const [mode, setMode] = useState('review'); // 'review' | 'design'
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [provider, setProvider] = useState('anthropic');
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [description, setDescription] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [openDimension, setOpenDimension] = useState(null);
  const [error, setError] = useState('');
  const [ollamaStatus, setOllamaStatus] = useState(null);
  const [ollamaModels, setOllamaModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('mistral');

  // File upload state
  const [rawFiles, setRawFiles] = useState([]);           // File objects from input
  const [processedFiles, setProcessedFiles] = useState([]); // Processed { base64, text, ... }
  const [processingFiles, setProcessingFiles] = useState(false);
  const [fileErrors, setFileErrors] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const imageCount = processedFiles.filter(f => f.type === 'image').length;
  const pdfCount   = processedFiles.filter(f => f.type === 'pdf').length;

  const addFiles = useCallback(async (newFiles) => {
    const accepted = Array.from(newFiles).filter(
      f => IMAGE_TYPES.includes(f.type) || f.type === PDF_TYPE
    );
    if (!accepted.length) return;

    setProcessingFiles(true);
    setFileErrors([]);
    const { files, errors } = await processFiles(accepted);
    setProcessedFiles(prev => {
      // Merge, dedupe by id, respect limits
      const merged = [...prev, ...files];
      const images = merged.filter(f => f.type === 'image').slice(0, MAX_IMAGES);
      const pdfs   = merged.filter(f => f.type === 'pdf').slice(0, MAX_PDFS);
      return [...images, ...pdfs];
    });
    if (errors.length) setFileErrors(errors);
    setProcessingFiles(false);
  }, []);

  function removeFile(id) {
    setProcessedFiles(prev => prev.filter(f => f.id !== id));
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  const selectedProvider = PROVIDERS.find(p => p.id === provider);
  const isOllama = provider === 'ollama';
  const isHostedKey = !!selectedProvider?.hostedKey;
  const hostedProvider = PROVIDERS.find(p => p.hostedKey);

  /**
   * Straight into a guided session from the framework introduction — no form,
   * no key. Only offered when a hosted provider exists, so a deployment
   * without one shows nothing rather than a button that 503s.
   */
  function startGuidedSession() {
    if (!hostedProvider) return;
    onStart({
      mode: 'guide',
      providerId: hostedProvider.id,
      apiKey: '',
      platformUrl: '',
      platformDescription: '',
      ollamaConfig: undefined,
      processedFiles: [],
    });
  }

  useEffect(() => {
    if (!isOllama) return;
    const testOllama = async () => {
      setOllamaStatus('checking');
      try {
        const endpoint = apiKey || 'http://localhost:11434';
        const response = await fetch(`${endpoint}/api/tags`, { signal: AbortSignal.timeout(5000) });
        if (!response.ok) { setOllamaStatus('error'); setOllamaModels([]); return; }
        const data = await response.json();
        setOllamaModels(data.models || []);
        setOllamaStatus('connected');
        if (data.models?.length > 0 && !selectedModel) setSelectedModel(data.models[0].name);
      } catch { setOllamaStatus('error'); setOllamaModels([]); }
    };
    const timer = setTimeout(testOllama, 500);
    return () => clearTimeout(timer);
  }, [isOllama, apiKey, selectedModel]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (mode === 'review' && !url.trim()) { setError('Please enter a platform URL'); return; }
    if (mode === 'design' && !description.trim()) { setError('Please describe your platform idea'); return; }
    // guide mode needs nothing — the walkthrough works with or without an idea
    if (isOllama) {
      if (!apiKey.trim()) { setError('Please enter the Ollama endpoint URL'); return; }
      if (ollamaStatus !== 'connected') { setError('Cannot connect to Ollama. Check the endpoint URL and that Ollama is running.'); return; }
      if (!selectedModel) { setError('Please select a model'); return; }
    } else if (!isHostedKey) {
      if (!apiKey.trim()) { setError(`An API key is required for ${selectedProvider.name}`); return; }
    }
    onStart({
      mode,
      providerId: provider,
      platformUrl: url.trim(),
      apiKey: apiKey.trim(),
      platformDescription: description.trim(),
      ollamaConfig: isOllama ? { endpoint: apiKey.trim(), modelName: selectedModel } : undefined,
      processedFiles,
    });
  }

  return (
    <div className="animate-fade-in">

      {/* Framework — leads the page: the model first, the tool second */}
      <section className="bg-light border-b-2 border-dark">
        {/* Explicit grid placement so the diagram sits in the right column on
            desktop but directly under the intro on mobile — otherwise it lands
            below the whole dimension list, several screens down on a phone. */}
        <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 lg:items-start">
          {/* Title + lede */}
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="text-sm text-muted mb-4 uppercase tracking-widest">A Rebuild.net Tool</p>
            <h1 className="text-3xl md:text-4xl font-normal text-dark mb-6 leading-tight">
              The Social Design Framework
            </h1>
            <p className="text-sm text-darker leading-relaxed">
              A practical lens for designing and evaluating social platforms around genuine human connection rather than pure engagement metrics. It emerged from the <a href="https://rebuild.net" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-dark">Rebuild.net</a> European social platforms sprint.
            </p>
          </div>

          {/* Social Object — its own row so the diagram can align to it */}
          <div className="lg:col-start-1 lg:row-start-2">
            <p className="text-sm text-darker leading-relaxed">
              At its centre sits the <strong>Social Object</strong> — the shared thing that brings people together. Around it, <strong>Platform Intent</strong> and <strong>Experience Intent</strong> define the alignment between business logic and user value.
            </p>
          </div>

          {/* Diagram — starts level with the Social Object text */}
          <div className="lg:col-start-2 lg:row-start-2 lg:row-span-2 lg:sticky lg:top-20">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="Enlarge the Social Design Framework diagram"
              className="group relative block w-full cursor-zoom-in"
            >
              <img src="/framework.png" alt={FRAMEWORK_ALT} className="w-full" />
              <span className="absolute bottom-0 right-0 flex items-center gap-1.5 border-2 border-dark bg-light px-2 py-1 text-xs text-dark opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 size={11} /> Enlarge
              </span>
            </button>

            {/* Sits inside the sticky column, so it travels with the diagram */}
            {hostedProvider && (
              <div className="mt-5">
                {/* An action, not navigation — kept as a button for keyboard and
                    screen-reader semantics, styled as a link. */}
                <button
                  type="button"
                  onClick={startGuidedSession}
                  className="inline-flex items-center gap-2 text-sm font-bold text-dark underline underline-offset-4 decoration-2 hover:text-rb-blue-shade transition-colors"
                >
                  <GraduationCap size={16} className="flex-shrink-0" />
                  Learn the framework — start a guided session
                  <ArrowRight size={14} className="flex-shrink-0" />
                </button>
                <p className="text-xs text-muted mt-2">
                  A conversation, one dimension at a time. No API key needed.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* The dimensions — collapsed by default, so the header stays a header */}
      <section className="bg-white border-t-2 border-dark">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-normal text-dark mb-2">The dimensions</h2>
          <p className="text-sm text-darker leading-relaxed max-w-2xl mb-8">
            Eight core dimensions of social life, and three holistic qualities on the outer ring.
            Every review and workshop works through all {CONCEPTS.length}.
          </p>

          <div className="border-t-2 border-dark">
            {DIMENSION_NOTES.map(({ name, desc, meta }) => (
              <button
                key={name}
                type="button"
                onClick={() => setOpenDimension(openDimension === name ? null : name)}
                aria-expanded={openDimension === name}
                className="w-full text-left border-b-2 border-dark px-1 py-4 hover:bg-light transition-colors"
              >
                <div className="flex items-baseline gap-3">
                  {meta && (
                    <span className="text-xs font-bold uppercase tracking-widest text-muted flex-shrink-0">
                      Outer ring
                    </span>
                  )}
                  <span className="font-bold text-sm text-dark flex-1">{name}</span>
                  <span className="text-muted flex-shrink-0 text-lg leading-none">
                    {openDimension === name ? '\u2212' : '+'}
                  </span>
                </div>
                {openDimension === name && (
                  <p className="text-xs text-muted leading-relaxed mt-3 max-w-3xl">{desc}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* The tool, introduced immediately before the form that runs it */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-8">
          <p className="text-base text-darker leading-relaxed max-w-2xl">
            <strong className="text-dark">Social Design Review</strong> is an AI-powered analysis of social platforms through this lens — built for European platform founders, designers and researchers.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-0">

          {/* Step 1 — Mode selector */}
          <div className="border-2 border-dark bg-white mb-0">
            <div className="px-6 pt-5 pb-4 flex items-center gap-3">
              <span className="w-7 h-7 bg-dark text-light flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <div>
                <h2 className="text-base font-bold text-dark">Choose what you want to do</h2>
                <p className="text-xs text-muted">Review an existing platform, design a new one, or learn the framework</p>
              </div>
            </div>
            <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => { setMode('review'); setError(''); }}
                className={`p-5 border-2 text-left transition-colors ${mode === 'review' ? 'border-dark bg-dark text-light' : 'border-dark bg-light hover:bg-lighter text-dark'}`}
              >
                <Search size={18} className="mb-3" />
                <div className="font-bold text-sm mb-1">Review a platform</div>
                <div className={`text-xs leading-relaxed ${mode === 'review' ? 'text-lighter' : 'text-muted'}`}>
                  Analyse an existing social platform through all {CONCEPTS.length} framework dimensions and get a scored review.
                </div>
              </button>
              <button
                type="button"
                onClick={() => { setMode('design'); setError(''); }}
                className={`p-5 border-2 text-left transition-colors ${mode === 'design' ? 'border-dark bg-dark text-light' : 'border-dark bg-light hover:bg-lighter text-dark'}`}
              >
                <Lightbulb size={18} className="mb-3" />
                <div className="font-bold text-sm mb-1">Design a new platform</div>
                <div className={`text-xs leading-relaxed ${mode === 'design' ? 'text-lighter' : 'text-muted'}`}>
                  Describe your platform idea and get concrete design suggestions for each framework dimension.
                </div>
              </button>
              <button
                type="button"
                onClick={() => { setMode('guide'); setError(''); }}
                className={`p-5 border-2 text-left transition-colors ${mode === 'guide' ? 'border-dark bg-dark text-light' : 'border-dark bg-light hover:bg-lighter text-dark'}`}
              >
                <GraduationCap size={18} className="mb-3" />
                <div className="font-bold text-sm mb-1">Learn the framework</div>
                <div className={`text-xs leading-relaxed ${mode === 'guide' ? 'text-lighter' : 'text-muted'}`}>
                  A guided walkthrough, one dimension at a time, applying each to your own idea. Works as a team workshop.
                </div>
              </button>
            </div>

            {/* What this mode gives you — toggles with the selection above */}
            <div className="px-6 pb-6 -mt-1">
              <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">What you get</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
                {(MODE_FEATURES[mode] || []).map(f => <Feature key={f.title} {...f} />)}
              </div>
            </div>
          </div>

          {/* Step 2 — Platform input */}
          <div className="border-2 border-t-0 border-dark bg-white mb-0">
            <div className="px-6 pt-5 pb-4 flex items-center gap-3">
              <span className="w-7 h-7 bg-dark text-light flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <div>
                {mode === 'guide' ? (
                  <><h2 className="text-base font-bold text-dark">What are you working on?</h2>
                  <p className="text-xs text-muted">Optional — the walkthrough adapts to your idea, but works without one</p></>
                ) : mode === 'review' ? (
                  <><h2 className="text-base font-bold text-dark">Review a social platform</h2>
                  <p className="text-xs text-muted">Enter the platform you want to analyse</p></>
                ) : (
                  <><h2 className="text-base font-bold text-dark">Describe your platform idea</h2>
                  <p className="text-xs text-muted">The more detail you provide, the more tailored the guidance</p></>
                )}
              </div>
            </div>
            <div className="px-6 py-6 space-y-5">
              {mode === 'review' && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Platform URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://example-social-platform.com"
                    className="w-full px-4 py-3 border-2 border-dark bg-light text-dark placeholder-muted focus:outline-none focus:bg-white transition-colors text-sm"
                  />
                </div>
              )}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">
                  {mode === 'design'
                    ? 'Platform idea'
                    : <> Platform {mode === 'guide' ? 'or idea' : 'description'} <span className="text-muted font-normal normal-case tracking-normal">(optional)</span></>}
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={mode === 'guide'
                    ? "Optional — a sentence or two about what you're building, or the idea you're carrying. Leave blank to explore the framework on its own."
                    : mode === 'review'
                      ? "Describe the platform's purpose, target audience, business model, key features..."
                      : "Describe your platform concept — what brings people together, who it's for, what the core social object is, how it would be governed and funded..."}
                  rows={mode === 'design' ? 7 : 4}
                  className="w-full px-4 py-3 border-2 border-dark bg-light text-dark placeholder-muted focus:outline-none focus:bg-white transition-colors text-sm resize-y"
                />
                {mode === 'design' && (
                  <p className="text-xs text-muted mt-2">Tip: include purpose, target audience, core social object, governance model, and business model if you have ideas.</p>
                )}
              </div>
            </div>
          </div>

          {/* Step 3 — File upload */}
          <div className="border-2 border-t-0 border-dark bg-white mb-0">
            <div className="px-6 pt-5 pb-4 flex items-center gap-3">
              <span className="w-7 h-7 bg-dark text-light flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <div>
                <h2 className="text-base font-bold text-dark">
                  Upload supporting materials <span className="text-muted font-normal normal-case tracking-normal text-xs">(optional)</span>
                </h2>
                <p className="text-xs text-muted">
                  {mode === 'review'
                    ? 'Screenshots, pitch decks, research docs — helps the AI see beyond the public homepage. PDFs are parsed in your browser and never sent to a server.'
                    : 'Concept docs, pitch decks, wireframes, mood boards — used to tailor the guidance. PDFs are parsed in your browser and never sent to a server.'}
                </p>
              </div>
            </div>
            <div className="px-6 py-6 space-y-4">

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed cursor-pointer transition-colors px-6 py-8 flex flex-col items-center gap-2 text-center ${
                  isDragging ? 'border-dark bg-light' : 'border-muted hover:border-dark hover:bg-light'
                }`}
              >
                {processingFiles
                  ? <Loader2 size={20} className="animate-spin text-muted" />
                  : <Upload size={20} className="text-muted" />
                }
                <p className="text-sm text-darker font-bold">
                  {processingFiles ? 'Processing files...' : 'Drop files here or click to browse'}
                </p>
                <p className="text-xs text-muted">
                  Screenshots (PNG, JPG, WebP) · PDFs · up to {MAX_IMAGES} images + {MAX_PDFS} PDFs
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp,image/gif,application/pdf"
                  className="hidden"
                  onChange={e => addFiles(e.target.files)}
                />
              </div>

              {/* Uploaded files list */}
              {processedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">
                    {imageCount > 0 && `${imageCount} screenshot${imageCount > 1 ? 's' : ''}`}
                    {imageCount > 0 && pdfCount > 0 && ' · '}
                    {pdfCount > 0 && `${pdfCount} PDF${pdfCount > 1 ? 's' : ''}`}
                  </p>
                  {processedFiles.map(f => (
                    <div key={f.id} className="flex items-center gap-3 border-2 border-dark bg-light px-3 py-2">
                      {f.type === 'image'
                        ? <ImageIcon size={14} className="text-muted flex-shrink-0" />
                        : <FileTextIcon size={14} className="text-muted flex-shrink-0" />
                      }
                      <span className="text-xs text-darker flex-1 truncate">{f.name}</span>
                      {f.type === 'pdf' && (
                        <span className="text-xs text-muted flex-shrink-0">{f.pageCount}pp</span>
                      )}
                      {f.type === 'image' && (
                        <img src={`data:${f.mediaType};base64,${f.base64}`} alt="" className="w-8 h-8 object-cover border border-dark flex-shrink-0" />
                      )}
                      <button onClick={() => removeFile(f.id)} className="flex-shrink-0 text-muted hover:text-dark transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Provider vision note */}
              {processedFiles.filter(f => f.type === 'image').length > 0 && !selectedProvider?.supportsVision && (
                <div className="flex items-start gap-2 border-2 border-rb-orange bg-rb-orange-tint px-3 py-2 text-xs text-dark">
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-rb-orange" />
                  <span><strong>{selectedProvider?.name}</strong> doesn't support image analysis — screenshots will be skipped. Switch to Claude or GPT-4o to use vision.</span>
                </div>
              )}

              {fileErrors.length > 0 && fileErrors.map((e, i) => (
                <div key={i} className="text-xs text-rb-red border-2 border-rb-red bg-rb-red-tint px-3 py-2">{e}</div>
              ))}
            </div>
          </div>

          {/* Step 4 — LLM chooser */}
          <div className="border-2 border-t-0 border-dark bg-white mb-0">
            <div className="px-6 pt-5 pb-4 flex items-center gap-3">
              <span className="w-7 h-7 bg-dark text-light flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
              <div>
                <h2 className="text-base font-bold text-dark">Choose your LLM</h2>
                <p className="text-xs text-muted">Start free on a shared EU-hosted key, or bring your own — Anthropic, OpenAI, Mistral, Gemini, Groq, Together.ai or LLMBase. Your key stays in your browser; Ollama runs fully offline.</p>
              </div>
            </div>
            <div className="px-6 py-6 space-y-6">

              {/* Hosted — no key required. Button and its explanation are wrapped
                  together so the parent's space-y does not push them apart. */}
              <div>
              {PROVIDERS.filter(p => p.category === 'hosted').map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProvider(p.id)}
                  className={`w-full p-4 border-2 border-dark text-left transition-colors ${
                    provider === p.id
                      ? 'bg-rb-blue-shade text-light'
                      : 'bg-rb-blue text-dark hover:bg-rb-blue-shade hover:text-light'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-sm">{p.name}</span>
                    <span className={`px-2 py-0.5 text-xs font-bold border ${
                      provider === p.id ? 'border-light text-light' : 'border-dark text-dark'
                    }`}>NO KEY</span>
                  </div>
                  <div className={`text-xs ${provider === p.id ? 'text-lighter' : 'text-darker'}`}>
                    {p.description}
                  </div>
                </button>
              ))}

              {/* Explanation sits directly under the blue button it describes */}
              {isHostedKey && (
                <div className="border-2 border-dark border-t-0 bg-rb-green-tint p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-rb-green-shade mb-2">
                    No API key needed
                  </p>
                  <p className="text-sm text-darker">
                    This runs on a shared Mistral key provided by the Social Design Framework team,
                    hosted in the EU. It is fair-use limited, so a busy day may mean waiting —
                    using your own key below always works and is faster.
                  </p>
                  <p className="text-xs text-muted mt-2">
                    Your platform URL, description and any uploaded files are sent to this site's
                    server, which forwards them to Mistral. With your own key, they go straight
                    from your browser to the provider instead.
                  </p>
                </div>
              )}
              </div>

              {/* Cloud providers */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Or bring your own key — Cloud APIs</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PROVIDERS.filter(p => p.category === 'cloud').map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProvider(p.id)}
                      className={`p-4 border-2 text-left transition-colors ${
                        provider === p.id
                          ? 'border-dark bg-dark text-light'
                          : 'border-dark bg-light hover:bg-lighter text-dark'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">{p.name}</span>
                        {p.supportsVision && (
                          <span className={`px-1.5 py-0.5 text-xs font-bold border ${provider === p.id ? 'border-light text-light' : 'border-rb-blue text-rb-blue'}`}>Vision</span>
                        )}
                      </div>
                      <div className={`text-xs mb-2 ${provider === p.id ? 'text-lighter' : 'text-muted'}`}>{p.description}</div>
                      <a
                        href={p.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs flex items-center gap-1 underline underline-offset-2 ${provider === p.id ? 'text-lighter' : 'text-darker'}`}
                        onClick={e => e.stopPropagation()}
                      >
                        Get API key <ExternalLink size={10} />
                      </a>
                    </button>
                  ))}
                </div>
              </div>

              {/* Local providers */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Local & Private</p>
                <div className="grid grid-cols-1 gap-2">
                  {PROVIDERS.filter(p => p.category === 'local').map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProvider(p.id)}
                      className={`p-4 border-2 text-left transition-colors ${
                        provider === p.id
                          ? 'border-dark bg-dark text-light'
                          : 'border-dark bg-light hover:bg-lighter text-dark'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">{p.name}</span>
                        <span className={`px-2 py-0.5 text-xs font-bold border ${provider === p.id ? 'border-light text-light' : 'border-rb-green text-rb-green'}`}>FREE</span>
                      </div>
                      <div className={`text-xs mb-2 ${provider === p.id ? 'text-lighter' : 'text-muted'}`}>{p.description}</div>
                      <a
                        href={p.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs flex items-center gap-1 underline underline-offset-2 ${provider === p.id ? 'text-lighter' : 'text-darker'}`}
                        onClick={e => e.stopPropagation()}
                      >
                        Learn about Ollama <ExternalLink size={10} />
                      </a>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ollama config */}
              {isOllama && (
                <div className="border-2 border-dark p-4 space-y-4 bg-light">
                  <div className="flex items-start gap-2 text-sm text-dark">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>Download from <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="underline">ollama.ai</a>, install a model (<code className="bg-white px-1">ollama pull mistral</code>), then start the server.</span>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Ollama Endpoint</label>
                    <input
                      type="url"
                      value={apiKey}
                      onChange={e => setApiKey(e.target.value)}
                      placeholder="http://localhost:11434"
                      className="w-full px-4 py-3 border-2 border-dark bg-white text-dark focus:outline-none text-sm"
                    />
                    <div className="mt-2 text-sm">
                      {ollamaStatus === 'checking' && <span className="text-muted">Checking connection...</span>}
                      {ollamaStatus === 'connected' && <span className="text-rb-green flex items-center gap-1"><Check size={14}/> Connected</span>}
                      {ollamaStatus === 'error' && <span className="text-rb-red flex items-center gap-1"><AlertCircle size={14}/> Cannot connect</span>}
                    </div>
                  </div>
                  {ollamaStatus === 'connected' && ollamaModels.length > 0 && (
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">Model</label>
                      <select
                        value={selectedModel}
                        onChange={e => setSelectedModel(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-dark bg-white text-dark focus:outline-none text-sm"
                      >
                        {ollamaModels.map(m => (
                          <option key={m.name} value={m.name}>
                            {m.name} ({(m.size / 1024 / 1024 / 1024).toFixed(1)}GB)
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {ollamaStatus === 'connected' && ollamaModels.length === 0 && (
                    <p className="text-sm text-darker">No models found. Run <code className="bg-white px-1">ollama pull mistral</code> to download one.</p>
                  )}
                </div>
              )}

              {/* API Key */}
              {!isOllama && !isHostedKey && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted mb-2 block">
                    API Key — {selectedProvider?.name}
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={e => setApiKey(e.target.value)}
                      placeholder={selectedProvider?.keyPlaceholder}
                      className="w-full px-4 py-3 border-2 border-dark bg-light text-dark placeholder-muted focus:outline-none focus:bg-white transition-colors text-sm pr-16"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-dark"
                    >
                      {showApiKey ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <p className="text-xs text-muted mt-2">
                    Your key stays in your browser and is never sent to any server other than your chosen provider.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="border-2 border-rb-red bg-rb-red-tint px-4 py-3 text-sm text-dark flex items-start gap-2 mt-4">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-rb-red" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-dark text-light border-2 border-dark py-4 font-bold text-sm hover:bg-darker transition-colors flex items-center justify-center gap-2 mt-6"
          >
            {mode === 'review' ? 'Start Review' : mode === 'guide' ? 'Start Walkthrough' : 'Start Design Workshop'} <ArrowRight size={16} />
          </button>
        </form>

        {/* Get involved — the one card from the old grid that was never about
            a form step, so it keeps a place of its own */}
        <div className="mt-10 border-2 border-dark bg-rb-blue-tint p-6">
          <h3 className="font-bold text-sm text-dark mb-2 flex items-center gap-2">
            <GitFork size={16} className="flex-shrink-0" /> Get involved &amp; send feedback
          </h3>
          <p className="text-xs text-darker leading-relaxed mb-4 max-w-2xl">
            Fork it — add dimensions, support new providers, or adapt the tool for your own research and community.
            Or just tell us what worked, what did not, and what the framework is missing.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/soenderlev-real/social-design-review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dark bg-white text-dark hover:bg-dark hover:text-light transition-colors text-xs font-bold"
            >
              <GitFork size={13} /> View on GitHub <ExternalLink size={11} />
            </a>
            <a
              href={FEEDBACK_MAILTO}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dark bg-white text-dark hover:bg-dark hover:text-light transition-colors text-xs font-bold"
            >
              <MessageSquare size={13} /> Send feedback
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted text-center leading-relaxed">
          {CONCEPTS.length} dimensions across the Social Design Framework —<br/>
          Social Object · Identity · Conversations · Sharing · Presence · Relationships · Reputation · Groups · Agency · Enable · Grow · Protect
        </p>
        </div>
      </section>

      {/* Learn more & workshop kits */}
      <section className="bg-light border-t-2 border-dark">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-normal text-dark mb-2">Learn more and workshop kits</h2>
          <p className="text-sm text-darker mb-10 max-w-xl leading-relaxed">
            Take the framework down off the screen and work with it — present it, run it as a workshop, or read your way into the theory behind it.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {RESOURCES.map(({ icon: Icon, title, desc, href, internal }, i) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Icon size={18} className="text-dark flex-shrink-0" />
                    {internal
                      ? <ArrowRight size={13} className="text-muted flex-shrink-0 transition-transform group-hover:translate-x-1" />
                      : <ArrowUpRight size={13} className="text-muted flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                  </div>
                  <div className="font-bold text-sm text-dark mb-2 group-hover:underline underline-offset-4">{title}</div>
                  <p className="text-xs text-muted leading-relaxed">{desc}</p>
                </>
              );

              const cls =
                'group block text-left p-6 border-2 border-dark bg-white hover:bg-lighter transition-colors ' +
                // collapse shared borders into single 2px rules
                (i % 2 === 1 ? 'sm:border-l-0 ' : '') +
                (i >= 2 ? 'border-t-0 ' : '');

              return internal ? (
                <button key={title} type="button" onClick={onReadingList} className={cls + 'w-full'}>
                  {inner}
                </button>
              ) : (
                <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <Lightbox
          src="/framework.png"
          alt={FRAMEWORK_ALT}
          caption="The Social Design Framework"
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
