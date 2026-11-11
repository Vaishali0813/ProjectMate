import React, { useEffect, useState } from 'react';
import {
  Star,
  Loader2,
  Info,
  ShieldCheck,
  Award,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { RatingStats } from '../../types';
import { getRatingStats } from '../../lib/api';
import { StarRating } from '../../components/StarRating';

export const CustomerRatings: React.FC = () => {
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getRatingStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load rating stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const chartData = stats
    ? [...stats.distribution].reverse().map((d) => ({
        rating: `${d.stars} Stars`,
        stars: d.stars,
        count: d.count,
        percentage: d.percentage,
      }))
    : [];

  const barColors = ['#D8B388', '#C89B63', '#A66B91', '#7E3667', '#470735'];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-plum-900 dark:text-warm-white">
          Customer Ratings
        </h1>
        <p className="text-sm text-plum-950/70 dark:text-warm-white/70 mt-1">
          Understand customer satisfaction through genuine feedback.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-mauve">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : !stats || stats.totalApproved === 0 ? (
        <div className="bg-white dark:bg-dark-card rounded-2xl p-12 text-center border border-gold/30 dark:border-dark-border shadow-plum-subtle max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-plum-50 dark:bg-dark-surface flex items-center justify-center mx-auto text-gold">
            <Star className="w-8 h-8 fill-gold/20" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-plum-900 dark:text-warm-white">
            No customer ratings are available yet.
          </h2>
          <p className="text-sm text-plum-950/60 dark:text-warm-white/60">
            Ratings and satisfaction analytics will populate dynamically once customer reviews are submitted and approved.
          </p>
        </div>
      ) : (
        <>
          {/* Main Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Average Customer Rating */}
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-gold/40 dark:border-dark-border shadow-plum-subtle">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-plum-950/60 dark:text-warm-white/60 uppercase tracking-wider">
                  Average Customer Rating
                </span>
                <div className="w-10 h-10 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center justify-center text-gold">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-5xl font-bold text-plum-900 dark:text-warm-white">
                  {stats.averageRating}
                </span>
                <span className="text-lg text-plum-950/50 dark:text-warm-white/50 font-medium">
                  / 5.0
                </span>
              </div>
              <div className="pt-3">
                <StarRating rating={Math.round(stats.averageRating)} readonly size="md" />
              </div>
              <p className="text-xs text-plum-950/60 dark:text-warm-white/60 mt-3 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Customer ratings are calculated from approved feedback.</span>
              </p>
            </div>

            {/* Total Rated Reviews */}
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-gold/40 dark:border-dark-border shadow-plum-subtle">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-plum-950/60 dark:text-warm-white/60 uppercase tracking-wider">
                  Total Rated Reviews
                </span>
                <div className="w-10 h-10 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center justify-center text-mauve">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="font-serif text-5xl font-bold text-plum-900 dark:text-warm-white">
                {stats.totalApproved}
              </div>
              <p className="text-xs text-plum-950/60 dark:text-warm-white/60 mt-4 leading-relaxed">
                Active customer reviews approved for public visibility contributing to the rating score.
              </p>
            </div>
          </div>

          {/* Breakdown and Recharts Chart Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Rating Breakdown with Horizontal Bars (6 cols) */}
            <div className="lg:col-span-6 bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-gold/30 dark:border-dark-border shadow-plum-subtle space-y-6">
              <h2 className="font-serif text-xl font-bold text-plum-900 dark:text-warm-white">
                Rating Breakdown
              </h2>

              <div className="space-y-4">
                {stats.distribution.map((item) => (
                  <div key={item.stars} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-plum-900 dark:text-warm-white">
                      <span className="flex items-center gap-1.5">
                        <span>{item.stars} Stars</span>
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#C59B27]" />
                      </span>
                      <span>
                        {item.count} review{item.count !== 1 ? 's' : ''} ({item.percentage}%)
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-3 w-full bg-plum-50 dark:bg-dark-surface rounded-full overflow-hidden border border-gold/20">
                      <div
                        className="h-full bg-gradient-to-r from-plum-800 to-gold rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recharts Graphical Distribution Chart (6 cols) */}
            <div className="lg:col-span-6 bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-gold/30 dark:border-dark-border shadow-plum-subtle flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-plum-900 dark:text-warm-white mb-1">
                  Distribution of Customer Ratings
                </h2>
                <p className="text-xs text-plum-950/60 dark:text-warm-white/60 mb-6">
                  Visual spread of ratings across the 5-point scale
                </p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="rating"
                      tick={{ fill: '#A66B91', fontSize: 11 }}
                      axisLine={{ stroke: '#F1D5B5' }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: '#A66B91', fontSize: 11 }}
                      axisLine={{ stroke: '#F1D5B5' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-plum-900 text-warm-white p-2.5 rounded-lg border border-gold/40 text-xs shadow-lg">
                              <p className="font-bold text-gold">{data.rating}</p>
                              <p>{data.count} Reviews ({data.percentage}%)</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {chartData.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={barColors[index % barColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="pt-4 border-t border-gold/20 text-center">
                <span className="text-[11px] text-plum-950/60 dark:text-warm-white/50">
                  Data reflects real approved customer submissions only.
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
