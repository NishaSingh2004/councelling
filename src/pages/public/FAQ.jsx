import React from 'react';
import { HelpCircle } from 'lucide-react';
import FAQAccordion from '../../components/public/FAQAccordion';

export default function FAQ() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 animate-fade-in text-slateText">
      
      {/* Title */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block flex items-center justify-center gap-1.5">
          <HelpCircle className="h-4.5 w-4.5" /> Support Center
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
          Quickly audit answers regarding telehealth connection details, patient billing practices, cancellation timelines, and licensing protocols.
        </p>
      </section>

      {/* Accordion Component */}
      <section className="pt-6">
        <FAQAccordion />
      </section>

    </div>
  );
}
