import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Premium Back to Top Floating Button.
 * - Positioned symmetrically at bottom-right (avoiding left-side FloatingWhatsApp).
 * - Reveals smoothly after scrolling past the hero fold.
 * - Features a golden circular scroll-progress ring in DigWeb Expert's luxury navy & gold theme.
 */
export const FloatingBackToTop: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      ticking = false;
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const visible = scrollY > 320;
      setIsVisible(visible);

      if (docHeight > 0) {
        const ratio = Math.min(1, Math.max(0, scrollY / docHeight));
        setScrollProgress(ratio);
      } else {
        setScrollProgress(0);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrollState);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollState();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth"
    });
  };

  // SVG ring geometry (44x44 viewBox)
  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);
  const label = t.footer.backToTop || "Back to Top";

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2.5 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Desktop hover/focus tooltip pointing left */}
      <div
        role="tooltip"
        className={`hidden md:block transition-all duration-200 pointer-events-none ${
          showTooltip
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2"
        }`}
      >
        <div className="bg-[#0B132B]/95 backdrop-blur-md text-[#D4AF37] text-xs font-semibold py-1.5 px-3 rounded-xl shadow-lg border border-[#D4AF37]/35 whitespace-nowrap">
          {label}
        </div>
      </div>

      <button
        type="button"
        onClick={handleScrollToTop}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label={label}
        title={label}
        tabIndex={isVisible ? 0 : -1}
        className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0B132B]/92 backdrop-blur-md border border-[#3B82F6]/35 hover:border-[#D4AF37]/80 text-white shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-[#D4AF37]/25 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
      >
        {/* Subtle golden scroll progress ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 44 44"
          aria-hidden="true"
        >
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="rgba(59, 130, 246, 0.22)"
            strokeWidth="2"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="url(#backToTopGoldGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
          <defs>
            <linearGradient id="backToTopGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>

        <ArrowUp className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#D4AF37] group-hover:text-[#F59E0B] group-hover:-translate-y-0.5 transition-all duration-300 relative z-10" />
      </button>
    </div>
  );
};
