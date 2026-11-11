import React from 'react';
import { Target, Users, Sparkles, CheckCircle2 } from 'lucide-react';

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
    <section id="about" className="py-20 sm:py-28 bg-warm-cream/50 dark:bg-dark-surface/40 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-100/70 dark:bg-dark-surface border border-gold/40 text-xs font-bold uppercase tracking-wider text-plum-900 dark:text-gold">
              About Project Mate
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 dark:text-warm-white leading-tight">
              Your Trusted Partner for{' '}
              <span className="text-mauve font-extrabold">Academic & Creative</span> Success
            </h2>

            <p className="text-base sm:text-lg text-plum-950/80 dark:text-warm-white/80 leading-relaxed">
              At Project Mate, we believe every great achievement begins with the right support. We provide reliable, affordable, and personalised academic, creative, and technical assistance to help students and individuals confidently achieve their goals.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {valuePillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-plum-900/90 dark:text-warm-white/90">
                    {pillar}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Core Values Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gold/30 dark:border-dark-border shadow-sm hover:shadow-md hover:border-gold/60 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center justify-center text-plum-800 dark:text-gold shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-plum-900 dark:text-warm-white mb-1.5">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-plum-950/70 dark:text-warm-white/70 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
