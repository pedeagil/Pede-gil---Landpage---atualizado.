import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

export default function App() {
  // Simple state-based routing for the demo
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');

  const navigateToApp = () => {
    setCurrentView('app');
    window.scrollTo(0, 0);
  };

  const navigateToLanding = () => {
    setCurrentView('landing');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen w-full">
      {currentView === 'landing' ? (
        <LandingPage onLogin={navigateToApp} />
      ) : (
        <Dashboard onLogout={navigateToLanding} />
      )}
    </div>
  );
}