import React, { useState } from 'react';
import { Mail, Lock, LogIn, Shield, User, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Login({ isAdminMode = false }) {
  const { login, navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, isAdminMode ? 'admin' : 'client');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-6 sm:py-12 px-4">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-[0_15px_50px_-15px_rgba(46,91,255,0.08)] dark:shadow-[0_15px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-200/50 dark:border-slate-800/40 grid grid-cols-1 md:grid-cols-12 min-h-[600px] animate-fade-in">
        
        {/* Left Side: Branding / Quote Info (Visible on Desktop md+) */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-primary-900 via-slate-900 to-sage-950 p-10 flex-col justify-between text-white relative overflow-hidden">
          {/* Animated Glow Orbs */}
          <div className="absolute -top-12 -left-12 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl animate-pulse-subtle" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl animate-pulse-subtle" />
          
          {/* Branding Top */}
          <div className="flex items-center gap-2.5 z-10">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-accent">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <span className="font-serif text-lg font-bold tracking-tight">
              Vanshika<span className="text-accent font-sans font-light text-xs block uppercase mt-0.5 tracking-wider">Counselling Studio</span>
            </span>
          </div>

          {/* Inspirational Mid Quote */}
          <div className="space-y-4 my-auto z-10 relative">
            <span className="text-[10px] tracking-widest uppercase font-bold text-accent/80 block">Private & Secure</span>
            <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed font-light italic">
              "Your mental well-being is a priority. Your healing is a journey, not a destination."
            </blockquote>
            <cite className="text-xs font-semibold text-slate-400 not-italic block mt-1">— Clinical Wellness Team</cite>
          </div>

          {/* Trust Items Bottom */}
          <div className="space-y-3 pt-6 border-t border-white/10 z-10 text-xs font-light text-slate-350">
            <div className="flex items-center gap-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span>100% Confidential HIPAA Encrypted</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span>Certified Top-Tier Clinicians Only</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:col-span-7 p-6 sm:p-12 flex flex-col justify-center space-y-8">
          
          {/* Role Indicator Banner */}
          {isAdminMode ? (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
              <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-400">Admin Credentials Only</p>
                <p className="text-[10px] text-amber-700 dark:text-amber-500 font-bold">This portal is exclusively for Clinical Administrators. Clients cannot access this area.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
              <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400">Client Wellness Portal</p>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-500 font-bold">Login with your registered client account. Admin accounts are not allowed here.</p>
              </div>
            </div>
          )}

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
              {isAdminMode ? 'Clinical Control Access' : 'Welcome Back'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light">
              {isAdminMode 
                ? 'Sign in with clinical therapist credentials to enter control portal.' 
                : 'Sign in to access your secure wellness workspace.'}
            </p>
          </div>

          {/* Form — autoComplete="off" prevents browser from cross-filling admin/client credentials */}
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  name={isAdminMode ? 'admin-email' : 'client-email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  autoComplete="off"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-slate-850 dark:text-white transition-all font-light"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  name={isAdminMode ? 'admin-password' : 'client-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-slate-850 dark:text-white transition-all font-light"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="rounded border-slate-300 dark:border-slate-800 text-primary focus:ring-primary h-4 w-4 transition-colors cursor-pointer"
                />
                <span>Remember Me</span>
              </label>
              <button
                type="button"
                onClick={() => navigateTo('forgot-password')}
                className="hover:underline hover:text-primary transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
            >
              <LogIn className="h-4 w-4" />
              <span>Login securely</span>
            </button>

          </form>



          {/* Footer Register Redirection */}
          {!isAdminMode && (
            <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-light pt-2">
              New to Vanshika Counselling Studio?{' '}
              <button
                onClick={() => navigateTo('register')}
                className="font-semibold text-primary hover:underline transition-colors"
              >
                Create confidential account
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
