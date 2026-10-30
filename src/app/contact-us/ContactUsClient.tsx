"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export function ContactUsClient({ initialContact }: { initialContact?: any }) {
  const { contact: contextContact } = useSiteSettings();
  const contact = {
    ...siteConfig.contact,
    ...(initialContact || {}),
    ...(contextContact || {}),
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "Toilet Renovation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Persist to Neon PostgreSQL Database
    try {
      fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          message: `${formData.address ? `Address: ${formData.address}. ` : ""}${formData.message || ""}`,
          source: "contact-form",
        }),
      }).catch((err) => console.error("Error saving inquiry:", err));
    } catch (err) {
      console.error(err);
    }

    // Generate pre-filled WhatsApp message using LIVE contact number
    const targetWhatsapp = contact.whatsapp || siteConfig.contact.whatsapp;
    const msg = `Hello ${encodeURIComponent(siteConfig.name)},%0A%0ANew Quotation Inquiry:%0A- Name: ${encodeURIComponent(
      formData.name
    )}%0A- Phone: ${encodeURIComponent(formData.phone)}%0A- Service: ${encodeURIComponent(
      formData.service
    )}%0A- Address/Unit: ${encodeURIComponent(
      formData.address || "N/A"
    )}%0A- Message: ${encodeURIComponent(formData.message || "Please provide quotation.")}`;

    window.open(`https://wa.me/${targetWhatsapp}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const whatsappDisplay = (contact.whatsapp || "6581704063").replace(/^65/, "");
  const phoneCallTarget = contact.phoneTel || contact.phonePrimary.replace(/[^0-9+]/g, "");

  return (
    <div className="bg-white">
      {/* Page Banner */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-[60vh] lg:min-h-[70vh] flex items-center py-20 lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: "url('/images/partition-ceiling/4.jpeg')",
            opacity: 0.70,
          }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, rgba(22, 38, 63, 0.95) 0%, rgba(22, 38, 63, 0.82) 42%, rgba(22, 38, 63, 0.35) 75%, rgba(22, 38, 63, 0.60) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl w-full">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/10 px-4 py-1.5 text-xs font-semibold text-[#8CCB6B] mb-4">
            <span>Direct Contractor · Rapid Response</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Contact {siteConfig.name}
          </h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            Get in touch for a free site assessment, itemized quotation, or technical advice
            for your residential or commercial renovation project in Singapore.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info & Map */}
          <div className="rounded-3xl bg-[#F2F6F9] border border-slate-200 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-3">
                Get In Touch With Us
              </h2>
              <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                Reach out by phone, WhatsApp, or email. For fastest quotes and instant replies,
                message our project manager on WhatsApp.
              </p>

              <div className="space-y-6 mb-8">
                {/* Direct Hotline */}
                <a
                  href={`tel:${phoneCallTarget}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#2C6BA6] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2C6BA6]/10 flex items-center justify-center text-[#2C6BA6] group-hover:bg-[#2C6BA6] group-hover:text-white transition-all shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Direct Hotline
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      {contact.phonePrimary}
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=Hello%20${encodeURIComponent(siteConfig.name)}%2C%20I%20would%20like%20a%20free%20quotation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#25D366] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all shrink-0">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      WhatsApp Free Quote
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      +65 {whatsappDisplay} (Instant Reply)
                    </span>
                  </div>
                </a>

                {/* Live Dynamic Email */}
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#2C6BA6] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2C6BA6]/10 flex items-center justify-center text-[#2C6BA6] group-hover:bg-[#2C6BA6] group-hover:text-white transition-all shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Email Address
                    </span>
                    <span className="text-base font-bold text-slate-900 break-all">
                      {contact.email}
                    </span>
                  </div>
                </a>

                {/* Live Dynamic Address & Hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-[#2C6BA6]/10 flex items-center justify-center text-[#2C6BA6] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Office Address
                    </span>
                    <span className="text-sm font-bold text-slate-900 block leading-snug">
                      {contact.address}
                    </span>
                    <span className="text-xs text-slate-500 mt-1 block">
                      Operating: {contact.operatingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-slate-200 shadow-sm mt-4">
              <iframe
                title={`${siteConfig.name} Singapore Location`}
                src="https://www.google.com/maps?q=Jalan%20Besar%20Plaza%2C%20101%20Kitchener%20Road%2C%20Singapore%20208511&z=16&output=embed"
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Interactive Quotation Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Free Site Inspection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-3">
              Request A Free Quotation
            </h2>
            <p className="text-sm text-slate-600 mb-8 leading-relaxed">
              Fill out this quick form and our project engineer will prepare an estimate
              or arrange a free on-site measurement.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#8CCB6B]/15 border border-[#8CCB6B]/40 text-center">
                <CheckCircle2 className="w-12 h-12 text-[#4E9A3C] mx-auto mb-3" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h3>
                <p className="text-sm text-slate-700 mb-6">
                  Your details have been prepped for WhatsApp consultation. We look forward
                  to assisting you!
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#2C6BA6] underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Tan"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6BA6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +65 9123 4567"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6BA6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6BA6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Service Required *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6BA6] bg-white"
                  >
                    <option value="Toilet Renovation">Toilet / Bathroom Renovation</option>
                    <option value="House Painting & Plastering">House Painting &amp; Plastering</option>
                    <option value="Floor & Wall Tiling">Floor &amp; Wall Tiling</option>
                    <option value="False Ceiling & Lighting">False Ceiling &amp; Lighting</option>
                    <option value="Electrical Rewiring">Electrical Works / Rewiring</option>
                    <option value="Custom Carpentry">Custom Carpentry &amp; Cabinets</option>
                    <option value="Plumbing Works">Plumbing Works</option>
                    <option value="Full House Renovation">Full House Renovation</option>
                    <option value="Other Service">Other Construction Trades</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Property Location / Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. 520123 / Tampines Ave 5"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6BA6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Project Details / Remarks
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe what you need done..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6BA6]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.01] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Quotation Request via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

