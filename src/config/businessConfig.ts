import { BusinessConfig } from "../types";

/**
 * ============================================================================
 * DIGWEB EXPERT — CENTRAL BUSINESS CONFIGURATION
 * ============================================================================
 * 
 * OWNER EDITING INSTRUCTIONS:
 * 1. WhatsApp Number: Update `contact.whatsappNumber` below (e.g., "+91 9875274952").
 * 2. Business Email: Update `contact.email` below.
 * 3. Instagram: Update `contact.instagram` and `contact.instagramUsername`.
 * 4. Founder Photo: Put your photo in `public/images/founder.jpg` or change `founder.image`.
 * 5. Logo: Put your logo in `public/images/logo.jpeg` or change `logo`.
 * 6. Services & Portfolio: Edit items in `services` and `portfolio` arrays.
 * 7. Offers: Set `isActive: true` on an offer or add new ones to display them in Section 4.
 * 
 * Changing values in this file updates all corresponding sections across the website automatically.
 */

export const businessConfig: BusinessConfig = {
  businessName: "DigWeb Expert",
  tagline: "Grow Your Business with Powerful Digital Solutions",
  description:
    "DigWeb Expert provides digital solutions to help businesses establish and improve their online presence through professional website development, online advertising, graphic design, and Google Business Profile services.",
  
  // Business logo path (stored in public/images/logo.jpeg)
  logo: "/images/logo.jpeg",

  // Founder profile information
  founder: {
    name: "Mr. Harshadsinh Solanki",
    designation: "Founder — DigWeb Expert",
    image: "/images/founder.jpg",
    introduction:
      "Hello! I'm Harshadsinh Solanki, founder of DigWeb Expert. I help businesses build their online presence through website development, Meta Ads, graphic design, and Google Business Profile services.",
    bioParagraphs: [
      "DigWeb Expert was established to deliver dedicated, transparent, and high-quality digital solutions tailored to modern businesses. Whether you are launching your first business website, refreshing your existing digital brand, or setting up targeted advertising campaigns, our goal is to give your brand a trustworthy online foundation.",
      "We focus on clean, responsive development, purposeful graphic design, and strategic local search setup without misleading promises or exaggerated vanity metrics."
    ]
  },

  // Contact details & direct communication
  contact: {
    whatsappNumber: "+91 9875274952", // Actual business WhatsApp number
    email: "mydigwebbussiness.18@gmail.com",
    instagram: "https://www.instagram.com/digweb__expert__18/",
    instagramUsername: "@digweb__expert__18",
    defaultWhatsappMessage: "Hello DigWeb Expert, I would like to know more about your services.",
    contactSectionWhatsappMessage: "Hello DigWeb Expert, I would like to discuss your digital services."
  },

  // Primary digital services offered
  services: [
    {
      id: "website-development",
      title: "Website Development",
      shortDescription:
        "Professional, responsive websites designed to present your business online and help potential customers discover your services.",
      fullDescription:
        "Every modern business needs an accessible, high-speed, and responsive website that reflects its credibility. We build custom websites ranging from focused landing pages and business corporate sites to e-commerce catalogs. Every site is engineered to look polished across mobile phones, tablets, and desktop computers with clean code and intuitive navigation.",
      features: [
        "Professional Business Websites",
        "Landing Pages",
        "Modern Responsive Website Design",
        "Business Website Redesign",
        "E-commerce Website"
      ],
      deliverables: [
        "Mobile-first responsive layout",
        "Fast loading speed & clean code structure",
        "WhatsApp click-to-chat integration",
        "Lead generation contact form",
        "Basic on-page SEO & search meta tags"
      ],
      idealFor: "Businesses seeking a modern web presence to showcase services and receive customer inquiries.",
      whatsappMessage: "Hello DigWeb Expert, I am interested in Website Development. Please share more details.",
      badge: "Core Service"
    },
    {
      id: "meta-ads",
      title: "Meta Ads",
      shortDescription:
        "Advertising campaign setup for businesses that want to reach relevant audiences through Facebook and Instagram.",
      fullDescription:
        "Reach active customers across Facebook and Instagram with properly configured Meta Ads. We handle technical campaign setup, audience parameter configuration, creative and copy placement, and conversion tracking integration. We do not make unrealistic promises of overnight riches or guaranteed sales, but instead build methodical, targeted campaigns based on your actual budget and audience.",
      features: [
        "Facebook Advertising Setup",
        "Instagram Advertising Setup",
        "Campaign Configuration",
        "Advertising Creative Integration"
      ],
      deliverables: [
        "Meta Business Manager & Ad Account configuration",
        "Pixel & conversion event setup guidance",
        "Audience interest and geographic targeting",
        "Ad creative formatting & headline alignment",
        "Campaign launch testing and verification"
      ],
      idealFor: "Businesses wanting to promote specific offers, products, or service inquiries on social media.",
      whatsappMessage: "Hello DigWeb Expert, I am interested in Meta Ads services. Please share more details.",
      badge: "Targeted Reach"
    },
    {
      id: "graphic-design",
      title: "Graphic Design",
      shortDescription:
        "Professional visual content to help businesses communicate their services, promotions, and brand identity.",
      fullDescription:
        "Consistent and attractive visuals help your brand build trust and stand out in noisy social feeds. We craft clean, on-brand graphics tailored for Instagram feeds, Facebook posts, promotional banners, flyers, and digital marketing materials. Each creative is designed with attention to color harmony, readable typography, and clear visual hierarchy.",
      features: [
        "Social Media Post Design",
        "Promotional Creatives",
        "Business Graphics",
        "Marketing Visuals"
      ],
      deliverables: [
        "High-resolution social media post assets",
        "Promotional flyer & banner designs",
        "Cohesive color palette & typography hierarchy",
        "Formats ready for Instagram, Facebook, and WhatsApp sharing"
      ],
      idealFor: "Brands needing regular visual creatives, event announcements, or promotional marketing posts.",
      whatsappMessage: "Hello DigWeb Expert, I am interested in Graphic Design services. Please share more details.",
      badge: "Creative Branding"
    },
    {
      id: "google-business-profile",
      title: "Google Business Profile Setup",
      shortDescription:
        "Assistance with setting up and optimizing a business profile to improve the accuracy and presentation of business information on Google Search and Maps.",
      fullDescription:
        "When local customers search for your services or directions, your Google Business Profile is often their first point of contact. We assist you in establishing, configuring, and optimizing your Google Business Profile with accurate business hours, appropriate service categories, verified contact details, photos, and clear service descriptions.",
      features: [
        "Google Business Profile Setup",
        "Business Information Optimization",
        "Relevant Business Categories",
        "Search and Maps Visibility Improvements"
      ],
      deliverables: [
        "Initial profile setup and verification guidance",
        "Category selection & primary service listing",
        "Accurate business contact, hours, and area coverage",
        "Business description drafting & keyword alignment",
        "Google Maps pin placement review"
      ],
      idealFor: "Local service providers, retailers, and firms wanting an accurate, verified presence on Google Maps & Search.",
      whatsappMessage: "Hello DigWeb Expert, I am interested in Google Business Profile Setup. Please share more details.",
      badge: "Local Visibility"
    }
  ],

  // Demonstration projects & concepts
  portfolio: [
    {
      id: "hotel-demo",
      title: "Hotel Website Demo",
      category: "Website Development",
      description: "A modern, immersive hotel and hospitality concept featuring room showcases, direct inquiry pathways, and amenities overview.",
      longDescription: "This demonstration project illustrates a luxury boutique hotel website architecture. It highlights high-impact hero visuals, interactive room type selection, guest amenity breakdown, dining highlights, and a streamlined booking enquiry flow.",
      features: [
        "Mobile-optimized room showcase cards",
        "Direct reservation inquiry integration",
        "Amenities & dining highlight grid",
        "Interactive photo gallery layout"
      ],
      image: "/images/portfolio/hotel-demo.jpg",
      projectUrl: "", // Leave empty for screenshot modal or insert live demo URL
      status: "Demo Project",
      tags: ["Hospitality", "Responsive Design", "Booking Flow"]
    },
    {
      id: "restaurant-demo",
      title: "Restaurant Website Demo",
      category: "Website Development",
      description: "A culinary concept site featuring interactive digital menus, chef specials, table reservation forms, and location guidance.",
      longDescription: "Designed for modern dining establishments and cafes. This demo presents a clean categorized food & beverage menu, operating hours, chef notes, customer review highlights, and click-to-WhatsApp table reservation booking.",
      features: [
        "Categorized digital food menu",
        "Table reservation enquiry form",
        "Opening hours & location map preview",
        "Chef's seasonal specials highlight"
      ],
      image: "/images/portfolio/restaurant-demo.jpg",
      projectUrl: "",
      status: "Demo Project",
      tags: ["Culinary", "Digital Menu", "Table Booking"]
    },
    {
      id: "furniture-demo",
      title: "Furniture Business Website Demo",
      category: "Website Development",
      description: "An elegant Scandinavian furniture catalog layout emphasizing craftsmanship, material specifications, and product inquiries.",
      longDescription: "A clean, minimalist e-catalog demonstration for home and office furniture manufacturers. Displays room-based collections (living room, bedroom, office), dimensions, timber materials, and direct WhatsApp product availability checks.",
      features: [
        "Room-by-room catalog browsing",
        "Detailed product specs & material details",
        "High-contrast minimalist aesthetic",
        "Direct quotation inquiry action"
      ],
      image: "/images/portfolio/furniture-demo.jpg",
      projectUrl: "",
      status: "Demo Project",
      tags: ["E-Commerce Concept", "Catalog", "Minimalist"]
    },
    {
      id: "real-estate-demo",
      title: "Real Estate Website Demo",
      category: "Website Development",
      description: "A premier property showcase concept showcasing residential listings, floor plans, neighborhood insights, and inspection requests.",
      longDescription: "Demonstrates a modern property portal interface for real estate developers and brokers. Showcases property specifications (bedrooms, square footage, pricing placeholders), location highlights, and instant brochure downloads.",
      features: [
        "Property listing cards with key specs",
        "Floor plan & amenity inspection layout",
        "Schedule a viewing request form",
        "Neighborhood highlights and map area"
      ],
      image: "/images/portfolio/real-estate-demo.jpg",
      projectUrl: "",
      status: "Demo Project",
      tags: ["Real Estate", "Property Cards", "Lead Capture"]
    },
    {
      id: "graphic-design-samples",
      title: "Graphic Design Samples",
      category: "Graphic Design",
      description: "Curated collection of social media creatives, promotional sales posters, and typographic marketing graphics.",
      longDescription: "A concept portfolio demonstrating commercial visual design skills across social media banners, corporate flyers, festival greetings, and promotional sale announcements with tight typographic control.",
      features: [
        "Instagram feed & story aspect ratio sets",
        "Promotional announcement creatives",
        "Brand color scheme coordination",
        "Clean, legible commercial typography"
      ],
      image: "/images/portfolio/graphic-design-samples.jpg",
      projectUrl: "",
      status: "Concept Project",
      tags: ["Social Media", "Creatives", "Typography"]
    },
    {
      id: "landing-page-demo",
      title: "Landing Page Demo",
      category: "Website Development",
      description: "A high-conversion service landing page structure with clear visual hierarchy, benefits breakdown, and lead capture form.",
      longDescription: "Demonstrates single-page sales and lead-generation architecture. Features focused headline copy, 3-step service process, transparent feature comparisons, and accessible contact call-to-actions.",
      features: [
        "Above-the-fold value proposition",
        "Service benefit breakdown",
        "Validated contact lead capture form",
        "Fast single-page navigation"
      ],
      image: "/images/portfolio/landing-page-demo.jpg",
      projectUrl: "",
      status: "Demo Project",
      tags: ["Lead Generation", "Single Page", "Fast Loading"]
    }
  ],

  // Current promotional offers
  // Note: Only offers with `isActive: true` will be displayed.
  // If no offers are active, Section 4 displays the specified neutral notice:
  // "Special offers will be announced here. Contact us to discuss your requirements."
  offers: [
    {
      id: "website-starter-package",
      title: "Website Development Consultation Package",
      description: "Discuss your upcoming business website requirements with our founder, review sample layouts, and get a tailored roadmap for your business.",
      isActive: false, // Set to true when you want this offer to show publicly
      category: "Website Development",
      price: "", // Leave blank if not fixed
      discount: "", // Leave blank if not applicable
      expiryDate: "", // Format: "YYYY-MM-DD" e.g. "2026-12-31"
      whatsappMessage: "Hello DigWeb Expert, I would like to enquire about the Website Development offer."
    },
    {
      id: "google-profile-starter",
      title: "Google Business Profile Setup Assistance",
      description: "Complete guidance on setting up your Google Business Profile with accurate categories, hours, and search visibility optimization.",
      isActive: false,
      category: "Google Business Profile",
      price: "",
      discount: "",
      expiryDate: "",
      whatsappMessage: "Hello DigWeb Expert, I would like to enquire about the Google Business Profile Setup offer."
    }
  ],

  copyrightText: "DigWeb Expert. All rights reserved."
};
