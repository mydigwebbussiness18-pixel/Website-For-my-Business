import React from "react";
import { motion } from "framer-motion";
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
  ArrowRight,
  TrendingUp,
  Zap,
  Target,
  ShieldCheck,
  Info,
  Sparkles
} from "lucide-react";
import { ThreeDCard } from "../components/ThreeDCard";
import { CinematicSmokeBackground } from "../components/CinematicSmokeBackground";

import diwaliStarterImg from "../assets/images/diwali_starter_mockup_1793541756781.jpg";
import diwaliGrowthImg from "../assets/images/diwali_growth_mockup_1793541769265.jpg";

interface DiwaliPackage {
  id: string;
  packageName: string;
  badge: string;
  price: string;
  regularPrice: string;
  saveAmount: string;
  image: string;
  fallbackImage: string;
  imageAlt: string;
  features: string[];
  terms: string;
  whatsappMessage: string;
}

export const OffersSection: React.FC = () => {
  const { t } = useLanguage();

  const diwaliOffers: DiwaliPackage[] = [
    {
      id: "diwali-business-starter",
      packageName: "1. Diwali Business Starter",
      badge: "Budget Friendly",
      price: "₹6,999",
      regularPrice: "₹9,999",
      saveAmount: "Save ₹3,000",
      image: diwaliStarterImg,
      fallbackImage: "/images/offers/diwali-starter.jpg",
      imageAlt: "Professional Jewellery & Retail E-commerce Website Mockup (Desktop and Mobile Previews)",
      features: [
        "5-Page Professional Website",
        "Mobile-Friendly Design",
        "WhatsApp Chat Button",
        "Contact Form",
        "5 Free Custom Instagram Post Designs",
        "Fast Delivery"
      ],
      terms:
        "Hosting is extra. Free 1-year domain is available only when the client purchases 1-year hosting through DigWeb Expert.",
      whatsappMessage:
        'Hello DigWeb Expert, I am interested in the "1. Diwali Business Starter" package for ₹6,999. Please share more details and how we can get started.'
    },
    {
      id: "diwali-business-growth",
      packageName: "2. Diwali Business Growth",
      badge: "Value Offer",
      price: "₹13,999",
      regularPrice: "₹15,999",
      saveAmount: "Save ₹2,000",
      image: diwaliGrowthImg,
      fallbackImage: "/images/offers/diwali-growth.jpg",
      imageAlt: "Corporate Enterprise Business Website Mockup (Desktop and Mobile Previews)",
      features: [
        "Professional Business Website",
        "1-Year Domain + Hosting FREE",
        "WhatsApp Chat Button",
        "Contact Form",
        "Instagram Profile Integration",
        "Mobile-Friendly Design",
        "5 Free Custom Instagram Post Designs",
        "Google Business Profile Setup",
        "Fast Delivery"
      ],
      terms:
        "Domain and hosting renewal charges apply from the second year. Confirm hosting specifications and eligibility before promising the free package.",
      whatsappMessage:
        'Hello DigWeb Expert, I am interested in the "2. Diwali Business Growth" package for ₹13,999. Please share more details and how we can get started.'
    }
  ];

  const handleSelectPackage = (offer: DiwaliPackage) => {
    openWhatsAppChat(offer.whatsappMessage);
  };

  const scrollToContactWithPackage = (packageName: string) => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Update form message field if available
      setTimeout(() => {
        const messageTextarea = document.getElementById("contact-message") as HTMLTextAreaElement | null;
        if (messageTextarea) {
          messageTextarea.value = `Hello DigWeb Expert, I would like to book the "${packageName}". Please contact me with quotation and delivery roadmap.`;
          messageTextarea.focus();
        }
      }, 600);
    }
  };

  const marketingPillars = [
    {
      icon: <Target className="w-5 h-5 text-[#38BDF8]" />,
      title: "Precision Targeting",
      desc: "Audience segmentation across Meta Ads for qualified customer reach.",
      stat: "High CTR"
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: "Fast Architecture",
      desc: "Sub-second responsive mobile loading with modern clean code.",
      stat: "99.8% Speed"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      title: "Measurable Growth",
      desc: "Real conversion tracking without inflated vanity metrics.",
      stat: "+180% Lift"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      title: "Direct Commitment",
      desc: "Founder-led communication and transparent delivery milestones.",
      stat: "100% Honest"
    }
  ];

  return (
    <section
      id="offers"
      className="py-24 bg-[#070D1E] text-white relative overflow-hidden transition-colors"
    >
      {/* Cinematic Smoke Background Atmosphere */}
      <CinematicSmokeBackground preset="offers" />

      {/* Subtle ambient lighting gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading with Staggered Fade-in-up */}
        <motion.div
          variants={containerStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <motion.div
            variants={fadeInUpVariant}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-4 py-1.5 rounded-full shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.offers.kicker}</span>
          </motion.div>

          <motion.h2
            variants={fadeInUpVariant}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            {t.offers.heading}
          </motion.h2>

          <motion.p
            variants={fadeInUpVariant}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {t.offers.subheading}
          </motion.p>
        </motion.div>

        {/* 2 Premium Diwali Offer Cards Side-by-Side (Desktop) / Stacked (Mobile) */}
        <motion.div
          variants={gridStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-20 items-stretch"
        >
          {diwaliOffers.map((offer) => (
            <motion.div
              key={offer.id}
              variants={cardFadeInUpVariant}
              className="flex"
            >
              <ThreeDCard
                maxTilt={6}
                scrollTiltStrength={4}
                className="w-full h-full"
              >
                <div className="w-full h-full bg-[#0B1528]/95 backdrop-blur-md border border-slate-700/70 hover:border-emerald-500/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-black/60 hover:shadow-emerald-950/30 transition-all duration-300 relative group preserve-3d">
                  {/* Top glowing ambient highlight */}
                  <div
                    className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500"
                    aria-hidden="true"
                  />

                  {/* Card Content Area */}
                  <div className="space-y-6">
                    {/* Header: Package Name & Small Green Value Badge */}
                    <div
                      style={{ transform: "translateZ(18px)" }}
                      className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800/80"
                    >
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors duration-200">
                        {offer.packageName}
                      </h3>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {offer.badge}
                      </span>
                    </div>

                    {/* Large Website Preview Mockup (Desktop + Mobile Previews) */}
                    <div
                      style={{ transform: "translateZ(22px)" }}
                      className="relative rounded-2xl overflow-hidden border border-slate-700/60 bg-[#060B18] shadow-lg group-hover:border-slate-600 transition-all duration-300 aspect-[16/9]"
                    >
                      <img
                        src={offer.image}
                        alt={offer.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="450"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== offer.fallbackImage) {
                            target.src = offer.fallbackImage;
                          }
                        }}
                      />
                      {/* Subtle gradient vignette to blend into dark card */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-transparent opacity-40 pointer-events-none" />
                      <div className="absolute bottom-2.5 left-3 text-[10px] text-slate-300/80 font-mono bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10 pointer-events-none">
                        Desktop & Mobile Previews Included
                      </div>
                    </div>

                    {/* Pricing Block: Bright Green (#16A34A) Pricing & Strikethrough Regular Price */}
                    <div
                      style={{ transform: "translateZ(16px)" }}
                      className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-baseline justify-between gap-3"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#16A34A] dark:text-[#22c55e] tracking-tight font-mono">
                          {offer.price}
                        </span>
                        <span className="text-base sm:text-lg text-slate-400 line-through font-medium">
                          {offer.regularPrice}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-lg">
                        {offer.saveAmount}
                      </span>
                    </div>

                    {/* Large, Readable White Feature List */}
                    <div style={{ transform: "translateZ(14px)" }} className="space-y-3 pt-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Package Inclusions:
                      </div>
                      <ul className="space-y-3">
                        {offer.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-white text-sm sm:text-base font-medium leading-snug"
                          >
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Terms & Conditions Notice */}
                    <div
                      style={{ transform: "translateZ(10px)" }}
                      className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-3.5 text-xs text-slate-300/80 leading-relaxed flex items-start gap-2.5"
                    >
                      <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <p>{offer.terms}</p>
                    </div>
                  </div>

                  {/* CTA Actions */}
                  <div
                    style={{ transform: "translateZ(20px)" }}
                    className="pt-6 border-t border-slate-800/80 mt-6 space-y-2.5"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectPackage(offer)}
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-sm sm:text-base font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/60 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                      <span>{t.offers.claimBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToContactWithPackage(offer.packageName)}
                      className="w-full text-center text-xs text-slate-400 hover:text-white transition-colors py-1 cursor-pointer"
                    >
                      Need custom requirements? Book via Website Form →
                    </button>
                  </div>
                </div>
              </ThreeDCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us: 3D Marketing Growth & Achievement Pillars */}
        <motion.div
          variants={gridStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-800/80"
        >
          {marketingPillars.map((pillar, pIdx) => (
            <motion.div key={pIdx} variants={cardFadeInUpVariant}>
              <ThreeDCard maxTilt={10} scrollTiltStrength={5} className="h-full">
                <div className="h-full bg-gradient-to-br from-[#102A56] via-[#0B1630] to-[#102A56] border border-[#3B82F6]/30 hover:border-[#38BDF8]/70 rounded-2xl p-5 flex flex-col justify-between shadow-md hover:shadow-xl hover:shadow-[#1D4ED8]/25 transition-all duration-300 preserve-3d group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        style={{ transform: "translateZ(20px)" }}
                        className="w-10 h-10 rounded-xl bg-[#0B1630] border border-[#3B82F6]/40 flex items-center justify-center group-hover:scale-110 group-hover:border-[#38BDF8] transition-all duration-300 shadow-sm"
                      >
                        {pillar.icon}
                      </div>
                      <span
                        style={{ transform: "translateZ(14px)" }}
                        className="text-[10px] font-mono font-bold text-[#38BDF8] bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-500/30"
                      >
                        {pillar.stat}
                      </span>
                    </div>

                    <h4
                      style={{ transform: "translateZ(16px)" }}
                      className="text-sm font-bold text-white mb-1.5 group-hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </ThreeDCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
