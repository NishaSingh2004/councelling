import React, { useState } from 'react';
import { 
  Play, Calendar, ArrowRight, ShieldCheck, Award, Users, 
  ChevronRight, Brain, Heart, Briefcase, Activity, Sparkles, Star, ChevronLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { testimonials, therapists } from '../../data/mockData';
import FAQAccordion from '../../components/public/FAQAccordion';
import ServiceCard from '../../components/public/ServiceCard';
import Modal from '../../components/common/Modal';

export default function Home() {
  const { navigateTo, services } = useApp();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const trustMetrics = [
    { label: 'Licensed Therapists', value: '4 Senior Staff', desc: 'Board-certified clinical doctors' },
    { label: 'Secure Sessions', value: '100% Encrypted', desc: 'HIPAA-compliant video rooms' },
    { label: 'Years of Experience', value: '12+ Years Lead', desc: 'Clinical Director & Senior Staff' },
    { label: 'Happy Clients', value: '500+ Patients', desc: 'High recovery rate clinical trials' }
  ];

  const steps = [
    { step: '01', title: 'Choose Service', desc: 'Select the clinical counselling category matching your goals.' },
    { step: '02', title: 'Select Therapist', desc: 'Pick from our specialized clinical psychologist team.' },
    { step: '03', title: 'Pick Time Slot', desc: 'Choose a date and available hour from the real-time calendar.' },
    { step: '04', title: 'Complete Payment', desc: 'Checkout securely via order portal (Razorpay simulated).' },
    { step: '05', title: 'Receive Meeting Link', desc: 'Attend session via the click of a single secure video button.' }
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="space-y-24 pb-24 animate-fade-in text-slateText">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-16 md:py-24">
        {/* Glow decoration */}
        <div className="absolute top-1/4 left-1/12 w-80 h-80 rounded-full bg-primary-100/30 dark:bg-primary-950/10 blur-3xl -z-10 animate-pulse-subtle" />
        <div className="absolute top-1/3 right-1/10 w-96 h-96 rounded-full bg-secondary-100/20 dark:bg-secondary-950/10 blur-3xl -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-50 dark:bg-primary-950/30 text-primary dark:text-primary-300 rounded-full text-xs font-semibold tracking-wide border border-primary-100/30">
              <Award className="h-3.5 w-3.5 text-primary" />
              <span>Premium Online Counselling & Therapy</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight">
              Confidential Support For Your <span className="text-primary font-serif">Mental Well-being</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-955 dark:text-beige-100 max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold">
              Connect with licensed clinical therapists for secure, personalized therapy. Get the compassionate guidance you deserve to navigate anxiety, relationships, and personal growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigateTo('login')}
                className="btn-primary flex items-center justify-center gap-2.5"
              >
                <Calendar className="h-4.5 w-4.5" />
                <span>Book Appointment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setIsVideoOpen(true)}
                className="px-6 py-3 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Play className="h-4.5 w-4.5 text-primary fill-current" />
                <span>Watch Introduction</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer frame */}
              <div className="absolute -inset-4 rounded-3xl bg-slate-100 dark:bg-slate-900/40 -rotate-2 -z-10" />
              <div className="absolute -inset-2 rounded-3xl bg-primary-50 dark:bg-primary-950/20 rotate-1 -z-10" />
              
              <div className="overflow-hidden rounded-2xl shadow-xl aspect-[4/5] relative bg-slate-100 border border-slate-250/20 dark:border-slate-800/40">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                  alt="Lead Therapist"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                />
                
                {/* Floating clinical identity banner */}
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-card border-white/30 text-slate-800 dark:text-slate-100">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Clinical Director</span>
                  <span className="font-serif text-base font-bold text-slate-900 dark:text-white block mt-0.5">Vanshika Singh</span>
                  <span className="text-[11px] text-slate-950 dark:text-beige-200 block font-bold mt-1">Licensed Clinical Psychologist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustMetrics.map((item, i) => (
            <div key={i} className="premium-card p-6 flex flex-col justify-between hover:border-primary/20 transition-all duration-300">
              <div className="space-y-1">
                <span className="text-xs text-slate-955 dark:text-beige-300 uppercase tracking-widest font-bold block">{item.label}</span>
                <span className="font-serif text-2xl font-bold text-primary block">{item.value}</span>
              </div>
              <p className="text-xs text-slate-955 dark:text-beige-200 mt-2.5 font-bold">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Specializations</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Professional Counselling & Therapy
          </h2>
          <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
            Every session is tailored to your mental path, held securely in our digital offices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-slate-100/40 dark:bg-slate-900/10 py-20 border-y border-slate-200/50 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-primary uppercase tracking-widest font-sans">Procedure</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">How It Works</h2>
            <p className="text-sm text-slate-950 dark:text-beige-100 font-bold font-serif">
              Your recovery path is designed to be frictionless.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {steps.map((item, index) => (
              <div key={index} className="space-y-4 text-center group">
                <div className="relative inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-serif text-base font-bold text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-850 dark:text-slate-100 text-sm mt-2">{item.title}</h3>
                <p className="text-xs text-slate-955 dark:text-beige-200 max-w-xs mx-auto leading-relaxed font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THERAPIST SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Clinical Faculty</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Meet Our Board-Certified Team</h2>
          <p className="text-sm text-slate-955 dark:text-beige-100 font-bold">
            Therapists at Vanshika Counselling Studio undergo strict clinical credentialing reviews to guarantee elite outpatient psychological care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {therapists.map((therapist) => (
            <div key={therapist.id} className="premium-card overflow-hidden flex flex-col justify-between h-full group hover:border-primary/20">
              <div className="space-y-4">
                {/* Photo */}
                <div className="aspect-square bg-slate-100 overflow-hidden relative border-b border-slate-100 dark:border-slate-800">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-200/50 dark:border-slate-800 text-[10px] font-bold text-amber-500 flex items-center gap-0.5 shadow-sm">
                    <Star className="h-3 w-3 fill-current" />
                    <span>{therapist.rating}</span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">{therapist.title}</span>
                  <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">{therapist.name}</h3>
                  <p className="text-xs text-slate-955 dark:text-beige-100 leading-relaxed font-bold">{therapist.bio.slice(0, 85)}...</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-150/40 dark:border-slate-800/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">Experience</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{therapist.experience}</span>
                </div>
                <button
                  onClick={() => navigateTo('login')}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-primary hover:text-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS CAROUSEL */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Patient Success Stories</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">What Our Clients Say</h2>
        </div>

        <div className="premium-card p-8 md:p-12 relative flex flex-col justify-between min-h-64 shadow-md bg-white dark:bg-slate-900">
          <div className="space-y-6">
            <div className="flex gap-0.5 text-amber-500">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="font-serif text-slate-955 dark:text-beige-100 text-base sm:text-lg leading-relaxed font-bold">
              "{testimonials[activeTestimonial].text}"
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={testimonials[activeTestimonial].image}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <span className="block text-xs font-bold text-slate-850 dark:text-white">{testimonials[activeTestimonial].name}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].service}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <button
                onClick={handlePrevTestimonial}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Support</span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        </div>
        <FAQAccordion />
      </section>

      {/* 8. CONTACT CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-secondary text-white p-10 md:p-16 text-center space-y-8 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-black/10 blur-3xl -ml-16 -mb-16" />

          <div className="max-w-xl mx-auto space-y-4 relative">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Start Your Healing Journey Today
            </h2>
            <p className="text-sm text-primary-100 font-bold leading-relaxed">
              Confidential clinical psychological help is just a few clicks away. Partner with our senior therapist staff inside our secure video offices.
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => navigateTo('login')}
              className="px-8 py-4 bg-white text-primary hover:bg-slate-50 rounded-xl font-semibold shadow-md transition-all hover:scale-105 active:scale-100 inline-flex items-center gap-2 text-sm"
            >
              <span>Book Appointment Session</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* WATCH VIDEO MODAL OVERLAY */}
      <Modal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title="Introduction to Vanshika Counselling Studio"
      >
        <div className="space-y-6 text-center">
          {/* Simulated video playback frame */}
          <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden group shadow border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-slate-900/90 mix-blend-overlay" />
            <div className="z-10 p-5 bg-white text-primary rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
              <Play className="h-6 w-6 fill-current ml-0.5" />
            </div>
            <span className="absolute bottom-3 left-3 text-[10px] text-slate-400 font-mono">0:00 / 2:30 • Secure Stream</span>
          </div>
          <p className="text-xs text-slate-955 dark:text-beige-100 leading-relaxed font-bold">
            In this short video, Vanshika Singh introduces the HIPAA-secure telehealth video rooms, details how client-therapist confidentiality is strictly guarded, and outlines the standard booking procedure.
          </p>
        </div>
      </Modal>

    </div>
  );
}
