import React, { useState } from "react";
import { motion } from "framer-motion";
import { businessConfig } from "../config/businessConfig";
import { useLanguage } from "../i18n/LanguageContext";
import { openWhatsAppChat } from "../utils/whatsapp";
import { submitContactEnquiry } from "../services/storageService";
import {
  containerStaggerVariants,
  gridStaggerVariants,
  fadeInUpVariant,
  cardFadeInUpVariant,
  defaultViewport
} from "../utils/animations";
import {
  MessageCircle,
  Instagram,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  PhoneCall
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  // Form State
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [interestedService, setInterestedService] = useState("Website Development");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage(t.contact.fullNameLabel + " is required.");
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 7) {
      setErrorMessage(t.contact.phoneLabel + " is required.");
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage(t.contact.messageLabel + " requires at least 5 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactEnquiry({
        fullName,
        businessName,
        phoneNumber,
        interestedService,
        message
      });

      setSuccessMessage(t.contact.successMessage);
      setFullName("");
      setBusinessName("");
      setPhoneNumber("");
      setMessage("");
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Staggered Fade-in-up */}
        <motion.div
          variants={containerStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <motion.div variants={fadeInUpVariant} className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-50 border border-blue-200/60 px-3.5 py-1 rounded-full shadow-xs">
            <span>{t.contact.kicker}</span>
          </motion.div>
          <motion.h2 variants={fadeInUpVariant} className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
            {t.contact.heading}
          </motion.h2>
          <motion.p variants={fadeInUpVariant} className="text-slate-600 text-base leading-relaxed">
            {t.contact.subheading}
          </motion.p>
        </motion.div>

        {/* Two-Column Desktop Layout / Stacked Mobile Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <h3 className="text-xl font-bold text-[#0B132B] mb-2">{t.contact.directTitle}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.contact.directSub}
              </p>
            </motion.div>

            {/* Direct Channels with Staggered Fade-in-up */}
            <motion.div
              variants={gridStaggerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="space-y-4"
            >
              {/* Direct Option 1: WhatsApp */}
              <motion.div
                variants={cardFadeInUpVariant}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B132B]">{t.contact.waTitle}</h4>
                    <p className="text-xs text-slate-500 font-mono">
                      {businessConfig.contact.whatsappNumber}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  {t.contact.waSub}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsAppChat(businessConfig.contact.contactSectionWhatsappMessage)
                  }
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-sm shadow-emerald-600/20 active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.contact.waBtn}</span>
                </button>
              </motion.div>

              {/* Direct Option 2: Instagram */}
              <motion.div
                variants={cardFadeInUpVariant}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md hover:border-pink-300 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 text-pink-500 flex items-center justify-center shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B132B]">{t.contact.igTitle}</h4>
                    <p className="text-xs text-slate-500 font-mono">
                      {businessConfig.contact.instagramUsername}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  {t.contact.igSub}
                </p>
                <a
                  href={businessConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all border border-slate-200 shadow-xs hover:border-slate-300 active:scale-[0.98]"
                >
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span>{t.contact.igBtn}</span>
                </a>
              </motion.div>

              {/* Direct Option 3: Email */}
              <motion.div
                variants={cardFadeInUpVariant}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B132B]">{t.contact.emailTitle}</h4>
                    <p className="text-xs text-slate-500 font-mono truncate">
                      {businessConfig.contact.email}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  {t.contact.emailSub}
                </p>
                <a
                  href={`mailto:${businessConfig.contact.email}?subject=${encodeURIComponent(
                    "Enquiry for DigWeb Expert Services"
                  )}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all border border-slate-200 shadow-xs hover:border-slate-300 active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>{t.contact.emailBtn}</span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-7"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-[#0B132B]">{t.contact.formTitle}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.contact.formSub}
                </p>
              </div>

              {successMessage ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-emerald-800 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-[#0B132B]">{t.contact.successTitle}</h4>
                      <p className="text-xs mt-1 leading-relaxed text-emerald-800">{successMessage}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSuccessMessage(null)}
                    className="text-xs font-semibold underline text-emerald-700 hover:text-emerald-900 pt-2 inline-block cursor-pointer"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Field 1: Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-fullname" className="block text-xs font-medium text-slate-700">
                        {t.contact.fullNameLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.contact.fullNamePlaceholder}
                        maxLength={80}
                        disabled={isSubmitting}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        required
                      />
                    </div>

                    {/* Field 2: Business Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-business" className="block text-xs font-medium text-slate-700">
                        {t.contact.businessNameLabel}
                      </label>
                      <input
                        id="contact-business"
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder={t.contact.businessNamePlaceholder}
                        maxLength={100}
                        disabled={isSubmitting}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Field 3: WhatsApp / Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="block text-xs font-medium text-slate-700">
                        {t.contact.phoneLabel} <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="contact-phone"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder={t.contact.phonePlaceholder}
                          maxLength={20}
                          disabled={isSubmitting}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Field 4: Interested Service */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-service" className="block text-xs font-medium text-slate-700">
                        {t.contact.serviceLabel} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="contact-service"
                        value={interestedService}
                        onChange={(e) => setInterestedService(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      >
                        <option value="Website Development">{t.contact.servicesList.web}</option>
                        <option value="Meta Ads">{t.contact.servicesList.meta}</option>
                        <option value="Graphic Design">{t.contact.servicesList.graphic}</option>
                        <option value="Google Business Profile Setup">
                          {t.contact.servicesList.gbp}
                        </option>
                        <option value="Other">{t.contact.servicesList.other}</option>
                      </select>
                    </div>
                  </div>

                  {/* Field 5: Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700">
                      {t.contact.messageLabel} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contact.messagePlaceholder}
                      maxLength={1000}
                      disabled={isSubmitting}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none outline-none"
                      required
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{t.reviews.minLength}</span>
                      <span>{message.length}/1000</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold py-3 px-6 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.submittingBtn}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{t.contact.submitBtn}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-start gap-2 text-[11px] text-slate-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{t.contact.privacyNote}</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
