import { ScoreRadar } from 'social-design-review';

const concepts = [
  { id: 'social-object', title: 'Social Object' },
  { id: 'platform-intent', title: 'Platform Intent & Experience Intent' },
  { id: 'identity', title: 'Identity' },
  { id: 'conversations', title: 'Conversations' },
  { id: 'sharing', title: 'Sharing' },
  { id: 'presence', title: 'Presence' },
  { id: 'relationships', title: 'Relationships' },
  { id: 'reputation', title: 'Reputation' },
  { id: 'groups', title: 'Groups' },
  { id: 'agency', title: 'Agency' },
  { id: 'enable-dimension', title: 'Enable: Foundational Health' },
  { id: 'grow-dimension', title: 'Grow: Sustainable Development' },
  { id: 'protect-dimension', title: 'Protect: Immune System Health' },
];

const mixedScores = {
  'social-object': 4,
  'platform-intent': 2,
  identity: 4,
  conversations: 3,
  sharing: 2,
  presence: 3,
  relationships: 4,
  reputation: 3,
  groups: 4,
  agency: 2,
  'enable-dimension': 3,
  'grow-dimension': 2,
  'protect-dimension': 3,
};

const strongScores = Object.fromEntries(concepts.map((c) => [c.id, 5]));
const weakScores = Object.fromEntries(concepts.map((c) => [c.id, 1]));

export function MixedResults() {
  return <ScoreRadar concepts={concepts} scores={mixedScores} />;
}

export function StrongPlatform() {
  return <ScoreRadar concepts={concepts} scores={strongScores} />;
}

export function WeakPlatform() {
  return <ScoreRadar concepts={concepts} scores={weakScores} />;
}
