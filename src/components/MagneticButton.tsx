import React, { useEffect, useRef, useState } from "react";

export interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Maximum magnetic displacement in pixels (clamped to 5-8px range). Default: 6.5 */
  maxOffset?: number;
  /** Distance in pixels outside the button edges where magnetic attraction activates. Default: 26 */
  proximity?: number;
  /** Optional layout classes for the outer stationary wrapper (e.g. "w-full sm:w-auto") */
  wrapperClassName?: string;
}

/**
 * Subtle Magnetic Button wrapper for flagship CTA buttons.
 * - Gently pulls toward nearby fine-pointer mouse movement (max 5-8px).
 * - Smoothly eases back to (0, 0) when the pointer moves away or leaves the window.
 * - Automatically disabled on touch devices, disabled buttons, and reduced-motion preferences.
 * - Preserves original button geometry, styling, and native keyboard accessibility.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  wrapperClassName = "",
  maxOffset = 6.5,
  proximity = 26,
  disabled = false,
  type = "button",
  ...rest
}) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const magnetRef = useRef<HTMLDivElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  // Clamp magnetic displacement safely within subtle 5-8px bounds
  const clampedMax = Math.min(8, Math.max(5, maxOffset));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCapability = () => {
      setIsEnabled(pointerQuery.matches && !motionQuery.matches && !disabled);
    };

    updateCapability();
    pointerQuery.addEventListener("change", updateCapability);
    motionQuery.addEventListener("change", updateCapability);

    return () => {
      pointerQuery.removeEventListener("change", updateCapability);
      motionQuery.removeEventListener("change", updateCapability);
    };
  }, [disabled]);

  useEffect(() => {
    const magnetEl = magnetRef.current;
    const anchorEl = anchorRef.current;
    if (!magnetEl || !anchorEl) return;

    const resetPosition = () => {
      magnetEl.style.transition = "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)";
      magnetEl.style.transform = "translate3d(0px, 0px, 0)";
    };

    if (!isEnabled) {
      resetPosition();
      return;
    }

    let isVisible = true;
    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;
    let isActive = false;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (!isVisible && isActive) {
          isActive = false;
          resetPosition();
        }
      },
      { threshold: 0 }
    );
    observer.observe(anchorEl);

    const applyMagneticPull = () => {
      rafId = null;
      if (!isVisible) return;

      const rect = anchorEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const nearHorizontal =
        lastX >= rect.left - proximity && lastX <= rect.right + proximity;
      const nearVertical =
        lastY >= rect.top - proximity && lastY <= rect.bottom + proximity;

      if (nearHorizontal && nearVertical) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const halfWidth = rect.width / 2 + proximity;
        const halfHeight = rect.height / 2 + proximity;

        const normX = Math.max(-1, Math.min(1, (lastX - centerX) / halfWidth));
        const normY = Math.max(-1, Math.min(1, (lastY - centerY) / halfHeight));

        const offsetX = Number((normX * clampedMax).toFixed(2));
        const offsetY = Number((normY * clampedMax).toFixed(2));

        isActive = true;
        magnetEl.style.transition = "transform 150ms cubic-bezier(0.22, 1, 0.36, 1)";
        magnetEl.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      } else if (isActive) {
        isActive = false;
        resetPosition();
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !isVisible) return;
      lastX = e.clientX;
      lastY = e.clientY;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(applyMagneticPull);
      }
    };

    const handlePointerLeaveWindow = () => {
      if (isActive) {
        isActive = false;
        resetPosition();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeaveWindow);
    window.addEventListener("blur", handlePointerLeaveWindow);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeaveWindow);
      window.removeEventListener("blur", handlePointerLeaveWindow);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      resetPosition();
    };
  }, [isEnabled, clampedMax, proximity]);

  return (
    <div
      ref={anchorRef}
      className={`inline-flex ${wrapperClassName}`}
    >
      <div
        ref={magnetRef}
        className="w-full will-change-transform"
        style={{ transform: "translate3d(0px, 0px, 0)" }}
      >
        <button
          type={type}
          disabled={disabled}
          className={className}
          {...rest}
        >
          {children}
        </button>
      </div>
    </div>
  );
};
