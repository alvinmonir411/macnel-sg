import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Check, MessageCircle, Phone, ArrowLeft, Home, ShieldCheck, Sparkles, CalendarCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "House Renovation Contractor Singapore | Home Renovation Company - MACNEL",
  description:
    "Top rated house renovation contractor in Singapore. Full home renovation, whole house renovation services, HDB, condo & landed properties handled by one direct builder team.",
  keywords: siteConfig.serviceKeywords.houseRenovation,
};

export default function HouseRenovationPage() {
  const servicePoints = [
    "Whole house renovation and turnkey home transformation across Singapore",
    "Direct house renovation contractor rates with zero ID middleman markups",
    "Complete HDB, condominium, and landed new home renovation planning",
    "In-house hacking, electrical rewiring, plumbing, tiling, and carpentry teams",
    "Transparent itemized quotations with milestone-based payment schedules",
    "Dedicated on-site project supervisor and guaranteed handover timeline",
  ];

  return (
    <div className="bg-white">
      {/* Page Banner */}
      <section
        style={{ backgroundColor: "var(--dark-bg, #16263F)" }}
        className="relative overflow-hidden bg-[#16263F] text-white py-20 lg:py-24"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: "url('/images/house-reno/1.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#16263F] via-[#16263F]/90 to-[#16263F]/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs text-[#A3E635] hover:underline mb-6 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/15 px-4 py-1.5 text-xs font-bold text-white mb-4">
              <Home className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>Direct House Renovation Contractor · Singapore</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Comprehensive House Renovation &amp; Home Transformation Services
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm">
              Looking for the best contractor for home renovation in Singapore? As a trusted direct home
              renovation company, MACNEL executes whole house renovations from hacking to final handover
              with our experienced in-house craftsmen.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20quotation%20for%20whole%20house%20renovation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Get Free Home Renovation Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"
              >
                <CalendarCheck className="w-4 h-4 text-[#A3E635]" />
                <span>Book Free Site Inspection</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Why Homeowners Trust Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mb-5">
              Ranked Among Singapore&apos;s Best Home Renovation Companies
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6 font-normal">
              Skip the frustration of managing multiple sub-contractors or paying inflated interior design
              markups. Whether you are moving into a new BTO flat, revamping an older resale apartment, or
              planning a luxury landed house renovation, we deliver superior craftsmanship with full
              transparency.
            </p>

            <div className="space-y-3 pt-2">
              {servicePoints.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#8CCB6B]/20 flex items-center justify-center text-[#4E9A3C] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img
              src="/images/house-reno/1.jpeg"
              alt="House renovation company Singapore"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Targeted Keyword Cloud */}
        <div className="p-6 rounded-2xl bg-[#F2F6F9] border border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
            Home Renovation Services &amp; Search Queries:
          </span>
          <div className="flex flex-wrap gap-2">
            {siteConfig.serviceKeywords.houseRenovation.map((kw) => (
              <span
                key={kw}
                className="text-xs font-semibold bg-white text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
