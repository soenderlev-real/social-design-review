import { useState } from 'react';
import { ConceptCard } from 'social-design-review';

const identityConcept = {
  id: 'identity',
  title: 'Identity',
  icon: 'User',
  shortDesc: 'How users reveal, manage, and control who they are',
  promptContext:
    'Identity design determines the social contract of the platform. It covers real names vs. pseudonymity vs. anonymity, context-specific identities, profile granularity, and data minimisation.',
  darkPatterns: [
    'Forced identity collapse — requiring a single real-name identity across all contexts, exposing users to context collapse',
    'Dark profiling — collecting identity signals beyond explicit provision (device fingerprinting, shadow profiles, cross-context inference)',
  ],
  lightPatterns: [
    'SpatialUI identities — support distinct, context-bound personas (work, family, hobby) natively, not as a workaround',
    'Profiling transparency — a visible, plain-language log of every inferred attribute, with one-click deletion',
  ],
  keyQuestions: [
    'What is the minimum identity information needed for the social object to function?',
    'Can users maintain different context-specific identities (SpatialUI)?',
  ],
};

const doneReviewResult = {
  status: 'done' as const,
  score: 4,
  strengths:
    '- Supports pseudonymous accounts by default\n- Clear separation between display name and account identifier',
  assessment:
    'Identity handling is generally strong. Users can participate meaningfully without disclosing real-world identity, and context-specific personas are supported for most account types.',
  darkPatterns: 'None detected',
  recommendations:
    '- Add a one-click data-inference log so users can see what has been inferred about them\n- Allow multiple concurrent personas per account',
  europeanPerspective:
    'This aligns well with GDPR data-minimisation principles and supports participation from users who need pseudonymity for safety reasons.',
};

const doneDesignResult = {
  status: 'done' as const,
  considerations:
    '- Decide whether identity is required to participate at all, or only to post\n- Plan for context-specific personas from day one',
  suggestions:
    '- SpatialUI identities — let users maintain distinct, context-bound personas (work, family, hobby) natively',
  watchOutFor: '- Forced identity collapse — a single real-name identity across all contexts',
  europeanPerspective:
    'Minimal, user-controlled identity disclosure supports both GDPR compliance and genuine participation from vulnerable users.',
};

const errorResult = {
  status: 'error' as const,
  error: 'Request timed out after 30s — the provider may be rate-limiting.',
};

export function Collapsed() {
  const [expanded, setExpanded] = useState(false);
  return (
    <ConceptCard
      concept={identityConcept}
      result={doneReviewResult}
      isExpanded={expanded}
      onToggle={() => setExpanded((v) => !v)}
      mode="review"
    />
  );
}

export function ExpandedReviewDone() {
  const [expanded, setExpanded] = useState(true);
  return (
    <ConceptCard
      concept={identityConcept}
      result={doneReviewResult}
      isExpanded={expanded}
      onToggle={() => setExpanded((v) => !v)}
      mode="review"
    />
  );
}

export function ExpandedDesignDone() {
  const [expanded, setExpanded] = useState(true);
  return (
    <ConceptCard
      concept={identityConcept}
      result={doneDesignResult}
      isExpanded={expanded}
      onToggle={() => setExpanded((v) => !v)}
      mode="design"
    />
  );
}

export function Pending() {
  const [expanded, setExpanded] = useState(true);
  return (
    <ConceptCard
      concept={identityConcept}
      result={{ status: 'pending' }}
      isExpanded={expanded}
      onToggle={() => setExpanded((v) => !v)}
      mode="review"
    />
  );
}

export function Error() {
  const [expanded, setExpanded] = useState(true);
  return (
    <ConceptCard
      concept={identityConcept}
      result={errorResult}
      isExpanded={expanded}
      onToggle={() => setExpanded((v) => !v)}
      mode="review"
    />
  );
}
