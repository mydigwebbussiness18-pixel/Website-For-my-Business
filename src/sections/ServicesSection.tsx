import React from "react";
import { motion } from "framer-motion";
import { ServiceItem } from "../types";
import { useLanguage } from "../i18n/LanguageContext";
import { openWhatsAppChat } from "../utils/whatsapp";
import {
  containerStaggerVariants,
  gridStaggerVariants,
  fadeInUpVariant,
  cardFadeInUpVariant,
  defaultViewport
} from "../utils/animations";
import {
  CheckCircle2,
  MessageCircle,
  Info,
  Code,
  Target,
  Palette,
  MapPin,
  Sparkles
} from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { t } = useLanguage();

  const getServiceIcon = (id: string) => {
    switch (id) {
      case "website-development":
        return <Code className="w-6 h-6 text-blue-600 transition-colors duration-300" />;
      case "meta-ads":
        return <Target className="w-6 h-6 text-blue-600 transition-colors duration-300" />;
      case "graphic-design":
        return <Palette className="w-6 h-6 text-blue-600 transition-colors duration-300" />;
      case "google-business-profile":
        return <MapPin className="w-6 h-6 text-blue-600 transition-colors duration-300" />;
      default:
        return <Code className="w-6 h-6 text-blue-600 transition-colors duration-300" />;
    }
  };

  return (
    <section
      id="services"
      className="py-24 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Fade-in-up */}
        <motion.div
          variants={containerStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <motion.div variants={fadeInUpVariant} className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-50 border border-blue-200/60 px-3.5 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.services.kicker}</span>
          </motion.div>
          <motion.h2 variants={fadeInUpVariant} className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
            {t.services.heading}
          </motion.h2>
          <motion.p variants={fadeInUpVariant} className="text-slate-600 text-base leading-relaxed">
            {t.services.subheading}
          </motion.p>
        </motion.div>

        {/* 4 Professional Service Cards Grid with Balanced ~50% Electric Blue & Light Blue Gradient */}
        <motion.div
          variants={gridStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {t.services.items.map((service, idx) => (
            <motion.div
              key={service.id}
              variants={cardFadeInUpVariant}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#0284C7] hover:from-[#1E3A8A] hover:via-[#1D4ED8] hover:to-[#0369A1] border border-blue-300/40 hover:border-amber-300/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-blue-900/15 hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Golden-Amber Accent Top Trim Line */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Decorative Subtle Ambient Light Blue Glow */}
              <div
                className="absolute -top-12 -right-12 w-44 h-44 bg-sky-300/20 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-200/30 transition-all duration-500"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-10 -left-10 w-36 h-36 bg-blue-900/30 rounded-full blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Header Lockup */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3.5 bg-white border border-white/60 rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-md shadow-blue-900/20">
                    {getServiceIcon(service.id)}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-blue-200 font-bold">0{idx + 1}</span>
                    <span aria-hidden="true" className="text-amber-300 font-bold">·</span>
                    <span className="text-white bg-white/20 border border-white/30 backdrop-blur-xs font-semibold px-2.5 py-0.5 rounded-lg text-[11px] shadow-xs">
                      {service.badge || "Service"}
                    </span>
                  </div>
                </div>

                {/* Title & Description with High-Contrast Typography */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2.5 group-hover:text-amber-200 transition-colors duration-300 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-blue-50 text-sm leading-relaxed mb-6 font-normal">
                  {service.shortDescription}
                </p>

                {/* Key Service Features Box - Clean High-Contrast White Panel for Crisp Legibility */}
                <div className="space-y-2.5 mb-8 bg-white/95 p-4.5 rounded-2xl border border-white/40 shadow-md shadow-blue-950/10 backdrop-blur-xs">
                  <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block mb-2">
                    {t.services.includedFeatures}
                  </span>
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Action Buttons with High Contrast & Smooth Hover */}
              <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center gap-3 relative z-10">
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#0B132B] hover:text-blue-900 text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 border border-white/80 shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-blue-700" />
                  <span>{t.services.knowMore}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openWhatsAppChat(service.whatsappMessage)}
                  className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0B132B] text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/40 active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#0B132B]" />
                  <span>{t.services.getService}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
