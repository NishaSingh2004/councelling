import { Users, CalendarDays, IndianRupee, CheckCircle2, ChevronRight, Check, X, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RevenueChart, ServicesChart } from '../../components/admin/ChartContainer';

export default function AdminHome() {
  const { appointments, clients, approveAppointment, rejectAppointment, navigateTo } = useApp();

  // Compute metrics dynamically from state
  const totalClients = clients.length;
  const todayApts = appointments.filter(a => a.status === 'Pending' || a.date === '2026-06-11');
  const completedSessionsCount = appointments.filter(a => a.status === 'Completed').length + 80; // Scaled mock
  const activeApts = appointments.filter(a => a.status !== 'Cancelled');
  const revenueSum = activeApts.reduce((acc, a) => acc + (a.price || 1500), 0);

  const metrics = [
    { label: 'Total Patients', value: totalClients, icon: Users, color: 'text-sage-600 bg-sage-50 dark:text-sage-400 dark:bg-sage-950/40' },
    { label: 'Today\'s Workload', value: todayApts.length, icon: CalendarDays, color: 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/40' },
    { label: 'Monthly Revenue', value: `₹${revenueSum}`, icon: IndianRupee, color: 'text-sage-600 bg-sage-50 dark:text-sage-400 dark:bg-sage-950/40' },
    { label: 'Sessions Completed', value: completedSessionsCount, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Clinical Overview
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Welcome back, Vanshika Singh. Here is a summary of your clinical activities.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="premium-card p-6 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-slate-950 dark:text-beige-300 uppercase tracking-wider font-bold block">{m.label}</span>
                <span className="font-serif text-2xl font-bold text-slate-950 dark:text-white block">{m.value}</span>
              </div>
              <div className={`p-3 rounded-xl ${m.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* SVG Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Revenue Overview */}
        <div className="premium-card p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-beige-100 dark:border-sage-800/40 pb-3">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">Revenue Overview</h3>
            <span className="text-[10px] bg-sky-50 dark:bg-sky-950/20 text-sky-600 font-semibold px-2 py-0.5 rounded uppercase">Monthly Trend</span>
          </div>
          <div className="h-56 flex items-center justify-center">
            <RevenueChart />
          </div>
        </div>

        {/* Appointments Overview */}
        <div className="premium-card p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-beige-100 dark:border-sage-800/40 pb-3">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">Services Distribution</h3>
            <span className="text-[10px] bg-sage-50 dark:bg-sage-950/20 text-sage-600 font-semibold px-2 py-0.5 rounded uppercase font-sans">Therapy Styles</span>
          </div>
          <div className="h-56 flex items-center justify-center">
            <ServicesChart />
          </div>
        </div>

      </div>

      {/* Recent Appointments Queue */}
      <div className="premium-card overflow-hidden">
        <div className="p-5 border-b border-beige-100 dark:border-sage-800/40 flex justify-between items-center">
          <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">
            Recent Appointments Queue
          </h3>
          <button
            onClick={() => navigateTo('admin-appointments')}
            className="text-xs font-semibold text-sage-600 hover:text-sage-700 dark:text-sage-400 flex items-center gap-1"
          >
            <span>Manage Queue</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-beige-100 dark:bg-sage-900/60 border-b border-beige-100 dark:border-sage-800/30 text-[10px] font-bold uppercase text-slate-950 dark:text-sage-500 tracking-wider">
                <th className="py-4 px-6">Client Name</th>
                <th className="py-4 px-6">Service Type</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Time</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100 dark:divide-sage-900/40 text-xs text-stone-700 dark:text-sage-350">
              {appointments.slice(0, 4).map((apt) => (
                <tr key={apt.id} className="hover:bg-beige-50/20 dark:hover:bg-sage-900/10 transition-colors">
                  <td className="py-4 px-6 font-semibold text-stone-900 dark:text-stone-300">
                    {apt.clientName}
                  </td>
                  <td className="py-4 px-6 font-serif font-bold text-stone-850 dark:text-white">
                    {apt.service}
                  </td>
                  <td className="py-4 px-6 font-medium">{apt.date}</td>
                  <td className="py-4 px-6 font-medium">{apt.time}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider ${
                      apt.status === 'Confirmed'
                        ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/20 dark:text-sky-400'
                        : apt.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400'
                        : apt.status === 'Cancelled'
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right flex items-center justify-end gap-2">
                    {apt.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => approveAppointment(apt.id)}
                          className="p-1.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                          title="Approve Session"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => rejectAppointment(apt.id)}
                          className="p-1.5 bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 rounded-lg hover:bg-rose-600 hover:text-white transition-all"
                          title="Reject Session"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => navigateTo('admin-sessions')}
                      className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-white hover:bg-beige-50 dark:hover:bg-sage-900 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
