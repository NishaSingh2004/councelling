import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import wellnessBg from '../../assets/wellness_background.png';

export default function HeroSection() {
  const { navigateTo } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/30 via-stone-50/10 to-transparent dark:from-[#0d1311]/40 dark:via-[#0c1110] pt-12 pb-24 md:py-28 transition-colors duration-300">
      
      {/* Calm abstract graphic background */}
      <div className="absolute inset-0 opacity-15 dark:opacity-5 mix-blend-multiply dark:mix-blend-overlay -z-10">
        <img src={wellnessBg} alt="Calm backdrop" className="w-full h-full object-cover" />
      </div>

      {/* Decorative gradient glowing spheres */}
      <div className="absolute top-1/6 left-1/12 w-80 h-80 rounded-full bg-sage-200/40 dark:bg-sage-900/10 blur-3xl -z-20 animate-pulse-subtle" />
      <div className="absolute top-1/4 right-1/12 w-96 h-96 rounded-full bg-softblue-200/30 dark:bg-softblue-950/10 blur-3xl -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sage-50 dark:bg-sage-900/40 text-sage-700 dark:text-sage-355 rounded-full text-xs font-semibold tracking-wide border border-sage-200/20 shadow-sm">
              <Award className="h-3.5 w-3.5 text-sage-600" />
              <span>100% Confidential HIPAA Compliant Clinical Sessions</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-white leading-[1.12] tracking-tight">
              Professional Online<br />
              <span className="text-sage-600 dark:text-sage-405 italic font-medium font-serif">Counselling & Therapy</span>
            </h1>
            
            <p className="text-base sm:text-lg text-stone-550 dark:text-sage-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Confidential, secure, and personalized support for your mental well-being. Partner with Dr. Evelyn Carter to build resilience and discover practical pathways to healing.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigateTo('client-book')}
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                <Calendar className="h-4.5 w-4.5" />
                <span>Book Appointment</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigateTo('about')}
                className="btn-secondary"
              >
                Learn More
              </button>
            </div>
            
            {/* Trust Metrics */}
            <div className="pt-8 border-t border-stone-200/50 dark:border-sage-900/40 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-sage-600 dark:text-sage-400">12+</span>
                <span className="text-[10px] text-stone-400 dark:text-sage-505 uppercase tracking-wider font-semibold">Years Experience</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-sage-600 dark:text-sage-400">100%</span>
                <span className="text-[10px] text-stone-400 dark:text-sage-505 uppercase tracking-wider font-semibold">Confidential</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-sage-600 dark:text-sage-400">5.0★</span>
                <span className="text-[10px] text-stone-400 dark:text-sage-505 uppercase tracking-wider font-semibold">Client Rating</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Modern offset geometric frames */}
              <div className="absolute -inset-4 rounded-3xl bg-stone-100 dark:bg-sage-900/20 -rotate-3 -z-10" />
              <div className="absolute -inset-2 rounded-3xl bg-sage-50 dark:bg-sage-900/40 rotate-2 -z-10" />
              
              <div className="overflow-hidden rounded-2xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_50px_-8px_rgba(0,0,0,0.6)] aspect-[4/5] relative bg-stone-100 border border-stone-200/40 dark:border-sage-800/40">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                  alt="Dr. Evelyn Carter"
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700"
                />
                
                {/* Floating clinical identity banner */}
                <div className="absolute bottom-6 left-6 right-6 p-5 glass-card border-white/20 text-stone-800 dark:text-stone-100">
                  <span className="text-[10px] font-bold text-sage-600 dark:text-sage-400 uppercase tracking-widest block">Lead Psychologist</span>
                  <span className="font-serif text-base font-bold text-stone-900 dark:text-white block mt-1">Dr. Evelyn Carter</span>
                  <span className="text-xs text-stone-500 dark:text-sage-400 block mt-1.5 font-light">Ph.D. Clinical Psychology, Stanford</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
