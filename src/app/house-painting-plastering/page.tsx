import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Check, MessageCircle, Phone, ArrowLeft, Paintbrush, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Painting Services SG & Plastering Services Singapore | MACNEL",
  description:
    "Top rated painting services SG & complete plastering services. Nippon paint service Singapore, room painting services, plaster wall repair, and professional house painters.",
  keywords: siteConfig.serviceKeywords.paintingAndPlastering,
};

export default function PaintingPage() {
  const points = [
    "Professional painting services sg and Nippon painting service Singapore for HDB, condo & landed homes",
    "Room painting services singapore and full house painting services with 2 full coats of premium paint",
    "Home painting services near me with careful masking of furniture, flooring, and electrical switches",
    "Complete plastering services sg including plaster wall repair, skimming, and hairline crack patching",
    "Plaster ceiling repair and anti-mould moisture-resistant ceiling coatings",
    "Professional plastering services and plaster house maintenance for smooth, blemish-free walls",
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
            backgroundImage: "url('/images/partition-ceiling/10.jpeg')",
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
              <Paintbrush className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>Painting &amp; Plastering Specialists · Singapore</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              House Painting Services SG &amp; Professional Plastering Services
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm">
              Looking for professional house painters or plaster wall repair near you? MACNEL delivers
              high-durability paint service Singapore, certified Nippon painting, and complete plastering
              services across Singapore with zero mess.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20quotation%20for%20painting%20and%20plastering%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Get Free Painting Quote</span>
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
              Flawless Wall Coating &amp; Skimming
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mb-5">
              Ranked Among Best Professional House Painters in Singapore
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6 font-normal">
              Whether you need plaster ceiling repair for water-damaged drywall, thorough plaster wall
              repair before fresh paint, or a full 4-room HDB Nippon painting service Singapore package,
              our in-house painters take care of meticulous taping, primer application, and cleanup.
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
              src="/images/partition-ceiling/10.jpeg"
              alt="Professional painting services sg and plastering"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Targeted Keywords */}
        <div className="p-6 rounded-2xl bg-[#F2F6F9] border border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
            Painting &amp; Plastering Search Keywords Covered:
          </span>
          <div className="flex flex-wrap gap-2">
            {siteConfig.serviceKeywords.paintingAndPlastering.map((kw) => (
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
