import { useState } from 'react';
import * as Icons from 'lucide-react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, HelpCircle, FileCode } from 'lucide-react';
import { CONCEPTS, ANALYSIS_SYSTEM_PROMPT, DESIGN_SYSTEM_PROMPT } from '../data/framework';

const META_STYLE = {
  'enable-dimension':  { badge: 'border-rb-green text-rb-green',   chip: 'bg-rb-green',   label: 'Meta · Enable' },
  'grow-dimension':    { badge: 'border-rb-blue text-rb-blue',     chip: 'bg-rb-blue',    label: 'Meta · Grow' },
  'protect-dimension': { badge: 'border-rb-red text-rb-red',       chip: 'bg-rb-red',     label: 'Meta · Protect' },
};

function bold(s) {
  // **bold** first, so the remaining single asterisks are unambiguously italics
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-dark">$1</strong>')
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
}

/** Renders the raw system-prompt template literals — headings, bullets, paragraphs. */
function renderPrompt(text) {
  const lines = text.split('\n');
  const elements = [];
  let list = [];

  function flush() {
    if (list.length) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-5 space-y-1.5 mb-4">
          {list.map((item, i) => (
            <li key={i} className="text-sm text-darker leading-relaxed" dangerouslySetInnerHTML={{ __html: bold(item) }} />
          ))}
        </ul>
      );
      list = [];
    }
  }

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!line) { flush(); return; }
    if (line.startsWith('### ')) { flush(); elements.push(<h5 key={i} className="text-xs font-bold uppercase tracking-widest text-muted mt-6 mb-2">{line.slice(4)}</h5>); return; }
    if (line.startsWith('## ')) { flush(); elements.push(<h4 key={i} className="text-base font-bold text-dark mt-8 mb-2 first:mt-0">{line.slice(3)}</h4>); return; }
    if (line.startsWith('- ')) { list.push(line.slice(2)); return; }
    if (/^\d+\.\s/.test(line)) { list.push(line.replace(/^\d+\.\s/, '')); return; }
    flush();
    elements.push(<p key={i} className="text-sm text-darker leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: bold(line) }} />);
  });
  flush();
  return elements;
}

function DimensionRow({ concept, index }) {
  const [open, setOpen] = useState(false);
  const Icon = Icons[concept.icon] || Icons.Circle;
  const meta = META_STYLE[concept.id];

  return (
    <div className="border-2 border-dark -mt-[2px] first:mt-0 bg-white">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-light transition-colors">
        <div className="flex-shrink-0 w-8 h-8 border-2 border-dark flex items-center justify-center text-xs font-bold text-muted">
          {String(index).padStart(2, '0')}
        </div>
        <div className="flex-shrink-0 w-8 h-8 border-2 border-dark flex items-center justify-center">
          <Icon size={16} className="text-dark" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-dark text-sm">{concept.title}</h4>
            {meta
              ? <span className={`px-1.5 py-0.5 text-xs font-bold border ${meta.badge}`}>{meta.label}</span>
              : <span className="px-1.5 py-0.5 text-xs font-bold border border-rb-orange text-rb-orange">Core</span>}
          </div>
          <p className="text-xs text-muted truncate">{concept.shortDesc}</p>
        </div>
        {open ? <ChevronUp size={16} className="text-muted flex-shrink-0" /> : <ChevronDown size={16} className="text-muted flex-shrink-0" />}
      </button>

      {open && (
        <div className="border-t-2 border-dark px-5 pb-6 pt-5 animate-fade-in">
          <div className="mb-2">{renderPrompt(concept.promptContext)}</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 bg-rb-red-tint border-2 border-rb-red">
              <h5 className="text-xs font-bold uppercase tracking-widest text-rb-red mb-3 flex items-center gap-2">
                <AlertTriangle size={12} /> Dark Patterns Checked
              </h5>
              <ul className="space-y-2">
                {concept.darkPatterns.map((p, i) => (
                  <li key={i} className="text-sm text-darker leading-relaxed">{p}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-rb-green-tint border-2 border-rb-green">
              <h5 className="text-xs font-bold uppercase tracking-widest text-rb-green-shade mb-3 flex items-center gap-2">
                <CheckCircle2 size={12} /> Light Patterns Recommended
              </h5>
              <ul className="space-y-2">
                {concept.lightPatterns.map((p, i) => (
                  <li key={i} className="text-sm text-darker leading-relaxed">{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-light border-2 border-dark">
            <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-3 flex items-center gap-2">
              <HelpCircle size={12} /> Key Questions
            </h5>
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
    </div>
  );
}

function Section({ number, title, subtitle, accent = 'bg-dark', children }) {
  return (
    <div className="mt-12">
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex-shrink-0 w-8 h-8 ${accent} text-white flex items-center justify-center font-bold text-sm border-2 border-dark`}>
          {number}
        </div>
        <div>
          <h3 className="text-lg font-bold text-dark">{title}</h3>
          {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

const UNLOCK_KEY = 'sdr_instructions_unlocked';
const PASSWORD = 'rebuildrebuild';

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(UNLOCK_KEY, '1');
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-xs border-2 border-dark bg-white p-8">
        <Icons.Lock size={18} className="text-dark mb-4" />
        <h1 className="font-bold text-dark text-lg mb-1">Instructions</h1>
        <p className="text-xs text-muted mb-6">This reference page is password protected.</p>
        <input
          type="password"
          value={value}
          onChange={e => { setValue(e.target.value); setError(false); }}
          placeholder="Password"
          autoFocus
          className="w-full px-4 py-3 border-2 border-dark bg-light text-dark placeholder-muted focus:outline-none focus:bg-white transition-colors text-sm mb-3"
        />
        {error && <p className="text-xs text-rb-red mb-3">Incorrect password.</p>}
        <button type="submit" className="w-full bg-dark text-light border-2 border-dark py-3 font-bold text-sm hover:bg-darker transition-colors">
          Unlock
        </button>
      </form>
    </section>
  );
}

export default function InstructionsView() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(UNLOCK_KEY) === '1');

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return <InstructionsContent />;
}

function InstructionsContent() {
  const socialObj = CONCEPTS.find(c => c.id === 'social-object');
  const intentObj = CONCEPTS.find(c => c.id === 'platform-intent');
  const coreConcepts = CONCEPTS.filter(c =>
    c.dimension === null &&
    !['social-object', 'platform-intent', 'enable-dimension', 'grow-dimension', 'protect-dimension'].includes(c.id)
  );
  const metaDimensions = CONCEPTS.filter(c =>
    ['enable-dimension', 'grow-dimension', 'protect-dimension'].includes(c.id)
  );
  const allDimensions = [socialObj, intentObj, ...coreConcepts].filter(Boolean);

  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <section className="bg-light border-b-2 border-dark">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-sm text-muted mb-4 uppercase tracking-widest flex items-center gap-2">
            <FileCode size={14} /> Internal reference &middot; not user-facing copy
          </p>
          <h1 className="text-4xl md:text-5xl font-normal text-dark mb-6 leading-tight">
            The Review<br />Instruction Set
          </h1>
          <p className="text-base text-darker max-w-xl leading-relaxed">
            Every prompt this app sends to an LLM when it audits or designs a social platform — rendered straight from <code className="bg-white border border-dark px-1.5 py-0.5 text-sm">src/data/framework.js</code>, so this page can never drift from what actually runs.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8 pt-6 border-t-2 border-dark text-xs text-muted">
            <span><span className="font-bold text-darker">Modes</span> &nbsp;Review &middot; Design Workshop</span>
            <span><span className="font-bold text-darker">Dimensions</span> &nbsp;13 (10 core + 3 meta)</span>
            <span><span className="font-bold text-darker">Consumed by</span> &nbsp;src/utils/analyzeWithAI.js</span>
          </div>
        </div>
      </section>

      {/* Analysis prompt */}
      <section className="border-b-2 border-dark bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Section number="1" title="Analysis System Prompt" subtitle="Sent with every dimension in Review Mode, against a live platform URL" accent="bg-dark">
            <div className="border-2 border-dark p-6 sm:p-8">
              {renderPrompt(ANALYSIS_SYSTEM_PROMPT)}
            </div>
            <div className="mt-4 p-4 bg-light border-2 border-dark">
              <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Required output — seven fixed sections, in order</h5>
              <div className="flex flex-wrap gap-2">
                {['Strengths', 'Assessment', 'Score (1–5)', 'Dark Patterns Detected', 'Recommendations', 'Interface Notes', 'European Perspective'].map(h => (
                  <span key={h} className="px-2 py-1 text-xs border border-dark bg-white text-darker">{h}</span>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Design prompt */}
      <section className="border-b-2 border-dark bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Section number="2" title="Design System Prompt" subtitle="Sent in Design Workshop Mode, against a platform concept instead of a live URL" accent="bg-rb-blue">
            <div className="border-2 border-dark p-6 sm:p-8">
              {renderPrompt(DESIGN_SYSTEM_PROMPT)}
            </div>
            <div className="mt-4 p-4 bg-light border-2 border-dark">
              <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Required output — five fixed sections, in order</h5>
              <div className="flex flex-wrap gap-2">
                {['Design Considerations', 'Suggestions', 'Interface Patterns', 'Watch Out For', 'European Perspective'].map(h => (
                  <span key={h} className="px-2 py-1 text-xs border border-dark bg-white text-darker">{h}</span>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Dimensions */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Section number="3" title="Core Dimensions" subtitle="Each dimension's promptContext, darkPatterns, lightPatterns, and keyQuestions from framework.js" accent="bg-rb-orange">
            <div className="space-y-0">
              {allDimensions.map((concept, i) => (
                <DimensionRow key={concept.id} concept={concept} index={i + 1} />
              ))}
            </div>
          </Section>

          <Section number="4" title="Meta-Dimensions" subtitle="Holistic passes across the core dimensions above — Enable, Grow, Protect" accent="bg-rb-green">
            <div className="space-y-0">
              {metaDimensions.map((concept, i) => (
                <DimensionRow key={concept.id} concept={concept} index={allDimensions.length + i + 1} />
              ))}
            </div>
          </Section>
        </div>
      </section>
    </div>
  );
}
