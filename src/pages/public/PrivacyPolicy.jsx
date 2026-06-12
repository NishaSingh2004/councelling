import React from 'react';
import { ShieldAlert, FileText, Lock } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 animate-fade-in font-light text-slateText">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/20 text-primary mb-2">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Privacy Policy & HIPAA Notice</h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Effective Date: June 11, 2026</p>
      </div>

      <div className="premium-card p-8 md:p-10 space-y-8 bg-white dark:bg-slate-900 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>1. Commitment to Privacy</span>
          </h2>
          <p>
            At Vanshika Counselling Studio, we understand that your mental health information is deeply sensitive. We are fully committed to protecting your privacy and complying with all applicable state and federal laws, including the Health Insurance Portability and Accountability Act of 1996 (HIPAA).
          </p>
        </section>

        <section className="space-y-3 p-5 rounded-xl border border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10">
          <h2 className="font-serif text-sm font-bold text-amber-800 dark:text-amber-400 flex items-center gap-2">
            <ShieldAlert className="h-4.5 w-4.5" />
            <span>HIPAA Protected Health Information (PHI) Notice</span>
          </h2>
          <p className="text-xs text-slate-655 dark:text-slate-300">
            This notice describes how clinical psychological information about you may be used and disclosed and how you can get access to this information. Please review it carefully. Under HIPAA, clinical session notes, treatment goals, diagnosis codes, and communication logs are strictly classified as Protected Health Information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
            2. Information We Collect
          </h2>
          <p>
            We collect information that helps us provide a safe, clinical virtual workspace:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Personal Details:</strong> Full name, date of birth, billing address, phone number, and email.</li>
            <li><strong>Clinical Details:</strong> Appointment intake summaries, clinical session assessment records, and therapist-authored session notes.</li>
            <li><strong>Technical Details:</strong> Session metadata necessary to guarantee HIPAA telehealth stream quality. We do NOT record or store the audio or video of your therapy sessions.</li>
          </ul>
        </section>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
          For privacy related inquiries or complaints, contact our HIPAA compliance officer at <a href="mailto:privacy@vanshikacounselling.com" className="underline text-primary">privacy@vanshikacounselling.com</a>.
        </div>
      </div>
    </div>
  );
}
