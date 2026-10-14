"use client";

import { siteConfig } from "@/config/site";
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

export function ContactLocationSection() {
  const { contact, socials, awards, name } = siteConfig;

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
                        Secondary: {contact.phoneSecondary}
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
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-md hover:scale-[1.01] transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Arrange Showroom Appointment</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Lazy-Loaded Google Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-100 min-h-[380px] shadow-sm relative">
            <iframe
              src={contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Renovation Contractor SG Office Location Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Social Proof Strip & Verified Profiles (Rule B.9) */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Globe className="w-4 h-4 text-[#16a34a]" />
            <span>Connect with our official profiles:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {socials.googleBusiness && (
              <a
                href={socials.googleBusiness.replace("TODO_REPLACE: ", "")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:text-slate-900 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Google Business</span>
                <ExternalLink className="w-3 h-3 text-[#16a34a]" />
              </a>
            )}

            {socials.facebook && (
              <a
                href={socials.facebook.replace("TODO_REPLACE: ", "")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:text-slate-900 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 text-[#16a34a]" />
              </a>
            )}

            {socials.instagram && (
              <a
                href={socials.instagram.replace("TODO_REPLACE: ", "")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:text-slate-900 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3 text-[#16a34a]" />
              </a>
            )}
          </div>

          {/* Awards / Media Mentions: Hidden if empty array (Rule B.9) */}
          {awards.length > 0 && (
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <div className="flex flex-wrap gap-2">
                {awards.map((award, i) => (
                  <span
                    key={i}
                    className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg font-medium"
                  >
                    {award}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
