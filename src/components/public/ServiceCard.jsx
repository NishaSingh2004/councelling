import React from 'react';
import * as Icons from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ServiceCard({ service }) {
  const { navigateTo, addNotification } = useApp();
  
  // Dynamically resolve icon component
  const IconComponent = Icons[service.icon] || Icons.Activity;

  const handleBookNow = () => {
    navigateTo('login');
    addNotification(`Selected ${service.title}. Log in to complete booking.`, 'info');
  };

  return (
    <div className="premium-card p-8 flex flex-col justify-between h-full group hover:border-primary/30">
      <div className="space-y-5">
        {/* Icon wrapper */}
        <div className="inline-flex p-3 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary dark:text-primary-300 group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <IconComponent className="h-6 w-6" />
        </div>

        <div className="space-y-2.5">
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-950 dark:text-beige-100 leading-relaxed font-bold">
            {service.description}
          </p>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Duration & Price</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{service.duration}</span>
            <span className="text-slate-300">•</span>
            <span className="text-sm font-bold text-primary">{service.price}</span>
          </div>
        </div>

        <button
          onClick={handleBookNow}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white dark:hover:bg-primary rounded-lg text-xs font-semibold tracking-wide transition-all"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
