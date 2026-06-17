import React from 'react';
import { Award, Compass, BookOpen, Check, Shield, Users, Heart } from 'lucide-react';

export default function About() {
  const coreValues = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: 'Complete Confidentiality',
      desc: 'All sessions and client records are encrypted and protected under strict clinical privacy standards.'
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: 'Compassionate Care',
      desc: 'We offer a warm, non-judgmental space designed to support you through life transitions and emotional challenges.'
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: 'Evidence-Based Methods',
      desc: 'Our practitioners leverage proven therapeutic approaches, including cognitive behavioral therapy and mindfulness.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20 animate-fade-in text-slateText">
      
      {/* Introduction Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Visual Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-slate-100 dark:bg-slate-900/40 -rotate-2 -z-10" />
            <div className="overflow-hidden rounded-2xl shadow-md aspect-[4/5] bg-slate-100 border border-slate-200/40 dark:border-slate-800/50">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                alt="Vanshika Counselling Studio Director"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block">About Our Studio</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Vanshika Counselling Studio
            </h1>
            <p className="text-sm font-semibold text-primary">
              Empowering individuals on their mental wellness journey.
            </p>
          </div>

          <p className="text-sm text-slate-950 dark:text-beige-100 leading-relaxed font-bold">
            Vanshika Counselling Studio was established to provide professional, accessible, and confidential clinical therapy services. We focus on assisting individuals who are navigating stress, anxiety, emotional blockages, or relationship conflicts. Our goal is to cultivate mindfulness, self-compassion, and mental resilience.
          </p>

          {/* Philosophy Statement */}
          <div className="p-7 border-l-4 border-primary bg-primary-50/20 dark:bg-primary-950/10 rounded-r-2xl space-y-2">
            <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
              <Compass className="h-4 w-4" />
              <span>Counselling Philosophy</span>
            </h3>
            <p className="font-serif text-slate-955 dark:text-beige-100 text-sm sm:text-base leading-relaxed font-bold">
              "Therapy is a collaborative journey. Together, we identify your core goals, build practical and evidence-based coping skills, and work toward meaningful, positive life engagement."
            </p>
          </div>

          {/* Specializations & Focus Areas */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-primary" />
              <span>Core Clinical Focus Areas</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-xl text-xs font-bold text-slate-955 dark:text-beige-100 shadow-sm flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Anxiety & Stress Management</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-xl text-xs font-bold text-slate-955 dark:text-beige-100 shadow-sm flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Depression Support</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-xl text-xs font-bold text-slate-955 dark:text-beige-100 shadow-sm flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Relationship Counselling</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-xl text-xs font-bold text-slate-955 dark:text-beige-100 shadow-sm flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Cognitive Behavioral Therapy (CBT)</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Core Values Section */}
      <section className="space-y-12 pt-12 border-t border-slate-200/50 dark:border-slate-800/30">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Our Standards</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Our Foundation Values</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((value, idx) => (
            <div key={idx} className="premium-card p-8 space-y-4 bg-white dark:bg-slate-900 text-center">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-primary-50 dark:bg-primary-950/20 flex items-center justify-center">
                {value.icon}
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">{value.title}</h3>
              <p className="text-xs text-slate-955 dark:text-beige-200 font-bold leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
