import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
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

export default function DoorWindowPage() {
  const categories = [
    {
      trade: "Trade 01",
      title: "Fire-Rated Main Entrance Doors & Matching Designer Metal Gates",
      subtitle: "Solid Core Acoustic Insulation with 1/2hr - 1hr Fire Cert",
      desc: "Custom-built timber laminate main entrance doors engineered for exceptional acoustic sound insulation and structural rigidity. Fully compatible with digital smart locks (Samsung, Philips, Yale, Kaadas) with custom laser-cut designer privacy gates.",
      specs: [
        "Class 1/2hr & 1hr certified fire door",
        "High-density solid timber core acoustic damping",
        "Over 100+ scratch-resistant laminate finishes",
        "Heavy-duty stainless steel ball-bearing butt hinges",
      ],
      image: "/images/door-window/1.jpeg",
      tag: "Main Doors & Gates",
    },
    {
      trade: "Trade 02",
      title: "BCA-Certified Aluminium Casement & Sliding Windows",
      subtitle: "SS 212 Safety Certified with Heavy-Duty SS304 Rivets",
      desc: "All window installations comply strictly with Singapore Building & Construction Authority (BCA) regulations. We replace worn friction stays and aluminium rivets with certified SS304 stainless steel hardware to ensure zero risk of dislodgement.",
      specs: [
        "Full BCA & HDB window permit submission",
        "Grade SS304 stainless steel safety rivets & friction stays",
        "High-spec double weather-stripping gasket seals",
        "Laminated safety glass or tempered toughened glass",
      ],
      image: "/images/door-window/3.jpeg",
      tag: "Aluminium Windows",
    },
    {
      trade: "Trade 03",
      title: "Soundproof Acoustic Double-Glazed Glass Windows & Balcony Sliders",
      subtitle: "Dramatically Reduce Expressway, MRT & Construction Noise",
      desc: "Live near an MRT track or busy highway? Our double-glazed acoustic window systems utilize dual panes with an argon gas thermal barrier to block up to 38dB to 42dB of ambient street noise, transforming your living room and bedroom into a peaceful sanctuary.",
      specs: [
        "Acoustic PVB interlayer sound dampening",
        "Argon gas filled insulated glass units (IGU)",
        "Reduces external traffic & MRT noise by up to 80%",
        "Thermal UV heat rejection lowers aircon electricity",
      ],
      image: "/images/door-window/4.jpeg",
      tag: "Acoustic Soundproofing",
    },
    {
      trade: "Trade 04",
      title: "Toilet Bi-Fold Doors, Slide & Swing, and Pocket Bedroom Doors",
      subtitle: "Space-Saving Trackless Systems with Smooth Roller Mechanism",
      desc: "Say goodbye to clunky, derailed toilet doors. We supply and fit high-grade aluminium bi-fold doors, innovative Slide & Swing systems without bottom tracks, and recessed sliding pocket doors for seamless bedroom and bathroom entry.",
      specs: [
        "Trackless bottom designs prevent dust & tripping",
        "Heavy-duty nylon bearing top rollers for silent glide",
        "Acrylic louvre panels or tempered frosted glass",
        "Zero tile hacking required during replacement",
      ],
      image: "/images/door-window/8.jpeg",
      tag: "Interior Doors",
    },
  ];

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

  const faqs = [
    {
      q: "Are your window installers BCA certified in Singapore?",
      a: "Yes. All our window installers are certified by the Building and Construction Authority (BCA). Under Singapore law, all window replacements and repairs must be executed by BCA-approved window installers. We handle mandatory HDB/BCA notification paperwork.",
    },
    {
      q: "Can I replace my toilet door without hacking the existing wall tiles?",
      a: "Yes, our Slide & Swing and aluminium bi-fold door systems are custom-fabricated to fit your existing door frame sub-assembly or can be overlaid with sleek aluminium sub-frames, requiring zero hacking of your delicate bathroom tiles.",
    },
    {
      q: "How effective are double-glazed acoustic windows against MRT train noise?",
      a: "Extremely effective. Standard single-pane glass only reduces noise by 20dB, leaving screeching train tracks clearly audible. Our laminated double-glazed acoustic windows reduce sound by 38dB to 42dB, cutting perception of train and highway rumble by up to 80%.",
    },
    {
      q: "Do you supply fire-rated main entrance doors with official CoC certificate?",
      a: "Yes. All our 1/2 hour and 1 hour fire-rated timber main entrance doors come with an official Certificate of Conformity (CoC) label issued by accredited testing bodies, satisfying all Singapore Civil Defence Force (SCDF) and HDB requirements.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-screen flex items-center py-20 lg:py-28">
        <img
          src="/images/door-window/4.jpeg"
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
            <span>Back to All 18 Services</span>
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/15 px-4 py-1.5 text-xs font-bold text-white mb-6 backdrop-blur-md">
              <DoorOpen className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>BCA Approved Door &amp; Window Specialist · Singapore</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              Door &amp; Window <br />
              <span className="text-[#8CCB6B]">Replacement, Soundproofing &amp; Repair</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-md">
              Enhance home security, eliminate external traffic rumble, and prevent water ingress with certified
              craftsmanship. From fire-rated timber entrance doors to acoustic double glazing and bi-fold systems.
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
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">100%</p>
                <p className="text-xs text-slate-300 font-medium">Zero Tile Damage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-[#0F172A] py-8 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">BCA Safety Law Compliance</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <VolumeX className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Acoustic Soundproofing Tech</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Lock className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Fire-Rated &amp; Smart Lock Ready</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Wrench className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Emergency Track &amp; Hinge Repairs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Trade Breakdown (Zig-Zag) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
            Engineered Fixtures
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Comprehensive Door &amp; Window Solutions
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            Whether for complete replacement or precision restoration, every frame and hinge is installed by full-time BCA-trained carpenters and metal workers.
          </p>
        </div>

        <div className="space-y-24">
          {categories.map((cat, idx) => {
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
                    <img
                      src={cat.image}
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
                    {cat.specs.map((spec, sIdx) => (
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

      {/* Acoustic Soundproofing Performance Matrix */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Acoustic Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Glass Specification &amp; Noise Decibel Matrix
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal">
              Select the optimal glass configuration depending on your floor level, orientation to roads, and acoustic sensitivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {glassSpecs.map((glass, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{glass.type}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-black text-[#2C6BA6]">{glass.noiseReduction}</span>
                    <span className="text-xs font-semibold text-slate-500">Noise Reduction</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-xs font-medium text-slate-600">
                    <span className="font-bold text-slate-800">UV Ray Block:</span> {glass.uvBlocking}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{glass.bestFor}</p>
                </div>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hi%20Renovation%20Contractor%20SG%2C%20I%20want%20to%20consult%20about%20${encodeURIComponent(
                    glass.type
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full text-center py-2.5 rounded-xl border border-slate-300 hover:border-[#16263F] hover:bg-[#16263F] hover:text-white text-[#16263F] text-xs font-bold transition-all"
                >
                  Inquire Glass Upgrade
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Repair Services */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
            Targeted Restorations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
            Don&apos;t Need Replacement? We Repair &amp; Realine
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            If your door or window frames are structurally sound, our direct technicians resolve functional issues quickly and affordably.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {repairServices.map((rep, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#8CCB6B]/15 text-[#4E9A3C] flex items-center justify-center mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#0F172A] mb-2">{rep.issue}</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{rep.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="py-20 bg-[#F1F5F9] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Expert Answers
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About Doors &amp; Windows
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl bg-white border border-slate-200 p-6 open:shadow-lg transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-base sm:text-lg text-[#0F172A] group-open:text-[#2C6BA6]">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                </summary>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed font-normal pt-2 border-t border-slate-100">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* High-Impact Bottom CTA */}
      <section className="bg-gradient-to-r from-[#16263F] to-[#2C6BA6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Upgrade Your Home&apos;s Doors, Windows &amp; Soundproofing
          </h2>
          <p className="text-base text-slate-200 max-w-2xl mx-auto mb-8 font-normal">
            Get an immediate quotation or schedule an on-site dimension measurement with our BCA-licensed technicians.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20door%20and%20window%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-2xl hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Us: +65 9187 8887</span>
            </a>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#16263F] font-bold text-sm shadow-xl hover:bg-slate-100 transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-[#2C6BA6]" />
              <span>Book Site Measurement</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
