import React from 'react';
import { MessageCircle, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import type { Service } from '../types';
import { ServiceIcon } from '../lib/icons';
import { getServiceQuoteWhatsAppUrl } from '../lib/whatsapp';

interface ServiceCardProps {
  service: Service;
}

// Bespoke deliverables & category tags for each service
const SERVICE_META: Record<
  string,
  {
    category: string;
    highlights: string[];
    tag: string;
  }
> = {
  'Research & Report Writing Support': {
    category: 'Academic Research',
    tag: 'Popular',
    highlights: [
      'Literature review & topic analysis',
      'Citations (APA, Harvard, IEEE, MLA)',
      'Proofreading, editing & formatting',
    ],
  },
  'Academic Consultation': {
    category: 'Consultation & Advisory',
    tag: '1-on-1 Guidance',
    highlights: [
      'Research planning & framework development',
      'Personalised academic advisory sessions',
      'Conceptual clarity & methodological guidance',
    ],
  },
  'Assignment Support & Guidance': {
    category: 'Student Support',
    tag: 'Comprehensive',
    highlights: [
      'Assignment breakdown & structural planning',
      'Concept explanation & drafting guidance',
      'Final review, formatting & compliance check',
    ],
  },
  'CV Preparation': {
    category: 'Career & Professional',
    tag: 'High Impact',
    highlights: [
      'Modern ATS-compliant CV & resume architecture',
      'Strategic career summary & skills highlighting',
      'Executive formatting & typography polish',
    ],
  },
  'Presentation Design': {
    category: 'Visual & Media',
    tag: 'Engaging',
    highlights: [
      'Academic & corporate PowerPoint slide decks',
      'Visual hierarchy & infographic storytelling',
      'Delivered in PPTX, Keynote & high-res PDF',
    ],
  },
  'System Development': {
    category: 'Technical Solutions',
    tag: 'Custom Built',
    highlights: [
      'Custom responsive websites & web applications',
      'Clean architecture & modern software solutions',
      'Database integration, testing & deployment',
    ],
  },
  'Graphic & UI Design': {
    category: 'Creative Design',
    tag: 'Creative',
    highlights: [
      'Social media graphics & marketing posters',
      'Brand identity assets & vector graphics',
      'User interface (UI) & web layout prototypes',
    ],
  },
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const quoteUrl = getServiceQuoteWhatsAppUrl(service.name);
  const meta = SERVICE_META[service.name] || {
    category: 'Project Support',
    tag: 'Tailored',
    highlights: [
      'Professional project guidance',
      'Tailored to your exact requirements',
      'Direct communication on WhatsApp',
    ],
  };

  return (
    <div className="group relative bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-7 border-2 border-gold/35 dark:border-dark-border hover:border-gold/80 dark:hover:border-gold/60 shadow-plum-subtle hover:shadow-plum-hover hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Gradient Decorative Edge Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-plum-700 via-mauve to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Decorative subtle background corner bloom */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/15 dark:bg-gold/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

      <div>
        {/* Top Header Row: Category Badge & Service Tag */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/30 text-[11px] font-bold uppercase tracking-wider text-plum-900 dark:text-gold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {meta.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-mauve dark:text-gold/90 bg-gold/15 dark:bg-gold/10 px-2.5 py-0.5 rounded-md">
            <Sparkles className="w-3 h-3 text-gold" />
            {meta.tag}
          </span>
        </div>

        {/* Icon & Title Block */}
        <div className="flex items-start gap-4 mb-4">
          {/* Dual-tone sculpted icon container */}
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-plum-700 to-plum-900 text-gold flex items-center justify-center shrink-0 shadow-md ring-4 ring-gold/25 group-hover:ring-gold/60 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
            <ServiceIcon name={service.icon} className="w-6.5 h-6.5 sm:w-7 sm:h-7" />
          </div>

          <div className="pt-0.5">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-plum-900 dark:text-warm-ivory group-hover:text-plum-700 dark:group-hover:text-gold transition-colors leading-snug">
              {service.name}
            </h3>
          </div>
        </div>

        {/* Service Description */}
        <p className="text-xs sm:text-sm text-plum-950/75 dark:text-warm-ivory/75 leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Key Deliverables / Highlights Checklist */}
        <div className="pt-3 pb-2 border-t border-gold/20 dark:border-dark-border/60 space-y-2 mb-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-plum-900/60 dark:text-warm-ivory/60 mb-2">
            What's Included
          </div>
          {meta.highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-plum-950/85 dark:text-warm-ivory/90 leading-tight">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prominent WhatsApp Quote CTA Action */}
      <div className="pt-3 border-t border-gold/20 dark:border-dark-border/60">
        <a
          href={quoteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-warm-ivory bg-plum-700 hover:bg-plum-800 dark:bg-gold dark:text-plum-950 dark:hover:bg-gold-light shadow-plum-subtle hover:shadow-plum-hover transition-all duration-300 border border-gold/40 group/btn"
        >
          <span className="flex items-center gap-2">
            <MessageCircle className="w-4.5 h-4.5 text-[#25D366] fill-[#25D366] dark:text-plum-950 dark:fill-plum-950" />
            <span>Inquire on WhatsApp</span>
          </span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-200" />
        </a>
      </div>
    </div>
  );
};
