import { ChevronDown, ChevronUp, Loader2, AlertTriangle, CheckCircle2, Lightbulb, Pencil, Flag, ShieldAlert } from 'lucide-react';
import * as Icons from 'lucide-react';

const SCORE_STYLES = {
  1: { bg: 'bg-rb-red-tint border-rb-red', text: 'text-rb-red', label: 'Harmful' },
  2: { bg: 'bg-rb-orange-tint border-rb-orange', text: 'text-rb-orange', label: 'Problematic' },
  3: { bg: 'bg-lighter border-muted', text: 'text-darker', label: 'Adequate' },
  4: { bg: 'bg-rb-green-tint border-rb-green', text: 'text-rb-green-shade', label: 'Good' },
  5: { bg: 'bg-rb-green-tint border-rb-green', text: 'text-rb-green-shade', label: 'Exemplary' },
};

function ScoreBadge({ score }) {
  const s = SCORE_STYLES[score] || SCORE_STYLES[3];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 border-2 text-xs font-bold ${s.bg} ${s.text}`}>
      {score}/5 · {s.label}
    </span>
  );
}

function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];
  let currentList = [];

  function flushList() {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-5 space-y-1 mb-3">
          {currentList.map((item, i) => (
            <li key={i} className="text-sm text-darker" dangerouslySetInnerHTML={{ __html: boldify(item) }} />
          ))}
        </ul>
      );
      currentList = [];
    }
  }

  function boldify(s) {
    return s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.slice(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      currentList.push(trimmed.replace(/^\d+\.\s/, ''));
    } else {
      flushList();
      if (trimmed) {
        elements.push(
          <p key={`p-${i}`} className="text-sm text-darker mb-3" dangerouslySetInnerHTML={{ __html: boldify(trimmed) }} />
        );
      }
    }
  });
  flushList();
  return <div className="ai-prose">{elements}</div>;
}

export default function ConceptCard({ concept, result, isExpanded, onToggle, mode = 'review' }) {
  const Icon = Icons[concept.icon] || Icons.Circle;
  const isDesignMode = mode === 'design';
  const status = result?.status || 'idle';

  return (
    <div className={`border-2 border-dark -mt-[2px] first:mt-0 bg-white transition-all duration-200 ${isExpanded ? 'col-span-1 lg:col-span-2' : ''}`}>
      {/* Header */}
      <button onClick={onToggle} className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-light transition-colors">
        <div className="flex-shrink-0 w-8 h-8 border-2 border-dark flex items-center justify-center">
          <Icon size={16} className="text-dark" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-dark text-sm">{concept.title}</h4>
          <p className="text-xs text-muted truncate">{concept.shortDesc}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {status === 'pending' && <Loader2 size={16} className="animate-spin text-muted" />}
          {status === 'done' && !isDesignMode && <ScoreBadge score={result.score} />}
          {status === 'done' && isDesignMode && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 border-2 border-rb-blue bg-rb-blue-tint text-rb-blue-shade text-xs font-bold">
              <Lightbulb size={11} /> Mapped
            </span>
          )}
          {status === 'error' && (
            <span className="inline-flex items-center gap-1 text-rb-red text-xs font-bold border-2 border-rb-red px-2 py-1">
              <AlertTriangle size={12} /> Error
            </span>
          )}
          {isExpanded ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
        </div>
      </button>

      {/* Expanded: done — design mode */}
      {isExpanded && status === 'done' && isDesignMode && (
        <div className="border-t-2 border-dark px-5 pb-6 pt-5 animate-fade-in">
          {result.considerations && (
            <div className="mb-6 p-4 bg-rb-blue-tint border-2 border-rb-blue">
              <h5 className="text-xs font-bold uppercase tracking-widest text-rb-blue-shade mb-3 flex items-center gap-2">
                <Pencil size={12} /> Design Considerations
              </h5>
              {renderMarkdown(result.considerations)}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Suggestions</h5>
              {renderMarkdown(result.suggestions)}
            </div>
            <div>
              {result.watchOutFor && (
                <>
                  <h5 className="text-xs font-bold uppercase tracking-widest text-rb-orange mb-3 flex items-center gap-2">
                    <ShieldAlert size={12} /> Watch Out For
                  </h5>
                  {renderMarkdown(result.watchOutFor)}
                </>
              )}
            </div>
          </div>
          {result.europeanPerspective && (
            <div className="mt-6 p-4 bg-rb-green-tint border-2 border-rb-green">
              <h5 className="text-xs font-bold uppercase tracking-widest text-rb-green-shade mb-3 flex items-center gap-2">
                <Flag size={12} /> European Perspective
              </h5>
              {renderMarkdown(result.europeanPerspective)}
            </div>
          )}
          <div className="mt-4 p-4 bg-light border-2 border-dark">
            <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Key Questions for Your Team</h5>
            <ul className="space-y-1">
              {concept.keyQuestions.map((q, i) => (
                <li key={i} className="text-sm text-darker flex gap-2">
                  <span className="font-bold text-dark flex-shrink-0">{i + 1}.</span> {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Expanded: done — review mode */}
      {isExpanded && status === 'done' && !isDesignMode && (
        <div className="border-t-2 border-dark px-5 pb-6 pt-5 animate-fade-in">

          {result.strengths && (
            <div className="mb-6 p-4 bg-rb-green-tint border-2 border-rb-green">
              <h5 className="text-xs font-bold uppercase tracking-widest text-rb-green-shade mb-3 flex items-center gap-2">
                <CheckCircle2 size={12} /> Strengths
              </h5>
              {renderMarkdown(result.strengths)}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Assessment</h5>
              {renderMarkdown(result.assessment)}
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Recommendations</h5>
              {renderMarkdown(result.recommendations)}
            </div>
          </div>

          {result.darkPatterns && (
            <div className="mt-6 p-4 bg-rb-red-tint border-2 border-rb-red">
              <h5 className="text-xs font-bold uppercase tracking-widest text-rb-red mb-3 flex items-center gap-2">
                <AlertTriangle size={12} /> Dark Patterns Detected
              </h5>
              {renderMarkdown(result.darkPatterns)}
            </div>
          )}

          {result.europeanPerspective && (
            <div className="mt-4 p-4 bg-rb-green-tint border-2 border-rb-green">
              <h5 className="text-xs font-bold uppercase tracking-widest text-rb-green-shade mb-3 flex items-center gap-2">
                <Icons.Flag size={12} /> European Perspective
              </h5>
              {renderMarkdown(result.europeanPerspective)}
            </div>
          )}

          <div className="mt-4 p-4 bg-light border-2 border-dark">
            <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Key Questions for Your Team</h5>
            <ul className="space-y-1">
              {concept.keyQuestions.map((q, i) => (
                <li key={i} className="text-sm text-darker flex gap-2">
                  <span className="font-bold text-dark flex-shrink-0">{i + 1}.</span> {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Expanded: error */}
      {isExpanded && status === 'error' && (
        <div className="border-t-2 border-dark px-5 py-4">
          <div className="border-2 border-rb-red bg-rb-red-tint p-4 text-sm text-dark">{result.error}</div>
        </div>
      )}

      {/* Expanded: pending */}
      {isExpanded && status === 'pending' && (
        <div className="border-t-2 border-dark px-5 py-10 text-center text-muted text-sm">
          <Loader2 size={20} className="animate-spin mx-auto mb-2" />
          Analysing...
        </div>
      )}
    </div>
  );
}
