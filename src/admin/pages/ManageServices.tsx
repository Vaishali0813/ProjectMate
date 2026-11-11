import React, { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import type { Service } from '../../types';
import { fetchServices, createService, updateService, toggleServiceVisibility } from '../../lib/api';
import { ServiceIcon, AVAILABLE_ICON_NAMES } from '../../lib/icons';

export const ManageServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('BookOpen');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadServicesList = async () => {
    try {
      setLoading(true);
      const data = await fetchServices(true); // include hidden
      setServices(data);
    } catch (err: any) {
      showToast(err?.message || 'Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServicesList();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setName('');
    setDescription('');
    setIcon('BookOpen');
    setDisplayOrder(services.length + 1);
    setIsActive(true);
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (srv: Service) => {
    setEditingService(srv);
    setName(srv.name);
    setDescription(srv.description);
    setIcon(srv.icon);
    setDisplayOrder(srv.display_order);
    setIsActive(srv.is_active);
    setFormError(null);
    setModalOpen(true);
  };

  const handleToggleVisibility = async (srv: Service) => {
    try {
      const updated = await toggleServiceVisibility(srv.id, !srv.is_active);
      setServices((prev) => prev.map((s) => (s.id === srv.id ? updated : s)));
      showToast(
        updated.is_active
          ? `"${srv.name}" is now active and visible on the website.`
          : `"${srv.name}" has been hidden from the public website.`
      );
    } catch (err: any) {
      showToast(err?.message || 'Failed to update visibility', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Service name is required.');
      return;
    }
    if (!description.trim() || description.trim().length < 10) {
      setFormError('Description must be at least 10 characters.');
      return;
    }

    setFormSubmitting(true);
    try {
      if (editingService) {
        // Edit existing
        const updated = await updateService(editingService.id, {
          name: name.trim(),
          description: description.trim(),
          icon,
          display_order: displayOrder,
          is_active: isActive,
        });
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? updated : s)).sort((a, b) => a.display_order - b.display_order)
        );
        showToast('Service updated successfully.');
      } else {
        // Create new
        const created = await createService({
          name: name.trim(),
          description: description.trim(),
          icon,
          display_order: displayOrder,
          is_active: isActive,
        });
        setServices((prev) => [...prev, created].sort((a, b) => a.display_order - b.display_order));
        showToast('New service added successfully.');
      }
      setModalOpen(false);
    } catch (err: any) {
      setFormError(err?.message || 'Failed to save service.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border flex items-center gap-3 text-sm font-medium animate-in fade-in duration-200 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-400 dark:bg-emerald-950 dark:text-emerald-200'
              : 'bg-red-50 text-red-900 border-red-400 dark:bg-red-950 dark:text-red-200'
          }`}
        >
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-plum-900 dark:text-warm-white">
            Manage Services
          </h1>
          <p className="text-sm text-plum-950/70 dark:text-warm-white/70 mt-1">
            Manage the services displayed on the Project Mate website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-plum-800 hover:bg-plum-900 text-warm-white dark:bg-gold dark:text-plum-950 dark:hover:bg-gold-light text-sm font-semibold shadow-plum-subtle transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table Card */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gold/30 dark:border-dark-border shadow-plum-subtle overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-mauve">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="text-plum-900 dark:text-warm-white font-medium">No services found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold/20 dark:border-dark-border bg-plum-50/50 dark:bg-dark-surface text-[11px] font-bold uppercase tracking-wider text-plum-900/80 dark:text-warm-white/80">
                  <th className="py-4 px-5">Order</th>
                  <th className="py-4 px-4">Icon</th>
                  <th className="py-4 px-5">Service Name</th>
                  <th className="py-4 px-5">Description</th>
                  <th className="py-4 px-4">Visibility</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/15 dark:divide-dark-border text-xs sm:text-sm">
                {services.map((srv) => (
                  <tr
                    key={srv.id}
                    className={`hover:bg-plum-50/30 dark:hover:bg-dark-hover transition-colors ${
                      !srv.is_active ? 'opacity-60 bg-gray-50/40 dark:bg-dark-surface/40' : ''
                    }`}
                  >
                    <td className="py-4 px-5 font-mono text-xs text-plum-950/60 dark:text-warm-white/60">
                      #{srv.display_order}
                    </td>

                    <td className="py-4 px-4">
                      <div className="w-9 h-9 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center justify-center text-plum-800 dark:text-gold shadow-xs">
                        <ServiceIcon name={srv.icon} className="w-4 h-4" />
                      </div>
                    </td>

                    <td className="py-4 px-5 font-semibold text-plum-900 dark:text-warm-white">
                      {srv.name}
                    </td>

                    <td className="py-4 px-5 max-w-sm">
                      <p className="text-xs text-plum-950/70 dark:text-warm-white/70 line-clamp-2">
                        {srv.description}
                      </p>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          srv.is_active
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-gray-200 text-gray-700 dark:bg-dark-surface dark:text-warm-white/50'
                        }`}
                      >
                        {srv.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle Show/Hide */}
                        <button
                          onClick={() => handleToggleVisibility(srv)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            srv.is_active
                              ? 'border-gold/30 text-plum-800 dark:text-gold hover:bg-gold/15'
                              : 'border-gray-300 text-gray-600 dark:text-warm-white hover:bg-gray-100'
                          }`}
                          title={srv.is_active ? 'Hide service from public site' : 'Show service on public site'}
                        >
                          {srv.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => openEditModal(srv)}
                          className="p-1.5 rounded-lg border border-gold/30 text-mauve hover:bg-plum-50 dark:hover:bg-dark-surface transition-colors"
                          title="Edit service details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-gold/40 dark:border-dark-border shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <h3 className="font-serif text-xl font-bold text-plum-900 dark:text-warm-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-plum-950/60 hover:bg-plum-50 dark:hover:bg-dark-surface"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-400 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {/* Service Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1">
                  Service Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Statistical Analysis & SPSS Support"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-white/50 dark:bg-dark-surface text-sm dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short, professional description of the support offered..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-white/50 dark:bg-dark-surface text-sm dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              {/* Icon Selector & Display Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1">
                    Icon
                  </label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-white/50 dark:bg-dark-surface text-sm dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    {AVAILABLE_ICON_NAMES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-white/50 dark:bg-dark-surface text-sm dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="pt-2 flex items-center justify-between p-3.5 rounded-xl bg-plum-50/50 dark:bg-dark-surface border border-gold/20">
                <div>
                  <div className="text-xs font-bold text-plum-900 dark:text-warm-white">
                    Public Visibility
                  </div>
                  <div className="text-[11px] text-plum-950/60 dark:text-warm-white/60">
                    If active, service appears in the public grid and enquiry forms
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-plum-800 rounded focus:ring-gold"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gold/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-dark-border text-xs font-semibold text-plum-900 dark:text-warm-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-plum-800 hover:bg-plum-900 text-warm-white dark:bg-gold dark:text-plum-950 dark:hover:bg-gold-light text-xs font-semibold shadow-xs disabled:opacity-50"
                >
                  {formSubmitting ? 'Saving...' : editingService ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
