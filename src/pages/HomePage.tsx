import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../sections/Hero';
import { AboutUs } from '../sections/AboutUs';
import { Services } from '../sections/Services';
import { SuccessStories } from '../sections/SuccessStories';
import { ShareYourExperience } from '../sections/ShareYourExperience';
import { WhyChooseUs } from '../sections/WhyChooseUs';
import { HowItWorks } from '../sections/HowItWorks';
import { ContactUs } from '../sections/ContactUs';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-warm-white dark:bg-dark-bg text-plum-950 dark:text-warm-white selection:bg-mauve selection:text-white transition-colors duration-300">
      {/* Sticky Header with Navigation, Theme Toggle, WhatsApp CTA */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Home / Hero Section */}
        <Hero />

        {/* 2. About Us */}
        <AboutUs />

        {/* 3. Our Services */}
        <Services />

        {/* 4. Success Stories */}
        <SuccessStories />

        {/* 5. Share Your Experience (Customer Feedback Form) */}
        <ShareYourExperience />

        {/* 6. Why Choose Project Mate */}
        <WhyChooseUs />

        {/* 7. How It Works */}
        <HowItWorks />

        {/* 8. Contact Us */}
        <ContactUs />
      </main>

      {/* 9. Premium Deep Plum Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
};
