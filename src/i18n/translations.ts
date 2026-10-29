export type Language = "en" | "gu" | "hi";

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" }
];

export interface Translations {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    offers: string;
    reviews: string;
    about: string;
    faq: string;
    contact: string;
    ownerGuide: string;
    chatWhatsApp: string;
  };
  hero: {
    kicker: string;
    kickerSub: string;
    headline: string;
    description: string;
    exploreBtn: string;
    contactBtn: string;
    highlight1Title: string;
    highlight1Sub: string;
    highlight2Title: string;
    highlight2Sub: string;
    highlight3Title: string;
    highlight3Sub: string;
    cardTag: string;
    founderLabel: string;
  };
  services: {
    kicker: string;
    heading: string;
    subheading: string;
    knowMore: string;
    getService: string;
    includedFeatures: string;
    items: {
      id: string;
      title: string;
      shortDescription: string;
      fullDescription: string;
      features: string[];
      deliverables: string[];
      idealFor: string;
      whatsappMessage: string;
      badge: string;
    }[];
  };
  portfolio: {
    kicker: string;
    heading: string;
    subheading: string;
    filterAll: string;
    filterWeb: string;
    filterDesign: string;
    viewDetails: string;
    demoTag: string;
    conceptTag: string;
    transparencyNote: string;
    items: {
      id: string;
      title: string;
      category: string;
      description: string;
      longDescription: string;
      features: string[];
      status: string;
      tags: string[];
    }[];
  };
  offers: {
    kicker: string;
    heading: string;
    subheading: string;
    neutralTitle: string;
    neutralText: string;
    neutralBtn: string;
    claimBtn: string;
    validUntil: string;
  };
  reviews: {
    kicker: string;
    heading: string;
    subheading: string;
    approvedTitle: string;
    ownerDeskBtn: string;
    emptyText: string;
    emptySubtext: string;
    formKicker: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    ratingLabel: string;
    ratingCount: string;
    reviewLabel: string;
    reviewPlaceholder: string;
    minLength: string;
    submitBtn: string;
    submittingBtn: string;
    securityNote: string;
    successMessage: string;
    submitAnother: string;
  };
  founder: {
    kicker: string;
    heading: string;
    subheading: string;
    personalMessage: string;
    designation: string;
    introduction: string;
    bioParagraph1: string;
    bioParagraph2: string;
    connectTitle: string;
    chatWhatsApp: string;
    emailDirectly: string;
    authenticityNote: string;
  };
  contact: {
    kicker: string;
    heading: string;
    subheading: string;
    directTitle: string;
    directSub: string;
    waTitle: string;
    waSub: string;
    waBtn: string;
    igTitle: string;
    igSub: string;
    igBtn: string;
    emailTitle: string;
    emailSub: string;
    emailBtn: string;
    formTitle: string;
    formSub: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    businessNameLabel: string;
    businessNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    privacyNote: string;
    servicesList: {
      web: string;
      meta: string;
      graphic: string;
      gbp: string;
      other: string;
    };
  };
  faq: {
    kicker: string;
    heading: string;
    subheading: string;
    filterAll: string;
    filterWeb: string;
    filterMarketing: string;
    filterGeneral: string;
    stillHaveQuestions: string;
    stillHaveQuestionsSub: string;
    chatWhatsAppBtn: string;
    items: {
      id: string;
      category: "web" | "marketing" | "general";
      categoryLabel: string;
      question: string;
      answer: string;
    }[];
  };
  footer: {
    description: string;
    founderLabel: string;
    navHeading: string;
    servicesHeading: string;
    directHeading: string;
    privacyLink: string;
    guideLink: string;
    backToTop: string;
    allRightsReserved: string;
  };
  modals: {
    serviceOverview: string;
    idealFor: string;
    coreCapabilities: string;
    keyDeliverables: string;
    directConsultNote: string;
    getServiceWhatsApp: string;
    close: string;
    projectDemoUrl: string;
    honestDemoNotice: string;
    honestDemoBody: string;
    launchLive: string;
    urlNotConfigured: string;
    externalWarningTitle: string;
    proceedLive: string;
    cancel: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      offers: "Current Offers",
      reviews: "Reviews",
      about: "About Us",
      faq: "FAQ",
      contact: "Contact Us",
      ownerGuide: "Owner Guide",
      chatWhatsApp: "Chat on WhatsApp"
    },
    hero: {
      kicker: "Digital Services Brand",
      kickerSub: "Website & Marketing",
      headline: "Grow Your Business with Powerful Digital Solutions",
      description:
        "Build a stronger online presence with professional website development, Meta Ads, graphic design, and Google Business Profile services from DigWeb Expert.",
      exploreBtn: "Explore Our Services",
      contactBtn: "Contact Us",
      highlight1Title: "Responsive Code",
      highlight1Sub: "Mobile, tablet & desktop ready",
      highlight2Title: "Direct Communication",
      highlight2Sub: "WhatsApp & email availability",
      highlight3Title: "Transparent Scope",
      highlight3Sub: "No exaggerated vanity metrics",
      cardTag: "Dedicated digital solutions tailored to modern businesses.",
      founderLabel: "Founder:"
    },
    services: {
      kicker: "Core Offerings",
      heading: "Our Services",
      subheading: "Digital solutions designed to help your business build a stronger online presence.",
      knowMore: "Know More",
      getService: "Get This Service",
      includedFeatures: "Included Features",
      items: [
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
      ]
    },
    portfolio: {
      kicker: "Portfolio Concepts",
      heading: "Our Work",
      subheading: "Explore selected website concepts, design samples, and digital project demonstrations.",
      filterAll: "All",
      filterWeb: "Website Development",
      filterDesign: "Graphic Design",
      viewDetails: "View Project Details",
      demoTag: "Demo Project",
      conceptTag: "Concept Project",
      transparencyNote:
        "Note: All showcase items are demonstration prototypes and concept designs created to illustrate layout quality and technology capabilities.",
      items: [
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
          status: "Demo Project",
          tags: ["Lead Generation", "Single Page", "Fast Loading"]
        }
      ]
    },
    offers: {
      kicker: "Promotions & Packages",
      heading: "Current Offers",
      subheading: "Explore available service offers from DigWeb Expert.",
      neutralTitle: "Special offers will be announced here.",
      neutralText: "Contact us to discuss your requirements and discover customized packages for your business.",
      neutralBtn: "Contact Us for Custom Packages",
      claimBtn: "Claim This Offer on WhatsApp",
      validUntil: "Valid until"
    },
    reviews: {
      kicker: "Client Feedback & Verification",
      heading: "What Our Clients Say",
      subheading: "Genuine experiences from clients who have collaborated with DigWeb Expert.",
      approvedTitle: "Approved Client Reviews",
      ownerDeskBtn: "Owner Moderation Desk",
      emptyText: "Customer reviews will appear here after they have been submitted and approved.",
      emptySubtext: "We uphold strict standards of business authenticity: no fake testimonials or fabricated reviews are displayed on DigWeb Expert.",
      formKicker: "Share Your Experience",
      formTitle: "Submit Your Review",
      formSubtitle: "Reviews are reviewed by DigWeb Expert before being published.",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Rajesh Kumar",
      ratingLabel: "Star Rating",
      ratingCount: "of 5 Stars",
      reviewLabel: "Write Your Review",
      reviewPlaceholder: "Describe your project with DigWeb Expert, communication, and work quality...",
      minLength: "Minimum 10 characters",
      submitBtn: "Submit Review for Verification",
      submittingBtn: "Validating & Submitting...",
      securityNote: "Reviews require manual approval by the founder to protect our community from spam and fraudulent submissions.",
      successMessage: "Thank you! Your review has been submitted and is currently pending owner verification before being published.",
      submitAnother: "Submit another review"
    },
    founder: {
      kicker: "Leadership & Vision",
      heading: "Meet Our Founder",
      subheading: "The dedicated technologist and digital solutions specialist behind DigWeb Expert.",
      personalMessage: "Personal Message",
      designation: "Founder — DigWeb Expert",
      introduction:
        "Hello! I'm Harshadsinh Solanki, founder of DigWeb Expert. I help businesses build their online presence through website development, Meta Ads, graphic design, and Google Business Profile services.",
      bioParagraph1:
        "DigWeb Expert was established to deliver dedicated, transparent, and high-quality digital solutions tailored to modern businesses. Whether you are launching your first business website, refreshing your existing digital brand, or setting up targeted advertising campaigns, our goal is to give your brand a trustworthy online foundation.",
      bioParagraph2:
        "We focus on clean, responsive development, purposeful graphic design, and strategic local search setup without misleading promises or exaggerated vanity metrics.",
      connectTitle: "Connect Directly with Mr. Solanki",
      chatWhatsApp: "Chat on WhatsApp",
      emailDirectly: "Email Directly",
      authenticityNote: "Official profile representing Mr. Harshadsinh Solanki, founder of DigWeb Expert."
    },
    contact: {
      kicker: "Get In Touch",
      heading: "Let's Grow Your Business Together",
      subheading: "Tell us about your business and the digital services you need. We will help you explore a suitable solution.",
      directTitle: "Direct Communication",
      directSub: "Reach out directly via your preferred channel for prompt, transparent consultation.",
      waTitle: "WhatsApp Business",
      waSub: "Quickest way to discuss quotes, turnaround time, and service deliverables.",
      waBtn: "Chat on WhatsApp",
      igTitle: "Instagram Profile",
      igSub: "Explore latest design creatives, stories, and service updates.",
      igBtn: "Follow Us on Instagram",
      emailTitle: "Business Email",
      emailSub: "Send formal project briefs, requirement documents, and inquiries.",
      emailBtn: "Email Us",
      formTitle: "Send a Project Enquiry",
      formSub: "Fill in your details below and we will get back to you with a personalized consultation.",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "e.g. Amit Patel",
      businessNameLabel: "Business Name",
      businessNamePlaceholder: "e.g. Patel Enterprises",
      phoneLabel: "WhatsApp / Phone Number",
      phonePlaceholder: "+91 98765 43210",
      serviceLabel: "Interested Service",
      messageLabel: "Message / Project Details",
      messagePlaceholder: "Briefly tell us about your goals, current presence, or any specific requirements...",
      submitBtn: "Submit Enquiry",
      submittingBtn: "Sending Enquiry...",
      successTitle: "Submission Confirmed",
      successMessage: "Thank you for contacting DigWeb Expert. Your enquiry has been submitted successfully.",
      sendAnother: "Send another inquiry",
      privacyNote: "Enquiries are handled securely. In this preview build, submissions are logged and testable. See the Owner Guide for production email/Firebase integration.",
      servicesList: {
        web: "Website Development",
        meta: "Meta Ads",
        graphic: "Graphic Design",
        gbp: "Google Business Profile Setup",
        other: "Other"
      }
    },
    faq: {
      kicker: "Got Questions?",
      heading: "Frequently Asked Questions",
      subheading: "Transparent answers to common queries regarding website development, Meta advertising, graphic design, and Google Business Profile services.",
      filterAll: "All Questions",
      filterWeb: "Website Development",
      filterMarketing: "Digital Marketing & Ads",
      filterGeneral: "Process & Communication",
      stillHaveQuestions: "Still have specific questions about your project?",
      stillHaveQuestionsSub: "Speak directly with our founder Mr. Harshadsinh Solanki on WhatsApp for immediate clarity.",
      chatWhatsAppBtn: "Chat Directly on WhatsApp",
      items: [
        {
          id: "web-time",
          category: "web",
          categoryLabel: "Website Development",
          question: "How much time does it take to develop a professional business website?",
          answer: "Most standard business websites and landing pages are completed within 5 to 10 business days once the project scope and content requirements are finalized. For e-commerce catalogs or websites requiring extensive custom features, we provide a structured timeline with estimated milestone dates upfront."
        },
        {
          id: "web-responsive",
          category: "web",
          categoryLabel: "Website Development",
          question: "Will my website be mobile-friendly, secure, and fast?",
          answer: "Yes. Every website engineered by DigWeb Expert is fully responsive and mobile-first. We test extensively across iOS and Android devices, tablets, and desktop computers to guarantee fast loading speeds, readable typography, and effortless touch navigation."
        },
        {
          id: "meta-guarantee",
          category: "marketing",
          categoryLabel: "Meta Ads",
          question: "Do you guarantee specific sales or leads from Meta Ads?",
          answer: "We believe in complete business honesty: no ethical digital agency can guarantee exact sales or overnight fortunes because conversions depend on product quality, pricing, and consumer demand. What DigWeb Expert does guarantee is technically sound campaign architecture: targeted audience configuration, compelling ad creatives, conversion pixel setup, and transparent budget management."
        },
        {
          id: "gbp-rankings",
          category: "marketing",
          categoryLabel: "Google Business Profile",
          question: "Can you guarantee the #1 ranking on Google Maps or Search?",
          answer: "No. Google's search algorithms use hundreds of proprietary factors including the searcher's physical proximity, relevance, and natural customer reviews. What we deliver is rigorous Google Business Profile optimization: verified business category selection, accurate operating hours, geocoded photos, localized service descriptions, and correct pin placement to give your business the best possible opportunity to be discovered locally."
        },
        {
          id: "graphic-formats",
          category: "marketing",
          categoryLabel: "Graphic Design",
          question: "What formats and dimensions do you provide for Graphic Design creatives?",
          answer: "We provide high-resolution, web-optimized PNG and JPEG formats tailored specifically for Instagram feed posts (1:1), Instagram stories and reels covers (9:16), Facebook promotional posts, and WhatsApp marketing announcements. Custom dimensions and vector formats can also be provided upon request."
        },
        {
          id: "updates-changes",
          category: "general",
          categoryLabel: "Website Maintenance",
          question: "Can I easily update my phone number, services, or offers in the future?",
          answer: "Yes. Our websites are architected with a centralized business configuration file. Updating your WhatsApp number, email, services, portfolio demonstrations, or current promotional offers takes only a moment and automatically updates across all website sections simultaneously."
        },
        {
          id: "start-process",
          category: "general",
          categoryLabel: "Getting Started",
          question: "How do we get started with DigWeb Expert?",
          answer: "Getting started is straightforward: reach out to us directly on WhatsApp (+91 9875274952), send an email to mydigwebbussiness.18@gmail.com, or fill out the enquiry form on this website. Our founder, Mr. Harshadsinh Solanki, will consult directly with you to understand your requirements and suggest an appropriate, transparent plan."
        }
      ]
    },
    footer: {
      description: "DigWeb Expert provides website development, Meta Ads, graphic design, and Google Business Profile services to help businesses strengthen their online presence.",
      founderLabel: "Founder:",
      navHeading: "Navigation",
      servicesHeading: "Services",
      directHeading: "Direct Contact",
      privacyLink: "Privacy Policy",
      guideLink: "Owner Configuration Guide",
      backToTop: "Back to Top",
      allRightsReserved: "All rights reserved."
    },
    modals: {
      serviceOverview: "Service Overview",
      idealFor: "Ideal For",
      coreCapabilities: "Core Capabilities Included",
      keyDeliverables: "Key Deliverables & Roadmap",
      directConsultNote: "Direct consultation via WhatsApp with no automatic messaging.",
      getServiceWhatsApp: "Get This Service on WhatsApp",
      close: "Close",
      projectDemoUrl: "demo.digwebexpert.com",
      honestDemoNotice: "Honest Demonstration Notice:",
      honestDemoBody: "This project is built as a demonstration concept showcasing layout design, responsiveness, and technical structure. It is not an active client contract or commercial endorsement.",
      launchLive: "Launch Live Concept",
      urlNotConfigured: "Live URL not configured yet. (Add link in src/config/businessConfig.ts)",
      externalWarningTitle: "You are about to leave the DigWeb Expert website to view an external live demonstration at:",
      proceedLive: "Proceed to Live Site",
      cancel: "Cancel"
    }
  },

  gu: {
    nav: {
      home: "હોમ",
      services: "સેવાઓ",
      portfolio: "અમારું કાર્ય",
      offers: "વિશેષ ઓફર્સ",
      reviews: "સમીક્ષાઓ",
      about: "અમારા વિશે",
      faq: "પ્રશ્નોત્તરી (FAQ)",
      contact: "સંપર્ક કરો",
      ownerGuide: "ઓનર ગાઇડ",
      chatWhatsApp: "WhatsApp પર વાત કરો"
    },
    hero: {
      kicker: "ડિજિટલ સર્વિસ બ્રાન્ડ",
      kickerSub: "વેબસાઇટ અને માર્કેટિંગ",
      headline: "શક્તિશાળી ડિજિટલ સોલ્યુશન્સ સાથે તમારા વ્યવસાયનો વિકાસ કરો",
      description:
        "DigWeb Expert ની પ્રોફેશનલ વેબસાઇટ ડેવલપમેન્ટ, Meta Ads, ગ્રાફિક ડિઝાઇન અને Google Business Profile સેવાઓ સાથે તમારી મજબૂત ઓનલાઇન ઓળખ બનાવો.",
      exploreBtn: "અમારી સેવાઓ જુઓ",
      contactBtn: "અમારો સંપર્ક કરો",
      highlight1Title: "રિસ્પોન્સિવ કોડ",
      highlight1Sub: "મોબાઇલ, ટેબ્લેટ અને ડેસ્કટોપ તૈયાર",
      highlight2Title: "સીધો સંવાદ",
      highlight2Sub: "WhatsApp અને ઇમેઇલ ઉપલબ્ધતા",
      highlight3Title: "પારદર્શક કાર્યક્ષેત્ર",
      highlight3Sub: "કોઈ અવાસ્તવિક કે ખોટા દાવા નહીં",
      cardTag: "આધુનિક વ્યવસાયો માટે સમર્પિત વિશ્વસનીય ડિજિટલ સોલ્યુશન્સ.",
      founderLabel: "સ્થાપક:"
    },
    services: {
      kicker: "મુખ્ય સેવાઓ",
      heading: "અમારી સેવાઓ",
      subheading: "તમારા વ્યવસાયને મજબૂત ઓનલાઇન હાજરી બનાવવામાં મદદ કરવા માટે તૈયાર કરાયેલ ડિજિટલ સોલ્યુશન્સ.",
      knowMore: "વધુ જાણો",
      getService: "આ સેવા મેળવો",
      includedFeatures: "સમાવિષ્ટ સુવિધાઓ",
      items: [
        {
          id: "website-development",
          title: "વેબસાઇટ ડેવલપમેન્ટ",
          shortDescription:
            "તમારા વ્યવસાયને ઓનલાઇન રજૂ કરવા અને સંભવિત ગ્રાહકો સુધી પહોંચવા માટે આધુનિક, રિસ્પોન્સિવ વેબસાઇટ્સ.",
          fullDescription:
            "દરેક આધુનિક વ્યવસાય માટે ઝડપી, મોબાઇલ-ફ્રેન્ડલી અને ભરોસાપાત્ર વેબસાઇટ હોવી અનિવાર્ય છે. અમે લેન્ડિંગ પેજ, કોર્પોરેટ બિઝનેસ વેબસાઇટ તેમજ ઇ-કોમર્સ કેટાલોગ વેબસાઇટ્સ બનાવીએ છીએ. દરેક વેબસાઇટ મોબાઇલ, ટેબ્લેટ અને કોમ્પ્યુટર પર સરળતાથી ચાલે તે રીતે શુદ્ધ કોડ સાથે તૈયાર કરવામાં આવે છે.",
          features: [
            "પ્રોફેશનલ બિઝનેસ વેબસાઇટ્સ",
            "હાઇ-કન્વર્ઝન લેન્ડિંગ પેજ",
            "આધુનિક રિસ્પોન્સિવ વેબસાઇટ ડિઝાઇન",
            "વેબસાઇટ રી-ડિઝાઇન સેવાઓ",
            "ઇ-કોમર્સ ઓનલાઇન કેટાલોગ"
          ],
          deliverables: [
            "મોબાઇલ-ફર્સ્ટ સુસંગત ડિઝાઇન",
            "ઝડપી લોડિંગ સ્પીડ અને ક્લીન કોડિંગ",
            "WhatsApp ક્લિક-ટુ-ચેટ ઇન્ટિગ્રેશન",
            "ગ્રાહક પૂછપરછ કોન્ટેક્ટ ફોર્મ",
            "પ્રાથમિક ઓન-પેજ SEO અને મેટા ટેગ્સ"
          ],
          idealFor: "પોતાની સેવાઓ ઓનલાઇન દર્શાવવા અને નવા ગ્રાહકો મેળવવા ઇચ્છતા વ્યવસાયો માટે.",
          whatsappMessage: "Hello DigWeb Expert, I am interested in Website Development. Please share more details.",
          badge: "મુખ્ય સેવા"
        },
        {
          id: "meta-ads",
          title: "મેટા એડ્સ (Meta Ads)",
          shortDescription:
            "ફેસબુક અને ઇન્સ્ટાગ્રામ દ્વારા યોગ્ય લક્ષિત ગ્રાહકો સુધી પહોંચવા માંગતા વ્યવસાયો માટે વિજ્ઞાપન ઝુંબેશ સેટઅપ.",
          fullDescription:
            "Facebook અને Instagram પર સક્રિય ગ્રાહકો સુધી યોગ્ય રીતે કન્ફિગર કરેલી Meta Ads વડે પહોંચો. અમે ટેકનિકલ કેમ્પેઈન સેટઅપ, ઓડિયન્સ ટાર્ગેટિંગ, એડ ક્રિએટિવ પ્લેસમેન્ટ અને ટ્રેકિંગ સંભાળીએ છીએ. અમે રાતોરાત વેચાણના ખોટા વચનો આપતા નથી, પરંતુ વાસ્તવિક બજેટ મુજબ પરિણામલક્ષી કેમ્પેઈન ચલાવીએ છીએ.",
          features: [
            "Facebook વિજ્ઞાપન સેટઅપ",
            "Instagram વિજ્ઞાપન સેટઅપ",
            "કેમ્પેઈન સ્ટ્રેટેજી કન્ફિગરેશન",
            "એડ ક્રિએટિવ ઇન્ટિગ્રેશન"
          ],
          deliverables: [
            "Meta Business Manager અને Ad Account સેટઅપ",
            "પિક્સેલ અને કન્વર્ઝન ઇવેન્ટ્સ માર્ગદર્શન",
            "ભૌગોલિક અને રસ આધારિત ઓડિયન્સ ટાર્ગેટિંગ",
            "આકર્ષક એડ ફોર્મેટિંગ અને હેડલાઇન જોડાણ",
            "કેમ્પેઈન લોન્ચિંગ પૂર્વે ચોકસાઈ પરીક્ષણ"
          ],
          idealFor: "સોશિયલ મીડિયા દ્વારા પોતાના ઉત્પાદનો કે સેવાઓ પ્રમોટ કરવા માંગતા વ્યવસાયો માટે.",
          whatsappMessage: "Hello DigWeb Expert, I am interested in Meta Ads services. Please share more details.",
          badge: "ટાર્ગેટેડ રીચ"
        },
        {
          id: "graphic-design",
          title: "ગ્રાફિક ડિઝાઇન",
          shortDescription:
            "વ્યવસાયની સેવાઓ, ઓફર્સ અને બ્રાન્ડ ઓળખને આકર્ષક રીતે રજૂ કરવા માટે વ્યાવસાયિક વિઝ્યુઅલ કન્ટેન્ટ.",
          fullDescription:
            "આકર્ષક અને સ્પષ્ટ વિઝ્યુઅલ્સ તમારી બ્રાન્ડની વિશ્વસનીયતા વધારે છે. અમે Instagram પોસ્ટ્સ, Facebook બેનર્સ, પ્રમોશનલ ફ્લાયર્સ અને ડિજિટલ માર્કેટિંગ માટે શ્રેષ્ઠ ડિઝાઇન તૈયાર કરીએ છીએ. દરેક ડિઝાઇનમાં કલર હાર્મની અને વાંચી શકાય તેવી ટાઇપોગ્રાફીનું ખાસ ધ્યાન રાખવામાં આવે છે.",
          features: [
            "સોશિયલ મીડિયા પોસ્ટ ડિઝાઇન",
            "પ્રમોશનલ સેલ્સ ક્રિએટિવ્સ",
            "બિઝનેસ માર્કેટિંગ બેનર્સ",
            "ડિજિટલ બ્રાન્ડિંગ વિઝ્યુઅલ્સ"
          ],
          deliverables: [
            "હાઇ-રિઝોલ્યુશન સોશિયલ મીડિયા ક્રિએટિવ્સ",
            "પ્રમોશનલ ફ્લાયર અને બેનર ડિઝાઇન્સ",
            "યોગ્ય કલર પેલેટ અને ટાઇપોગ્રાફી માળખું",
            "WhatsApp અને સોશિયલ મીડિયા માટે શેર કરવા યોગ્ય ફોર્મેટ્સ"
          ],
          idealFor: "નિયમિત સોશિયલ મીડિયા પોસ્ટ્સ અને પ્રમોશનલ વિઝ્યુઅલ્સની જરૂરિયાત ધરાવતી બ્રાન્ડ્સ માટે.",
          whatsappMessage: "Hello DigWeb Expert, I am interested in Graphic Design services. Please share more details.",
          badge: "ક્રિએટિવ બ્રાન્ડિંગ"
        },
        {
          id: "google-business-profile",
          title: "Google Business Profile સેટઅપ",
          shortDescription:
            "Google Search અને Maps પર વ્યવસાયની માહિતીની ચોકસાઈ અને વિઝિબિલિટી સુધારવા માટે પ્રોફાઇલ સેટઅપ અને ઑપ્ટિમાઇઝેશન સહાય.",
          fullDescription:
            "જ્યારે સ્થાનિક ગ્રાહકો તમારી સેવાઓ અથવા સરનામું શોધે છે, ત્યારે Google Business Profile એ તેમનો પ્રથમ સંપર્ક હોય છે. અમે વ્યવસાયના સાચા સમય, યોગ્ય કેટેગરી, સંપર્ક વિગતો અને આકર્ષક ફોટા સાથે Google Profile સેટઅપ કરવામાં સહાય કરીએ છીએ.",
          features: [
            "Google Business Profile સેટઅપ",
            "વ્યવસાયિક માહિતી ઑપ્ટિમાઇઝેશન",
            "યોગ્ય વ્યવસાય કેટેગરીઝ પસંદગી",
            "Google Maps અને Search વિઝિબિલિટી સહાય"
          ],
          deliverables: [
            "પ્રોફાઇલ સેટઅપ અને વેરિફિકેશન માર્ગદર્શન",
            "યોગ્ય કેટેગરી અને મુખ્ય સેવાઓની યાદી",
            "ચોક્કસ કામના કલાકો અને સેવા ક્ષેત્રની નોંધણી",
            "કીવર્ડ્સ સાથે વ્યવસાયિક વર્ણન લેખન",
            "Google Maps લોકેશન પિન સમીક્ષા"
          ],
          idealFor: "Google Maps અને Search પર યોગ્ય હાજરી ઇચ્છતા સ્થાનિક દુકાનદારો અને સેવા પ્રદાતાઓ માટે.",
          whatsappMessage: "Hello DigWeb Expert, I am interested in Google Business Profile Setup. Please share more details.",
          badge: "લોકલ વિઝિબિલિટી"
        }
      ]
    },
    portfolio: {
      kicker: "પોર્ટફોલિયો કન્સેપ્ટ્સ",
      heading: "અમારું કાર્ય",
      subheading: "પસંદગીના વેબસાઇટ કન્સેપ્ટ્સ, ડિઝાઇન સેમ્પલ્સ અને ડિજિટલ પ્રોજેક્ટ ડેમો જુઓ.",
      filterAll: "બધા",
      filterWeb: "વેબસાઇટ ડેવલપમેન્ટ",
      filterDesign: "ગ્રાફિક ડિઝાઇન",
      viewDetails: "પ્રોજેક્ટ વિગતો જુઓ",
      demoTag: "ડેમો પ્રોજેક્ટ",
      conceptTag: "કન્સેપ્ટ પ્રોજેક્ટ",
      transparencyNote:
        "નોંધ: બધા શોકેસ પ્રોજેક્ટ્સ લેઆઉટ ગુણવત્તા અને તકનીકી ક્ષમતા દર્શાવવા માટે બનાવેલ ડેમો પ્રોટોટાઇપ અને કન્સેપ્ટ ડિઝાઇન છે.",
      items: [
        {
          id: "hotel-demo",
          title: "Hotel Website Demo",
          category: "Website Development",
          description: "હોટેલ અને હોસ્પિટાલિટી ક્ષેત્ર માટે રૂમ શોકેસ, સુવિધાઓ અને ડાયરેક્ટ બુકિંગ પૂછપરછ સાથેનો આધુનિક કન્સેપ્ટ.",
          longDescription: "આ ડેમો લક્ઝરી હોટેલ વેબસાઇટ આર્કિટેક્ચર દર્શાવે છે. તેમાં આકર્ષક વિઝ્યુઅલ્સ, રૂમ સિલેક્શન, ભોજન સુવિધાઓ અને ઝડપી રૂમ ઇન્ક્વાયરી ફ્લોનો સમાવેશ થાય છે.",
          features: [
            "મોબાઇલ-ઓપ્ટિમાઇઝ્ડ રૂમ કાર્ડ્સ",
            "ડાયરેક્ટ બુકિંગ ઇન્ક્વાયરી ઇન્ટિગ્રેશન",
            "સુવિધાઓ અને ડાઇનિંગ હાઇલાઇટ્સ",
            "ઇન્ટરેક્ટિવ ફોટો ગેલેરી લેઆઉટ"
          ],
          status: "Demo Project",
          tags: ["હોસ્પિટાલિટી", "રિસ્પોન્સિવ ડિઝાઇન", "બુકિંગ ફ્લો"]
        },
        {
          id: "restaurant-demo",
          title: "Restaurant Website Demo",
          category: "Website Development",
          description: "રેસ્ટોરન્ટ અને કાફે માટે ડિજિટલ ફૂડ મેનુ, શેફ સ્પેશિયલ વાનગીઓ અને ટેબલ રિઝર્વેશન પૂછપરછ સાથેની સાઇટ.",
          longDescription: "રેસ્ટોરન્ટ્સ માટે વર્ગીકૃત મેનૂ, કામના કલાકો, લોકેશન મેપ અને WhatsApp દ્વારા ટેબલ બુકિંગ પૂછપરછ દર્શાવતો આધુનિક ડેમો.",
          features: [
            "વર્ગીકૃત ડિજિટલ ફૂડ મેનૂ",
            "ટેબલ રિઝર્વેશન ઇન્ક્વાયરી ફોર્મ",
            "સમય અને લોકેશન મેપ પ્રિવ્યૂ",
            "સ્પેશિયલ વાનગીઓની હાઇલાઇટ્સ"
          ],
          status: "Demo Project",
          tags: ["રેસ્ટોરન્ટ", "ડિજિટલ મેનૂ", "ટેબલ બુકિંગ"]
        },
        {
          id: "furniture-demo",
          title: "Furniture Business Website Demo",
          category: "Website Development",
          description: "ફર્નિચર શોરૂમ માટે મટીરીયલ વિગતો અને પ્રોડક્ટ ઇન્ક્વાયરી સાથેનું મિનિમલિસ્ટ સ્કેન્ડિનેવિયન કેટાલોગ લેઆઉટ.",
          longDescription: "હોમ અને ઓફિસ ફર્નિચર ઉત્પાદકો માટે રૂમ અનુસાર કલેક્શન, માપ, લાકડાની ગુણવત્તા અને WhatsApp દ્વારા ઉપલબ્ધતા જાણવાની સુવિધા.",
          features: [
            "રૂમ અનુસાર પ્રોડક્ટ બ્રાઉઝિંગ",
            "સંપૂર્ણ સ્પેક્સ અને મટીરીયલ વિગતો",
            "હાઇ-કોન્ટ્રાસ્ટ મિનિમલિસ્ટ ડિઝાઇન",
            "ડાયરેક્ટ ક્વોટેશન ઇન્ક્વાયરી બટન"
          ],
          status: "Demo Project",
          tags: ["ઇ-કોમર્સ કન્સેપ્ટ", "કેટાલોગ", "મિનિમલિસ્ટ"]
        },
        {
          id: "real-estate-demo",
          title: "Real Estate Website Demo",
          category: "Website Development",
          description: "પ્રીમિયર રિયલ એસ્ટેટ પ્રોજેક્ટ્સ, ફ્લોર પ્લાન, વિસ્તારની માહિતી અને સાઇટ મુલાકાત બુકિંગ સાથેનો પોર્ટલ ડેમો.",
          longDescription: "પ્રોપર્ટી ડેવલપર્સ અને બ્રોકર્સ માટે ફ્લેટ, વિલા, સ્ક્વેર ફીટ અને લોકેશન હાઇલાઇટ્સ સાથે બ્રોશર ડાઉનલોડ કરવાનો આધુનિક કન્સેપ્ટ.",
          features: [
            "મુખ્ય વિગતો સાથે પ્રોપર્ટી લિસ્ટિંગ",
            "ફ્લોર પ્લાન અને સુવિધાઓનું લેઆઉટ",
            "મુલાકાત શેડ્યૂલ કરવાનું ફોર્મ",
            "આસપાસના વિસ્તાર અને મેપ માહિતી"
          ],
          status: "Demo Project",
          tags: ["રિયલ એસ્ટેટ", "પ્રોપર્ટી કાર્ડ્સ", "લીડ કેપ્ચર"]
        },
        {
          id: "graphic-design-samples",
          title: "Graphic Design Samples",
          category: "Graphic Design",
          description: "સોશિયલ મીડિયા પોસ્ટ્સ, સેલ્સ બેનર્સ અને બ્રાન્ડિંગ ક્રિએટિવ્સનો ક્યુરેટેડ કન્સેપ્ટ સંગ્રહ.",
          longDescription: "ઇન્સ્ટાગ્રામ, ફેસબુક પોસ્ટ્સ, તહેવારની શુભેચ્છાઓ અને પ્રમોશનલ એનાઉન્સમેન્ટ માટે વાણિજ્યિક ગ્રાફિક ડિઝાઇન સેમ્પલ્સ.",
          features: [
            "Instagram ફીડ અને સ્ટોરી સાઇઝ ક્રિએટિવ્સ",
            "પ્રમોશનલ સેલ એનાઉન્સમેન્ટ ડિઝાઇન",
            "બ્રાન્ડ કલર સ્કીમ સંકલન",
            "સુવાચ્ય કોમર્શિયલ ટાઇપોગ્રાફી"
          ],
          status: "Concept Project",
          tags: ["સોશિયલ મીડિયા", "ક્રિએટિવ્સ", "ટાઇપોગ્રાફી"]
        },
        {
          id: "landing-page-demo",
          title: "Landing Page Demo",
          category: "Website Development",
          description: "સ્પષ્ટ માહિતી, ફાયદાઓની રજૂઆત અને લીડ કેપ્ચર ફોર્મ સાથેનું હાઇ-કન્વર્ઝન સિંગલ પેજ માળખું.",
          longDescription: "કોઈપણ એક ચોક્કસ સેવા માટે ઝડપી, મોબાઇલ-ફ્રેન્ડલી અને પરિણામલક્ષી સિંગલ પેજ લેન્ડિંગ પેજનો ડેમો.",
          features: [
            "સ્પષ્ટ મુખ્ય મેસેજ અને ઓફર",
            "સેવાના મુખ્ય ફાયદાઓની યાદી",
            "વેલિડેટેડ કોન્ટેક્ટ ફોર્મ",
            "અત્યંત ઝડપી સિંગલ-પેજ નેવિગેશન"
          ],
          status: "Demo Project",
          tags: ["લીડ જનરેશન", "સિંગલ પેજ", "ઝડપી લોડિંગ"]
        }
      ]
    },
    offers: {
      kicker: "ઓફર્સ અને પેકેજીસ",
      heading: "વિશેષ ઓફર્સ",
      subheading: "DigWeb Expert ની ઉપલબ્ધ સર્વિસ ઓફર્સ તપાસો.",
      neutralTitle: "વિશેષ ઓફર્સ અહીં જાહેર કરવામાં આવશે.",
      neutralText: "તમારી જરૂરિયાતો અંગે ચર્ચા કરવા અને તમારા વ્યવસાય માટે અનુકૂળ પેકેજ જાણવા અમારો સંપર્ક કરો.",
      neutralBtn: "કસ્ટમ પેકેજ માટે સંપર્ક કરો",
      claimBtn: "WhatsApp પર ઓફર મેળવો",
      validUntil: "માન્યતા તારીખ"
    },
    reviews: {
      kicker: "ગ્રાહક પ્રતિભાવ અને ચકાસણી",
      heading: "અમારા ગ્રાહકો શું કહે છે",
      subheading: "DigWeb Expert સાથે કામ કરનારા ગ્રાહકોના સાચા અનુભવો.",
      approvedTitle: "મંજૂર થયેલ ગ્રાહક સમીક્ષાઓ",
      ownerDeskBtn: "ઓનર મોડરેશન ડેસ્ક",
      emptyText: "ગ્રાહક સમીક્ષાઓ સબમિટ અને મંજૂર થયા પછી અહીં દેખાશે.",
      emptySubtext: "અમે વ્યાવસાયિક પ્રામાણિકતા જાળવીએ છીએ: DigWeb Expert પર કોઈ નકલી કે બનાવટી સમીક્ષાઓ મૂકવામાં આવતી નથી.",
      formKicker: "તમારો અનુભવ જણાવો",
      formTitle: "તમારી સમીક્ષા સબમિટ કરો",
      formSubtitle: "સમીક્ષાઓ પ્રકાશિત કરતા પહેલા DigWeb Expert દ્વારા ચકાસવામાં આવે છે.",
      nameLabel: "પૂરું નામ",
      namePlaceholder: "દા.ત. રમેશભાઈ પટેલ",
      ratingLabel: "સ્ટાર રેટિંગ",
      ratingCount: "માંથી 5 સ્ટાર્સ",
      reviewLabel: "તમારી સમીક્ષા લખો",
      reviewPlaceholder: "DigWeb Expert સાથેના તમારા પ્રોજેક્ટ, વાતચીત અને કામની ગુણવત્તા વિશે લખો...",
      minLength: "ઓછામાં ઓછા 10 અક્ષરો",
      submitBtn: "ચકાસણી માટે સમીક્ષા સબમિટ કરો",
      submittingBtn: "ચકાસીને સબમિટ થઈ રહ્યું છે...",
      securityNote: "સ્પામ અને અયોગ્ય સબમિશનથી સુરક્ષિત રાખવા માટે દરેક સમીક્ષા સ્થાપક દ્વારા મંજૂર કરવામાં આવે છે.",
      successMessage: "આભાર! તમારી સમીક્ષા સબમિટ થઈ ગઈ છે અને પ્રકાશિત થાય તે પહેલાં વેરિફિકેશન માટે પેન્ડિંગ છે.",
      submitAnother: "બીજી સમીક્ષા સબમિટ કરો"
    },
    founder: {
      kicker: "નેતૃત્વ અને વિઝન",
      heading: "અમારા સ્થાપકને મળો",
      subheading: "DigWeb Expert પાછળના સમર્પિત ટેકનોલોજિસ્ટ અને ડિજિટલ સોલ્યુશન્સ નિષ્ણાત.",
      personalMessage: "અંગત સંદેશ",
      designation: "Founder — DigWeb Expert",
      introduction:
        "નમસ્તે! હું હર્ષદસિંહ સોલંકી, DigWeb Expert નો સ્થાપક છું. હું વેબસાઇટ ડેવલપમેન્ટ, Meta Ads, ગ્રાફિક ડિઝાઇન અને Google Business Profile સેવાઓ દ્વારા વ્યવસાયોને તેમની ઓનલાઇન હાજરી બનાવવામાં મદદ કરું છું.",
      bioParagraph1:
        "DigWeb Expert ની સ્થાપના આધુનિક વ્યવસાયોને પારદર્શક, સમર્પિત અને ઉચ્ચ ગુણવત્તાવાળા ડિજિટલ સોલ્યુશન્સ આપવા માટે કરવામાં આવી છે. તમે તમારી પ્રથમ બિઝનેસ વેબસાઇટ શરૂ કરી રહ્યા હોવ કે માર્કેટિંગ કેમ્પેઈન, અમારો ઉદ્દેશ્ય તમારી બ્રાન્ડને મજબૂત આધાર આપવાનો છે.",
      bioParagraph2:
        "અમે ખોટા વચનો કે આંકડાઓ વગર શુદ્ધ, રિસ્પોન્સિવ ડેવલપમેન્ટ, હેતુપૂર્ણ ગ્રાફિક ડિઝાઇન અને સ્થાનિક સર્ચ ઑપ્ટિમાઇઝેશન પર ધ્યાન કેન્દ્રિત કરીએ છીએ.",
      connectTitle: "શ્રી સોલંકી સાથે સીધો સંપર્ક કરો",
      chatWhatsApp: "WhatsApp પર વાત કરો",
      emailDirectly: "સીધો ઇમેઇલ કરો",
      authenticityNote: "DigWeb Expert ના સ્થાપક Mr. Harshadsinh Solanki ની અધિકૃત પ્રોફાઇલ."
    },
    contact: {
      kicker: "સંપર્ક કરો",
      heading: "ચાલો તમારા વ્યવસાયને સાથે મળીને આગળ વધારીએ",
      subheading: "તમારા વ્યવસાય અને જરૂરી ડિજિટલ સેવાઓ વિશે જણાવો. અમે યોગ્ય ઉકેલ શોધવામાં મદદ કરીશું.",
      directTitle: "સીધો સંપર્ક",
      directSub: "ઝડપી અને પારદર્શક ચર્ચા માટે તમારા અનુકૂળ માધ્યમ દ્વારા અમારો સંપર્ક કરો.",
      waTitle: "WhatsApp બિઝનેસ",
      waSub: "ક્વોટેશન અને પ્રોજેક્ટ સમયમર્યાદા અંગે ઝડપી ચર્ચા કરવાનો શ્રેષ્ઠ રસ્તો.",
      waBtn: "WhatsApp પર વાત કરો",
      igTitle: "Instagram પ્રોફાઇલ",
      igSub: "નવીનતમ ડિઝાઇન ક્રિએટિવ્સ અને અપડેટ્સ જુઓ.",
      igBtn: "Instagram પર ફોલો કરો",
      emailTitle: "બિઝનેસ ઇમેઇલ",
      emailSub: "વિગતવાર પ્રોજેક્ટ રિક્વાયરમેન્ટ્સ અને પ્રપોઝલ મોકલો.",
      emailBtn: "ઇમેઇલ મોકલો",
      formTitle: "પ્રોજેક્ટ પૂછપરછ મોકલો",
      formSub: "નીચે તમારી વિગતો ભરો અને અમે તમને પર્સનલાઈઝ્ડ કન્સલ્ટેશન સાથે સંપર્ક કરીશું.",
      fullNameLabel: "પૂરું નામ",
      fullNamePlaceholder: "દા.ત. અમિત પટેલ",
      businessNameLabel: "વ્યવસાયનું નામ",
      businessNamePlaceholder: "દા.ત. પટેલ એન્ટરપ્રાઇઝ",
      phoneLabel: "WhatsApp / ફોન નંબર",
      phonePlaceholder: "+91 98765 43210",
      serviceLabel: "જરૂરી સેવા",
      messageLabel: "સંદેશ / પ્રોજેક્ટ વિગતો",
      messagePlaceholder: "તમારા વ્યવસાયના લક્ષ્યો અથવા ચોક્કસ જરૂરિયાતો વિશે ટૂંકમાં જણાવો...",
      submitBtn: "પૂછપરછ સબમિટ કરો",
      submittingBtn: "પૂછપરછ મોકલાઈ રહી છે...",
      successTitle: "પૂછપરછ સબમિટ થઈ ગઈ છે",
      successMessage: "DigWeb Expert નો સંપર્ક કરવા બદલ આભાર. તમારી પૂછપરછ સફળતાપૂર્વક સબમિટ થઈ ગઈ છે.",
      sendAnother: "બીજી પૂછપરછ મોકલો",
      privacyNote: "તમારી વિગતો સુરક્ષિત રાખવામાં આવે છે. આ પ્રિવ્યૂ બિલ્ડમાં એન્ટ્રીઝ લોગ થાય છે. પ્રોડક્શન માટે ઓનર ગાઇડ જુઓ.",
      servicesList: {
        web: "વેબસાઇટ ડેવલપમેન્ટ",
        meta: "મેટા એડ્સ (Meta Ads)",
        graphic: "ગ્રાફિક ડિઝાઇન",
        gbp: "Google Business Profile સેટઅપ",
        other: "અન્ય"
      }
    },
    faq: {
      kicker: "પ્રશ્નો છે?",
      heading: "વારંવાર પૂછાતા પ્રશ્નો (FAQ)",
      subheading: "વેબસાઇટ ડેવલપમેન્ટ, Meta Ads, ગ્રાફિક ડિઝાઇન અને Google Business Profile સેવાઓ સંબંધિત સામાન્ય પ્રશ્નોના પારદર્શક જવાબો.",
      filterAll: "બધા પ્રશ્નો",
      filterWeb: "વેબસાઇટ ડેવલપમેન્ટ",
      filterMarketing: "ડિજિટલ માર્કેટિંગ અને એડ્સ",
      filterGeneral: "પ્રક્રિયા અને સંપર્ક",
      stillHaveQuestions: "શું તમારા પ્રોજેક્ટ વિશે હજુ કોઈ પ્રશ્ન છે?",
      stillHaveQuestionsSub: "ઝડપી સ્પષ્ટતા માટે WhatsApp પર અમારા સ્થાપક Mr. Harshadsinh Solanki સાથે સીધી વાત કરો.",
      chatWhatsAppBtn: "WhatsApp પર સીધી ચર્ચા કરો",
      items: [
        {
          id: "web-time",
          category: "web",
          categoryLabel: "વેબસાઇટ ડેવલપમેન્ટ",
          question: "બિઝનેસ વેબસાઇટ તૈયાર કરવામાં કેટલો સમય લાગે છે?",
          answer: "પ્રોજેક્ટ રિક્વાયરમેન્ટ્સ અને સામગ્રી નક્કી થયા પછી મોટાભાગની સ્ટાન્ડર્ડ બિઝનેસ વેબસાઇટ્સ 5 થી 10 કાર્યકારી દિવસોમાં તૈયાર થઈ જાય છે. ઇ-કોમર્સ કે વિશેષ ફીચર્સ વાળી વેબસાઇટ્સ માટે અમે અગાઉથી સ્પષ્ટ સમયપત્રક આપીએ છીએ."
        },
        {
          id: "web-responsive",
          category: "web",
          categoryLabel: "વેબસાઇટ ડેવલપમેન્ટ",
          question: "શું મારી વેબસાઇટ મોબાઇલ ફોન, ટેબ્લેટ અને ડેસ્કટોપ પર યોગ્ય ચાલશે?",
          answer: "હા. DigWeb Expert દ્વારા બનાવવામાં આવતી દરેક વેબસાઇટ સંપૂર્ણપણે રિસ્પોન્સિવ અને મોબાઇલ-ફર્સ્ટ હોય છે. અમે Android, iPhone, ટેબ્લેટ અને કોમ્પ્યુટર સ્ક્રીન પર ટેસ્ટિંગ કરીને ઝડપી સ્પીડ, સુવાચ્ય અક્ષરો અને સરળ નેવિગેશન સુનિશ્ચિત કરીએ છીએ."
        },
        {
          id: "meta-guarantee",
          category: "marketing",
          categoryLabel: "મેટા એડ્સ (Meta Ads)",
          question: "શું તમે Meta Ads દ્વારા ચોક્કસ વેચાણ કે લીડ્સની ગેરંટી આપો છો?",
          answer: "અમે સંપૂર્ણ વ્યાવસાયિક પ્રામાણિકતામાં માનીએ છીએ: કોઈપણ નૈતિક એજન્સી ચોક્કસ વેચાણ કે રાતોરાત નફાની ગેરંટી આપી શકતી નથી કારણ કે ખરીદી ગ્રાહકની જરૂરિયાત, પ્રોડક્ટની ગુણવત્તા અને કિંમત પર આધાર રાખે છે. DigWeb Expert સચોટ ઓડિયન્સ ટાર્ગેટિંગ, આકર્ષક એડ ડિઝાઇન્સ, પિક્સેલ ટ્રેકિંગ અને પારદર્શક બજેટ મેનેજમેન્ટની ખાતરી આપે છે."
        },
        {
          id: "gbp-rankings",
          category: "marketing",
          categoryLabel: "Google Business Profile",
          question: "શું તમે Google Maps કે Search માં #1 રેન્કિંગની ખાતરી આપી શકો છો?",
          answer: "ના. ગૂગલના અલ્ગોરિધમ્સ શોધનારનું ભૌગોલિક અંતર, પ્રસ્તુતતા અને ગ્રાહક સમીક્ષાઓ સહિત અસંખ્ય પરિબળો ધ્યાને લે છે. અમે વ્યવસાયના સાચા કલાકો, યોગ્ય કેટેગરી, ફોટા, સર્વિસ કીવર્ડ્સ અને સચોટ મેપ પિન સાથે પ્રોફાઇલ ઑપ્ટિમાઇઝ કરીએ છીએ જેથી તમારી સ્થાનિક ઓળખ શ્રેષ્ઠ બને."
        },
        {
          id: "graphic-formats",
          category: "marketing",
          categoryLabel: "ગ્રાફિક ડિઝાઇન",
          question: "ગ્રાફિક ડિઝાઇન માટે તમે કયા ફોર્મેટ્સ અને માપમાં ફાઇલો આપો છો?",
          answer: "અમે Instagram ફીડ (1:1), Instagram સ્ટોરીઝ (9:16), Facebook પ્રમોશનલ બેનર્સ અને WhatsApp પર શેર કરવા માટે હાઇ-રિઝોલ્યુશન PNG અને JPEG ફોર્મેટમાં ફાઇલો આપીએ છીએ. જરૂરિયાત મુજબ વિશેષ માપ પણ આપી શકાય છે."
        },
        {
          id: "updates-changes",
          category: "general",
          categoryLabel: "મેઇન્ટેનન્સ અને અપડેટ્સ",
          question: "શું ભવિષ્યમાં હું મારો ફોન નંબર, સેવાઓ કે ઓફર્સ સરળતાથી બદલી શકું છું?",
          answer: "હા. અમારી વેબસાઇટ્સ સેન્ટ્રલાઇઝ્ડ બિઝનેસ કન્ફિગરેશન સાથે બનાવવામાં આવે છે. તમારો WhatsApp નંબર, ઇમેઇલ, સેવાઓ કે ઓફર્સ બદલવાથી તે આખી વેબસાઇટમાં આપમેળે અપડેટ થઈ જાય છે."
        },
        {
          id: "start-process",
          category: "general",
          categoryLabel: "શરૂઆત કરવી",
          question: "DigWeb Expert સાથે કામ શરૂ કરવાની પ્રક્રિયા શું છે?",
          answer: "શરૂઆત કરવી ખૂબ જ સરળ છે: WhatsApp (+91 9875274952) પર સંપર્ક કરો, mydigwebbussiness.18@gmail.com પર ઇમેઇલ મોકલો અથવા વેબસાઇટ પર ફોર્મ ભરો. સ્થાપક Mr. Harshadsinh Solanki તમારી સાથે સીધી ચર્ચા કરીને યોગ્ય ઉકેલ સૂચવશે."
        }
      ]
    },
    footer: {
      description: "DigWeb Expert વ્યવસાયોને તેમની ઓનલાઇન હાજરી મજબૂત કરવા માટે વેબસાઇટ ડેવલપમેન્ટ, Meta Ads, ગ્રાફિક ડિઝાઇન અને Google Business Profile સેવાઓ પૂરી પાડે છે.",
      founderLabel: "સ્થાપક:",
      navHeading: "નેવિગેશન",
      servicesHeading: "સેવાઓ",
      directHeading: "સીધો સંપર્ક",
      privacyLink: "પ્રાઇવસી પોલિસી",
      guideLink: "ઓનર કન્ફિગરેશન ગાઇડ",
      backToTop: "ટોચ પર જાઓ",
      allRightsReserved: "સર્વ હક સુરક્ષિત છે."
    },
    modals: {
      serviceOverview: "સેવા ઝાંખી",
      idealFor: "કોના માટે શ્રેષ્ઠ",
      coreCapabilities: "સમાવિષ્ટ મુખ્ય સુવિધાઓ",
      keyDeliverables: "મુખ્ય ડિલિવરેબલ્સ અને રોડમેપ",
      directConsultNote: "WhatsApp પર સીધી ચર્ચા, કોઈ ઓટોમેટિક મેસેજિંગ નહીં.",
      getServiceWhatsApp: "WhatsApp પર આ સેવા મેળવો",
      close: "બંધ કરો",
      projectDemoUrl: "demo.digwebexpert.com",
      honestDemoNotice: "પ્રામાણિક ડેમો નોંધ:",
      honestDemoBody: "આ પ્રોજેક્ટ લેઆઉટ ગુણવત્તા અને તકનીકી ક્ષમતા દર્શાવતો ડેમો કન્સેપ્ટ છે. તે કોઈ ચાલુ ક્લાયન્ટ કોન્ટ્રાક્ટ કે સ્પોન્સરશિપ નથી.",
      launchLive: "લાઈવ કન્સેપ્ટ જુઓ",
      urlNotConfigured: "લાઈવ લિંક હજુ કન્ફિગર થઈ નથી. (src/config/businessConfig.ts માં લિંક ઉમેરો)",
      externalWarningTitle: "તમે બહારની લાઈવ ડેમો વેબસાઇટ જોવા માટે DigWeb Expert સાઇટ છોડી રહ્યા છો:",
      proceedLive: "લાઈવ સાઇટ પર આગળ વધો",
      cancel: "રદ કરો"
    }
  },

  hi: {
    nav: {
      home: "होम",
      services: "हमारी सेवाएं",
      portfolio: "हमारा कार्य",
      offers: "वर्तमान ऑफर्स",
      reviews: "ग्राहक समीक्षाएं",
      about: "हमारे बारे में",
      faq: "प्रश्नोत्तरी (FAQ)",
      contact: "संपर्क करें",
      ownerGuide: "ओनर गाइड",
      chatWhatsApp: "WhatsApp पर चैट करें"
    },
    hero: {
      kicker: "डिजिटल सर्विसेज ब्रांड",
      kickerSub: "वेबसाइट एवं मार्केटिंग",
      headline: "शक्तिशाली डिजिटल समाधानों के साथ अपने व्यापार को आगे बढ़ाएं",
      description:
        "DigWeb Expert की प्रोफेशनल वेबसाइट डेवलपमेंट, Meta Ads, ग्राफिक डिजाइन और Google Business Profile सेवाओं के साथ अपनी मजबूत ऑनलाइन पहचान बनाएं।",
      exploreBtn: "हमारी सेवाएं देखें",
      contactBtn: "संपर्क करें",
      highlight1Title: "रिस्पॉन्सिव कोड",
      highlight1Sub: "मोबाइल, टैबलेट और डेस्कटॉप अनुकूल",
      highlight2Title: "सीधा संपर्क",
      highlight2Sub: "WhatsApp और ईमेल सुविधा",
      highlight3Title: "पारदर्शी दायरा",
      highlight3Sub: "कोई भ्रामक आंकड़े या झूठे दावे नहीं",
      cardTag: "आधुनिक व्यवसायों के लिए समर्पित प्रामाणिक डिजिटल समाधान।",
      founderLabel: "संस्थापक:"
    },
    services: {
      kicker: "मुख्य सेवाएं",
      heading: "हमारी सेवाएं",
      subheading: "आपके व्यापार को मजबूत ऑनलाइन पहचान दिलाने के लिए तैयार किए गए डिजिटल समाधान।",
      knowMore: "अधिक जानें",
      getService: "यह सेवा प्राप्त करें",
      includedFeatures: "शामिल सुविधाएं",
      items: [
        {
          id: "website-development",
          title: "वेबसाइट डेवलपमेंट",
          shortDescription:
            "आपके व्यवसाय को ऑनलाइन प्रस्तुत करने और संभावित ग्राहकों तक पहुंचने के लिए आधुनिक एवं रिस्पॉन्सिव वेबसाइट्स।",
          fullDescription:
            "प्रत्येक आधुनिक व्यवसाय के लिए एक तीव्र, मोबाइल-अनुकूल और विश्वसनीय वेबसाइट होना आवश्यक है। हम लैंडिंग पेज, कॉर्पोरेट बिजनेस वेबसाइट और ई-कॉमर्स कैटलॉग वेबसाइट्स बनाते हैं। प्रत्येक वेबसाइट मोबाइल, टैबलेट और कंप्यूटर पर बेहतरीन अनुभव देती है।",
          features: [
            "प्रोफेशनल बिजनेस वेबसाइट्स",
            "उच्च-रूपांतरण लैंडिंग पेज",
            "आधुनिक रिस्पॉन्सिव वेबसाइट डिजाइन",
            "वेबसाइट री-डिजाइन सेवाएं",
            "ई-कॉमर्स ऑनलाइन कैटलॉग"
          ],
          deliverables: [
            "मोबाइल-फर्स्ट अनुकूल लेआउट",
            "तेज़ लोडिंग गति और स्वच्छ कोडिंग",
            "WhatsApp क्लिक-टू-चैट इंटीग्रेशन",
            "ग्राहक पूछताछ संपर्क फॉर्म",
            "प्राथमिक ऑन-पेज SEO एवं मेटा टैग्स"
          ],
          idealFor: "अपनी सेवाएं ऑनलाइन प्रदर्शित करने और नए ग्राहक पाने के इच्छुक व्यवसायों के लिए।",
          whatsappMessage: "Hello DigWeb Expert, I am interested in Website Development. Please share more details.",
          badge: "मुख्य सेवा"
        },
        {
          id: "meta-ads",
          title: "मेटा ऐड्स (Meta Ads)",
          shortDescription:
            "फेसबुक और इंस्टाग्राम के माध्यम से लक्षित ग्राहकों तक पहुंचने के इच्छुक व्यवसायों के लिए विज्ञापन अभियान सेटअप।",
          fullDescription:
            "Facebook और Instagram पर सक्रिय ग्राहकों तक सही ढंग से कॉन्फ़िगर किए गए Meta Ads के ज़रिये पहुंचें। हम तकनीकी अभियान सेटअप, ऑडियंस टारगेटिंग, विज्ञापन क्रिएटिव प्लेसमेंट और ट्रैकिंग का प्रबंधन करते हैं। हम झूठे वादों के बजाय आपके वास्तविक बजट अनुसार सुनियोजित अभियान चलाते हैं।",
          features: [
            "Facebook विज्ञापन सेटअप",
            "Instagram विज्ञापन सेटअप",
            "अभियान रणनीति कॉन्फ़िगरेशन",
            "विज्ञापन क्रिएटिव इंटीग्रेशन"
          ],
          deliverables: [
            "Meta Business Manager एवं Ad Account सेटअप",
            "पिक्सेल एवं कन्वर्जन ट्रैकिंग मार्गदर्शन",
            "भौगोलिक एवं रुचि आधारित ऑडियंस टारगेटिंग",
            "विज्ञापन फॉर्मेटिंग और हेडलाइन संरेखण",
            "अभियान लॉन्च से पूर्व तकनीकी परीक्षण"
          ],
          idealFor: "सोशल मीडिया पर अपने उत्पादों अथवा सेवाओं का प्रचार करने वाले व्यवसायों के लिए।",
          whatsappMessage: "Hello DigWeb Expert, I am interested in Meta Ads services. Please share more details.",
          badge: "टारगेटेड रीच"
        },
        {
          id: "graphic-design",
          title: "ग्राफिक डिजाइन",
          shortDescription:
            "व्यवसाय की सेवाओं, ऑफर्स और ब्रांड पहचान को प्रभावी रूप से प्रस्तुत करने के लिए व्यावसायिक विजुअल कंटेंट।",
          fullDescription:
            "आकर्षक और सुस्पष्ट विज़ुअल्स आपके ब्रांड का विश्वास बढ़ाते हैं। हम Instagram पोस्ट्स, Facebook पोस्ट्स, प्रमोशनल बैनर्स, फ्लायर्स और डिजिटल मार्केटिंग सामग्रियां तैयार करते हैं। प्रत्येक डिजाइन में रंग संतुलन और स्पष्ट टाइपोग्राफी का विशेष ध्यान रखा जाता है।",
          features: [
            "सोशल मीडिया पोस्ट डिजाइन",
            "प्रमोशनल विज्ञापन क्रिएटिव्स",
            "बिजनेस मार्केटिंग विज़ुअल्स",
            "डिजिटल ब्रांडिंग सामग्री"
          ],
          deliverables: [
            "हाई-रेज़ोल्यूशन सोशल मीडिया क्रिएटिव्स",
            "प्रमोशनल फ्लायर एवं बैनर डिजाइन",
            "संतुलित कलर पैलेट और टाइपोग्राफी व्यवस्था",
            "WhatsApp और सोशल मीडिया पर साझा करने योग्य फॉर्मेट्स"
          ],
          idealFor: "नियमित सोशल मीडिया पोस्ट्स और प्रचार विज़ुअल्स की आवश्यकता वाले ब्रांड्स के लिए।",
          whatsappMessage: "Hello DigWeb Expert, I am interested in Graphic Design services. Please share more details.",
          badge: "क्रिएटिव ब्रांडिंग"
        },
        {
          id: "google-business-profile",
          title: "Google Business Profile सेटअप",
          shortDescription:
            "Google Search और Maps पर व्यवसाय की जानकारी की सटीकता और दृश्यता सुधारने के लिए प्रोफाइल सेटअप और अनुकूलन सहायता।",
          fullDescription:
            "जब स्थानीय ग्राहक आपकी सेवाएं अथवा पता खोजते हैं, तो Google Business Profile उनका पहला संपर्क बिंदु होता है। हम सही व्यावसायिक समय, उपयुक्त श्रेणियां, सत्यापित संपर्क विवरण और तस्वीरों के साथ Google Profile सेटअप करने में सहायता करते हैं।",
          features: [
            "Google Business Profile सेटअप",
            "व्यावसायिक जानकारी अनुकूलन",
            "उचित व्यावसायिक श्रेणियों का चयन",
            "Google Maps एवं Search दृश्यता सहायता"
          ],
          deliverables: [
            "प्रोफाइल सेटअप और सत्यापन मार्गदर्शन",
            "श्रेणी चयन और मुख्य सेवाओं की सूची",
            "सटीक कार्य समय और सेवा क्षेत्र विवरण",
            "कीवर्ड्स युक्त व्यावसायिक विवरण लेखन",
            "Google Maps लोकेशन पिन समीक्षा"
          ],
          idealFor: "Google Maps और Search पर प्रामाणिक उपस्थिति चाहने वाले स्थानीय दुकानदारों और सेवा प्रदाताओं के लिए।",
          whatsappMessage: "Hello DigWeb Expert, I am interested in Google Business Profile Setup. Please share more details.",
          badge: "लोकल विजिबिलिटी"
        }
      ]
    },
    portfolio: {
      kicker: "पोर्टफोलियो कॉन्सेप्ट्स",
      heading: "हमारा कार्य",
      subheading: "चुनिंदा वेबसाइट कॉन्सेप्ट्स, डिजाइन सैंपल्स और डिजिटल प्रोजेक्ट डेमो देखें।",
      filterAll: "सभी",
      filterWeb: "वेबसाइट डेवलपमेंट",
      filterDesign: "ग्राफिक डिजाइन",
      viewDetails: "प्रोजेक्ट विवरण देखें",
      demoTag: "डेमो प्रोजेक्ट",
      conceptTag: "कॉन्सेप्ट प्रोजेक्ट",
      transparencyNote:
        "नोट: सभी शोकेस प्रोजेक्ट्स लेआउट गुणवत्ता और तकनीकी क्षमता प्रदर्शित करने के लिए बनाए गए डेमो प्रोटोटाइप और कॉन्सेप्ट डिजाइन हैं।",
      items: [
        {
          id: "hotel-demo",
          title: "Hotel Website Demo",
          category: "Website Development",
          description: "होटल और आतिथ्य उद्योग के लिए रूम शोकेस, सुविधाओं और सीधी बुकिंग पूछताछ के साथ आधुनिक कॉन्सेप्ट।",
          longDescription: "यह डेमो लक्जरी होटल वेबसाइट आर्किटेक्चर प्रदर्शित करता है। इसमें रूम चयन, खानपान सुविधाएं और त्वरित पूछताछ प्रवाह शामिल है।",
          features: [
            "मोबाइल-अनुकूलित रूम कार्ड्स",
            "सीधी बुकिंग पूछताछ इंटीग्रेशन",
            "सुविधाएं एवं डाइनिंग हाइलाइट्स",
            "इंटरैक्टिव फोटो गैलरी लेआउट"
          ],
          status: "Demo Project",
          tags: ["आतिथ्य", "रिस्पॉन्सिव डिजाइन", "बुकिंग फ्लो"]
        },
        {
          id: "restaurant-demo",
          title: "Restaurant Website Demo",
          category: "Website Development",
          description: "रेस्तरां और कैफे के लिए डिजिटल फूड मेनू, शेफ की खास डिशेज और टेबल आरक्षण फॉर्म युक्त साइट।",
          longDescription: "रेस्तरां के लिए वर्गीकृत भोजन मेनू, कार्य समय, लोकेशन मैप और WhatsApp द्वारा टेबल बुकिंग पूछताछ प्रदर्शित करने वाला आधुनिक डेमो।",
          features: [
            "वर्गीकृत डिजिटल फूड मेनू",
            "टेबल रिजर्वेशन इंक्वायरी फॉर्म",
            "समय और लोकेशन मैप प्रिव्यू",
            "शेफ की विशेष डिशेज हाइलाइट्स"
          ],
          status: "Demo Project",
          tags: ["रेस्तरां", "डिजिटल मेनू", "टेबल बुकिंग"]
        },
        {
          id: "furniture-demo",
          title: "Furniture Business Website Demo",
          category: "Website Development",
          description: "फर्नीचर व्यवसाय के लिए सामग्री विवरण और उत्पाद पूछताछ के साथ सुरुचिपूर्ण स्कैंडिनेवियाई कैटलॉग।",
          longDescription: "होम और ऑफिस फर्नीचर निर्माताओं के लिए कमरों के अनुसार कैटलॉग, आयाम, लकड़ी की गुणवत्ता और WhatsApp द्वारा उपलब्धता जानने की सुविधा।",
          features: [
            "कक्ष-अनुसार उत्पाद ब्राउज़िंग",
            "विस्तृत स्पेक्स एवं सामग्री विवरण",
            "हाई-कंट्रास्ट मिनिमलिस्ट डिजाइन",
            "प्रत्यक्ष कोटेशन पूछताछ बटन"
          ],
          status: "Demo Project",
          tags: ["ई-कॉमर्स कॉन्सेप्ट", "कैटलॉग", "मिनिमलिस्ट"]
        },
        {
          id: "real-estate-demo",
          title: "Real Estate Website Demo",
          category: "Website Development",
          description: "प्रीमियर रियल एस्टेट प्रोजेक्ट्स, फ्लोर प्लान, क्षेत्र की जानकारी और साइट विजिट अनुरोध पोर्टल।",
          longDescription: "प्रॉपर्टी डेवलपर्स और ब्रोकर्स के लिए फ्लैट, विला, क्षेत्रफल और लोकेशन विवरण के साथ ब्रोशर डाउनलोड का आधुनिक कॉन्सेप्ट।",
          features: [
            "मुख्य विवरण युक्त प्रॉपर्टी लिस्टिंग",
            "फ्लोर प्लान और सुविधाओं का लेआउट",
            "साइट विजिट शेड्यूल करने का फॉर्म",
            "आसपास के क्षेत्र व मैप जानकारी"
          ],
          status: "Demo Project",
          tags: ["रियल एस्टेट", "प्रॉपर्टी कार्ड्स", "लीड कैप्चर"]
        },
        {
          id: "graphic-design-samples",
          title: "Graphic Design Samples",
          category: "Graphic Design",
          description: "सोशल मीडिया पोस्ट्स, सेल्स पोस्टर्स और ब्रांडिंग विजुअल्स का संकलित कॉन्सेप्ट संग्रह।",
          longDescription: "Instagram और Facebook पोस्ट्स, त्योहारी शुभकामनाओं और प्रमोशनल घोषणाओं के लिए व्यावहारिक ग्राफिक डिजाइन सैंपल्स।",
          features: [
            "Instagram फीड व स्टोरी साइज़ सेट्स",
            "प्रमोशनल सेल घोषणा डिजाइन्स",
            "ब्रांड कलर स्कीम समन्वय",
            "सुस्पष्ट व्यावसायिक टाइपोग्राफी"
          ],
          status: "Concept Project",
          tags: ["सोशल मीडिया", "क्रिएटिव्स", "टाइपोग्राफी"]
        },
        {
          id: "landing-page-demo",
          title: "Landing Page Demo",
          category: "Website Development",
          description: "स्पष्ट संदेश, मुख्य लाभों की सूची और लीड कैप्चर फॉर्म युक्त उच्च-रूपांतरण सिंगल पेज लेआउट।",
          longDescription: "किसी विशिष्ट सेवा अथवा ऑफर के लिए तीव्र, मोबाइल-अनुकूल और परिणामोन्मुखी सिंगल पेज लैंडिंग पेज का डेमो।",
          features: [
            "स्पष्ट मुख्य संदेश और वैल्यू प्रपोजीशन",
            "सेवा लाभों का सुव्यवस्थित विवरण",
            "सत्यापित संपर्क लीड फॉर्म",
            "अत्यंत तीव्र सिंगल-पेज नेविगेशन"
          ],
          status: "Demo Project",
          tags: ["लीड जेनरेशन", "सिंगल पेज", "फास्ट लोडिंग"]
        }
      ]
    },
    offers: {
      kicker: "प्रमोशन्स एवं पैकेजेस",
      heading: "वर्तमान ऑफर्स",
      subheading: "DigWeb Expert की उपलब्ध सर्विस ऑफर्स देखें।",
      neutralTitle: "विशेष ऑफर्स की घोषणा यहां की जाएगी।",
      neutralText: "अपनी आवश्यकताओं पर चर्चा करने और अपने व्यापार के लिए अनुकूल पैकेज जानने के लिए हमसे संपर्क करें।",
      neutralBtn: "कस्टम पैकेज के लिए संपर्क करें",
      claimBtn: "WhatsApp पर ऑफर प्राप्त करें",
      validUntil: "वैधता तिथि"
    },
    reviews: {
      kicker: "ग्राहक प्रतिक्रिया एवं सत्यापन",
      heading: "हमारे ग्राहक क्या कहते हैं",
      subheading: "DigWeb Expert के साथ कार्य करने वाले ग्राहकों के प्रामाणिक अनुभव।",
      approvedTitle: "स्वीकृत ग्राहक समीक्षाएं",
      ownerDeskBtn: "ओनर मॉडरेशन डेस्क",
      emptyText: "ग्राहक समीक्षाएं सबमिट और स्वीकृत होने के बाद यहां दिखाई देंगी।",
      emptySubtext: "हम व्यावसायिक प्रामाणिकता का पालन करते हैं: DigWeb Expert पर कोई भी नकली अथवा मनगढ़ंत समीक्षा प्रदर्शित नहीं की जाती।",
      formKicker: "अपना अनुभव साझा करें",
      formTitle: "अपनी समीक्षा सबमिट करें",
      formSubtitle: "समीक्षाएं प्रकाशित करने से पूर्व DigWeb Expert द्वारा जांची जाती हैं।",
      nameLabel: "पूरा नाम",
      namePlaceholder: "उदा. राजेश कुमार",
      ratingLabel: "स्टार रेटिंग",
      ratingCount: "में से 5 स्टार्स",
      reviewLabel: "अपनी समीक्षा लिखें",
      reviewPlaceholder: "DigWeb Expert के साथ अपने प्रोजेक्ट, संवाद और कार्य की गुणवत्ता के बारे में लिखें...",
      minLength: "न्यूनतम 10 अक्षर",
      submitBtn: "सत्यापन के लिए समीक्षा सबमिट करें",
      submittingBtn: "जांच कर सबमिट किया जा रहा है...",
      securityNote: "स्पैम और अवांछित प्रविष्टियों से सुरक्षा हेतु प्रत्येक समीक्षा संस्थापक द्वारा स्वीकृत की जाती है।",
      successMessage: "धन्यवाद! आपकी समीक्षा सबमिट कर दी गई है और प्रकाशित होने से पहले सत्यापन के लिए लंबित है।",
      submitAnother: "एक और समीक्षा सबमिट करें"
    },
    founder: {
      kicker: "नेतृत्व एवं दृष्टिकोण",
      heading: "हमारे संस्थापक से मिलें",
      subheading: "DigWeb Expert के पीछे समर्पित टेक्नोलॉजिस्ट और डिजिटल समाधान विशेषज्ञ।",
      personalMessage: "व्यक्तिगत संदेश",
      designation: "Founder — DigWeb Expert",
      introduction:
        "नमस्ते! मैं हर्षदसिंह सोलंकी, DigWeb Expert का संस्थापक हूं। मैं वेबसाइट डेवलपमेंट, Meta Ads, ग्राफिक डिजाइन और Google Business Profile सेवाओं के माध्यम से व्यवसायों को अपनी ऑनलाइन पहचान बनाने में मदद करता हूं।",
      bioParagraph1:
        "DigWeb Expert की स्थापना आधुनिक व्यवसायों को समर्पित, पारदर्शी और उच्च-गुणवत्ता वाले डिजिटल समाधान प्रदान करने के लिए की गई थी। चाहे आप अपनी पहली व्यावसायिक वेबसाइट शुरू कर रहे हों या डिजिटल विज्ञापन, हमारा उद्देश्य आपके ब्रांड को एक सुदृढ़ आधार देना है।",
      bioParagraph2:
        "हम भ्रामक दावों या आंकड़ों के बिना स्वच्छ, रिस्पॉन्सिव डेवलपमेंट, उद्देश्यपूर्ण ग्राफिक डिजाइन और रणनीतिक लोकल सर्च पर ध्यान केंद्रित करते हैं।",
      connectTitle: "श्री सोलंकी से सीधा संपर्क करें",
      chatWhatsApp: "WhatsApp पर चैट करें",
      emailDirectly: "सीधा ईमेल करें",
      authenticityNote: "DigWeb Expert के संस्थापक Mr. Harshadsinh Solanki की आधिकारिक प्रोफाइल।"
    },
    contact: {
      kicker: "संपर्क करें",
      heading: "आइए मिलकर आपके व्यापार को आगे बढ़ाएं",
      subheading: "अपने व्यापार और आवश्यक डिजिटल सेवाओं के बारे में बताएं। हम उपयुक्त समाधान खोजने में आपकी सहायता करेंगे।",
      directTitle: "सीधा संपर्क",
      directSub: "त्वरित और पारदर्शी परामर्श के लिए अपने पसंदीदा माध्यम द्वारा हमसे संपर्क करें।",
      waTitle: "WhatsApp बिजनेस",
      waSub: "कोटेशन और प्रोजेक्ट समयसीमा पर त्वरित चर्चा करने का सबसे सुलभ तरीका।",
      waBtn: "WhatsApp पर चैट करें",
      igTitle: "Instagram प्रोफाइल",
      igSub: "नवीनतम डिजाइन क्रिएटिव्स और अपडेट्स देखें।",
      igBtn: "Instagram पर फॉलो करें",
      emailTitle: "बिजनेस ईमेल",
      emailSub: "विस्तृत प्रोजेक्ट विवरण और पूछताछ भेजें।",
      emailBtn: "ईमेल भेजें",
      formTitle: "प्रोजेक्ट पूछताछ भेजें",
      formSub: "नीचे अपना विवरण भरें और हम व्यक्तिगत परामर्श के साथ आपसे संपर्क करेंगे।",
      fullNameLabel: "पूरा नाम",
      fullNamePlaceholder: "उदा. अमित पटेल",
      businessNameLabel: "व्यवसाय का नाम",
      businessNamePlaceholder: "उदा. पटेल एंटरप्राइज",
      phoneLabel: "WhatsApp / फोन नंबर",
      phonePlaceholder: "+91 98765 43210",
      serviceLabel: "आवश्यक सेवा",
      messageLabel: "संदेश / प्रोजेक्ट विवरण",
      messagePlaceholder: "अपने व्यावसायिक लक्ष्यों अथवा विशिष्ट आवश्यकताओं के बारे में संक्षेप में बताएं...",
      submitBtn: "पूछताछ सबमिट करें",
      submittingBtn: "पूछताछ भेजी जा रही है...",
      successTitle: "पूछताछ सबमिट हो गई",
      successMessage: "DigWeb Expert से संपर्क करने के लिए धन्यवाद। आपकी पूछताछ सफलतापूर्वक सबमिट हो गई है।",
      sendAnother: "एक और पूछताछ भेजें",
      privacyNote: "आपकी जानकारी सुरक्षित रखी जाती है। इस प्रिव्यू में प्रविष्टियां सुरक्षित रूप से दर्ज होती हैं।",
      servicesList: {
        web: "वेबसाइट डेवलपमेंट",
        meta: "मेटा ऐड्स (Meta Ads)",
        graphic: "ग्राफिक डिजाइन",
        gbp: "Google Business Profile सेटअप",
        other: "अन्य"
      }
    },
    faq: {
      kicker: "कोई प्रश्न हैं?",
      heading: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
      subheading: "वेबसाइट डेवलपमेंट, Meta Ads, ग्राफिक डिजाइन और Google Business Profile सेवाओं से संबंधित सामान्य प्रश्नों के पारदर्शी उत्तर।",
      filterAll: "सभी प्रश्न",
      filterWeb: "वेबसाइट डेवलपमेंट",
      filterMarketing: "डिजिटल मार्केटिंग एवं ऐड्स",
      filterGeneral: "प्रक्रिया एवं संवाद",
      stillHaveQuestions: "क्या आपके प्रोजेक्ट से संबंधित अन्य प्रश्न हैं?",
      stillHaveQuestionsSub: "त्वरित जानकारी के लिए WhatsApp पर संस्थापक Mr. Harshadsinh Solanki से सीधे जुड़ें।",
      chatWhatsAppBtn: "WhatsApp पर सीधे बात करें",
      items: [
        {
          id: "web-time",
          category: "web",
          categoryLabel: "वेबसाइट डेवलपमेंट",
          question: "एक बिजनेस वेबसाइट बनाने में कितना समय लगता है?",
          answer: "प्रोजेक्ट का दायरा और सामग्री तय होने के बाद अधिकांश सामान्य बिजनेस वेबसाइट्स और लैंडिंग पेजेस 5 से 10 कार्यदिवसों में तैयार हो जाते हैं। ई-कॉमर्स अथवा विशेष फीचर्स युक्त वेबसाइट्स के लिए हम पहले से ही एक चरणबद्ध समय-सीमा निर्धारित करते हैं।"
        },
        {
          id: "web-responsive",
          category: "web",
          categoryLabel: "वेबसाइट डेवलपमेंट",
          question: "क्या मेरी वेबसाइट मोबाइल, टैबलेट और कंप्यूटर पर सही चलेगी?",
          answer: "जी हां। DigWeb Expert द्वारा तैयार प्रत्येक वेबसाइट पूर्णतः रिस्पॉन्सिव और मोबाइल-फर्स्ट होती है। हम Android, iPhone, टैबलेट और कंप्यूटर पर इसका परीक्षण करते हैं ताकि तेज़ लोडिंग गति, स्पष्ट फॉन्ट और सुगम नेविगेशन सुनिश्चित हो सके।"
        },
        {
          id: "meta-guarantee",
          category: "marketing",
          categoryLabel: "मेटा ऐड्स (Meta Ads)",
          question: "क्या आप Meta Ads से निश्चित बिक्री अथवा लीड्स की गारंटी देते हैं?",
          answer: "हम पूर्ण व्यावसायिक ईमानदारी में विश्वास करते हैं: कोई भी जिम्मेदार एजेंसी निश्चित बिक्री या मुनाफे की गारंटी नहीं दे सकती क्योंकि खरीदारी का निर्णय उत्पाद की मांग, मूल्य और उपभोक्ता की रुचि पर निर्भर करता है। DigWeb Expert सटीक ऑडियंस टारगेटिंग, प्रभावशाली विज्ञापन डिजाइन, पिक्सल ट्रैकिंग और पारदर्शी बजट प्रबंधन सुनिश्चित करता है।"
        },
        {
          id: "gbp-rankings",
          category: "marketing",
          categoryLabel: "Google Business Profile",
          question: "क्या आप Google Maps अथवा Search में #1 रैंकिंग की गारंटी दे सकते हैं?",
          answer: "नहीं। गूगल की रैंकिंग प्रणाली खोजकर्ता की दूरी, प्रासंगिकता और समीक्षाओं जैसे अनेक कारकों पर निर्भर करती है। हम प्रोफाइल को सत्यापित श्रेणियों, सटीक कार्य समय, तस्वीरों, सर्विस कीवर्ड्स और सही मैप पिन के साथ पूर्णतः अनुकूलित करते हैं जिससे आपकी स्थानीय उपस्थिति अधिकतम हो सके।"
        },
        {
          id: "graphic-formats",
          category: "marketing",
          categoryLabel: "ग्राफिक डिजाइन",
          question: "ग्राफिक डिजाइन के लिए आप किस फॉर्मेट और साइज में फाइलें प्रदान करते हैं?",
          answer: "हम Instagram फीड (1:1), Instagram स्टोरीज (9:16), Facebook पोस्ट्स और WhatsApp पर साझा करने योग्य हाई-रेज़ोल्यूशन PNG और JPEG फॉर्मेट्स में फाइल्स प्रदान करते हैं। आवश्यकता पड़ने पर विशेष फॉर्मेट्स भी उपलब्ध कराए जाते हैं।"
        },
        {
          id: "updates-changes",
          category: "general",
          categoryLabel: "मेंटेनेंस एवं अपडेट्स",
          question: "क्या भविष्य में अपना फोन नंबर, सेवाएं अथवा ऑफर्स आसानी से अपडेट किए जा सकते हैं?",
          answer: "जी हां। हमारी वेबसाइट्स एक केंद्रीकृत कॉन्फ़िगरेशन फ़ाइल के साथ बनाई जाती हैं। अपना WhatsApp नंबर, ईमेल, सेवाएं या ऑफर्स अपडेट करने पर वे पूरी वेबसाइट में स्वतः अपडेट हो जाते हैं।"
        },
        {
          id: "start-process",
          category: "general",
          categoryLabel: "प्रारंभ कैसे करें",
          question: "DigWeb Expert के साथ कार्य प्रारंभ करने की प्रक्रिया क्या है?",
          answer: "शुरुआत करना अत्यंत सरल है: WhatsApp (+91 9875274952) पर संपर्क करें, mydigwebbussiness.18@gmail.com पर ईमेल करें या फॉर्म भरें। संस्थापक Mr. Harshadsinh Solanki सीधे आपसे परामर्श कर पारदर्शी योजना प्रस्तुत करेंगे।"
        }
      ]
    },
    footer: {
      description: "DigWeb Expert व्यवसायों को अपनी ऑनलाइन पहचान सुदृढ़ करने के लिए वेबसाइट डेवलपमेंट, Meta Ads, ग्राफिक डिजाइन और Google Business Profile सेवाएं प्रदान करता है।",
      founderLabel: "संस्थापक:",
      navHeading: "नेविगेशन",
      servicesHeading: "सेवाएं",
      directHeading: "सीधा संपर्क",
      privacyLink: "प्राइवेसी पॉलिसी",
      guideLink: "ओनर कॉन्फ़िगरेशन गाइड",
      backToTop: "शीर्ष पर जाएं",
      allRightsReserved: "सर्वाधिकार सुरक्षित।"
    },
    modals: {
      serviceOverview: "सेवा विहंगावलोकन",
      idealFor: "किसके लिए उपयुक्त",
      coreCapabilities: "शामिल मुख्य क्षमताएं",
      keyDeliverables: "प्रमुख डिलिवरेबल्स एवं रोडमैप",
      directConsultNote: "WhatsApp पर सीधा परामर्श, कोई स्वचालित संदेश नहीं।",
      getServiceWhatsApp: "WhatsApp पर यह सेवा प्राप्त करें",
      close: "बंद करें",
      projectDemoUrl: "demo.digwebexpert.com",
      honestDemoNotice: "प्रामाणिक डेमो सूचना:",
      honestDemoBody: "यह प्रोजेक्ट लेआउट गुणवत्ता और तकनीकी क्षमता प्रदर्शित करने हेतु बनाया गया डेमो कॉन्सेप्ट है। यह कोई सक्रिय क्लाइंट अनुबंध अथवा विज्ञापन नहीं है।",
      launchLive: "लाइव कॉन्सेप्ट देखें",
      urlNotConfigured: "लाइव लिंक अभी कॉन्फ़िगर नहीं है। (src/config/businessConfig.ts में लिंक जोड़ें)",
      externalWarningTitle: "आप बाहरी लाइव डेमो देखने के लिए DigWeb Expert साइट से बाहर जा रहे हैं:",
      proceedLive: "लाइव साइट पर जाएं",
      cancel: "रद्द करें"
    }
  }
};
