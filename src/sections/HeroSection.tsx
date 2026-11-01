import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { businessConfig } from "../config/businessConfig";
import { useLanguage } from "../i18n/LanguageContext";
import heroBg from "../assets/images/hero_digital_marketing_bg_1793286584893.jpg";
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
  TrendingUp,
  Rocket
} from "lucide-react";
import { CinematicSmokeBackground } from "../components/CinematicSmokeBackground";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const badge1Ref = useRef<HTMLDivElement | null>(null);
  const badge2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    let ticking = false;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const updateTransforms = () => {
      const scrollY = window.scrollY;
      if (showcaseRef.current) {
        const transY = currentMouseY - Math.min(60, scrollY * 0.1);
        const rotX = Math.min(12, scrollY * 0.025);
        const rotY = Math.sin(scrollY * 0.008) * 6;
        showcaseRef.current.style.transform = `translate3d(${currentMouseX}px, ${transY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
      if (badge1Ref.current) {
        badge1Ref.current.style.transform = `translate3d(-15px, ${-scrollY * 0.06}px, 35px)`;
      }
      if (badge2Ref.current) {
        badge2Ref.current.style.transform = `translate3d(15px, ${scrollY * 0.05}px, 40px)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking && window.scrollY < 900) {
        ticking = true;
        requestAnimationFrame(updateTransforms);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#0B1630] transition-colors duration-300 scroll-mt-24"
    >
      {/* 16:9 Realistic Digital Marketing Workspace Background Visual */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <img
          src={heroBg}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[75%_center] lg:object-center opacity-95 transition-transform duration-700"
        />

        {/* Cinematic Animated Blue Smoke Effect behind Hero Visual */}
        <CinematicSmokeBackground preset="hero" />

        {/* Dark navy overlay: Left side is dark, clean, and visually quiet for readable typography, while right side reveals glowing monitors, charts & smoke */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1630] via-[#0B1630]/90 to-[#0B1630]/40 lg:from-[#0B1630] lg:via-[#0B1630]/75 lg:to-transparent" />
        {/* Top vignette to blend smoothly into the dark navy header */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0B132B]/95 to-transparent" />
        {/* Bottom smooth blend into adjacent section divider */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-b from-transparent via-[#0B1630]/50 to-[#FAFAFC]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs with Staggered Entrance */}
          <motion.div
            variants={containerStaggerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Clean, unboxed kicker metadata */}
            <motion.div
              variants={fadeInUpVariant}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-semibold tracking-wider uppercase text-blue-300 shadow-sm backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-200">{t.hero.kicker}</span>
              <span aria-hidden="true" className="text-blue-400/60">·</span>
              <span className="text-blue-400">{t.hero.kickerSub}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUpVariant}
              className="text-3.5xl sm:text-4.5xl md:text-5xl lg:text-5.5xl font-extrabold text-white tracking-tight leading-[1.18] text-balance drop-shadow-sm"
            >
              {t.hero.headline}
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              variants={fadeInUpVariant}
              className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
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
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-[#C9A227] hover:to-[#D97706] text-white hover:text-[#0B132B] font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-1 active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-emerald-400/40 hover:border-emerald-300 shadow-lg shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-500/50 hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white transition-transform duration-300 group-hover:scale-110" />
                <span>{t.hero.contactBtn}</span>
              </button>
            </motion.div>

            {/* Honest Service Highlights Strip */}
            <motion.div
              variants={fadeInUpVariant}
              className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{t.hero.highlight1Title}</span>
                </div>
                <p className="text-[12px] text-slate-300">{t.hero.highlight1Sub}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{t.hero.highlight2Title}</span>
                </div>
                <p className="text-[12px] text-slate-300">{t.hero.highlight2Sub}</p>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Shield className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{t.hero.highlight3Title}</span>
                </div>
                <p className="text-[12px] text-slate-300">{t.hero.highlight3Sub}</p>
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
              ref={showcaseRef}
              style={{
                perspective: 1200,
                transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              className="relative w-full max-w-md perspective-1200"
            >
              {/* 3D Floating Marketing Badge 1: High ROI Meta Ads */}
              <div
                ref={badge1Ref}
                style={{
                  transform: "translate3d(-15px, 0px, 35px)",
                  transition: "transform 0.2s ease-out"
                }}
                className="absolute -top-5 -left-4 sm:-left-8 z-30 bg-[#0B1630]/95 backdrop-blur-md border border-[#38BDF8]/60 px-3.5 py-2 rounded-2xl shadow-[0_10px_25px_rgba(56,189,248,0.3)] flex items-center gap-2 text-xs font-bold text-white hover:scale-105 transition-transform duration-200"
              >
                <div className="w-7 h-7 rounded-xl bg-blue-600/30 border border-blue-400 flex items-center justify-center text-[#38BDF8] shadow-sm">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-300 font-normal">Active Campaigns</div>
                  <div className="text-[#38BDF8] font-bold text-[11px] leading-tight">Meta Ads Growth</div>
                </div>
              </div>

              {/* 3D Floating Marketing Badge 2: Organic Reach */}
              <div
                ref={badge2Ref}
                style={{
                  transform: "translate3d(15px, 0px, 40px)",
                  transition: "transform 0.2s ease-out"
                }}
                className="absolute -bottom-5 -right-4 sm:-right-8 z-30 bg-[#0B1630]/95 backdrop-blur-md border border-[#D4AF37]/60 px-3.5 py-2 rounded-2xl shadow-[0_10px_25px_rgba(212,175,55,0.25)] flex items-center gap-2 text-xs font-bold text-white hover:scale-105 transition-transform duration-200"
              >
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-[#D4AF37] shadow-sm">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-300 font-normal">Business Reach</div>
                  <div className="text-[#D4AF37] font-bold text-[11px] leading-tight">+180% Engagement</div>
                </div>
              </div>

              {/* Premium Right-side Hero Card with #0B1630 -> #102A56 gradient, #1D4ED8 highlights, electric-blue border, and cyan glow */}
              <div
                style={{ transformStyle: "preserve-3d" }}
                className="relative rounded-[24px] p-6 sm:p-8 bg-gradient-to-br from-[#102A56]/95 via-[#0B1630]/95 to-[#102A56]/90 backdrop-blur-xl border border-[#3B82F6]/60 hover:border-[#38BDF8]/80 shadow-[0_16px_40px_rgba(3,7,18,0.5),0_0_24px_rgba(56,189,248,0.18)] hover:shadow-[0_20px_50px_rgba(3,7,18,0.6),0_0_32px_rgba(56,189,248,0.28)] transition-all duration-300 space-y-6 overflow-hidden"
              >
                {/* Subtle gradient highlights (#1D4ED8) */}
                <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#1D4ED8]/25 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#1D4ED8]/15 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

                {/* Floating Growth Indicator Tag */}
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#3B82F6]/25">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FFFFFF]">
                    <TrendingUp className="w-4 h-4 text-[#38BDF8]" />
                    <span>Digital Elevation</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full font-medium border border-emerald-500/40">
                    Active & Ready
                  </span>
                </div>

                {/* Existing Logo Container with #0B1630 background, subtle #3B82F6 border, and restrained #38BDF8 cyan glow */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-4 pt-1">
                  <div className="relative group">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-[#1D4ED8] via-[#38BDF8] to-[#3B82F6] rounded-[22px] blur-md opacity-35 group-hover:opacity-50 transition-opacity duration-300" />
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-[20px] overflow-hidden border border-[#3B82F6]/50 p-2 bg-[#0B1630] shadow-[0_0_20px_rgba(56,189,248,0.22)]">
                      <img
                        src={businessConfig.logo}
                        alt={`${businessConfig.businessName} Official Brand Logo`}
                        className="w-full h-full object-contain rounded-[14px] transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-extrabold text-[#FFFFFF] tracking-tight">
                      DigWeb <span className="text-[#38BDF8]">Expert</span>
                    </h2>
                    <p className="text-xs text-[#CBD5E1] mt-1 max-w-xs mx-auto leading-relaxed">
                      {t.hero.cardTag}
                    </p>
                  </div>
                </div>

                {/* Service Items: Elegant Dark-Blue Mini-Cards (#102A56) */}
                <div className="relative z-10 grid grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="bg-[#102A56] hover:bg-[#102A56]/90 border border-[#3B82F6]/30 hover:border-[#38BDF8]/70 p-2.5 rounded-xl flex items-center gap-2 text-[#CBD5E1] hover:text-[#FFFFFF] transition-all duration-300 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#38BDF8] shrink-0" />
                    <span className="truncate font-medium">{t.services.items[0]?.title || "Website Development"}</span>
                  </div>
                  <div className="bg-[#102A56] hover:bg-[#102A56]/90 border border-[#3B82F6]/30 hover:border-[#38BDF8]/70 p-2.5 rounded-xl flex items-center gap-2 text-[#CBD5E1] hover:text-[#FFFFFF] transition-all duration-300 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#38BDF8] shrink-0" />
                    <span className="truncate font-medium">{t.services.items[1]?.title || "Meta Ads"}</span>
                  </div>
                  <div className="bg-[#102A56] hover:bg-[#102A56]/90 border border-[#3B82F6]/30 hover:border-[#38BDF8]/70 p-2.5 rounded-xl flex items-center gap-2 text-[#CBD5E1] hover:text-[#FFFFFF] transition-all duration-300 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#38BDF8] shrink-0" />
                    <span className="truncate font-medium">{t.services.items[2]?.title || "Graphic Design"}</span>
                  </div>
                  <div className="bg-[#102A56] hover:bg-[#102A56]/90 border border-[#3B82F6]/30 hover:border-[#38BDF8]/70 p-2.5 rounded-xl flex items-center gap-2 text-[#CBD5E1] hover:text-[#FFFFFF] transition-all duration-300 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#38BDF8] shrink-0" />
                    <span className="truncate font-medium">{t.services.items[3]?.title || "Google Business"}</span>
                  </div>
                </div>

                {/* Founder attribution indicator */}
                <div className="relative z-10 pt-3 border-t border-[#3B82F6]/25 flex items-center justify-between text-xs text-[#CBD5E1]">
                  <span>{t.hero.founderLabel}</span>
                  <span className="text-[#FFFFFF] font-semibold">{businessConfig.founder.name}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

