import React from 'react';
import { Eye, FileCheck, CircleUser } from 'lucide-react';

export default function ConsentNotice() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 animate-fade-in font-light text-slateText">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/20 text-primary mb-2">
          <FileCheck className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Consent & Data Notice</h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Effective Date: June 11, 2026</p>
      </div>

      <div className="premium-card p-8 md:p-10 space-y-8 bg-white dark:bg-slate-900 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <span>1. Telehealth Services Informed Consent</span>
          </h2>
          <p>
            Telehealth involves the delivery of mental health services using interactive audio and video technologies. By consenting to receive services, you acknowledge that you understand and agree to the following:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-500">
            <li>You have the right to withdraw your consent to telehealth treatment at any time without affecting your right to future care.</li>
            <li>Telemedicine relies on technology; you will cooperate with Vanshika Singh to establish a backup communication plan (e.g. phone call) in case of connection dropouts.</li>
            <li>You must disclose your physical location at the beginning of each session. This is a clinical licensing requirement.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CircleUser className="h-5 w-5 text-primary" />
            <span>2. Data Collection and Processing</span>
          </h2>
          <p>
            In order to run a high-fidelity patient portal, Vanshika Counselling Studio collects and processes personal data. By using the dashboard and booking appointments, you consent to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-500">
            <li>The creation of a digital client profile containing contact information and payment logs.</li>
            <li>The secure storage of clinical records (session summaries, clinical notes) written by our therapist team.</li>
          </ul>
        </section>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
          By registering on our platform and checking "I agree" during checkout, you confirm that you have read, understood, and consented to this Informed Consent and Data Notice.
        </div>
      </div>
    </div>
  );
}
