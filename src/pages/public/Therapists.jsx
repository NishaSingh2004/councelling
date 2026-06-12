import React, { useState } from 'react';
import { Star, Award, ShieldCheck, Filter, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Therapists() {
  const { therapists, navigateTo } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const specializations = [
    { label: 'All Specialities', id: 'all' },
    { label: 'Anxiety & Depression', id: 'anxiety' },
    { label: 'Relationships & Marriage', id: 'relationship' },
    { label: 'Family & Teens', id: 'family' }
  ];

  const filteredTherapists = therapists.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.specialization.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && t.specialization.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 animate-fade-in text-slateText">
      
      {/* Title */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Clinical Faculty</span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          Meet Our Licensed Therapists
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Our practitioners hold Ph.D. or clinical board licenses, specialized in cognitive therapies, marriage mediation, and adolescent stress management.
        </p>
      </section>

      {/* Filter and Search controls */}
      <section className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
        
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search therapist by name or focus topic..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/30 p-1 rounded-xl overflow-x-auto gap-0.5 max-w-full">
          {specializations.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filter === cat.id
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </section>

      {/* Cards list */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTherapists.map((th) => (
          <div key={th.id} className="premium-card p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-6 bg-white dark:bg-slate-900 group hover:border-primary/20">
            
            {/* Photo Column */}
            <div className="sm:col-span-5 space-y-4">
              <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative border border-slate-150/40 dark:border-slate-800">
                <img src={th.image} alt={th.name} className="w-full h-full object-cover object-top" />
                <div className="absolute top-2.5 right-2.5 bg-white/95 dark:bg-slate-905/95 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-amber-500 flex items-center gap-0.5 shadow-sm">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{th.rating}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Experience</span>
                  <span className="font-bold text-slate-700 dark:text-slate-350">{th.experience}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Status</span>
                  <span className="font-bold text-emerald-500 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Active
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Info Column */}
            <div className="sm:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">{th.title}</span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{th.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">{th.bio}</p>
                <div className="pt-2 flex gap-1.5 flex-wrap">
                  {th.specialization.split(' & ').map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 bg-primary-50 dark:bg-primary-950/20 text-primary dark:text-primary-350 text-[10px] font-bold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 flex justify-end">
                <button
                  onClick={() => navigateTo('login')}
                  className="btn-primary py-2 px-5 text-xs"
                >
                  Schedule Initial Session
                </button>
              </div>
            </div>

          </div>
        ))}
      </section>

    </div>
  );
}
