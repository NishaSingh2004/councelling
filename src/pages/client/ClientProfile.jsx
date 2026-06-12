import React, { useState } from 'react';
import { User, Lock, Mail, Phone, Bell, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ClientProfile() {
  const { currentUser, updateProfile } = useApp();
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || 'Jane Doe',
    email: currentUser?.email || 'jane.doe@example.com',
    phone: currentUser?.phone || '+1 555-0199',
    communicationPreference: currentUser?.communicationPreference || 'Email & SMS',
    bio: currentUser?.bio || 'Seeking mindfulness exercises to handle workplace stress.'
  });

  // Password state
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match.");
      return;
    }
    alert('Security Update: Password changed successfully.');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Client Profile
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Manage your personal details, credentials, and notification settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Personal Details Form (Col-7) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleProfileSubmit} className="premium-card p-6 md:p-8 space-y-6">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-4">
              Personal Information
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-stone-400" />
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-3 bg-beige-50 dark:bg-sage-950 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-stone-400" />
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-3 bg-beige-50 dark:bg-sage-950 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-stone-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-3 bg-beige-50 dark:bg-sage-950 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">
                  Therapy Notes / Bio Goals
                </label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-950 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-855 dark:text-white font-bold resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Personal Information</span>
            </button>
          </form>
        </div>

        {/* Password & Alerts (Col-5) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Change Password */}
          <form onSubmit={handlePasswordSubmit} className="premium-card p-6 space-y-5">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-3">
              Change Password
            </h3>
            
            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase">Current Password</label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-beige-50 dark:bg-sage-950 border border-beige-200 dark:border-sage-800 rounded-lg text-xs focus:outline-none text-stone-800 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase">New Password</label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-beige-50 dark:bg-sage-950 border border-beige-200 dark:border-sage-800 rounded-lg text-xs focus:outline-none text-stone-800 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase">Confirm New Password</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-beige-50 dark:bg-sage-950 border border-beige-200 dark:border-sage-800 rounded-lg text-xs focus:outline-none text-stone-800 dark:text-white font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-beige-100 hover:bg-beige-200 dark:bg-sage-800 dark:hover:bg-sage-700 text-stone-750 dark:text-white rounded-lg text-xs font-semibold transition-all"
            >
              Update Password
            </button>
          </form>

          {/* Preferences */}
          <div className="premium-card p-6 space-y-5">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-3">
              Communication Settings
            </h3>
            
            <div className="space-y-3 font-bold">
              <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase">Alert Channels</label>
              <select
                name="communicationPreference"
                value={profileData.communicationPreference}
                onChange={handleProfileChange}
                className="w-full px-3 py-2.5 bg-beige-50 dark:bg-sage-955 border border-beige-200 dark:border-sage-800 rounded-lg text-xs text-stone-750 dark:text-sage-300 focus:outline-none font-bold"
              >
                <option value="Email & SMS">Email & SMS Alerts (Recommended)</option>
                <option value="Email Only">Email Only</option>
                <option value="SMS Only">SMS Only</option>
                <option value="In-App Only">In-App Portal Notifications Only</option>
              </select>
            </div>

            <div className="text-[10px] text-slate-955 dark:text-beige-300 font-bold flex gap-2 pt-1 border-t border-beige-50 dark:border-sage-900">
              <Bell className="h-4 w-4 text-sage-500 shrink-0" />
              <span>We recommend keeping SMS active so you receive secure meeting links and cancellation notices directly on your phone.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
