import React, { useState, useEffect } from "react";
import {
  X,
  BookOpen,
  Code,
  FileText,
  CheckCircle2,
  Database,
  Calendar,
  Clock,
  Phone,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import {
  checkSupabaseHealth,
  fetchAppointmentsFromSupabase,
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  SUPABASE_SETUP_SQL,
  SupabaseHealthResult
} from "../services/supabaseClient";
import { getStoredAppointments } from "../services/storageService";
import { AppointmentBooking } from "../types";

interface OwnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerGuideModal: React.FC<OwnerGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"database" | "guide">("database");
  const [healthStatus, setHealthStatus] = useState<SupabaseHealthResult | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentBooking[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadStatusAndAppointments();
    }
  }, [isOpen]);

  const loadStatusAndAppointments = async () => {
    setIsTestingConnection(true);
    setIsLoadingAppointments(true);
    try {
      const health = await checkSupabaseHealth();
      setHealthStatus(health);

      const sbResult = await fetchAppointmentsFromSupabase();
      if (sbResult.success && sbResult.appointments.length > 0) {
        setAppointments(sbResult.appointments);
      } else {
        // Fallback to local storage appointments
        const local = getStoredAppointments();
        setAppointments(local);
      }
    } catch (err) {
      console.warn("Could not load Supabase data:", err);
      setAppointments(getStoredAppointments());
    } finally {
      setIsTestingConnection(false);
      setIsLoadingAppointments(false);
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (!isOpen) return null;

  const guideItems = [
    {
      q: "1. Which file contains the WhatsApp number?",
      file: "src/config/businessConfig.ts",
      answer: "Open `src/config/businessConfig.ts` and locate `contact.whatsappNumber: \"+91 9875274952\"`. Replace this with your desired international number. The website's floating button, contact links, and service inquiry buttons automatically read and re-format this number for wa.me."
    },
    {
      q: "2. How are appointment bookings stored in Supabase?",
      file: "src/services/supabaseClient.ts",
      answer: "All appointment bookings from the website form save directly to your Supabase project (ID: zrxedzbeowxylyxynrvk) in table `appointments`. If offline or if table is initializing, a local backup is also stored automatically."
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
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold tracking-wider uppercase">
              <Database className="w-4 h-4" />
              <span>DigWeb Expert Database & Control Hub</span>
            </div>
            <h2 id="guide-modal-title" className="text-2xl font-bold text-[#0B132B] mt-1">
              Owner Desk: Supabase & Configuration
            </h2>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed">
              Manage live appointment bookings saved in your Supabase database (<code className="font-mono text-blue-600 font-bold">{SUPABASE_PROJECT_ID}</code>) and maintain website configuration.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("database")}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "database"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Supabase Bookings ({appointments.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("guide")}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "guide"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Configuration Guide</span>
            </button>
          </div>

          {activeTab === "database" && (
            <div className="space-y-6">
              {/* Connection Status Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Supabase Cloud Database Status
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${healthStatus?.connected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                      <span className="text-sm font-bold text-[#0B132B]">
                        Project: {SUPABASE_PROJECT_ID}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={loadStatusAndAppointments}
                    disabled={isTestingConnection}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingConnection ? "animate-spin text-blue-600" : ""}`} />
                    <span>{isTestingConnection ? "Testing..." : "Test Connection"}</span>
                  </button>
                </div>

                <div className="text-xs bg-white rounded-xl p-3 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Endpoint:</span>
                    <span className="font-mono text-slate-700 truncate max-w-[280px]">{SUPABASE_URL}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Target Table:</span>
                    <span className="font-mono font-semibold text-blue-600">public.appointments</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Diagnostics:</span>
                    <span className={`font-medium ${healthStatus?.connected ? "text-emerald-700" : "text-amber-700"}`}>
                      {healthStatus?.message || "Connected to Supabase client."}
                    </span>
                  </div>
                </div>

                {/* 1-Click SQL Setup Script Drawer */}
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0B132B] flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-blue-600" />
                      Supabase SQL Schema (Run Once in SQL Editor)
                    </span>
                    <button
                      type="button"
                      onClick={copySqlToClipboard}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      {copiedSql ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSql ? "Copied SQL!" : "Copy SQL"}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    If your Supabase project does not yet have the <code className="font-mono font-bold text-blue-800">appointments</code> table, open your Supabase SQL editor and execute this script:
                  </p>
                  <pre className="text-[10px] bg-slate-900 text-slate-100 p-2.5 rounded-lg overflow-x-auto font-mono max-h-32">
                    {SUPABASE_SETUP_SQL}
                  </pre>
                </div>
              </div>

              {/* Booked Appointments List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0B132B]">
                    Recent Booking Appointments ({appointments.length})
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Newest first
                  </span>
                </div>

                {isLoadingAppointments ? (
                  <div className="text-center py-8 text-xs text-slate-500 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                    <span>Loading appointments...</span>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-10 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-semibold text-slate-600">No appointments recorded yet.</p>
                    <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                      When visitors submit the booking form in Section 8, their details will immediately appear here and save in your Supabase database.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {appointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#0B132B]">{apt.fullName}</h4>
                              {apt.businessName && apt.businessName !== "Not specified" && (
                                <span className="text-[11px] text-slate-500 bg-white border border-slate-200 px-2 py-0.2 rounded-md">
                                  {apt.businessName}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-blue-600 font-semibold">{apt.interestedService}</span>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-md block">
                              {apt.savedToSupabase ? "Supabase ✓" : "Local Backup"}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                              {new Date(apt.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-white rounded-xl p-2.5 border border-slate-200/70">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span>Date: <strong className="text-slate-800">{apt.appointmentDate || "Flexible"}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span>Time: <strong className="text-slate-800">{apt.appointmentTime || "Morning"}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>Phone: <strong className="text-slate-800 font-mono">{apt.phoneNumber}</strong></span>
                          </div>
                          {apt.email && (
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <span className="text-slate-400">@:</span>
                              <span className="font-mono truncate">{apt.email}</span>
                            </div>
                          )}
                        </div>

                        {apt.message && (
                          <p className="text-xs text-slate-600 italic bg-white/70 p-2.5 rounded-lg border border-slate-200/60">
                            "{apt.message}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "guide" && (
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
          )}

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
            >
              Close Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

