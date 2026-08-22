import { useState } from 'react';
import { RadialFramework } from 'social-design-review';

// RadialFramework groups the framework's own CONCEPTS internally (Social
// Object, Platform Intent, 8 core concepts, 3 meta-dimensions), so result
// keys here must match real framework.js concept ids for the sections to
// show content instead of idle placeholders.
const sampleResults = {
  'social-object': {
    status: 'done',
    score: 4,
    strengths: '- Rich, user-created social object at the centre of the platform',
    assessment: 'The platform is organised around a genuinely user-owned artifact rather than a thin status update.',
    darkPatterns: 'None detected',
    recommendations: '- Add full export in an open format on request',
    europeanPerspective: 'Supports data portability and user ownership consistent with GDPR.',
  },
  'platform-intent': {
    status: 'done',
    score: 2,
    strengths: '- Business model is disclosed in the terms of service',
    assessment: 'Revenue is tied to engagement time rather than utility, creating structural pressure toward extraction patterns.',
    darkPatterns: '- Misaligned metrics — optimising for engagement rather than utility or user satisfaction',
    recommendations: '- Publish utility metrics (task completion, satisfaction) alongside engagement metrics',
    europeanPerspective: 'An ad-funded, engagement-optimised model sits in tension with European data-sovereignty values.',
  },
  identity: { status: 'pending' },
  conversations: { status: 'error', error: 'Rate limited by the provider — retry in a few minutes.' },
  agency: {
    status: 'done',
    score: 3,
    strengths: '- Chronological feed option available',
    assessment: 'Users can opt out of the algorithmic feed, but the control is buried three menus deep.',
    darkPatterns: '- Illusory control — settings that appear to give control but are ineffective or quietly undermined',
    recommendations: '- Surface the chronological toggle in the primary navigation, not a settings submenu',
    europeanPerspective: 'Meaningful algorithmic choice should be a first-class control, not an opt-in buried in settings.',
  },
  'enable-dimension': {
    status: 'done',
    score: 3,
    strengths: '- Clear onboarding that sets community norms',
    assessment: 'Foundational governance is present but enforcement consistency varies across community areas.',
    darkPatterns: 'None detected',
    recommendations: '- Publish enforcement outcomes to build trust in consistency',
    europeanPerspective: 'Transparent, participatory governance aligns with democratic-empowerment values.',
  },
};

export function AllCollapsed() {
  const [expandedIds, setExpandedIds] = useState(new Set<string>());
  const toggle = (id: string) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  return <RadialFramework results={sampleResults} expandedIds={expandedIds} onToggle={toggle} mode="review" />;
}

export function WithExpandedCard() {
  const [expandedIds, setExpandedIds] = useState(new Set<string>(['platform-intent', 'agency']));
  const toggle = (id: string) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  return <RadialFramework results={sampleResults} expandedIds={expandedIds} onToggle={toggle} mode="review" />;
}
