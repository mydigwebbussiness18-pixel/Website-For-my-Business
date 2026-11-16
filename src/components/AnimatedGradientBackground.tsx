import React from "react";

export type AnimatedGradientVariant =
  | "hero"
  | "services"
  | "offers"
  | "reviews"
  | "contact";

interface AnimatedGradientBackgroundProps {
  variant: AnimatedGradientVariant;
  className?: string;
}

/**
 * Premium corporate CSS Animated Gradient Background.
 * Uses slow 11s-15s cycles across DigWeb Expert's navy, royal blue, muted gold,
 * and clean slate palette while keeping foreground typography crisp and readable.
 */
export const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  variant,
  className = ""
}) => {
  const isDark = variant === "hero" || variant === "offers" || variant === "contact";

  if (!isDark) {
    return (
      <div
        className={`absolute inset-0 z-0 pointer-events-none select-none overflow-hidden ${className}`}
        aria-hidden="true"
      >
        {/* Subtle shifting porcelain / soft sky-blue corporate gradient */}
        <div className="absolute inset-0 animate-brand-gradient-light opacity-90" />

        {/* Complementary drifting subtle electric-blue accent */}
        <div
          className="animate-glow-drift-a mobile-glow-opt absolute -top-32 -left-24 w-[28rem] sm:w-[38rem] h-[28rem] sm:h-[38rem] rounded-full blur-3xl"
          style={{
            background:
              variant === "services"
                ? "radial-gradient(circle, rgba(37, 99, 235, 0.075) 0%, rgba(56, 189, 248, 0.03) 48%, transparent 72%)"
                : "radial-gradient(circle, rgba(29, 78, 216, 0.065) 0%, rgba(56, 189, 248, 0.025) 48%, transparent 72%)"
          }}
        />

        {/* Complementary drifting muted champagne-gold highlight */}
        <div
          className="animate-glow-drift-b mobile-glow-opt absolute -bottom-28 -right-24 w-[26rem] sm:w-[36rem] h-[26rem] sm:h-[36rem] rounded-full blur-3xl"
          style={{
            background:
              variant === "services"
                ? "radial-gradient(circle, rgba(201, 162, 39, 0.06) 0%, rgba(37, 99, 235, 0.035) 50%, transparent 74%)"
                : "radial-gradient(circle, rgba(212, 175, 55, 0.055) 0%, rgba(37, 99, 235, 0.03) 50%, transparent 74%)"
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Smooth multi-stop deep luxury navy gradient shift */}
      <div
        className={`absolute inset-0 animate-brand-gradient-dark ${
          variant === "hero" ? "opacity-60" : "opacity-90"
        }`}
      />

      {/* Electric Blue complementary ambient orb */}
      <div
        className="animate-glow-drift-a mobile-glow-opt absolute -top-28 -left-20 w-[26rem] sm:w-[40rem] h-[26rem] sm:h-[40rem] rounded-full blur-3xl"
        style={{
          background:
            variant === "hero"
              ? "radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 72%)"
              : variant === "offers"
                ? "radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(16, 185, 129, 0.07) 48%, transparent 74%)"
                : "radial-gradient(circle, rgba(29, 78, 216, 0.20) 0%, rgba(56, 189, 248, 0.07) 48%, transparent 74%)"
        }}
      />

      {/* Muted Luxury Gold & Royal Navy complementary ambient orb */}
      <div
        className="animate-glow-drift-b mobile-glow-opt absolute -bottom-28 -right-20 w-[24rem] sm:w-[38rem] h-[24rem] sm:h-[38rem] rounded-full blur-3xl"
        style={{
          background:
            variant === "contact"
              ? "radial-gradient(circle, rgba(201, 162, 39, 0.13) 0%, rgba(37, 99, 235, 0.09) 48%, transparent 74%)"
              : variant === "offers"
                ? "radial-gradient(circle, rgba(212, 175, 55, 0.10) 0%, rgba(22, 163, 74, 0.08) 48%, transparent 74%)"
                : "radial-gradient(circle, rgba(212, 175, 55, 0.10) 0%, rgba(37, 99, 235, 0.08) 48%, transparent 74%)"
        }}
      />

      {/* Subtle center-upper depth drift for rich corporate balance */}
      <div
        className="animate-glow-drift-c mobile-glow-opt hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 w-[34rem] h-[20rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(56, 189, 248, 0.07) 0%, rgba(16, 42, 86, 0.12) 55%, transparent 78%)"
        }}
      />
    </div>
  );
};
