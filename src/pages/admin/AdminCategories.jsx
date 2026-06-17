import React, { useState } from 'react';
import { Plus, Save, Tag, Clock, IndianRupee, Trash2, CheckCircle2, AlertTriangle, Edit2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminCategories() {
  const { services, createService, updateService, deleteService, addNotification, userRole } = useApp();

  const [form, setForm] = useState({
    title: '',
    description: '',
    duration: '50 Mins',
    price: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justCreated, setJustCreated] = useState(null);

  // Inline editing state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  // Role guard
  if (userRole !== 'admin') {
    return (
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4 animate-fade-in">
        <div className="p-5 rounded-full bg-rose-50 dark:bg-rose-950/20">
          <AlertTriangle className="h-10 w-10 text-rose-500" />
        </div>
        <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white">Access Restricted</h2>
        <p className="text-sm text-stone-500 dark:text-beige-300 font-bold">Admin credentials required.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price) {
      addNotification('Please fill in the category title and price.', 'warning');
      return;
    }
    setIsSubmitting(true);
    const success = await createService(form);
    setIsSubmitting(false);
    if (success) {
      setJustCreated(form.title);
      setForm({ title: '', description: '', duration: '50 Mins', price: '' });
      setTimeout(() => setJustCreated(null), 3000);
    }
  };

  const startEditing = (service) => {
    setEditingId(service.id);
    setEditForm({
      title: service.title,
      description: service.description || '',
      duration: service.duration || '50 Mins',
      price: service.priceRaw || service.price.replace('₹', '')
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdit = async (id) => {
    if (!editForm.title.trim() || !editForm.price) {
      addNotification('Please fill in the category title and price.', 'warning');
      return;
    }
    const success = await updateService(id, editForm);
    if (success) {
      cancelEditing();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this counselling category? It will be removed from the public page immediately.")) {
      await deleteService(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">

      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
          Counselling Categories
        </h1>
        <p className="text-sm text-slate-950 dark:text-beige-100 font-bold">
          Create and manage therapy categories. New categories appear instantly on the client booking page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* CREATE FORM — Left Col */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="premium-card p-6 md:p-8 space-y-5">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white border-b border-beige-100 dark:border-sage-800 pb-4 flex items-center gap-2">
              <Plus className="h-4.5 w-4.5 text-sage-600" />
              Create New Category
            </h3>

            {/* Success Flash */}
            {justCreated && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 animate-fade-in">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  "{justCreated}" created successfully!
                </span>
              </div>
            )}

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">
                Category Title <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Anxiety Management"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of this counselling category..."
                rows="3"
                className="w-full px-4 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-855 dark:text-white font-bold resize-none"
              />
            </div>

            {/* Duration + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">
                  Duration
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g., 50 Mins"
                    required
                    className="w-full pl-9 pr-3 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide block">
                  Fee (INR) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3.5 h-4 w-4 text-stone-400" />
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="1500"
                    required
                    min="1"
                    className="w-full pl-9 pr-3 py-3 bg-beige-50 dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Create Category</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-500 dark:text-beige-400 font-bold text-center leading-relaxed">
              Created categories appear immediately on the client <br />booking page and public services page.
            </p>
          </form>
        </div>

        {/* ACTIVE CATEGORIES LIST — Right Col */}
        <div className="lg:col-span-7">
          <div className="premium-card overflow-hidden">
            <div className="p-5 border-b border-beige-100 dark:border-sage-800/40 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-white">
                Active Categories
              </h3>
              <span className="px-2.5 py-0.5 bg-sage-50 dark:bg-sage-900/40 text-sage-700 dark:text-sage-400 text-xs font-bold rounded-full border border-sage-200 dark:border-sage-800">
                {services?.length || 0} total
              </span>
            </div>

            {services && services.length > 0 ? (
              <div className="divide-y divide-beige-100 dark:divide-sage-900/40">
                {services.map((service, idx) => (
                  <div
                    key={service.id}
                    className="p-5 flex items-start gap-4 hover:bg-beige-50/40 dark:hover:bg-sage-900/10 transition-colors"
                  >
                    {editingId === service.id ? (
                      <div className="flex-1 min-w-0 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide">Title</label>
                            <input
                              type="text"
                              name="title"
                              value={editForm.title}
                              onChange={handleEditChange}
                              className="w-full px-3 py-2 mt-1 bg-white dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide">Fee (INR)</label>
                            <input
                              type="number"
                              name="price"
                              value={editForm.price}
                              onChange={handleEditChange}
                              className="w-full px-3 py-2 mt-1 bg-white dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide">Duration</label>
                            <input
                              type="text"
                              name="duration"
                              value={editForm.duration}
                              onChange={handleEditChange}
                              className="w-full px-3 py-2 mt-1 bg-white dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-850 dark:text-white font-bold"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[10px] font-bold text-slate-950 dark:text-beige-200 uppercase tracking-wide">Description</label>
                            <textarea
                              name="description"
                              value={editForm.description}
                              onChange={handleEditChange}
                              rows="2"
                              className="w-full px-3 py-2 mt-1 bg-white dark:bg-sage-955 border border-beige-200/65 dark:border-sage-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-sage-500 text-stone-855 dark:text-white font-bold resize-none"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => submitEdit(service.id)}
                            className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 transition-all"
                          >
                            <Save className="h-3.5 w-3.5" /> Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-sage-800 dark:hover:bg-sage-700 text-stone-700 dark:text-beige-100 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 transition-all"
                          >
                            <X className="h-3.5 w-3.5" /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Index badge */}
                        <div className="h-8 w-8 rounded-xl bg-sage-50 dark:bg-sage-900/40 border border-sage-200 dark:border-sage-800 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-sage-600 dark:text-sage-400">{idx + 1}</span>
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-sm font-bold text-stone-900 dark:text-white font-serif">
                              {service.title}
                            </span>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-sm font-bold text-sage-600 dark:text-sage-400">
                                {service.price}
                              </span>
                              <div className="flex items-center gap-1 ml-2">
                                <button
                                  onClick={() => startEditing(service)}
                                  className="p-1.5 text-stone-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-lg transition-colors"
                                  title="Edit Category"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(service.id)}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                                  title="Delete Category"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                          {service.description && (
                            <p className="text-xs text-stone-500 dark:text-beige-300 font-bold mt-1 leading-relaxed line-clamp-2">
                              {service.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-beige-400 bg-beige-100 dark:bg-sage-900/40 px-2 py-0.5 rounded-full">
                              <Clock className="h-3 w-3" />
                              {service.duration}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="h-3 w-3" />
                              Active
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-14 text-center space-y-3">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-beige-100 dark:bg-sage-900/40 flex items-center justify-center">
                  <Tag className="h-6 w-6 text-stone-400" />
                </div>
                <p className="text-sm font-bold text-stone-500 dark:text-beige-300">
                  No categories yet. Create your first one!
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
