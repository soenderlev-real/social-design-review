import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Download, RotateCcw, GraduationCap, Flag, Rocket, BookOpen, HelpCircle, Plus, MapPin } from 'lucide-react';
import * as Icons from 'lucide-react';
import { CONCEPTS, GUIDE_SYSTEM_PROMPT, buildGuidePrompt, buildGuideWrapUpPrompt, buildGuideExplorePrompt,
         buildReferenceSystemPrompt, buildReferencePrompt, buildReferenceWrapUpPrompt } from '../data/framework';
import { referenceTrack } from '../data/frameworkReference';
import { referencesForConcept } from '../data/bibliography';
import { createProvider } from '../providers';
import { buildSessionLovableUrl } from '../utils/lovable';
import { createPacer } from '../utils/streamPacer';

const WRAP_PATTERNS = /^\s*(wrap[\s-]?up|wrap|summar(y|ise|ize)|finish|done|that'?s enough)\s*[.!]?\s*$/i;

/**
 * The facilitator writes prose, but the wrap-up uses ### headers and emphasis.
 * Render just enough markdown that those do not show up as literal characters.
 */
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Turn mentions of the platforms offered in this turn into outgoing links.
 *
 * Scoped to that turn's shortlist rather than the whole directory, and matched
 * on word boundaries longest-first, so "Tête-à-Tête" wins over any shorter name
 * inside it. Runs after escaping and before the emphasis pass, so the anchors
 * it inserts cannot be mangled by either.
 */
function linkify(escaped, links) {
  if (!links || !links.length) return escaped;
  const named = links.filter(l => l.name && l.url).sort((a, b) => b.name.length - a.name.length);
  if (!named.length) return escaped;

  const pattern = new RegExp(
    `(?<![\\w&#;])(${named.map(l => escapeRegex(l.name)).join('|')})(?![\\w;])`,
    'g'
  );
  const byName = new Map(named.map(l => [l.name, l.url]));
  return escaped.replace(pattern, (m) => {
    const url = byName.get(m);
    if (!url) return m;
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 font-bold hover:text-rb-blue-shade">${m}</a>`;
  });
}

function renderRich(text, links) {
  const inline = (t) => {
    const escaped = t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return linkify(escaped, links)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
  };

  return text.split('\n').map((line, i) => {
    const heading = line.match(/^#{2,4}\s+(.*)$/);
    if (heading) {
      return (
        <h4 key={i} className="text-xs font-bold uppercase tracking-widest text-muted mt-4 first:mt-0 mb-1">
          {heading[1]}
        </h4>
      );
    }
    if (!line.trim()) return <div key={i} className="h-2" />;
    return <p key={i} className="mb-2 last:mb-0" dangerouslySetInnerHTML={{ __html: inline(line) }} />;
  });
}

/** The dimension this turn is introducing — icon and name, from the model. */
function DimensionChip({ concept, isWrapUp }) {
  if (isWrapUp) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-rb-green bg-rb-green-tint text-rb-green-shade text-xs font-bold uppercase tracking-widest mb-2">
        <Flag size={11} /> Wrap-up
      </div>
    );
  }
  if (!concept) return null;
  const Icon = Icons[concept.icon] || Icons.Circle;
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-dark bg-light text-dark text-xs font-bold uppercase tracking-widest mb-2">
      <Icon size={11} /> {concept.title}
    </div>
  );
}

function Bubble({ msg, items }) {
  const isUser = msg.role === 'user';
  const concept = msg.conceptId ? (items || CONCEPTS).find(c => c.id === msg.conceptId) : null;
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 bg-dark text-light flex items-center justify-center text-xs font-bold border-2 border-dark mt-0.5">
          SD
        </div>
      )}
      <div
        className={`max-w-[85%] px-4 py-3 border-2 text-sm leading-relaxed ${
          isUser ? 'bg-dark text-light border-dark' : 'bg-white text-dark border-dark'
        }`}
        style={isUser ? { whiteSpace: 'pre-wrap' } : undefined}
      >
        {!isUser && <DimensionChip concept={concept} isWrapUp={msg.isWrapUp} />}
        {isUser ? msg.content : renderRich(msg.content, msg.links)}
        {/* The placeholder is marked streaming the moment a turn starts, which
            suppressed the separate spinner — so the whole wait for the first
            token showed an empty bubble and a blinking caret, reading as
            nothing happening. Wait state lives in the bubble itself now. */}
        {msg.streaming && !msg.content && (
          <span className="inline-flex items-center gap-2 text-xs text-muted">
            <Loader2 size={13} className="animate-spin" /> Thinking…
          </span>
        )}
        {msg.streaming && msg.content && (
          <span className="inline-block w-2 h-4 bg-dark align-text-bottom animate-pulse ml-0.5" />
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 bg-darker text-light flex items-center justify-center text-xs font-bold border-2 border-dark mt-0.5">
          You
        </div>
      )}
    </div>
  );
}

export default function GuidedWalkthrough({
  providerId, apiKey, platformDescription, ollamaConfig,
  startConceptId = null, track = 'dimensions', onBack,
}) {
  // Four tracks share this component: the framework dimensions, and the three
  // reference groups (finitude principles, UI patterns, EU instruments). Same
  // loop, different vocabulary and framing — so a new group needs no changes
  // here, only an entry in frameworkReference.js.
  const ref = track === 'dimensions' ? null : referenceTrack(track);
  const ITEMS = ref ? ref.items : CONCEPTS;
  const SYSTEM = ref ? buildReferenceSystemPrompt(ref) : GUIDE_SYSTEM_PROMPT;
  const UNIT = ref ? ref.unit : 'dimension';
  const LABEL = ref ? ref.label : 'Guided walkthrough';

  const buildStep = (item, idea, previous, isFirst, expansive) =>
    ref ? buildReferencePrompt(ref, item, idea, previous, isFirst, expansive)
        : buildGuidePrompt(item, idea, previous, isFirst, expansive);

  const buildWrap = (idea, collected, covered, total) =>
    ref ? buildReferenceWrapUpPrompt(ref, idea, collected, covered, total)
        : buildGuideWrapUpPrompt(idea, collected, covered, total);

  // Arriving from an item in the landing accordion starts there rather than at
  // the top, and opens with a fuller explanation of it.
  const startIndex = Math.max(0, ITEMS.findIndex(c => c.id === startConceptId));
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers]   = useState([]);   // { id, title, answer }
  const [stepIndex, setStepIndex] = useState(startIndex);  // which concept we are ON
  const [input, setInput]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]       = useState('');
  const [finished, setFinished] = useState(false);
  const [awaitingQuestion, setAwaitingQuestion] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);

  // Opening turn — guarded so React 18 StrictMode's double-mount cannot
  // fire two API calls and charge twice for the same greeting.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    runStep(startIndex, null, [], startConceptId !== null);
  }, []);

  function provider() {
    return createProvider(providerId, apiKey, ollamaConfig || {});
  }

  /**
   * Run one turn, growing an assistant bubble as text arrives.
   *
   * Chunks are accumulated in a ref and flushed on an animation frame rather
   * than calling setState per token — a fast stream emits hundreds of chunks a
   * second, and re-rendering the whole transcript that often makes the page
   * stutter and the input laggy.
   */
  async function streamTurn(userPrompt, currentMessages, meta) {
    setIsLoading(true);
    setError('');

    const placeholder = { role: 'assistant', content: '', streaming: true, ...meta };
    setMessages([...currentMessages, placeholder]);

    const paint = (text) => setMessages(prev => {
      const next = [...prev];
      const last = next.length - 1;
      if (next[last]?.streaming) next[last] = { ...next[last], content: text };
      return next;
    });
    const pacer = createPacer({ onUpdate: paint });

    try {
      await provider().sendMessageStream(SYSTEM, userPrompt, [], piece => pacer.push(piece));
      const full = await pacer.end();   // waits for the paced text to finish rendering
      setMessages(prev => {
        const next = [...prev];
        const last = next.length - 1;
        if (next[last]?.streaming) next[last] = { ...next[last], content: full.trim(), streaming: false };
        return next;
      });
      return full.trim();
    } catch (err) {
      pacer.cancel();
      // Drop the empty placeholder so a failed turn does not leave a blank bubble
      setMessages(currentMessages);
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  async function runStep(index, previous, currentMessages, expansive = false) {
    const concept = ITEMS[index];
    setStepIndex(index);
    const isFirst = currentMessages.length === 0;
    const userPrompt = buildStep(concept, platformDescription, previous, isFirst, expansive);
    await streamTurn(userPrompt, currentMessages, { conceptId: concept.id });
  }

  async function runExplore(kind, question, currentMessages) {
    const concept = ITEMS[stepIndex];
    const refs = kind === 'references' ? referencesForConcept(concept.id) : [];
    // Loaded on demand — the directory is ~146KB and only this chip needs it,
    // so it must not sit in the bundle everyone downloads on the landing page.
    let platforms = '';
    let links = null;
    if (kind === 'platforms') {
      const { directoryLines, linkablePlatforms } = await import('../data/rebuildDirectory');
      platforms = directoryLines(concept.id, 7);
      links = linkablePlatforms(concept.id, 7);
    }
    const userPrompt = buildGuideExplorePrompt(concept, platformDescription, kind, question, refs, platforms);
    await streamTurn(userPrompt, currentMessages, { conceptId: concept.id, isExplore: true, links });
  }

  /** Chips stay on the dimension; only a typed answer advances. */
  function handleChip(kind) {
    if (isLoading || finished) return;
    const concept = ITEMS[stepIndex];

    if (kind === 'question') {
      // No API call for the invitation itself — it is the same sentence every time.
      setAwaitingQuestion(true);
      setMessages(m => [...m, {
        role: 'assistant', conceptId: concept.id, isExplore: true,
        content: `Sure — what would you like to know about ${concept.title}?`,
      }]);
      setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }

    const label =
      kind === 'references' ? `What are some good references on ${concept.title}?`
      : kind === 'platforms' ? `Good examples from the Rebuild platforms for ${concept.title}?`
      : `Tell me more about ${concept.title}.`;
    const withUser = [...messages, { role: 'user', content: label }];
    setMessages(withUser);
    runExplore(kind, null, withUser);
  }

  async function runWrapUp(collected, currentMessages) {
    const userPrompt = buildWrap(
      platformDescription, collected, collected.length, ITEMS.length
    );
    const text = await streamTurn(userPrompt, currentMessages, { isWrapUp: true });
    // Only close the session if the wrap-up actually arrived — otherwise the
    // user would be locked out of a session they could still finish.
    if (text) setFinished(true);
  }

  async function send(text) {
    const message = (text ?? input).trim();
    if (!message || isLoading || finished) return;
    setInput('');

    const withUser = [...messages, { role: 'user', content: message }];
    setMessages(withUser);

    // "wrap up" at any point — the user decides when the session ends
    if (WRAP_PATTERNS.test(message)) {
      setAwaitingQuestion(false);
      await runWrapUp(answers, withUser);
      return;
    }

    // They pressed "Ask a question" — this is a question, not their answer,
    // so it must not be recorded or advance the walkthrough.
    if (awaitingQuestion) {
      setAwaitingQuestion(false);
      await runExplore('question', message, withUser);
      return;
    }

    const concept = ITEMS[stepIndex];
    const collected = [...answers, { id: concept.id, title: concept.title, answer: message }];
    setAnswers(collected);

    const next = stepIndex + 1;
    if (next >= ITEMS.length) {
      await runWrapUp(collected, withUser);
    } else {
      await runStep(next, { title: concept.title, answer: message }, withUser);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function handlePrototypeInLovable() {
    const wrap = messages.find(m => m.isWrapUp);
    const { url } = buildSessionLovableUrl(
      platformDescription, answers, wrap ? wrap.content : null, ITEMS
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleExport() {
    let md = `# Social Design Framework — ${ref ? ref.title : 'Guided'} Session\n\n`;
    md += `**Date:** ${new Date().toLocaleDateString()}\n\n`;
    if (platformDescription) md += `**Platform / idea:**\n\n${platformDescription}\n\n`;
    md += `---\n\n## What we worked through\n\n`;
    answers.forEach((a, i) => {
      md += `### ${i + 1}. ${a.title}\n\n${a.answer}\n\n`;
    });
    const wrap = messages.find(m => m.isWrapUp);
    if (wrap) md += `---\n\n## Wrap-up\n\n${wrap.content}\n\n`;
    md += `---\n\n## Full transcript\n\n`;
    messages.forEach(m => {
      md += `**${m.role === 'user' ? 'You' : 'Facilitator'}:** ${m.content}\n\n`;
    });
    md += `\n*Social Design Framework · Rebuild.net · [rebuild.net](https://rebuild.net)*\n`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `social-design-session-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const current = ITEMS[stepIndex];
  const remaining = ITEMS.length - startIndex;
  const progress = finished ? 100 : (answers.length / Math.max(1, remaining)) * 100;

  return (
    <div className="animate-fade-in">
      {/* Progress bar */}
      <div className="border-b-2 border-dark bg-light sticky top-14 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-muted mb-0.5">
                {LABEL}
              </p>
              <h2 className="text-lg font-bold text-dark truncate flex items-center gap-2">
                {!finished && current && (() => {
                  const Icon = Icons[current.icon] || Icons.Circle;
                  return (
                    <span className="w-6 h-6 border-2 border-dark flex items-center justify-center flex-shrink-0">
                      <Icon size={13} className="text-dark" />
                    </span>
                  );
                })()}
                {finished ? 'Session complete' : current?.title}
              </h2>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-dark">
                  {answers.length}<span className="text-muted">/{remaining}</span>
                </div>
                <div className="text-xs text-muted uppercase tracking-widest">Covered</div>
              </div>
              {answers.length > 0 && (
                <button
                  onClick={handlePrototypeInLovable}
                  title="Open Lovable with this session as a build brief — you pick the workspace there"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-dark text-dark hover:bg-dark hover:text-light transition-colors text-sm font-bold"
                >
                  <Rocket size={14} /> Prototype
                </button>
              )}
              {answers.length > 0 && (
                <button
                  onClick={handleExport}
                  title="Export this session as Markdown"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-dark text-dark hover:bg-dark hover:text-light transition-colors text-sm font-bold"
                >
                  <Download size={14} /> Export
                </button>
              )}
              {finished && (
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-4 py-2 bg-dark text-light border-2 border-dark hover:bg-darker transition-colors text-sm font-bold"
                >
                  <RotateCcw size={14} /> Start over
                </button>
              )}
            </div>
          </div>
          <div className="h-1 bg-lighter w-full mt-3">
            <div className="h-full bg-dark transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="border-2 border-dark bg-white">
          <div className="border-b-2 border-dark px-5 py-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-dark text-light flex items-center justify-center border-2 border-dark">
              <GraduationCap size={16} />
            </div>
            <div>
              <h3 className="font-bold text-dark text-sm">{ref ? `Working through the ${ref.title.toLowerCase()}` : 'Learning the Social Design Framework'}</h3>
              <p className="text-xs text-muted">
                One {UNIT} at a time · type <strong className="text-darker">wrap up</strong> whenever you want a summary
              </p>
            </div>
          </div>

          <div className="px-5 py-6 space-y-5 min-h-[300px]">
            {messages.map((m, i) => <Bubble key={i} msg={m} items={ITEMS} />)}
            {isLoading && !messages[messages.length - 1]?.streaming && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-7 h-7 bg-dark text-light flex items-center justify-center text-xs font-bold border-2 border-dark">
                  SD
                </div>
                <div className="px-4 py-3 border-2 border-dark bg-white">
                  <Loader2 size={14} className="animate-spin text-muted" />
                </div>
              </div>
            )}
            {error && (
              <div className="border-2 border-rb-red bg-rb-red-tint px-4 py-3 text-sm text-dark">
                {error}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {!finished && messages.length > 0 && (
            <div className="border-t-2 border-dark px-5 pt-4 pb-1 flex flex-wrap gap-2">
              <button
                type="button" onClick={() => handleChip('more')} disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-dark text-xs text-dark hover:bg-dark hover:text-light disabled:opacity-30 transition-colors"
              >
                <Plus size={11} /> Tell me more about {ITEMS[stepIndex]?.title}
              </button>
              <button
                type="button" onClick={() => handleChip('references')} disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-dark text-xs text-dark hover:bg-dark hover:text-light disabled:opacity-30 transition-colors"
              >
                <BookOpen size={11} /> Good references
              </button>
              {/* The directory is mapped per framework dimension, so on a
                  reference track it would return arbitrary platforms. */}
              {!ref && (
              <button
                type="button" onClick={() => handleChip('platforms')} disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-dark text-xs text-dark hover:bg-dark hover:text-light disabled:opacity-30 transition-colors"
              >
                <MapPin size={11} /> Good examples from Rebuild platforms
              </button>
              )}
              <button
                type="button" onClick={() => handleChip('question')} disabled={isLoading || awaitingQuestion}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-dark text-xs text-dark hover:bg-dark hover:text-light disabled:opacity-30 transition-colors"
              >
                <HelpCircle size={11} /> Ask a question
              </button>
            </div>
          )}

          {!finished && (
            <div className="border-t-0 px-5 py-4 flex gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={
                  isLoading ? 'Thinking…'
                  : awaitingQuestion ? `Your question about ${ITEMS[stepIndex]?.title}…`
                  : 'Your answer — or type "wrap up" to finish early'
                }
                rows={2}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border-2 border-dark bg-light text-dark placeholder-muted focus:outline-none focus:bg-white transition-colors text-sm resize-none disabled:opacity-50"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-12 border-2 border-dark bg-dark text-light hover:bg-darker disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          )}

          {finished && (
            <div className="border-t-2 border-dark px-5 py-4 bg-rb-green-tint flex items-center gap-2 text-sm text-rb-green-shade">
              <Flag size={14} /> Session complete — export it to keep the wrap-up, or start over with a new idea.
            </div>
          )}
        </div>

        <p className="text-xs text-muted mt-4 text-center">
          Running as a workshop? Project this, answer as a team, and export the session at the end.
        </p>
      </div>
    </div>
  );
}
