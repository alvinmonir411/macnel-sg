"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  MessageCircle,
} from "lucide-react";

// Cookie helper utilities
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Developer helpers accessible in browser console:
    // Run window.showLeadPopup() to instantly see it!
    (window as any).showLeadPopup = () => setIsOpen(true);
    (window as any).resetLeadPopup = () => {
      document.cookie = "macnel_lead_seen_v1=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      try {
        localStorage.removeItem("macnel_lead_submitted");
      } catch {}
      setIsOpen(true);
    };

    // Check if force query param is present e.g. /?popup=true or #popup
    let forceShow = false;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      forceShow = searchParams.get("popup") === "true" || window.location.hash === "#popup";
    } catch {}

    // Check Cookie: has this visitor already seen/dismissed the popup?
    const hasSeenCookie = getCookie("macnel_lead_seen_v1");
    let hasSubmittedLocal = false;
    try {
      hasSubmittedLocal = Boolean(localStorage.getItem("macnel_lead_submitted"));
    } catch {}

    // If visitor has already seen the popup (cookie exists) and not in force mode, do not show again
    if (!forceShow && (hasSeenCookie || hasSubmittedLocal)) {
      return;
    }

    // Trigger popup exactly 1.5 seconds (1500ms) after page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Listen for Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        handleDismiss();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    // Set cookie for 7 days so the visitor only sees it once
    setCookie("macnel_lead_seen_v1", "dismissed", 7);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedPhone || trimmedPhone.length < 6) {
      setErrorMessage("Please enter a valid contact / WhatsApp number.");
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: trimmedPhone,
          email: trimmedEmail,
          source: "website_popup_cookie",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        // Set cookie for 30 days so they don't see it again after submitting
        setCookie("macnel_lead_seen_v1", "submitted", 30);
        try {
          localStorage.setItem("macnel_lead_submitted", "true");
        } catch {}

        // Auto close after 3.5 seconds
        setTimeout(() => {
          setIsOpen(false);
        }, 3500);
      } else {
        setErrorMessage(data.error || "Failed to submit. Please try again or WhatsApp us directly.");
      }
    } catch (err) {
      setErrorMessage("Connection error. Please try again or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleDismiss}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#0A1322] border border-white/20 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-in zoom-in-95 duration-300 ring-1 ring-white/10">
        {/* Glow Accent Header */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#E87722] via-[#8CCB6B] to-[#38BDF8]" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors z-20 cursor-pointer"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {!isSuccess ? (
            <>
              {/* Brand Header & Headline */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md ring-2 ring-white/20 overflow-hidden">
                  <Image
                    src="/macnel-brand-badge.png"
                    alt="Macnel Renovation Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8CCB6B]/20 text-[#8CCB6B] border border-[#8CCB6B]/30 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Direct Contractor Exclusive</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                    Get Free Quotation & Site Assessment
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                Connect directly with in-house master tilers and carpenters. Cut out middleman markups and receive transparent itemized pricing.
              </p>

              {/* Value Highlights */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-slate-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#8CCB6B] shrink-0" />
                  <span>No Middleman Fees</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-slate-200 font-semibold">
                  <Clock className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>2-Hour Rapid Response</span>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-200 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Lead Capture Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Phone Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Phone / WhatsApp Number <span className="text-[#E87722]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+65 8123 4567 / Your Phone"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.07] border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8CCB6B] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Email Address <span className="text-[#E87722]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.07] border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8CCB6B] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E87722] via-[#E87722] to-[#ff9344] hover:brightness-110 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#E87722]/30 transition-all disabled:opacity-50 cursor-pointer active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Claim Free Quote & Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Dismiss Link */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  No thanks, I will browse first
                </button>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#8CCB6B]/20 border border-[#8CCB6B]/40 text-[#8CCB6B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white">
                Thank You! Quote Request Received
              </h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Our master contractor will review your request and get in touch via WhatsApp / Phone shortly with indicative rates.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/6581704063?text=${encodeURIComponent(
                    "Hello Macnel Renovation, I just requested a quotation through your website popup."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors cursor-pointer"
                >
                  Close & Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
