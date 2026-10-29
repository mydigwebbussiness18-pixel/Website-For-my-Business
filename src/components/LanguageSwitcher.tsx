import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { Language } from "../i18n/translations";
import { Globe, ChevronDown, Check } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  dropdownAlign?: "left" | "right";
  isMobile?: boolean;
  theme?: "dark" | "light";
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
  dropdownAlign = "right",
  isMobile = false,
  theme = "dark"
}) => {
  const { language, setLanguage, languages, currentLanguageOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const isDark = theme === "dark";

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      {/* Trigger Button: Displays only the currently selected language */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold tracking-wide transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
          isDark
            ? isOpen
              ? "bg-slate-800 text-blue-400 border-blue-500 shadow-md shadow-blue-500/10"
              : "bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700/80 hover:border-slate-600 shadow-xs"
            : isOpen
            ? "bg-blue-50 text-blue-700 border-blue-400 shadow-sm"
            : "bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-slate-300 shadow-xs"
        } ${isMobile ? "w-full justify-between py-2 text-sm" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Current language: ${currentLanguageOption.nativeLabel}. Click to select English, Gujarati, or Hindi.`}
      >
        <span className="flex items-center gap-1.5">
          <Globe className={`w-3.5 h-3.5 shrink-0 transition-colors duration-300 ${isDark ? "text-blue-400 group-hover:text-blue-300" : "text-blue-600 group-hover:text-blue-500"}`} />
          <span className="font-medium whitespace-nowrap">
            {currentLanguageOption.nativeLabel}
          </span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 shrink-0 ${
            isDark ? (isOpen ? "rotate-180 text-blue-400" : "text-slate-400") : (isOpen ? "rotate-180 text-blue-600" : "text-slate-400")
          }`}
        />
      </button>

      {/* Dropdown Menu with Smooth opening animation */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Language selection"
          className={`absolute z-50 mt-2 w-40 rounded-2xl border shadow-2xl p-1.5 transition-all duration-200 origin-top animate-in fade-in zoom-in-95 ${
            isDark
              ? "bg-[#0F172A]/98 backdrop-blur-md border-slate-700/90 text-slate-200 shadow-black/40"
              : "bg-white/95 backdrop-blur-md border-slate-200 text-slate-800 shadow-xl"
          } ${
            isMobile
              ? "left-0 right-0 w-full"
              : dropdownAlign === "right"
              ? "right-0"
              : "left-0"
          }`}
        >
          <div className="py-0.5 space-y-1">
            {languages.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all duration-200 text-left cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : isDark
                      ? "text-slate-300 hover:text-white hover:bg-slate-800/90 font-normal"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-normal"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm leading-none font-medium">
                      {item.nativeLabel}
                    </span>
                    {item.code !== "en" && (
                      <span
                        className={`text-[10px] ${
                          isSelected
                            ? "text-blue-100"
                            : isDark
                            ? "text-slate-400"
                            : "text-slate-500"
                        }`}
                      >
                        ({item.label})
                      </span>
                    )}
                  </span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
