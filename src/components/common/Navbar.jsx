import React, { useState } from 'react';
import { 
  Menu, X, Heart, Shield, User, LogOut, ChevronDown, 
  LayoutDashboard, Calendar, CalendarDays, History, CreditCard,
  CalendarCheck, Users, FileText, BarChart3, Settings, Compass, Mail, Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { currentPage, navigateTo, currentUser, userRole, logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isClientDashboard = currentPage.startsWith('client-') || currentPage === 'client-dashboard';
  const isAdminDashboard = (currentPage.startsWith('admin-') || currentPage === 'admin-dashboard') && currentPage !== 'admin-login';
  const isPublicPage = !isClientDashboard && !isAdminDashboard;

  const publicLinks = [
    { label: 'Home Page', page: 'home' },
    { label: 'Therapy Services', page: 'services' },
    { label: 'About Vanshika', page: 'about' },
    { label: 'Contact Us', page: 'contact' },
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
    { label: 'Counselling Categories', icon: Tag, page: 'admin-categories' },
    { label: 'Reports & Analytics', icon: BarChart3, page: 'admin-reports' },
    { label: 'System Settings', icon: Settings, page: 'admin-settings' },
  ];

  const activeLinks = isAdminDashboard 
    ? adminLinks 
    : isClientDashboard 
      ? clientLinks 
      : publicLinks;

  const handleNavClick = (page) => {
    navigateTo(page);
    setIsOpen(false);
  };

  // ─────────────────────────────────────────────────────────────
  // RIGHT-SIDE AUTH BUTTONS — Desktop
  // Rules:
  //   • Admin on public pages  → "Go to Clinical Portal" only (no sign-out)
  //   • Admin on admin pages   → "Go to Clinical Portal" + Sign Out (via sidebar is preferred)
  //   • Client anywhere        → avatar dropdown with Sign Out
  //   • admin-login page       → "Clinical Portal" badge only
  //   • Nobody logged in       → Sign In + Join buttons
  // ─────────────────────────────────────────────────────────────
  const renderDesktopAuthButtons = () => {
    // Admin on public site — only show "Go to Clinical Portal", NO sign-out
    if (currentUser && userRole === 'admin' && isPublicPage) {
      return (
        <button
          onClick={() => handleNavClick('admin-dashboard')}
          className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
        >
          <Shield className="h-3.5 w-3.5" />
          Go to Clinical Portal
        </button>
      );
    }

    // Admin inside their own dashboard — show portal button + sign out
    if (currentUser && userRole === 'admin' && isAdminDashboard) {
      return (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('admin-dashboard')}
            className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            Clinical Portal
          </button>
          <button
            onClick={() => logout()}
            className="px-3.5 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/10 rounded-xl transition-all"
          >
            Sign Out
          </button>
        </div>
      );
    }

    // Client logged in — avatar dropdown with Sign Out
    if (currentUser && userRole === 'client') {
      return (
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-9 w-9 rounded-xl object-cover border border-slate-200 dark:border-slate-800"
            />
            <span className="text-xs font-bold text-slate-955 dark:text-beige-100">
              {currentUser.name.split(' ')[0]}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-slide-up">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-1.5">
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {currentUser.name}
                  </span>
                  <span className="block text-[10px] text-slate-400 capitalize">
                    Client Account
                  </span>
                </div>

                {!isClientDashboard && (
                  <button
                    onClick={() => { handleNavClick('client-dashboard'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    Go to Patient Portal
                  </button>
                )}
                {isClientDashboard && (
                  <button
                    onClick={() => { handleNavClick('home'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    View Public Site
                  </button>
                )}

                <button
                  onClick={() => { logout(); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/10 border-t border-slate-100 dark:border-slate-800 mt-1.5 pt-1.5"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      );
    }

    // Admin login page — just show the Clinical Portal badge
    if (currentPage === 'admin-login') {
      return (
        <div className="px-3.5 py-2 bg-sage-50 text-sage-700 dark:bg-sage-950/30 dark:text-sage-350 text-[10px] font-bold rounded uppercase tracking-wider">
          Clinical Portal
        </div>
      );
    }

    // Nobody logged in — Sign In + Join buttons
    return (
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => handleNavClick('login')}
          className="px-4 py-2 text-xs font-bold text-slate-750 dark:text-beige-100 hover:text-primary transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={() => handleNavClick('register')}
          className="px-4.5 py-2.5 bg-primary hover:bg-primary-600 text-white rounded-xl text-xs font-bold shadow-md transition-all hover:-translate-y-0.5"
        >
          Join Vanshika Studio
        </button>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // MOBILE AUTH SECTION — same logic
  // ─────────────────────────────────────────────────────────────
  const renderMobileAuthSection = () => {
    // Admin on public site — only show "Go to Clinical Portal"
    if (currentUser && userRole === 'admin' && isPublicPage) {
      return (
        <button
          onClick={() => { handleNavClick('admin-dashboard'); setIsOpen(false); }}
          className="block w-full text-center py-2.5 px-4 bg-sage-600 hover:bg-sage-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <Shield className="h-3.5 w-3.5" />
          Go to Clinical Portal
        </button>
      );
    }

    // Admin inside admin pages
    if (currentUser && userRole === 'admin' && isAdminDashboard) {
      return (
        <div className="space-y-2 py-2">
          <button
            onClick={() => { handleNavClick('admin-dashboard'); setIsOpen(false); }}
            className="block w-full text-center py-2.5 px-4 bg-sage-600 hover:bg-sage-700 text-white rounded-xl text-xs font-bold transition-all"
          >
            Clinical Portal
          </button>
          <button
            onClick={() => { logout(); setIsOpen(false); }}
            className="block w-full text-center py-2 px-4 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl"
          >
            Sign Out
          </button>
        </div>
      );
    }

    // Client logged in
    if (currentUser && userRole === 'client') {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 px-4 py-1.5">
            <img src={currentUser.avatar} alt="" className="h-8 w-8 rounded-lg object-cover" />
            <div>
              <span className="block text-xs font-bold text-slate-850 dark:text-slate-200">{currentUser.name}</span>
              <span className="block text-[9px] text-slate-400 capitalize">Client Account</span>
            </div>
          </div>
          
          {!isClientDashboard && (
            <button
              onClick={() => { handleNavClick('client-dashboard'); setIsOpen(false); }}
              className="block w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-350"
            >
              Go to Patient Portal
            </button>
          )}
          {isClientDashboard && (
            <button
              onClick={() => { handleNavClick('home'); setIsOpen(false); }}
              className="block w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-350"
            >
              View Public Website
            </button>
          )}

          <button
            onClick={() => { logout(); setIsOpen(false); }}
            className="block w-full text-left px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/10 rounded-xl"
          >
            Sign Out
          </button>
        </div>
      );
    }

    // Admin login page
    if (currentPage === 'admin-login') {
      return (
        <div className="text-center py-2">
          <span className="px-3 py-1.5 bg-sage-50 text-sage-700 dark:bg-sage-950/30 dark:text-sage-350 text-xs font-bold rounded uppercase tracking-wider block">
            Clinical Portal
          </span>
        </div>
      );
    }

    // Nobody logged in
    return (
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={() => handleNavClick('login')}
          className="py-2.5 text-center text-xs font-bold border border-slate-200 rounded-xl text-slate-700"
        >
          Sign In
        </button>
        <button
          onClick={() => handleNavClick('register')}
          className="py-2.5 text-center text-xs font-bold bg-primary text-white rounded-xl"
        >
          Register
        </button>
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary group-hover:scale-105 transition-all">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-1.5 leading-none">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Vanshika
              </span>
              <span className="text-primary font-sans font-medium text-[10px] sm:text-sm tracking-wider uppercase">
                Counselling Studio
              </span>
            </div>
            {isAdminDashboard && (
              <span className="ml-2 px-2.5 py-0.5 bg-sage-50 text-sage-700 dark:bg-sage-950/30 dark:text-sage-350 text-[10px] font-bold rounded uppercase tracking-wider hidden sm:inline-block">
                Clinical Control
              </span>
            )}
            {isClientDashboard && (
              <span className="ml-2 px-2.5 py-0.5 bg-sage-50 text-sage-700 dark:bg-sage-950/30 dark:text-sage-350 text-[10px] font-bold rounded uppercase tracking-wider hidden sm:inline-block">
                Patient Workspace
              </span>
            )}
          </div>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            {activeLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-xs sm:text-sm font-bold transition-colors hover:text-primary relative py-1.5 ${
                  currentPage === item.page
                    ? 'text-primary'
                    : 'text-slate-955 dark:text-beige-100'
                }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
                )}
              </button>
            ))}
          </div>

          {/* Right Action Icons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            {renderDesktopAuthButtons()}
          </div>

          {/* Hamburger Icon (Mobile) */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-650"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-950 p-4 space-y-2 shadow-inner">
          {activeLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                currentPage === item.page
                  ? 'bg-primary-50 text-primary dark:bg-primary-950/20'
                  : 'text-slate-955 dark:text-beige-100 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="border-t border-slate-100 dark:border-slate-800 my-2 pt-2" />
          {renderMobileAuthSection()}
        </div>
      )}
    </nav>
  );
}
