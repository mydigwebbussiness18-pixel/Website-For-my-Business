import React, { useEffect } from "react";
import { PortfolioProject } from "../types";
import { useLanguage } from "../i18n/LanguageContext";
import { getPortfolioProjectConfig, normalizeLiveDemoUrl } from "../config/portfolioProjects";
import { X, CheckCircle2, AlertCircle, Globe, Sparkles } from "lucide-react";

interface ProjectPreviewModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({ project, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  // Find matching localized project content & centralized configuration
  const localizedProject =
    t.portfolio.items.find((p) => p.id === project.id) || project;
  const projectConfig = getPortfolioProjectConfig(project.id);

  const displayName = projectConfig?.projectName?.trim() || localizedProject.title;
  const liveDemoUrl = normalizeLiveDemoUrl(projectConfig?.liveDemoUrl || project.projectUrl);
  const hasLiveDemo = Boolean(liveDemoUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-8 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label={t.modals.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header Metadata + Top View Live Demo Button */}
          <div className="pr-8">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-blue-600 font-semibold bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-md">
                {localizedProject.category}
              </span>
              <span
                className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 border border-amber-300/80 px-2.5 py-0.5 rounded-full"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>{t.modals.demoProjectBadge}</span>
              </span>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-[#0B132B] tracking-tight">
                {displayName}
              </h2>

              {/* Prominent Top Live Demo Action Button (replaces non-clickable Demo Project badge) */}
              <div className="shrink-0">
                {hasLiveDemo ? (
                  <a
                    href={liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0B132B] via-[#102A56] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl border border-blue-400/40 hover:border-blue-300 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
                  >
                    <Globe className="w-4 h-4 text-[#38BDF8] group-hover:text-white transition-colors" />
                    <span>{t.modals.viewLiveDemo} ↗</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title={t.modals.liveDemoUnavailable}
                    className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-400 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-200 cursor-not-allowed opacity-75 whitespace-nowrap"
                  >
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span>{t.modals.viewLiveDemo} ↗</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              {localizedProject.longDescription}
            </p>
          </div>

          {/* Visual Showcase Box */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" />
                  <span className="text-slate-400 ml-1 truncate">
                    {hasLiveDemo ? liveDemoUrl : `${t.modals.projectDemoUrl}/${project.id}`}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${hasLiveDemo ? "bg-emerald-500" : "bg-blue-500"}`} />
                  <span>{hasLiveDemo ? "Live Preview" : "Concept Preview"}</span>
                </span>
              </div>

              {/* Preview Content */}
              <div className="py-7 sm:py-8 px-3 sm:px-4 text-center">
                <div className="max-w-md mx-auto space-y-3">
                  <div className="inline-flex h-6 px-3 bg-blue-50 rounded-full mx-auto border border-blue-200 items-center justify-center text-[11px] text-blue-600 font-semibold">
                    {localizedProject.category}
                  </div>
                  <h3 className="text-lg font-bold text-[#0B132B]">{displayName}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{localizedProject.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features / Core Capabilities */}
          <div>
            <h4 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-3">
              {t.modals.coreCapabilities}
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {localizedProject.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Demo Disclaimer Notice */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#0B132B] font-bold block mb-1">
                {t.modals.honestDemoNotice}
              </strong>
              <p>{t.modals.honestDemoBody}</p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            {hasLiveDemo ? (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#0B132B] hover:bg-[#1D4ED8] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <Globe className="w-4 h-4 text-[#38BDF8] group-hover:text-white transition-colors" />
                <span>{t.modals.viewLiveDemo} ↗</span>
              </a>
            ) : (
              <span className="text-xs text-slate-500 font-medium">
                {t.modals.liveDemoUnavailable}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-700 hover:text-slate-900 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors font-semibold cursor-pointer"
            >
              {t.modals.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

