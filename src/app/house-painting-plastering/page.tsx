"use client";

import { LiveImage } from "@/components/LiveImage";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import {
  Paintbrush,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";

const paintingScopes = [
  {
    title: "Nippon Odourless All-In-1 Interior Coating",
    tag: "Families & Kids",
    desc: "Ultra-low VOC paint with near-zero odor, allowing your family to safely sleep in the house on the very same day of painting.",
    specs: "Zero formaldehyde · Anti-bacterial · Smooth eggshell finish",
  },
  {
    title: "Whole-House Wall Skim Coating & Plaster Smoothing",
    tag: "Flawless Walls",
    desc: "Erases uneven drywall joints, old peeling paint scars, and hollow plaster cracks, delivering flat, silky-smooth surfaces before painting.",
    specs: "Saint-Gobain skim coat · Machine power sanding · Level 5 wall finish",
  },
  {
    title: "Water-Damaged Ceiling Repair & Stain Sealer",
    tag: "Ceiling Restoration",
    desc: "Removes unsightly yellow watermarks from previous upstairs pipe leaks using oil-based stain-blocking primer that prevents stains from bleeding through.",
    specs: "Oil-based stain blocker · Anti-fungal topcoat · Moisture barrier",
  },
  {
    title: "Exterior Weatherbond & Balcony Facades",
    tag: "Landed & Balconies",
    desc: "High-durability acrylic exterior emulsion engineered to resist Singapore's tropical torrential rain, harsh UV sun exposure, and algae growth.",
    specs: "10-Year weather resistance · Dirt pickup resistance · UV stable",
  },
];

const paintingProcess = [
  {
    step: "01",
    title: "100% Furniture Wrapping & Floor Protection",
    image: "/images/doc-updates/image41.jpg",
    desc: "Before opening a single can of paint, our team covers all flooring with heavy-duty corrugated cardboard and wraps sofas, electronics, and cabinetry in electrostatic dust-protection plastic sheets.",
  },
  {
    step: "02",
    title: "Surface Scraping, Plaster Patching & Skimming",
    image: "/images/doc-updates/image68.jpg",
    desc: "We scrape off loose flaking paint, dig out old nail anchors, patch wall cracks with high-adhesion putty, and skim uneven patches until every square inch is glass-smooth.",
  },
  {
    step: "03",
    title: "Alkaline-Resistant Sealer & 2 Finish Coats",
    image: "/images/doc-updates/image5.jpg",
    desc: "We apply a full coat of alkali-resistant sealer to block moisture and ensure color brilliance. Followed by two thick, uniform topcoats of authentic Nippon Paint applied with precision microfiber rollers.",
  },
];

const faqs = [
  {
    q: "How long does whole-house painting take for a 4-room or 5-room HDB flat?",
    a: "A complete whole-house repainting (living hall, dining, all bedrooms, kitchen, and both bathrooms) takes 2 to 3 working days with our dedicated team of 3 painters.",
  },
  {
    q: "Do you use authentic Nippon Paint or diluted contractor paint?",
    a: "We use 100% genuine, undiluted Nippon Paint delivered in factory-sealed cans. You are welcome to inspect all paint cans on site before we begin.",
  },
  {
    q: "Do we need to move our heavy furniture before the painters arrive?",
    a: "No! Our painters will carefully shift sofas, beds, and tables to the center of each room, wrap them securely with protective sheeting, and place everything back exactly where it belongs upon completion.",
  },
];

export default function PaintingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-[85vh] lg:min-h-screen flex items-center py-20 lg:py-28">
        <LiveImage src={"/images/painting/hero.jpeg"}
          alt="House Painting Services SG and Plastering"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-1000 scale-105"
          style={{ opacity: 0.85 }}
        />

        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(22, 38, 63, 0.94) 0%, rgba(22, 38, 63, 0.75) 45%, rgba(22, 38, 63, 0.22) 75%, rgba(22, 38, 63, 0.50) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#8CCB6B]/50 bg-[#8CCB6B]/20 px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-sm mb-6 backdrop-blur-sm">
              <Paintbrush className="w-4 h-4 text-[#A3E635]" />
              <span>Nippon Paint Certified Applicator · Zero Mess Guarantee</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              House Painting Services SG &amp; <br />
              <span className="brand-gradient-text">Complete Wall Plastering.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm max-w-2xl">
              Looking for professional house painters or plaster wall repair in Singapore?
              Renovation Contractor SG delivers smooth, blemish-free walls, certified Nippon painting, and complete
              plastering services with full floor protection and spotless cleanup.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20painting%20and%20plastering%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp for Painting Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Free Color Consultation</span>
              </Link>

              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/35 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#A3E635]" />
                <span>Call {siteConfig.contact.phonePrimary}</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 pt-8 text-xs sm:text-sm font-semibold text-slate-100 border-t border-white/20 mt-8 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>100% Genuine Nippon Paint</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>Free Furniture Moving &amp; Wrapping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>Plaster Crack &amp; Flake Repair Included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIALTIES SHOWCASE */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Wall &amp; Ceiling Treatments
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Comprehensive Painting &amp; Plastering Solutions
            </h2>
            <p className="text-base text-slate-600">
              From fresh move-in color transformations to fixing years of moisture and peeling plaster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paintingScopes.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#2C6BA6]/10 text-[#2C6BA6] px-2.5 py-1 rounded-full mb-3 inline-block">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                  {item.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PAINTING METHODOLOGY (ZIG-ZAG SHOWCASE) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Clean Execution
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Meticulous Prep Work. Zero Splatters.
            </h2>
            <p className="text-base text-slate-600">
              Why our paint jobs look smooth and clean years after completion.
            </p>
          </div>

          <div className="space-y-16">
            {paintingProcess.map((std, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={std.step}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-xl ${
                    isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg aspect-[16/11] ${isEven ? "lg:col-start-2" : ""}`}>
                    <LiveImage src={std.image}
                      alt={std.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#16263F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-xs font-black text-[#A3E635] border border-white/20">
                      STEP {std.step}
                    </div>
                  </div>

                  <div>
                    <span className="text-3xl sm:text-4xl font-black text-[#2C6BA6]/25 block mb-2">
                      {std.step}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-4">
                      {std.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {std.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="py-20 bg-[#F2F6F9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Painting FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About House Painting
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-[#2C6BA6] transition-colors"
                  >
                    <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#2C6BA6]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA FOOTER */}
      <section className="py-20 bg-[#16263F] text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Get an All-Inclusive House Painting Quotation
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8">
            Tell us your flat type (HDB 3/4/5-Room, Condo, or Landed) for a fast fixed-price quote with zero surprise extras.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20painting%20and%20plastering%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Instant Quote on WhatsApp</span>
            </a>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition-all"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>Book Free Site Visit</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
