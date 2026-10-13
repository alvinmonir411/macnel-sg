import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MessageCircle, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section
      style={{ backgroundColor: "var(--dark-bg, #16263F)" }}
      className="relative overflow-hidden bg-[#16263F] text-white"
    >
      {/* Background Image with Controlled Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop')",
        }}
      />
      {/* Deep Navy Gradient Overlays for Guaranteed Text Legibility */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#16263F] via-[#16263F]/95 to-[#16263F]/85 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2C6BA6]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#8CCB6B]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-20 lg:pb-28">
        <div className="grid gap-12 lg:gap-14 lg:grid-cols-[1.25fr_.85fr] items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="flex flex-col gap-6 items-start">
            {/* Pill Badge */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/15 px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
              <span>MACNEL Construction Pte. Ltd · Singapore</span>
            </span>

            {/* Main Headline */}
            <h1 className="font-extrabold tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] leading-[1.08]">
              Construction &amp; renovation, <br />
              <span className="brand-gradient-text">handled by one team.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed max-w-xl drop-shadow-sm">
              Professional construction and renovation services tailored to your needs.
              From minor repairs to full-scale renovations, for condominiums, HDB flats,
              landed homes, and commercial spaces across Singapore.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20free%20quotation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp for Free Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Book Free Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/35 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition-all"
              >
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Quick Micro Badges */}
            <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 pt-5 text-xs sm:text-sm font-semibold text-slate-100 border-t border-white/20 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>Direct In-House Team</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>Zero Hidden Sub-contract Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>HDB &amp; BCA Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Contrast Spotlight Card */}
          <div
            style={{ backgroundColor: "rgba(30, 51, 82, 0.95)" }}
            className="rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden bg-[#1E3352]/95 border border-slate-600/80 backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8CCB6B]/20 rounded-full blur-2xl pointer-events-none" />

            <span className="block text-xs font-black uppercase tracking-[0.2em] text-[#A3E635]">
              Hacking to handover
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4 leading-tight text-white">
              Waterproofing, tiling, plumbing, electrical
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed mb-6">
              Skip the middleman and communicate directly with the builders doing the work.
              Quality workmanship guaranteed at transparent rates.
            </p>

            <div className="space-y-3.5 pb-6 border-b border-white/15 text-xs sm:text-sm font-medium text-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#8CCB6B]/20 flex items-center justify-center text-[#A3E635] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Strict multi-coat membrane waterproofing &amp; ponding tests</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#8CCB6B]/20 flex items-center justify-center text-[#A3E635] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>On-time project handover with dedicated site supervisor</span>
              </div>
            </div>

            {/* 3 Metric Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 text-center sm:text-left">
              <div>
                <strong className="block text-xl sm:text-2xl font-black text-white">
                  18+
                </strong>
                <span className="text-xs text-slate-300 font-medium leading-tight block mt-1">
                  Services under one roof
                </span>
              </div>
              <div>
                <strong className="block text-xl sm:text-2xl font-black text-white">
                  Mon–Sat
                </strong>
                <span className="text-xs text-slate-300 font-medium leading-tight block mt-1">
                  9:00 AM – 6:00 PM
                </span>
              </div>
              <div>
                <strong className="block text-xl sm:text-2xl font-black text-[#A3E635]">
                  Free
                </strong>
                <span className="text-xs text-slate-300 font-medium leading-tight block mt-1">
                  Site visit &amp; quote
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
