import React, { useState } from 'react';
import { FileText, Video, Clipboard, Plus, Save, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

export default function AdminSessions() {
  const { appointments, updateSessionNotes, completeAppointment } = useApp();
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAptId, setSelectedAptId] = useState(null);
  const [noteContent, setNoteContent] = useState('');

  // Active appointments list
  const activeSessions = appointments.filter(a => a.status !== 'Cancelled');

  const handleOpenNotes = (apt) => {
    setSelectedAptId(apt.id);
    setNoteContent(apt.notes || '');
    setIsModalOpen(true);
  };

  const handleSaveNotes = (e) => {
    e.preventDefault();
    updateSessionNotes(selectedAptId, noteContent);
    setIsModalOpen(false);
    setSelectedAptId(null);
    setNoteContent('');
  };

  const handleMarkComplete = (id) => {
    completeAppointment(id);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Session & Clinical Notes
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Review upcoming meetings, connect to HIPAA video rooms, and write clinical notes for completed sessions.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="space-y-6">
        {activeSessions.length > 0 ? (
          activeSessions.map((apt) => (
            <div key={apt.id} className="premium-card p-6 md:p-8 space-y-6">
              
              {/* Info Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-beige-100 dark:border-sage-800/40 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                      apt.status === 'Completed'
                        ? 'bg-emerald-550/10 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400'
                        : 'bg-sky-50 text-sky-700 dark:bg-sky-950/20 dark:text-sky-450'
                    }`}>
                      {apt.status}
                    </span>
                    <span className="text-xs font-bold text-slate-955 dark:text-beige-300 font-mono">#{apt.id}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-955 dark:text-white mt-1">
                    {apt.clientName} — <span className="font-sans font-bold text-slate-950 dark:text-beige-100 text-sm">{apt.service}</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="text-right hidden sm:block mr-2">
                    <span className="text-xs text-slate-955 dark:text-beige-300 font-bold block">Scheduled Time</span>
                    <span className="text-xs font-bold text-slate-950 dark:text-beige-100">{apt.date} at {apt.time}</span>
                  </div>
                  
                  {apt.status === 'Confirmed' && (
                    <>
                      <button
                        onClick={() => alert(`Opening HIPAA secure telehealth video feed for order ${apt.id}...`)}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                      >
                        <Video className="h-4 w-4" />
                        <span>Join Session</span>
                      </button>
                      <button
                        onClick={() => handleMarkComplete(apt.id)}
                        className="px-4 py-2 bg-stone-100 hover:bg-stone-250 dark:bg-sage-800 text-stone-750 dark:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        Complete
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleOpenNotes(apt)}
                    className="px-4 py-2 border border-beige-200 dark:border-sage-800 text-stone-600 dark:text-sage-350 hover:bg-beige-50 dark:hover:bg-sage-850 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Clipboard className="h-4 w-4" />
                    <span>{apt.notes ? 'Edit Notes' : 'Add Notes'}</span>
                  </button>
                </div>
              </div>

              {/* Notes display */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-955 dark:text-beige-300 uppercase tracking-widest block">Clinical intake & notes:</span>
                <div className="p-5 bg-beige-50/50 dark:bg-sage-900/40 border border-beige-100/35 dark:border-sage-850/35 rounded-2xl">
                  {apt.notes ? (
                    <p className="text-xs sm:text-sm text-slate-950 dark:text-beige-100 font-bold leading-relaxed">
                      {apt.notes}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-955 dark:text-beige-300 font-bold">
                      No clinical session notes written yet. Click 'Add Notes' to document your observations.
                    </p>
                  )}
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="premium-card p-10 text-center text-slate-950 dark:text-beige-100 font-bold">
            No active appointments found.
          </div>
        )}
      </div>

      {/* Reusable Clinical Notes Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Document Therapy Observations"
      >
        <form onSubmit={handleSaveNotes} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">
              Session Diagnosis & Recommendations
            </label>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows="6"
              required
              placeholder="e.g. Client details, focus areas, cognitive exercise homework assigned, therapist observations..."
              className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Save className="h-4.5 w-4.5" />
            <span>Save Clinical Records</span>
          </button>
        </form>
      </Modal>

    </div>
  );
}
