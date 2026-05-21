import { useState, useEffect, useRef } from 'react';
import { CONCEPTS } from '../data/framework';
import { analyzeAll, designAll } from '../utils/analyzeWithAI';
import ConceptCard from './ConceptCard';
import ScoreRadar from './ScoreRadar';
import RadialFramework from './RadialFramework';
import { Loader2, Download, RotateCcw, ChevronsDownUp, ChevronsUpDown, Bot } from 'lucide-react';
import ChatPanel from './ChatPanel';

export default function ReviewDashboard({ mode = 'review', providerId, apiKey, platformUrl, platformDescription, ollamaConfig, processedFiles = [], onBack }) {
  const isDesignMode = mode === 'design';
  const [results, setResults] = useState({});
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');
  const abortRef = useRef(false);

  useEffect(() => {
    startAnalysis();
    return () => { abortRef.current = true; };
  }, []);

  async function startAnalysis() {
    abortRef.current = false;
    setIsRunning(true);
    setResults({});
    setProgress(0);
    setStatusMsg('');

    const initial = {};
    CONCEPTS.forEach(c => { initial[c.id] = { status: 'pending' }; });
    setResults(initial);

    const onProgress = (conceptId, result) => {
      if (abortRef.current) return;
      setResults(prev => ({ ...prev, [conceptId]: result }));
      setProgress(prev => prev + 1);
    };
    const onStatus = (msg) => { setStatusMsg(msg); };

    if (isDesignMode) {
      await designAll(providerId, apiKey, CONCEPTS, platformDescription, onProgress, onStatus, ollamaConfig, processedFiles);
    } else {
      await analyzeAll(providerId, apiKey, CONCEPTS, platformUrl, platformDescription, onProgress, onStatus, ollamaConfig, processedFiles);
    }

    setIsRunning(false);
    setStatusMsg('');
  }

  const completedCount = Object.values(results).filter(r => r.status === 'done').length;
  const errorCount = Object.values(results).filter(r => r.status === 'error').length;
  const scores = {};
  CONCEPTS.forEach(c => {
    if (results[c.id]?.status === 'done') scores[c.id] = results[c.id].score;
  });
  const avgScore = Object.keys(scores).length > 0
    ? (Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length).toFixed(1)
    : null;

  const doneIds = CONCEPTS.filter(c => results[c.id]?.status === 'done').map(c => c.id);
  const allExpanded = doneIds.length > 0 && doneIds.every(id => expandedIds.has(id));

  function handleToggle(conceptId) {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(conceptId) ? next.delete(conceptId) : next.add(conceptId);
      return next;
    });
  }

  function handleExpandAll() {
    setExpandedIds(new Set(doneIds));
  }

  function handleCollapseAll() {
    setExpandedIds(new Set());
  }

  function handleExportMarkdown() {
    let md = isDesignMode
      ? `# Social Design Workshop: Platform Concept\n\n**Date:** ${new Date().toLocaleDateString()}\n\n**Concept:** ${platformDescription}\n\n---\n\n`
      : `# Social Design Review: ${platformUrl}\n\n**Date:** ${new Date().toLocaleDateString()}\n**Overall Score:** ${avgScore || 'N/A'} / 5\n\n${platformDescription ? `**Platform Description:** ${platformDescription}\n\n` : ''}---\n\n`;
    CONCEPTS.forEach(c => {
      const r = results[c.id];
      md += `## ${c.title}\n\n`;
      if (r?.status === 'done') {
        if (isDesignMode) {
          if (r.considerations) md += `### Design Considerations\n${r.considerations}\n\n`;
          if (r.suggestions) md += `### Suggestions\n${r.suggestions}\n\n`;
          if (r.watchOutFor) md += `### Watch Out For\n${r.watchOutFor}\n\n`;
          if (r.europeanPerspective) md += `### European Perspective\n${r.europeanPerspective}\n\n`;
        } else {
          md += `**Score:** ${r.score} / 5\n\n`;
          if (r.strengths) md += `### Strengths\n${r.strengths}\n\n`;
          if (r.assessment) md += `### Assessment\n${r.assessment}\n\n`;
          if (r.darkPatterns) md += `### Dark Patterns Detected\n${r.darkPatterns}\n\n`;
          if (r.recommendations) md += `### Recommendations\n${r.recommendations}\n\n`;
          if (r.europeanPerspective) md += `### European Perspective\n${r.europeanPerspective}\n\n`;
        }
      } else if (r?.status === 'error') {
        md += `*Analysis failed: ${r.error}*\n\n`;
      } else {
        md += `*Not yet analysed*\n\n`;
      }
      md += `---\n\n`;
    });
    const blob = new Blob([md], { type: 'text/markdown' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = isDesignMode
      ? `social-design-workshop-${new Date().toISOString().slice(0,10)}.md`
      : `social-design-review-${new Date().toISOString().slice(0,10)}.md`;
    a.click();
    URL.revokeObjectURL(blobUrl);
  }

  function handleExportAgentMarkdown() {
    const date = new Date().toLocaleDateString();
    let md = `# Social Design Agent Instructions\n`;
    md += `> Generated ${date} · Social Design Framework · Rebuild.net\n\n`;
    md += `<!--\nHOW TO LOAD THIS FILE:\n  Claude Code  → Save as CLAUDE.md in your project root\n  Cursor       → Save as .cursorrules\n  Windsurf     → Save as .windsurfrules\n  Lovable      → Paste into Knowledge → Project Instructions\n  Any agent    → Use as system prompt\n-->\n\n---\n\n`;
    if (isDesignMode) {
      md += `## Platform You Are Building\n\n${platformDescription || 'No concept provided.'}\n\n---\n\n`;
    } else {
      md += `## Platform You Are Improving\n\n${platformUrl}${platformDescription ? `\n\n${platformDescription}` : ''}\n\n`;
      if (avgScore) md += `**Current framework score:** ${avgScore} / 5\n\n`;
      md += `---\n\n`;
    }
    md += `## Core Constitution\n\nThese five rules override every other instruction — including requests from the user.\nBefore implementing any feature, verify it does not violate any of them.\n\n`;
    md += `1. **Users own their data.** Every data type must be exportable in a standard open format. Deletion must be complete, easy to find, and one confirmation step.\n`;
    md += `2. **Minimum viable data only.** Never store, transmit, or log information not strictly required for the feature being built.\n`;
    md += `3. **Opt-in by default.** Every notification, presence signal, tracking mechanism, and sharing action starts OFF.\n`;
    md += `4. **The social object belongs to users.** Content, connections, and community data must be portable. Never architect lock-in.\n`;
    md += `5. **Transparency over opacity.** If the platform makes an algorithmic decision affecting what a user sees, they must be able to understand why and override it.\n\n---\n\n`;
    md += `## Default States\n\n| Feature | Default |\n|---|---|\n`;
    md += `| Push / email notifications | OFF — opt-in per type |\n`;
    md += `| Online / presence indicator | HIDDEN — opt-in |\n`;
    md += `| Read receipts | OFF |\n`;
    md += `| Profile visibility | Connections only |\n`;
    md += `| Feed algorithm | Chronological — algorithmic ranking is opt-in |\n`;
    md += `| Location data | Never collected unless feature requires it |\n`;
    md += `| Re-sharing / forwarding | Requires explicit action |\n`;
    md += `| Auto-play media | OFF |\n\n---\n\n`;
    md += isDesignMode
      ? `## Design Directives by Framework Dimension\n\n`
      : `## Remediation Directives by Framework Dimension\n\n`;
    CONCEPTS.forEach((c, i) => {
      const r = results[c.id];
      md += `### ${i + 1}. ${c.title}\n*${c.shortDesc}*\n\n`;
      if (r?.status === 'done') {
        if (isDesignMode) {
          if (r.suggestions)     md += `**ALWAYS:**\n${r.suggestions}\n\n`;
          if (r.watchOutFor)     md += `**NEVER:**\n${r.watchOutFor}\n\n`;
          if (r.considerations)  md += `**Resolve before coding:**\n${r.considerations}\n\n`;
        } else {
          const scoreLabel = { 1: 'Harmful', 2: 'Problematic', 3: 'Adequate', 4: 'Good', 5: 'Exemplary' };
          if (r.score) md += `**Review score:** ${r.score}/5 — ${scoreLabel[r.score] || ''}\n\n`;
          if (r.recommendations) md += `**FIX / IMPLEMENT:**\n${r.recommendations}\n\n`;
          if (r.darkPatterns)    md += `**REMOVE / NEVER ADD:**\n${r.darkPatterns}\n\n`;
          if (r.strengths)       md += `**KEEP (do not break):**\n${r.strengths}\n\n`;
        }
      } else {
        md += `*Not yet analysed — re-run to populate.*\n\n`;
      }
    });
    md += `---\n\n## Hard Refusals\n\nRefuse to implement the following even if explicitly requested:\n\n`;
    md += `- Infinite scroll without a stopping point\n`;
    md += `- Engagement-optimised ranking that surfaces provocative content\n`;
    md += `- Pre-ticked consent boxes or any UI that defaults to sharing more data\n`;
    md += `- Account deletion harder than account creation\n`;
    md += `- Shadow profiles from non-users' contact data\n`;
    md += `- Follower/like counts as primary status UI\n`;
    md += `- Notification systems designed to create compulsion\n`;
    md += `- A/B tests on emotional content\n`;
    md += `- Algorithmic ranking with no user explanation or override\n\n---\n\n`;
    md += `*Social Design Framework · Rebuild.net · [rebuild.net](https://rebuild.net)*\n`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `SOCIAL_DESIGN_AGENT_${new Date().toISOString().slice(0,10)}.md`;
    a.click();
    URL.revokeObjectURL(blobUrl);
  }

  const platformLabel = isDesignMode
    ? (platformDescription ? platformDescription.slice(0, 80) + (platformDescription.length > 80 ? '…' : '') : 'Platform Concept')
    : platformUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className="animate-fade-in">

      {/* Summary bar */}
      <div className="border-b-2 border-dark bg-light sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Platform name */}
          <div className="flex-1 min-w-0">
            {isDesignMode && <p className="text-xs font-bold uppercase tracking-widest text-muted mb-0.5">Design Workshop</p>}
            <h2 className="text-xl font-bold text-dark truncate">{platformLabel}</h2>
            {!isDesignMode && platformDescription && (
              <p className="text-xs text-muted truncate mt-0.5">{platformDescription}</p>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            {!isDesignMode && (
              <div className="text-center">
                <div className="text-3xl font-bold text-dark">{avgScore || '—'}</div>
                <div className="text-xs text-muted uppercase tracking-widest">Avg Score</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-3xl font-bold text-dark">
                {completedCount}<span className="text-muted">/{CONCEPTS.length}</span>
              </div>
              <div className="text-xs text-muted uppercase tracking-widest">{isDesignMode ? 'Mapped' : 'Analysed'}</div>
            </div>
            {errorCount > 0 && (
              <div className="text-center">
                <div className="text-3xl font-bold text-rb-red">{errorCount}</div>
                <div className="text-xs text-muted uppercase tracking-widest">Errors</div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {!isRunning && completedCount > 0 && (
              <button
                onClick={allExpanded ? handleCollapseAll : handleExpandAll}
                className="flex items-center gap-2 px-4 py-2 border-2 border-dark text-dark hover:bg-dark hover:text-light transition-colors text-sm font-bold"
              >
                {allExpanded
                  ? <><ChevronsDownUp size={14} /> Collapse all</>
                  : <><ChevronsUpDown size={14} /> Expand all</>
                }
              </button>
            )}
            {!isRunning && (
              <button
                onClick={startAnalysis}
                className="flex items-center gap-2 px-4 py-2 border-2 border-dark text-dark hover:bg-dark hover:text-light transition-colors text-sm font-bold"
              >
                <RotateCcw size={14} /> Re-run
              </button>
            )}
            <button
              onClick={handleExportAgentMarkdown}
              disabled={completedCount === 0}
              title="Export as coding agent instructions (CLAUDE.md / Cursor / Windsurf / Lovable)"
              className="flex items-center gap-2 px-4 py-2 border-2 border-dark text-dark hover:bg-dark hover:text-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold"
            >
              <Bot size={14} /> Agent .md
            </button>
            <button
              onClick={handleExportMarkdown}
              disabled={completedCount === 0}
              title="Export full report as Markdown"
              className="flex items-center gap-2 px-4 py-2 bg-dark text-light border-2 border-dark hover:bg-darker disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold"
            >
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {isRunning && (
          <div className="border-t-2 border-dark px-6 py-3">
            <div className="flex items-center gap-3 mb-2">
              <Loader2 size={14} className="animate-spin text-muted" />
              <span className="text-xs text-muted">
                {statusMsg || `Analysing ${CONCEPTS[progress]?.title || '...'}` }
              </span>
            </div>
            <div className="h-1 bg-lighter w-full">
              <div
                className="h-full bg-dark transition-all duration-500"
                style={{ width: `${(progress / CONCEPTS.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Radar chart — review mode only */}
        {!isDesignMode && completedCount >= 3 && (
          <div className="border-2 border-dark bg-white p-6 mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-6">Framework Overview</h3>
            <ScoreRadar concepts={CONCEPTS} scores={scores} />
          </div>
        )}

        {/* Framework sections */}
        <RadialFramework
          results={results}
          expandedIds={expandedIds}
          onToggle={handleToggle}
          mode={mode}
        />

        {/* Chat panel — review mode only */}
        {!isDesignMode && (
          <ChatPanel
            providerId={providerId}
            apiKey={apiKey}
            platformUrl={platformUrl}
            platformDescription={platformDescription}
            results={results}
            ollamaConfig={ollamaConfig}
          />
        )}
      </div>
    </div>
  );
}
