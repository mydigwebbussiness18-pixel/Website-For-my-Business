import hotelWebsitePreviewImg from "../assets/images/hotel_website_preview_1794791742505.jpg";
import restaurantWebsitePreviewImg from "../assets/images/restaurant_website_preview_1794791742555.jpg";
import hospitalClinicPreviewImg from "../assets/images/hospital_clinic_preview_1794762970011.jpg";
import realEstatePreviewImg from "../assets/images/real_estate_preview_1794791743796.jpg";
import graphicDesignPreviewImg from "../assets/images/graphic_design_preview_1794791744335.jpg";
import landingPagePreviewImg from "../assets/images/landing_page_preview_1794791745760.jpg";

/**
 * Centralized Vite-bundled preview images mapped by project ID.
 * Importing assets here keeps production GitHub/Netlify bundles self-contained
 * while keeping pure TypeScript config modules free of binary asset imports.
 */
export const PORTFOLIO_PREVIEW_IMAGES: Record<string, string> = {
  "hotel-demo": hotelWebsitePreviewImg,
  "restaurant-demo": restaurantWebsitePreviewImg,
  "hospital-demo": hospitalClinicPreviewImg,
  "real-estate-demo": realEstatePreviewImg,
  "graphic-design-samples": graphicDesignPreviewImg,
  "landing-page-demo": landingPagePreviewImg
};

/**
 * Resolves the best preview image URL for any existing or future project:
 * 1. Explicit project `previewImage` field if provided (valid non-empty URL or /images/... path)
 * 2. Bundled preview image mapped to the project's `id`
 * Returns `undefined` when none is configured so the card displays its branded fallback mockup.
 */
export function resolvePortfolioPreviewImage(
  projectId: string,
  configuredPreviewImage?: string
): string | undefined {
  const custom = (configuredPreviewImage ?? "").trim();
  if (custom) {
    return custom;
  }
  return PORTFOLIO_PREVIEW_IMAGES[projectId];
}
