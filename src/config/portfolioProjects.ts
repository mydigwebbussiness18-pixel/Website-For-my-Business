export interface PortfolioProjectConfig {
  /** Internal project ID linking this entry to its category, description, features, and card */
  id: string;
  /** Editable Project Name displayed on the Portfolio card and inside the Project Details modal */
  projectName: string;
  /**
   * Editable Live Demo Website URL (e.g., "https://your-demo-site.netlify.app").
   * Leave as "" (empty string) if the live website is not ready yet — the Live Demo button
   * will stay safely disabled instead of showing a broken link.
   */
  liveDemoUrl: string;
}

/**
 * ============================================================================
 * DIGWEB EXPERT — CENTRALIZED PORTFOLIO PROJECTS CONFIGURATION
 * ============================================================================
 *
 * EASY PROJECT MANAGEMENT:
 * You only need to update `projectName` and `liveDemoUrl` below for each project.
 * Keep the `id` unchanged so each project stays connected to its existing
 * category, description, tags, and core capabilities.
 *
 * Example:
 * {
 *   id: "hotel-demo",
 *   projectName: "Hotel Website Demo",
 *   liveDemoUrl: "https://your-actual-hotel-demo.netlify.app"
 * }
 */
export const portfolioProjectsConfig: PortfolioProjectConfig[] = [
  {
    id: "hotel-demo",
    projectName: "Hotel Demo Website",
    liveDemoUrl: "https://hotelghunghatdemowebsite.netlify.app"
  },
  {
    id: "restaurant-demo",
    projectName: "Restaurant Website Demo",
    liveDemoUrl: "https://restaurantdemowebsit.netlify.app"
  },
  {
    id: "furniture-demo",
    projectName: "Furniture Business Website Demo",
    liveDemoUrl: ""
  },
  {
    id: "real-estate-demo",
    projectName: "Real Estate Website Demo",
    liveDemoUrl: "https://myrealestatewebsitedemo.netlify.app"
  },
  {
    id: "graphic-design-samples",
    projectName: "Graphic Design Samples",
    liveDemoUrl: ""
  },
  {
    id: "landing-page-demo",
    projectName: "Landing Page Demo",
    liveDemoUrl: ""
  }
];

/**
 * Validates and normalizes a live demo URL.
 * Returns "" if empty or unsafe so broken/invalid links are never rendered.
 */
export function normalizeLiveDemoUrl(url?: string): string {
  const trimmed = (url ?? "").trim();
  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // If the owner pastes a domain without https:// (e.g. "my-site.netlify.app"), normalize it safely
  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return "";
}

/**
 * Looks up a project's centralized configuration by its unique ID.
 */
export function getPortfolioProjectConfig(id: string): PortfolioProjectConfig | undefined {
  return portfolioProjectsConfig.find((item) => item.id === id);
}
