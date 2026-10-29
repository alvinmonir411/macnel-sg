import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getCloudinaryUrl } from "@/lib/cloudinary";
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

export default function FlooringCarpetPage() {
  const flooringTrades = [
    {
      trade: "Trade 01",
      title: "Solid Parquet & Hardwood Floor Sanding, Staining & Varnishing",
      subtitle: "German Bona Dust-Free Belt Sanding & Non-Toxic Traffic HD Polyurethane",
      desc: "Restore dull, scratched Burma teak, balau, or oak parquet to showroom condition. We use commercial continuous belt sanding machines equipped with HEPA dust extractors to ensure 99% dust-free sanding, followed by 3 coats of eco-friendly, zero-VOC Bona polyurethane varnish.",
      specs: [
        "Dust-free multi-grit belt sanding (36/60/100/120 grit)",
        "3 coats Swedish Bona Traffic HD commercial lacquer",
        "Matte, satin, or high-gloss sheen options",
        "Non-toxic, ultra-low VOC safe for children & pets",
      ],
      image: "/images/doc-updates/image69.png",
      tag: "Hardwood Restoration",
    },
    {
      trade: "Trade 02",
      title: "100% Waterproof SPC Rigid Core & Luxury Vinyl Tile (LVT)",
      subtitle: "5mm - 7.5mm Click-Lock with Integrated IXPE Acoustic Underlay",
      desc: "The ultimate pet-friendly and water-resistant flooring for Singapore homes. Our stone plastic composite (SPC) planks feature high-definition European timber textures, a 0.5mm commercial wear layer, and anti-bacterial acoustic backing that deadens footsteps.",
      specs: [
        "Zero formaldehyde, E0 European emissions certified",
        "100% waterproof core impervious to kitchen & mop water",
        "Direct overlay on existing tiles without door hacking",
        "Integrated IXPE acoustic pad reduces step impact noise",
      ],
      image: "/images/doc-updates/image40.jpg",
      tag: "SPC & Luxury Vinyl",
    },
    {
      trade: "Trade 03",
      title: "Commercial Carpet Tiles & Heavy-Duty Wall-to-Wall Broadloom",
      subtitle: "Acoustic Noise Absorption & Castor Chair Resistant Nylon Fibres",
      desc: "Designed for commercial offices, co-working studios, boardrooms, and boutique clinics. Modular 50x50cm carpet tiles allow fast individual tile replacement if stained, while high-density solution-dyed nylon tufts resist fading and heavy office chair wheels.",
      specs: [
        "Heavy commercial wear rating (Class 33)",
        "Solution-dyed nylon with Scotchgard stain resistance",
        "Flame retardant Class Bfl-s1 fire certified",
        "Tackifier adhesive enables easy single-tile replacement",
      ],
      image: "/images/doc-updates/image85.png",
      tag: "Commercial Carpet",
    },
    {
      trade: "Trade 04",
      title: "Diamond Pad Marble, Granite & Terrazzo Floor Crystallization",
      subtitle: "Rotary Diamond Grinding & Chemical Mirror Polish Restoration",
      desc: "Eliminate etching, dull spots, scratches, and lippage on natural marble, travertine, and granite slabs. We grind surface imperfections using sequential diamond resin pads (grit 50 to 3000) and finish with Italian chemical crystallization powder for deep optical mirror reflections.",
      specs: [
        "Deep mechanical diamond honing removes deep scratches",
        "Italian Klindex crystallization for wet-look shine",
        "Neutral pH stone penetrating sealer prevents wine/tea stains",
        "Restores natural veining contrast and slip resistance",
      ],
      image: "/images/doc-updates/image76.jpg",
      tag: "Marble Crystallization",
    },
  ];

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
      waterResistance: "100% Completely Waterproof",
      scratchResist: "Very High (0.5mm ceramic bead layer)",
      lifespan: "15 - 25 Years",
      bestApplication: "Rental apartments, homes with dogs/cats, kitchens",
    },
    {
      material: "Commercial Carpet Tiles",
      waterResistance: "Stain resistant, moisture backing",
      scratchResist: "Ultra High (Castor chair wheel proof)",
      lifespan: "10 - 15 Years",
      bestApplication: "Corporate offices, meeting rooms, libraries",
    },
    {
      material: "Natural Italian Marble",
      waterResistance: "Requires penetrating sealer",
      scratchResist: "Polished surface (re-polishable)",
      lifespan: "Lifetime / Indefinite",
      bestApplication: "Grand entrance foyers, hotel lobbies, luxury condos",
    },
  ];

  const faqs = [
    {
      q: "Can SPC vinyl flooring be installed directly over my old HDB tiles?",
      a: "Yes! In 95% of cases, SPC click-lock flooring can be installed directly over existing homogeneous or ceramic tiles using an acoustic underlay. This saves thousands of dollars in hacking fees and avoids the mess and downtime of wet masonry hacking.",
    },
    {
      q: "How many days does wood floor sanding and varnishing take for a 4-room flat?",
      a: "Typically 2 to 3 days. Day 1 is dedicated to coarse, medium, and fine belt sanding and timber gap putty filling. Day 2 involves applying the first sealer coat and intermediate polyurethane lacquer. Day 3 is for the final protective topcoat and curing.",
    },
    {
      q: "Do carpet tiles trap odors and moisture in Singapore's tropical climate?",
      a: "No. Our commercial carpet tiles are made from 100% solution-dyed nylon with anti-microbial treatments and non-porous bitumen or PVC backings. They do not retain dampness or mildew when maintained with regular vacuuming.",
    },
    {
      q: "How often should natural marble floors be re-crystallized or polished?",
      a: "For typical residential apartments, a light diamond crystallization every 2 to 3 years is sufficient to maintain showroom mirror clarity. High-traffic commercial reception areas benefit from an annual polishing cycle.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-screen flex items-center py-20 lg:py-28">
        <img
          src={getCloudinaryUrl("/images/tiling/11.jpeg")}
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
              <span>Singapore Flooring Specialists · Direct In-House Teams</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              Flooring &amp; Carpet <br />
              <span className="text-[#8CCB6B]">Installation, Parquet Sanding &amp; Polishing</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-md">
              From dust-free hardwood parquet refinishing with German Bona systems, to 100% waterproof SPC click-lock
              and heavy-duty commercial carpet tiles. Exceptional durability and flawless craftsmanship.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20flooring%20and%20carpet%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-2xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp Floor Plan For Quote</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-all"
              >
                <Phone className="w-4 h-4 text-[#A3E635]" />
                <span>Call {siteConfig.contact.phonePrimary}</span>
              </a>
            </div>

            {/* Quick Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">99%</p>
                <p className="text-xs text-slate-300 font-medium">Dust-Free Sanding</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">100%</p>
                <p className="text-xs text-slate-300 font-medium">Waterproof SPC</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">Bona HD</p>
                <p className="text-xs text-slate-300 font-medium">Zero-VOC Lacquer</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">Class 33</p>
                <p className="text-xs text-slate-300 font-medium">Commercial Carpet</p>
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
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Direct In-House Floor Layers</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Droplets className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Moisture Barrier Priming</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Gem className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Diamond Marble Crystallization</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Building2 className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Commercial &amp; Residential Scopes</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Trade Breakdown (Zig-Zag) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
            Master Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Specialized Flooring Trade Solutions
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            Every material requires dedicated tools and precision subfloor preparation. Explore our in-house trade capabilities below.
          </p>
        </div>

        <div className="space-y-24">
          {flooringTrades.map((floor, idx) => {
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
                    <img
                      src={getCloudinaryUrl(floor.image)}
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
                    {floor.trade} Engineering
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2 leading-tight">
                    {floor.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mb-4">{floor.subtitle}</p>
                  <p className="text-slate-600 leading-relaxed mb-6 font-normal">{floor.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {floor.specs.map((spec, sIdx) => (
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

      {/* Material Comparison Table */}
      <section className="py-24 bg-[#F8FAFC] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Performance Specs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Flooring Material Comparison Guide
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal">
              Compare water resistance, durability, and practical lifespans to determine the best match for your lifestyle.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <thead>
                <tr className="bg-[#16263F] text-white">
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Flooring Material</th>
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Water Resistance</th>
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Scratch &amp; Wear</th>
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Estimated Lifespan</th>
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Best Recommended For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-sm">
                {flooringMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50">{item.material}</td>
                    <td className="py-4 px-6 text-slate-700 font-medium">{item.waterResistance}</td>
                    <td className="py-4 px-6 text-slate-700 font-medium">{item.scratchResist}</td>
                    <td className="py-4 px-6 font-bold text-[#2C6BA6]">{item.lifespan}</td>
                    <td className="py-4 px-6 text-slate-600">{item.bestApplication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="py-20 bg-[#F1F5F9] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Common Questions
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About Flooring &amp; Carpets
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

      {/* Bottom Conversion CTA */}
      <section className="bg-gradient-to-r from-[#16263F] to-[#2C6BA6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Transform Your Floors with Direct Contractor Quality
          </h2>
          <p className="text-base text-slate-200 max-w-2xl mx-auto mb-8 font-normal">
            Request wood samples, SPC sample boards, or schedule an on-site moisture and square-footage assessment today.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(siteConfig.name)}%2C%20I%20would%20like%20a%20flooring%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-2xl hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp: +65 {siteConfig.contact.whatsapp.slice(2)}</span>
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
