import type { ProjectStatus } from "../types";

export interface PortfolioProjectConfig {
  /** Internal project ID linking this entry to its preview image, translations, and card */
  id: string;
  /** Editable Project Name displayed on the Portfolio card and inside the Project Details modal */
  projectName: string;
  /**
   * Editable Live Demo Website URL (e.g., "https://your-demo-site.netlify.app").
   * Leave as "" (empty string) if the live website is not ready yet — the Live Demo button
   * will stay safely hidden/disabled instead of showing a broken link.
   */
  liveDemoUrl: string;
  /**
   * Optional custom Website Preview Image URL or public path (e.g., "/images/portfolio/gym-preview.webp").
   * Existing projects automatically resolve their bundled business preview images when omitted.
   * For any NEW project added here, provide its preview image path/URL to display it on the card.
   */
  previewImage?: string;
  /** Optional category label (used automatically for new projects; localized items use translations when available) */
  category?: string;
  /** Optional short summary shown on the portfolio card */
  description?: string;
  /** Optional detailed description shown in the Project Details modal */
  longDescription?: string;
  /** Optional list of key features displayed inside the Project Details modal */
  features?: string[];
  /** Optional tags displayed on the preview overlay */
  tags?: string[];
  /** Optional badge status ("Demo Project" or "Concept Project") */
  status?: ProjectStatus;
}

/**
 * ============================================================================
 * HOSPITAL & CLINIC DEMO WEBSITE URL — MANUAL CONFIGURATION
 * ============================================================================
 * Both the Hospital & Clinic Website portfolio card "Live Demo" button and the
 * Project Details modal "View Live Demo ↗" button read from this variable.
 */
export const HOSPITAL_DEMO_URL = "https://myhospitaldemowebsite.netlify.app";

/**
 * ============================================================================
 * DIGWEB EXPERT — CENTRALIZED PORTFOLIO PROJECTS CONFIGURATION
 * ============================================================================
 *
 * EASY PROJECT MANAGEMENT (EXISTING & FUTURE PROJECTS):
 * 1. To update an existing project's name, live demo URL, or preview image, edit its entry below.
 * 2. To add ANY new demo project (e.g. Gym, Salon, Jewellery, Construction, Travel, Education, E-commerce),
 *    add a new object below with `id`, `projectName`, `category`, `description`, `previewImage`,
 *    `liveDemoUrl`, `tags`, and `features`. It will AUTOMATICALLY render with the exact same
 *    universal preview-image card layout, modal, and Live Demo button!
 */
export const portfolioProjectsConfig: PortfolioProjectConfig[] = [
  {
    id: "hotel-demo",
    projectName: "Hotel Demo Website",
    category: "Website Development",
    liveDemoUrl: "https://hotelghunghatdemowebsite.netlify.app",
    status: "Demo Project",
    tags: ["Hospitality", "Responsive Design", "Booking Flow"]
  },
  {
    id: "restaurant-demo",
    projectName: "Restaurant Website Demo",
    category: "Website Development",
    liveDemoUrl: "https://restaurantdemowebsit.netlify.app",
    status: "Demo Project",
    tags: ["Culinary", "Digital Menu", "Table Booking"]
  },
  {
    id: "hospital-demo",
    projectName: "Hospital & Clinic Website Demo",
    category: "Healthcare Website",
    liveDemoUrl: HOSPITAL_DEMO_URL,
    status: "Demo Project",
    tags: ["Hospital Website", "Clinic Website", "Healthcare", "Appointment System", "Responsive Design"]
  },
  {
    id: "real-estate-demo",
    projectName: "Real Estate Website Demo",
    category: "Website Development",
    liveDemoUrl: "https://myrealestatewebsitedemo.netlify.app",
    status: "Demo Project",
    tags: ["Real Estate", "Property Cards", "Lead Capture"]
  },
  {
    id: "graphic-design-samples",
    projectName: "Graphic Design Samples",
    category: "Graphic Design",
    liveDemoUrl: "",
    status: "Concept Project",
    tags: ["Social Media", "Creatives", "Typography"]
  },
  {
    id: "landing-page-demo",
    projectName: "Landing Page Demo",
    category: "Website Development",
    liveDemoUrl: "",
    status: "Demo Project",
    tags: ["Lead Generation", "Single Page", "Fast Loading"]
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
