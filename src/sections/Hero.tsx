import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, DollarSign, UserCheck, MessageSquare, Sparkles, BookOpen, Laptop, Star } from 'lucide-react';
import { getStartedWhatsAppUrl } from '../lib/whatsapp';

export const Hero: React.FC = () => {
  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      const headerOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Quality & Professionalism',
      description: 'Carefully structured, professionally presented work.',
    },
    {
      icon: DollarSign,
      title: 'Affordable Solutions',
      description: 'Accessible services designed around different budgets.',
    },
    {
      icon: UserCheck,
      title: 'Personalised Support',
      description: 'Support tailored to individual requirements.',
    },
    {
      icon: MessageSquare,
      title: 'Reliable Communication',
      description: 'Clear guidance and responsive communication.',
    },
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-hero-light dark:bg-hero-dark transition-colors duration-300">
      {/* Decorative background blurs */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-plum-200/40 dark:bg-plum-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-gold/20 dark:bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Two-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16 sm:mb-20">
          {/* Left Column: Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/40 text-plum-900 dark:text-gold text-xs sm:text-sm font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Welcome to Project Mate</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-plum-900 dark:text-warm-white leading-[1.15]">
              Your Ideas. Our Expertise.{' '}
              <span className="text-mauve inline-block drop-shadow-sm font-extrabold">
                Your Success.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-plum-950/80 dark:text-warm-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From academic guidance to creative and technical solutions, Project Mate is your trusted partner in bringing every project to life.
            </p>

            {/* Tagline */}
            <p className="font-serif italic text-base sm:text-lg text-mauve dark:text-gold font-medium">
              "Your Partner in Every Project."
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#services"
                onClick={handleScrollToServices}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-plum-800 hover:bg-plum-900 text-warm-white dark:bg-gold dark:text-plum-950 dark:hover:bg-gold-light text-base font-semibold shadow-plum-subtle hover:shadow-plum-hover transition-all duration-300 border border-gold/40 group hover:scale-[1.02]"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={getStartedWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white dark:bg-dark-card hover:bg-plum-50 dark:hover:bg-dark-hover text-plum-900 dark:text-warm-white text-base font-semibold border-2 border-gold/50 shadow-sm transition-all duration-300 group hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>Let's Get Started</span>
              </a>
            </div>

            {/* Quick Trust indicator */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-plum-950/60 dark:text-warm-white/60">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#C59B27]" />
                ))}
              </div>
              <span className="font-medium">Personalised & Confidential Support in Sri Lanka</span>
            </div>
          </div>

          {/* Right Column: Premium Academic & Technical Workspace Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-plum-800/20 via-mauve/20 to-gold/30 rounded-3xl blur-xl" />

              {/* Workspace Composite Card */}
              <div className="relative rounded-3xl bg-white dark:bg-dark-card border-2 border-gold/40 dark:border-dark-border p-6 shadow-2xl overflow-hidden">
                {/* Visual Header / Banner */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-plum-900 via-plum-800 to-dark-bg p-5 flex flex-col justify-between text-warm-white border border-gold/30">
                  {/* Subtle workspace elements graphics */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-mauve/20 rounded-full blur-2xl" />

                  {/* Top Bar of the workspace display */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-medium text-gold">Project Mate Hub</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-gold/40 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-gold" />
                    </div>
                  </div>

                  {/* Workspace Center Scene Composition */}
                  <div className="relative z-10 my-auto text-center space-y-3">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-gold-dark p-0.5 shadow-lg">
                      <div className="w-full h-full bg-plum-950 rounded-2xl flex items-center justify-center">
                        <img src="/logo.jpg" alt="Logo" className="w-12 h-12 object-contain rounded-full" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-warm-white tracking-wide">
                        Academic, Creative & Tech
                      </h4>
                      <p className="text-xs text-gold/90 font-medium">
                        Research • Guidance • Systems • Design
                      </p>
                    </div>
                  </div>

                  {/* Bottom highlights */}
                  <div className="grid grid-cols-2 gap-2 z-10 pt-2 border-t border-gold/20 text-xs">
                    <div className="flex items-center gap-1.5 text-plum-100">
                      <BookOpen className="w-3.5 h-3.5 text-gold" />
                      <span>Academic Standards</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-plum-100">
                      <Laptop className="w-3.5 h-3.5 text-gold" />
                      <span>Modern Solutions</span>
                    </div>
                  </div>
                </div>

                {/* Floating Workspace Feature Badges */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-plum-800 text-gold flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-plum-900 dark:text-warm-white">100% Tailored</div>
                      <div className="text-[10px] text-plum-950/60 dark:text-warm-white/60">Strict Confidentiality</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-mauve text-warm-white flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-plum-900 dark:text-warm-white">Direct WhatsApp</div>
                      <div className="text-[10px] text-plum-950/60 dark:text-warm-white/60">Fast Turnaround</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Strip: 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white/80 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 border border-gold/30 dark:border-dark-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center justify-center text-plum-800 dark:text-gold mb-4 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-plum-900 dark:text-warm-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-plum-950/70 dark:text-warm-white/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Approved Plum and Gold Wave Divider */}
      <div className="w-full overflow-hidden leading-none mt-16 sm:mt-20">
        <svg
          className="relative block w-full h-12 sm:h-16 text-warm-cream dark:text-dark-card fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="opacity-40 text-gold fill-current"
          />
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="text-plum-800/10 dark:text-plum-900/30 fill-current"
          />
        </svg>
      </div>
    </section>
  );
};
