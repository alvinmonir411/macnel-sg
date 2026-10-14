"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { MessageCircle, Calculator, CheckCircle2, Building, Home, Store } from "lucide-react";

export function QuoteCalculator() {
  const [propertyType, setPropertyType] = useState("HDB Flat");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Toilet Renovation",
  ]);
  const [addressOrNote, setAddressOrNote] = useState("");

  const propertyOptions = [
    { id: "HDB Flat", label: "HDB Flat", icon: <Building className="w-4 h-4" /> },
    { id: "Condominium", label: "Condominium", icon: <Home className="w-4 h-4" /> },
    { id: "Landed Property", label: "Landed Property", icon: <Home className="w-4 h-4" /> },
    { id: "Commercial / Office", label: "Commercial / Office", icon: <Store className="w-4 h-4" /> },
  ];

  const availableServices = [
    "Toilet / Bathroom Renovation",
    "House Painting & Plastering",
    "Floor & Wall Tiling",
    "False Ceiling & Cove Lights",
    "Electrical Works & Rewiring",
    "Custom Kitchen / Wardrobe Carpentry",
    "Plumbing & Sanitary Piping",
    "Vinyl / SPC Flooring",
    "Partition Drywall Works",
    "Balcony Decking / Metal Works",
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const generateWhatsAppUrl = () => {
    const servicesText = selectedServices.length > 0 ? selectedServices.join(", ") : "General Renovation";
    const text = `Hello ${encodeURIComponent(
      siteConfig.name
    )},%0A%0AI would like a Free Quotation:%0A- Property Type: ${encodeURIComponent(
      propertyType
    )}%0A- Services Needed: ${encodeURIComponent(servicesText)}%0A- Notes: ${encodeURIComponent(
      addressOrNote.trim() || "N/A"
    )}%0A%0APlease let me know your availability for a free site visit.`;

    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`;
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-brand-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Estimator</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Instant Free Quote Request
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Select your property type and services to generate an instant,
            customized WhatsApp consultation with our project managers.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
          {/* Step 1: Property Type */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-900 mb-3">
              1. Select Your Property Type:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {propertyOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setPropertyType(opt.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                    propertyType === opt.id
                      ? "border-brand-primary bg-brand-primary-soft text-brand-primary shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Services Needed */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-900 mb-3">
              2. Select Required Services (Multi-select):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {availableServices.map((srv) => {
                const isSelected = selectedServices.includes(srv);
                return (
                  <button
                    type="button"
                    key={srv}
                    onClick={() => toggleService(srv)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all ${
                      isSelected
                        ? "border-brand-primary bg-brand-primary-soft/40 text-slate-900"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-brand-primary text-white"
                          : "border border-slate-300 bg-slate-50"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span>{srv}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Additional Notes */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-900 mb-2">
              3. Location / Preferred Date / Specific Remarks (Optional):
            </label>
            <input
              type="text"
              value={addressOrNote}
              onChange={(e) => setAddressOrNote(e.target.value)}
              placeholder="e.g. 4-room flat in Tampines, target start date next month..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-slate-50"
            />
          </div>

          {/* Summary & Direct WhatsApp Submission */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              <span className="font-bold text-slate-800 block">
                {selectedServices.length} Service(s) selected for {propertyType}
              </span>
              <span>Free site inspection &amp; itemized quotation included.</span>
            </div>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Send to WhatsApp Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
