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
  ShieldCheck,
  DoorOpen,
  Wrench,
  Sparkles,
  CalendarCheck,
  ChevronDown,
  CheckCircle2,
  VolumeX,
  Lock,
  Compass,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Door & Window Replacement & Repair Singapore | BCA Approved - Renovation Contractor SG",
  description:
    "BCA-approved door & window replacement and repair services in Singapore. Front doors, acoustic double-glazed windows, toilet bi-fold doors, and sliding track repairs.",
  keywords: siteConfig.serviceKeywords.doorAndWindow,
};

export default async function DoorWindowPage() {
  const siteData = await getLiveSiteData();
  const overrides = siteData?.site_images || {};
  const pageData = siteData?.service_pages?.door_window;

  const heroImage =
    overrides["doors_windows_hero"] ||
    overrides["/images/door-window/4.jpeg"] ||
    pageData?.hero?.defaultImage ||
    "/images/door-window/4.jpeg";

  const categories = (pageData?.trades || []).map((t: any) => ({
    ...t,
    image: overrides[t.slotId] || overrides[t.image] || t.image,
  }));

  const faqs = pageData?.faqs || [];

  const glassSpecs = [
    {
      type: "Standard 5mm Clear Float Glass",
      noiseReduction: "18 - 22 dB",
      uvBlocking: "25%",
      bestFor: "Basic budget replacement in quiet, non-traffic residential estates.",
    },
    {
      type: "8.38mm Laminated Safety Glass",
      noiseReduction: "28 - 32 dB",
      uvBlocking: "95%",
      bestFor: "HDB bedroom windows facing neighborhood corridors and general playgrounds.",
    },
    {
      type: "Double Glazed Acoustic IGU (18mm - 24mm)",
      noiseReduction: "38 - 44 dB",
      uvBlocking: "99%",
      bestFor: "Expressway frontage, near MRT viaducts, heavy industrial corridors, and nursery rooms.",
    },
  ];

  const repairServices = [
    {
      issue: "Sagging or Loose Window Panels",
      fix: "Replacement of fatigued friction stays with certified BCA SS304 heavy-duty stainless arms.",
    },
    {
      issue: "Rainwater Infiltration & Leaks",
      fix: "Removal of degraded silicone seals, application of Dow Corning neutral-cure architectural weatherproofing.",
    },
    {
      issue: "Jammed Sliding Door Rollers",
      fix: "Replacing worn plastic rollers with dual stainless steel ball-bearing rollers and track realignment.",
    },
    {
      issue: "Door Lock & Handle Misalignment",
      fix: "Re-mortising lock strike plates, digital lock reinforcement, and heavy-duty latch adjustments.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-screen flex items-center py-20 lg:py-28">
        <LiveImage
          src={heroImage}
          slotId="doors_windows_hero"
          alt="Door and Window Replacement Singapore"
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
              <DoorOpen className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>{pageData?.hero?.subtitle || "BCA Approved Door & Window Specialist · Singapore"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              Door &amp; Window <br />
              <span className="text-[#8CCB6B]">Replacement, Soundproofing &amp; Repair</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-md">
              {pageData?.hero?.desc ||
                "Enhance home security, eliminate external traffic rumble, and prevent water ingress with certified craftsmanship. From fire-rated timber entrance doors to acoustic double glazing and bi-fold systems."}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20door%20and%20window%20replacement.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-2xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp For Door &amp; Window Quote</span>
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
                <p className="text-xl sm:text-2xl font-black text-white">BCA</p>
                <p className="text-xs text-slate-300 font-medium">Certified Installers</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">SS304</p>
                <p className="text-xs text-slate-300 font-medium">Stainless Rivets</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">-42 dB</p>
                <p className="text-xs text-slate-300 font-medium">Soundproof Glass</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">1-to-1</p>
                <p className="text-xs text-slate-300 font-medium">Fit Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (3 Core Categories) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {categories.map((cat: any, idx: number) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={cat.trade}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                    <LiveImage
                      src={cat.image}
                      slotId={cat.slotId}
                      alt={cat.title}
                      className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#16263F]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                      {cat.trade} · {cat.tag}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#16263F] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                      BCA Approved Hardware
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
                    {cat.trade} Specification
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2 leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mb-4">{cat.subtitle}</p>
                  <p className="text-slate-600 leading-relaxed mb-6 font-normal">{cat.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {cat.specs?.map((spec: string, sIdx: number) => (
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
      </section>

      {/* Acoustic & Glass Selection Table */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
              Performance Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
              Acoustic Glass &amp; Thermal Insulation Guide
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Selecting the appropriate glazing configuration depends heavily on exterior traffic exposure, orientation to the afternoon sun, and estate noise density.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {glassSpecs.map((spec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#8CCB6B]/20 text-[#4E9A3C] font-extrabold text-xs">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      Noise: {spec.noiseReduction}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{spec.type}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-6 font-normal leading-relaxed">
                    {spec.bestFor}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>UV Block: {spec.uvBlocking}</span>
                  <span className="text-[#4E9A3C]">BCA Compliant</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Window Hardware & Repair Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
              BCA Certified Repair Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
              Window Safety Maintenance &amp; Track Repairs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Singapore Building &amp; Construction Authority (BCA) mandates regular maintenance on older windows. We replace worn friction stays and aluminium rivets before safety dislodgements occur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairServices.map((service, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#8CCB6B]/60 transition-all hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-[#16263F] text-[#A3E635] flex items-center justify-center mb-4">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-2">{service.issue}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{service.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {faqs && faqs.length > 0 && (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
                Clarifications &amp; Permits
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-base font-bold text-[#0F172A] mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-[#16263F] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Need Door Replacement or BCA Window Inspection?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 font-normal text-sm sm:text-base leading-relaxed">
            Send us your door or window opening dimensions, site photos, or address for an immediate quotation and permit assessment.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20door%20and%20window%20inspection%20quote.`}
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
