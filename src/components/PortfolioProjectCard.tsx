import React, { useEffect, useState } from "react";
import { PortfolioProject } from "../types";
import { normalizeLiveDemoUrl } from "../config/portfolioProjects";
import { Eye, ExternalLink, Globe } from "lucide-react";
import { ThreeDCard } from "./ThreeDCard";

export interface PortfolioProjectCardProps {
  project: PortfolioProject;
  viewDetailsLabel: string;
  liveDemoLabel?: string;
  onSelectProject: (project: PortfolioProject) => void;
}

const PortfolioProjectCardComponent: React.FC<PortfolioProjectCardProps> = ({
  project,
  viewDetailsLabel,
  liveDemoLabel = "Live Demo",
  onSelectProject
}) => {
  const [imgError, setImgError] = useState(false);

  const previewSrc = (project.previewImage || "").trim();
  const liveDemoUrl = normalizeLiveDemoUrl(project.projectUrl);

  useEffect(() => {
    setImgError(false);
  }, [previewSrc]);

  const showPreviewImage = Boolean(previewSrc) && !imgError;

  return (
    <ThreeDCard
      maxTilt={8}
      scrollTiltStrength={5}
      className="h-full w-full max-w-full min-w-0 rounded-2xl"
    >
      <div className="h-full w-full max-w-full min-w-0 box-border relative bg-gradient-to-br from-[#102A56] via-[#0B1630] to-[#102A56] border border-[#3B82F6]/25 hover:border-[#3B82F6]/70 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg shadow-black/25 hover:shadow-2xl hover:shadow-[#1D4ED8]/20 transition-all duration-300 group preserve-3d">
        {/* Subtle gradient accent highlight (#1D4ED8) */}
        <div
          className="hidden sm:block absolute -top-16 -right-16 w-36 h-36 bg-[#1D4ED8]/15 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full min-w-0">
          {/* Universal Website Preview Image Frame with 3D Depth */}
          <div
            style={{ transform: "translateZ(20px)" }}
            className="relative w-full max-w-full min-w-0 aspect-[16/10] bg-[#0B1630]/80 border-b border-[#3B82F6]/20 overflow-hidden flex flex-col justify-between p-3 sm:p-4 group-hover:bg-[#0B1630]/95 transition-colors"
          >
            {showPreviewImage ? (
              <>
                <img
                  src={previewSrc}
                  alt={`${project.title} - ${project.category} website preview`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={500}
                  onError={() => setImgError(true)}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/75 via-[#0B132B]/15 to-[#0B132B]/85 pointer-events-none"
                  aria-hidden="true"
                />
              </>
            ) : (
              /* Graceful Branded Website Mockup Fallback when image is omitted or fails to load */
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#0F244D] via-[#0B132B] to-[#102A56] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
                aria-hidden="true"
              >
                <div className="w-full max-w-[210px] rounded-xl border border-[#3B82F6]/30 bg-[#0B132B]/85 shadow-lg overflow-hidden">
                  <div className="px-3 py-1.5 bg-[#102A56]/90 border-b border-[#3B82F6]/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]/70" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span className="ml-2 h-1.5 flex-1 rounded-full bg-slate-700/80" />
                  </div>
                  <div className="p-3.5 text-center space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-[#102A56] border border-[#3B82F6]/40 text-[#38BDF8] mx-auto flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-semibold text-white truncate">
                      {project.title}
                    </p>
                    <div className="flex justify-center gap-1.5">
                      <span className="h-1.5 w-10 rounded-full bg-[#38BDF8]/40" />
                      <span className="h-1.5 w-6 rounded-full bg-slate-600/80" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Top Mockup Browser Bar & Demo Project Badge */}
            <div className="relative z-10 flex items-center justify-between gap-2 text-[11px] text-slate-400 font-mono w-full min-w-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span className="w-2 h-2 rounded-full bg-slate-700" />
              </div>
              <span className="text-[#38BDF8] bg-[#102A56]/95 border border-[#3B82F6]/30 px-2 py-0.5 rounded-full font-sans font-medium text-[10px] tracking-wide whitespace-nowrap shrink-0">
                {project.status}
              </span>
            </div>

            {/* Bottom Preview Tags Strip (wraps cleanly inside mobile width) */}
            <div className="relative z-10 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] text-[#CBD5E1]/95 w-full min-w-0 leading-snug">
              {project.tags.map((tg, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <span aria-hidden="true" className="text-slate-400">
                      ·
                    </span>
                  )}
                  <span className="break-words">{tg}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Card Content with 3D Depth */}
          <div className="p-4 sm:p-6 space-y-3 w-full min-w-0">
            <div
              style={{ transform: "translateZ(14px)" }}
              className="flex flex-wrap items-center justify-between gap-2 text-xs min-w-0"
            >
              <span className="text-[#38BDF8] font-semibold bg-[#102A56] border border-[#3B82F6]/30 px-2.5 py-0.5 rounded-md text-[11px] max-w-full break-words">
                {project.category}
              </span>
              <span className="text-[#CBD5E1]/70 text-[11px] font-medium shrink-0">
                {project.status}
              </span>
            </div>

            <h3
              style={{ transform: "translateZ(18px)" }}
              className="text-base sm:text-lg font-bold text-[#FFFFFF] group-hover:text-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300 tracking-tight break-words"
            >
              {project.title}
            </h3>

            <p className="text-xs text-[#CBD5E1] leading-relaxed line-clamp-3 font-normal break-words">
              {project.description}
            </p>
          </div>
        </div>

        {/* Action Footer: Stacks cleanly on narrow mobile, side-by-side on sm+ */}
        <div
          style={{ transform: "translateZ(16px)" }}
          className="relative z-10 p-4 sm:p-6 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full min-w-0"
        >
          <button
            type="button"
            onClick={() => onSelectProject(project)}
            className="w-full sm:w-auto sm:flex-1 min-w-0 inline-flex items-center justify-center gap-2 bg-[#102A56] hover:bg-[#1D4ED8] text-[#FFFFFF] text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 border border-[#3B82F6]/40 hover:border-[#38BDF8]/70 shadow-sm hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span className="truncate">{viewDetailsLabel}</span>
          </button>

          {liveDemoUrl && (
            <a
              href={liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-[#2563EB] hover:to-[#38BDF8] text-[#FFFFFF] text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all duration-300 border border-[#38BDF8]/40 hover:border-[#38BDF8]/80 shadow-sm hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
            >
              <span>{liveDemoLabel}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          )}
        </div>
      </div>
    </ThreeDCard>
  );
};

export const PortfolioProjectCard = React.memo(PortfolioProjectCardComponent);
