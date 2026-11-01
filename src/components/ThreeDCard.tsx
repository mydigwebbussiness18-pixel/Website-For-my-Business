import React, { useRef, useEffect } from "react";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees on mouse move
  scrollTiltStrength?: number; // max tilt degrees from scroll position
  enableGlare?: boolean;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className = "",
  maxTilt = 8,
  scrollTiltStrength = 5,
  enableGlare = true,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let rafId = 0;
    let isHovered = false;
    let currentScrollRot = 0;

    const handleScroll = () => {
      if (!cardRef.current || !innerRef.current || isHovered) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!cardRef.current || !innerRef.current || isHovered) return;
        const rect = cardRef.current.getBoundingClientRect();
        // Viewport culling: only calculate if card is near or in viewport
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

        const viewportCenter = window.innerHeight * 0.5;
        const cardCenter = rect.top + rect.height * 0.5;
        const delta = (cardCenter - viewportCenter) / (window.innerHeight * 0.5);
        const clamped = Math.max(-1, Math.min(1, delta));
        currentScrollRot = -clamped * scrollTiltStrength;
        innerRef.current.style.transform = `rotateX(${currentScrollRot}deg) rotateY(0deg) translateZ(0px)`;
      });
    };

    const cardEl = cardRef.current;
    if (!cardEl) return;

    const onMouseEnter = () => {
      isHovered = true;
      if (innerRef.current) {
        innerRef.current.style.transition = "transform 0.12s ease-out";
      }
      if (glareRef.current) {
        glareRef.current.style.opacity = "0.18";
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isHovered || !cardRef.current || !innerRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width - 0.5) * 2;
      const normY = (y / rect.height - 0.5) * 2;

      const rotX = -normY * maxTilt;
      const rotY = normX * maxTilt;

      innerRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`;

      if (enableGlare && glareRef.current) {
        const gx = (x / rect.width) * 100;
        const gy = (y / rect.height) * 100;
        glareRef.current.style.background = `radial-gradient(circle 320px at ${gx}% ${gy}%, rgba(255,255,255,0.45), transparent 70%)`;
      }
    };

    const onMouseLeave = () => {
      isHovered = false;
      if (innerRef.current) {
        innerRef.current.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
        innerRef.current.style.transform = `rotateX(${currentScrollRot}deg) rotateY(0deg) translateZ(0px)`;
      }
      if (glareRef.current) {
        glareRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    cardEl.addEventListener("mouseenter", onMouseEnter);
    cardEl.addEventListener("mousemove", onMouseMove, { passive: true });
    cardEl.addEventListener("mouseleave", onMouseLeave);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cardEl.removeEventListener("mouseenter", onMouseEnter);
      cardEl.removeEventListener("mousemove", onMouseMove);
      cardEl.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [maxTilt, scrollTiltStrength, enableGlare]);

  return (
    <div
      ref={cardRef}
      style={{ perspective: 1200 }}
      className={`relative group ${className}`}
    >
      <div
        ref={innerRef}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="w-full h-full relative"
      >
        {children}

        {/* Dynamic 3D lighting sheen reflection */}
        {enableGlare && (
          <div
            ref={glareRef}
            className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 opacity-0"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
};
