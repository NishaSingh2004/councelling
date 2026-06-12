import React from 'react';
import { LayoutDashboard, Calendar, CalendarDays, History, CreditCard, User, LogOut, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const { currentPage, navigateTo, logout, currentUser } = useApp();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, page: 'client-dashboard' },
    { label: 'Book Appointment', icon: Calendar, page: 'client-book' },
    { label: 'My Appointments', icon: CalendarDays, page: 'client-appointments' },
    { label: 'Session History', icon: History, page: 'client-history' },
    { label: 'Payments', icon: CreditCard, page: 'client-payments' },
    { label: 'Profile', icon: User, page: 'client-profile' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-sage-950 border-r border-beige-200/50 dark:border-sage-900/40 flex flex-col justify-between h-[calc(100vh-80px)] sticky top-20 transition-all duration-300">
      
      {/* Menu Options */}
      <div className="p-6 space-y-7">
        <div className="px-3">
          <span className="text-xs font-semibold text-stone-400 dark:text-sage-500 uppercase tracking-widest block">Client Portal</span>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-sage-600 text-white shadow-sm'
                    : 'text-stone-500 dark:text-sage-400 hover:bg-beige-50 dark:hover:bg-sage-900/35 hover:text-stone-800 dark:hover:text-white'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-stone-400 dark:text-sage-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile & Logout Section */}
      <div className="p-6 border-t border-beige-100 dark:border-sage-900/50 space-y-4">
        {currentUser && (
          <div className="flex items-center gap-3 px-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-10 w-10 rounded-xl object-cover border border-stone-200 dark:border-sage-800"
            />
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-bold text-stone-850 dark:text-stone-250 truncate">
                {currentUser.name}
              </span>
              <span className="block text-[11px] text-stone-400 dark:text-sage-500 truncate">
                {currentUser.email}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
        >
          <LogOut className="h-4.5 w-4.5 text-rose-500" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}
