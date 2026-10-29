export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  deliverables?: string[];
  idealFor?: string;
  whatsappMessage: string;
  badge?: string;
}

export type ProjectStatus = "Demo Project" | "Concept Project";

export interface PortfolioProject {
  id: string;
  title: string;
  category: "Website Development" | "Graphic Design" | "Meta Ads" | "Google Business Profile";
  description: string;
  longDescription: string;
  features: string[];
  image: string;
  projectUrl: string;
  status: ProjectStatus;
  tags: string[];
}

export interface ServiceOffer {
  id: string;
  title: string;
  description: string;
  image?: string;
  price?: string;
  discount?: string;
  expiryDate?: string; // YYYY-MM-DD or formatted
  isActive: boolean;
  category: string;
  whatsappMessage: string;
}

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface CustomerReview {
  id: string;
  customerName: string;
  rating: number; // 1 to 5
  reviewText: string;
  createdAt: string;
  status: ReviewStatus;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  businessName: string;
  phoneNumber: string;
  interestedService: string;
  message: string;
  submittedAt: string;
}

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface AppointmentBooking {
  id: string;
  fullName: string;
  businessName?: string;
  phoneNumber: string;
  email?: string;
  interestedService: string;
  appointmentDate?: string;
  appointmentTime?: string;
  message: string;
  status: AppointmentStatus;
  submittedAt: string;
  savedToSupabase?: boolean;
}

export interface BusinessConfig {
  businessName: string;
  tagline: string;
  description: string;
  logo: string;
  founder: {
    name: string;
    designation: string;
    image: string;
    introduction: string;
    bioParagraphs?: string[];
  };
  contact: {
    whatsappNumber: string;
    email: string;
    instagram: string;
    instagramUsername: string;
    defaultWhatsappMessage: string;
    contactSectionWhatsappMessage: string;
  };
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  offers: ServiceOffer[];
  copyrightText: string;
}
