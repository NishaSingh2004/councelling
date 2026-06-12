import React, { useState } from 'react';
import { Calendar, CheckCircle2, IndianRupee, Clock, ArrowRight, Video, FileText, Sparkles, Send, Play, Square } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ClientHome() {
  const { appointments, navigateTo, currentUser, addNotification } = useApp();
  const [mood, setMood] = useState(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [messageText, setMessageText] = useState('');
  
  const clientEmail = currentUser?.email || 'jane.doe@example.com';
  const clientApts = appointments.filter((apt) => apt.clientEmail === clientEmail);

  // Compute stats
  const upcoming = clientApts.filter((apt) => apt.status === 'Confirmed' || apt.status === 'Pending');
  const completed = clientApts.filter((apt) => apt.status === 'Completed');
  const totalPaid = clientApts.reduce((acc, apt) => apt.status !== 'Cancelled' ? acc + (apt.price || 1500) : acc, 0);
  const nextApt = upcoming.length > 0 ? upcoming[upcoming.length - 1] : null;

  const stats = [
    { label: 'Upcoming Sessions', value: upcoming.length, icon: Calendar, color: 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/40' },
    { label: 'Completed Sessions', value: completed.length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40' },
    { label: 'Total Settled', value: `₹${totalPaid}`, icon: IndianRupee, color: 'text-sage-600 bg-sage-50 dark:text-sage-400 dark:bg-sage-950/40' },
    { label: 'Next Appointment', value: nextApt ? nextApt.date : 'None scheduled', icon: Clock, color: 'text-sage-600 bg-sage-50 dark:text-sage-400 dark:bg-sage-950/40' }
  ];

  const handleMoodCheckIn = (selectedMood) => {
    setMood(selectedMood);
    addNotification(`Daily mood check-in registered: "${selectedMood}". Well done!`, 'success');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    addNotification('Message sent securely to Vanshika\'s clinical inbox.', 'success');
    setMessageText('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Message */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Hello, {currentUser?.name || 'Jane'}
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Welcome to your secure mental health dashboard. You are in control of your healing process.
        </p>
      </div>

      {/* Analytics KPI grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="premium-card p-6 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-slate-950 dark:text-beige-300 uppercase tracking-wider font-bold block">{stat.label}</span>
                <span className="font-serif text-2xl font-bold text-slate-950 dark:text-white block">{stat.value}</span>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <Icon className="h-5.5 w-5.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Widgets layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Col-7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Upcoming Session details */}
          <div className="premium-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-sage-800/40 pb-4">
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">
                Upcoming Session Details
              </h3>
              <button
                onClick={() => navigateTo('client-appointments')}
                className="text-xs font-semibold text-sage-600 hover:text-sage-700 dark:text-sage-400 flex items-center gap-1"
              >
                <span>View Schedule</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {nextApt ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-5 bg-stone-50 dark:bg-sage-900/40 rounded-xl border border-stone-200/50 dark:border-sage-850/30">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 uppercase tracking-wide inline-block">
                      {nextApt.status}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                      {nextApt.service}
                    </h4>
                    <p className="text-xs text-slate-950 dark:text-beige-100 font-bold">
                      Date: <strong className="font-bold text-slate-950 dark:text-stone-250">{nextApt.date}</strong> at <strong className="font-bold text-slate-950 dark:text-stone-250">{nextApt.time}</strong>
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => alert(`Launching secure HIPAA video call room for ${nextApt.id}...`)}
                      className="btn-primary py-2.5 px-5 text-xs flex items-center gap-2"
                    >
                      <Video className="h-4.5 w-4.5" />
                      <span>Join Video Session</span>
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-950 dark:text-beige-300 font-bold bg-beige-100 dark:bg-sage-900/25 p-4 rounded-lg flex gap-2">
                  <Clock className="h-4.5 w-4.5 text-sage-500 shrink-0 mt-0.5" />
                  <span>The video room will become active 5 minutes before your schedule. Please ensure your microphone and webcam are working.</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <Calendar className="h-10 w-10 text-stone-300 dark:text-sage-850 mx-auto" />
                <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
                  You do not have any upcoming sessions scheduled.
                </p>
                <button
                  onClick={() => navigateTo('client-book')}
                  className="btn-primary py-2 px-4 text-xs"
                >
                  Schedule Your First Session
                </button>
              </div>
            )}
          </div>

          {/* Interactive Wellness Check-in widget */}
          <div className="premium-card p-6 space-y-6">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-sage-800/40 pb-4">
              Mindfulness Check-In
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Mood Tracker */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-sage-500" />
                  <span>How is your mental space today?</span>
                </h4>
                
                <div className="flex justify-between gap-1 pt-1">
                  {[
                    { emoji: '😊', label: 'Radiant' },
                    { emoji: '😌', label: 'Calm' },
                    { emoji: '😴', label: 'Fatigued' },
                    { emoji: '😰', label: 'Anxious' },
                    { emoji: '😢', label: 'Sad' }
                  ].map((mOption) => (
                    <button
                      key={mOption.label}
                      onClick={() => handleMoodCheckIn(mOption.label)}
                      className={`flex flex-col items-center p-2 rounded-xl transition-all w-12 hover:scale-105 ${
                        mood === mOption.label
                          ? 'bg-sage-100 border border-sage-200 dark:bg-sage-900 dark:border-sage-800'
                          : 'bg-stone-50 dark:bg-sage-950/20'
                      }`}
                      title={mOption.label}
                    >
                      <span className="text-lg">{mOption.emoji}</span>
                      <span className="text-[9px] text-slate-950 dark:text-beige-300 font-bold mt-1">{mOption.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Breathing Exercise Player */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide flex items-center gap-1.5">
                  <span>5-Min Resonant Breathing Coach</span>
                </h4>
                
                <div className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-sage-950/30 rounded-xl border border-stone-100 dark:border-sage-850/25">
                  <button
                    onClick={() => {
                      setIsBreathing(!isBreathing);
                      if(!isBreathing) {
                        addNotification('Starting breathing coach. Inhale... Exhale...', 'info');
                      }
                    }}
                    className={`h-11 w-11 rounded-full flex items-center justify-center text-white transition-all shadow ${
                      isBreathing ? 'bg-rose-500' : 'bg-sage-600 hover:bg-sage-700'
                    }`}
                  >
                    {isBreathing ? <Square className="h-4.5 w-4.5" /> : <Play className="h-4.5 w-4.5 fill-current ml-0.5" />}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-slate-950 dark:text-white block">
                      {isBreathing ? 'Inhale 4s... Hold 4s... Exhale 4s...' : 'Deep Breathing'}
                    </span>
                    <span className="text-[10px] text-slate-955 dark:text-beige-300 block font-bold mt-0.5">
                      {isBreathing ? 'Pulsing rhythm active' : 'Click play to start breathing rhythm'}
                    </span>
                  </div>

                  {/* Pulsing indicator visual */}
                  {isBreathing && (
                    <div className="h-4 w-4 rounded-full bg-sage-500 animate-ping shrink-0" />
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column (Col-5) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Recent Activity Updates */}
          <div className="premium-card p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-sage-800/40 pb-4">
              Recent Clinical Updates
            </h3>
            
            <div className="space-y-4">
              {clientApts.length > 0 ? (
                clientApts.slice(0, 3).map((apt, i) => (
                  <div key={i} className="flex gap-3 items-start text-xs border-b border-stone-100/50 dark:border-sage-900/20 pb-3 last:border-0 last:pb-0">
                    <div className={`p-2 rounded-lg mt-0.5 ${
                      apt.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                        : apt.status === 'Cancelled'
                        ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'
                        : 'bg-sky-50 text-sky-600 dark:bg-sky-950/20 dark:text-sky-400'
                    }`}>
                      {apt.status === 'Completed' ? <FileText className="h-4.5 w-4.5" /> : <Calendar className="h-4.5 w-4.5" />}
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-950 dark:text-white block">
                        {apt.service} {apt.status}
                      </span>
                      <span className="text-slate-955 dark:text-beige-300 block font-bold">
                        Session date: {apt.date} • {apt.time}
                      </span>
                      {apt.notes && (
                        <span className="text-[10px] text-sage-600 dark:text-sage-400 font-bold block not-italic pt-0.5">
                          "Vanshika Singh added therapy notes."
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-stone-400">
                  No recent activities recorded.
                </div>
              )}
            </div>
          </div>

          {/* Secure Messaging Portal */}
          <div className="premium-card p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-sage-800/40 pb-4">
              Secure Message to Therapist
            </h3>
            <p className="text-xs text-slate-950 dark:text-beige-150 font-bold leading-relaxed">
              Drop any private questions, concerns, or updates. Vanshika Singh responds within clinic hours.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-3">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows="3"
                placeholder="Type your message securely..."
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-sage-950 border border-stone-200 dark:border-sage-800 rounded-xl text-xs focus:outline-none text-stone-800 dark:text-white resize-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-sage-600 hover:bg-sage-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Secure Message</span>
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
