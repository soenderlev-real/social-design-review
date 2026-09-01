import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Download, RotateCcw, GraduationCap, Flag } from 'lucide-react';
import * as Icons from 'lucide-react';
import { CONCEPTS, GUIDE_SYSTEM_PROMPT, buildGuidePrompt, buildGuideWrapUpPrompt } from '../data/framework';
import { createProvider } from '../providers';

const WRAP_PATTERNS = /^\s*(wrap[\s-]?up|wrap|summar(y|ise|ize)|finish|done|that'?s enough)\s*[.!]?\s*$/i;

/**
 * The facilitator writes prose, but the wrap-up uses ### headers and emphasis.
 * Render just enough markdown that those do not show up as literal characters.
 */
function renderRich(text) {
  const inline = (t) => t
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');

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

function Bubble({ msg }) {
  const isUser = msg.role === 'user';
  const concept = msg.conceptId ? CONCEPTS.find(c => c.id === msg.conceptId) : null;
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
        {isUser ? msg.content : renderRich(msg.content)}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 bg-darker text-light flex items-center justify-center text-xs font-bold border-2 border-dark mt-0.5">
          You
        </div>
      )}
    </div>
  );
}

export default function GuidedWalkthrough({ providerId, apiKey, platformDescription, ollamaConfig, onBack }) {
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers]   = useState([]);   // { id, title, answer }
  const [stepIndex, setStepIndex] = useState(0);  // which concept we are ON
  const [input, setInput]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]       = useState('');
  const [finished, setFinished] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);

  // Opening turn — guarded so React 18 StrictMode's double-mount cannot
  // fire two API calls and charge twice for the same greeting.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    runStep(0, null, []);
  }, []);

  function provider() {
    return createProvider(providerId, apiKey, ollamaConfig || {});
  }

  async function runStep(index, previous, currentMessages) {
    setIsLoading(true);
    setError('');
    try {
      const concept = CONCEPTS[index];
      const userPrompt = buildGuidePrompt(concept, platformDescription, previous, index === 0);
      const reply = await provider().sendMessage(GUIDE_SYSTEM_PROMPT, userPrompt);
      setMessages([...currentMessages, { role: 'assistant', content: reply.trim(), conceptId: concept.id }]);
      setStepIndex(index);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  async function runWrapUp(collected, currentMessages) {
    setIsLoading(true);
    setError('');
    try {
      const userPrompt = buildGuideWrapUpPrompt(
        platformDescription, collected, collected.length, CONCEPTS.length
      );
      const reply = await provider().sendMessage(GUIDE_SYSTEM_PROMPT, userPrompt);
      setMessages([...currentMessages, { role: 'assistant', content: reply.trim(), isWrapUp: true }]);
      setFinished(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function send(text) {
    const message = (text ?? input).trim();
    if (!message || isLoading || finished) return;
    setInput('');

    const withUser = [...messages, { role: 'user', content: message }];
    setMessages(withUser);

    // "wrap up" at any point — the user decides when the session ends
    if (WRAP_PATTERNS.test(message)) {
      await runWrapUp(answers, withUser);
      return;
    }

    const concept = CONCEPTS[stepIndex];
    const collected = [...answers, { id: concept.id, title: concept.title, answer: message }];
    setAnswers(collected);

    const next = stepIndex + 1;
    if (next >= CONCEPTS.length) {
      await runWrapUp(collected, withUser);
    } else {
      await runStep(next, { title: concept.title, answer: message }, withUser);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function handleExport() {
    let md = `# Social Design Framework — Guided Session\n\n`;
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

  const current = CONCEPTS[stepIndex];
  const progress = finished ? 100 : (answers.length / CONCEPTS.length) * 100;

  return (
    <div className="animate-fade-in">
      {/* Progress bar */}
      <div className="border-b-2 border-dark bg-light sticky top-14 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-muted mb-0.5">
                Guided walkthrough
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
                  {answers.length}<span className="text-muted">/{CONCEPTS.length}</span>
                </div>
                <div className="text-xs text-muted uppercase tracking-widest">Covered</div>
              </div>
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
              <h3 className="font-bold text-dark text-sm">Learning the Social Design Framework</h3>
              <p className="text-xs text-muted">
                One dimension at a time · type <strong className="text-darker">wrap up</strong> whenever you want a summary
              </p>
            </div>
          </div>

          <div className="px-5 py-6 space-y-5 min-h-[300px]">
            {messages.map((m, i) => <Bubble key={i} msg={m} />)}
            {isLoading && (
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

          {!finished && (
            <div className="border-t-2 border-dark px-5 py-4 flex gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={isLoading ? 'Thinking…' : 'Your answer — or type "wrap up" to finish early'}
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
