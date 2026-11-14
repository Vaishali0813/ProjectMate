import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, AlertCircle, Send, Loader2, Sparkles } from 'lucide-react';
import type { Service } from '../types';
import { fetchServices, submitCustomerReview } from '../lib/api';
import { StarRating } from '../components/StarRating';
import { SectionDivider } from '../components/SectionDivider';

const feedbackSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select the service you received'),
  otherService: z.string().optional(),
  rating: z.number().min(1, 'Please select a star rating between 1 and 5').max(5),
  feedback: z
    .string()
    .min(15, 'Feedback must be at least 15 characters')
    .max(1000, 'Feedback must be under 1000 characters'),
  consentToPublish: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must provide consent to publish your review',
    }),
  hpWebsite: z.string().optional(), // Honeypot field for bot spam prevention
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export const ShareYourExperience: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      customerName: '',
      email: '',
      service: '',
      otherService: '',
      rating: 5,
      feedback: '',
      consentToPublish: false,
      hpWebsite: '',
    },
  });

  const selectedService = watch('service');
  const feedbackText = watch('feedback') || '';

  useEffect(() => {
    async function loadServicesList() {
      try {
        const data = await fetchServices(false);
        setServices(data);
      } catch (err) {
        console.error('Failed to load services for dropdown:', err);
      }
    }
    loadServicesList();
  }, []);

  const onSubmit = async (values: FeedbackFormValues) => {
    // Bot Spam prevention: if honeypot is filled, quietly reject
    if (values.hpWebsite && values.hpWebsite.trim().length > 0) {
      console.warn('Bot submission blocked via honeypot');
      return;
    }

    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const serviceName =
      values.service === 'Other'
        ? values.otherService && values.otherService.trim()
          ? `Other: ${values.otherService.trim()}`
          : 'Other'
        : values.service;

    const matchedService = services.find((s) => s.name === values.service);

    try {
      await submitCustomerReview({
        customer_name: values.customerName.trim(),
        email: values.email.trim(),
        service_id: matchedService?.id,
        service_name_snapshot: serviceName,
        rating: values.rating,
        feedback: values.feedback.trim(),
        consent_to_publish: values.consentToPublish,
      });

      setSuccessMessage(
        'Thank you for sharing your feedback! Your review has been submitted successfully and will appear on our website after review.'
      );
      reset({
        customerName: '',
        email: '',
        service: '',
        otherService: '',
        rating: 5,
        feedback: '',
        consentToPublish: false,
        hpWebsite: '',
      });
    } catch (err: any) {
      console.error('Feedback submission error:', err);
      setErrorMessage(
        err?.message || 'We could not submit your review at this time. Please try again or reach out to us on WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="share-experience" className="pt-12 sm:pt-16 pb-4 sm:pb-6 bg-warm-ivory dark:bg-dark-bg transition-colors duration-300 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-50 dark:bg-dark-surface border border-gold/40 text-xs font-bold uppercase tracking-wider text-plum-900 dark:text-gold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Customer Feedback</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 dark:text-warm-ivory leading-tight">
            Share Your Experience
          </h2>

          <h3 className="text-base sm:text-lg font-serif italic text-mauve dark:text-gold">
            "Your Feedback Matters to Us."
          </h3>

          <p className="text-sm sm:text-base text-plum-950/75 dark:text-warm-ivory/75 max-w-2xl mx-auto leading-relaxed font-normal">
            Thank you for choosing Project Mate! We'd love to hear about your experience. Your feedback helps us improve our services and continue delivering quality support.
          </p>
        </div>

        {/* Feedback Form Card */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border-2 border-gold/40 dark:border-dark-border shadow-plum-subtle">
          {/* Success Banner */}
          {successMessage && (
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/50 flex items-start gap-3.5 animate-in fade-in duration-300">
              <CheckCircle2 className="w-5.5 h-5.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm sm:text-base mb-1">
                  Feedback Received
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  {successMessage}
                </p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-500/50 flex items-start gap-3.5 animate-in fade-in duration-300">
              <AlertCircle className="w-5.5 h-5.5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-900 dark:text-red-200 text-sm mb-1">
                  Submission Notice
                </h4>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-300">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Honeypot hidden input for spam bots */}
            <input
              type="text"
              {...register('hpWebsite')}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-ivory mb-1.5">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nimalka Fernando"
                  {...register('customerName')}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-warm-ivory/50 dark:bg-dark-surface dark:text-warm-ivory focus:outline-none focus:ring-2 focus:ring-gold ${
                    errors.customerName
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-gold/30 dark:border-dark-border focus:border-plum-700'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-xs text-red-500 mt-1">{errors.customerName.message}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-ivory mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. yourname@example.com"
                  {...register('email')}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-warm-ivory/50 dark:bg-dark-surface dark:text-warm-ivory focus:outline-none focus:ring-2 focus:ring-gold ${
                    errors.email
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-gold/30 dark:border-dark-border focus:border-plum-700'
                  }`}
                />
                {errors.email ? (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                ) : (
                  <p className="text-[11px] text-plum-950/60 dark:text-warm-ivory/50 mt-1">
                    Your email is strictly private and will never be displayed publicly.
                  </p>
                )}
              </div>
            </div>

            {/* Service Received & Overall Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-start">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-ivory mb-1.5">
                  Service Received <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('service')}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-warm-ivory/50 dark:bg-dark-surface dark:text-warm-ivory focus:outline-none focus:ring-2 focus:ring-gold ${
                    errors.service
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-gold/30 dark:border-dark-border focus:border-plum-700'
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

              {/* Overall Rating Component */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-ivory mb-1.5">
                  Overall Rating <span className="text-red-500">*</span>
                </label>
                <div className="py-1">
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                      <StarRating
                        rating={field.value}
                        onChange={field.onChange}
                        size="md"
                        showLabel
                      />
                    )}
                  />
                </div>
                {errors.rating && (
                  <p className="text-xs text-red-500 mt-1">{errors.rating.message}</p>
                )}
              </div>
            </div>

            {/* Optional Other Service Specification */}
            {selectedService === 'Other' && (
              <div className="animate-in fade-in duration-200">
                <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-ivory mb-1.5">
                  Please Specify Service Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Statistical Analysis Guidance"
                  {...register('otherService')}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold/30 dark:border-dark-border bg-warm-ivory/50 dark:bg-dark-surface text-sm dark:text-warm-ivory focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            )}

            {/* Feedback Message */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-plum-900 dark:text-warm-ivory">
                  Your Feedback <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-plum-950/60 dark:text-warm-ivory/50">
                  {feedbackText.length}/1000 characters
                </span>
              </div>
              <textarea
                rows={3}
                placeholder="Tell us about your experience with Project Mate..."
                {...register('feedback')}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-warm-ivory/50 dark:bg-dark-surface dark:text-warm-ivory focus:outline-none focus:ring-2 focus:ring-gold ${
                  errors.feedback
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-gold/30 dark:border-dark-border focus:border-plum-700'
                }`}
              />
              {errors.feedback && (
                <p className="text-xs text-red-500 mt-1">{errors.feedback.message}</p>
              )}
            </div>

            {/* Consent to Publish Checkbox */}
            <div className="p-3.5 rounded-xl bg-plum-50/70 dark:bg-dark-surface/60 border border-gold/30 dark:border-dark-border">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register('consentToPublish')}
                  className="mt-0.5 w-4 h-4 rounded text-plum-700 dark:text-gold border-gray-300 focus:ring-gold"
                />
                <span className="text-xs sm:text-sm text-plum-950/80 dark:text-warm-ivory/80 leading-relaxed">
                  I agree that my name, selected service, rating, and feedback may be displayed publicly on the Project Mate website after review.
                </span>
              </label>
              {errors.consentToPublish && (
                <p className="text-xs text-red-500 mt-1.5 pl-7 font-medium">
                  {errors.consentToPublish.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-plum-700 hover:bg-plum-800 text-warm-ivory dark:bg-gold dark:text-plum-950 dark:hover:bg-gold-light font-semibold text-sm shadow-plum-subtle hover:shadow-plum-hover transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Your Feedback...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    <span>Submit Your Feedback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Smooth Curved Transition into Why Choose Us (Soft Blush / Dark Surface) */}
      <SectionDivider
        variant="curve"
        position="bottom"
        fillClassName="text-warm-blush dark:text-dark-surface"
        secondaryFillClassName="text-gold/25 dark:text-gold/10"
        className="h-8 sm:h-12 lg:h-14"
      />
    </section>
  );
};
