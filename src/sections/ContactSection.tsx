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
  PhoneCall,
  Calendar,
  Clock,
  Database,
  ExternalLink
} from "lucide-react";
import { submitAppointmentBooking } from "../services/storageService";
import { SUPABASE_PROJECT_ID } from "../services/supabaseClient";
import { AppointmentBooking } from "../types";

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  const tomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const todayStr = new Date().toISOString().split("T")[0];

  // Form State
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [interestedService, setInterestedService] = useState("Website Development");
  const [appointmentDate, setAppointmentDate] = useState(tomorrowStr());
  const [appointmentTime, setAppointmentTime] = useState("Morning (10:00 AM - 01:00 PM)");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<AppointmentBooking | null>(null);
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
      const res = await submitAppointmentBooking({
        fullName,
        businessName,
        phoneNumber,
        email,
        interestedService,
        appointmentDate,
        appointmentTime,
        message
      });

      setSuccessBooking(res.appointment);
      setSuccessMessage(res.message);
      setFullName("");
      setBusinessName("");
      setPhoneNumber("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to submit booking. Please try again or contact via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-[#10233F] relative"
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
          <motion.div variants={fadeInUpVariant} className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C9A227] bg-[#C9A227]/15 border border-[#C9A227]/30 px-3.5 py-1 rounded-full shadow-xs">
            <span>{t.contact.kicker}</span>
          </motion.div>
          <motion.h2 variants={fadeInUpVariant} className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.contact.heading}
          </motion.h2>
          <motion.p variants={fadeInUpVariant} className="text-slate-300 text-base leading-relaxed">
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
              <h3 className="text-xl font-bold text-white mb-2">{t.contact.directTitle}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
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
                className="bg-[#162D50] border border-[#23406D] rounded-2xl p-5 space-y-3 shadow-md hover:border-emerald-400/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.contact.waTitle}</h4>
                    <p className="text-xs text-[#C9A227] font-mono">
                      {businessConfig.contact.whatsappNumber}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  {t.contact.waSub}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsAppChat(businessConfig.contact.contactSectionWhatsappMessage)
                  }
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
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
                className="bg-[#162D50] border border-[#23406D] rounded-2xl p-5 space-y-3 shadow-md hover:border-pink-400/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400 flex items-center justify-center shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.contact.igTitle}</h4>
                    <p className="text-xs text-[#C9A227] font-mono">
                      {businessConfig.contact.instagramUsername}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  {t.contact.igSub}
                </p>
                <a
                  href={businessConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1E3A66] hover:bg-[#254A82] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all border border-[#2E5288] hover:border-[#C9A227]/40 shadow-xs active:scale-[0.98]"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>{t.contact.igBtn}</span>
                </a>
              </motion.div>

              {/* Direct Option 3: Email */}
              <motion.div
                variants={cardFadeInUpVariant}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-[#162D50] border border-[#23406D] rounded-2xl p-5 space-y-3 shadow-md hover:border-blue-400/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.contact.emailTitle}</h4>
                    <p className="text-xs text-[#C9A227] font-mono truncate">
                      {businessConfig.contact.email}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  {t.contact.emailSub}
                </p>
                <a
                  href={`mailto:${businessConfig.contact.email}?subject=${encodeURIComponent(
                    "Enquiry for DigWeb Expert Services"
                  )}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1E3A66] hover:bg-[#254A82] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all border border-[#2E5288] hover:border-[#C9A227]/40 shadow-xs active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
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
            <div className="bg-[#FFFFFF] border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#10233F]">{t.contact.formTitle}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.contact.formSub}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700 shrink-0 self-start sm:self-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Supabase Live ({SUPABASE_PROJECT_ID})</span>
                </div>
              </div>

              {successMessage ? (
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-6 text-emerald-900 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-bold text-base text-[#10233F]">
                        {t.contact.successTitle}
                      </h4>
                      <p className="text-xs leading-relaxed text-emerald-800">
                        {successMessage}
                      </p>
                    </div>
                  </div>

                  {successBooking && (
                    <div className="bg-white border border-emerald-200/80 rounded-xl p-4 text-xs space-y-2 text-[#10233F]">
                      <div className="font-semibold text-xs border-b border-slate-100 pb-2 flex items-center justify-between">
                        <span className="text-[#10233F] font-bold">Booking Appointment Summary</span>
                        <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                          {successBooking.savedToSupabase ? "✓ Saved to Supabase Database" : "Saved Locally"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-[11px] pt-1">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Client Name</span>
                          <span className="font-semibold text-[#10233F]">{successBooking.fullName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Service</span>
                          <span className="font-semibold text-[#10233F]">{successBooking.interestedService}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Appointment Date</span>
                          <span className="font-semibold text-[#10233F]">{successBooking.appointmentDate || "Flexible"}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Preferred Time Slot</span>
                          <span className="font-semibold text-[#10233F]">{successBooking.appointmentTime || "Morning"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    {successBooking && (
                      <button
                        type="button"
                        onClick={() =>
                          openWhatsAppChat(
                            `Hello Harshadsinh! I have booked a consultation appointment on your DigWeb Expert website.\n\n👤 Name: ${successBooking.fullName}\n💼 Business: ${successBooking.businessName || "N/A"}\n🎯 Service: ${successBooking.interestedService}\n📅 Preferred Date: ${successBooking.appointmentDate || "Flexible"}\n⏰ Preferred Time: ${successBooking.appointmentTime || "Morning"}\n📝 Requirements: ${successBooking.message}`
                          )
                        }
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-sm shadow-emerald-600/20 active:scale-[0.98] cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Confirm via WhatsApp</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSuccessMessage(null);
                        setSuccessBooking(null);
                      }}
                      className="w-full sm:w-auto text-xs font-semibold text-[#10233F] bg-white border border-slate-200 hover:bg-slate-50 py-2.5 px-4 rounded-xl transition-all text-center cursor-pointer"
                    >
                      {t.contact.sendAnother}
                    </button>
                  </div>
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
                      <label htmlFor="contact-fullname" className="block text-xs font-semibold text-[#10233F]">
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
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#10233F] placeholder-[#64748B] focus:bg-white focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/25 transition-all outline-none"
                        required
                      />
                    </div>

                    {/* Field 2: Business Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-business" className="block text-xs font-semibold text-[#10233F]">
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
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#10233F] placeholder-[#64748B] focus:bg-white focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/25 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Field 3: WhatsApp / Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#10233F]">
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
                          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-[#10233F] placeholder-[#64748B] focus:bg-white focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/25 transition-all outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Field 4: Email Address (Optional) */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[#10233F]">
                        Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="contact-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          maxLength={80}
                          disabled={isSubmitting}
                          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-[#10233F] placeholder-[#64748B] focus:bg-white focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/25 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Field 5: Interested Service */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-service" className="block text-xs font-semibold text-[#10233F]">
                        {t.contact.serviceLabel} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="contact-service"
                        value={interestedService}
                        onChange={(e) => setInterestedService(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#10233F] focus:bg-white focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/25 transition-all outline-none cursor-pointer"
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

                    {/* Field 6: Preferred Appointment Date */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-date" className="block text-xs font-semibold text-[#10233F] flex items-center justify-between">
                        <span>Preferred Appointment Date</span>
                        <span className="text-[10px] text-slate-400 font-normal">Calendar</span>
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        <input
                          id="contact-date"
                          type="date"
                          min={todayStr}
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          disabled={isSubmitting}
                          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-[#10233F] focus:bg-white focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/25 transition-all outline-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Field 7: Preferred Time Slot */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-time" className="block text-xs font-semibold text-[#10233F]">
                      Preferred Consultation Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <select
                        id="contact-time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-[#10233F] focus:bg-white focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/25 transition-all outline-none cursor-pointer"
                      >
                        <option value="Morning (10:00 AM - 01:00 PM)">Morning (10:00 AM - 01:00 PM)</option>
                        <option value="Afternoon (02:00 PM - 05:00 PM)">Afternoon (02:00 PM - 05:00 PM)</option>
                        <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM - 08:00 PM)</option>
                        <option value="Flexible / Anytime">Flexible / Anytime</option>
                      </select>
                    </div>
                  </div>

                  {/* Field 8: Message / Requirements */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#10233F]">
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
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#10233F] placeholder-[#64748B] focus:bg-white focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/25 transition-all resize-none outline-none"
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
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-[#E5A823] active:scale-[0.98] disabled:bg-[#C9A227]/50 text-[#10233F] text-xs font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-[#C9A227]/30 hover:shadow-2xl hover:shadow-amber-500/60 hover:-translate-y-1 focus:ring-2 focus:ring-[#C9A227]/50 focus:outline-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-[#10233F] border-t-transparent rounded-full animate-spin" />
                        <span>Saving Appointment to Supabase...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirm Appointment Booking & Save</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-start gap-2 text-[11px] text-slate-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                    <span>Appointment details are securely saved in your connected Supabase database and delivered directly to DigWeb Expert.</span>
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
