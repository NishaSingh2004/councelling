import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Sidebar from '../../components/client/Sidebar';
import ClientHome from './ClientHome';
import BookAppointment from './BookAppointment';
import MyAppointments from './MyAppointments';
import SessionHistory from './SessionHistory';
import Payments from './Payments';
import ClientProfile from './ClientProfile';

export default function ClientDashboard() {
  const { currentPage, currentUser, login } = useApp();

  // Safeguard: make sure user is logged in
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-600" />
          <span className="text-sm text-stone-500 font-light">Loading secure portal...</span>
        </div>
      </div>
    );
  }

  // Sub-page routing resolver
  const renderSubPage = () => {
    switch (currentPage) {
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
      case 'client-dashboard':
      default:
        return <ClientHome />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        
        {/* Left Sidebar */}
        <div className="hidden md:block shrink-0">
          <Sidebar />
        </div>

        {/* Right Content */}
        <main className="flex-1 py-8 overflow-x-hidden min-h-[calc(100vh-80px)]">
          {renderSubPage()}
        </main>

      </div>
    </div>
  );
}
