import React from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { WHATSAPP_PHONE_DISPLAY, getStartedWhatsAppUrl, INSTAGRAM_URL, FACEBOOK_URL } from '../lib/whatsapp';
import { InstagramIcon, FacebookIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const headerOffset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const services = [
    'Research & Report Writing',
    'Academic Consultation',
    'Assignment Support',
    'CV Preparation',
    'Presentation Design',
    'System Development',
    'Graphic & UI Design',
  ];

  return (
    <footer className="bg-plum-900 text-warm-ivory relative overflow-hidden pt-12 pb-10 border-t-2 border-gold/40">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-mauve/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold shadow-md bg-white shrink-0">
                <img
                  src={`${import.meta.env.BASE_URL}logo.jpg`}
                  alt="Project Mate Official Logo"
                  className="w-full h-full object-cover"
                  width="48"
                  height="48"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-warm-ivory tracking-wide leading-none">
                  Project<span className="text-gold">Mate</span>
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-gold font-medium mt-1">
                  Your Partner in Every Project.
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-plum-100/80 leading-relaxed">
              Reliable, affordable, and personalised academic, creative, and technical support services in Sri Lanka. Bringing your project to life with excellence.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={getStartedWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-plum-800 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-plum-950 transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4.5 h-4.5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-plum-800 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-plum-950 transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-plum-800 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-plum-950 transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base sm:text-lg font-semibold text-gold tracking-wide border-b border-gold/20 pb-1.5 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, '#home')}
                  className="text-plum-100/80 hover:text-gold transition-colors inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, '#about')}
                  className="text-plum-100/80 hover:text-gold transition-colors inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, '#services')}
                  className="text-plum-100/80 hover:text-gold transition-colors inline-block"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="#success-stories"
                  onClick={(e) => handleLinkClick(e, '#success-stories')}
                  className="text-plum-100/80 hover:text-gold transition-colors inline-block"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#why-choose-us"
                  onClick={(e) => handleLinkClick(e, '#why-choose-us')}
                  className="text-plum-100/80 hover:text-gold transition-colors inline-block"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleLinkClick(e, '#how-it-works')}
                  className="text-plum-100/80 hover:text-gold transition-colors inline-block"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="text-plum-100/80 hover:text-gold transition-colors inline-block"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Offered */}
          <div className="space-y-3">
            <h4 className="font-serif text-base sm:text-lg font-semibold text-gold tracking-wide border-b border-gold/20 pb-1.5 inline-block">
              Support Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-plum-100/80">
              {services.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#services"
                    onClick={(e) => handleLinkClick(e, '#services')}
                    className="hover:text-gold transition-colors inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Help */}
          <div className="space-y-3">
            <h4 className="font-serif text-base sm:text-lg font-semibold text-gold tracking-wide border-b border-gold/20 pb-1.5 inline-block">
              Direct Inquiries
            </h4>
            <p className="text-xs sm:text-sm text-plum-100/80 leading-relaxed">
              Have a question or need advice? We're available on WhatsApp for direct consultations.
            </p>
            <div className="pt-1">
              <a
                href={getStartedWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-plum-800 hover:bg-gold hover:text-plum-950 text-gold border border-gold/30 text-xs sm:text-sm font-semibold transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{WHATSAPP_PHONE_DISPLAY}</span>
              </a>
            </div>
            <div className="text-[11px] text-plum-100/60 pt-1">
              Operating hours: Mon - Sun | 8:00 AM - 10:00 PM (IST)
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-plum-100/60">
          <p>© {new Date().getFullYear()} Project Mate. All rights reserved. Dedicated to Academic & Creative Excellence.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-gold hover:underline focus:outline-none"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
