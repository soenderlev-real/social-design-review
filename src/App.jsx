import { useState } from 'react';
import LandingView from './components/LandingView';
import ReviewDashboard from './components/ReviewDashboard';
import Header from './components/Header';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'review'
  const [config, setConfig] = useState({
    mode: 'review',
    providerId: '',
    apiKey: '',
    platformUrl: '',
    platformDescription: '',
    ollamaConfig: undefined,
    processedFiles: [],
  });

  function handleStartReview(cfg) {
    setConfig(cfg);
    setView('review');
  }

  function handleBackToLanding() {
    setView('landing');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogoClick={handleBackToLanding} showBack={view === 'review'} />
      <main className="flex-1">
        {view === 'landing' && <LandingView onStart={handleStartReview} />}
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
