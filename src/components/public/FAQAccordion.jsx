import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '../../data/mockData';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-beige-200/60 dark:border-sage-800/40 rounded-xl overflow-hidden bg-white dark:bg-sage-900/60 transition-all duration-300"
          >
            {/* Header */}
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-5 text-left font-serif text-base font-semibold text-stone-900 dark:text-white hover:bg-beige-50/50 dark:hover:bg-sage-850/40 transition-colors"
            >
              <span>{faq.question}</span>
              <span className={`p-1 rounded-lg bg-beige-100 dark:bg-sage-800 text-stone-600 dark:text-sage-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown className="h-4.5 w-4.5" />
              </span>
            </button>

            {/* Content */}
            {isOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-beige-100 dark:border-sage-800/20 animate-fade-in">
                <p className="text-sm text-stone-600 dark:text-sage-300 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
