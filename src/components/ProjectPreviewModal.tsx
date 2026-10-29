import React, { useState } from "react";
import { PortfolioProject } from "../types";
import { useLanguage } from "../i18n/LanguageContext";
import { X, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";

interface ProjectPreviewModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({ project, onClose }) => {
  const { t } = useLanguage();
  const [leavingWarning, setLeavingWarning] = useState(false);

  if (!project) return null;

  // Find matching localized project item
  const localizedProject =
    t.portfolio.items.find((p) => p.id === project.id) || project;

  const handleOpenLiveDemo = () => {
    if (!project.projectUrl) return;
    setLeavingWarning(true);
  };

  const confirmLeave = () => {
    window.open(project.projectUrl, "_blank", "noopener,noreferrer");
    setLeavingWarning(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label={t.modals.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-blue-600 font-semibold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                {localizedProject.category}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-amber-700 font-medium bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-[11px]">
                {localizedProject.status}
              </span>
            </div>
            <h2 id="project-modal-title" className="text-2xl font-bold text-[#0B132B] mt-2">
              {localizedProject.title}
            </h2>
            <p className="text-slate-600 text-sm mt-2">{localizedProject.longDescription}</p>
          </div>

          {/* Visual Showcase Box with Styled Fallback */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-4">
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="text-slate-400 ml-2">{t.modals.projectDemoUrl}/{project.id}</span>
                </div>
                <span className="text-amber-700 text-[11px] font-sans font-medium">
                  {localizedProject.status}
                </span>
              </div>

              {/* Mock Preview Content */}
              <div className="py-8 px-4 text-center">
                <div className="max-w-md mx-auto space-y-3">
                  <div className="h-6 w-32 bg-blue-50 rounded-full mx-auto border border-blue-200 flex items-center justify-center text-[11px] text-blue-600 font-semibold">
                    {localizedProject.category}
                  </div>
                  <h3 className="text-lg font-bold text-[#0B132B]">{localizedProject.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{localizedProject.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Architectural & Concept Features */}
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

          {/* Transparency Disclaimer Notice */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-600">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 block mb-0.5">{t.modals.honestDemoNotice}</strong>
              {t.modals.honestDemoBody}
            </div>
          </div>

          {/* External Departure Warning Modal if link is clicked */}
          {leavingWarning && (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 space-y-3">
              <p className="text-xs text-amber-900">
                {t.modals.externalWarningTitle}{" "}
                <code className="text-amber-950 bg-amber-100 px-1 py-0.5 rounded font-mono">{project.projectUrl}</code>.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={confirmLeave}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  {t.modals.proceedLive}
                </button>
                <button
                  type="button"
                  onClick={() => setLeavingWarning(false)}
                  className="border border-slate-300 text-slate-700 text-xs font-medium px-3 py-2 rounded-xl hover:bg-slate-100"
                >
                  {t.modals.cancel}
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {project.projectUrl ? (
              <button
                type="button"
                onClick={handleOpenLiveDemo}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.modals.launchLive}</span>
              </button>
            ) : (
              <span className="text-xs text-slate-500">
                {t.modals.urlNotConfigured}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-700 hover:text-slate-900 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors font-medium"
            >
              {t.modals.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
