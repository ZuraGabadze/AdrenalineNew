import React, { useEffect, useState } from 'react';
import { ArrowUp, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SITE_CONFIG } from '../config/site';
import { DiscordSvg } from './DiscordIcon';

export const ToastAndFloating: React.FC = () => {
  const { toasts, triggerClickSound } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    triggerClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Toast Notifications Stack */}
      <div
        aria-live="polite"
        className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-2 sm:px-0"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0D0D0D]/95 border border-[#FF7A00] text-sm font-semibold text-[#F5F5F5] shadow-[0_12px_32px_rgba(255,122,0,0.28)]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#FF7A00] shrink-0" />
            <span>{t.text}</span>
          </div>
        ))}
      </div>

      {/* Floating Desktop Discord & Scroll-to-Top Buttons */}
      <div className="fixed bottom-20 md:bottom-5 left-4 sm:left-5 z-30 flex items-center gap-2.5">
        <a
          href={SITE_CONFIG.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={triggerClickSound}
          aria-label="ოფიციალური Discord სერვერი"
          className="hidden md:inline-flex voxel-btn items-center gap-2 px-4 py-2.5 bg-[#FF7A00] hover:bg-[#FFA640] text-black font-bold text-xs shadow-[0_0_24px_rgba(255,122,0,0.45)]"
        >
          <DiscordSvg className="w-4 h-4" />
          <span>Discord</span>
        </a>

        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="ზემოთ ასვლა"
            className="w-10 h-10 rounded-xl bg-[#141414]/95 hover:bg-[#FF7A00] text-[#F5F5F5] hover:text-black border border-[#FF7A00]/40 flex items-center justify-center shadow-lg transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </>
  );
};
