import React from 'react';
import { Award, GraduationCap, Compass, Briefcase, BookOpen, Check } from 'lucide-react';
import { counsellorProfile } from '../../data/mockData';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20 animate-fade-in text-slateText">
      
      {/* Bio Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Photo Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-slate-100 dark:bg-slate-900/40 -rotate-2 -z-10" />
            <div className="overflow-hidden rounded-2xl shadow-md aspect-[4/5] bg-slate-100 border border-slate-200/40 dark:border-slate-800/50">
              <img
                src={counsellorProfile.image}
                alt={counsellorProfile.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Certifications Card */}
          <div className="premium-card p-6 space-y-4 bg-white dark:bg-slate-900">
            <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-primary" />
              <span>Certifications & Registries</span>
            </h4>
            <ul className="space-y-3">
              {counsellorProfile.certifications.map((cert, index) => (
                <li key={index} className="flex gap-2.5 items-start text-xs text-slate-955 dark:text-beige-100 font-bold leading-relaxed">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block">Therapist Profile</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              {counsellorProfile.name}
            </h1>
            <p className="text-sm font-semibold text-primary">
              {counsellorProfile.title} • {counsellorProfile.credentials}
            </p>
          </div>

          <p className="text-sm text-slate-950 dark:text-beige-100 leading-relaxed font-bold">
            {counsellorProfile.bio}
          </p>

          {/* Philosophy Statement */}
          <div className="p-7 border-l-4 border-primary bg-primary-50/20 dark:bg-primary-950/10 rounded-r-2xl space-y-2">
            <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
              <Compass className="h-4 w-4" />
              <span>Counselling Philosophy</span>
            </h3>
            <p className="font-serif text-slate-955 dark:text-beige-100 text-sm sm:text-base leading-relaxed font-bold">
              "{counsellorProfile.philosophy}"
            </p>
          </div>

          {/* Clinical Focus List */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-primary" />
              <span>Specializations & Focus Areas</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {counsellorProfile.specializations.map((spec, index) => (
                <div key={index} className="p-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-xl text-xs font-bold text-slate-955 dark:text-beige-100 shadow-sm flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Qualifications & Timeline Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-slate-200/50 dark:border-slate-800/30">
        
        {/* Education Timeline (Col-5) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="h-5.5 w-5.5 text-primary" />
            <span>Academic Background</span>
          </h3>
          <div className="space-y-4">
            {counsellorProfile.qualifications.map((qual, index) => (
              <div key={index} className="premium-card p-5 space-y-1 bg-white dark:bg-slate-900">
                <span className="text-xs font-bold text-primary">{qual.year}</span>
                <h4 className="font-serif text-sm font-bold text-slate-950 dark:text-white">{qual.degree}</h4>
                <p className="text-xs text-slate-955 dark:text-beige-200 font-bold">{qual.institution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline (Col-7) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="h-5.5 w-5.5 text-primary" />
            <span>Professional Timeline</span>
          </h3>
          
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 pl-6 space-y-8">
            {counsellorProfile.timeline.map((item, index) => (
              <div key={index} className="relative space-y-1">
                {/* Connector Dot */}
                <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-white dark:bg-slate-950" />
                
                <span className="text-xs font-bold text-primary block">{item.year}</span>
                <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white">{item.role}</h4>
                <p className="text-xs text-slate-955 dark:text-beige-200 font-bold">{item.company}</p>
                <p className="text-xs text-slate-955 dark:text-beige-300 font-bold leading-relaxed pt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}
