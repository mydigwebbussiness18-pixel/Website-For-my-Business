import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioProject } from "../types";
import { useLanguage } from "../i18n/LanguageContext";
import {
  containerStaggerVariants,
  gridStaggerVariants,
  fadeInUpVariant,
  cardFadeInUpVariant,
  defaultViewport
} from "../utils/animations";
import { Eye, Layers } from "lucide-react";

interface PortfolioSectionProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterTabs = [
    { key: "All", label: t.portfolio.filterAll },
    { key: "Website Development", label: t.portfolio.filterWeb },
    { key: "Graphic Design", label: t.portfolio.filterDesign }
  ];

  const filteredProjects = t.portfolio.items.filter((proj) => {
    if (activeFilter === "All") return true;
    return proj.category === activeFilter;
  });

  return (
    <section
      id="portfolio"
      className="py-24 bg-[#FAFAFC] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="flex items-center justify-center mb-12"
        >
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 border border-slate-200/80 rounded-2xl overflow-x-auto max-w-full shadow-xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
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

        {/* Portfolio Grid with Staggered Fade-in-up */}
        <motion.div
          variants={gridStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardFadeInUpVariant}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.28 }}
                className="relative bg-gradient-to-br from-[#102A56] via-[#0B1630] to-[#102A56] border border-[#3B82F6]/25 hover:border-[#3B82F6]/70 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg shadow-black/25 hover:shadow-2xl hover:shadow-[#1D4ED8]/20 transition-all duration-300 group"
              >
                {/* Subtle gradient accent highlight (#1D4ED8) */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#1D4ED8]/15 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

                <div className="relative z-10">
                  {/* Visual Preview Canvas */}
                  <div className="relative aspect-[16/10] bg-[#0B1630]/70 border-b border-[#3B82F6]/20 overflow-hidden flex flex-col justify-between p-4 group-hover:bg-[#0B1630]/90 transition-colors">
                    {/* Subtle mockup browser bar */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-700" />
                        <span className="w-2 h-2 rounded-full bg-slate-700" />
                        <span className="w-2 h-2 rounded-full bg-slate-700" />
                      </div>
                      <span className="text-[#38BDF8] bg-[#102A56] border border-[#3B82F6]/30 px-2 py-0.5 rounded-full font-sans font-medium text-[10px] tracking-wide">
                        {project.status}
                      </span>
                    </div>

                    {/* Visual mockup graphics representation */}
                    <div className="my-auto text-center space-y-2 py-4">
                      <div className="w-12 h-12 rounded-xl bg-[#102A56] border border-[#3B82F6]/30 text-[#38BDF8] mx-auto flex items-center justify-center group-hover:scale-110 group-hover:border-[#38BDF8]/60 group-hover:bg-[#1D4ED8]/30 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Layers className="w-6 h-6 text-[#38BDF8] group-hover:text-white" />
                      </div>
                      <span className="text-xs font-bold text-[#FFFFFF] block group-hover:text-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300">
                        {project.title}
                      </span>
                    </div>

                    {/* Clean tags */}
                    <div className="flex items-center gap-1.5 text-[10px] text-[#CBD5E1]/70 truncate">
                      {project.tags.map((tg, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <span aria-hidden="true" className="text-slate-600">·</span>}
                          <span>{tg}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-[#38BDF8] font-semibold bg-[#102A56] border border-[#3B82F6]/30 px-2.5 py-0.5 rounded-md text-[11px]">
                        {project.category}
                      </span>
                      <span className="text-[#CBD5E1]/70 text-[11px] font-medium">{project.status}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#FFFFFF] group-hover:text-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300 tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#CBD5E1] leading-relaxed line-clamp-3 font-normal">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="relative z-10 p-6 pt-0">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectProject({
                        ...project,
                        image: `/images/portfolio/${project.id}.jpg`,
                        projectUrl: "",
                        status: project.status as any,
                        category: project.category as any
                      })
                    }
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#102A56] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 border border-[#3B82F6]/40 hover:border-[#38BDF8]/70 shadow-sm hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>{t.portfolio.viewDetails}</span>
                  </button>
                </div>
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
