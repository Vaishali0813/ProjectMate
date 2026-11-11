import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Loader2,
  Star,
  Layers,
} from 'lucide-react';
import { getDashboardStats, fetchAllReviews } from '../../lib/api';
import type { CustomerReview } from '../../types';
import { StarRating } from '../../components/StarRating';

export const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState({
    totalReviews: 0,
    pendingReviews: 0,
    approvedReviews: 0,
    rejectedReviews: 0,
  });
  const [recentReviews, setRecentReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [dashStats, allReviews] = await Promise.all([
          getDashboardStats(),
          fetchAllReviews('all'),
        ]);
        setStats(dashStats);
        setRecentReviews(allReviews.slice(0, 5));
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const cards = [
    {
      title: 'Total Reviews',
      count: stats.totalReviews,
      description: 'Submitted across all statuses',
      icon: MessageSquare,
      color: 'text-plum-800 dark:text-gold',
      bg: 'bg-plum-50 dark:bg-dark-surface',
      border: 'border-gold/30',
    },
    {
      title: 'Pending Reviews',
      count: stats.pendingReviews,
      description: 'Awaiting moderation & approval',
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-500/30',
      highlight: stats.pendingReviews > 0,
    },
    {
      title: 'Approved Reviews',
      count: stats.approvedReviews,
      description: 'Published on Success Stories',
      icon: CheckCircle,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-500/30',
    },
    {
      title: 'Rejected Reviews',
      count: stats.rejectedReviews,
      description: 'Hidden from public website',
      icon: XCircle,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-950/30',
      border: 'border-red-500/30',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-plum-900 dark:text-warm-white">
          Dashboard Overview
        </h1>
        <p className="text-sm text-plum-950/70 dark:text-warm-white/70 mt-1">
          Monitor customer feedback and review activity.
        </p>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-mauve">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white dark:bg-dark-card rounded-2xl p-6 border ${card.border} dark:border-dark-border shadow-plum-subtle transition-all duration-200 relative overflow-hidden`}
                >
                  {card.highlight && (
                    <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                    </span>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-plum-900/80 dark:text-warm-white/80 uppercase tracking-wider">
                      {card.title}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center ${card.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-plum-900 dark:text-warm-white mb-1">
                    {card.count}
                  </div>
                  <p className="text-xs text-plum-950/60 dark:text-warm-white/60">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions & Recent Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Submissions List (2 cols) */}
            <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl p-6 border border-gold/30 dark:border-dark-border shadow-plum-subtle">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold/20 dark:border-dark-border">
                <div>
                  <h2 className="font-serif text-xl font-bold text-plum-900 dark:text-warm-white">
                    Recent Review Submissions
                  </h2>
                  <p className="text-xs text-plum-950/60 dark:text-warm-white/60">
                    Latest feedback received from customers
                  </p>
                </div>
                <Link
                  to="/admin/reviews"
                  className="text-xs font-semibold text-plum-800 dark:text-gold hover:underline flex items-center gap-1"
                >
                  <span>Manage All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {recentReviews.length === 0 ? (
                <div className="text-center py-12 text-sm text-plum-950/60 dark:text-warm-white/60">
                  No review submissions have been recorded yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl bg-plum-50/50 dark:bg-dark-surface border border-gold/20 dark:border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-plum-900 dark:text-warm-white">
                            {rev.customer_name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              rev.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : rev.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                            }`}
                          >
                            {rev.status}
                          </span>
                        </div>
                        <p className="text-xs text-mauve dark:text-gold">
                          {rev.service_name_snapshot}
                        </p>
                        <p className="text-xs text-plum-950/70 dark:text-warm-white/70 line-clamp-1 italic">
                          "{rev.feedback}"
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0">
                        <StarRating rating={rev.rating} readonly size="sm" />
                        <span className="text-[10px] text-plum-950/50 dark:text-warm-white/50">
                          {new Date(rev.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Quick Nav Shortcuts (1 col) */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gold/30 dark:border-dark-border shadow-plum-subtle">
                <h2 className="font-serif text-lg font-bold text-plum-900 dark:text-warm-white mb-4">
                  Quick Administration
                </h2>
                <div className="space-y-3">
                  <Link
                    to="/admin/reviews?status=pending"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/20 hover:border-gold transition-colors text-sm font-semibold text-plum-900 dark:text-warm-white"
                  >
                    <span className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      Pending Moderation Queue
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs">
                      {stats.pendingReviews}
                    </span>
                  </Link>

                  <Link
                    to="/admin/ratings"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/20 hover:border-gold transition-colors text-sm font-semibold text-plum-900 dark:text-warm-white"
                  >
                    <span className="flex items-center gap-2.5">
                      <Star className="w-4 h-4 text-gold" />
                      View Customer Ratings Analytics
                    </span>
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </Link>

                  <Link
                    to="/admin/services"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/20 hover:border-gold transition-colors text-sm font-semibold text-plum-900 dark:text-warm-white"
                  >
                    <span className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-mauve" />
                      Manage Active Services
                    </span>
                    <ArrowRight className="w-4 h-4 text-mauve" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
