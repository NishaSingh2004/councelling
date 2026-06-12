import React, { useState } from 'react';
import { CalendarDays, Plus, Trash2, Ban, Lock, Unlock, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminTimeSlots() {
  const { timeSlots, createTimeSlot, deleteTimeSlot, toggleSlotBlock, blockDate } = useApp();
  
  // Date selection (default to next week monday 2026-06-15)
  const [selectedDate, setSelectedDate] = useState('2026-06-15');
  const [newTime, setNewTime] = useState('10:00 AM');

  // Filter slots for active date
  const activeSlots = timeSlots.filter((slot) => slot.date === selectedDate);

  const handleCreateSlot = (e) => {
    e.preventDefault();
    if (!newTime) return;
    createTimeSlot(selectedDate, newTime);
  };

  const calendarDays = [
    { date: '2026-06-15', label: 'Mon 15' },
    { date: '2026-06-16', label: 'Tue 16' },
    { date: '2026-06-17', label: 'Wed 17' },
    { date: '2026-06-18', label: 'Thu 18' },
    { date: '2026-06-19', label: 'Fri 19' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Calendar Slots
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Configure clinical session availability calendars and restrict off days.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Date Selector Matrix (Col-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Date Switcher */}
          <div className="premium-card p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sage-600" />
              <span>Select Workday</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-2.5">
              {calendarDays.map((d) => (
                <button
                  key={d.date}
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    selectedDate === d.date
                      ? 'bg-sage-600 border-sage-600 text-white shadow-sm'
                      : 'border-beige-200/50 dark:border-sage-800/40 bg-white dark:bg-sage-900 text-stone-700 dark:text-sage-350 hover:border-sage-300'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Custom Date Input Picker */}
            <div className="space-y-1.5 pt-3 border-t border-beige-100 dark:border-sage-800/40">
              <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase">Or pick other date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 bg-beige-50 dark:bg-sage-950 border border-beige-200 dark:border-sage-800 rounded-lg text-xs text-stone-850 dark:text-white font-bold"
              />
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="premium-card p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">Calendar Blocks</h3>
            <p className="text-xs text-slate-950 dark:text-beige-150 font-bold leading-relaxed">
              Restrict all hours on the active date for vacations, leave, or emergency blocks.
            </p>
            <button
              onClick={() => blockDate(selectedDate)}
              className="w-full py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white dark:bg-rose-950/20 dark:text-rose-400 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all"
            >
              <Ban className="h-4 w-4" />
              <span>Block Entire Date ({selectedDate})</span>
            </button>
          </div>

        </div>

        {/* Hour Slots Editor (Col-7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Add Slot Form */}
          <div className="premium-card p-6">
            <form onSubmit={handleCreateSlot} className="flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-1 space-y-1.5 w-full">
                <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase">Configure New Hour Slot</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-beige-50 dark:bg-sage-950 border border-beige-200/65 dark:border-sage-800 rounded-xl text-xs text-stone-850 dark:text-white focus:outline-none font-bold"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn-primary py-2.5 px-5 text-xs flex items-center justify-center gap-1.5 w-full sm:w-auto shrink-0"
              >
                <Plus className="h-4.5 w-4.5" />
                <span>Create Time Slot</span>
              </button>
            </form>
          </div>

          {/* Active Hours List */}
          <div className="premium-card p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800/40 pb-3">
              Configured Slots for {selectedDate}
            </h3>

            {activeSlots.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="p-4 rounded-xl border border-beige-200/50 dark:border-sage-850/50 bg-beige-50/20 dark:bg-sage-900/40 flex items-center justify-between shadow-inner"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-955 dark:text-white">{slot.time}</span>
                      <span className="block">
                        {slot.status === 'available' ? (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-1.5 py-0.5 rounded uppercase">Available</span>
                        ) : (
                          <span className="text-[9px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/20 dark:text-rose-400 px-1.5 py-0.5 rounded uppercase">Blocked</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleSlotBlock(slot.id)}
                        className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-white hover:bg-beige-100 dark:hover:bg-sage-800 rounded-lg transition-colors"
                        title={slot.status === 'blocked' ? 'Unlock Slot' : 'Block Slot'}
                      >
                        {slot.status === 'blocked' ? <Unlock className="h-4 w-4 text-emerald-500" /> : <Lock className="h-4 w-4 text-rose-500" />}
                      </button>
                      <button
                        onClick={() => deleteTimeSlot(slot.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors"
                        title="Delete Slot"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <CalendarDays className="h-10 w-10 text-stone-300 dark:text-sage-850 mx-auto" />
                <p className="text-xs text-slate-950 dark:text-beige-300 font-bold">
                  No slots configured for this date.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
