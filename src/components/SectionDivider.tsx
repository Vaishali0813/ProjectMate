import React from 'react';

export interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'gentle' | 'slant';
  position?: 'top' | 'bottom';
  className?: string;
  fillClassName?: string;
  secondaryFillClassName?: string;
  flip?: boolean;
}

/**
 * Reusable, lightweight curved/wave section divider component
 * Produces smooth natural transitions between sections with zero layout shift
 * and perfectly matched background blending in both Light and Dark themes.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'wave',
  position = 'bottom',
  className = 'h-8 sm:h-12 lg:h-14',
  fillClassName = 'text-warm-blush dark:text-dark-surface',
  secondaryFillClassName = 'text-gold/20 dark:text-gold/10',
  flip = false,
}) => {
  const isTop = position === 'top';
  const transformStyle = `${isTop ? 'rotate(180deg)' : ''} ${flip ? 'scaleX(-1)' : ''}`.trim();

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none z-10 ${
        isTop ? '-mb-px' : '-mt-px'
      }`}
      aria-hidden="true"
    >
      <svg
        className={`relative block w-full ${className} ${transformStyle ? 'transform' : ''}`}
        style={transformStyle ? { transform: transformStyle } : undefined}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        {variant === 'wave' && (
          <>
            {/* Secondary accent wave */}
            <path
              d="M0,32 C240,60 480,10 720,38 C960,66 1200,20 1440,42 L1440,80 L0,80 Z"
              className={`fill-current ${secondaryFillClassName}`}
            />
            {/* Main blending wave */}
            <path
              d="M0,20 C280,65 540,5 820,44 C1100,80 1320,30 1440,48 L1440,80 L0,80 Z"
              className={`fill-current ${fillClassName}`}
            />
          </>
        )}

        {variant === 'curve' && (
          <>
            {/* Subtle accent curve */}
            <path
              d="M0,30 Q720,-10 1440,30 L1440,80 L0,80 Z"
              className={`fill-current ${secondaryFillClassName}`}
            />
            {/* Main organic curve */}
            <path
              d="M0,45 Q720,10 1440,45 L1440,80 L0,80 Z"
              className={`fill-current ${fillClassName}`}
            />
          </>
        )}

        {variant === 'gentle' && (
          <>
            <path
              d="M0,25 C360,55 720,5 1080,40 C1240,55 1360,35 1440,30 L1440,80 L0,80 Z"
              className={`fill-current ${secondaryFillClassName}`}
            />
            <path
              d="M0,38 C320,68 680,18 1040,48 C1220,62 1340,42 1440,44 L1440,80 L0,80 Z"
              className={`fill-current ${fillClassName}`}
            />
          </>
        )}

        {variant === 'slant' && (
          <>
            <path
              d="M0,50 C480,20 960,60 1440,25 L1440,80 L0,80 Z"
              className={`fill-current ${secondaryFillClassName}`}
            />
            <path
              d="M0,60 C480,30 960,70 1440,35 L1440,80 L0,80 Z"
              className={`fill-current ${fillClassName}`}
            />
          </>
        )}
      </svg>
    </div>
  );
};
