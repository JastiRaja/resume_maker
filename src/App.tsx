import React, { useState } from 'react';
import ResumeBuilder from './components/ResumeBuilder';
import CoverLetterBuilder from './components/CoverLetterBuilder';
import LandingPage from './components/LandingPage';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'resume' | 'cover-letter'>('landing');

  const renderView = () => {
    switch (currentView) {
      case 'resume':
        return <ResumeBuilder onBack={() => setCurrentView('landing')} />;
      case 'cover-letter':
        return <CoverLetterBuilder onBack={() => setCurrentView('landing')} />;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {renderView()}
    </div>
  );
}

export default App;