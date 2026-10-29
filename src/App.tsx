import React, { useState } from "react";
import { ServiceItem, PortfolioProject } from "./types";
import { LanguageProvider } from "./i18n/LanguageContext";
import { Navbar } from "./components/Navbar";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { SectionDivider } from "./components/SectionDivider";
import { ServiceDetailModal } from "./components/ServiceDetailModal";
import { ProjectPreviewModal } from "./components/ProjectPreviewModal";
import { ReviewApprovalModal } from "./components/ReviewApprovalModal";
import { OwnerGuideModal } from "./components/OwnerGuideModal";
import { PrivacyPolicyModal } from "./components/PrivacyPolicyModal";

// 8 Sections in exact requested order
import { HeroSection } from "./sections/HeroSection";
import { ServicesSection } from "./sections/ServicesSection";
import { PortfolioSection } from "./sections/PortfolioSection";
import { OffersSection } from "./sections/OffersSection";
import { ReviewsSection } from "./sections/ReviewsSection";
import { FounderSection } from "./sections/FounderSection";
import { FAQSection } from "./sections/FAQSection";
import { ContactSection } from "./sections/ContactSection";
import { Footer } from "./sections/Footer";

function AppContent() {
  // Modal states
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isModerationOpen, setIsModerationOpen] = useState(false);
  const [isOwnerGuideOpen, setIsOwnerGuideOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  // Review update trigger to refresh approved reviews list
  const [reviewUpdateCounter, setReviewUpdateCounter] = useState(0);

  const handleReviewsUpdated = () => {
    setReviewUpdateCounter((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Responsive Top Navigation with Compact Language Switcher */}
      <Navbar onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {/* Section 1: Home (Hero) */}
        <HeroSection />

        {/* Section Divider 1: Smooth Wave into Services Section */}
        <SectionDivider variant="wave" />

        {/* Section 2: Our Services with ~50% Electric Blue Visual Cards */}
        <ServicesSection onSelectService={(service) => setSelectedService(service)} />

        {/* Section Divider 2: Elegant Curve into Portfolio Section */}
        <SectionDivider variant="curve" />

        {/* Section 3: Portfolio / Our Work */}
        <PortfolioSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section Divider 3: Futuristic Geometric Precision into Offers Section */}
        <SectionDivider variant="geometric" />

        {/* Section 4: Current Offers */}
        <OffersSection />

        {/* Section Divider 4: Fluid Crest Ribbon into Customer Reviews */}
        <SectionDivider variant="crest" />

        {/* Section 5: Customer Reviews */}
        <ReviewsSection
          onOpenModeration={() => setIsModerationOpen(true)}
          reviewUpdateCounter={reviewUpdateCounter}
        />

        {/* Section Divider 5: Smooth Curve into Founder Profile */}
        <SectionDivider variant="curve" />

        {/* Section 6: About Us / Founder */}
        <FounderSection />

        {/* Section Divider 6: Layered Crest into FAQ */}
        <SectionDivider variant="crest" />

        {/* Section 7: Frequently Asked Questions (FAQ) */}
        <FAQSection />

        {/* Section Divider 7: Geometric Precision Angle into Contact */}
        <SectionDivider variant="geometric" />

        {/* Section 8: Contact Us */}
        <ContactSection />
      </main>

      {/* Section Divider 8: Flowing Crest into Dark Navy Blue Footer */}
      <SectionDivider variant="footer-crest" />

      {/* Section 8: Footer */}
      <Footer
        onOpenPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
        onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Modals & Dialogs */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      <ProjectPreviewModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ReviewApprovalModal
        isOpen={isModerationOpen}
        onClose={() => setIsModerationOpen(false)}
        onReviewsUpdated={handleReviewsUpdated}
      />

      <OwnerGuideModal
        isOpen={isOwnerGuideOpen}
        onClose={() => setIsOwnerGuideOpen(false)}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
