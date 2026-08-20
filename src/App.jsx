import { useState, useEffect } from 'react';
import LandingView from './components/LandingView';
import ReviewDashboard from './components/ReviewDashboard';
import InstructionsView from './components/InstructionsView';
import Header from './components/Header';

function viewFromHash() {
  return window.location.hash === '#instructions' ? 'instructions' : 'landing';
}

export default function App() {
  const [view, setView] = useState(viewFromHash); // 'landing' | 'review' | 'instructions'
  const [config, setConfig] = useState({
    mode: 'review',
    providerId: '',
    apiKey: '',
    platformUrl: '',
    platformDescription: '',
    ollamaConfig: undefined,
    processedFiles: [],
  });

  useEffect(() => {
    function onHashChange() {
      setView(v => (v === 'review' ? v : viewFromHash()));
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function handleStartReview(cfg) {
    setConfig(cfg);
    setView('review');
  }

  function handleBackToLanding() {
    setView('landing');
    if (window.location.hash) window.history.pushState('', document.title, window.location.pathname + window.location.search);
  }

  function handleShowInstructions() {
    setView('instructions');
    window.location.hash = 'instructions';
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogoClick={handleBackToLanding} onInstructionsClick={handleShowInstructions} showBack={view !== 'landing'} />
      <main className="flex-1">
        {view === 'landing' && <LandingView onStart={handleStartReview} />}
        {view === 'instructions' && <InstructionsView />}
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
