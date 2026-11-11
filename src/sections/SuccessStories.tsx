import React, { useEffect, useState } from 'react';
import { Star, MessageSquarePlus, Loader2 } from 'lucide-react';
import type { PublicReview } from '../types';
import { fetchApprovedReviews } from '../lib/api';
import { TestimonialCard } from '../components/TestimonialCard';

export const SuccessStories: React.FC = () => {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await fetchApprovedReviews();
        setReviews(data);
      } catch (err) {
        console.error('Failed to load approved reviews:', err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  const handleScrollToFeedback = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('share-experience');
    if (el) {
      const headerOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="success-stories" className="py-20 sm:py-28 bg-warm-cream/40 dark:bg-dark-surface/30 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/40 text-xs font-bold uppercase tracking-wider text-plum-900 dark:text-gold shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#C59B27]" />
            <span>Success Stories</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 dark:text-warm-white">
            Real Experiences. Genuine Feedback. Trusted Support.
          </h2>

          <p className="text-base sm:text-lg text-plum-950/75 dark:text-warm-white/75 leading-relaxed font-normal">
            Your trust inspires us to do better. Discover what our customers have to say about their experience with Project Mate.
          </p>

          {/* CTA to scroll to Feedback Form */}
          <div className="pt-2">
            <a
              href="#share-experience"
              onClick={handleScrollToFeedback}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-plum-800 text-warm-white dark:bg-gold dark:text-plum-950 hover:bg-plum-900 dark:hover:bg-gold-light text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Your Experience</span>
            </a>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 text-mauve dark:text-gold">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-sm font-medium">Loading genuine feedback...</p>
          </div>
        )}

        {/* Testimonials Grid */}
        {!loading && reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((review) => (
              <TestimonialCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && reviews.length === 0 && (
          <div className="max-w-xl mx-auto text-center py-16 px-6 bg-white dark:bg-dark-card rounded-2xl border border-gold/30 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/40 flex items-center justify-center mx-auto mb-4 text-gold">
              <Star className="w-8 h-8 fill-gold/20" />
            </div>
            <h3 className="font-serif text-xl font-bold text-plum-900 dark:text-warm-white mb-2">
              Be Our Next Success Story
            </h3>
            <p className="text-sm text-plum-950/70 dark:text-warm-white/70 mb-6">
              Your experience could be our next success story. Be the first to share your feedback!
            </p>
            <a
              href="#share-experience"
              onClick={handleScrollToFeedback}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-plum-800 text-warm-white dark:bg-gold dark:text-plum-950 font-semibold text-sm"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Your Feedback Now</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
