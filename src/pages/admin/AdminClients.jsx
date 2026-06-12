import React, { useState } from 'react';
import { Search, Eye, Filter, UserCheck, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminClients() {
  const { clients } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter clients based on search query
  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Client Directory
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Search and review registration details, attended sessions, and patient statuses.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-sage-900 p-4 rounded-xl border border-beige-200/50 dark:border-sage-800/40">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name or email address..."
            className="w-full pl-10 pr-4 py-2.5 bg-beige-50 dark:bg-sage-955 border border-beige-200 dark:border-sage-800 rounded-lg text-xs text-stone-850 dark:text-white focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button className="px-4 py-2.5 bg-beige-100 hover:bg-beige-200 dark:bg-sage-800 dark:hover:bg-sage-700 text-stone-750 dark:text-sage-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="premium-card overflow-hidden">
        {filteredClients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-beige-100 dark:bg-sage-900/60 border-b border-beige-100 dark:border-sage-800/30 text-[10px] font-bold uppercase text-slate-950 dark:text-sage-500 tracking-wider">
                  <th className="py-4 px-6">Client Name</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">Phone Number</th>
                  <th className="py-4 px-6">Sessions Booked</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-100 dark:divide-sage-900/40 text-xs text-stone-700 dark:text-sage-350">
                {filteredClients.map((c) => (
                  <tr key={c.id} className="hover:bg-beige-50/20 dark:hover:bg-sage-900/10 transition-colors">
                    <td className="py-4 px-6 font-semibold text-stone-900 dark:text-stone-300">
                      {c.name}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-955 dark:text-beige-300 font-bold">
                      {c.email}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold">
                      {c.phone}
                    </td>
                    <td className="py-4 px-6 font-bold text-center sm:text-left">
                      {c.sessions}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 text-[9px] font-bold rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 uppercase tracking-wide">
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => alert(`Opening medical dashboard for client: ${c.name}\nTotal sessions: ${c.sessions}\nContact: ${c.phone}`)}
                        className="px-3.5 py-2 border border-beige-200 dark:border-sage-800 text-stone-600 dark:text-sage-350 hover:bg-beige-50 dark:hover:bg-sage-850 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all inline-flex"
                      >
                        <Eye className="h-3.5 w-3.5 text-sage-600" />
                        <span>View Records</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <Search className="h-10 w-10 text-stone-300 dark:text-sage-850 mx-auto" />
            <p className="text-xs text-slate-955 dark:text-beige-300 font-bold">
              No clients matched your search query.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
