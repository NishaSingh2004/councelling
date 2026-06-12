import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHome from './AdminHome';
import AdminAppointments from './AdminAppointments';
import AdminTimeSlots from './AdminTimeSlots';
import AdminClients from './AdminClients';
import AdminSessions from './AdminSessions';
import AdminReports from './AdminReports';
import AdminSettings from './AdminSettings';

export default function AdminDashboard() {
  const { currentPage, currentUser, login, userRole } = useApp();

  // Safeguard: auto-login as Admin if accessed directly
  useEffect(() => {
    if (!currentUser || userRole !== 'admin') {
      login('vanshika@vanshikacounselling.com', 'adminpass', 'admin');
    }
  }, [currentUser, userRole]);

  if (!currentUser || userRole !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-600" />
          <span className="text-sm text-slate-950 dark:text-beige-100 font-bold">Loading secure clinical portal...</span>
        </div>
      </div>
    );
  }

  // Sub-page router resolver
  const renderSubPage = () => {
    switch (currentPage) {
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
      case 'admin-dashboard':
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        
        {/* Left Sidebar */}
        <div className="hidden md:block shrink-0">
          <AdminSidebar />
        </div>

        {/* Right Content */}
        <main className="flex-1 py-8 overflow-x-hidden min-h-[calc(100vh-80px)]">
          {renderSubPage()}
        </main>

      </div>
    </div>
  );
}
