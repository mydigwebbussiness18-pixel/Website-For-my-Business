import React from "react";
import { businessConfig } from "../config/businessConfig";
import { useLanguage } from "../i18n/LanguageContext";
import { openWhatsAppChat } from "../utils/whatsapp";
import { MessageCircle, Instagram, Mail, ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenPrivacyPolicy: () => void;
  onOpenOwnerGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyPolicy,
  onOpenOwnerGuide
}) => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B132B] text-slate-300 text-xs pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/90">
          {/* Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-[#070D1E] border border-blue-400/40 flex items-center justify-center p-0.5 shadow-md shadow-blue-500/10">
                <img
                  src={businessConfig.logo}
                  alt={`${businessConfig.businessName} Logo`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                DigWeb <span className="text-blue-400">Expert</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              {t.footer.description}
            </p>

            <div className="text-[11px] text-slate-400">
              {t.footer.founderLabel} <span className="text-white font-semibold">{businessConfig.founder.name}</span>
            </div>
          </div>

          {/* Quick Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.navHeading}
            </h4>
            <ul className="space-y-2">
              {[
                { label: t.nav.home, id: "home" },
                { label: t.nav.services, id: "services" },
                { label: t.nav.portfolio, id: "portfolio" },
                { label: t.nav.offers, id: "offers" },
                { label: t.nav.reviews, id: "reviews" },
                { label: t.nav.about, id: "about" },
                { label: t.nav.faq, id: "faq" },
                { label: t.nav.contact, id: "contact" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-left font-medium cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.servicesHeading}
            </h4>
            <ul className="space-y-2">
              {t.services.items.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo("services")}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-left truncate max-w-full block font-medium cursor-pointer"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Social Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.directHeading}
            </h4>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => openWhatsAppChat(businessConfig.contact.defaultWhatsappMessage)}
                className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-colors duration-200 text-left font-medium cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-200 shrink-0" />
                <span className="font-mono">{businessConfig.contact.whatsappNumber}</span>
              </button>

              <a
                href={`mailto:${businessConfig.contact.email}`}
                className="flex items-center gap-2 text-slate-200 hover:text-blue-400 transition-colors duration-200 truncate font-medium group"
              >
                <Mail className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-200 shrink-0" />
                <span className="truncate">{businessConfig.contact.email}</span>
              </a>

              <a
                href={businessConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-200 hover:text-pink-400 transition-colors duration-200 font-medium group"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform duration-200 shrink-0" />
                <span>{businessConfig.contact.instagramUsername}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {currentYear} {businessConfig.businessName}. {t.footer.allRightsReserved}</p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenPrivacyPolicy}
              className="hover:text-blue-400 transition-colors duration-200 underline font-medium cursor-pointer"
            >
              {t.footer.privacyLink}
            </button>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <button
              type="button"
              onClick={onOpenOwnerGuide}
              className="hover:text-blue-400 transition-colors duration-200 underline font-medium cursor-pointer"
            >
              {t.footer.guideLink}
            </button>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors duration-200 font-medium cursor-pointer group"
              aria-label="Scroll back to top"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
