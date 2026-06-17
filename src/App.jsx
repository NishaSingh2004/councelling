import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Menu, Heart } from 'lucide-react';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import NotificationToasts from './components/common/NotificationToasts';

// Import Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import Terms from './pages/public/Terms';
import ConsentNotice from './pages/public/ConsentNotice';

// Import Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Import Dashboard Contents
import ClientHome from './pages/client/ClientHome';
import BookAppointment from './pages/client/BookAppointment';
import MyAppointments from './pages/client/MyAppointments';
import SessionHistory from './pages/client/SessionHistory';
import Payments from './pages/client/Payments';
import ClientProfile from './pages/client/ClientProfile';

import AdminHome from './pages/admin/AdminHome';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminTimeSlots from './pages/admin/AdminTimeSlots';
import AdminClients from './pages/admin/AdminClients';
import AdminSessions from './pages/admin/AdminSessions';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';
import AdminCategories from './pages/admin/AdminCategories';

function AppContent() {
  const { currentPage, currentUser, userRole } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const isDashboard = (currentPage.startsWith('client-') || currentPage.startsWith('admin-')) && currentPage !== 'admin-login';

  const renderContent = () => {
    const isClientPage = currentPage.startsWith('client-');
    const isAdminPage = currentPage.startsWith('admin-') && currentPage !== 'admin-login';

    if (isClientPage && (!currentUser || userRole !== 'client')) {
      return (
        <div className="flex items-center justify-center min-h-[60vh] w-full">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            <span className="text-sm text-stone-500 font-light">Verifying secure credentials...</span>
          </div>
        </div>
      );
    }

    if (isAdminPage && (!currentUser || userRole !== 'admin')) {
      return (
        <div className="flex items-center justify-center min-h-[60vh] w-full">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            <span className="text-sm text-stone-500 font-light">Verifying secure credentials...</span>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      // Public Pages
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <Terms />;
      case 'consent':
        return <ConsentNotice />;
      case 'login':
        return <Login />;
      case 'admin-login':
        return <Login isAdminMode={true} />;
      case 'register':
        return <Register />;
      case 'forgot-password':
        return <ForgotPassword />;

      // Client Dashboard Pages
      case 'client-dashboard':
        return <ClientHome />;
      case 'client-book':
        return <BookAppointment />;
      case 'client-appointments':
        return <MyAppointments />;
      case 'client-history':
        return <SessionHistory />;
      case 'client-payments':
        return <Payments />;
      case 'client-profile':
        return <ClientProfile />;

      // Admin Dashboard Pages
      case 'admin-dashboard':
        return <AdminHome />;
      case 'admin-appointments':
        return <AdminAppointments />;
      case 'admin-slots':
        return <AdminTimeSlots />;
      case 'admin-clients':
        return <AdminClients />;
      case 'admin-sessions':
        return <AdminSessions />;
      case 'admin-reports':
        return <AdminReports />;
      case 'admin-settings':
        return <AdminSettings />;
      case 'admin-categories':
        return <AdminCategories />;

      case 'home':
      default:
        return <Home />;
    }
  };

  if (isDashboard) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-beige-100 dark:bg-[#0c1110] transition-colors duration-300">
        {/* Toast notifications */}
        <NotificationToasts />

        {/* Desktop Sidebar (always visible on left) */}
        <div className="hidden lg:block shrink-0">
          <Sidebar isOpen={isMobileSidebarOpen} setIsOpen={setIsMobileSidebarOpen} />
        </div>

        {/* Mobile/Tablet Top Header bar for Dashboards */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-beige-50 dark:bg-[#111614] border-b border-beige-200/50 dark:border-sage-900/40 sticky top-0 z-30 shadow-sm w-full">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-sage-600 fill-current" />
            <span className="font-serif text-base font-bold text-stone-900 dark:text-white">Vanshika Counselling Studio</span>
          </div>
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-stone-100 dark:bg-sage-900 text-stone-700 dark:text-sage-350"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile/Tablet Sidebar slide-out overlay drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-beige-50 dark:bg-[#111614] animate-fade-in shadow-xl z-50">
              <Sidebar isOpen={isMobileSidebarOpen} setIsOpen={setIsMobileSidebarOpen} />
            </div>
          </div>
        )}

        {/* Main Content Pane for Dashboards */}
        <div className="flex-1 flex flex-col min-h-screen lg:h-screen lg:overflow-y-auto w-full">
          <main className="flex-1 py-8 px-4 sm:py-12 sm:px-8 max-w-7xl w-full mx-auto">
            {renderContent()}
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  // Layout for Public / Marketing site
  return (
    <div className="flex flex-col min-h-screen bg-beige-100 dark:bg-slate-950 transition-colors duration-300">
      <NotificationToasts />

      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Pane */}
      <main className="flex-1 py-8 px-4 sm:py-12 sm:px-8 max-w-7xl w-full mx-auto animate-fade-in">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
