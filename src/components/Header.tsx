import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getStartedWhatsAppUrl } from '../lib/whatsapp';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Success Stories', href: '#success-stories' },
  { label: 'Contact', href: '#contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-warm-ivory/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-md py-3 border-b border-gold-subtle/30 dark:border-dark-border'
          : 'bg-warm-ivory/80 dark:bg-dark-bg/80 backdrop-blur-sm py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Project Mate Home"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300 ring-2 ring-gold/50 bg-white shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}logo.jpg`}
                alt="Project Mate Official Logo"
                className="w-full h-full object-cover"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-plum-900 dark:text-warm-ivory leading-none">
                Project<span className="text-gold-dark dark:text-gold">Mate</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-medium text-mauve dark:text-gold/90 mt-1">
                Your Partner in Every Project.
              </span>
            </div>
          </a>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-white/80 dark:bg-dark-card/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/30 dark:border-dark-border shadow-sm">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-plum-700 text-warm-ivory shadow-sm dark:bg-gold dark:text-plum-950 font-semibold'
                      : 'text-plum-900/80 hover:text-plum-900 dark:text-warm-ivory/80 dark:hover:text-gold hover:bg-gold/15 dark:hover:bg-dark-hover'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle & WhatsApp Get Started CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2.5 rounded-full bg-white/80 dark:bg-dark-card border border-gold/30 dark:border-dark-border text-plum-800 dark:text-gold hover:bg-gold/20 dark:hover:bg-dark-hover transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-gold"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-gold hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-plum-800 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Get Started Button */}
            <a
              href={getStartedWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-plum-700 hover:bg-plum-800 text-warm-ivory dark:bg-gradient-to-r dark:from-gold dark:to-gold-dark dark:text-plum-950 px-5 py-2.5 rounded-full text-xs lg:text-sm font-semibold shadow-plum-subtle hover:shadow-plum-hover transition-all duration-300 group hover:scale-[1.02] border border-gold/40"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 rounded-full bg-white/80 dark:bg-dark-card border border-gold/30 dark:border-dark-border text-plum-800 dark:text-gold"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-plum-800" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl bg-plum-50 dark:bg-dark-card border border-gold/30 text-plum-900 dark:text-gold"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white dark:bg-dark-card rounded-2xl border border-gold/30 dark:border-dark-border shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-plum-700 text-warm-ivory font-semibold dark:bg-gold dark:text-plum-950'
                      : 'text-plum-900 dark:text-warm-ivory hover:bg-plum-50 dark:hover:bg-dark-hover'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="pt-2 border-t border-gold/20">
              <a
                href={getStartedWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-plum-700 text-warm-ivory dark:bg-gold dark:text-plum-950 font-semibold text-sm shadow-sm"
              >
                <span>Get Started on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
