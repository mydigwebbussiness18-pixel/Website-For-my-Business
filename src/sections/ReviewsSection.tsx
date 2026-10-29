import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CustomerReview } from "../types";
import { getApprovedReviews, submitNewReview } from "../services/storageService";
import { useLanguage } from "../i18n/LanguageContext";
import {
  containerStaggerVariants,
  gridStaggerVariants,
  fadeInUpVariant,
  cardFadeInUpVariant,
  defaultViewport
} from "../utils/animations";
import { Star, MessageSquarePlus, ShieldCheck, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface ReviewsSectionProps {
  onOpenModeration: () => void;
  reviewUpdateCounter: number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  onOpenModeration,
  reviewUpdateCounter
}) => {
  const { t } = useLanguage();
  const [approvedReviews, setApprovedReviews] = useState<CustomerReview[]>([]);

  // Review Form State
  const [fullName, setFullName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState("");
  const [hoverRating, setHoverRating] = useState<number>(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState<string | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setApprovedReviews(getApprovedReviews());
  }, [reviewUpdateCounter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErrorMessage(null);
    setSubmitSuccessMessage(null);

    // Validation checks
    if (!fullName.trim() || fullName.trim().length < 2) {
      setSubmitErrorMessage(
        t.reviews.nameLabel + " (minimum 2 characters required)"
      );
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      setSubmitErrorMessage("Please select a rating between 1 and 5 stars.");
      return;
    }
    if (!reviewText.trim() || reviewText.trim().length < 10) {
      setSubmitErrorMessage(t.reviews.minLength);
      return;
    }
    if (reviewText.trim().length > 800) {
      setSubmitErrorMessage("Review text cannot exceed 800 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitNewReview({
        customerName: fullName.trim(),
        rating,
        reviewText: reviewText.trim()
      });

      setSubmitSuccessMessage(t.reviews.successMessage);
      setFullName("");
      setRating(5);
      setReviewText("");
    } catch (err: any) {
      setSubmitErrorMessage(err?.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="reviews"
      className="py-24 bg-[#FAFAFC] relative"
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
            <span>{t.reviews.kicker}</span>
          </motion.div>
          <motion.h2 variants={fadeInUpVariant} className="text-3xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
            {t.reviews.heading}
          </motion.h2>
          <motion.p variants={fadeInUpVariant} className="text-slate-600 text-base leading-relaxed">
            {t.reviews.subheading}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Part A: Approved Customer Reviews List (col-span-7) */}
          <motion.div
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-[#0B132B]">
                {t.reviews.approvedTitle}
              </h3>
              <button
                type="button"
                onClick={onOpenModeration}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors bg-blue-50 hover:bg-blue-100/70 border border-blue-200/80 px-2.5 py-1 rounded-lg cursor-pointer"
                title="Open Review Approval Workflow Desk"
              >
                {t.reviews.ownerDeskBtn}
              </button>
            </div>

            {approvedReviews.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#0B132B]">
                  {t.reviews.emptyText}
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  {t.reviews.emptySubtext}
                </p>
              </div>
            ) : (
              <motion.div
                variants={gridStaggerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                className="space-y-4"
              >
                {approvedReviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    variants={cardFadeInUpVariant}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-[#0B132B]">{rev.customerName}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">{rev.createdAt}</span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
                      "{rev.reviewText}"
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Part B: Submit Your Review Form (col-span-5) */}
          <motion.div
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-5"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>{t.reviews.formKicker}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0B132B]">{t.reviews.formTitle}</h3>
                <p className="text-xs text-slate-500">
                  {t.reviews.formSubtitle}
                </p>
              </div>

              {submitSuccessMessage ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-800 space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{submitSuccessMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitSuccessMessage(null)}
                    className="text-xs font-semibold underline text-emerald-700 hover:text-emerald-900 cursor-pointer"
                  >
                    {t.reviews.submitAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitErrorMessage && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{submitErrorMessage}</span>
                    </div>
                  )}

                  {/* Field 1: Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="review-name" className="block text-xs font-medium text-slate-700">
                      {t.reviews.nameLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.reviews.namePlaceholder}
                      maxLength={80}
                      disabled={isSubmitting}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      required
                    />
                  </div>

                  {/* Field 2: Star Rating: 1-5 */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-700">
                      {t.reviews.ratingLabel} <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 py-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                            aria-label={`Rate ${star} out of 5 stars`}
                          >
                            <Star
                              className={`w-6 h-6 transition-colors ${
                                (hoverRating || rating) >= star
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-slate-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 font-mono">
                        {rating} {t.reviews.ratingCount}
                      </span>
                    </div>
                  </div>

                  {/* Field 3: Write Your Review */}
                  <div className="space-y-1.5">
                    <label htmlFor="review-text" className="block text-xs font-medium text-slate-700">
                      {t.reviews.reviewLabel} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="review-text"
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder={t.reviews.reviewPlaceholder}
                      maxLength={800}
                      disabled={isSubmitting}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none outline-none"
                      required
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{t.reviews.minLength}</span>
                      <span>{reviewText.length}/800</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold py-3 px-4 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{t.reviews.submittingBtn}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{t.reviews.submitBtn}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-start gap-2 text-[11px] text-slate-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{t.reviews.securityNote}</span>
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
