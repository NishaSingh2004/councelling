import React from 'react';
import { History, Download, CalendarCheck, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SessionHistory() {
  const { appointments, currentUser } = useApp();

  const clientEmail = currentUser?.email || '';
  const completedApts = appointments.filter(
    (apt) => apt.clientEmail === clientEmail && apt.status === 'Completed'
  );

  const handleDownload = (apt) => {
    alert(`Downloading clinical summary PDF for session ${apt.id}...\nService: ${apt.service}\nDate: ${apt.date}\nCounsellor: Vanshika Singh`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Session History
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Review your completed clinical sessions and treatment summaries.
        </p>
      </div>

      {/* Grid List */}
      <div className="space-y-6">
        {completedApts.length > 0 ? (
          completedApts.map((apt) => (
            <div key={apt.id} className="premium-card p-6 md:p-8 space-y-6">
              
              {/* Header block */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-beige-100 dark:border-sage-800/40 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-550/10 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 uppercase tracking-wide">
                      Completed
                    </span>
                    <span className="text-xs font-bold text-slate-950 dark:text-beige-300 font-mono">#{apt.id}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-950 dark:text-white mt-1">
                    {apt.service}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-slate-950 dark:text-beige-300 font-bold block">Session Date</span>
                    <span className="text-xs font-bold text-slate-950 dark:text-beige-100">{apt.date} • {apt.time}</span>
                  </div>
                  <button
                    onClick={() => handleDownload(apt)}
                    className="px-4 py-2 border border-beige-200 dark:border-sage-800 text-stone-600 dark:text-sage-300 hover:bg-beige-50 dark:hover:bg-sage-850 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Summary</span>
                  </button>
                </div>
              </div>

              {/* Counsellor Notes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-sage-600" />
                  <span>Therapist Clinical Notes & Action Steps</span>
                </h4>
                <div className="p-5 bg-beige-50/50 dark:bg-sage-900/40 border border-beige-100/30 dark:border-sage-850/30 rounded-xl">
                  {apt.notes ? (
                    <p className="text-xs sm:text-sm text-slate-950 dark:text-beige-100 font-bold leading-relaxed">
                      "{apt.notes}"
                    </p>
                  ) : (
                    <p className="text-xs text-slate-955 dark:text-beige-300 font-bold">
                      Clinical intake report is being synthesized by Vanshika Singh and will be uploaded shortly.
                    </p>
                  )}
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="premium-card p-10 text-center space-y-4">
            <History className="h-10 w-10 text-stone-300 dark:text-sage-850 mx-auto" />
            <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
              You do not have any completed therapy sessions yet.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
