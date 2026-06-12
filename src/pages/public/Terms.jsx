import React from 'react';
import { Gavel, Clock, CircleAlert, Landmark } from 'lucide-react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 animate-fade-in font-light text-slateText">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/20 text-primary mb-2">
          <Gavel className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Terms & Conditions</h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Last Updated: June 11, 2026</p>
      </div>

      <div className="premium-card p-8 md:p-10 space-y-8 bg-white dark:bg-slate-900 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Landmark className="h-5 w-5 text-primary" />
            <span>1. Services & Engagement</span>
          </h2>
          <p>
            Welcome to the Vanshika Counselling Studio digital counselling platform. By registering an account and booking a session, you agree to these Terms and Conditions. Vanshika Counselling Studio provides professional psychological counselling and mental health support. If you are experiencing a psychiatric emergency or feeling suicidal, you must immediately call local emergency services (911 / 112) or go to the nearest emergency room, as our platform is not a crisis management center.
          </p>
        </section>

        <section className="space-y-3 p-5 rounded-xl border border-primary-100/20 bg-primary-50/20 dark:bg-primary-950/10">
          <h2 className="font-serif text-sm font-bold text-primary-700 dark:text-primary-300 flex items-center gap-2">
            <Clock className="h-4.5 w-4.5 text-primary" />
            <span>Strict 24-Hour Cancellation Policy</span>
          </h2>
          <p className="text-xs text-slate-655 dark:text-slate-305">
            Vanshika Counselling Studio operates under a strict 24-hour cancellation and rescheduling policy. If you cancel or reschedule an appointment less than 24 hours prior to the scheduled start time, or if you fail to attend the session (no-show), you will be charged the full amount of the session. Cancellations made 24 hours or more in advance are eligible for a full refund.
          </p>
        </section>

        <div className="flex gap-3.5 p-4 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-500/10 rounded-xl">
          <CircleAlert className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <strong>Liability Warning:</strong> The contents of Vanshika Counselling Studio public pages, blog posts, and resources do not constitute diagnostic medical advice. They are meant for general educational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
