import React, { useState } from 'react';
import { User, Mail, Phone, Lock, UserPlus, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Register() {
  const { register, navigateTo, addNotification } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addNotification('Passwords do not match.', 'warning');
      return;
    }
    register(formData.name, formData.email, formData.phone, formData.password);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-6 sm:py-12 px-4">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-[0_15px_50px_-15px_rgba(46,91,255,0.08)] dark:shadow-[0_15px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-200/50 dark:border-slate-800/40 grid grid-cols-1 md:grid-cols-12 min-h-[600px] animate-fade-in">
        
        {/* Left Side: Branding / Info (Visible on Desktop md+) */}
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

          {/* Inspirational Mid Message */}
          <div className="space-y-4 my-auto z-10 relative">
            <span className="text-[10px] tracking-widest uppercase font-bold text-accent/80 block">Start Your Journey</span>
            <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed font-light italic">
              "Taking the first step toward mental wellness is an act of courage. We are here to walk with you."
            </blockquote>
            <cite className="text-xs font-semibold text-slate-400 not-italic block mt-1">— Clinical Wellness Team</cite>
          </div>

          {/* Trust Items Bottom */}
          <div className="space-y-3 pt-6 border-t border-white/10 z-10 text-xs font-light text-slate-350">
            <div className="flex items-center gap-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span>Personalized Therapy Pathways</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span>Cancel or reschedule anytime online</span>
            </div>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="md:col-span-7 p-6 sm:p-12 flex flex-col justify-center space-y-6">
          
          {/* Heading */}
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
              Create Account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light">
              Begin your confidential therapy plan today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-slate-850 dark:text-white transition-all font-light"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-slate-850 dark:text-white transition-all font-light"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Phone Number
              </label>
              <div className="relative group">
                <Phone className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 019-2834"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-slate-850 dark:text-white transition-all font-light"
                />
              </div>
            </div>

            {/* Passwords Flex Row on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-slate-850 dark:text-white transition-all font-light"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-slate-850 dark:text-white transition-all font-light"
                  />
                </div>
              </div>

            </div>

            {/* Legal Notice */}
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed font-light">
              By creating an account, you agree to our{' '}
              <button type="button" onClick={() => navigateTo('terms')} className="underline text-primary">Terms of Service</button> and{' '}
              <button type="button" onClick={() => navigateTo('consent')} className="underline text-primary">Informed Consent Notice</button> under standard clinical privacy rules.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              <UserPlus className="h-4.5 w-4.5" />
              <span>Create secure account</span>
            </button>

          </form>

          {/* Footer Login Redirection */}
          <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-light pt-2">
            Already have an account?{' '}
            <button
              onClick={() => navigateTo('login')}
              className="font-semibold text-primary hover:underline transition-colors"
            >
              Log in instead
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
