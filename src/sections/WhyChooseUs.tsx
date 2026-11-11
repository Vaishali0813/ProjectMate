import React from 'react';
import { Award, Wallet, Compass, MessageCircleHeart } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Award,
      title: 'Professional Quality',
      description: 'Carefully structured and professionally presented solutions.',
    },
    {
      icon: Wallet,
      title: 'Affordable Solutions',
      description: 'Student-friendly services designed around different requirements and budgets.',
    },
    {
      icon: Compass,
      title: 'Personalised Guidance',
      description: 'Support tailored to your goals and expectations.',
    },
    {
      icon: MessageCircleHeart,
      title: 'Reliable Communication',
      description: 'Clear, friendly, and responsive communication throughout the process.',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 sm:py-28 bg-warm-cream/50 dark:bg-dark-surface/40 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/40 text-xs font-bold uppercase tracking-wider text-plum-900 dark:text-gold shadow-sm">
            <span>Our Distinction</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 dark:text-warm-white">
            Why Choose Project Mate?
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-mauve dark:text-gold">
            "Because Every Project Deserves the Right Support."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-dark-card rounded-2xl p-7 border border-gold/30 dark:border-dark-border shadow-plum-subtle hover:shadow-plum-hover hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center justify-center text-plum-800 dark:text-gold mb-5 group-hover:bg-plum-800 group-hover:text-warm-white group-hover:scale-105 transition-all duration-300 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-plum-900 dark:text-warm-white mb-2.5">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-plum-950/70 dark:text-warm-white/70 leading-relaxed">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
