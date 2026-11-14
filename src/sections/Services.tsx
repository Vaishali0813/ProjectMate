import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import type { Service } from '../types';
import { fetchServices } from '../lib/api';
import { ServiceCard } from '../components/ServiceCard';
import { SectionDivider } from '../components/SectionDivider';

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await fetchServices(false); // only active services
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <section id="services" className="pt-12 sm:pt-16 pb-4 sm:pb-6 bg-warm-ivory dark:bg-dark-bg transition-colors duration-300 relative">
      {/* Decorative background ambient gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-plum-100/30 dark:bg-plum-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/40 text-xs font-bold uppercase tracking-wider text-plum-900 dark:text-gold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Our Offerings</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 dark:text-warm-ivory leading-tight">
            Everything You Need, All in One Place.
          </h2>

          <p className="text-base sm:text-lg text-plum-950/75 dark:text-warm-ivory/75 leading-relaxed font-normal">
            Professional academic, creative, and technical solutions tailored to your needs.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 text-mauve dark:text-gold">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-sm font-medium">Loading services...</p>
          </div>
        )}

        {/* Dynamic Services Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Empty State Fallback */}
        {!loading && services.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-dark-card rounded-2xl border border-gold/30 p-8 shadow-sm">
            <p className="text-plum-900 dark:text-warm-ivory font-medium">
              Services are currently being updated. Please check back shortly or contact us on WhatsApp!
            </p>
          </div>
        )}
      </div>

      {/* Smooth Curved Transition into Success Stories (Soft Blush / Dark Surface) */}
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
