import React, { useState } from 'react';
import logoHorizontal from '../logo/logo_horizontal.png';

interface LoginProps {
  onLoginSuccess: (roleName: string) => void;
  onBackToLanding: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBackToLanding }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Pattern matches to mock logins
    if (email.includes('admin')) {
      onLoginSuccess('Super Admin');
    } else if (email.includes('cell')) {
      onLoginSuccess('Cell Admin');
    } else if (email.includes('leader')) {
      onLoginSuccess('Village Leader');
    } else {
      onLoginSuccess('Viewer');
    }
  };

  const handleQuickLogin = (role: string, mockEmail: string) => {
    setEmail(mockEmail);
    setPassword('••••••••••••');
    setError('');
    setTimeout(() => {
      onLoginSuccess(role);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-inter transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        
        {/* Go back helper */}
        <button
          onClick={onBackToLanding}
          className="absolute top-6 left-6 text-xs font-bold text-slate-400 hover:text-rrms-navy dark:hover:text-white transition-colors"
        >
          ← Back to Public Site
        </button>

        <div className="text-center pt-4">
          <img 
            src={logoHorizontal} 
            alt="R-RMS Horizontal Lockup" 
            className="h-16 mx-auto object-contain dark:brightness-105" 
          />
          <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white font-poppins">
            Administrative Portal
          </h2>
          <p className="mt-1.5 text-xs text-rrms-grey dark:text-slate-400 uppercase tracking-widest font-semibold">
            Authorized Personnel Only
          </p>
        </div>

        {/* Credentials Form */}
        <form className="mt-8 space-y-6" onSubmit={handleManualLogin}>
          {error && (
            <div className="p-3 bg-red-105/10 border border-red-500/20 text-rrms-red rounded-xl text-xs font-bold text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Official Email
              </label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@rrms.gov.rw"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rrms-navy transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Security Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rrms-navy transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-rrms-navy hover:bg-rrms-navy-dark text-white py-3.5 rounded-xl text-sm font-semibold tracking-wide shadow-lg active:scale-95 transition-all text-center"
          >
            Authenticate Credentials & Sign In
          </button>
        </form>

        {/* Quick Logins for Interactive Evaluation */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80">
          <p className="text-center text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-4">
            Quick System Operator Credentials (Demo Mode)
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: 'Super Admin', email: 'admin@rrms.gov.rw', label: 'Super' },
              { role: 'Cell Admin', email: 'cell@rrms.gov.rw', label: 'Cell' },
              { role: 'Village Leader', email: 'leader@rrms.gov.rw', label: 'Leader' }
            ].map(user => (
              <button
                key={user.role}
                onClick={() => handleQuickLogin(user.role, user.email)}
                className="py-2.5 px-2 bg-slate-100 hover:bg-rrms-navy hover:text-white dark:bg-slate-800 dark:hover:bg-rrms-navy/30 dark:hover:border-rrms-navy text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/50 rounded-xl text-xs font-bold transition-all truncate"
              >
                {user.label}
              </button>
            ))}
          </div>
        </div>

        {/* Compliance Footnote */}
        <div className="mt-4 text-center text-[10px] text-slate-450 dark:text-slate-500">
          Session logs are encrypted, timestamped, and audited in compliance with Law N° 058/2021 relating to Personal Data Protection.
        </div>
      </div>
    </div>
  );
};
