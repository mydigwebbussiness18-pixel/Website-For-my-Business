import React from "react";
import { ServiceItem } from "../types";
import { useLanguage } from "../i18n/LanguageContext";
import { openWhatsAppChat } from "../utils/whatsapp";
import { X, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  const { t } = useLanguage();

  if (!service) return null;

  // Find matching localized service data if available
  const localizedService =
    t.services.items.find((s) => s.id === service.id) || service;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label={t.modals.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              {t.modals.serviceOverview}
            </span>
            <h2 id="service-modal-title" className="text-2xl font-bold text-[#0B132B] mt-3">
              {localizedService.title}
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              {localizedService.fullDescription}
            </p>
          </div>

          {localizedService.idealFor && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                {t.modals.idealFor}
              </span>
              <p className="text-sm text-slate-800 font-medium">{localizedService.idealFor}</p>
            </div>
          )}

          <div>
            <h3 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-3">
              {t.modals.coreCapabilities}
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {localizedService.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {localizedService.deliverables && localizedService.deliverables.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-3">
                {t.modals.keyDeliverables}
              </h3>
              <ul className="space-y-2">
                {localizedService.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              {t.modals.directConsultNote}
            </span>
            <button
              type="button"
              onClick={() => {
                openWhatsAppChat(localizedService.whatsappMessage);
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98] whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.modals.getServiceWhatsApp}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
