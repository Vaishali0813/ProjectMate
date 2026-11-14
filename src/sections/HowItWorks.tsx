import React from 'react';
import { MessageSquare, FileSpreadsheet, CheckCircle, Handshake, Sparkles } from 'lucide-react';
import { SectionDivider } from '../components/SectionDivider';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Contact Us',
      description: 'Reach out through WhatsApp or our contact form.',
      icon: MessageSquare,
    },
    {
      step: '02',
      title: 'Share Your Requirements',
      description: 'Tell us about your project, expectations, and deadline.',
      icon: FileSpreadsheet,
    },
    {
      step: '03',
      title: 'Receive Your Quote',
      description: 'Get service details and a quotation based on your requirements.',
      icon: CheckCircle,
    },
    {
      step: '04',
      title: 'Get Personalised Support',
      description: 'Receive professional assistance and guidance.',
      icon: Handshake,
    },
  ];

  return (
    <section id="how-it-works" className="pt-12 sm:pt-16 pb-4 sm:pb-6 bg-warm-ivory dark:bg-dark-bg transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/40 text-xs font-bold uppercase tracking-wider text-plum-900 dark:text-gold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Seamless Process</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 dark:text-warm-ivory leading-tight">
            Getting Started Is Simple.
          </h2>

          <p className="text-base sm:text-lg text-plum-950/75 dark:text-warm-ivory/75 leading-relaxed font-normal">
            Follow our straightforward four-step process to bring your project to reality.
          </p>
        </div>

        {/* Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-plum-700 via-mauve to-gold -translate-y-5 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-dark-card rounded-2xl p-5 sm:p-6 border border-gold/30 dark:border-dark-border shadow-plum-subtle hover:shadow-plum-hover transition-all duration-300 flex flex-col items-center text-center relative group"
                >
                  {/* Step Number Badge */}
                  <div className="w-11 h-11 rounded-full bg-plum-700 text-warm-ivory dark:bg-gold dark:text-plum-950 font-serif font-bold text-sm sm:text-base flex items-center justify-center mb-3.5 ring-4 ring-gold/30 shadow-md group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl bg-plum-50 dark:bg-dark-surface flex items-center justify-center text-mauve dark:text-gold mb-3">
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-plum-900 dark:text-warm-ivory mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-plum-950/70 dark:text-warm-ivory/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Smooth Curved Transition into Contact Us (Soft Blush / Dark Surface) */}
      <SectionDivider
        variant="gentle"
        position="bottom"
        fillClassName="text-warm-blush dark:text-dark-surface"
        secondaryFillClassName="text-gold/25 dark:text-gold/10"
        className="h-8 sm:h-12 lg:h-14"
      />
    </section>
  );
};
