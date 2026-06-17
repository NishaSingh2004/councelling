import React, { createContext, useContext, useState, useEffect } from 'react';
// Mock data has been completely removed for production use

const AppContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

// Separate token keys so admin and client sessions are completely independent
const ADMIN_TOKEN_KEY = 'counselling_admin_token';
const CLIENT_TOKEN_KEY = 'counselling_client_token';

// URL Path mapping helper
const pageToPath = (page) => {
  if (page === 'home') return '/';
  if (page === 'admin-login') return '/vanshika-admin-login';
  if (page === 'client-dashboard') return '/client/dashboard';
  if (page === 'admin-dashboard') return '/admin/dashboard';
  if (page.startsWith('client-')) return `/client/${page.replace('client-', '')}`;
  if (page.startsWith('admin-')) return `/admin/${page.replace('admin-', '')}`;
  return `/${page}`;
};

const pathToPage = (path) => {
  const p = path.replace(/\/$/, '') || '/';
  if (p === '/' || p === '/home') return 'home';
  if (p === '/vanshika-admin-login') return 'admin-login';
  if (p === '/client/dashboard') return 'client-dashboard';
  if (p === '/admin/dashboard') return 'admin-dashboard';
  if (p.startsWith('/client/')) return `client-${p.replace('/client/', '')}`;
  if (p.startsWith('/admin/')) return `admin-${p.replace('/admin/', '')}`;
  return p.replace('/', '');
};

const guardPage = (page, role) => {
  if (role === 'admin') {
    // Admin already logged in — redirect away from ADMIN login page only
    if (page === 'admin-login') return 'admin-dashboard';
    // Admin cannot access client dashboard pages
    if (page.startsWith('client-')) return 'admin-dashboard';
    // Admin CAN visit public pages (home, services, login, etc.) freely
  }
  if (role === 'client') {
    // Client already logged in — redirect away from CLIENT login page only
    if (page === 'login' || page === 'register') return 'client-dashboard';
    // Client cannot access admin pages at all
    if (page === 'admin-login' || page.startsWith('admin-')) return 'client-dashboard';
  }
  if (role === 'guest') {
    // Unauthenticated user cannot access protected pages
    if (page.startsWith('admin-') && page !== 'admin-login') return 'admin-login';
    if (page.startsWith('client-')) return 'login';
  }
  return page;
};

export const AppProvider = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState(() => {
    return pathToPage(window.location.pathname);
  });
  const [activeClientTab, setActiveClientTab] = useState('Overview');
  const [activeAdminTab, setActiveAdminTab] = useState('Dashboard');

  // Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('guest'); // 'guest' | 'client' | 'admin'

  // Platform Data Collections
  const [services, setServices] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [clients, setClients] = useState([]);
  const [systemNotifications, setSystemNotifications] = useState([]);
  
  // Reports State
  const [reportsData, setReportsData] = useState({
    grossRevenue: 0,
    sessionsCount: 0,
    appointmentsOverview: [],
    revenueOverview: [
      { month: 'Jan', amount: 0 },
      { month: 'Feb', amount: 0 },
      { month: 'Mar', amount: 0 },
      { month: 'Apr', amount: 0 },
      { month: 'May', amount: 0 },
      { month: 'Jun', amount: 0 }
    ]
  });

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

  // Fetch all base (public) data
  const fetchBaseData = async () => {
    try {
      const resServices = await fetch(`${API_BASE_URL}/api/services`);
      if (resServices.ok) {
        const data = await resServices.json();
        setServices(data);
      }

      const resSlots = await fetch(`${API_BASE_URL}/api/slots`);
      if (resSlots.ok) {
        const data = await resSlots.json();
        setTimeSlots(data);
      }
    } catch (err) {
      console.error('Failed to fetch public base data:', err);
    }
  };

  // Fetch authenticated user data
  const fetchUserData = async (token, role) => {
    if (!token) return;
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      const resApts = await fetch(`${API_BASE_URL}/api/appointments`, { headers });
      if (resApts.ok) {
        const data = await resApts.json();
        setAppointments(data);
      }

      if (role === 'admin') {
        const resClients = await fetch(`${API_BASE_URL}/api/admin/clients`, { headers });
        if (resClients.ok) {
          const data = await resClients.json();
          setClients(data);
        }

        const resReports = await fetch(`${API_BASE_URL}/api/admin/reports`, { headers });
        if (resReports.ok) {
          const data = await resReports.json();
          setReportsData({
            grossRevenue: data.grossRevenue,
            sessionsCount: data.sessionsCount,
            revenueOverview: data.revenueOverview,
            appointmentsOverview: data.demands.map(d => ({
              service: d.service.replace(' Counselling', '').replace(' Support', '').replace(' Therapy', '').replace(' Mediation', ''),
              count: d.count
            }))
          });
        }
      }
    } catch (err) {
      console.error('Failed to fetch authenticated user data:', err);
    }
  };

  // Initialize Auth on boot
  useEffect(() => {
    const initializeAuth = async () => {
      // One-time cleanup: remove the old shared token key from previous versions
      localStorage.removeItem('counselling_token');

      // Determine which token to try based on URL path
      // Admin paths (/admin/*, /vanshika-admin-login) use admin token
      // All other paths (public, /login, /client/*) use client token
      const currentPath = window.location.pathname;
      const isAdminPath = currentPath.startsWith('/admin/') || currentPath === '/vanshika-admin-login';
      const tokenKey = isAdminPath ? ADMIN_TOKEN_KEY : CLIENT_TOKEN_KEY;
      const token = localStorage.getItem(tokenKey);

      let role = 'guest';
      let user = null;

      if (token) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            user = data.user;
            role = data.user.role;
            setCurrentUser(user);
            setUserRole(role);
          } else {
            // Token expired or invalid — clear it
            localStorage.removeItem(tokenKey);
          }
        } catch (err) {
          console.error('Auth initialization check failed:', err);
        }
      }

      // Base public data fetch
      await fetchBaseData();

      // Guard initial route
      const initialPage = pathToPage(window.location.pathname);
      const guarded = guardPage(initialPage, role);
      setCurrentPage(guarded);

      if (guarded !== initialPage) {
        window.history.replaceState(null, '', pageToPath(guarded));
      }

      // Fetch user data if authorized
      if (role !== 'guest' && token) {
        await fetchUserData(token, role);
      }
    };

    initializeAuth();
  }, []);

  // Popstate navigation listener
  useEffect(() => {
    const handlePopState = () => {
      const page = pathToPage(window.location.pathname);
      const guarded = guardPage(page, userRole);
      setCurrentPage(guarded);
      if (guarded !== page) {
        window.history.replaceState(null, '', pageToPath(guarded));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [userRole]);

  // Navigate Utility
  const navigateTo = (page, tab = null) => {
    const guarded = guardPage(page, userRole);
    setCurrentPage(guarded);

    const path = pageToPath(guarded);
    window.history.pushState(null, '', path);

    if (tab) {
      if (guarded.startsWith('client-') || guarded === 'client-dashboard') {
        setActiveClientTab(tab);
      } else if (guarded.startsWith('admin-') || guarded === 'admin-dashboard') {
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

  const getAuthHeaders = () => {
    // Use the correct token based on the currently active user role
    const tokenKey = userRole === 'admin' ? ADMIN_TOKEN_KEY : CLIENT_TOKEN_KEY;
    const token = localStorage.getItem(tokenKey);
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Auth Functions
  const login = async (email, password, role = 'client') => {
    try {
      const res = await fetch(API_BASE_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        addNotification(data.message || 'Login failed!', 'warning');
        return;
      }
      
      // Enforce only admin can log in on the admin login page
      if (role === 'admin' && data.user.role !== 'admin') {
        addNotification('Access denied: Clinical credentials required!', 'warning');
        return;
      }
      
      // Enforce admin cannot log in on client login page
      if (role === 'client' && data.user.role === 'admin') {
        addNotification('Access denied: Admins must login via Clinical Portal.', 'warning');
        return;
      }
      
      // Save to role-specific token key so sessions stay independent
      const tokenKey = data.user.role === 'admin' ? ADMIN_TOKEN_KEY : CLIENT_TOKEN_KEY;
      localStorage.setItem(tokenKey, data.token);
      setCurrentUser(data.user);
      setUserRole(data.user.role);
      
      await fetchUserData(data.token, data.user.role);
      
      if (data.user.role === 'admin') {
        navigateTo('admin-dashboard', 'Dashboard');
        addNotification('Authenticated successfully. Welcome to Clinical Portal.', 'success');
        addSystemNotification('Booking Updates', 'Vanshika Singh logged in from a new desktop device.');
      } else {
        navigateTo('client-dashboard', 'Overview');
        addNotification('Logged in successfully. Welcome to your mental wellness space.', 'success');
      }
    } catch (err) {
      console.error('Login request failed:', err);
      addNotification('Network error during login.', 'warning');
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      const data = await res.json();
      if (!res.ok) {
        addNotification(data.message || 'Registration failed!', 'warning');
        return;
      }

      // New registrations are always clients
      localStorage.setItem(CLIENT_TOKEN_KEY, data.token);
      setCurrentUser(data.user);
      setUserRole(data.user.role);
      
      await fetchUserData(data.token, data.user.role);
      navigateTo('client-dashboard', 'Overview');
      addNotification('Account created successfully! Welcome to Vanshika Counselling Studio.', 'success');
    } catch (err) {
      console.error('Registration request failed:', err);
      addNotification('Network error during registration.', 'warning');
    }
  };

  const logout = () => {
    const wasAdmin = userRole === 'admin';
    // Only remove THIS role's token — the other session stays intact
    localStorage.removeItem(wasAdmin ? ADMIN_TOKEN_KEY : CLIENT_TOKEN_KEY);
    setCurrentUser(null);
    setUserRole('guest');
    setAppointments([]);
    setClients([]);
    setReportsData({
      grossRevenue: 0,
      sessionsCount: 0,
      appointmentsOverview: [],
      revenueOverview: [
        { month: 'Jan', amount: 0 },
        { month: 'Feb', amount: 0 },
        { month: 'Mar', amount: 0 },
        { month: 'Apr', amount: 0 },
        { month: 'May', amount: 0 },
        { month: 'Jun', amount: 0 }
      ]
    });
    setSystemNotifications([]);
    // Admin goes back to admin login, client goes back to client login
    const logoutPage = wasAdmin ? 'admin-login' : 'login';
    setCurrentPage(logoutPage);
    window.history.pushState(null, '', pageToPath(logoutPage));
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
  const addAppointment = async (appointmentData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          service: appointmentData.service,
          date: appointmentData.date,
          time: appointmentData.time,
          price: appointmentData.price || 1500,
          notes: appointmentData.paymentId ? 'Razorpay Payment ID: ' + appointmentData.paymentId : ''
        })
      });
      const data = await res.json();
      if (!res.ok) {
        addNotification(data.message || 'Scheduling failed!', 'warning');
        return;
      }
      
      await fetchBaseData();
      await fetchUserData(localStorage.getItem('counselling_token'), userRole);
      
      addNotification(`Appointment scheduled! ID: ${data.id}`, 'success');
      addSystemNotification('Booking Updates', `New session scheduled: ${appointmentData.service} on ${appointmentData.date}.`);
    } catch (err) {
      console.error('Add appointment failed:', err);
      addNotification('Network error scheduling session.', 'warning');
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}/cancel`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Cancellation failed!', 'warning');
        return;
      }
      await fetchBaseData();
      await fetchUserData(localStorage.getItem('counselling_token'), userRole);
      addNotification(`Appointment ${id} cancelled.`, 'warning');
      addSystemNotification('Booking Updates', `Appointment ${id} has been cancelled by the patient.`);
    } catch (err) {
      console.error('Cancel appointment failed:', err);
    }
  };

  const approveAppointment = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}/approve`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Approval failed!', 'warning');
        return;
      }
      await fetchUserData(localStorage.getItem('counselling_token'), userRole);
      addNotification(`Appointment ${id} approved.`, 'success');
      addSystemNotification('Booking Updates', `Appointment ${id} has been approved.`);
    } catch (err) {
      console.error('Approve appointment failed:', err);
    }
  };

  const rejectAppointment = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}/reject`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Rejection failed!', 'warning');
        return;
      }
      await fetchBaseData();
      await fetchUserData(localStorage.getItem('counselling_token'), userRole);
      addNotification(`Appointment ${id} rejected.`, 'warning');
    } catch (err) {
      console.error('Reject appointment failed:', err);
    }
  };

  const completeAppointment = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}/complete`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Completion failed!', 'warning');
        return;
      }
      await fetchUserData(localStorage.getItem('counselling_token'), userRole);
      addNotification(`Appointment ${id} completed.`, 'success');
    } catch (err) {
      console.error('Complete appointment failed:', err);
    }
  };

  const updateSessionNotes = async (id, notes) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}/notes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ notes })
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Failed to save notes!', 'warning');
        return;
      }
      await fetchUserData(localStorage.getItem(userRole === 'admin' ? ADMIN_TOKEN_KEY : CLIENT_TOKEN_KEY), userRole);
      addNotification('Notes saved successfully.', 'success');
    } catch (err) {
      console.error('Update notes failed:', err);
      addNotification('Network error saving notes.', 'warning');
    }
  };

  const generateMeetLink = async (aptId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${aptId}/meet`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Failed to generate Meet link!', 'warning');
        return false;
      }
      await fetchUserData(localStorage.getItem(userRole === 'admin' ? ADMIN_TOKEN_KEY : CLIENT_TOKEN_KEY), userRole);
      addNotification('Google Meet link generated successfully.', 'success');
      return true;
    } catch (err) {
      console.error('Generate meet link failed:', err);
      addNotification('Network error generating Meet link.', 'warning');
      return false;
    }
  };

  // Time Slot operations
  const createTimeSlot = async (date, time) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/slots`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ date, time })
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Failed to create slot!', 'warning');
        return;
      }
      await fetchBaseData();
      addNotification(`Time slot configured for ${date} at ${time}.`, 'success');
    } catch (err) {
      console.error('Create slot failed:', err);
    }
  };

  const deleteTimeSlot = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/slots/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Failed to delete slot!', 'warning');
        return;
      }
      await fetchBaseData();
      addNotification('Time slot removed.', 'info');
    } catch (err) {
      console.error('Delete slot failed:', err);
    }
  };

  const toggleSlotBlock = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/slots/${id}/toggle-block`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Failed to toggle block status!', 'warning');
        return;
      }
      await fetchBaseData();
      addNotification('Time slot block status toggled.', 'info');
    } catch (err) {
      console.error('Toggle block slot failed:', err);
    }
  };

  const blockDate = async (date) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/slots/block-date`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ date })
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Failed to block date!', 'warning');
        return;
      }
      await fetchBaseData();
      addNotification(`Blocked all slots on date ${date}.`, 'warning');
    } catch (err) {
      console.error('Block date failed:', err);
    }
  };

  // Services catalog management
  const updateService = async (id, serviceData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: serviceData.title,
          description: serviceData.description,
          duration: serviceData.duration,
          price: parseInt(serviceData.price)
        })
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Failed to update service category!', 'warning');
        return false;
      }
      await fetchBaseData();
      addNotification('Category updated successfully.', 'success');
      return true;
    } catch (err) {
      console.error('Update service category failed:', err);
      addNotification('Network error updating category.', 'warning');
      return false;
    }
  };

  const deleteService = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Failed to delete service category!', 'warning');
        return false;
      }
      await fetchBaseData();
      addNotification('Category deleted successfully.', 'success');
      return true;
    } catch (err) {
      console.error('Delete service category failed:', err);
      addNotification('Network error deleting category.', 'warning');
      return false;
    }
  };

  const createService = async (serviceData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/services`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: serviceData.title,
          description: serviceData.description,
          duration: serviceData.duration || '50 Mins',
          price: parseInt(serviceData.price)
        })
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Failed to create service category!', 'warning');
        return false;
      }
      await fetchBaseData();
      addNotification('Counselling category created successfully.', 'success');
      return true;
    } catch (err) {
      console.error('Create service category failed:', err);
      addNotification('Network error creating service category.', 'warning');
      return false;
    }
  };

  // Client Profile Update
  const updateProfile = async (profileData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: profileData.name,
          phone: profileData.phone,
          bio: profileData.bio,
          communicationPreference: profileData.communicationPreference
        })
      });
      if (!res.ok) {
        const data = await res.json();
        addNotification(data.message || 'Failed to update profile!', 'warning');
        return;
      }
      setCurrentUser((prev) => ({ ...prev, ...profileData }));
      addNotification('Profile settings saved.', 'success');
    } catch (err) {
      console.error('Update profile failed:', err);
    }
  };

  const uploadAvatar = async (file) => {
    try {
      const token = localStorage.getItem('counselling_token');
      const formData = new FormData();
      formData.append('avatar', file);

      const res = await fetch(`${API_BASE_URL}/api/profile/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      });
      
      const data = await res.json();
      if (!res.ok) {
        addNotification(data.message || 'Image upload failed!', 'warning');
        return null;
      }
      
      setCurrentUser(data.user);
      addNotification('Profile picture updated.', 'success');
      return data.avatar;
    } catch (err) {
      console.error('Image upload request failed:', err);
      addNotification('Network error uploading profile image.', 'warning');
      return null;
    }
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
        generateMeetLink,
        createTimeSlot,
        deleteTimeSlot,
        toggleSlotBlock,
        blockDate,
        updateService,
        deleteService,
        createService,
        updateProfile,
        uploadAvatar,
        reportsData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

