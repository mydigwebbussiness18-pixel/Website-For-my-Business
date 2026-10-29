import { CustomerReview, ContactEnquiry, AppointmentBooking, ReviewStatus } from "../types";
import { saveAppointmentToSupabase } from "./supabaseClient";

const REVIEWS_STORAGE_KEY = "digweb_expert_customer_reviews";
const ENQUIRIES_STORAGE_KEY = "digweb_expert_contact_enquiries";
const APPOINTMENTS_STORAGE_KEY = "digweb_expert_booking_appointments";

/**
 * Reads all stored reviews from local storage.
 * By default returns empty array so no fake reviews exist.
 */
export function getStoredReviews(): CustomerReview[] {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse reviews from localStorage:", e);
    return [];
  }
}

/**
 * Returns only approved customer reviews for public display.
 */
export function getApprovedReviews(): CustomerReview[] {
  const all = getStoredReviews();
  return all.filter((r) => r.status === "approved");
}

/**
 * Submits a new review.
 * CRITICAL RULE: Newly submitted reviews ALWAYS get 'pending' status.
 * They are NEVER automatically approved.
 */
export function submitNewReview(data: {
  customerName: string;
  rating: number;
  reviewText: string;
}): Promise<{ success: boolean; message: string; review?: CustomerReview }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic input validation
      if (!data.customerName.trim() || data.customerName.trim().length < 2) {
        return reject(new Error("Please enter your full name (at least 2 characters)."));
      }
      if (!data.rating || data.rating < 1 || data.rating > 5) {
        return reject(new Error("Please select a rating between 1 and 5 stars."));
      }
      if (!data.reviewText.trim() || data.reviewText.trim().length < 10) {
        return reject(new Error("Please write a constructive review of at least 10 characters."));
      }
      if (data.reviewText.trim().length > 1000) {
        return reject(new Error("Review text cannot exceed 1000 characters."));
      }

      const newReview: CustomerReview = {
        id: "rev_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        customerName: data.customerName.trim(),
        rating: data.rating,
        reviewText: data.reviewText.trim(),
        createdAt: new Date().toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric"
        }),
        status: "pending" // Strictly pending for owner approval
      };

      try {
        const existing = getStoredReviews();
        existing.unshift(newReview);
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(existing));
        resolve({
          success: true,
          message:
            "Thank you! Your review has been submitted and is currently pending owner verification before being published.",
          review: newReview
        });
      } catch (err) {
        reject(new Error("Could not store review locally. Storage might be full or restricted."));
      }
    }, 600);
  });
}

/**
 * Moderation API for the business owner:
 * Updates the approval status of a review (approved or rejected).
 */
export function updateReviewStatus(reviewId: string, newStatus: ReviewStatus): boolean {
  try {
    const existing = getStoredReviews();
    const updated = existing.map((r) => {
      if (r.id === reviewId) {
        return { ...r, status: newStatus };
      }
      return r;
    });
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error("Failed to update review status:", e);
    return false;
  }
}

/**
 * Reads all stored appointments from local storage backup.
 */
export function getStoredAppointments(): AppointmentBooking[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse appointments from localStorage:", e);
    return [];
  }
}

/**
 * Submits an appointment booking:
 * 1. Inserts directly into Supabase 'appointments' table
 * 2. Saves local backup in localStorage
 * 3. Returns live Supabase sync status
 */
export async function submitAppointmentBooking(data: {
  fullName: string;
  businessName?: string;
  phoneNumber: string;
  email?: string;
  interestedService: string;
  appointmentDate?: string;
  appointmentTime?: string;
  message: string;
}): Promise<{ success: boolean; message: string; savedToSupabase: boolean; appointment: AppointmentBooking }> {
  // Input validation
  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    throw new Error("Please enter your name (at least 2 characters).");
  }
  if (!data.phoneNumber.trim() || data.phoneNumber.trim().length < 7) {
    throw new Error("Please enter a valid phone or WhatsApp number.");
  }
  if (!data.message.trim() || data.message.trim().length < 5) {
    throw new Error("Please write a brief description of your requirements (at least 5 characters).");
  }

  const appointment: AppointmentBooking = {
    id: "apt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
    fullName: data.fullName.trim(),
    businessName: data.businessName?.trim() || "Not specified",
    phoneNumber: data.phoneNumber.trim(),
    email: data.email?.trim() || "",
    interestedService: data.interestedService || "Website Development",
    appointmentDate: data.appointmentDate || "",
    appointmentTime: data.appointmentTime || "",
    message: data.message.trim(),
    status: "pending",
    submittedAt: new Date().toISOString(),
    savedToSupabase: false
  };

  // 1. Attempt live save to Supabase
  let savedToSupabase = false;
  try {
    const sbResult = await saveAppointmentToSupabase(appointment);
    if (sbResult.success) {
      savedToSupabase = true;
      appointment.savedToSupabase = true;
    } else {
      console.warn("Supabase save note:", sbResult.error);
    }
  } catch (err) {
    console.warn("Could not save to Supabase directly:", err);
  }

  // 2. Always persist to localStorage backup
  try {
    const list = getStoredAppointments();
    list.unshift(appointment);
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(list));

    // Also sync to legacy enquiries storage key for backwards compatibility
    const legacyEnquiry: ContactEnquiry = {
      id: appointment.id,
      fullName: appointment.fullName,
      businessName: appointment.businessName || "Not specified",
      phoneNumber: appointment.phoneNumber,
      interestedService: appointment.interestedService,
      message: appointment.message,
      submittedAt: appointment.submittedAt
    };
    const rawLegacy = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    const legacyList = rawLegacy ? JSON.parse(rawLegacy) : [];
    legacyList.unshift(legacyEnquiry);
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(legacyList));
  } catch (err) {
    console.error("Local storage backup error:", err);
  }

  return {
    success: true,
    savedToSupabase,
    message: savedToSupabase
      ? "Your booking appointment has been saved to your Supabase database successfully!"
      : "Your booking appointment has been received and saved locally! (Ensure 'appointments' table is created in Supabase).",
    appointment
  };
}

/**
 * Stores a contact enquiry in Supabase and local storage.
 */
export async function submitContactEnquiry(data: {
  fullName: string;
  businessName: string;
  phoneNumber: string;
  interestedService: string;
  message: string;
  appointmentDate?: string;
  appointmentTime?: string;
  email?: string;
}): Promise<{ success: boolean; message: string; savedToSupabase?: boolean }> {
  const result = await submitAppointmentBooking(data);
  return {
    success: result.success,
    message: result.message,
    savedToSupabase: result.savedToSupabase
  };
}
