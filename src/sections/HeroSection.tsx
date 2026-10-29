import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { businessConfig } from "../config/businessConfig";
import { useLanguage } from "../i18n/LanguageContext";
import {
  containerStaggerVariants,
  fadeInUpVariant,
  defaultViewport
} from "../utils/animations";
import {
  ArrowRight,
  MessageSquare,
  CheckCircle,
  Globe,
  Shield,
  Sparkles,
  TrendingUp
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  // Subtle interactive parallax offset for desktop users
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setReduceMotion(isReduced);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#FAFAFC] bg-tech-dots transition-colors duration-300 scroll-mt-24"
    >
      {/* Subtle Electric Blue Ambient Light - 85% clean white experience */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-gradient-to-tr from-blue-400/10 via-indigo-300/10 to-sky-200/15 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs with Staggered Entrance */}
          <motion.div
            variants={containerStaggerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Clean, unboxed kicker metadata */}
            <motion.div variants={fadeInUpVariant} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/70 text-xs font-semibold tracking-wider uppercase text-blue-700 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.hero.kicker}</span>
              <span aria-hidden="true" className="text-blue-300">·</span>
              <span className="text-blue-600">{t.hero.kickerSub}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUpVariant}
              className="text-3.5xl sm:text-4.5xl md:text-5xl lg:text-5.5xl font-extrabold text-[#0B132B] tracking-tight leading-[1.18] text-balance"
            >
              {t.hero.headline}
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              variants={fadeInUpVariant}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              {t.hero.description}
            </motion.p>

            {/* Action Buttons with futuristic micro-interactions */}
            <motion.div
              variants={fadeInUpVariant}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2"
            >
              <button
                type="button"
                onClick={() => scrollTo("services")}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all duration-200 active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>{t.hero.contactBtn}</span>
              </button>
            </motion.div>

            {/* Honest Service Highlights Strip */}
            <motion.div
              variants={fadeInUpVariant}
              className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{t.hero.highlight1Title}</span>
                </div>
                <p className="text-[12px] text-slate-500">{t.hero.highlight1Sub}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{t.hero.highlight2Title}</span>
                </div>
                <p className="text-[12px] text-slate-500">{t.hero.highlight2Sub}</p>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{t.hero.highlight3Title}</span>
                </div>
                <p className="text-[12px] text-slate-500">{t.hero.highlight3Sub}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Futuristic Tech Showcase with subtle parallax */}
          <motion.div
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div
              style={
                !reduceMotion
                  ? {
                      transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                      transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                    }
                  : undefined
              }
              className="relative w-full max-w-md"
            >
              {/* Outer Card with layered white backdrop & subtle border glow */}
              <div className="relative rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-300 space-y-6">
                
                {/* Floating Growth Indicator Tag */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span>Digital Elevation</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200/60">
                    Active & Ready
                  </span>
                </div>

                {/* Official Logo Display with concentric glowing aura */}
                <div className="flex flex-col items-center text-center space-y-4 pt-1">
                  <div className="relative group">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-slate-100 p-1 bg-white shadow-md">
                      <img
                        src={businessConfig.logo}
                        alt={`${businessConfig.businessName} Official Brand Logo`}
                        className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      DigWeb <span className="text-blue-600">Expert</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                      {t.hero.cardTag}
                    </p>
                  </div>
                </div>

                {/* Service Badges Container */}
                <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="bg-slate-50/80 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-300 p-2.5 rounded-xl flex items-center gap-2 text-slate-700 hover:text-blue-700 transition-all duration-200 shadow-2xs">
                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <span className="truncate font-medium">{t.services.items[0]?.title || "Web Development"}</span>
                  </div>
                  <div className="bg-slate-50/80 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-300 p-2.5 rounded-xl flex items-center gap-2 text-slate-700 hover:text-blue-700 transition-all duration-200 shadow-2xs">
                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <span className="truncate font-medium">{t.services.items[1]?.title || "Meta Ads"}</span>
                  </div>
                  <div className="bg-slate-50/80 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-300 p-2.5 rounded-xl flex items-center gap-2 text-slate-700 hover:text-blue-700 transition-all duration-200 shadow-2xs">
                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <span className="truncate font-medium">{t.services.items[2]?.title || "Graphic Design"}</span>
                  </div>
                  <div className="bg-slate-50/80 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-300 p-2.5 rounded-xl flex items-center gap-2 text-slate-700 hover:text-blue-700 transition-all duration-200 shadow-2xs">
                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <span className="truncate font-medium">{t.services.items[3]?.title || "Google Business"}</span>
                  </div>
                </div>

                {/* Founder attribution indicator */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{t.hero.founderLabel}</span>
                  <span className="text-slate-800 font-semibold">{businessConfig.founder.name}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
