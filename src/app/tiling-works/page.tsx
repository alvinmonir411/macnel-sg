"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Grid3X3,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Layers,
  Award,
} from "lucide-react";

const tilingTypologies = [
  {
    title: "Large Format Homogeneous Tiles (600x1200)",
    tag: "Luxury Living Halls",
    desc: "Seamless, grand aesthetic with minimal grout lines. Ideal for modern HDB and condominium living rooms.",
    specs: "Zero water absorption · Scratch proof · High load bearing",
  },
  {
    title: "Anti-Slip R10 / R11 Bathroom Tiles",
    tag: "Wet Areas & Toilets",
    desc: "Textured surface offering superior traction even when wet, protecting elderly and children from slips.",
    specs: "R10 safety rating · Waterproof screed · Anti-fungal grout",
  },
  {
    title: "Kitchen Feature & Subway Splashbacks",
    tag: "Kitchens & Islands",
    desc: "Herringbone, chevron, and classic beveled subway tiles that resist hot cooking grease and stains.",
    specs: "Stain-resistant glaze · Easy wipe down · Heat proof",
  },
  {
    title: "Natural Marble & Granite Slabs",
    tag: "Balconies & Feature Walls",
    desc: "Authentic veining and diamond-polished finishes for statement feature walls and entrance foyers.",
    specs: "Sealed against etching · Book-matched veining option",
  },
];

const workmanshipStandards = [
  {
    step: "01",
    title: "100% Solid Buttering (Zero Hollow Tiles)",
    image: "/images/tiling/38.jpeg",
    desc: "Inexperienced contractors use 'spot bonding', leaving empty hollow pockets beneath tiles that crack when stepped on. We apply full-coverage combed polymer mortar on both floor and tile back, ensuring 100% solid compaction and zero hollow sound ('drumming').",
  },
  {
    step: "02",
    title: "Laser Cross-Line Optical Alignment",
    image: "/images/tiling/44.jpeg",
    desc: "Every single row is aligned using 3D multi-line laser leveling instruments. Grout spacing is locked to ultra-tight 1.5mm–2.0mm tolerances with reusable leveling clips to eliminate tile lippage completely.",
  },
  {
    step: "03",
    title: "45-Degree Mitred Edge Finishing",
    image: "/images/tiling/11.jpeg",
    desc: "Instead of cheap PVC plastic corner trims that discolor and peel, our craftsmen wet-cut tile edges to exact 45-degree angles for seamless, high-end architectural stone junctions on kerbs and ledges.",
  },
  {
    step: "04",
    title: "Anti-Mold Epoxy Grouting (Mapei)",
    image: "/images/tiling/13.jpeg",
    desc: "Standard cement grout absorbs water, turning black and moldy in humid Singapore bathrooms. We seal joints with two-part epoxy grout that is 100% waterproof, stain-proof, and easily wiped clean.",
  },
];

const faqs = [
  {
    q: "Can I overlay new tiles over my existing flooring without hacking?",
    a: "Yes, tile overlay is popular in Singapore for condominiums and newer HDB flats. If your existing floor is structurally sound, level, and has zero hollow spots, we apply high-bonding primer before laying new tiles. This saves approximately 30%-40% on hacking and disposal costs.",
  },
  {
    q: "Why do tiles in Singapore homes pop up ('dislodge') during weather changes?",
    a: "Popping tiles are caused by inadequate expansion gaps around perimeter walls, sub-par cement adhesion, or thermal expansion. We provide flexible perimeter expansion joints and polymer-modified adhesive that accommodates temperature fluctuations.",
  },
  {
    q: "Do you supply the tiles, or can I purchase my own from Hafary / Soon Bee Huat?",
    a: "You have complete freedom. We can supply certified homogeneous tiles from our partner catalogs, or you can pick your dream tiles from Hafary, Soon Bee Huat, or Lian Seng Hin. We handle site delivery coordination and material calculations.",
  },
  {
    q: "How long does whole-house floor tiling take?",
    a: "For a 4-room or 5-room HDB flat (approx 900–1,100 sqft), full living room, kitchen, and bedroom floor tiling takes roughly 5 to 8 working days from screeding to chemical cleaning.",
  },
];

export default function TilingWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-[85vh] lg:min-h-screen flex items-center py-20 lg:py-28">
        <img
          src="/images/tiling/44.jpeg"
          alt="Master Tile Flooring Installation Singapore"
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
              <Grid3X3 className="w-4 h-4 text-[#A3E635]" />
              <span>Singapore Direct Tile Floor Installers &amp; Bathroom Tilers</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Precision Tiling Services, <br />
              <span className="brand-gradient-text">Zero Hollow Drum Spots.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm max-w-2xl">
              Searching for professional tile installers or floor tile contractors near you?
              MACNEL executes millimeter-accurate floor and wall tile installation, bathroom tile
              replacements, and commercial tiling across Singapore with full polymer adhesive bonding.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20quotation%20for%20tiling%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp for Tiling Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Free Floor Inspection</span>
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
                <span>Laser Level Alignment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>45° Mitred Edge Cuts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>Anti-Mold Epoxy Grouting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TILE TYPOLOGY SELECTION (EDITORIAL CHIPS) */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Materials &amp; Slabs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Tile Typologies &amp; Architectural Formats
            </h2>
            <p className="text-base text-slate-600">
              We install tiles of every texture, scale, and origin — from Italian marble slabs to German anti-slip tiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tilingTypologies.map((t, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#2C6BA6]/10 text-[#2C6BA6] px-2.5 py-1 rounded-full mb-3 inline-block">
                    {t.tag}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {t.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                  {t.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WORKMANSHIP METHODOLOGY (ZIG-ZAG ARCHITECTURAL SHOWCASE) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Trade Craftsmanship
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Why MACNEL Tiling Outlasts Others
            </h2>
            <p className="text-base text-slate-600">
              Good tiling is not just about placing a tile on wet cement. It is a rigorous engineering process.
            </p>
          </div>

          <div className="space-y-16">
            {workmanshipStandards.map((std, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={std.step}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-xl ${
                    isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg aspect-[16/11] ${isEven ? "lg:col-start-2" : ""}`}>
                    <img
                      src={std.image}
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
              Contractor FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About Floor &amp; Wall Tiling
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
            Get an Exact Floor Tile Quotation Today
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8">
            Send us your floor plan or floor area measurements for a prompt, itemized quote with zero obligation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20quotation%20for%20tiling%20services.`}
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
