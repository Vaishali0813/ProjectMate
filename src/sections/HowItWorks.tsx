import React from 'react';
import { MessageSquare, FileSpreadsheet, CheckCircle, Handshake } from 'lucide-react';

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
    <section id="how-it-works" className="py-20 sm:py-28 bg-warm-white dark:bg-dark-bg transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/40 text-xs font-bold uppercase tracking-wider text-plum-900 dark:text-gold shadow-sm">
            <span>Seamless Process</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 dark:text-warm-white">
            Getting Started Is Simple.
          </h2>

          <p className="text-base sm:text-lg text-plum-950/75 dark:text-warm-white/75 leading-relaxed">
            Follow our straightforward four-step process to bring your project to reality.
          </p>
        </div>

        {/* Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-plum-800 via-mauve to-gold -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-7 border border-gold/30 dark:border-dark-border shadow-plum-subtle hover:shadow-plum-hover transition-all duration-300 flex flex-col items-center text-center relative group"
                >
                  {/* Step Number Badge */}
                  <div className="w-12 h-12 rounded-full bg-plum-800 text-warm-white dark:bg-gold dark:text-plum-950 font-serif font-bold text-base flex items-center justify-center mb-4 ring-4 ring-gold/30 shadow-md group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-plum-50 dark:bg-dark-surface flex items-center justify-center text-mauve dark:text-gold mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-plum-900 dark:text-warm-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-plum-950/70 dark:text-warm-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
