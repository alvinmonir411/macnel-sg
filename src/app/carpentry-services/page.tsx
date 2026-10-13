"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Sparkles,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  ChevronDown,
  ArrowRight,
  Layers,
  Award,
} from "lucide-react";

const carpentrySpecialties = [
  {
    title: "Designer Kitchen Cabinetry & Islands",
    tag: "Kitchens",
    desc: "Seamless quartz or sintered stone countertops, anti-scratch laminate fronts, and Blum soft-closing slide drawers tailored to Singapore cookspaces.",
    specs: "E0 marine plywood carcass · Heavy-duty pot drawers · Integrated LED strips",
  },
  {
    title: "Full-Height Built-In Wardrobes",
    tag: "Bedrooms",
    desc: "Floor-to-ceiling sliding or casement door wardrobes featuring interior organizers, sensor lighting, tie racks, and full-length mirrors.",
    specs: "Damp-proof carcass · Soft-close sliding tracks · Anti-warping aluminum profile",
  },
  {
    title: "Suspended TV Consoles & Fluted Feature Walls",
    tag: "Living Rooms",
    desc: "Floating TV feature walls with acoustic fluted timber panels and concealed cabling wire runs for a clean, minimalist contemporary look.",
    specs: "Concealed conduit chases · Heavy anchor wall mount · Ambient cove backlight",
  },
  {
    title: "Moisture-Proof Bathroom Vanities",
    tag: "Bathrooms",
    desc: "Custom suspended vanity counters and mirror storage boxes constructed with high-density waterproof plywood resistant to high humidity.",
    specs: "Waterproof marine core · Quartz top with undermount basin · Anti-fog mirrors",
  },
];

const joineryStandards = [
  {
    step: "01",
    title: "100% Solid Marine-Grade Plywood (Zero Chipboard)",
    image: "/images/carpentry/4.jpeg",
    desc: "Many mass-market contractors use cheap chipboard or MDF that swells, sags, and rots within 2 years in Singapore's humid climate. MACNEL uses only heavy-duty solid plywood carcasses that withstand heavy loads, moisture, and pests for decades.",
  },
  {
    step: "02",
    title: "Seamless 1mm ABS Edge Banding",
    image: "/images/carpentry/7.jpeg",
    desc: "We apply 1mm high-pressure ABS edge banding using computer-controlled hot-melt technology. This eliminates unsightly black glue lines, protects corners from chipping, and prevents peeling over time.",
  },
  {
    step: "03",
    title: "Authentic Blum & Austrian Hydraulic Hardware",
    image: "/images/carpentry/2.jpeg",
    desc: "Every hinge, lift-up system (AVENTOS), and drawer runner is genuine Blum BLUMOTION soft-close hardware rated for over 200,000 opening cycles with zero slamming noises.",
  },
];

const faqs = [
  {
    q: "How long does custom carpentry fabrication take?",
    a: "After on-site 3D measurement and laminate selection, workshop fabrication takes approximately 10 to 14 working days. On-site installation in your home takes only 2 to 4 working days, minimizing household disruption.",
  },
  {
    q: "Can I choose premium laminates from Jennings, Lamitak, or EDL?",
    a: "Yes, 100%. We work with all leading laminate suppliers in Singapore including Lamitak, EDL, Jennings, and Formica, offering anti-fingerprint, matte, woodgrain, and stone-textured finishes.",
  },
  {
    q: "Do you build custom internal configurations for wardrobes?",
    a: "Yes. Every drawer height, hanging rod level, jewelry tray, trouser rack, and hidden safe compartment is built to your exact custom specifications.",
  },
];

export default function CarpentryPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-[85vh] lg:min-h-screen flex items-center py-20 lg:py-28">
        <img
          src="/images/carpentry/5.jpeg"
          alt="Custom Carpentry Services Singapore"
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
              <Sparkles className="w-4 h-4 text-[#A3E635]" />
              <span>Direct In-House Joinery Workshop · Singapore</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Custom Carpentry &amp; Cabinetry, <br />
              <span className="brand-gradient-text">Built to Millimeter Precision.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm max-w-2xl">
              Bring your dream spaces to life with custom fabricated furniture.
              MACNEL crafts kitchen cabinets, full-height built-in wardrobes, suspended TV consoles,
              and bathroom vanities using solid marine plywood and genuine Blum hardware.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20carpentry%20quotation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp for Carpentry Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book On-Site Measurement</span>
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
                <span>100% Solid Marine Plywood</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>Blum Soft-Close Hinges Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>Direct Factory Fabrication</span>
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
              Joinery Scope
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Custom Built-In Architectural Woodwork
            </h2>
            <p className="text-base text-slate-600">
              Every cabinet is custom built to maximize storage and match your interior aesthetic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carpentrySpecialties.map((item, idx) => (
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

      {/* 3. WORKSHOP STANDARDS (ZIG-ZAG SHOWCASE) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Quality Assurance
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Our Joinery Workshop Standards
            </h2>
            <p className="text-base text-slate-600">
              How we build carpentry that lasts 20+ years without sagging shelves or peeling laminates.
            </p>
          </div>

          <div className="space-y-16">
            {joineryStandards.map((std, idx) => {
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
                      STANDARD {std.step}
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
              Carpentry FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About Custom Woodwork
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
            Ready to Build Your Custom Cabinets?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8">
            Send us your carpentry drawings or schedule a free site measurement to discuss layouts and laminates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20carpentry%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp for Custom Quote</span>
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
