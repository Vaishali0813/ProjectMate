import React from 'react';
import { Award, Wallet, Compass, MessageCircleHeart, Sparkles } from 'lucide-react';
import { SectionDivider } from '../components/SectionDivider';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Award,
      title: 'Professional Quality',
      description: 'Carefully structured and professionally presented solutions adhering to strict academic and technical standards.',
    },
    {
      icon: Wallet,
      title: 'Affordable Solutions',
      description: 'Student-friendly services thoughtfully designed around different requirements and accessible budgets.',
    },
    {
      icon: Compass,
      title: 'Personalised Guidance',
      description: 'One-on-one support tailored to your unique project goals, specific guidelines, and deadlines.',
    },
    {
      icon: MessageCircleHeart,
      title: 'Reliable Communication',
      description: 'Clear, friendly, and responsive communication throughout the entire process via direct WhatsApp.',
    },
  ];

  return (
    <section id="why-choose-us" className="pt-12 sm:pt-16 pb-4 sm:pb-6 bg-warm-blush dark:bg-dark-surface transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-50 dark:bg-dark-card border border-gold/40 text-xs font-bold uppercase tracking-wider text-plum-900 dark:text-gold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Our Distinction</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 dark:text-warm-ivory leading-tight">
            Why Choose Project Mate?
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-mauve dark:text-gold font-medium">
            "Because Every Project Deserves the Right Support."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gold/30 dark:border-dark-border shadow-plum-subtle hover:shadow-plum-hover hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-13 h-13 rounded-2xl bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center justify-center text-plum-700 dark:text-gold mb-4 group-hover:bg-plum-700 group-hover:text-warm-ivory group-hover:scale-105 transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-plum-900 dark:text-warm-ivory mb-2">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-plum-950/70 dark:text-warm-ivory/70 leading-relaxed">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Smooth Curved Transition into Getting Started (Warm Ivory / Dark BG) */}
      <SectionDivider
        variant="wave"
        position="bottom"
        fillClassName="text-warm-ivory dark:text-dark-bg"
        secondaryFillClassName="text-gold/25 dark:text-gold/10"
        className="h-8 sm:h-12 lg:h-14"
        flip
      />
    </section>
  );
};
