"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Lightbulb,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  ChevronDown,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";

const ceilingSolutions = [
  {
    title: "LED Cove Light Troughs & Curtain Pelmets",
    tag: "Living Rooms & Bedrooms",
    desc: "Soft ambient indirect cove lighting that illuminates ceilings without glare, combined with recessed pelmets to neatly hide curtain tracks and motorized blind motors.",
    specs: "Saint-Gobain plasterboard · Integrated aluminum LED extrusion channels",
  },
  {
    title: "Full Flat Ceilings & Beam Concealment",
    tag: "Flats & Condominiums",
    desc: "Neatly conceals exposed air-con drainage pipes, electrical PVC trunking, and structural concrete beams, creating a clean, seamless, modern flat ceiling surface.",
    specs: "Galvanized steel furring channels · Flush magnetic access panels",
  },
  {
    title: "Acoustic Drywall Partitions & Room Dividers",
    tag: "Home Offices & Bedrooms",
    desc: "Create new bedrooms or acoustic study spaces in living rooms. Reinforced with Rockwool sound-insulation batts to block household noise transmission.",
    specs: "Sound transmission class (STC 45+) · High-density drywall boards",
  },
  {
    title: "Moisture-Resistant Bathroom Ceilings",
    tag: "Bathrooms & Kitchens",
    desc: "Specially formulated water-resistant plasterboard that prevents moisture absorption, mold spore buildup, and ceiling paint flaking in high-steam shower zones.",
    specs: "Green-core moisture board · Anti-fungus Nippon paint seal",
  },
];

const ceilingStandards = [
  {
    step: "01",
    title: "Heavy-Duty Galvanised Metal Stud Framework",
    image: "/images/doc-updates/image31.jpg",
    desc: "We never use cheap thin metal channels that bend under ceiling weight. Renovation Contractor SG frames ceilings with heavy-duty galvanised steel furring channels spaced at strict 400mm centers, suspended with zinc-coated threaded steel rods anchored to concrete slabs.",
  },
  {
    step: "02",
    title: "Saint-Gobain Gyproc Fire-Rated Boards",
    image: "/images/doc-updates/image60.jpg",
    desc: "We use genuine Saint-Gobain Gyproc plasterboard certified for fire safety and environmental air quality. Boards are precision-cut with bevelled edges to create invisible seams after compound taping.",
  },
  {
    step: "03",
    title: "3-Coat Joint Taping (Zero Hairline Cracks)",
    image: "/images/doc-updates/image66.jpg",
    desc: "Hairline cracks in false ceilings occur when joints are skimped. We embed high-tensile fiberglass perforated joint tape across all seams and apply three feathered coats of premixed joint compound, followed by fine mechanical sanding.",
  },
];

const faqs = [
  {
    q: "How much ceiling height will I lose with a false ceiling in an HDB flat?",
    a: "A standard flat false ceiling typically drops between 100mm to 150mm (4 to 6 inches) from the existing concrete soffit. This provides ample cavity space to hide downlights, wiring, and air-conditioning conduits while maintaining comfortable 2.4m–2.6m headroom.",
  },
  {
    q: "Can I hang heavy ceiling fans or chandeliers onto a false ceiling?",
    a: "Yes. We install heavy-duty steel safety brackets anchored directly into the structural concrete slab above, passing securely through the false ceiling so the fan or chandelier is 100% structurally supported.",
  },
  {
    q: "How soundproof is an acoustic drywall partition wall?",
    a: "With double-layered plasterboards on both sides and 50mm high-density Rockwool acoustic insulation in the stud cavity, sound transmission is reduced by 70%-80%, making it ideal for home offices and recording rooms.",
  },
];

export default function FalseCeilingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-[85vh] lg:min-h-screen flex items-center py-20 lg:py-28">
        <img
          src="/images/partition-ceiling/12.jpeg"
          alt="False Ceiling Contractor Singapore"
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
              <Lightbulb className="w-4 h-4 text-[#A3E635]" />
              <span>False Ceiling Designer &amp; Partition Contractor · Singapore</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              False Ceiling &amp; Partitions, <br />
              <span className="brand-gradient-text">Seamless Cove Lighting.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm max-w-2xl">
              Looking for an experienced false ceiling contractor in Singapore?
              Renovation Contractor SG designs and installs seamless false ceilings for living rooms, LED cove light troughs,
              curtain pelmets, and acoustic room partitions with zero sagging or hairline cracks.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20false%20ceiling%20and%20partition%20works.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp for Ceiling Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Free Site Measurement</span>
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
                <span>Saint-Gobain Gyproc Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>3-Coat Anti-Crack Joint Taping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>Galvanised Steel Stud Framing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL CEILING SCOPE */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Design Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Ceiling &amp; Partition Architectural Scope
            </h2>
            <p className="text-base text-slate-600">
              Modern interior lighting and space division engineered for Singapore homes and corporate offices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ceilingSolutions.map((item, idx) => (
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

      {/* 3. ENGINEERING STANDARDS (ZIG-ZAG SHOWCASE) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Construction Integrity
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Engineered for Zero Sagging
            </h2>
            <p className="text-base text-slate-600">
              How our metal framing, drywall spacing, and joint compound prevent unsightly ceiling cracks over time.
            </p>
          </div>

          <div className="space-y-16">
            {ceilingStandards.map((std, idx) => {
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
              Ceiling FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About False Ceilings &amp; Partitions
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
            Transform Your Interior Lighting &amp; Ceilings
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8">
            Send us your floor plan for an immediate, transparent false ceiling and partition cost estimate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20false%20ceiling%20and%20partition%20works.`}
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
