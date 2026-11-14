import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, DollarSign, UserCheck, MessageSquare, Sparkles, Star } from 'lucide-react';import { getStartedWhatsAppUrl } from '../lib/whatsapp';
import { SectionDivider } from '../components/SectionDivider';

export const Hero: React.FC = () => {
  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Quality & Professionalism',
      description: 'Carefully structured, professionally presented work meeting the highest academic & industry standards.',
    },
    {
      icon: DollarSign,
      title: 'Affordable Solutions',
      description: 'Transparent and student-friendly assistance designed around different project scopes and budgets.',
    },
    {
      icon: UserCheck,
      title: 'Personalised Support',
      description: 'Tailored 1-on-1 focus that strictly adheres to your exact instructions, guidelines, and deadlines.',
    },
    {
      icon: MessageSquare,
      title: 'Reliable Communication',
      description: 'Fast, friendly, and responsive communication directly via WhatsApp throughout your project journey.',
    },
  ];

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-4 sm:pb-6 overflow-hidden bg-hero-light dark:bg-hero-dark transition-colors duration-300">
      {/* Decorative background ambient glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-plum-200/30 dark:bg-plum-900/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-16 right-10 w-96 h-96 bg-gold/25 dark:bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Two-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-12">
          {/* Left Column: Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/40 text-plum-900 dark:text-gold text-xs sm:text-sm font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>Welcome to Project Mate</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-3.5xl sm:text-5xl lg:text-5.5xl font-bold tracking-tight text-plum-900 dark:text-warm-ivory leading-[1.14]">
              Your Ideas. Our Expertise.{' '}
              <span className="text-mauve inline-block font-extrabold drop-shadow-sm">
                Your Success.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-plum-950/80 dark:text-warm-ivory/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From academic guidance to creative and technical solutions, Project Mate is your trusted partner in bringing every project to life.
            </p>

            {/* Tagline */}
            <p className="font-serif italic text-base sm:text-lg text-mauve dark:text-gold font-medium">
              "Your Partner in Every Project."
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <a
                href="#services"
                onClick={handleScrollToServices}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-plum-700 hover:bg-plum-800 text-warm-ivory dark:bg-gold dark:text-plum-950 dark:hover:bg-gold-light text-base font-semibold shadow-plum-subtle hover:shadow-plum-hover transition-all duration-300 border border-gold/40 group hover:scale-[1.02]"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={getStartedWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white dark:bg-dark-card hover:bg-plum-50 dark:hover:bg-dark-hover text-plum-900 dark:text-warm-ivory text-base font-semibold border-2 border-gold/50 shadow-sm transition-all duration-300 group hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                <span>Let's Get Started</span>
              </a>
            </div>

            {/* Trust Indicator */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-3 text-xs text-plum-950/65 dark:text-warm-ivory/65">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#C59B27]" />
                ))}
              </div>
              <span className="font-medium">Personalised & Confidential Support in Sri Lanka</span>
            </div>
          </div>

          {/* Right Column: Hero Visual (5 cols) - UNIFIED FOR BOTH LIGHT AND DARK THEMES */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ambient halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-plum-700/20 via-mauve/20 to-gold/30 rounded-3xl blur-xl pointer-events-none" />

              {/* Photorealistic Academic & Creative Workspace Visual Card */}
              <div className="relative rounded-3xl bg-white dark:bg-dark-card border-2 border-gold/40 dark:border-gold/30 p-3 sm:p-4 shadow-xl dark:shadow-2xl overflow-hidden transition-all duration-300">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-warm-cream dark:bg-dark-surface shadow-inner">
                  <picture>
                    <source srcSet={`${import.meta.env.BASE_URL}hero-workspace.webp`} type="image/webp" />
                    <img
                      src={`${import.meta.env.BASE_URL}hero-workspace.jpg`}
                      alt="Project Mate Academic & Creative Workspace Desk"
                      className="w-full h-full object-cover rounded-2xl"
                      width="800"
                      height="600"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </picture>

                  {/* Glassmorphic floating badge: Project Mate Hub */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-plum-900/90 dark:bg-dark-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold/40 text-warm-ivory shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-gold">Project Mate Hub</span>
                  </div>

                  {/* Subtle lower gradient overlay for text readability */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum-950/85 via-plum-950/30 to-transparent p-4 flex items-end justify-between">
                    <div>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-warm-ivory drop-shadow-sm">
                        Academic, Creative & Tech
                      </h4>
                      <p className="text-[11px] text-gold font-medium">
                        Research • Guidance • Systems • Design
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-gold/40 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-gold" />
                    </div>
                  </div>
                </div>

                {/* Workspace Feature Badges */}
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-warm-blush dark:bg-dark-surface border border-gold/30 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-plum-700 text-gold flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-plum-900 dark:text-warm-ivory">100% Tailored</div>
                      <div className="text-[10px] text-plum-950/70 dark:text-warm-ivory/60">Strict Confidentiality</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-warm-blush dark:bg-dark-surface border border-gold/30 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-mauve text-warm-ivory flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-plum-900 dark:text-warm-ivory">Direct WhatsApp</div>
                      <div className="text-[10px] text-plum-950/70 dark:text-warm-ivory/60">Fast Turnaround</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white/85 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-gold/30 dark:border-dark-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 flex items-center justify-center text-plum-700 dark:text-gold mb-3.5 shadow-sm">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-plum-900 dark:text-warm-ivory mb-1.5">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-plum-950/70 dark:text-warm-ivory/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Smooth Curved Transition into About Us Section */}
      <SectionDivider
        variant="wave"
        position="bottom"
        fillClassName="text-warm-blush dark:text-dark-surface"
        secondaryFillClassName="text-gold/25 dark:text-gold/10"
        className="h-8 sm:h-12 lg:h-14"
      />
    </section>
  );
};
