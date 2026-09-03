import { useState, useEffect } from 'react';
import LandingView from './components/LandingView';
import ReviewDashboard from './components/ReviewDashboard';
import GuidedWalkthrough from './components/GuidedWalkthrough';
import InstructionsView from './components/InstructionsView';
import ReadingListView from './components/ReadingListView';
import Header from './components/Header';

function viewFromHash() {
  if (window.location.hash === '#instructions') return 'instructions';
  if (window.location.hash === '#reading-list') return 'reading-list';
  return 'landing';
}

export default function App() {
  const [view, setView] = useState(viewFromHash); // 'landing' | 'review' | 'instructions' | 'reading-list'
  const [config, setConfig] = useState({
    mode: 'review',
    providerId: '',
    apiKey: '',
    platformUrl: '',
    platformDescription: '',
    ollamaConfig: undefined,
    processedFiles: [],
    startConceptId: null,
  });

  useEffect(() => {
    function onHashChange() {
      setView(v => (v === 'review' || v === 'guide' ? v : viewFromHash()));
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function handleStartReview(cfg) {
    setConfig(cfg);
    setView(cfg.mode === 'guide' ? 'guide' : 'review');
  }

  function handleBackToLanding() {
    setView('landing');
    if (window.location.hash) window.history.pushState('', document.title, window.location.pathname + window.location.search);
  }

  function handleShowInstructions() {
    setView('instructions');
    window.location.hash = 'instructions';
  }

  function handleShowReadingList() {
    setView('reading-list');
    window.location.hash = 'reading-list';
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onLogoClick={handleBackToLanding}
        onInstructionsClick={handleShowInstructions}
        onReadingListClick={handleShowReadingList}
        showBack={view !== 'landing'}
      />
      <main className="flex-1">
        {view === 'landing' && <LandingView onStart={handleStartReview} onReadingList={handleShowReadingList} />}
        {view === 'instructions' && <InstructionsView />}
        {view === 'reading-list' && <ReadingListView />}
        {view === 'guide' && (
          <GuidedWalkthrough
            providerId={config.providerId}
            apiKey={config.apiKey}
            platformDescription={config.platformDescription}
            ollamaConfig={config.ollamaConfig}
            startConceptId={config.startConceptId}
            onBack={handleBackToLanding}
          />
        )}
        {view === 'review' && (
          <ReviewDashboard
            mode={config.mode}
            providerId={config.providerId}
            apiKey={config.apiKey}
            platformUrl={config.platformUrl}
            platformDescription={config.platformDescription}
            ollamaConfig={config.ollamaConfig}
            processedFiles={config.processedFiles}
            onBack={handleBackToLanding}
          />
        )}
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        Social Design Framework &middot; Rebuild.net Sprint 2025&ndash;2026 &middot; Designing for empowerment
      </footer>
    </div>
  );
}
