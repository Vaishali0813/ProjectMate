import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  Loader2,
  AlertTriangle,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { CustomerReview, ReviewStatus } from '../../types';
import { fetchAllReviews, updateReviewStatus, removeReview, fetchServices } from '../../lib/api';
import { StarRating } from '../../components/StarRating';

export const ManageReviews: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialStatus = (searchParams.get('status') as ReviewStatus | 'all') || 'all';

  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [servicesList, setServicesList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filters & State
  const [activeTab, setActiveTab] = useState<ReviewStatus | 'all'>(initialStatus);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Detail Modal & Delete Confirmation Modal State
  const [selectedReview, setSelectedReview] = useState<CustomerReview | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<CustomerReview | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [allRev, allServ] = await Promise.all([
        fetchAllReviews('all'),
        fetchServices(true),
      ]);
      setReviews(allRev);
      setServicesList(allServ.map((s) => s.name));
    } catch (err: any) {
      showToast(err?.message || 'Failed to load reviews', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered and sorted reviews
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((rev) => {
        if (activeTab !== 'all' && rev.status !== activeTab) return false;
        if (selectedService !== 'all' && rev.service_name_snapshot !== selectedService) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = rev.customer_name.toLowerCase().includes(q);
          const matchEmail = rev.email.toLowerCase().includes(q);
          const matchFeedback = rev.feedback.toLowerCase().includes(q);
          if (!matchName && !matchEmail && !matchFeedback) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [reviews, activeTab, selectedService, searchQuery, sortOrder]);

  // Paginated chunk
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;
  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredReviews.slice(start, start + itemsPerPage);
  }, [filteredReviews, currentPage]);

  const handleStatusChange = async (id: string, newStatus: ReviewStatus) => {
    try {
      setActionLoading(id);
      const updated = await updateReviewStatus(id, newStatus);
      setReviews((prev) => prev.map((r) => (r.id === id ? updated : r)));
      if (selectedReview?.id === id) {
        setSelectedReview(updated);
      }
      showToast(
        newStatus === 'approved'
          ? 'Review approved successfully. It will now appear on Success Stories.'
          : 'Review marked as rejected and hidden from the website.'
      );
    } catch (err: any) {
      showToast(err?.message || 'Failed to update review status', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!reviewToDelete) return;
    try {
      setActionLoading(reviewToDelete.id);
      await removeReview(reviewToDelete.id);
      setReviews((prev) => prev.filter((r) => r.id !== reviewToDelete.id));
      if (selectedReview?.id === reviewToDelete.id) {
        setSelectedReview(null);
      }
      setReviewToDelete(null);
      showToast('Review removed successfully.');
    } catch (err: any) {
      showToast(err?.message || 'Failed to remove review', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const tabs: { key: ReviewStatus | 'all'; label: string; count: number }[] = [
    { key: 'all', label: 'All Reviews', count: reviews.length },
    { key: 'pending', label: 'Pending', count: reviews.filter((r) => r.status === 'pending').length },
    { key: 'approved', label: 'Approved', count: reviews.filter((r) => r.status === 'approved').length },
    { key: 'rejected', label: 'Rejected', count: reviews.filter((r) => r.status === 'rejected').length },
  ];

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
          {toastMessage.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-plum-900 dark:text-warm-white">
          Manage Customer Reviews
        </h1>
        <p className="text-sm text-plum-950/70 dark:text-warm-white/70 mt-1">
          Review, approve, reject, and manage customer feedback.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gold/30 dark:border-dark-border gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setCurrentPage(1);
            }}
            className={`px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.key
                ? 'bg-white dark:bg-dark-card border-t-2 border-l border-r border-gold/40 text-plum-900 dark:text-gold shadow-xs'
                : 'text-plum-950/60 dark:text-warm-white/60 hover:text-plum-900 dark:hover:text-gold'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.key
                  ? 'bg-plum-100 text-plum-900 dark:bg-dark-surface dark:text-gold'
                  : 'bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-warm-white/60'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-4 border border-gold/30 dark:border-dark-border shadow-xs flex flex-col md:flex-row items-center gap-4 justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-mauve absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by customer name or email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-white/50 dark:bg-dark-surface text-xs sm:text-sm dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Service Filter */}
          <select
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-white/50 dark:bg-dark-surface text-xs sm:text-sm dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="all">All Services</option>
            {servicesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-white/50 dark:bg-dark-surface text-xs sm:text-sm dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gold/30 dark:border-dark-border shadow-plum-subtle overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-mauve">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-2">
            <p className="font-serif text-lg text-plum-900 dark:text-warm-white">
              No reviews match the selected filter.
            </p>
            <p className="text-xs text-plum-950/60 dark:text-warm-white/60">
              Try switching tabs or resetting your search query.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold/20 dark:border-dark-border bg-plum-50/50 dark:bg-dark-surface text-[11px] font-bold uppercase tracking-wider text-plum-900/80 dark:text-warm-white/80">
                  <th className="py-4 px-5">Customer</th>
                  <th className="py-4 px-4">Service</th>
                  <th className="py-4 px-4">Rating</th>
                  <th className="py-4 px-5">Feedback Preview</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/15 dark:divide-dark-border text-xs sm:text-sm">
                {paginatedReviews.map((rev) => (
                  <tr
                    key={rev.id}
                    className="hover:bg-plum-50/30 dark:hover:bg-dark-hover transition-colors"
                  >
                    <td className="py-4 px-5 font-semibold text-plum-900 dark:text-warm-white">
                      <div>{rev.customer_name}</div>
                      <div className="text-[11px] text-plum-950/50 dark:text-warm-white/50 font-normal">
                        {rev.email}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-mauve dark:text-gold font-medium">
                      {rev.service_name_snapshot}
                    </td>

                    <td className="py-4 px-4">
                      <StarRating rating={rev.rating} readonly size="sm" />
                    </td>

                    <td className="py-4 px-5 max-w-xs">
                      <p className="truncate text-plum-950/80 dark:text-warm-white/80">
                        "{rev.feedback}"
                      </p>
                    </td>

                    <td className="py-4 px-4 text-plum-950/60 dark:text-warm-white/50 whitespace-nowrap text-xs">
                      {new Date(rev.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          rev.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : rev.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                        }`}
                      >
                        {rev.status}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Detail button */}
                        <button
                          onClick={() => setSelectedReview(rev)}
                          className="p-1.5 rounded-lg text-plum-800 dark:text-gold hover:bg-gold/20 transition-colors"
                          title="View review details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Quick Approve button */}
                        {rev.status !== 'approved' && (
                          <button
                            onClick={() => handleStatusChange(rev.id, 'approved')}
                            disabled={actionLoading === rev.id}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors disabled:opacity-50"
                            title="Approve review"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Quick Reject button */}
                        {rev.status !== 'rejected' && (
                          <button
                            onClick={() => handleStatusChange(rev.id, 'rejected')}
                            disabled={actionLoading === rev.id}
                            className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors disabled:opacity-50"
                            title="Reject review"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Remove review button */}
                        <button
                          onClick={() => setReviewToDelete(rev)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                          title="Remove review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gold/20 dark:border-dark-border flex items-center justify-between">
            <span className="text-xs text-plum-950/60 dark:text-warm-white/60">
              Showing Page {currentPage} of {totalPages} ({filteredReviews.length} reviews)
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-gold/30 text-plum-900 dark:text-warm-white disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-gold/30 text-plum-900 dark:text-warm-white disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 max-w-xl w-full border-2 border-gold/40 dark:border-dark-border shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-plum-900 dark:text-warm-white">
                  Customer Review Details
                </h3>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    selectedReview.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedReview.status === 'pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  Status: {selectedReview.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="p-2 rounded-lg text-plum-950/60 hover:bg-plum-50 dark:hover:bg-dark-surface"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-plum-950/60 dark:text-warm-white/50 uppercase font-semibold">
                    Customer Name
                  </div>
                  <div className="font-bold text-plum-900 dark:text-warm-white">
                    {selectedReview.customer_name}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-plum-950/60 dark:text-warm-white/50 uppercase font-semibold">
                    Private Email (Admin Only)
                  </div>
                  <div className="font-semibold text-plum-900 dark:text-gold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    {selectedReview.email}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-plum-950/60 dark:text-warm-white/50 uppercase font-semibold">
                    Service Received
                  </div>
                  <div className="font-medium text-mauve dark:text-warm-white">
                    {selectedReview.service_name_snapshot}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-plum-950/60 dark:text-warm-white/50 uppercase font-semibold">
                    Rating
                  </div>
                  <div className="pt-1">
                    <StarRating rating={selectedReview.rating} readonly size="sm" showLabel />
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-plum-950/60 dark:text-warm-white/50 uppercase font-semibold mb-1">
                  Full Feedback
                </div>
                <div className="p-4 rounded-xl bg-plum-50/50 dark:bg-dark-surface border border-gold/20 text-plum-950/80 dark:text-warm-white/80 leading-relaxed italic">
                  "{selectedReview.feedback}"
                </div>
              </div>

              <div className="text-xs text-plum-950/60 dark:text-warm-white/50 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Submitted on {new Date(selectedReview.created_at).toLocaleString()}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-gold/20 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setReviewToDelete(selectedReview);
                  setSelectedReview(null);
                }}
                className="px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 text-xs font-semibold"
              >
                Remove Review
              </button>

              <div className="flex items-center gap-2">
                {selectedReview.status !== 'approved' && (
                  <button
                    onClick={() => handleStatusChange(selectedReview.id, 'approved')}
                    disabled={actionLoading === selectedReview.id}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                  >
                    Approve Review
                  </button>
                )}
                {selectedReview.status !== 'rejected' && (
                  <button
                    onClick={() => handleStatusChange(selectedReview.id, 'rejected')}
                    disabled={actionLoading === selectedReview.id}
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs"
                  >
                    Reject Review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {reviewToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 max-w-md w-full border border-red-500/40 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-serif text-lg font-bold">Confirm Review Removal</h3>
            </div>
            <p className="text-xs sm:text-sm text-plum-950/70 dark:text-warm-white/70 leading-relaxed">
              Are you sure you want to remove the review submitted by{' '}
              <strong className="text-plum-900 dark:text-warm-white">{reviewToDelete.customer_name}</strong>? This action will hide the review permanently from all public listings.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setReviewToDelete(null)}
                className="px-4 py-2 rounded-xl border border-gray-300 dark:border-dark-border text-xs font-semibold text-plum-900 dark:text-warm-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
