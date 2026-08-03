import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

function App() {
  // Navigation states: 'landing' | 'login' | 'dashboard'
  const [view, setView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [userRole, setUserRole] = useState('Super Admin');

  const handleLoginSuccess = (role: string) => {
    setUserRole(role);
    setView('dashboard');
  };

  const handleLogout = () => {
    setView('landing');
  };

  return (
    <ThemeProvider>
      {view === 'landing' && (
        <LandingPage onGoToLogin={() => setView('login')} />
      )}
      {view === 'login' && (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          onBackToLanding={() => setView('landing')} 
        />
      )}
      {view === 'dashboard' && (
        <Dashboard 
          initialRole={userRole} 
          onLogout={handleLogout} 
        />
      )}
    </ThemeProvider>
  );
}

export default App;
