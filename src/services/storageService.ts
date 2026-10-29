import { CustomerReview, ContactEnquiry, ReviewStatus } from "../types";

const REVIEWS_STORAGE_KEY = "digweb_expert_customer_reviews";
const ENQUIRIES_STORAGE_KEY = "digweb_expert_contact_enquiries";

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
 * Stores a contact enquiry in local demo storage.
 */
export function submitContactEnquiry(data: {
  fullName: string;
  businessName: string;
  phoneNumber: string;
  interestedService: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.fullName.trim() || data.fullName.trim().length < 2) {
        return reject(new Error("Please enter your name."));
      }
      if (!data.phoneNumber.trim() || data.phoneNumber.trim().length < 7) {
        return reject(new Error("Please enter a valid phone or WhatsApp number."));
      }
      if (!data.message.trim() || data.message.trim().length < 5) {
        return reject(new Error("Please write a brief description of your requirements."));
      }

      const enquiry: ContactEnquiry = {
        id: "enq_" + Date.now(),
        fullName: data.fullName.trim(),
        businessName: data.businessName.trim() || "Not specified",
        phoneNumber: data.phoneNumber.trim(),
        interestedService: data.interestedService || "Website Development",
        message: data.message.trim(),
        submittedAt: new Date().toISOString()
      };

      try {
        const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
        const list = raw ? JSON.parse(raw) : [];
        list.unshift(enquiry);
        localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(list));
        resolve({
          success: true,
          message: "Thank you for contacting DigWeb Expert. Your enquiry has been submitted successfully."
        });
      } catch (err) {
        reject(new Error("Failed to process enquiry. Please try again or reach out on WhatsApp."));
      }
    }, 700);
  });
}
