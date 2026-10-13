import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Check, MessageCircle, Phone, ArrowLeft, Layers, Sparkles, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Flooring & Carpet Installation Services Singapore | Hardwood & SPC - MACNEL",
  description:
    "Professional flooring and carpet services in Singapore. Hardwood floor installation, wood floor refinishing, floor polishing service, and commercial carpet installation.",
  keywords: siteConfig.serviceKeywords.flooringAndCarpet,
};

export default function FlooringCarpetPage() {
  const points = [
    "Residential and commercial carpet installation and carpet replacement",
    "Solid hardwood floor installation and bespoke parquet wood flooring installation",
    "Specialized hardwood floor refinishing and dust-free wood floor refinishing",
    "Diamond-pad marble and parquet floor polishing service for lustrous shine",
    "100% waterproof luxury vinyl tile (LVT) and SPC rigid core click-lock flooring",
    "Experienced commercial flooring contractors for offices, retail, and hospitality",
  ];

  return (
    <div className="bg-white">
      {/* Banner */}
      <section
        style={{ backgroundColor: "var(--dark-bg, #16263F)" }}
        className="relative overflow-hidden bg-[#16263F] text-white py-20 lg:py-24"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: "url('/images/carpentry/5.jpeg')",
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
              <Layers className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>Flooring &amp; Carpet Specialists · Singapore</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Flooring Carpet Services, Hardwood Installation &amp; Floor Refinishing
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm">
              From commercial carpet installation and residential carpet replacement to solid hardwood
              floor refinishing and vinyl SPC laying, our flooring installation contractors deliver
              immaculate finishes across Singapore.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20quotation%20for%20flooring%20and%20carpet%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Get Free Flooring Quote</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#A3E635]" />
                <span>Call {siteConfig.contact.phonePrimary}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Comprehensive Flooring Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mb-5">
              Top Flooring Installation Contractors in Singapore
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6 font-normal">
              Whether you need the best carpet installers near you for an office overhaul, a floor polishing
              service to bring life back to dull timber, or full hardwood floor installation, our team provides
              expert subfloor leveling, moisture barriers, and precise edge trimmings.
            </p>

            <div className="space-y-3 pt-2">
              {points.map((item, i) => (
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
              src="/images/carpentry/5.jpeg"
              alt="Hardwood floor refinishing and carpet installation"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Targeted Keywords */}
        <div className="p-6 rounded-2xl bg-[#F2F6F9] border border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
            Flooring &amp; Carpet Search Keywords:
          </span>
          <div className="flex flex-wrap gap-2">
            {siteConfig.serviceKeywords.flooringAndCarpet.map((kw) => (
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
