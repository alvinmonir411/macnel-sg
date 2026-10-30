import { LiveImage } from "@/components/LiveImage";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getLiveSiteData } from "@/lib/db";
import {
  Check,
  MessageCircle,
  Phone,
  ArrowLeft,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  CalendarCheck,
  ChevronDown,
  CheckCircle2,
  Award,
  Gem,
  Droplets,
  Wind,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Flooring & Carpet Installation Services Singapore | Hardwood & SPC - Renovation Contractor SG",
  description:
    "Professional flooring and carpet contractors in Singapore. Solid hardwood parquet sanding & varnishing, 100% waterproof SPC vinyl, commercial carpet tiles & marble floor polishing.",
  keywords: siteConfig.serviceKeywords.flooringAndCarpet,
};

export default async function FlooringCarpetPage() {
  const siteData = await getLiveSiteData();
  const overrides = siteData?.site_images || {};
  const pageData = siteData?.service_pages?.flooring_carpet;

  const heroImage =
    overrides["flooring_hero"] ||
    overrides["/images/flooring/hero.jpeg"] ||
    pageData?.hero?.defaultImage ||
    "/images/flooring/hero.jpeg";

  const flooringTrades = (pageData?.trades || []).map((t: any) => ({
    ...t,
    image: overrides[t.slotId] || overrides[t.image] || t.image,
  }));

  const faqs = pageData?.faqs || [];

  const flooringMatrix = [
    {
      material: "Solid Teak Parquet",
      waterResistance: "Moderate (wipe spills promptly)",
      scratchResist: "High (can be re-sanded 5-7 times)",
      lifespan: "50+ Years",
      bestApplication: "Living rooms, master bedrooms, luxury penthouses",
    },
    {
      material: "Rigid Core SPC Vinyl",
      waterResistance: "100% Waterproof",
      scratchResist: "Very High (0.5mm commercial wear layer)",
      lifespan: "15 - 25 Years",
      bestApplication: "Kitchens, rental units, pet-friendly homes",
    },
    {
      material: "Commercial Carpet Tile",
      waterResistance: "Stain-resistant nylon (fast single tile replacement)",
      scratchResist: "Castor chair resilient (Class 33)",
      lifespan: "10 - 15 Years",
      bestApplication: "Offices, meeting rooms, sound studios",
    },
    {
      material: "Natural Italian Marble",
      waterResistance: "Porous (requires chemical fluoropolymer sealer)",
      scratchResist: "Moderate (restored via diamond crystallization)",
      lifespan: "Lifetime / Generational",
      bestApplication: "Grand entryways, living halls, vanity floors",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-screen flex items-center py-20 lg:py-28">
        <LiveImage
          src={heroImage}
          slotId="flooring_hero"
          alt="Flooring and Carpet Services Singapore"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105 transition-transform duration-1000"
          style={{ opacity: 0.85 }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(22, 38, 63, 0.94) 0%, rgba(22, 38, 63, 0.78) 45%, rgba(22, 38, 63, 0.25) 75%, rgba(22, 38, 63, 0.55) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs text-[#A3E635] hover:underline mb-6 font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/15 px-4 py-1.5 text-xs font-bold text-white mb-6 backdrop-blur-md">
              <Layers className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>{pageData?.hero?.subtitle || "Singapore Flooring Specialist · Direct In-House Installers"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              {pageData?.hero?.title || "Engineered Flooring, Parquet Restoration & Commercial Carpet"}
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-md">
              {pageData?.hero?.desc || "From German Bona 99% dust-free parquet sanding to 100% waterproof click SPC vinyl and high-traffic acoustic commercial carpet tiles. Installed by dedicated local flooring specialists."}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20flooring%20and%20carpet%20installation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-2xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp For Flooring Quote</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-all"
              >
                <Phone className="w-4 h-4 text-[#A3E635]" />
                <span>Call {siteConfig.contact.phonePrimary}</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20">
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">99%</p>
                <p className="text-xs text-slate-300 font-medium">Dust-Free Bona Sanding</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">0%</p>
                <p className="text-xs text-slate-300 font-medium">Formaldehyde (E0)</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">100%</p>
                <p className="text-xs text-slate-300 font-medium">Waterproof SPC Core</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">Class 33</p>
                <p className="text-xs text-slate-300 font-medium">Heavy Commercial Wear</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (4 Core Trades) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
              Comprehensive Trade Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
              Flooring Solutions For Every Surface
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Every material requires dedicated tools and precision subfloor preparation. Explore our in-house trade capabilities below.
            </p>
          </div>

          <div className="space-y-24">
            {flooringTrades.map((floor: any, idx: number) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={floor.trade}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Visual Side */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                      <LiveImage
                        src={floor.image}
                        slotId={floor.slotId}
                        alt={floor.title}
                        className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-[#16263F]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                        {floor.trade} · {floor.tag}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#16263F] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                        Guaranteed Workmanship
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
                      {floor.trade} Specification
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2 leading-tight">
                      {floor.title}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500 mb-4">{floor.subtitle}</p>
                    <p className="text-slate-600 leading-relaxed mb-6 font-normal">{floor.desc}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {floor.specs?.map((spec: string, sIdx: number) => (
                        <div key={sIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#8CCB6B] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Material Comparison Matrix */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
              Objective Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
              Flooring Material Selection Matrix
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Compare lifespan, water tolerance, and maintenance requirements across popular Singapore residential and commercial floor coverings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flooringMatrix.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#8CCB6B]/20 text-[#4E9A3C] font-extrabold text-xs">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {item.lifespan}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3">{item.material}</h3>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-600 mb-6 font-normal">
                    <p><strong className="text-slate-800">Water:</strong> {item.waterResistance}</p>
                    <p><strong className="text-slate-800">Durability:</strong> {item.scratchResist}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                  <span>Best for: {item.bestApplication}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
              Common Inquiries
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq: any, idx: number) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-[#0F172A] mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#16263F] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Transform Your Floors with Expert Craftsmanship
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 font-normal text-sm sm:text-base leading-relaxed">
            Contact us for sample catalogues, on-site subfloor moisture inspections, and transparent area-based quotations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20flooring%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Us Now</span>
            </a>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-[#A3E635]" />
              <span>Book Site Inspection</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
