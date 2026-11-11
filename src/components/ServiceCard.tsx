import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import type { Service } from '../types';
import { ServiceIcon } from '../lib/icons';
import { getServiceQuoteWhatsAppUrl } from '../lib/whatsapp';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const quoteUrl = getServiceQuoteWhatsAppUrl(service.name);

  return (
    <div className="group relative bg-white dark:bg-dark-card rounded-2xl p-7 border border-gold/30 dark:border-dark-border shadow-plum-subtle hover:shadow-plum-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Subtle top decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-plum-800 via-mauve to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Icon Container */}
        <div className="w-14 h-14 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 dark:border-dark-border flex items-center justify-center text-plum-800 dark:text-gold mb-5 group-hover:bg-plum-800 group-hover:text-warm-white group-hover:scale-105 transition-all duration-300 shadow-sm">
          <ServiceIcon name={service.icon} className="w-7 h-7" />
        </div>

        {/* Service Title */}
        <h3 className="font-serif text-xl font-bold text-plum-900 dark:text-warm-white mb-3 group-hover:text-mauve dark:group-hover:text-gold transition-colors">
          {service.name}
        </h3>

        {/* Service Description */}
        <p className="text-sm text-plum-950/70 dark:text-warm-white/70 leading-relaxed mb-6">
          {service.description}
        </p>
      </div>

      {/* "Get a Quote" WhatsApp CTA Button */}
      <div className="pt-2 border-t border-gold/20 dark:border-dark-border/60">
        <a
          href={quoteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-plum-800 dark:text-gold bg-plum-50/60 dark:bg-dark-surface/80 hover:bg-plum-800 hover:text-warm-white dark:hover:bg-gold dark:hover:text-plum-950 transition-all duration-200 border border-gold/30 dark:border-dark-border group/btn"
        >
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gold dark:group-hover/btn:text-plum-950" />
            Get a Quote
          </span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};
