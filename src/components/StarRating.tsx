import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onChange,
  readonly = false,
  size = 'md',
  showLabel = false,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  const currentRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex items-center gap-1.5" role={readonly ? 'img' : 'radiogroup'} aria-label={`Rating: ${rating} out of 5 stars`}>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => {
          const isFilled = star <= currentRating;
          return (
            <button
              key={star}
              type="button"
              disabled={readonly}
              onClick={() => onChange && onChange(star)}
              onMouseEnter={() => !readonly && setHoverRating(star)}
              onMouseLeave={() => !readonly && setHoverRating(null)}
              onFocus={() => !readonly && setHoverRating(star)}
              onBlur={() => !readonly && setHoverRating(null)}
              className={`transition-transform duration-150 focus:outline-none ${
                readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 focus-visible:ring-2 focus-visible:ring-gold'
              }`}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
              role={readonly ? undefined : 'radio'}
              aria-checked={star === rating}
            >
              <Star
                className={`${sizeClasses[size]} transition-colors duration-200 ${
                  isFilled
                    ? 'fill-[#D4AF37] text-[#C59B27] drop-shadow-[0_1px_4px_rgba(212,175,55,0.4)]'
                    : 'fill-transparent text-gray-300 dark:text-plum-400/40 hover:text-gold'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showLabel && (
        <span className="text-sm font-semibold text-plum-900 dark:text-gold ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
