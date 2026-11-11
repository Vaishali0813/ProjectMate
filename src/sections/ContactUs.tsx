import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import type { Service } from '../types';
import { fetchServices } from '../lib/api';
import {
  WHATSAPP_PHONE_DISPLAY,
  getContactFormWhatsAppUrl,
  getStartedWhatsAppUrl,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from '../lib/whatsapp';
import { InstagramIcon, FacebookIcon } from '../components/SocialIcons';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  whatsappNumber: z.string().min(8, 'Please enter a valid WhatsApp phone number'),
  service: z.string().min(1, 'Please select the required service'),
  otherService: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().min(10, 'Please describe your project in at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactUs: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      whatsappNumber: '',
      service: '',
      otherService: '',
      deadline: '',
      description: '',
    },
  });

  const selectedService = watch('service');

  useEffect(() => {
    async function loadServicesList() {
      try {
        const data = await fetchServices(false);
        setServices(data);
      } catch (err) {
        console.error('Failed to load services for contact form:', err);
      }
    }
    loadServicesList();
  }, []);

  const onSubmit = (values: ContactFormValues) => {
    const serviceName =
      values.service === 'Other' && values.otherService && values.otherService.trim()
        ? `Other: ${values.otherService.trim()}`
        : values.service;

    const whatsappUrl = getContactFormWhatsAppUrl({
      fullName: values.fullName,
      email: values.email,
      whatsappNumber: values.whatsappNumber,
      service: serviceName,
      description: values.description,
      deadline: values.deadline,
    });

    // Open WhatsApp in a new tab so user can review and hit send
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-warm-cream/40 dark:bg-dark-surface/40 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/40 text-xs font-bold uppercase tracking-wider text-plum-900 dark:text-gold shadow-sm">
            <span>Get In Touch</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 dark:text-warm-white">
            Let's Bring Your Ideas to Life.
          </h2>

          <p className="text-base sm:text-lg text-plum-950/75 dark:text-warm-white/75 leading-relaxed font-normal">
            Have a project in mind? We're here to help you take the next step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-dark-card rounded-3xl p-8 border border-gold/30 dark:border-dark-border shadow-plum-subtle space-y-6">
              <h3 className="font-serif text-2xl font-bold text-plum-900 dark:text-warm-white">
                Contact Information
              </h3>
              <p className="text-sm text-plum-950/70 dark:text-warm-white/70 leading-relaxed">
                Reach out to us directly through WhatsApp or connect across our official social channels.
              </p>

              {/* Direct WhatsApp Box */}
              <div className="p-5 rounded-2xl bg-plum-50 dark:bg-dark-surface border border-gold/30 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-plum-950/60 dark:text-warm-white/60">
                      Official WhatsApp
                    </div>
                    <a
                      href={getStartedWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-plum-900 dark:text-gold hover:underline"
                    >
                      {WHATSAPP_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-plum-950/60 dark:text-warm-white/60">
                  Follow Us Online
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 hover:border-gold text-plum-900 dark:text-warm-white hover:text-mauve flex items-center justify-between text-xs font-semibold transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <InstagramIcon className="w-4 h-4 text-pink-600" />
                      Instagram
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>

                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-plum-50 dark:bg-dark-surface border border-gold/30 hover:border-gold text-plum-900 dark:text-warm-white hover:text-mauve flex items-center justify-between text-xs font-semibold transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FacebookIcon className="w-4 h-4 text-blue-600" />
                      Facebook
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
              </div>

              {/* Location Badge */}
              <div className="pt-2 border-t border-gold/20 text-xs text-plum-950/60 dark:text-warm-white/60">
                📍 Serving students and professionals across Sri Lanka & internationally.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-10 border-2 border-gold/40 dark:border-dark-border shadow-plum-subtle">
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-plum-900 dark:text-warm-white mb-2">
                  Send a Direct Project Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-plum-950/70 dark:text-warm-white/70">
                  Fill in your project details below. Submitting will prepare and open WhatsApp with your message formatted for instant delivery.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      {...register('fullName')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors bg-warm-white/50 dark:bg-dark-surface dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold ${
                        errors.fullName
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-gold/30 dark:border-dark-border'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      {...register('email')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors bg-warm-white/50 dark:bg-dark-surface dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold ${
                        errors.email
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-gold/30 dark:border-dark-border'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* WhatsApp Number */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1.5">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+94 7X XXX XXXX"
                      {...register('whatsappNumber')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors bg-warm-white/50 dark:bg-dark-surface dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold ${
                        errors.whatsappNumber
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-gold/30 dark:border-dark-border'
                      }`}
                    />
                    {errors.whatsappNumber && (
                      <p className="text-xs text-red-500 mt-1">{errors.whatsappNumber.message}</p>
                    )}
                  </div>

                  {/* Required Service */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1.5">
                      Required Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register('service')}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors bg-warm-white/50 dark:bg-dark-surface dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold ${
                        errors.service
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-gold/30 dark:border-dark-border'
                      }`}
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                    {errors.service && (
                      <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                {/* Other service optional input */}
                {selectedService === 'Other' && (
                  <div className="animate-in fade-in duration-200">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1.5">
                      Specify Service
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Statistical Analysis Guidance"
                      {...register('otherService')}
                      className="w-full px-4 py-3 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-white/50 dark:bg-dark-surface text-sm dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                )}

                {/* Optional Preferred Deadline */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1.5">
                    Preferred Deadline (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Within 2 weeks / End of this month"
                    {...register('deadline')}
                    className="w-full px-4 py-3 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-white/50 dark:bg-dark-surface text-sm dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-white mb-1.5">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Please outline your topic, academic level or technical requirements..."
                    {...register('description')}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors bg-warm-white/50 dark:bg-dark-surface dark:text-warm-white focus:outline-none focus:ring-2 focus:ring-gold ${
                      errors.description
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-gold/30 dark:border-dark-border'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
                  )}
                </div>

                {/* Submit to WhatsApp Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-plum-800 hover:bg-plum-900 text-warm-white dark:bg-gold dark:text-plum-950 dark:hover:bg-gold-light font-semibold text-sm sm:text-base shadow-plum-subtle hover:shadow-plum-hover transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                    <span>Open WhatsApp with Project Enquiry</span>
                  </button>
                  <p className="text-center text-[11px] text-plum-950/60 dark:text-warm-white/50 mt-2">
                    Clicking will open WhatsApp directly with your message pre-formatted. You can review before sending.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
