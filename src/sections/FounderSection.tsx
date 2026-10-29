import React from "react";
import { motion } from "framer-motion";
import { businessConfig } from "../config/businessConfig";
import { useLanguage } from "../i18n/LanguageContext";
import { openWhatsAppChat } from "../utils/whatsapp";
import {
  containerStaggerVariants,
  fadeInUpVariant,
  defaultViewport
} from "../utils/animations";
import { MessageCircle, Mail, Instagram, UserCheck } from "lucide-react";

export const FounderSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-24 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Staggered Fade-in-up */}
        <motion.div
          variants={containerStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <motion.div variants={fadeInUpVariant} className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-50 border border-blue-200/60 px-3.5 py-1 rounded-full shadow-xs">
            <span>{t.founder.kicker}</span>
          </motion.div>
          <motion.h2 variants={fadeInUpVariant} className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
            {t.founder.heading}
          </motion.h2>
          <motion.p variants={fadeInUpVariant} className="text-slate-600 text-base leading-relaxed">
            {t.founder.subheading}
          </motion.p>
        </motion.div>

        {/* Founder Profile Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Mobile: Photo First; Desktop: Photo on Left (5 cols) */}
          <motion.div
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Photo Frame Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200/90 bg-white shadow-xl group">
                <img
                  src={businessConfig.founder.image}
                  alt={`${businessConfig.founder.name}, ${businessConfig.founder.designation}`}
                  className="w-full h-auto object-cover max-h-[520px] transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />

                {/* Subtle caption overlay at bottom of photo */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-6 text-left">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {businessConfig.founder.name}
                  </h3>
                  <p className="text-xs text-blue-300 font-medium">
                    {businessConfig.founder.designation}
                  </p>
                </div>
              </div>

              {/* Decorative Subtle Corner Accent */}
              <div
                className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-blue-500/40 rounded-tr-3xl pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Right Column: Founder Introduction & Principles (7 cols) */}
          <motion.div
            variants={containerStaggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <motion.div variants={fadeInUpVariant}>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                {t.founder.personalMessage}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] tracking-tight">
                {businessConfig.founder.name}
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-1">
                {businessConfig.founder.designation}
              </p>
            </motion.div>

            {/* Official Introduction Quote */}
            <motion.blockquote variants={fadeInUpVariant} className="bg-blue-50/60 border border-blue-200/70 rounded-2xl p-6 text-slate-800 text-sm sm:text-base leading-relaxed italic shadow-xs">
              "{t.founder.introduction}"
            </motion.blockquote>

            {/* Additional Bio Narrative */}
            <motion.div variants={fadeInUpVariant} className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>{t.founder.bioParagraph1}</p>
              <p>{t.founder.bioParagraph2}</p>
            </motion.div>

            {/* Direct Connect Options */}
            <motion.div variants={fadeInUpVariant} className="pt-4 border-t border-slate-200/80 space-y-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {t.founder.connectTitle}
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openWhatsAppChat(businessConfig.contact.contactSectionWhatsappMessage)}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.founder.chatWhatsApp}</span>
                </button>

                <a
                  href={`mailto:${businessConfig.contact.email}`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all active:scale-[0.98]"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t.founder.emailDirectly}</span>
                </a>

                <a
                  href={businessConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all active:scale-[0.98]"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-500" />
                  <span>{businessConfig.contact.instagramUsername}</span>
                </a>
              </div>
            </motion.div>

            {/* Authenticity Pledge */}
            <motion.div variants={fadeInUpVariant} className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.founder.authenticityNote}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
