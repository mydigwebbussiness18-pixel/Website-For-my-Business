import React, { useState } from "react";
import { businessConfig } from "../config/businessConfig";
import { isValidWhatsAppConfigured, openWhatsAppChat } from "../utils/whatsapp";
import { useLanguage } from "../i18n/LanguageContext";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const isConfigured = isValidWhatsAppConfigured(businessConfig.contact.whatsappNumber);

  const handleClick = () => {
    if (!isConfigured) {
      alert(
        "WhatsApp number is not yet configured in src/config/businessConfig.ts. Please update contact.whatsappNumber with your phone number."
      );
      return;
    }
    openWhatsAppChat(businessConfig.contact.defaultWhatsappMessage);
  };

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5"
    >
      {/* Tooltip on hover/focus */}
      <div
        role="tooltip"
        className={`hidden md:block transition-all duration-200 pointer-events-none ${
          showTooltip
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2"
        }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-lg border border-slate-700/80 whitespace-nowrap">
          {isConfigured ? t.nav.chatWhatsApp : "WhatsApp Setup"}
        </div>
      </div>

      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full shadow-lg transition-all duration-300 focus-visible:ring-4 focus-visible:ring-emerald-400 cursor-pointer ${
          isConfigured
            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:scale-95"
            : "bg-slate-300 text-slate-700 opacity-80 cursor-not-allowed"
        }`}
        aria-label="Chat with DigWeb Expert on WhatsApp"
        title={
          isConfigured
            ? `Message DigWeb Expert on WhatsApp: ${businessConfig.contact.whatsappNumber}`
            : "WhatsApp configuration required in businessConfig.ts"
        }
      >
        <MessageCircle className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide whitespace-nowrap">
          {isConfigured ? t.nav.chatWhatsApp : "WhatsApp Setup"}
        </span>
      </button>
    </aside>
  );
};
