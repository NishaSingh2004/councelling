import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { navigateTo, userRole } = useApp();

  // If inside a dashboard workspace (client or admin), we don't display the full public footer
  // to maximize space and follow clean SaaS dashboard design principles.
  const isDashboard = useApp().currentPage.startsWith('client-') || useApp().currentPage.startsWith('admin-');

  if (isDashboard) {
    return (
      <footer className="py-6 px-8 bg-white dark:bg-sage-950/40 border-t border-beige-200/50 dark:border-sage-900/40 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 dark:text-sage-500 gap-4">
        <div>© 2026 Vanshika Counselling Studio. All rights reserved. Secure HIPAA-compliant session workspace.</div>
        <div className="flex gap-4">
          <button onClick={() => navigateTo('privacy')} className="hover:text-stone-600 dark:hover:text-sage-300 transition-colors">Privacy Policy</button>
          <span>•</span>
          <button onClick={() => navigateTo('terms')} className="hover:text-stone-600 dark:hover:text-sage-300 transition-colors">Terms of Service</button>
          <span>•</span>
          <button onClick={() => navigateTo('consent')} className="hover:text-stone-600 dark:hover:text-sage-300 transition-colors">Consent Notice</button>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand & Purpose */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <Heart className="h-6 w-6 text-sage-400 fill-current" />
            <span className="font-serif text-2xl font-bold tracking-tight">
              Vanshika<span className="text-sage-400 font-sans font-light text-sm ml-1.5">Counselling Studio</span>
            </span>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed">
            Providing a confidential, compassionate, and secure digital space to support your healing and personal growth journey. Your mental well-being is our highest priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-3.5 text-sm text-stone-400">
            <li><button onClick={() => navigateTo('services')} className="hover:text-sage-400 transition-colors">Anxiety Counselling</button></li>
            <li><button onClick={() => navigateTo('services')} className="hover:text-sage-400 transition-colors">Depression Support</button></li>
            <li><button onClick={() => navigateTo('services')} className="hover:text-sage-400 transition-colors">Relationship Counselling</button></li>
            <li><button onClick={() => navigateTo('services')} className="hover:text-sage-400 transition-colors">Stress Management</button></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3.5">
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact & Hours</h4>
          <div className="flex items-center gap-3 text-sm text-stone-400">
            <Mail className="h-4.5 w-4.5 text-sage-400" />
            <span>contact@vanshikacounselling.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-stone-400">
            <Phone className="h-4.5 w-4.5 text-sage-400" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-stone-400">
            <MapPin className="h-4.5 w-4.5 text-sage-400 mt-0.5" />
            <span>Vanshika Counselling Studio, Sector 62,<br />Noida, Uttar Pradesh, India</span>
          </div>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Legal Framework</h4>
          <ul className="space-y-3.5 text-sm text-stone-400">
            <li><button onClick={() => navigateTo('privacy')} className="hover:text-sage-400 transition-colors">Privacy Policy & HIPAA</button></li>
            <li><button onClick={() => navigateTo('terms')} className="hover:text-sage-400 transition-colors">Terms & Conditions</button></li>
            <li><button onClick={() => navigateTo('consent')} className="hover:text-sage-400 transition-colors">Consent & Data Notice</button></li>
            <li>
              <span className="text-xs px-2.5 py-1 bg-stone-800 rounded-full text-sage-400 border border-stone-700/50 inline-block mt-2">
                100% Encrypted Sessions
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
        <div>
          © 2026 Vanshika Counselling Studio. All rights reserved.
        </div>
        <div>
          Certified HIPAA Compliant • SSL Secured Connection • Secure payments powered by Razorpay
        </div>
      </div>
    </footer>
  );
}
