import React from 'react';
import { Calendar, Video, Ban, CalendarDays, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MyAppointments() {
  const { appointments, cancelAppointment, currentUser, navigateTo } = useApp();

  const clientEmail = currentUser?.email || '';
  const clientApts = appointments.filter((apt) => apt.clientEmail === clientEmail);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/45 dark:text-sky-400 uppercase tracking-wide">
            Confirmed
          </span>
        );
      case 'Completed':
        return (
          <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/45 dark:text-emerald-400 uppercase tracking-wide">
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/45 dark:text-rose-400 uppercase tracking-wide">
            Cancelled
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/45 dark:text-amber-400 uppercase tracking-wide">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            My Appointments
          </h1>
          <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
            Monitor and manage your scheduled sessions.
          </p>
        </div>
        <div>
          <button
            onClick={() => navigateTo('client-book')}
            className="btn-primary py-2.5 px-5 text-xs flex items-center gap-1.5"
          >
            <Calendar className="h-4.5 w-4.5" />
            <span>Book New Session</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="premium-card overflow-hidden">
        {clientApts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-beige-100 dark:bg-sage-900/60 border-b border-beige-100 dark:border-sage-800/30 text-[10px] font-bold uppercase text-slate-950 dark:text-sage-500 tracking-wider">
                  <th className="py-4 px-6">Appointment ID</th>
                  <th className="py-4 px-6">Service</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Time</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-100 dark:divide-sage-900/40 text-xs text-stone-700 dark:text-sage-350">
                {clientApts.map((apt) => (
                  <tr key={apt.id} className="hover:bg-beige-50/20 dark:hover:bg-sage-900/10 transition-colors">
                    <td className="py-4.5 px-6 font-semibold font-mono text-slate-950 dark:text-stone-300 font-bold">
                      {apt.id}
                    </td>
                    <td className="py-4.5 px-6 font-serif font-bold text-slate-950 dark:text-white">
                      {apt.service}
                    </td>
                    <td className="py-4.5 px-6 font-bold">
                      {apt.date}
                    </td>
                    <td className="py-4.5 px-6 font-bold">
                      {apt.time}
                    </td>
                    <td className="py-4.5 px-6">
                      {getStatusBadge(apt.status)}
                    </td>
                    <td className="py-4.5 px-6 text-right flex items-center justify-end gap-2.5">
                      {/* Join Meeting trigger */}
                      {apt.status === 'Confirmed' && (
                        apt.meetLink ? (
                          <a
                            href={apt.meetLink}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
                          >
                            <Video className="h-3.5 w-3.5" />
                            <span>Join Session</span>
                          </a>
                        ) : (
                          <button
                            disabled
                            className="px-3.5 py-2 bg-slate-100 dark:bg-sage-800 text-slate-400 dark:text-sage-500 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-not-allowed"
                            title="Waiting for Admin to generate the Meet link"
                          >
                            <Video className="h-3.5 w-3.5" />
                            <span>Link Pending</span>
                          </button>
                        )
                      )}

                      {/* Reschedule option */}
                      {(apt.status === 'Confirmed' || apt.status === 'Pending') && (
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="p-2 text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors"
                          title="Cancel Session"
                        >
                          <Ban className="h-4.5 w-4.5" />
                        </button>
                      )}

                      {apt.status === 'Completed' && (
                        <button
                          onClick={() => navigateTo('client-history')}
                          className="px-3.5 py-2 border border-beige-200 dark:border-sage-800 text-stone-600 dark:text-sage-350 hover:bg-beige-50 dark:hover:bg-sage-850 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>View Summary</span>
                        </button>
                      )}

                      {apt.status === 'Cancelled' && (
                        <span className="text-[11px] text-slate-955 dark:text-beige-300 font-bold px-2">No actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <CalendarDays className="h-12 w-12 text-stone-300 dark:text-sage-850 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">No Appointments Found</h3>
              <p className="text-xs text-slate-950 dark:text-beige-300 font-bold max-w-xs mx-auto leading-relaxed">
                You haven't scheduled any appointments yet. Click the button to start.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
