import React, { useState } from 'react';
import { Settings, Save, ShieldAlert, Key, Sliders, User, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminSettings() {
  const { currentUser, uploadAvatar, userRole, updateProfile, createService, addNotification, services } = useApp();
  
  const [profile, setProfile] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    title: currentUser?.bio || 'Lead Clinical Psychologist & Founder',
    price: 1500
  });

  const [systemConfigs, setSystemConfigs] = useState({
    sessionLength: '50 Minutes',
    videoQuality: 'High Definition (1080p)',
    notifyEmail: true,
    notifySms: true
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile({
      name: profile.name,
      email: profile.email,
      bio: profile.title
    });
  };

  const handleSystemSave = (e) => {
    e.preventDefault();
    addNotification('System telehealth settings saved.', 'success');
  };

  const [newCategory, setNewCategory] = useState({
    title: '',
    description: '',
    duration: '50 Mins',
    price: ''
  });

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const success = await createService(newCategory);
    if (success) {
      setNewCategory({
        title: '',
        description: '',
        duration: '50 Mins',
        price: ''
      });
    }
  };

  // ROLE GUARD — block non-admin access entirely
  if (userRole !== 'admin') {
    return (
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4 animate-fade-in">
        <div className="p-5 rounded-full bg-rose-50 dark:bg-rose-950/20">
          <AlertTriangle className="h-10 w-10 text-rose-500" />
        </div>
        <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white">Access Restricted</h2>
        <p className="text-sm text-stone-500 dark:text-beige-300 font-bold">
          This area is reserved for Clinical Administrators only.<br />You are currently logged in as a <span className="text-rose-500 uppercase">{userRole}</span>.
        </p>
        <div className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-700 dark:text-rose-400 font-bold flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          Admin credentials required to access this panel.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            Settings & Configurations
          </h1>
          <span className="px-2.5 py-1 rounded-full bg-sage-50 dark:bg-sage-900/40 border border-sage-200 dark:border-sage-800 text-sage-700 dark:text-sage-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Admin Only
          </span>
        </div>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Configure clinical parameters, calendar slot defaults, and session video features.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Profile Details (Col-7) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleProfileSave} className="premium-card p-6 md:p-8 space-y-6">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-4 flex items-center justify-between">
              <span>Therapist Profile Details</span>
              <span className="text-[10px] font-bold text-sage-600 dark:text-sage-400 bg-sage-50 dark:bg-sage-900/40 px-2 py-0.5 rounded capitalize">Admin · {currentUser?.email}</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Professional Title Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Bio Subtitle Designation</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({...profile, title: e.target.value})}
                  className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Default Consultation Hourly Fee (₹)</label>
                <input
                  type="number"
                  value={profile.price}
                  onChange={(e) => setProfile({...profile, price: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Save className="h-4.5 w-4.5" />
              <span>Save Profile Changes</span>
            </button>
          </form>

          {/* Create Counselling Category Card */}
          <form onSubmit={handleCategorySubmit} className="premium-card p-6 md:p-8 space-y-6 mt-8">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-4">
              Create Counselling Category
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Category Title</label>
                <input
                  type="text"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
                  placeholder="e.g., Anxiety Management"
                  required
                  className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Write a brief category description..."
                  rows="3"
                  required
                  className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-855 dark:text-white font-bold resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Duration</label>
                  <input
                    type="text"
                    value={newCategory.duration}
                    onChange={(e) => setNewCategory({...newCategory, duration: e.target.value})}
                    placeholder="e.g., 50 Mins"
                    required
                    className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">Hourly Fee (INR)</label>
                  <input
                    type="number"
                    value={newCategory.price}
                    onChange={(e) => setNewCategory({...newCategory, price: e.target.value})}
                    placeholder="e.g., 1800"
                    required
                    className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Save className="h-4.5 w-4.5" />
              <span>Create Counselling Category</span>
            </button>
          </form>

          {/* Active Categories List */}
          <div className="premium-card p-6 md:p-8 space-y-6 mt-8">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-4">
              Active Counselling Categories
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {services && services.map((service) => (
                <div key={service.id} className="flex justify-between items-start p-3 bg-beige-50 dark:bg-sage-955 rounded-xl border border-beige-200/50 dark:border-sage-850/40">
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-stone-900 dark:text-white">{service.title}</span>
                    <span className="block text-[10px] text-slate-950 dark:text-beige-300 font-bold leading-relaxed">{service.description}</span>
                    <span className="block text-[10px] text-slate-950 dark:text-beige-200 font-bold">Duration: {service.duration}</span>
                  </div>
                  <span className="text-xs font-bold text-sage-600 dark:text-sage-400 shrink-0 ml-3">{service.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clinical Prefs (Col-5) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Profile Picture Card */}
          <div className="premium-card p-6 flex flex-col items-center text-center space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-3 w-full text-left">
              Profile Picture
            </h3>
            <div className="relative group">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop'}
                alt={currentUser?.name}
                className="h-28 w-28 rounded-2xl object-cover border-2 border-sage-500 shadow-md transition-all group-hover:opacity-85"
              />
              <label className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-sage-600 text-white shadow hover:bg-sage-700 transition-all cursor-pointer">
                <User className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      uploadAvatar(file);
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>
            <div className="space-y-1">
              <span className="block text-sm font-bold text-stone-850 dark:text-stone-100">{currentUser?.name}</span>
              <span className="block text-xs text-stone-400 capitalize">{userRole} Account</span>
            </div>
          </div>

          {/* Telehealth Configuration */}
          <form onSubmit={handleSystemSave} className="premium-card p-6 space-y-5">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-3">
              Telehealth Workspace
            </h3>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase">Default Session Duration</label>
                <select
                  value={systemConfigs.sessionLength}
                  onChange={(e) => setSystemConfigs({...systemConfigs, sessionLength: e.target.value})}
                  className="w-full px-3 py-2.5 bg-beige-50 dark:bg-sage-950 border border-beige-200 dark:border-sage-800 rounded-lg text-xs text-stone-750 dark:text-sage-300 focus:outline-none"
                >
                  <option value="30 Minutes">30 Minutes</option>
                  <option value="50 Minutes">50 Minutes (Standard)</option>
                  <option value="60 Minutes">60 Minutes</option>
                  <option value="90 Minutes">90 Minutes</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase">Video Stream Protocol</label>
                <select
                  value={systemConfigs.videoQuality}
                  onChange={(e) => setSystemConfigs({...systemConfigs, videoQuality: e.target.value})}
                  className="w-full px-3 py-2.5 bg-beige-50 dark:bg-sage-950 border border-beige-200 dark:border-sage-800 rounded-lg text-xs text-stone-750 dark:text-sage-300 focus:outline-none"
                >
                  <option value="Standard Quality (480p)">Standard (Low Bandwidth)</option>
                  <option value="High Quality (720p)">High Quality (720p)</option>
                  <option value="High Definition (1080p)">Full HD (1080p - HIPAA recommended)</option>
                </select>
              </div>

              <div className="space-y-2.5 pt-2 font-bold">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-950 dark:text-beige-100">
                  <input
                    type="checkbox"
                    checked={systemConfigs.notifyEmail}
                    onChange={(e) => setSystemConfigs({...systemConfigs, notifyEmail: e.target.checked})}
                    className="rounded border-beige-300 dark:border-sage-850 text-sage-600 focus:ring-sage-500"
                  />
                  <span>Email summaries of intake forms</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-950 dark:text-beige-100">
                  <input
                    type="checkbox"
                    checked={systemConfigs.notifySms}
                    onChange={(e) => setSystemConfigs({...systemConfigs, notifySms: e.target.checked})}
                    className="rounded border-beige-300 dark:border-sage-850 text-sage-600 focus:ring-sage-500"
                  />
                  <span>SMS alert notifications for queues</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-beige-100 hover:bg-beige-200 dark:bg-sage-800 dark:hover:bg-sage-700 text-stone-750 dark:text-white rounded-lg text-xs font-semibold transition-all"
            >
              Update Preferences
            </button>
          </form>

          {/* Security alerts */}
          <div className="p-4 bg-amber-50/50 dark:bg-amber-950/15 border border-amber-500/10 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4" />
              <span>HIPAA Portal Regulations</span>
            </h4>
            <p className="text-[10px] text-slate-950 dark:text-beige-200 leading-normal font-bold">
              Automatic screen lockout occurs after 15 minutes of idle time. Auditing records trace all clinical note edits to guarantee medical records compliance under federal rules.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
