import React from "react";
import { X, BookOpen, Code, FileText, CheckCircle2 } from "lucide-react";

interface OwnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerGuideModal: React.FC<OwnerGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const guideItems = [
    {
      q: "1. Which file contains the WhatsApp number?",
      file: "src/config/businessConfig.ts",
      answer: "Open `src/config/businessConfig.ts` and locate `contact.whatsappNumber: \"+91 9875274952\"`. Replace this with your desired international number. The website's floating button, contact links, and service inquiry buttons automatically read and re-format this number for wa.me."
    },
    {
      q: "2. How to update the business email?",
      file: "src/config/businessConfig.ts",
      answer: "In `src/config/businessConfig.ts`, update `contact.email: \"mydigwebbussiness.18@gmail.com\"`. The website's mailto links, footer info, and contact section update instantly."
    },
    {
      q: "3. How to replace the founder photograph?",
      file: "public/images/founder.jpg",
      answer: "Copy your new high-resolution photo and replace `public/images/founder.jpg`. Alternatively, place the image anywhere in `public/` and update `founder.image: \"/images/your-new-photo.jpg\"` in `src/config/businessConfig.ts`."
    },
    {
      q: "4. How to replace the logo?",
      file: "public/images/logo.jpeg",
      answer: "Replace `public/images/logo.jpeg` with your new circular logo file, or point `logo: \"/images/your-logo.png\"` in `src/config/businessConfig.ts`. It will reflect in the top navbar, hero visual, and footer."
    },
    {
      q: "5. How to add a new portfolio project?",
      file: "src/config/businessConfig.ts",
      answer: "In `src/config/businessConfig.ts`, scroll to the `portfolio` array. Add a new object following the `PortfolioProject` interface, specifying `title`, `category`, `description`, `features`, `status` (\"Demo Project\" or \"Concept Project\"), and optional `projectUrl`."
    },
    {
      q: "6. How to update or activate an offer?",
      file: "src/config/businessConfig.ts",
      answer: "In `src/config/businessConfig.ts`, scroll to the `offers` array. Find the offer and set `isActive: true` to display it on the website. You can also edit `title`, `description`, `price`, `discount`, and `expiryDate`."
    },
    {
      q: "7. How to remove an expired offer?",
      file: "src/config/businessConfig.ts",
      answer: "Simply set `isActive: false` on that offer in `src/config/businessConfig.ts`, or delete the item from the `offers` array. When no offers are marked active, Section 4 cleanly displays the neutral announcement message."
    },
    {
      q: "8. How to update service descriptions & WhatsApp messages?",
      file: "src/config/businessConfig.ts",
      answer: "In `src/config/businessConfig.ts`, look for `services`. Each service item contains `title`, `shortDescription`, `fullDescription`, `features`, `deliverables`, and its customized `whatsappMessage`."
    },
    {
      q: "9. How to configure the backend (Firebase / Form handler)?",
      file: ".env / Firebase Console",
      answer: "Currently, review submissions and contact enquiries run via verified client prototype storage with an owner moderation panel. For permanent cloud storage, configure Firebase Firestore or a form endpoint (e.g. Formspree / Netlify Forms) and set up the relevant keys in your production environment variables."
    },
    {
      q: "10. How to rebuild and deploy the website on Netlify or hosting?",
      file: "package.json / netlify.toml",
      answer: "Run `npm run build`. This generates an optimized static output directory in `dist/`. Link your Git repository to Netlify, Vercel, or Cloudflare Pages with build command `npm run build` and publish directory `dist`."
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Close guide modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold tracking-wider uppercase">
              <BookOpen className="w-4 h-4" />
              <span>DigWeb Expert Maintainer Documentation</span>
            </div>
            <h2 id="guide-modal-title" className="text-2xl font-bold text-[#0B132B] mt-1">
              Owner Editing & Configuration Guide
            </h2>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed">
              This guide provides step-by-step instructions for Mr. Harshadsinh Solanki to manage business phone numbers, emails, founder photography, portfolio demos, and promotional offers.
            </p>
          </div>

          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-xs text-slate-700 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#0B132B] block mb-0.5">Configuration-Based Architecture:</strong>
              All business details are centralized in <code className="text-blue-700 bg-blue-100/70 px-1 py-0.5 rounded font-mono">src/config/businessConfig.ts</code>. You do not need to hunt through dozens of component files to change your WhatsApp number or service copy!
            </div>
          </div>

          <div className="space-y-4">
            {guideItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#0B132B]">{item.q}</h3>
                  <span className="text-[11px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 shrink-0">
                    {item.file}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98]"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
