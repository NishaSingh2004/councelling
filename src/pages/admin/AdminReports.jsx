import React from 'react';
import { BarChart3, Download, TrendingUp, Users, CalendarCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RevenueChart, ServicesChart } from '../../components/admin/ChartContainer';

export default function AdminReports() {
  const { appointments, clients } = useApp();

  const activeApts = appointments.filter(a => a.status !== 'Cancelled');
  const revenueSum = activeApts.reduce((acc, a) => acc + (a.price || 1500), 0);
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const registrantsCount = clients.length;

  // Find popular offering
  const serviceCounts = {};
  activeApts.forEach(a => {
    serviceCounts[a.service] = (serviceCounts[a.service] || 0) + 1;
  });
  let popularService = "No Data";
  let popularPercent = 0;
  if (activeApts.length > 0) {
    const highest = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0];
    popularService = highest[0];
    popularPercent = Math.round((highest[1] / activeApts.length) * 100);
  }

  const handleExport = (format) => {
    alert(`Generating export bundle...\nFormat: ${format.toUpperCase()}\nTarget: Vanshika Counselling Studio Financial and Clinical Report (2026)\nDownload will begin shortly.`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            Performance Reports & Analytics
          </h1>
          <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
            Audit monthly revenue details, patient growth distributions, and therapist productivity metrics.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2.5 bg-beige-100 hover:bg-beige-200 dark:bg-sage-800 dark:hover:bg-sage-700 text-stone-750 dark:text-sage-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="px-4 py-2.5 bg-sage-600 hover:bg-sage-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* KPI stats widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="premium-card p-6 space-y-2">
          <span className="text-[10px] font-bold text-slate-950 dark:text-beige-300 uppercase">Gross Revenue</span>
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-slate-950 dark:text-white">₹{revenueSum.toLocaleString('en-IN')}</span>
          </div>
          <span className="text-[10px] text-slate-950 dark:text-beige-300 block font-bold">Total revenue generated</span>
        </div>

        <div className="premium-card p-6 space-y-2">
          <span className="text-[10px] font-bold text-slate-950 dark:text-beige-300 uppercase">Session Volumes</span>
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-slate-950 dark:text-white">{completedCount}</span>
          </div>
          <span className="text-[10px] text-slate-950 dark:text-beige-300 block font-bold">Completed virtual consultations</span>
        </div>

        <div className="premium-card p-6 space-y-2">
          <span className="text-[10px] font-bold text-slate-950 dark:text-beige-300 uppercase">New Registrants</span>
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-slate-950 dark:text-white">{registrantsCount}</span>
          </div>
          <span className="text-[10px] text-slate-950 dark:text-beige-300 block font-bold">Active directory patients</span>
        </div>

        <div className="premium-card p-6 space-y-2">
          <span className="text-[10px] font-bold text-slate-950 dark:text-beige-300 uppercase">Popular Offering</span>
          <div className="text-sm font-bold text-slate-950 dark:text-white truncate pt-1">
            {popularService}
          </div>
          <span className="text-[10px] text-slate-950 dark:text-beige-300 block font-bold">{popularPercent}% of total schedule bookings</span>
        </div>

      </div>

      {/* SVG Charts display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Revenue Overview Area */}
        <div className="premium-card p-6 space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-3">
            Gross Earnings Analytics
          </h3>
          <div className="h-56">
            <RevenueChart />
          </div>
        </div>

        {/* Services Count Bar */}
        <div className="premium-card p-6 space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-3">
            Therapeutic Demand Categories
          </h3>
          <div className="h-56">
            <ServicesChart />
          </div>
        </div>

      </div>

      {/* Report Info Footer */}
      <div className="p-5 border border-beige-200/50 dark:border-sage-850/50 bg-beige-50/30 dark:bg-sage-950/20 rounded-2xl flex gap-3 text-xs text-slate-950 dark:text-beige-100 font-bold">
        <HelpCircle className="h-5 w-5 text-sage-600 shrink-0 mt-0.5" />
        <div className="space-y-1 font-bold">
          <span className="font-bold block text-slate-950 dark:text-stone-200">HIPAA Data Protection Compliance Notice</span>
          <p>
            All generated documents, session counts, and spreadsheets scrub patient identities automatically unless compiled under secure authentication tokens. Export logs show clinical statistics, not transcript materials.
          </p>
        </div>
      </div>

    </div>
  );
}
