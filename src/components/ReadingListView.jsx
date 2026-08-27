import { ExternalLink, BookOpen } from 'lucide-react';
import { BIBLIOGRAPHY, BIBLIOGRAPHY_NOTE } from '../data/bibliography';

function EntryLinks({ links }) {
  if (!links || !links.length) return null;
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
      {links.map((l) => (
        <a
          key={l.url}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs flex items-center gap-1 underline underline-offset-2 text-darker hover:text-dark"
        >
          {l.label} <ExternalLink size={10} />
        </a>
      ))}
    </div>
  );
}

function Entry({ entry }) {
  return (
    <div className="border-2 border-dark -mt-[2px] first:mt-0 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline gap-x-2">
        {entry.authors && <span className="text-dark text-sm">{entry.authors}</span>}
        {entry.year && <span className="text-darker text-sm">({entry.year})</span>}
      </div>
      <div className="text-sm text-darker italic leading-snug mt-1">{entry.work}</div>
      {entry.source && <div className="text-xs text-darker mt-1">{entry.source}</div>}
      {entry.note && <p className="text-xs text-darker leading-relaxed mt-2">{entry.note}</p>}
      <EntryLinks links={entry.links} />
    </div>
  );
}

function Section({ section }) {
  return (
    <div className="mt-12" id={section.id}>
      <div className="flex items-start gap-4 mb-4">
        {section.number && (
          <div className="flex-shrink-0 w-8 h-8 bg-dark text-white flex items-center justify-center text-sm border-2 border-dark">
            {section.number}
          </div>
        )}
        <div>
          <h3 className="text-lg text-dark">{section.title}</h3>
          <p className="text-xs text-darker mt-0.5">{section.subtitle}</p>
          {section.seeAlsoIntro && (
            <p className="text-xs text-darker italic mt-1">{section.seeAlsoIntro}</p>
          )}
        </div>
      </div>

      {section.prose ? (
        <div className="border-2 border-dark bg-white p-4 sm:p-5 space-y-3">
          {section.prose.map((p) => (
            <p key={p.label} className="text-sm text-darker leading-relaxed">
              <span className="text-dark">{p.label}</span> — {p.text}
            </p>
          ))}
        </div>
      ) : (
        <div className="space-y-0">
          {section.entries.map((entry, i) => (
            <Entry key={i} entry={entry} />
          ))}
        </div>
      )}

      {section.seeAlso && (
        <p className="text-xs text-darker italic mt-2">See also: {section.seeAlso}</p>
      )}
    </div>
  );
}

export default function ReadingListView() {
  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <section className="bg-white border-b-2 border-dark">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-xs text-darker mb-4 uppercase tracking-widest flex items-center gap-2">
            <BookOpen size={14} /> Theory &amp; literature
          </p>
          <h1 className="text-4xl md:text-5xl text-dark mb-6 leading-tight">
            Reading List for<br />Social Design Platforms
          </h1>
          <p className="text-base text-darker max-w-xl leading-relaxed">
            A reference companion to the Social Design Framework, organised by its core elements. Each entry notes why it's the right lens for that element, with links chosen to resolve rather than paywall — DOIs where a stable one exists, otherwise a publisher, author, or overview page.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          {BIBLIOGRAPHY.map((section) => (
            <Section key={section.id} section={section} />
          ))}

          <p className="text-xs text-darker leading-relaxed mt-16 pt-8 border-t-2 border-dark">
            {BIBLIOGRAPHY_NOTE}
          </p>
        </div>
      </section>
    </div>
  );
}
