import React, { useState, useEffect } from "react";
import { businessConfig } from "../config/businessConfig";
import { openWhatsAppChat } from "../utils/whatsapp";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X, MessageCircle } from "lucide-react";

interface NavbarProps {
  onOpenOwnerGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOwnerGuide }) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["home", "services", "portfolio", "offers", "reviews", "about", "faq", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/20 py-1"
          : "bg-[#0B132B]/90 backdrop-blur-md border-b border-slate-800/70 py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
          {/* Zone 1: Brand Wordmark & Official Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl p-1"
            aria-label={`${businessConfig.businessName} Homepage`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-blue-400/40 flex items-center justify-center p-0.5 shadow-md shadow-blue-500/10 group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300">
              <img
                src={businessConfig.logo}
                alt={`${businessConfig.businessName} Official Logo`}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300 whitespace-nowrap">
              DigWeb <span className="text-blue-400 font-bold">Expert</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
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

          {/* Zone 3: Compact Language Switcher & Primary Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Compact Language Switcher with dark theme for navy navbar */}
            <LanguageSwitcher dropdownAlign="right" theme="dark" />

            <button
              type="button"
              onClick={onOpenOwnerGuide}
              className="hidden xl:inline-flex text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/90 hover:border-slate-600 rounded-xl px-3 py-1.5 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-xs"
              title="View Owner Configuration & Deployment Guide"
            >
              {t.nav.ownerGuide}
            </button>

            <button
              type="button"
              onClick={() => openWhatsAppChat(businessConfig.contact.defaultWhatsappMessage)}
              className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.nav.chatWhatsApp}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors duration-200"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B132B]/98 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5">
            {/* Mobile language picker banner */}
            <div className="pb-3 border-b border-slate-800/80 mb-2 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Language:</span>
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
                  className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  {link.name}
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
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md shadow-blue-500/25"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.nav.chatWhatsApp}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOwnerGuide();
                }}
                className="w-full text-center text-xs font-medium text-slate-300 hover:text-white py-2 border border-slate-700/80 rounded-xl hover:bg-slate-800/80 transition-colors duration-200"
              >
                {t.nav.ownerGuide}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
