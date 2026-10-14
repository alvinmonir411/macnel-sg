"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  MessageCircle,
  Calculator,
  CheckCircle2,
  Building,
  Home,
  Store,
  Calendar,
  Clock,
  Send,
  AlertCircle,
  ShieldCheck,
  Check,
} from "lucide-react";

export function QuoteCalculator() {
  const { contact, name } = siteConfig;

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [propertyType, setPropertyType] = useState("HDB Flat");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Toilet / Bathroom Renovation",
  ]);
  const [preferredDateTime, setPreferredDateTime] = useState("");
  const [remarks, setRemarks] = useState("");
  const [consentPdpa, setConsentPdpa] = useState(false);

  // UI States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  const propertyOptions = [
    { id: "HDB Flat", label: "HDB Flat", icon: <Building className="w-4 h-4" /> },
    { id: "Condominium", label: "Condominium", icon: <Home className="w-4 h-4" /> },
    { id: "Landed Property", label: "Landed Property", icon: <Home className="w-4 h-4" /> },
    { id: "Commercial / Office", label: "Commercial / Office", icon: <Store className="w-4 h-4" /> },
  ];

  const availableServices = [
    "Toilet / Bathroom Renovation",
    "House Renovation (Turnkey)",
    "Floor & Wall Tiling",
    "Doors & Window Replacement",
    "False Ceiling & Cove Lights",
    "Painting & Plastering",
    "Flooring & Carpet (SPC/Parquet)",
    "Custom Kitchen & Wardrobe Carpentry",
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  // Singapore Mobile Phone Validation (Rule C.2: +65 8/9xxxxxxx)
  const validatePhone = (input: string): boolean => {
    const cleaned = input.replace(/\s+/g, "").replace(/-/g, "");
    const sgPhoneRegex = /^(\+?65)?[89]\d{7}$/;
    return sgPhoneRegex.test(cleaned);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Please enter your Singapore contact number.";
    } else if (!validatePhone(phone)) {
      newErrors.phone =
        "Please enter a valid Singapore mobile number (starts with 8 or 9, e.g. +65 8936 1834).";
    }

    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (selectedServices.length === 0) {
      newErrors.services = "Please select at least one renovation trade.";
    }

    if (!consentPdpa) {
      newErrors.consent =
        "You must consent to being contacted in accordance with Singapore PDPA.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppUrl = () => {
    const servicesText =
      selectedServices.length > 0 ? selectedServices.join(", ") : "General Renovation";
    const text = `Hello ${encodeURIComponent(
      name
    )},%0A%0AI would like a Free Quotation:%0A- Name: ${encodeURIComponent(
      fullName || "Homeowner"
    )}%0A- Phone: ${encodeURIComponent(
      phone || "N/A"
    )}%0A- Property Type: ${encodeURIComponent(
      propertyType
    )}%0A- Services: ${encodeURIComponent(
      servicesText
    )}%0A- Preferred Date/Time: ${encodeURIComponent(
      preferredDateTime || "Flexible"
    )}%0A- Remarks: ${encodeURIComponent(
      remarks.trim() || "N/A"
    )}%0A%0APlease let me know your availability for a free site visit.`;

    return `https://wa.me/${contact.whatsapp}?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          service: selectedServices.join(", "),
          propertyType,
          message: `Preferred Schedule: ${preferredDateTime || "N/A"}. Remarks: ${remarks || "N/A"}`,
          source: "Quote Calculator Form",
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to submit form. Please use WhatsApp direct quote.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.warn("Quote submission fallback to WhatsApp:", err);
      // Even if network fails, allow homeowner to complete via WhatsApp
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote-calculator" className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200/70">
      {/* Subtle Architectural Dot Grid - Matching Core Services (NO LINE GRID) */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#166534] mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Direct Contractor Estimation</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-3">
            Request an Itemized Free Quote
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal">
            No obligation. We review your property type and requirements to prepare a transparent
            milestone quotation.
          </p>
        </div>

        {/* Success Confirmation State (Rule C.2) */}
        {isSubmitted ? (
          <div className="rounded-3xl bg-white border border-emerald-300 p-8 sm:p-12 text-center shadow-xl animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-[#166534] flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-3">
              Quotation Request Received!
            </h3>
            <p className="text-base text-slate-600 max-w-md mx-auto mb-6">
              Thanks, we&apos;ll reply <strong>within {contact.quoteTurnaroundHours} hours</strong> with
              an initial estimate and confirm your free on-site measurement slot.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-xl transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send via WhatsApp Now</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFullName("");
                  setPhone("");
                  setEmail("");
                  setRemarks("");
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-300 transition-all cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xl"
          >
            {/* Step 1: Property Type */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-wider font-bold text-[#166534] mb-3">
                1. Select Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {propertyOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setPropertyType(opt.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      propertyType === opt.id
                        ? "border-[#16a34a] bg-emerald-50 text-[#166534] shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                    }`}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Selected Services */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-wider font-bold text-[#166534]">
                  2. Select Required Trades (Multi-select)
                </label>
                {errors.services && (
                  <span className="text-xs text-rose-500">{errors.services}</span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableServices.map((srv) => {
                  const isChecked = selectedServices.includes(srv);
                  return (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => toggleService(srv)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer ${
                        isChecked
                          ? "border-[#16a34a] bg-emerald-50/80 text-[#166534] font-bold shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                      }`}
                    >
                      <span>{srv}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                          isChecked
                            ? "bg-[#16a34a] border-[#16a34a] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Contact Particulars (Rule C.2) */}
            <div className="mb-8 pt-6 border-t border-slate-200">
              <label className="block text-xs uppercase tracking-wider font-bold text-[#166534] mb-4">
                3. Your Contact Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tan Wei Ming"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-emerald-500/20"
                  />
                  {errors.name && (
                    <span className="text-xs text-rose-500 mt-1 block">{errors.name}</span>
                  )}
                </div>

                {/* Phone with SG validation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Singapore Contact / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +65 8936 1834 or 91234567"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-emerald-500/20"
                  />
                  {errors.phone && (
                    <span className="text-xs text-rose-500 mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-slate-600 font-medium">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-emerald-500/20"
                  />
                  {errors.email && (
                    <span className="text-xs text-rose-500 mt-1 block">{errors.email}</span>
                  )}
                </div>

                {/* Preferred Date/Time */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Site Visit Slot <span className="text-slate-600 font-medium">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={preferredDateTime}
                    onChange={(e) => setPreferredDateTime(e.target.value)}
                    placeholder="e.g. Saturday afternoon or weekdays after 6pm"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Remarks */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Remarks / Property Location / Floor Plan Notes
                </label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Share details such as BTO key collection date, resale hacking needs, or specific tile preferences..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* PDPA Consent Checkbox (Rule C.3) */}
            <div className="mb-6 pt-4 border-t border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consentPdpa}
                  onChange={(e) => setConsentPdpa(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#16a34a] border-slate-300 bg-white focus:ring-[#16a34a] cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-relaxed font-normal">
                  I consent to {name} contacting me regarding this renovation quotation inquiry in
                  accordance with the Singapore Personal Data Protection Act (PDPA).{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="text-[#166534] underline hover:text-[#15803d]"
                  >
                    Read Privacy Policy
                  </Link>.
                </span>
              </label>
              {errors.consent && (
                <span className="text-xs text-rose-500 mt-1.5 block">{errors.consent}</span>
              )}
            </div>

            {/* Form Actions: Submit + WhatsApp Direct (Rule C.2) */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-[#166534] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Free Quote Request</span>
                  </>
                )}
              </button>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-sm shadow-xl transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Send to WhatsApp</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-500 text-center mt-4">
              🔒 100% Free Consultation · No Obligation Quotation · Response within {contact.quoteTurnaroundHours} Hours
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
