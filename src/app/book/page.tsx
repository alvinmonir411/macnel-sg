import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingSystem } from "@/components/BookingSystem";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Clock, Award, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Book an Appointment | Free Site Inspection | ${siteConfig.name}`,
  description:
    "Schedule a free on-site consultation and quotation in Singapore. Direct licensed contractor for toilet renovation, painting, tiling, false ceiling, and electrical works.",
};

export default function BookPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-[50vh] lg:min-h-[55vh] flex items-center py-16 lg:py-24 mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: "url('/images/tiling/11.jpeg')",
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
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/15 px-4 py-1.5 text-xs font-bold text-white mb-4 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>Fast &amp; Free On-Site Measurement</span>
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Book a Free Site Inspection
          </h1>

          <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed drop-shadow-sm">
            Pick a date and time that suits you. Our site engineer will arrive on time
            with measuring tools, laser levels, and material samples — 100% free with zero obligation.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* World-Class Booking System Component */}
        <Suspense
          fallback={
            <div className="p-16 text-center text-slate-500 font-bold bg-white rounded-3xl border border-slate-200">
              Loading booking calendar...
            </div>
          }
        >
          <BookingSystem />
        </Suspense>

        {/* Trust Guarantees Below */}
        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-primary-soft text-brand-primary flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">100% Free &amp; Non-Obligation</h4>
            <p className="text-xs text-slate-500">
              No pressure and zero hidden fees. Itemized quotation delivered in 24 hours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-primary-soft text-brand-primary flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Punctual &amp; Reliable</h4>
            <p className="text-xs text-slate-500">
              Our site engineers confirm via WhatsApp 1 hour prior to arrival.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-primary-soft text-brand-primary flex items-center justify-center mx-auto mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Direct Contractor Rate</h4>
            <p className="text-xs text-slate-500">
              Deal directly with Singapore craftsmen without middleman markups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
