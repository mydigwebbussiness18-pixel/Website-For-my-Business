import React from "react";
import { businessConfig } from "../config/businessConfig";
import { X, ShieldCheck } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Close privacy policy"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-5 text-slate-600 text-xs leading-relaxed">
          <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy & Data Transparency</span>
          </div>
          <h2 id="privacy-modal-title" className="text-xl font-bold text-[#0B132B]">
            Privacy Policy for {businessConfig.businessName}
          </h2>
          <p className="text-slate-500">
            Last Updated: October 2026. This policy describes how {businessConfig.businessName} handles information provided by visitors through our website.
          </p>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#0B132B]">1. Information We Collect</h3>
            <p>
              When you submit a contact enquiry or customer review on our website, we may collect the following details:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Your name and business name</li>
              <li>Your phone or WhatsApp number</li>
              <li>Your message and selected service requirements</li>
              <li>Customer reviews and star ratings submitted for publication</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#0B132B]">2. Purpose of Data Use</h3>
            <p>
              The collected information is used solely to reply to your specific service enquiries, coordinate consultation on WhatsApp or email, and display genuine approved feedback. We do not sell, rent, or trade your personal information to third-party brokers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#0B132B]">3. Third-Party Links & Services</h3>
            <p>
              Our website provides links to external services including WhatsApp (Meta Platforms) and Instagram. When you click WhatsApp contact actions or social links, your interaction is subject to their respective terms and privacy policies.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#0B132B]">4. Contact & Inquiries</h3>
            <p>
              If you have any questions or would like your submitted review or enquiry data removed, please contact us directly at{" "}
              <a href={`mailto:${businessConfig.contact.email}`} className="text-blue-600 font-medium hover:underline">
                {businessConfig.contact.email}
              </a>{" "}
              or message us on WhatsApp at {businessConfig.contact.whatsappNumber}.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              Close Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
