import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import type { Service } from '../types';
import { fetchServices } from '../lib/api';
import { ServiceCard } from '../components/ServiceCard';

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
    <section id="services" className="py-20 sm:py-28 bg-warm-white dark:bg-dark-bg transition-colors duration-300 relative">
      {/* Decorative background gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-plum-100/30 dark:bg-plum-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/40 text-xs font-bold uppercase tracking-wider text-plum-900 dark:text-gold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Our Offerings</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 dark:text-warm-white">
            Everything You Need, All in One Place.
          </h2>

          <p className="text-base sm:text-lg text-plum-950/75 dark:text-warm-white/75 leading-relaxed font-normal">
            Professional academic, creative, and technical solutions tailored to your needs.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-mauve dark:text-gold">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-sm font-medium">Loading services...</p>
          </div>
        )}

        {/* Dynamic Services Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Empty State fallback */}
        {!loading && services.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-dark-card rounded-2xl border border-gold/30 p-8">
            <p className="text-plum-900 dark:text-warm-white font-medium">
              Services are currently being updated. Please check back shortly or contact us on WhatsApp!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
