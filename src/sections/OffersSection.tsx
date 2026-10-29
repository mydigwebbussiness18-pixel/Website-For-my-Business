import React from "react";
import { motion } from "framer-motion";
import { businessConfig } from "../config/businessConfig";
import { useLanguage } from "../i18n/LanguageContext";
import { openWhatsAppChat } from "../utils/whatsapp";
import {
  containerStaggerVariants,
  gridStaggerVariants,
  fadeInUpVariant,
  cardFadeInUpVariant,
  defaultViewport
} from "../utils/animations";
import { Sparkles, Calendar, MessageCircle, ArrowRight } from "lucide-react";

export const OffersSection: React.FC = () => {
  const { t } = useLanguage();
  const currentDate = new Date().toISOString().split("T")[0];

  const activeOffers = businessConfig.offers.filter((offer) => {
    if (!offer.isActive) return false;
    if (offer.expiryDate && offer.expiryDate < currentDate) {
      return false;
    }
    return true;
  });

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="offers"
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
            <span>{t.offers.kicker}</span>
          </motion.div>
          <motion.h2 variants={fadeInUpVariant} className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
            {t.offers.heading}
          </motion.h2>
          <motion.p variants={fadeInUpVariant} className="text-slate-600 text-base leading-relaxed">
            {t.offers.subheading}
          </motion.p>
        </motion.div>

        {/* Dynamic Display: Genuine Active Offers vs. Required Neutral Notice */}
        {activeOffers.length === 0 ? (
          <motion.div
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="max-w-2xl mx-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-8 sm:p-12 text-center space-y-5 shadow-xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 text-blue-600 mx-auto flex items-center justify-center shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#0B132B]">
                {t.offers.neutralTitle}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                {t.offers.neutralText}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 shadow-sm shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
              >
                <span>{t.offers.neutralBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={gridStaggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid md:grid-cols-2 gap-8"
          >
            {activeOffers.map((offer) => (
              <motion.div
                key={offer.id}
                variants={cardFadeInUpVariant}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-blue-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-blue-500/8 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-blue-600 font-semibold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                      {offer.category}
                    </span>
                    {offer.expiryDate && (
                      <span className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.offers.validUntil} {offer.expiryDate}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#0B132B]">{offer.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{offer.description}</p>

                  {(offer.price || offer.discount) && (
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-3">
                      {offer.price && (
                        <div className="text-sm font-bold text-[#0B132B]">Price: {offer.price}</div>
                      )}
                      {offer.discount && (
                        <div className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                          Discount: {offer.discount}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-200/80 mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => openWhatsAppChat(offer.whatsappMessage)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 shadow-sm shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.offers.claimBtn}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
