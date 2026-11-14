import React from 'react';
import { Target, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { SectionDivider } from '../components/SectionDivider';

export const AboutUs: React.FC = () => {
  const coreValues = [
    {
      title: 'Quality-Focused Solutions',
      description: 'Meticulous attention to structure, academic rigor, formatting, and high design standards for all outputs.',
      icon: Target,
    },
    {
      title: 'Affordable & Accessible Support',
      description: 'Transparent assistance designed to remain budget-conscious for students and independent professionals.',
      icon: Sparkles,
    },
    {
      title: 'Personalised Assistance',
      description: 'One-on-one focus that respects your exact guidelines, academic goals, and project deadlines.',
      icon: Users,
    },
  ];

  const valuePillars = [
    'Clear ethical guidance and tutoring support',
    'Direct communication on WhatsApp for instant clarification',
    'Customized solutions matching individual requirements',
    'Thorough proofreading, structuring, and technical delivery',
  ];

  return (
    <section id="about" className="pt-12 sm:pt-16 pb-4 sm:pb-6 bg-warm-blush dark:bg-dark-surface transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-100 dark:bg-dark-card border border-gold/40 text-xs font-bold uppercase tracking-wider text-plum-900 dark:text-gold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>About Project Mate</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 dark:text-warm-ivory leading-tight">
              Your Trusted Partner for{' '}
              <span className="text-mauve font-extrabold">Academic & Creative</span> Success
            </h2>

            <p className="text-base sm:text-lg text-plum-950/80 dark:text-warm-ivory/80 leading-relaxed font-normal">
              At Project Mate, we believe every great achievement begins with the right support. We provide reliable, affordable, and personalised academic, creative, and technical assistance to help students and individuals confidently achieve their goals.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 text-left">
              {valuePillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-plum-900/90 dark:text-warm-ivory/90">
                    {pillar}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Core Values Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-dark-card rounded-2xl p-5 sm:p-6 border border-gold/30 dark:border-dark-border shadow-sm hover:shadow-md hover:border-gold/60 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center justify-center text-plum-700 dark:text-gold shrink-0">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-plum-900 dark:text-warm-ivory mb-1">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-plum-950/70 dark:text-warm-ivory/70 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Smooth Curved Transition into Services Section (Warm Ivory / Dark BG) */}
      <SectionDivider
        variant="curve"
        position="bottom"
        fillClassName="text-warm-ivory dark:text-dark-bg"
        secondaryFillClassName="text-gold/25 dark:text-gold/10"
        className="h-8 sm:h-12 lg:h-14"
        flip
      />
    </section>
  );
};
