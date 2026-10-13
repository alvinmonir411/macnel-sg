import type { Metadata } from "next";
import { BookingSystem } from "@/components/BookingSystem";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Clock, Award, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Book an Appointment | Free Site Inspection | MACNEL Construction",
  description:
    "Schedule a free on-site consultation and quotation in Singapore. Direct licensed contractor for toilet renovation, painting, tiling, false ceiling, and electrical works.",
};

export default function BookPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Top Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent-soft bg-brand-accent-soft px-4 py-1.5 text-xs font-semibold text-brand-dark mb-4">
            <Clock className="w-3.5 h-3.5 text-brand-accent-dark" />
            <span>Fast &amp; Free On-Site Measurement</span>
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Book an Appointment
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            Pick a day and time that works best for you. Our licensed project engineers
            will visit your property with measuring gear and material samples.
          </p>
        </div>

        {/* World-Class Booking System Component */}
        <BookingSystem />

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
