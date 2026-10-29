import React from "react";

export type DividerVariant = "wave" | "curve" | "geometric" | "crest" | "footer-crest";

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
}

/**
 * Modern, elegant section dividers using lightweight SVGs
 * Uses Dark Navy Blue (#0B132B), Electric Blue (#2563EB / #3B82F6), and subtle Golden accents (#F59E0B / #FBBF24).
 * Fully responsive and optimized for zero horizontal scroll.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = "wave",
  className = ""
}) => {
  // Wave: Transitions from Hero (#FAFAFC) to Services (White)
  if (variant === "wave") {
    return (
      <div
        className={`w-full overflow-hidden leading-none select-none pointer-events-none bg-[#FAFAFC] ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 md:h-16 lg:h-20 block"
        >
          <defs>
            <linearGradient id="waveBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B132B" stopOpacity="0.08" />
              <stop offset="35%" stopColor="#2563EB" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0B132B" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="waveGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="10%" stopColor="#2563EB" stopOpacity="0" />
              <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FBBF24" stopOpacity="1" />
              <stop offset="85%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="waveNavyDeep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B132B" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#2563EB" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Deep Navy/Blue Under-wave */}
          <path
            d="M0,28 C260,65 480,10 740,40 C980,70 1220,18 1440,44 L1440,90 L0,90 Z"
            fill="url(#waveNavyDeep)"
          />

          {/* Electric Blue Mid-wave */}
          <path
            d="M0,42 C300,8 580,72 900,34 C1140,8 1320,52 1440,36 L1440,90 L0,90 Z"
            fill="url(#waveBlueGrad)"
          />

          {/* Subtle Golden accent filament ribbon */}
          <path
            d="M80,44 C380,12 660,66 980,32 C1200,8 1360,46 1440,34"
            stroke="url(#waveGoldGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Solid White Base flowing seamlessly into ServicesSection */}
          <path
            d="M0,58 C340,24 720,76 1080,44 C1260,30 1380,50 1440,48 L1440,90 L0,90 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    );
  }

  // Curve: Transitions from Services (White) to Portfolio (#FAFAFC)
  if (variant === "curve") {
    return (
      <div
        className={`w-full overflow-hidden leading-none select-none pointer-events-none bg-white ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 md:h-14 lg:h-16 block"
        >
          <defs>
            <linearGradient id="curveElectricGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B132B" stopOpacity="0.02" />
              <stop offset="25%" stopColor="#2563EB" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0B132B" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="curveSoftBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B132B" stopOpacity="0.02" />
              <stop offset="50%" stopColor="#2563EB" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#0B132B" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Subtle under-glow */}
          <path
            d="M0,8 Q720,68 1440,8 L1440,75 L0,75 Z"
            fill="url(#curveSoftBlue)"
          />

          {/* Seamless #FAFAFC base fill connecting to next section */}
          <path
            d="M0,14 Q720,70 1440,14 L1440,75 L0,75 Z"
            fill="#FAFAFC"
          />

          {/* Glowing Electric Blue & Golden Arch Line */}
          <path
            d="M0,14 Q720,70 1440,14"
            stroke="url(#curveElectricGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Center Golden Accent Node with Electric Blue Aura */}
          <circle cx="720" cy="70" r="3.5" fill="#F59E0B" />
          <circle cx="720" cy="70" r="6" stroke="#2563EB" strokeWidth="1.5" strokeOpacity="0.7" />
        </svg>
      </div>
    );
  }

  // Geometric: Transitions from Portfolio (#FAFAFC) to Offers (White)
  if (variant === "geometric") {
    return (
      <div
        className={`w-full overflow-hidden leading-none select-none pointer-events-none bg-[#FAFAFC] ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-10 md:h-12 lg:h-14 block"
        >
          <defs>
            <linearGradient id="geoLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B132B" stopOpacity="0.06" />
              <stop offset="30%" stopColor="#2563EB" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="1" />
              <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0B132B" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="geoBlueFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#0B132B" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Geometric facet ambient underlay */}
          <polygon
            points="0,18 680,48 720,42 760,48 1440,18 1440,65 0,65"
            fill="url(#geoBlueFill)"
          />

          {/* Pure White Base matching OffersSection */}
          <polygon
            points="0,22 680,50 720,44 760,50 1440,22 1440,65 0,65"
            fill="#FFFFFF"
          />

          {/* Precision Electric Blue & Golden Accent Stroke */}
          <polyline
            points="0,22 680,50 720,44 760,50 1440,22"
            stroke="url(#geoLineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Futuristic Center Golden Diamond Pip */}
          <polygon points="720,40 724,44 720,48 716,44" fill="#F59E0B" />
        </svg>
      </div>
    );
  }

  // Crest: Transitions from Offers (White) to Reviews (#FAFAFC)
  if (variant === "crest") {
    return (
      <div
        className={`w-full overflow-hidden leading-none select-none pointer-events-none bg-white ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-9 sm:h-12 md:h-14 lg:h-16 block"
        >
          <defs>
            <linearGradient id="crestGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="10%" stopColor="#2563EB" stopOpacity="0" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#FBBF24" stopOpacity="1" />
              <stop offset="90%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="crestBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B132B" stopOpacity="0.03" />
              <stop offset="50%" stopColor="#2563EB" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0B132B" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* Soft ambient wave depth */}
          <path
            d="M0,18 C400,64 1040,64 1440,18 L1440,80 L0,80 Z"
            fill="url(#crestBlueGrad)"
          />

          {/* Solid #FAFAFC base for ReviewsSection */}
          <path
            d="M0,24 C400,68 1040,68 1440,24 L1440,80 L0,80 Z"
            fill="#FAFAFC"
          />

          {/* Golden luminous crest thread with electric blue aura */}
          <path
            d="M80,24 C440,68 1000,68 1360,24"
            stroke="url(#crestGoldGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // Footer-crest: Transitions seamlessly from Contact (White) into Dark Navy Blue Footer (#0B132B)
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none bg-white ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 md:h-20 lg:h-24 block"
      >
        <defs>
          <linearGradient id="footerAccentLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
            <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="1" />
            <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="footerWavePre" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B132B" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0B132B" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Pre-wave depth layer */}
        <path
          d="M0,32 C380,8 740,62 1120,22 C1260,8 1360,28 1440,18 L1440,90 L0,90 Z"
          fill="url(#footerWavePre)"
        />

        {/* Main Solid Dark Navy Footer Entry Body (#0B132B) */}
        <path
          d="M0,45 C320,16 720,70 1080,30 C1260,12 1380,34 1440,28 L1440,90 L0,90 Z"
          fill="#0B132B"
        />

        {/* Radiant Electric Blue & Golden Accent Ribbon */}
        <path
          d="M0,45 C320,16 720,70 1080,30 C1260,12 1380,34 1440,28"
          stroke="url(#footerAccentLine)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
