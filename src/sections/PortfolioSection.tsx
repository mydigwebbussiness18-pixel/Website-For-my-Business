import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioProject } from "../types";
import { useLanguage } from "../i18n/LanguageContext";
import {
  portfolioProjectsConfig,
  normalizeLiveDemoUrl
} from "../config/portfolioProjects";
import { resolvePortfolioPreviewImage } from "../config/portfolioPreviewImages";
import {
  containerStaggerVariants,
  fadeInUpVariant,
  cardScrollRevealVariant,
  defaultViewport,
  cardViewport
} from "../utils/animations";
import { PortfolioProjectCard } from "../components/PortfolioProjectCard";
import { CinematicSmokeBackground } from "../components/CinematicSmokeBackground";

interface PortfolioSectionProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Merge centralized project configuration with localized translations.
  // Any newly added project in `src/config/portfolioProjects.ts` automatically
  // renders with the exact same universal preview-image card layout.
  const mergedProjects: PortfolioProject[] = useMemo(() => {
    const localizedById = new Map(t.portfolio.items.map((item) => [item.id, item]));

    return portfolioProjectsConfig.map((config) => {
      const localized = localizedById.get(config.id);
      const resolvedPreview = resolvePortfolioPreviewImage(config.id, config.previewImage);
      const category = localized?.category || config.category || "Website Development";
      const title = config.projectName?.trim() || localized?.title || config.id;
      const description =
        localized?.description ||
        config.description ||
        "A modern, responsive demonstration website crafted to showcase services and convert customer enquiries.";
      const longDescription =
        localized?.longDescription ||
        config.longDescription ||
        description;
      const features =
        localized?.features?.length
          ? localized.features
          : config.features?.length
            ? config.features
            : [
                "Responsive desktop, tablet & mobile design",
                "Clean service & visual showcase layout",
                "Fast loading performance & modern UI",
                "Direct enquiry & WhatsApp integration"
              ];
      const tags =
        localized?.tags?.length
          ? localized.tags
          : config.tags?.length
            ? config.tags
            : [category, "Responsive Design"];
      const status = (localized?.status || config.status || "Demo Project") as PortfolioProject["status"];

      return {
        id: config.id,
        title,
        category: category as PortfolioProject["category"],
        description,
        longDescription,
        features,
        image: resolvedPreview || `/images/portfolio/${config.id}.jpg`,
        previewImage: resolvedPreview,
        projectUrl: normalizeLiveDemoUrl(config.liveDemoUrl),
        status,
        tags
      };
    });
  }, [t.portfolio.items]);

  // Preserve core category filter tabs and automatically include any new categories from future projects
  const filterTabs = useMemo(() => {
    const baseTabs = [
      { key: "All", label: t.portfolio.filterAll },
      { key: "Website Development", label: t.portfolio.filterWeb },
      { key: "Healthcare Website", label: t.portfolio.filterHealthcare },
      { key: "Graphic Design", label: t.portfolio.filterDesign }
    ];
    const knownKeys = new Set(baseTabs.map((tab) => tab.key));
    const extraTabs: { key: string; label: string }[] = [];

    for (const proj of mergedProjects) {
      if (proj.category && !knownKeys.has(proj.category)) {
        knownKeys.add(proj.category);
        extraTabs.push({ key: proj.category, label: proj.category });
      }
    }

    return [...baseTabs, ...extraTabs];
  }, [mergedProjects, t.portfolio]);

  const filteredProjects = mergedProjects.filter((proj) => {
    if (activeFilter === "All") return true;
    return proj.category === activeFilter;
  });

  return (
    <section
      id="portfolio"
      className="py-24 bg-[#FAFAFC] relative overflow-hidden"
    >
      {/* Deep Atmospheric Smoke with Glowing Smoke Trails */}
      <CinematicSmokeBackground preset="portfolio" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border">
        {/* Header with Staggered Fade-in-up */}
        <motion.div
          variants={containerStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <motion.div variants={fadeInUpVariant} className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-50 border border-blue-200/60 px-3.5 py-1 rounded-full shadow-xs">
            <span>{t.portfolio.kicker}</span>
          </motion.div>
          <motion.h2 variants={fadeInUpVariant} className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
            {t.portfolio.heading}
          </motion.h2>
          <motion.p variants={fadeInUpVariant} className="text-slate-600 text-base leading-relaxed">
            {t.portfolio.subheading}
          </motion.p>
        </motion.div>

        {/* Category Filter Controls */}
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex items-center justify-center mb-10 sm:mb-12 w-full min-w-0"
        >
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 p-1 bg-slate-100/90 border border-slate-200/80 rounded-2xl max-w-full shadow-xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.key
                    ? "bg-white text-blue-600 shadow-xs border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid with Universal Preview Cards & Scroll-Triggered Fade-in */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full min-w-0"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                custom={idx}
                variants={cardScrollRevealVariant}
                initial="hidden"
                whileInView="visible"
                viewport={cardViewport}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="h-full w-full min-w-0 max-w-full"
              >
                <PortfolioProjectCard
                  project={project}
                  viewDetailsLabel={t.portfolio.viewDetails}
                  onSelectProject={onSelectProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Section Transparency Note */}
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-12 text-center"
        >
          <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
            {t.portfolio.transparencyNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
