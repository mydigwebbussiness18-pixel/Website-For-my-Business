import React, { useState, useEffect } from "react";
import { CustomerReview } from "../types";
import { getStoredReviews, updateReviewStatus } from "../services/storageService";
import { X, Check, Trash2, ShieldAlert, Star } from "lucide-react";

interface ReviewApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewsUpdated: () => void;
}

export const ReviewApprovalModal: React.FC<ReviewApprovalModalProps> = ({
  isOpen,
  onClose,
  onReviewsUpdated
}) => {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  useEffect(() => {
    if (isOpen) {
      setReviews(getStoredReviews());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = (id: string, status: "approved" | "rejected") => {
    updateReviewStatus(id, status);
    setReviews(getStoredReviews());
    onReviewsUpdated();
  };

  const filtered = reviews.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="moderation-title"
    >
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Close moderation panel"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold tracking-wider uppercase">
              <span>Owner Moderation Workflow</span>
            </div>
            <h2 id="moderation-title" className="text-xl font-bold text-[#0B132B] mt-1">
              Customer Reviews Approval Desk
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Public submissions are stored as <span className="text-amber-600 font-semibold">Pending</span> by default. Only reviews approved by you will appear on the live website.
            </p>
          </div>

          {/* Security & Prototype Architecture Notice */}
          <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-3.5 text-xs text-slate-700 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#0B132B] block">Production Security Note:</strong>
              In local preview mode, approvals update your browser storage. In production with Firebase Firestore, approval permissions are locked down with server-side security rules so visitors cannot self-approve reviews.
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            {(["pending", "approved", "rejected", "all"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  filter === tab
                    ? "bg-white text-blue-600 shadow-xs border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab} ({reviews.filter((r) => tab === "all" ? true : r.status === tab).length})
              </button>
            ))}
          </div>

          {/* Review List */}
          <div className="space-y-3 min-h-[160px]">
            {filtered.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl">
                <p className="text-xs text-slate-500">
                  No {filter !== "all" ? filter : ""} reviews found.
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Test the public review form in Section 5 to submit a sample customer review.
                </p>
              </div>
            ) : (
              filtered.map((r) => (
                <div
                  key={r.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0B132B]">{r.customerName}</span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            r.status === "approved"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : r.status === "rejected"
                              ? "bg-rose-100 text-rose-800 border border-rose-200"
                              : "bg-amber-100 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {r.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= r.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                        <span className="text-[11px] text-slate-400 ml-2">{r.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {r.status !== "approved" && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(r.id, "approved")}
                          className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 py-1.5 rounded-lg transition-colors font-semibold shadow-xs"
                          title="Approve and publish to public website"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )}
                      {r.status !== "rejected" && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(r.id, "rejected")}
                          className="flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs px-2.5 py-1.5 rounded-lg transition-colors font-semibold border border-rose-200"
                          title="Reject this submission"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200">
                    "{r.reviewText}"
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-700 hover:text-slate-900 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
