import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  services as initialServices, 
  therapists as initialTherapists, 
  initialAppointments, 
  initialTimeSlots, 
  initialClients, 
  initialNotifications 
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [activeClientTab, setActiveClientTab] = useState('Overview');
  const [activeAdminTab, setActiveAdminTab] = useState('Dashboard');

  // Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('guest'); // 'guest' | 'client' | 'admin'

  // Platform Data Collections
  const [services, setServices] = useState(initialServices);
  const [therapists, setTherapists] = useState(initialTherapists);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);
  const [clients, setClients] = useState(initialClients);
  const [systemNotifications, setSystemNotifications] = useState(initialNotifications);
  
  // Toast notifications
  const [notifications, setNotifications] = useState([]);
  
  // Theme Toggle
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode style class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Navigate Utility
  const navigateTo = (page, tab = null) => {
    setCurrentPage(page);
    if (tab) {
      if (page.startsWith('client-') || page === 'client-dashboard') {
        setActiveClientTab(tab);
      } else if (page.startsWith('admin-') || page === 'admin-dashboard') {
        setActiveAdminTab(tab);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast Alerts
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  // System Dashboard Notifications
  const addSystemNotification = (type, message) => {
    const newNotif = {
      id: Date.now(),
      type,
      message,
      date: new Date().toISOString().split('T')[0]
    };
    setSystemNotifications((prev) => [newNotif, ...prev]);
  };

  // Auth Functions
  const login = (email, password, role = 'client') => {
    if (role === 'admin') {
      setCurrentUser({
        name: 'Vanshika Singh',
        email: email || 'vanshika@counsellingstudio.com',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
        branding: 'Vanshika Counselling Studio Clinical Inc.',
        generalSettings: { siteName: 'Vanshika Counselling Studio', timezone: 'EST (GMT-5)' }
      });
      setUserRole('admin');
      navigateTo('admin-dashboard', 'Dashboard');
      addNotification('Authenticated successfully. Welcome to Clinical Portal.', 'success');
      addSystemNotification('Booking Updates', 'Vanshika Singh logged in from a new desktop device.');
    } else {
      setCurrentUser({
        name: 'Jane Doe',
        email: email || 'jane.doe@example.com',
        phone: '+1 555-0199',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
        communicationPreference: 'Email & SMS',
        emergencyName: 'John Doe',
        emergencyPhone: '+1 555-0100',
        bio: 'Overcoming situational workplace anxiety.'
      });
      setUserRole('client');
      navigateTo('client-dashboard', 'Overview');
      addNotification('Logged in successfully. Welcome to your mental wellness space.', 'success');
    }
  };

  const register = (name, email, phone, password) => {
    const newClient = {
      id: `C-0${clients.length + 1}`,
      name,
      email,
      phone,
      sessions: 0,
      status: 'Active'
    };
    setClients((prev) => [...prev, newClient]);
    setCurrentUser({
      name,
      email,
      phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      communicationPreference: 'Email',
      emergencyName: '',
      emergencyPhone: '',
      bio: ''
    });
    setUserRole('client');
    navigateTo('client-dashboard', 'Overview');
    addNotification('Account created successfully! Welcome to Vanshika Counselling Studio.', 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole('guest');
    navigateTo('home');
    addNotification('Logged out successfully.', 'info');
  };

  // Therapist Operations (CRUD)
  const addTherapist = (therapistData) => {
    const id = `th-${Date.now().toString().slice(-4)}`;
    const newTherapist = {
      id,
      rating: 4.8,
      ...therapistData
    };
    setTherapists((prev) => [...prev, newTherapist]);
    addNotification(`Therapist ${therapistData.name} registered successfully.`, 'success');
    addSystemNotification('Booking Updates', `New therapist profile added: ${therapistData.name}`);
  };

  const updateTherapist = (id, therapistData) => {
    setTherapists((prev) =>
      prev.map((th) => (th.id === id ? { ...th, ...therapistData } : th))
    );
    addNotification('Therapist profile updated.', 'success');
  };

  const deleteTherapist = (id) => {
    setTherapists((prev) => prev.filter((th) => th.id !== id));
    addNotification('Therapist profile removed from registry.', 'info');
  };

  // Appointment operations
  const addAppointment = (appointmentData) => {
    const id = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment = {
      id,
      clientName: currentUser ? currentUser.name : 'Jane Doe',
      clientEmail: currentUser ? currentUser.email : 'jane.doe@example.com',
      status: 'Confirmed',
      ...appointmentData,
      notes: ''
    };
    
    setAppointments((prev) => [newAppointment, ...prev]);
    
    // Block slot
    setTimeSlots((prevSlots) => 
      prevSlots.map((slot) => 
        slot.date === appointmentData.date && slot.time === appointmentData.time 
          ? { ...slot, status: 'blocked' } 
          : slot
      )
    );

    // Update clients sessions count
    if (currentUser) {
      setClients((prev) =>
        prev.map((c) =>
          c.email === currentUser.email ? { ...c, sessions: c.sessions + 1 } : c
        )
      );
    }

    addNotification(`Appointment scheduled! ID: ${id}`, 'success');
    addSystemNotification('Booking Updates', `New session scheduled: ${appointmentData.service} on ${appointmentData.date}.`);
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === id) {
          // Reactivate slot
          setTimeSlots((prevSlots) =>
            prevSlots.map((slot) =>
              slot.date === apt.date && slot.time === apt.time
                ? { ...slot, status: 'available' }
                : slot
            )
          );
          return { ...apt, status: 'Cancelled' };
        }
        return apt;
      })
    );
    addNotification(`Appointment ${id} cancelled.`, 'warning');
    addSystemNotification('Booking Updates', `Appointment ${id} has been cancelled by the patient.`);
  };

  const approveAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'Confirmed' } : apt))
    );
    addNotification(`Appointment ${id} approved.`, 'success');
    addSystemNotification('Booking Updates', `Appointment ${id} has been approved.`);
  };

  const rejectAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === id) {
          setTimeSlots((prevSlots) =>
            prevSlots.map((slot) =>
              slot.date === apt.date && slot.time === apt.time
                ? { ...slot, status: 'available' }
                : slot
            )
          );
          return { ...apt, status: 'Cancelled' };
        }
        return apt;
      })
    );
    addNotification(`Appointment ${id} rejected.`, 'warning');
  };

  const completeAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'Completed' } : apt))
    );
    addNotification(`Appointment ${id} completed.`, 'success');
  };

  const updateSessionNotes = (id, notes) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, notes } : apt))
    );
    addNotification('Clinical session notes saved.', 'success');
  };

  // Time Slot operations
  const createTimeSlot = (date, time) => {
    const id = `slot-${Date.now()}`;
    const newSlot = { id, date, time, status: 'available' };
    setTimeSlots((prev) => [...prev, newSlot]);
    addNotification(`Time slot configured for ${date} at ${time}.`, 'success');
  };

  const deleteTimeSlot = (id) => {
    setTimeSlots((prev) => prev.filter((slot) => slot.id !== id));
    addNotification('Time slot removed.', 'info');
  };

  const toggleSlotBlock = (id) => {
    setTimeSlots((prev) =>
      prev.map((slot) =>
        slot.id === id
          ? { ...slot, status: slot.status === 'blocked' ? 'available' : 'blocked' }
          : slot
      )
    );
    addNotification('Time slot block status toggled.', 'info');
  };

  const blockDate = (date) => {
    setTimeSlots((prev) =>
      prev.map((slot) => (slot.date === date ? { ...slot, status: 'blocked' } : slot))
    );
    addNotification(`Blocked all slots on date ${date}.`, 'warning');
  };

  // Services catalog management
  const updateService = (id, serviceData) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...serviceData } : s))
    );
    addNotification('Service catalog updated.', 'success');
  };

  // Client Profile Update
  const updateProfile = (profileData) => {
    setCurrentUser((prev) => ({ ...prev, ...profileData }));
    addNotification('Profile settings saved.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        activeClientTab,
        setActiveClientTab,
        activeAdminTab,
        setActiveAdminTab,
        navigateTo,
        currentUser,
        setCurrentUser,
        userRole,
        setUserRole,
        services,
        therapists,
        appointments,
        timeSlots,
        clients,
        systemNotifications,
        notifications,
        addNotification,
        addSystemNotification,
        darkMode,
        setDarkMode,
        login,
        register,
        logout,
        addTherapist,
        updateTherapist,
        deleteTherapist,
        addAppointment,
        cancelAppointment,
        approveAppointment,
        rejectAppointment,
        completeAppointment,
        updateSessionNotes,
        createTimeSlot,
        deleteTimeSlot,
        toggleSlotBlock,
        blockDate,
        updateService,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
