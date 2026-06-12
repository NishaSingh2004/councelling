import React, { useState } from 'react';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ForgotPassword() {
  const { navigateTo, addNotification } = useApp();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    addNotification(`Password recovery link sent to: ${email}`, 'success');
    navigateTo('login');
  };

  return (
    <div className="min-h-[80vh] flex flex-col lg:flex-row bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-800/40 animate-fade-in max-w-5xl mx-auto my-6 text-slateText">
      
      {/* Left Column: Calm Split Banner */}
      <div className="lg:w-1/2 bg-gradient-to-br from-primary to-secondary p-12 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Background bubbles */}
        <div className="absolute top-0 right-0 w-84 h-84 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-84 h-84 rounded-full bg-black/10 blur-3xl" />

        <div className="space-y-4 relative">
          <div className="inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur border border-white/10 mb-4">
            <KeyRound className="h-6 w-6 text-white" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
            Restore Your<br />Wellness Workspace
          </h2>
          <p className="text-sm text-primary-100 font-light leading-relaxed">
            Don't worry, reset credentials inside our secure HIPAA gateway and retrieve access to your virtual consultations.
          </p>
        </div>

        <div className="pt-12 relative text-xs text-primary-200">
          © 2026 Vanshika Counselling Studio. HIPAA Compliant Telehealth Security.
        </div>
      </div>

      {/* Right Column: Recovery Form */}
      <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Recover Password</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-light leading-relaxed">
              Enter the email address registered to your client profile to receive recovery instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wide block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white font-light"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 mt-2 text-xs sm:text-sm"
            >
              Send Secure Recovery Link
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('login')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Login</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
