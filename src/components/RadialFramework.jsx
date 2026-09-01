import { CONCEPTS } from '../data/framework';
import ConceptCard from './ConceptCard';

export default function RadialFramework({ results, expandedIds, onToggle, mode = 'review' }) {
  const socialObj      = CONCEPTS.find(c => c.id === 'social-object');
  const coreConcepts   = CONCEPTS.filter(c =>
    c.dimension === null &&
    !['social-object', 'enable-dimension', 'grow-dimension', 'protect-dimension'].includes(c.id)
  );
  const metaDimensions = CONCEPTS.filter(c =>
    ['enable-dimension', 'grow-dimension', 'protect-dimension'].includes(c.id)
  );

  return (
    <div>
      {/* 1. Social Object */}
      <Section number="1" title="Social Object" subtitle="The shared thing that brings people together" accent="bg-dark">
        {socialObj && (
          <ConceptCard
            concept={socialObj}
            result={results[socialObj.id]}
            isExpanded={expandedIds.has(socialObj.id)}
            onToggle={() => onToggle(socialObj.id)}
            mode={mode}
          />
        )}
      </Section>

      {/* 2. Core Concepts — stacked full-width */}
      <Section number="2" title="Core Concepts" subtitle="The individual design dimensions of the platform" accent="bg-rb-orange">
        <div className="space-y-0">
          {coreConcepts.map((concept, i) => (
            <div key={concept.id} className={i > 0 ? 'border-t-0' : ''}>
              <ConceptCard
                concept={concept}
                result={results[concept.id]}
                isExpanded={expandedIds.has(concept.id)}
                onToggle={() => onToggle(concept.id)}
                mode={mode}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Enable / Grow / Protect — stacked full-width */}
      <Section number="3" title="Enable, Grow & Protect" subtitle="Holistic assessment across the three foundational dimensions" accent="bg-rb-green" last>
        <div className="space-y-0">
          {metaDimensions.map((concept, i) => (
            <div key={concept.id} className={i > 0 ? 'border-t-0' : ''}>
              <ConceptCard
                concept={concept}
                result={results[concept.id]}
                isExpanded={expandedIds.has(concept.id)}
                onToggle={() => onToggle(concept.id)}
                mode={mode}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ number, title, subtitle, accent, children, last }) {
  return (
    <div className={`mt-12 ${last ? '' : 'mb-0'}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex-shrink-0 w-8 h-8 ${accent} text-white flex items-center justify-center font-bold text-sm border-2 border-dark`}>
          {number}
        </div>
        <div>
          <h3 className="text-lg font-bold text-dark">{title}</h3>
          <p className="text-xs text-muted mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
