import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageSquare } from 'lucide-react';
import { createProvider } from '../providers';
import { CONCEPTS } from '../data/framework';

function buildReviewContext(platformUrl, platformDescription, results) {
  let ctx = `You have just completed a Social Design Review of "${platformUrl}".\n`;
  if (platformDescription) ctx += `Platform description: ${platformDescription}\n`;
  ctx += `\nHere are the full review results:\n\n`;

  CONCEPTS.forEach(c => {
    const r = results[c.id];
    if (!r || r.status !== 'done') return;
    ctx += `## ${c.title} — Score: ${r.score}/5\n`;
    if (r.strengths)          ctx += `Strengths: ${r.strengths}\n`;
    if (r.assessment)         ctx += `Assessment: ${r.assessment}\n`;
    if (r.darkPatterns)       ctx += `Dark Patterns: ${r.darkPatterns}\n`;
    if (r.recommendations)    ctx += `Recommendations: ${r.recommendations}\n`;
    if (r.europeanPerspective) ctx += `European Perspective: ${r.europeanPerspective}\n`;
    ctx += '\n';
  });

  return ctx;
}

function buildSystemPrompt(platformUrl, platformDescription, results) {
  return `You are an expert social platform design reviewer, grounded in the Social Design Framework developed for the Rebuild.net European social platforms initiative.

${buildReviewContext(platformUrl, platformDescription, results)}

The user wants to have a conversation about this review. You can:
- Explain or expand on any part of the analysis
- Prioritise which issues to fix first and why
- Suggest concrete design alternatives or examples from other platforms
- Compare dimensions with each other
- Discuss the European regulatory and values context (GDPR, DSA, democratic participation)
- Answer hypothetical "what if we changed X" questions

Be specific, constructive and grounded in the review data above. Keep responses focused and practical.`;
}

function buildUserPrompt(history, newMessage) {
  if (history.length === 0) return newMessage;
  const formatted = history
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n\n');
  return `Previous conversation:\n${formatted}\n\nUser: ${newMessage}`;
}

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 bg-dark text-light flex items-center justify-center text-xs font-bold border-2 border-dark mt-0.5">
          AI
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 border-2 text-sm leading-relaxed ${
          isUser
            ? 'bg-dark text-light border-dark'
            : 'bg-white text-dark border-dark'
        }`}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {msg.content}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 bg-darker text-light flex items-center justify-center text-xs font-bold border-2 border-dark mt-0.5">
          You
        </div>
      )}
    </div>
  );
}

const SUGGESTIONS = [
  'What should we fix first?',
  'Which dimension is strongest?',
  'How could this platform better align with European values?',
  'What dark patterns are most harmful here?',
  'Suggest a platform that does this better',
];

export default function ChatPanel({ providerId, apiKey, platformUrl, platformDescription, results, ollamaConfig }) {
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState('');
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  async function send(text) {
    const message = (text || input).trim();
    if (!message || isLoading) return;

    setInput('');
    setError('');
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const provider = createProvider(providerId, apiKey, ollamaConfig || {});
      const systemPrompt = buildSystemPrompt(platformUrl, platformDescription, results);
      // Include history in the user prompt since providers use single-turn interface
      const userPrompt = buildUserPrompt(messages, message);
      const reply = await provider.sendMessage(systemPrompt, userPrompt);
      setMessages([...newMessages, { role: 'assistant', content: reply.trim() }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const completedCount = Object.values(results).filter(r => r.status === 'done').length;
  if (completedCount === 0) return null;

  return (
    <div className="border-2 border-dark bg-white mt-12">
      {/* Header */}
      <div className="border-b-2 border-dark px-5 py-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-dark text-light flex items-center justify-center border-2 border-dark">
          <MessageSquare size={16} />
        </div>
        <div>
          <h3 className="font-bold text-dark text-sm">Discuss the Review</h3>
          <p className="text-xs text-muted">Ask follow-up questions based on the {completedCount} completed analyses</p>
        </div>
      </div>

      {/* Suggestions — shown only before first message */}
      {messages.length === 0 && (
        <div className="px-5 py-4 border-b-2 border-dark">
          <p className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Suggested questions</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => send(s)}
                className="px-3 py-1.5 border-2 border-dark text-xs text-dark hover:bg-dark hover:text-light transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.length > 0 && (
        <div className="px-5 py-5 space-y-4 max-h-[500px] overflow-y-auto">
          {messages.map((m, i) => <Message key={i} msg={m} />)}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-7 h-7 bg-dark text-light flex items-center justify-center text-xs font-bold border-2 border-dark">
                AI
              </div>
              <div className="px-4 py-3 border-2 border-dark bg-white">
                <Loader2 size={14} className="animate-spin text-muted" />
              </div>
            </div>
          )}
          {error && (
            <div className="border-2 border-rb-red bg-rb-red-tint px-4 py-2 text-sm text-dark">
              {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input */}
      <div className={`${messages.length > 0 ? 'border-t-2 border-dark' : ''} px-5 py-4 flex gap-3`}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask anything about this review..."
          rows={2}
          className="flex-1 px-4 py-3 border-2 border-dark bg-light text-dark placeholder-muted focus:outline-none focus:bg-white transition-colors text-sm resize-none"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || isLoading}
          className="flex-shrink-0 w-12 border-2 border-dark bg-dark text-light hover:bg-darker disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
      </div>
    </div>
  );
}
