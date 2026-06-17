import React, { useState } from 'react';
import { Mail, Phone, Clock, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Contact() {
  const { addNotification } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addNotification('Please fill in all required fields.', 'warning');
      return;
    }
    addNotification('Secure message received. We will respond within 24 hours.', 'success');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 animate-fade-in text-slateText">
      
      {/* Title */}
      <section className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Reach Out</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Get in Touch</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
          Have questions or want to learn more? Send a secure message or call our office.
        </p>
      </section>

      {/* Grid Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Info Column (Col-5) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="premium-card p-8 space-y-6 bg-white dark:bg-slate-900">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
              Office Information
            </h3>
            
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="p-2.5 h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-550 block font-bold uppercase tracking-wider">Email Address</span>
                  <a href="mailto:contact@vanshikacounselling.com" className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-primary transition-colors">
                    contact@vanshikacounselling.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-2.5 h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-555 block font-bold uppercase tracking-wider">Call Office</span>
                  <a href="tel:+919876543210" className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-primary transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-2.5 h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-555 block font-bold uppercase tracking-wider">Working Hours</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-205 block">
                    Mon - Fri: 09:00 AM - 06:00 PM<br />Sat - Sun: Closed
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form (Col-7) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="premium-card p-8 space-y-6 bg-white dark:bg-slate-900">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
              Secure Consultation Inquiry
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wide block">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white font-light"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wide block">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white font-light"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wide block">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +1 (555) 019-9812"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white font-light"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-450 uppercase tracking-wide block">
                Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Briefly share how we can support you..."
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white font-light resize-none"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 group"
            >
              <Send className="h-4 w-4" />
              <span>Send Secure Message</span>
            </button>
          </form>
        </div>

      </section>

    </div>
  );
}
