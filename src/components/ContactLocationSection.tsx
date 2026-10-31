"use client";

import { siteConfig } from "@/config/site";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  ExternalLink,
  MessageCircle,
  Award,
  Globe,
} from "lucide-react";

export function ContactLocationSection({ contact: customContact }: { contact?: any } = {}) {
  const { contact: contextContact } = useSiteSettings();
  const contact = { ...siteConfig.contact, ...(customContact || {}), ...(contextContact || {}) };
  const { socials, awards, name } = siteConfig;

  return (
    <section id="contact-location" className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200/70">
      {/* Subtle Architectural Dot Grid - Matching Core Services (NO LINE GRID) */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#166534] mb-2.5">
            Physical Presence &amp; Support
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-4">
            Visit Our Office &amp; Material Library
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {contact.showroomNote.replace("TODO_REPLACE: ", "")}
          </p>
        </div>

        {/* 2-Column Grid: Details on Left, Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          {/* Left Column: Direct Contact Information */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-6 h-6 text-[#16a34a]" />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Office &amp; Contact Details
                </h3>
              </div>

              <div className="space-y-6 text-sm text-slate-700">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#16a34a]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block mb-1">
                      Office / Showroom Location
                    </span>
                    <span className="font-semibold text-slate-900 leading-relaxed block">
                      {contact.address.replace("TODO_REPLACE: ", "")}
                    </span>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#16a34a]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block mb-1">
                      Direct Hotline &amp; Consultation
                    </span>
                    <div className="space-y-1">
                      <a
                        href={`tel:${contact.phoneTel}`}
                        className="font-bold text-slate-900 hover:text-[#166534] transition-colors block"
                      >
                        {contact.phonePrimary}
                      </a>
                      <span className="text-xs text-slate-500 block">
                        WhatsApp: +65 {contact.whatsapp.slice(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#16a34a]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block mb-1">
                      Email Inquiries
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-bold text-slate-900 hover:text-[#166534] transition-colors block"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#16a34a]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block mb-1">
                      Operating Hours
                    </span>
                    <span className="font-semibold text-slate-900 block">
                      {contact.operatingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-8 mt-6 border-t border-slate-100">
              <a
                href={`https://wa.me/${contact.whatsapp}?text=Hello%20${encodeURIComponent(
                  name
                )}%2C%20I%20would%20like%20to%20arrange%20a%20showroom%20visit.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm relative min-h-[420px] bg-slate-100 flex flex-col">
            <iframe
              src={contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${name} Office Location`}
              className="w-full flex-1 min-h-[380px]"
            />
            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#16a34a]" />
                <span className="font-medium text-slate-900">
                  {contact.address.replace("TODO_REPLACE: ", "")}
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=101+Kitchener+Road+Jalan+Besar+Plaza+Singapore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#166534] hover:underline"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Social Proof Strip & Industry Recognition */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#166534] block mb-1">
                Verified Socials &amp; Updates
              </span>
              <p className="text-slate-600 text-sm">
                Follow our ongoing site installations, weekly handover photos, and Singapore renovation tips.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {socials.facebook && !socials.facebook.includes("TODO_REPLACE") && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-[#1877F2] hover:text-[#1877F2] text-xs font-bold transition-all text-slate-700"
                >
                  <Globe className="w-4 h-4" />
                  <span>Facebook Page</span>
                </a>
              )}
              {socials.instagram && !socials.instagram.includes("TODO_REPLACE") && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-[#E4405F] hover:text-[#E4405F] text-xs font-bold transition-all text-slate-700"
                >
                  <Globe className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}
              {socials.googleBusiness && !socials.googleBusiness.includes("TODO_REPLACE") && (
                <a
                  href={socials.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-[#4285F4] hover:text-[#4285F4] text-xs font-bold transition-all text-slate-700"
                >
                  <Award className="w-4 h-4" />
                  <span>Google Profile</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
