import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { businessConfig } from "../config/businessConfig";
import { openWhatsAppChat } from "../utils/whatsapp";
import {
  containerStaggerVariants,
  gridStaggerVariants,
  fadeInUpVariant,
  cardFadeInUpVariant,
  defaultViewport
} from "../utils/animations";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Sparkles
} from "lucide-react";

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Default first question open for immediate engagement
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "web-time": true
  });

  const filterTabs = [
    { key: "all", label: t.faq.filterAll },
    { key: "web", label: t.faq.filterWeb },
    { key: "marketing", label: t.faq.filterMarketing },
    { key: "general", label: t.faq.filterGeneral }
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredItems = t.faq.items.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <section
      id="faq"
      className="py-24 bg-[#FAFAFC] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Fade-in-up */}
        <motion.div
          variants={containerStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <motion.div variants={fadeInUpVariant} className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-50 border border-blue-200/60 px-3.5 py-1 rounded-full shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faq.kicker}</span>
          </motion.div>
          <motion.h2 variants={fadeInUpVariant} className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
            {t.faq.heading}
          </motion.h2>
          <motion.p variants={fadeInUpVariant} className="text-slate-600 text-base leading-relaxed">
            {t.faq.subheading}
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex items-center justify-center mb-12"
        >
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 border border-slate-200/80 rounded-2xl overflow-x-auto max-w-full shadow-xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.key
                    ? "bg-white text-blue-600 shadow-xs border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Accordion List with Staggered Fade-in-up */}
        <motion.div
          variants={gridStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-3.5"
        >
          {filteredItems.map((item) => {
            const isOpen = !!openItems[item.id];
            return (
              <motion.div
                key={item.id}
                variants={cardFadeInUpVariant}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-blue-300 shadow-md shadow-blue-500/5 ring-1 ring-blue-500/10"
                    : "bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl cursor-pointer"
                >
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B132B] leading-snug">
                      {item.question}
                    </h3>
                  </div>
                  <div
                    className={`p-1.5 rounded-xl border shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen
                        ? "bg-blue-50 text-blue-600 border-blue-200 rotate-180"
                        : "bg-slate-50 text-slate-400 border-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-0">
                        <div className="pt-3 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Still Have Questions CTA Banner */}
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-14 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-blue-50 border border-blue-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs"
        >
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Consultation</span>
            </div>
            <h4 className="text-lg font-bold text-[#0B132B]">
              {t.faq.stillHaveQuestions}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              {t.faq.stillHaveQuestionsSub}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              openWhatsAppChat(businessConfig.contact.contactSectionWhatsappMessage)
            }
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.faq.chatWhatsAppBtn}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
