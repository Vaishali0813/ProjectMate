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
      const headerOffset = 85;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-plum-900 text-warm-white relative overflow-hidden pt-16 pb-12 border-t-2 border-gold/40">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-mauve/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold shadow-md bg-white">
                <img src="/logo.jpg" alt="Project Mate" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-warm-white tracking-wide">
                  Project<span className="text-gold">Mate</span>
                </h3>
                <p className="text-xs uppercase tracking-wider text-gold font-medium">
                  Your Partner in Every Project.
                </p>
              </div>
            </div>
            <p className="text-sm text-plum-100/80 leading-relaxed pt-2">
              Reliable, affordable, and personalised academic, creative, and technical support services in Sri Lanka. Bringing your project to life with excellence.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={getStartedWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-plum-800 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-plum-950 transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-plum-800 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-plum-950 transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-plum-800 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-plum-950 transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-gold tracking-wide border-b border-gold/20 pb-2 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
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

          {/* Col 3: Key Services */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-gold tracking-wide border-b border-gold/20 pb-2 inline-block">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-plum-100/80">
              <li>Research & Report Writing Support</li>
              <li>Academic Consultation</li>
              <li>Assignment Support & Guidance</li>
              <li>CV Preparation & Redesign</li>
              <li>Presentation Design</li>
              <li>System Development</li>
              <li>Graphic & UI Design</li>
            </ul>
          </div>

          {/* Col 4: Contact & Feedback CTA */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-gold tracking-wide border-b border-gold/20 pb-2 inline-block">
              Get in Touch
            </h4>
            <p className="text-sm text-plum-100/80">
              Have a question or looking to begin? Reach out directly via WhatsApp for quick consultation.
            </p>
            <div className="p-4 rounded-xl bg-plum-800/70 border border-gold/30 space-y-2">
              <div className="text-xs text-gold uppercase tracking-wider font-semibold">WhatsApp Support</div>
              <a
                href={getStartedWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-warm-white hover:text-gold transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                {WHATSAPP_PHONE_DISPLAY}
              </a>
            </div>
            <a
              href="#share-experience"
              onClick={(e) => handleLinkClick(e, '#share-experience')}
              className="inline-block text-xs uppercase tracking-wider font-semibold text-gold hover:text-warm-white underline underline-offset-4 transition-colors"
            >
              Share Your Customer Experience &rarr;
            </a>
          </div>
        </div>

        {/* Divider with Champagne Gold detail */}
        <div className="relative my-6">
          <div className="border-t border-gold/25" />
          <div className="absolute left-1/2 -top-2.5 -translate-x-1/2 bg-plum-900 px-3 text-gold">
            ✦
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-plum-200/70 pt-2">
          <p>© 2026 Project Mate. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <span>Academic, Creative & Technical Solutions</span>
            <span>•</span>
            <span>Sri Lanka</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gold hover:text-warm-white transition-colors p-2 rounded-lg bg-plum-800/50 hover:bg-plum-800 border border-gold/20"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
