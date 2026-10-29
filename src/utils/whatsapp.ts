import { businessConfig } from "../config/businessConfig";

/**
 * Normalizes a raw phone number to the international format required by wa.me:
 * - Strips all '+' symbols, spaces, hyphens, and brackets.
 * - Ensures only digits remain.
 */
export function normalizeWhatsAppNumber(rawNumber: string): string {
  if (!rawNumber) return "";
  // Strip all non-digit characters
  const digitsOnly = rawNumber.replace(/\D/g, "");
  return digitsOnly;
}

/**
 * Validates if the phone number is configured and has a reasonable international length (at least 10 digits).
 */
export function isValidWhatsAppConfigured(rawNumber: string): boolean {
  const normalized = normalizeWhatsAppNumber(rawNumber);
  return normalized.length >= 10;
}

/**
 * Builds a validated, properly encoded WhatsApp wa.me link.
 * Returns null if the configured number is missing or invalid.
 */
export function buildWhatsAppUrl(customMessage?: string): string | null {
  const rawNumber = businessConfig.contact.whatsappNumber;
  if (!isValidWhatsAppConfigured(rawNumber)) {
    return null;
  }

  const normalized = normalizeWhatsAppNumber(rawNumber);
  const message = customMessage || businessConfig.contact.defaultWhatsappMessage;
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${normalized}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp in a new tab safely with noopener, noreferrer.
 * If number is unconfigured, logs a warning and returns false.
 */
export function openWhatsAppChat(customMessage?: string): boolean {
  const url = buildWhatsAppUrl(customMessage);
  if (!url) {
    console.warn(
      "[DigWeb Expert WhatsApp] WhatsApp number is not configured or invalid in src/config/businessConfig.ts"
    );
    return false;
  }

  // Open WhatsApp safely in a new tab without compromising opener
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}
