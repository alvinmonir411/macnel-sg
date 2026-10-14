"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Search,
} from "lucide-react";
import { ServiceSearchModal } from "@/components/ServiceSearchModal";

export function Hero() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [heroSearchQuery, setHeroSearchQuery] = useState("");

  return (
    <section
      style={{ backgroundColor: "var(--dark-bg, #16263F)" }}
      className="relative overflow-hidden bg-[#16263F] text-white min-h-[calc(100vh-4.5rem)] lg:min-h-screen flex items-center"
    >
      {/* Background Image with Natural Color & High Impact */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none transition-transform duration-1000 scale-105"
        style={{
          backgroundImage:
            "url('/images/partition-ceiling/12.jpeg')",
          opacity: 0.68,
        }}
      />
      {/* Directional Gradient Overlay: deep readability on left, crystal clear vibrant view on right */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(22, 38, 63, 0.95) 0%, rgba(22, 38, 63, 0.84) 38%, rgba(22, 38, 63, 0.36) 72%, rgba(22, 38, 63, 0.62) 100%)",
        }}
      />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2C6BA6]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#8CCB6B]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="grid gap-12 lg:gap-14 lg:grid-cols-[1.25fr_.85fr] items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="flex flex-col gap-6 items-start">
            {/* Pill Badge */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/15 px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
              <span>{siteConfig.name} · Singapore Direct Contractor</span>
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

            {/* Live Interactive Service Search Bar */}
            <div className="w-full max-w-xl">
              <div
                onClick={() => setSearchModalOpen(true)}
                className="cursor-pointer group relative flex items-center gap-3 px-4 py-3 sm:py-3.5 rounded-2xl bg-white/15 hover:bg-white/20 border border-white/30 hover:border-[#A3E635] shadow-2xl backdrop-blur-xl transition-all"
              >
                <Search className="w-5 h-5 text-[#A3E635] group-hover:scale-110 transition-transform shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm text-slate-100 group-hover:text-white transition-colors block truncate font-medium">
                    Search any service (e.g. Bathroom Tilers, False Ceiling, Door Replacement)...
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-[#16263F] bg-[#A3E635] px-2 py-0.5 rounded shadow-sm">
                    Search Trades
                  </span>
                  <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black/40 border border-white/20 text-[10px] font-mono text-[#A3E635]">
                    ⌘K
                  </kbd>
                </div>
              </div>

              {/* Popular Search Suggestions Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2.5 text-xs text-slate-200">
                <span className="text-[11px] font-bold text-[#A3E635]">Popular:</span>
                {["Bathroom Tilers", "False Ceiling", "Door Replacement", "Nippon Paint", "SPC Flooring", "Toilet Renovation"].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setHeroSearchQuery(chip);
                      setSearchModalOpen(true);
                    }}
                    className="text-[11px] font-medium text-slate-100 hover:text-white bg-white/10 hover:bg-white/25 px-2.5 py-0.5 rounded-full border border-white/20 hover:border-[#A3E635] transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3.5 pt-1">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(
                  siteConfig.name
                )}%2C%20I%20would%20like%20a%20free%20quotation.`}
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

          {/* Right Column: High-Contrast Glassmorphic Card */}
          <div
            style={{ backgroundColor: "rgba(22, 38, 63, 0.82)" }}
            className="rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden bg-[#16263F]/85 border border-white/20 backdrop-blur-xl"
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

      {/* Hero Interactive Search Modal */}
      <ServiceSearchModal
        isOpen={searchModalOpen}
        onClose={() => {
          setSearchModalOpen(false);
          setHeroSearchQuery("");
        }}
        initialQuery={heroSearchQuery}
      />
    </section>
  );
}
