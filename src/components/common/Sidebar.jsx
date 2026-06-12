import React from 'react';
import { 
  Heart, Home, Compass, User, Mail, 
  LayoutDashboard, Calendar, CalendarDays, History, CreditCard, 
  Shield, CalendarCheck, Users, FileText, BarChart3, Settings, LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ThemeToggle from './ThemeToggle';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { currentPage, navigateTo, currentUser, userRole, login, logout } = useApp();

  const publicLinks = [
    { label: 'Home Page', icon: Home, page: 'home' },
    { label: 'Therapy Services', icon: Compass, page: 'services' },
    { label: 'About Vanshika', icon: User, page: 'about' },
    { label: 'Contact Us', icon: Mail, page: 'contact' },
  ];

  const clientLinks = [
    { label: 'Client Home', icon: LayoutDashboard, page: 'client-dashboard' },
    { label: 'Book Appointment', icon: Calendar, page: 'client-book' },
    { label: 'My Appointments', icon: CalendarDays, page: 'client-appointments' },
    { label: 'Session History', icon: History, page: 'client-history' },
    { label: 'Payments & Bills', icon: CreditCard, page: 'client-payments' },
    { label: 'My Profile', icon: User, page: 'client-profile' },
  ];

  const adminLinks = [
    { label: 'Clinical Home', icon: LayoutDashboard, page: 'admin-dashboard' },
    { label: 'Appointments Queue', icon: CalendarCheck, page: 'admin-appointments' },
    { label: 'Calendar Slots', icon: CalendarDays, page: 'admin-slots' },
    { label: 'Patient Directory', icon: Users, page: 'admin-clients' },
    { label: 'Session Notes', icon: FileText, page: 'admin-sessions' },
    { label: 'Reports & Analytics', icon: BarChart3, page: 'admin-reports' },
    { label: 'System Settings', icon: Settings, page: 'admin-settings' },
  ];

  const handleLinkClick = (page) => {
    navigateTo(page);
    setIsOpen(false); // Close mobile drawer on selection
  };

  return (
    <aside className="w-72 bg-beige-50 dark:bg-[#111614] border-r border-stone-200/50 dark:border-sage-900/40 flex flex-col justify-between h-screen sticky top-0 transition-colors duration-300 overflow-y-auto">
      
      {/* Top Branding Section */}
      <div className="p-6 border-b border-stone-100 dark:border-sage-900/30 flex items-center justify-between">
        <div 
          onClick={() => handleLinkClick('home')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="p-2 rounded-xl bg-sage-50 dark:bg-sage-900/40 text-sage-600 dark:text-sage-400 group-hover:scale-105 transition-all">
            <Heart className="h-5 w-5 fill-current" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-tight text-stone-900 dark:text-white block leading-tight">
              Vanshika
            </span>
            <span className="text-sage-600 dark:text-sage-400 font-sans font-light text-[10px] tracking-wider block uppercase mt-0.5">
              Counselling Studio
            </span>
          </div>
        </div>
        <div className="md:hidden">
          {/* Mobile close indicator could trigger here */}
        </div>
      </div>

      {/* Main Navigation Modules */}
      <div className="flex-1 py-6 px-4 space-y-7">
        {currentPage.startsWith('admin-') || currentPage === 'admin-dashboard' ? (
          /* Module: CLINICAL CONTROL */
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 px-3">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-bold text-slate-950 dark:text-sage-500 uppercase tracking-widest block">
                  Clinical Control
                </span>
              </div>
              <nav className="space-y-0.5">
                {adminLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = currentPage === link.page;
                  return (
                    <button
                      key={link.page}
                      onClick={() => handleLinkClick(link.page)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-sage-600 text-white shadow-sm font-bold'
                          : 'text-slate-955 dark:text-sage-400 hover:bg-stone-50 dark:hover:bg-sage-955/20 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="pt-4 border-t border-stone-100 dark:border-sage-900/20">
              <button
                onClick={() => handleLinkClick('home')}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-955 dark:text-sage-400 hover:bg-stone-50 dark:hover:bg-sage-955/20"
              >
                <Home className="h-4.5 w-4.5 text-stone-450" />
                <span>Return to Website</span>
              </button>
            </div>
          </div>
        ) : currentPage.startsWith('client-') || currentPage === 'client-dashboard' ? (
          /* Module: CLIENT PORTAL */
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-stone-400 dark:text-sage-500 uppercase tracking-widest px-3 block">
                Patient Workspace
              </span>
              <nav className="space-y-0.5">
                {clientLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = currentPage === link.page;
                  return (
                    <button
                      key={link.page}
                      onClick={() => handleLinkClick(link.page)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-sage-600 text-white shadow-sm font-bold'
                          : 'text-stone-500 dark:text-sage-400 hover:bg-stone-50 dark:hover:bg-sage-950/20 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="pt-4 border-t border-stone-100 dark:border-sage-900/20">
              <button
                onClick={() => handleLinkClick('home')}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-500 dark:text-sage-400 hover:bg-stone-50 dark:hover:bg-sage-950/20"
              >
                <Home className="h-4.5 w-4.5 text-stone-450" />
                <span>Return to Website</span>
              </button>
            </div>
          </div>
        ) : (
          /* Module: EXPLORE PLATFORM (Public Pages) */
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-stone-400 dark:text-sage-500 uppercase tracking-widest px-3 block">
                Explore Platform
              </span>
              <nav className="space-y-0.5">
                {publicLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = currentPage === link.page;
                  return (
                    <button
                      key={link.page}
                      onClick={() => handleLinkClick(link.page)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-sage-50 text-sage-700 dark:bg-sage-900/40 dark:text-sage-300'
                          : 'text-stone-500 dark:text-sage-400 hover:bg-stone-50 dark:hover:bg-sage-950/20 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-sage-600 dark:text-sage-300' : 'text-stone-400'}`} />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick access back to portal if logged in */}
            {currentUser && (
              <div className="pt-4 border-t border-stone-100 dark:border-sage-900/20">
                <button
                  onClick={() => handleLinkClick(userRole === 'admin' ? 'admin-dashboard' : 'client-dashboard')}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    userRole === 'admin' 
                      ? 'bg-sage-50 text-sage-700 border border-sage-200/50 hover:bg-sage-100/50' 
                      : 'bg-sage-50 text-sage-700 border border-sage-200/50 hover:bg-sage-100/50'
                  }`}
                >
                  <LayoutDashboard className="h-4.5 w-4.5" />
                  <span>Go to {userRole === 'admin' ? 'Clinical Control' : 'Patient Workspace'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>


      {/* Footer Profile & Configuration Section */}
      <div className="p-4.5 border-t border-stone-100 dark:border-sage-900/30 space-y-4">
        
        {/* User Card */}
        {currentUser ? (
          <div className="flex items-center justify-between bg-stone-50/50 dark:bg-sage-950/30 p-2.5 rounded-xl border border-stone-200/30 dark:border-sage-900/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-9 w-9 rounded-xl object-cover border border-stone-200/30 dark:border-sage-800"
              />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-stone-850 dark:text-stone-100 truncate">
                  {currentUser.name}
                </span>
                <span className="block text-[10px] text-stone-400 dark:text-sage-500 capitalize">
                  {userRole} Active
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 rounded-lg transition-colors"
              title="Logout session"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleLinkClick('login')}
              className="py-2 text-center text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-sage-900 dark:text-stone-200 rounded-xl transition-all"
            >
              Login
            </button>
            <button
              onClick={() => handleLinkClick('client-book')}
              className="py-2 text-center text-xs font-bold bg-sage-600 text-white rounded-xl shadow-sm hover:bg-sage-750 transition-all"
            >
              Book
            </button>
          </div>
        )}

        {/* Theme select & info */}
        <div className="flex items-center justify-between text-[11px] text-stone-400 dark:text-sage-500">
          <span>Theme Selector</span>
          <ThemeToggle />
        </div>

      </div>

    </aside>
  );
}
