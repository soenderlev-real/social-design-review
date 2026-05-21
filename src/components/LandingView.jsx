import { useState, useEffect, useRef, useCallback } from 'react';
import { Globe, Key, FileText, ArrowRight, ExternalLink, AlertCircle, Check, Upload, X, ImageIcon, FileText as FileTextIcon, Loader2, Search, Lightbulb } from 'lucide-react';
import { PROVIDERS } from '../providers';
import { processFiles, IMAGE_TYPES, PDF_TYPE, MAX_IMAGES, MAX_PDFS } from '../utils/fileProcessing';

export default function LandingView({ onStart }) {
  const [mode, setMode] = useState('review'); // 'review' | 'design'
  const [provider, setProvider] = useState('anthropic');
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [description, setDescription] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
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
    if (isOllama) {
      if (!apiKey.trim()) { setError('Please enter the Ollama endpoint URL'); return; }
      if (ollamaStatus !== 'connected') { setError('Cannot connect to Ollama. Check the endpoint URL and that Ollama is running.'); return; }
      if (!selectedModel) { setError('Please select a model'); return; }
    } else {
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

      {/* Hero */}
      <section className="bg-light border-b-2 border-dark">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-sm text-muted mb-4 uppercase tracking-widest">A Rebuild.net Tool</p>
          <h1 className="text-5xl md:text-6xl font-normal text-dark mb-6 leading-tight">
            Social Design<br />Review
          </h1>
          <p className="text-base text-darker max-w-xl leading-relaxed">
            AI-powered analysis of social platforms through the lens of the Social Design Framework — built for European platform founders, designers and researchers.
          </p>
        </div>
      </section>

      {/* Framework description + diagram */}
      <section className="border-b-2 border-dark">
        <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-2xl font-normal text-dark mb-6">The Social Design Framework</h2>
            <p className="text-sm text-darker mb-4 leading-relaxed">
              The Social Design Framework is a practical lens for designing and evaluating social platforms around genuine human connection rather than pure engagement metrics. It emerged from the <a href="https://rebuild.net" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-dark">Rebuild.net</a> European social platforms sprint.
            </p>
            <p className="text-sm text-darker mb-4 leading-relaxed">
              At its centre sits the <strong>Social Object</strong> — the shared thing that brings people together. Around it, <strong>Platform Intent</strong> and <strong>Experience Intent</strong> define alignment between business logic and user value. Eight core dimensions describe how a platform enables meaningful social life.
            </p>
            <p className="text-sm text-darker leading-relaxed">
              The outer layer assesses three holistic qualities: <strong>Enable</strong> (conditions for healthy participation), <strong>Grow</strong> (sustainable value without extraction), and <strong>Protect</strong> (the immune system against threats).
            </p>
          </div>
          <div>
            <img
              src="/framework.jpg"
              alt="Social Design Framework diagram"
              className="w-full border-2 border-dark"
            />
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-0">

          {/* Step 1 — Mode selector */}
          <div className="border-2 border-dark bg-white mb-0">
            <div className="border-b-2 border-dark px-6 py-4 flex items-center gap-3">
              <span className="w-7 h-7 bg-dark text-light flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <div>
                <h2 className="text-base font-bold text-dark">Choose what you want to do</h2>
                <p className="text-xs text-muted">Review an existing platform or get design guidance for a new idea</p>
              </div>
            </div>
            <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setMode('review'); setError(''); }}
                className={`p-5 border-2 text-left transition-colors ${mode === 'review' ? 'border-dark bg-dark text-light' : 'border-dark bg-light hover:bg-lighter text-dark'}`}
              >
                <Search size={18} className="mb-3" />
                <div className="font-bold text-sm mb-1">Review a platform</div>
                <div className={`text-xs leading-relaxed ${mode === 'review' ? 'text-lighter' : 'text-muted'}`}>
                  Analyse an existing social platform through all 13 framework dimensions and get a scored review.
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
            </div>
          </div>

          {/* Step 2 — Platform input */}
          <div className="border-2 border-t-0 border-dark bg-white mb-0">
            <div className="border-b-2 border-dark px-6 py-4 flex items-center gap-3">
              <span className="w-7 h-7 bg-dark text-light flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <div>
                {mode === 'review' ? (
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
                  {mode === 'review'
                    ? <> Platform description <span className="text-muted font-normal normal-case tracking-normal">(optional)</span></>
                    : 'Platform idea'}
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={mode === 'review'
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
            <div className="border-b-2 border-dark px-6 py-4 flex items-center gap-3">
              <span className="w-7 h-7 bg-dark text-light flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <div>
                <h2 className="text-base font-bold text-dark">
                  Upload supporting materials <span className="text-muted font-normal normal-case tracking-normal text-xs">(optional)</span>
                </h2>
                <p className="text-xs text-muted">
                  {mode === 'review'
                    ? 'Screenshots, pitch decks, research docs — helps the AI see beyond the public homepage'
                    : 'Concept docs, pitch decks, wireframes, mood boards — the AI will use these to tailor the design guidance'}
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
            <div className="border-b-2 border-dark px-6 py-4 flex items-center gap-3">
              <span className="w-7 h-7 bg-dark text-light flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
              <div>
                <h2 className="text-base font-bold text-dark">Choose your LLM</h2>
                <p className="text-xs text-muted">Bring your own API — cloud or fully local</p>
              </div>
            </div>
            <div className="px-6 py-6 space-y-6">

              {/* Cloud providers */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Cloud APIs</p>
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
              {!isOllama && (
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
            {mode === 'review' ? 'Start Review' : 'Start Design Workshop'} <ArrowRight size={16} />
          </button>
        </form>

        <p className="mt-8 text-xs text-muted text-center leading-relaxed">
          Reviews 10 dimensions across the Social Design Framework —<br/>
          Social Object · Intent · Identity · Conversations · Sharing · Presence · Relationships · Reputation · Groups · Agency
        </p>
      </section>
    </div>
  );
}
