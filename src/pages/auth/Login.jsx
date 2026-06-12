import React, { useState } from 'react';
import { Mail, Lock, LogIn, Shield, User, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Login() {
  const { login, navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, 'client');
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
          
          {/* Heading */}
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light">
              Sign in to access your secure wellness workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
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

          {/* Sandbox Demo Accounts Panel */}
          <div className="space-y-3.5">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 dark:border-slate-850 w-full" />
              <span className="absolute bg-white dark:bg-slate-900 px-3 text-[10px] text-slate-450 dark:text-slate-400 uppercase tracking-widest font-bold">
                Sandbox Demo Portal
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Patient Demo */}
              <button
                onClick={() => login('jane.doe@example.com', 'clientpass', 'client')}
                className="flex items-start text-left gap-3.5 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-850 hover:border-primary/50 hover:bg-primary-50/5 dark:hover:bg-primary-950/10 transition-all group hover:-translate-y-0.5 shadow-sm"
              >
                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary mt-0.5 group-hover:scale-105 transition-transform">
                  <User className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-slate-850 dark:text-slate-100 group-hover:text-primary transition-colors">
                    Patient Workspace
                  </span>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-light mt-0.5">
                    Log in as patient (Jane Doe)
                  </span>
                </div>
              </button>

              {/* Admin Demo */}
              <button
                onClick={() => login('vanshika@vanshikacounselling.com', 'adminpass', 'admin')}
                className="flex items-start text-left gap-3.5 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-850 hover:border-sage-500/50 hover:bg-sage-500/5 dark:hover:bg-sage-950/10 transition-all group hover:-translate-y-0.5 shadow-sm"
              >
                <div className="p-2.5 rounded-xl bg-sage-50 dark:bg-sage-950/40 text-sage-600 mt-0.5 group-hover:scale-105 transition-transform">
                  <Shield className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-slate-850 dark:text-slate-100 group-hover:text-sage-600 transition-colors">
                    Clinical Control
                  </span>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-light mt-0.5">
                    Log in as clinical therapist
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Footer Register Redirection */}
          <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-light pt-2">
            New to Vanshika Counselling Studio?{' '}
            <button
              onClick={() => navigateTo('register')}
              className="font-semibold text-primary hover:underline transition-colors"
            >
              Create confidential account
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
