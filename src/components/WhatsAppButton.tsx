import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getStartedWhatsAppUrl } from '../lib/whatsapp';

export const WhatsAppButton: React.FC = () => {
  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40">
      <div className="relative group">
        {/* Pulsing glow effect */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 dark:bg-gold/30 blur-sm animate-ping pointer-events-none" />

        <a
          href={getStartedWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white/50 dark:ring-dark-card/80"
          aria-label="Chat with Project Mate on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />

          {/* Active online badge */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-gold rounded-full ring-2 ring-white dark:ring-plum-950" />
        </a>

        {/* Hover Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-plum-900 text-warm-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg border border-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
          Chat with Project Mate on WhatsApp
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-plum-900 rotate-45 border-t border-r border-gold/40" />
        </div>
      </div>
    </aside>
  );
};
