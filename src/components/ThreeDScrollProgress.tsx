import React, { useEffect, useRef } from "react";

export const ThreeDScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current && totalScroll > 0) {
        const current = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        barRef.current.style.transform = `scaleX(${current})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] to-[#D4AF37] relative origin-left will-change-transform shadow-[0_0_12px_rgba(56,189,248,0.7)]"
        style={{ transform: "scaleX(0)" }}
      >
        {/* Glowing 3D leading tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#38BDF8,0_0_20px_#3B82F6]" />
      </div>
    </div>
  );
};
