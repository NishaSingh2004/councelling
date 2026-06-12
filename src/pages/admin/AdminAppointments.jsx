import React from 'react';
import { CalendarCheck, Check, X, Ban, FileSearch, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminAppointments() {
  const { appointments, approveAppointment, rejectAppointment, cancelAppointment } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Appointment Queue
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Review patient session bookings, approve requests, and handle rescheduling queries.
        </p>
      </div>

      {/* Main Table Card */}
      <div className="premium-card overflow-hidden bg-white dark:bg-sage-900/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-beige-100 dark:bg-sage-900/80 border-b border-beige-100 dark:border-sage-800/30 text-[10px] font-bold uppercase text-slate-950 dark:text-sage-500 tracking-wider">
                <th className="py-4 px-6">Client Info</th>
                <th className="py-4 px-6">Service Requested</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Time Slot</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Queue Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100 dark:divide-sage-900/40 text-xs text-stone-700 dark:text-sage-350">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-beige-50/20 dark:hover:bg-sage-900/10 transition-colors">
                  <td className="py-4.5 px-6">
                    <span className="block font-bold text-slate-950 dark:text-stone-300">
                      {apt.clientName}
                    </span>
                    <span className="block text-[10px] text-slate-955 dark:text-beige-300 font-bold">
                      {apt.clientEmail}
                    </span>
                  </td>
                  <td className="py-4.5 px-6 font-serif font-bold text-stone-850 dark:text-white">
                    {apt.service}
                  </td>
                  <td className="py-4.5 px-6 font-bold">{apt.date}</td>
                  <td className="py-4.5 px-6 font-bold">{apt.time}</td>
                  <td className="py-4.5 px-6">
                    <span className={`px-2.5 py-1 text-[9px] font-bold rounded uppercase tracking-wider ${
                      apt.status === 'Confirmed'
                        ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/20 dark:text-sky-400'
                        : apt.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400'
                        : apt.status === 'Cancelled'
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-4.5 px-6 text-right flex items-center justify-end gap-2">
                    {apt.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => approveAppointment(apt.id)}
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/25 dark:text-emerald-400 dark:hover:bg-emerald-700 rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => rejectAppointment(apt.id)}
                          className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white dark:bg-rose-950/25 dark:text-rose-450 dark:hover:bg-rose-700 rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Reject</span>
                        </button>
                      </>
                    )}
                    
                    {(apt.status === 'Confirmed') && (
                      <button
                        onClick={() => cancelAppointment(apt.id)}
                        className="px-3 py-1.5 border border-beige-200 dark:border-sage-800 text-stone-500 hover:text-rose-600 hover:border-rose-500/20 dark:text-sage-400 rounded-lg font-semibold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all"
                        title="Cancel Appointment"
                      >
                        <Ban className="h-3.5 w-3.5" />
                        <span>Cancel</span>
                      </button>
                    )}

                    {apt.status === 'Completed' && (
                      <span className="text-[10px] text-slate-955 dark:text-sage-300 font-bold px-2">Archived</span>
                    )}

                    {apt.status === 'Cancelled' && (
                      <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold px-2">Cancelled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
