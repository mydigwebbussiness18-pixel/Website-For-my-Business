import React, { useState, useEffect } from "react";
import { businessConfig } from "../config/businessConfig";
import { openWhatsAppChat } from "../utils/whatsapp";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X, MessageCircle, Instagram } from "lucide-react";

interface NavbarProps {
  onOpenOwnerGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOwnerGuide }) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let isScrolled = false;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const nowScrolled = window.scrollY > 20;
        if (nowScrolled !== isScrolled) {
          isScrolled = nowScrolled;
          setScrolled(nowScrolled);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Asynchronous IntersectionObserver for active section: zero layout reflows
    const sectionIds = ["home", "services", "portfolio", "offers", "reviews", "about", "faq", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t.nav.home, href: "#home", id: "home" },
    { name: t.nav.services, href: "#services", id: "services" },
    { name: t.nav.portfolio, href: "#portfolio", id: "portfolio" },
    { name: t.nav.offers, href: "#offers", id: "offers" },
    { name: t.nav.reviews, href: "#reviews", id: "reviews" },
    { name: t.nav.about, href: "#about", id: "about" },
    { name: t.nav.faq, href: "#faq", id: "faq" },
    { name: t.nav.contact, href: "#contact", id: "contact" }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full max-w-full overflow-hidden ${
          scrolled
            ? "bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/20 py-1"
            : "bg-[#0B132B]/90 backdrop-blur-md border-b border-slate-800/70 py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20 gap-2 sm:gap-4">
            {/* Zone 1: Brand Wordmark & Official Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex items-center gap-2 sm:gap-3 group shrink-0 focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl p-0.5 sm:p-1"
              aria-label={`${businessConfig.businessName} Homepage`}
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-[#070D1E] border border-blue-400/40 flex items-center justify-center p-0.5 sm:p-1 shadow-md shadow-blue-500/15 group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300 shrink-0">
                <img
                  src={businessConfig.logo}
                  alt={`${businessConfig.businessName} Official Logo`}
                  className="w-full h-full object-contain rounded-lg block animate-pulse-zoom will-change-transform"
                  width="44"
                  height="44"
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <span className="text-sm sm:text-xl font-extrabold tracking-tight text-white group-hover:text-red-500 transition-colors duration-300 whitespace-nowrap">
                DigWeb <span className="text-blue-400 font-bold group-hover:text-[#F59E0B] transition-colors duration-300">Expert</span>
              </span>
            </a>

            {/* Zone 2: Navigation Links (Desktop lg+) */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`whitespace-nowrap transition-all duration-300 py-1 px-1 relative text-xs xl:text-sm font-semibold tracking-wide ${
                      isActive
                        ? "text-blue-400 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full animate-in fade-in shadow-xs shadow-blue-400" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Actions & Mobile Hamburger Menu Button */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Top-bar Language Switcher (hidden on mobile < sm, available in mobile drawer) */}
              <div className="hidden sm:block">
                <LanguageSwitcher dropdownAlign="right" theme="dark" />
              </div>

              {/* Owner Guide button: hidden below xl */}
              <button
                type="button"
                onClick={onOpenOwnerGuide}
                className="hidden xl:inline-flex text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/90 hover:border-slate-600 rounded-xl px-3 py-1.5 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-xs"
                title="View Owner Configuration & Deployment Guide"
              >
                {t.nav.ownerGuide}
              </button>

              {/* Clickable Instagram Header Icon (Desktop, Tablet, and Mobile) */}
              <a
                href={businessConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DigWeb Expert on Instagram"
                title={`Follow DigWeb Expert on Instagram (${businessConfig.contact.instagramUsername})`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 text-slate-300 hover:text-white border border-slate-700/80 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs shrink-0"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:text-white" />
              </a>

              {/* Top-bar WhatsApp button (Desktop and Tablet sm+) */}
              <button
                type="button"
                onClick={() => openWhatsAppChat(businessConfig.contact.defaultWhatsappMessage)}
                className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-[#C9A227] hover:text-[#0B132B] active:scale-[0.98] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-amber-500/50 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer animate-pulse-zoom shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.nav.chatWhatsApp}</span>
              </button>

              {/* Professional Three-Line Hamburger Button (lg:hidden) */}
              <div className="lg:hidden flex items-center">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700/80 hover:border-blue-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-navigation-menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-white stroke-[2.2]" />
                  ) : (
                    <Menu className="w-5 h-5 text-white stroke-[2.2]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-navigation-menu"
        className={`lg:hidden fixed left-0 right-0 top-[56px] sm:top-[72px] bg-[#0B132B]/98 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 shadow-2xl transition-all duration-300 ease-in-out z-40 max-h-[calc(100vh-64px)] overflow-y-auto ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-4 pointer-events-none invisible"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <nav className="flex flex-col gap-1.5 max-w-lg mx-auto">
          {/* Mobile language picker banner */}
          <div className="pb-3 border-b border-slate-800/80 mb-2 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Language / भाषा:
            </span>
            <LanguageSwitcher dropdownAlign="right" theme="dark" />
          </div>

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 min-h-[44px] ${
                  isActive
                    ? "bg-blue-600/25 text-blue-400 border border-blue-500/40 font-bold shadow-xs"
                    : "text-slate-200 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#38BDF8]" />
                )}
              </a>
            );
          })}

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsAppChat(businessConfig.contact.defaultWhatsappMessage);
              }}
              className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-[#C9A227] hover:text-[#0B132B] active:scale-98 text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md shadow-blue-500/25 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.nav.chatWhatsApp}</span>
            </button>
            <a
              href={businessConfig.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:opacity-90 active:scale-98 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md shadow-pink-500/20"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow on Instagram ({businessConfig.contact.instagramUsername})</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOwnerGuide();
              }}
              className="w-full min-h-[44px] text-center text-xs font-medium text-slate-300 hover:text-white py-2 border border-slate-700/80 rounded-xl hover:bg-slate-800/80 transition-colors duration-200 cursor-pointer"
            >
              {t.nav.ownerGuide}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};
