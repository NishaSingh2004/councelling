import React, { useState } from 'react';
import { ShieldCheck, Calendar, Clock, CreditCard, ChevronRight, Check, X, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { services } from '../../data/mockData';

export default function BookAppointment() {
  const { timeSlots, addAppointment, navigateTo } = useApp();
  const [step, setStep] = useState(1);
  
  // Selected values
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isProcessingPay, setIsProcessingPay] = useState(false);

  // Derive unique dates that have available slots
  const availableDates = Array.from(new Set(
    timeSlots.filter(s => s.status === 'available').map(s => s.date)
  )).sort();

  // Filter slots for the selected date
  const availableTimesForDate = timeSlots.filter(
    (s) => s.date === selectedDate && s.status === 'available'
  );

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset selected time
    setStep(3);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(4);
  };

  const handleConfirmPay = () => {
    setStep(5);
  };

  const executePayment = () => {
    setIsProcessingPay(true);
    setTimeout(() => {
      // Add appointment to global state
      addAppointment({
        service: selectedService.title,
        date: selectedDate,
        time: selectedTime,
        price: selectedService.priceRaw
      });
      setIsProcessingPay(false);
      // Navigate to My Appointments list
      navigateTo('client-appointments');
    }, 2000);
  };

  const stepsHeader = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Date' },
    { num: 3, label: 'Time' },
    { num: 4, label: 'Confirm' },
    { num: 5, label: 'Pay' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Book a Therapy Session
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Complete five simple steps to schedule and verify your session.
        </p>
      </div>

      {/* Step Progress indicators */}
      <div className="flex items-center justify-between bg-white dark:bg-sage-900 border border-beige-200/50 dark:border-sage-800/40 p-4.5 rounded-2xl shadow-sm">
        {stepsHeader.map((sHeader, i) => (
          <React.Fragment key={sHeader.num}>
            <div className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === sHeader.num
                  ? 'bg-sage-600 text-white shadow-sm ring-4 ring-sage-100 dark:ring-sage-900/50'
                  : step > sHeader.num
                  ? 'bg-emerald-500 text-white'
                  : 'bg-beige-100 dark:bg-sage-800 text-slate-950 dark:text-beige-300'
              }`}>
                {step > sHeader.num ? <Check className="h-3.5 w-3.5" /> : sHeader.num}
              </div>
              <span className={`text-xs font-bold hidden sm:inline ${
                step === sHeader.num ? 'text-slate-950 dark:text-white' : 'text-slate-950 dark:text-beige-300'
              }`}>
                {sHeader.label}
              </span>
            </div>
            {i < stepsHeader.length - 1 && (
              <ChevronRight className="h-4 w-4 text-stone-300 dark:text-sage-800" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* BACK NAVIGATION */}
      {step > 1 && step < 5 && (
        <button
          onClick={() => setStep(step - 1)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-950 hover:text-black dark:text-beige-100 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to previous step</span>
        </button>
      )}

      {/* WIZARD CONTAINER */}
      <div className="premium-card p-8 bg-white dark:bg-sage-900/60">
        
        {/* STEP 1: SELECT SERVICE */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Step 1: Select counselling category
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`p-5 rounded-xl border cursor-pointer hover:border-sage-400 dark:hover:border-sage-700/60 hover:bg-beige-50/20 dark:hover:bg-sage-900/20 transition-all ${
                    selectedService?.id === service.id
                      ? 'border-sage-600 bg-sage-50/20 dark:border-sage-500 dark:bg-sage-950/20 shadow-sm'
                      : 'border-beige-200/50 dark:border-sage-800/40 bg-white dark:bg-sage-900'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-white">{service.title}</h4>
                    <span className="text-xs font-bold text-sage-600 dark:text-sage-400">{service.price}</span>
                  </div>
                  <p className="text-xs text-slate-950 dark:text-beige-300 mt-2 font-bold leading-relaxed">{service.description.slice(0, 75)}...</p>
                  <span className="text-[10px] text-slate-950 dark:text-beige-200 font-bold block mt-3">Duration: {service.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Step 2: Choose available date
            </h3>
            
            {availableDates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {availableDates.map((date) => {
                  const dateObj = new Date(date);
                  const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                  const day = dateObj.toLocaleDateString('en-US', { day: 'numeric' });
                  const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                  return (
                    <div
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      className={`p-5 rounded-xl border text-center cursor-pointer transition-all hover:border-sage-400 dark:hover:border-sage-700/60 ${
                        selectedDate === date
                          ? 'border-sage-600 bg-sage-50/20 dark:border-sage-550 dark:bg-sage-950/20 shadow-sm'
                          : 'border-beige-200/50 dark:border-sage-800/40 bg-white dark:bg-sage-900'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-widest block">{weekday}</span>
                      <span className="font-serif text-2xl font-bold text-slate-950 dark:text-white block mt-1">{day}</span>
                      <span className="text-xs text-slate-950 dark:text-beige-300 font-bold block">{month}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-950 dark:text-beige-300 font-bold">
                No slots are currently configured. Please switch to Admin to create time slots.
              </div>
            )}
          </div>
        )}

        {/* STEP 3: SELECT AVAILABLE TIME SLOT */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Step 3: Select session time slot for {selectedDate}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableTimesForDate.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleTimeSelect(slot.time)}
                  className={`p-3.5 rounded-xl border text-xs font-bold tracking-wide transition-all ${
                    selectedTime === slot.time
                      ? 'bg-sage-600 border-sage-600 text-white shadow-sm'
                      : 'border-beige-200/50 dark:border-sage-800/40 bg-white hover:border-sage-400 dark:bg-sage-900 dark:hover:border-sage-700 text-slate-950 dark:text-beige-300'
                  }`}
                >
                  <Clock className="h-3.5 w-3.5 inline mr-1.5 opacity-70" />
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRM BOOKING */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Step 4: Confirm Booking Summary
            </h3>
            
            <div className="bg-beige-50 dark:bg-sage-900/60 border border-beige-100 dark:border-sage-850/40 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between border-b border-beige-100 dark:border-sage-800/30 pb-3">
                <span className="text-xs font-bold text-slate-950 dark:text-beige-300">Service Category</span>
                <span className="text-sm font-bold text-stone-850 dark:text-white">{selectedService?.title}</span>
              </div>
              <div className="flex justify-between border-b border-beige-100 dark:border-sage-800/30 pb-3">
                <span className="text-xs font-bold text-slate-950 dark:text-beige-300">Date</span>
                <span className="text-sm font-semibold text-stone-850 dark:text-white">{selectedDate}</span>
              </div>
              <div className="flex justify-between border-b border-beige-100 dark:border-sage-800/30 pb-3">
                <span className="text-xs font-bold text-slate-950 dark:text-beige-300">Time Slot</span>
                <span className="text-sm font-semibold text-stone-850 dark:text-white">{selectedTime}</span>
              </div>
              <div className="flex justify-between border-b border-beige-100 dark:border-sage-800/30 pb-3">
                <span className="text-xs font-bold text-slate-950 dark:text-beige-300">Duration</span>
                <span className="text-sm font-semibold text-stone-850 dark:text-white">{selectedService?.duration}</span>
              </div>
              <div className="flex justify-between pt-1 font-serif text-base font-bold text-stone-900 dark:text-white">
                <span>Total Amount Due</span>
                <span className="text-sage-600 dark:text-sage-400">{selectedService?.price}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmPay}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              <span>Confirm & Proceed to Payment</span>
            </button>
          </div>
        )}

        {/* STEP 5: PAY WITH RAZORPAY SIMULATOR */}
        {step === 5 && (
          <div className="space-y-6 text-center">
            
            {/* Razorpay Header Branding */}
            <div className="bg-[#0b1626] text-white p-5 rounded-2xl flex flex-col items-center space-y-2 relative overflow-hidden border border-white/5 shadow-md">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-blue-500/10 blur-xl" />
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Secure Payments</span>
              <span className="font-serif text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Razorpay <span className="h-4.5 w-4.5 bg-blue-500 rounded flex items-center justify-center text-[10px] font-sans font-black italic">R</span>
              </span>
            </div>

            <div className="space-y-2 p-5 bg-beige-50 dark:bg-sage-900 border border-beige-100 dark:border-sage-850/40 rounded-xl max-w-sm mx-auto">
              <span className="text-xs font-bold text-slate-950 dark:text-beige-300">Order ID: order_AC{Date.now().toString().slice(-6)}</span>
              <div className="text-2xl font-bold text-stone-900 dark:text-white mt-1">
                {selectedService?.price}
              </div>
              <div className="text-[11px] text-slate-950 dark:text-beige-200 font-bold leading-relaxed pt-1.5 border-t border-beige-150 dark:border-sage-800">
                Booking: {selectedService?.title}<br />
                Slot: {selectedDate} at {selectedTime}
              </div>
            </div>

            {isProcessingPay ? (
              <div className="py-8 space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />
                <span className="text-xs text-blue-500 dark:text-blue-400 font-semibold block uppercase tracking-wider animate-pulse">
                  Verifying banking details with Razorpay API...
                </span>
              </div>
            ) : (
              <div className="space-y-3.5 max-w-sm mx-auto">
                <button
                  onClick={executePayment}
                  className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="h-4.5 w-4.5 text-blue-200" />
                  <span>Pay with Razorpay (Demo)</span>
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setStep(4)}
                    className="py-2.5 px-4 bg-stone-150 dark:bg-sage-800 text-stone-600 dark:text-sage-300 rounded-lg text-xs font-semibold hover:bg-stone-200 transition-all"
                  >
                    Cancel Order
                  </button>
                  <button
                    onClick={() => navigateTo('client-appointments')}
                    className="py-2.5 px-4 border border-beige-200 dark:border-sage-800 text-stone-600 dark:text-sage-350 rounded-lg text-xs font-semibold hover:bg-stone-50 dark:hover:bg-sage-850 transition-all"
                  >
                    My Appointments
                  </button>
                </div>
              </div>
            )}

            <div className="text-[10px] text-slate-950 dark:text-beige-300 font-bold pt-3 flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>SSL Secure 256-bit Connection. Powered by Razorpay.</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
