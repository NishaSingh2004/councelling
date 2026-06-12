import React, { useState } from 'react';
import { ShieldCheck, Filter } from 'lucide-react';
import { services } from '../../data/mockData';
import ServiceCard from '../../components/public/ServiceCard';

export default function Services() {
  const [filter, setFilter] = useState('all');

  const categories = [
    { label: 'All Treatments', id: 'all' },
    { label: 'Counselling & Support', id: 'counselling' },
    { label: 'Specialized Therapy', id: 'therapy' },
  ];

  const filteredServices = services.filter((service) => {
    if (filter === 'all') return true;
    if (filter === 'counselling') {
      return service.title.toLowerCase().includes('counselling') || service.title.toLowerCase().includes('guidance') || service.title.toLowerCase().includes('management');
    }
    if (filter === 'therapy') {
      return service.title.toLowerCase().includes('therapy') || service.title.toLowerCase().includes('family') || service.title.toLowerCase().includes('relationship');
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 animate-fade-in text-slateText">
      
      {/* Page Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Clinical Catalog</span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          Our Specializations & Treatments
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Select from our board-certified outpatient treatments. Every session is confidential and hosted inside our secure, HIPAA-encrypted virtual offices.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-semibold mr-2">
          <Filter className="h-4 w-4" />
          <span>Category Filter:</span>
        </div>
        <div className="flex bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 p-1.5 rounded-xl shadow-inner gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filter === cat.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </section>

      {/* Trust Security Banner */}
      <section className="premium-card p-8 md:p-12 bg-gradient-to-br from-primary-50/10 to-white dark:from-slate-900/10 dark:to-slate-900/40 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="space-y-2 md:col-span-2">
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span>Highest Level of Patient Record Protection</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            All consultations are conducted in a HIPAA-compliant virtual office. Session metadata, communications, notes, and records are fully encrypted and stored securely.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <div className="px-3.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl text-[10px] font-bold text-primary dark:text-primary-350 shadow-sm uppercase tracking-wider">
            100% Confidential
          </div>
          <div className="px-3.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl text-[10px] font-bold text-primary dark:text-primary-350 shadow-sm uppercase tracking-wider">
            HIPAA Audited
          </div>
        </div>
      </section>

    </div>
  );
}
