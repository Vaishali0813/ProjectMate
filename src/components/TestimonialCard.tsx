import React from 'react';
import { Quote } from 'lucide-react';
import type { PublicReview } from '../types';
import { StarRating } from './StarRating';

interface TestimonialCardProps {
  review: PublicReview;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ review }) => {
  // Format date nicely: e.g. "Oct 24, 2026"
  const formattedDate = new Date(review.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Initials for avatar
  const initials = review.customer_name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="relative bg-white dark:bg-dark-card rounded-2xl p-7 border border-gold/40 dark:border-dark-border shadow-plum-subtle hover:shadow-plum-hover transition-all duration-300 flex flex-col justify-between h-full">
      {/* Top quotation icon */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center justify-center text-gold">
          <Quote className="w-5 h-5 fill-gold/20" />
        </div>
        <StarRating rating={review.rating} readonly size="sm" />
      </div>

      {/* Customer Feedback */}
      <p className="text-sm sm:text-base text-plum-950/80 dark:text-warm-white/80 leading-relaxed italic mb-6">
        "{review.feedback}"
      </p>

      {/* Footer: Customer Profile and Service Info */}
      <div className="pt-4 border-t border-gold/20 dark:border-dark-border/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-plum-800 to-mauve text-warm-white font-bold text-xs flex items-center justify-center shadow-sm ring-2 ring-gold/40">
            {initials || 'PM'}
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-plum-900 dark:text-warm-white leading-tight">
              {review.customer_name}
            </h4>
            <p className="text-xs text-mauve dark:text-gold/90 font-medium">
              {review.service_name_snapshot}
            </p>
          </div>
        </div>

        <span className="text-[11px] text-plum-950/50 dark:text-warm-white/40 font-medium whitespace-nowrap">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};
