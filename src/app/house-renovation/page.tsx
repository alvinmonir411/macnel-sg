export const dynamic = "force-dynamic";
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
  Home,
  ShieldCheck,
  Sparkles,
  CalendarCheck,
  ChevronDown,
  Hammer,
  Zap,
  Layers,
  Award,
  Clock,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "House Renovation Contractor Singapore | Turnkey Home Renovation - Renovation Contractor SG",
  description:
    "Top rated direct house renovation contractor in Singapore. Full turnkey home renovation for HDB BTO, resale flats, condominiums & landed homes with zero ID markups.",
  keywords: siteConfig.serviceKeywords.houseRenovation,
};

const propertyTypes = [
  {
    type: "HDB BTO Flats",
    estTime: "5 - 7 Weeks",
    features: [
      "Defect checking & joint inspection",
      "Whole-house flooring (Vinyl/Tiles)",
      "Kitchen full cabinet & quartz top",
      "Master wardrobe & vanity cabinet",
      "Living cove ceiling & full LED wiring",
      "Nippon Odourless all-room painting",
    ],
    idealFor: "New homeowners wanting clean, direct contractor rates without 25% ID markup.",
  },
  {
    type: "HDB Resale Overhaul",
    estTime: "8 - 10 Weeks",
    features: [
      "Full hacking of 2 bathrooms & kitchen",
      "BCA hacking permit & debris disposal",
      "Screeding, waterproofing & tiling",
      "Complete whole-house electrical rewiring",
      "PUB stainless piping replacement",
      "Full carpentry, doors, windows & paint",
    ],
    idealFor: "Mature resale flats requiring complete structural and plumbing modernization.",
  },
  {
    type: "Private Condominium",
    estTime: "6 - 8 Weeks",
    features: [
      "MCST compliance submission & deposit handling",
      "Corridor lift & lobby floor protection",
      "Luxury marble floor honing & crystallization",
      "Custom kitchen island & sintered stone tops",
      "Smart dimmer home automation loops",
      "Soundproof double-glazed window repairs",
    ],
    idealFor: "Private condo owners seeking premium craftsmanship adhering to strict MCST hours.",
  },
  {
    type: "Landed & Commercial",
    estTime: "10 - 16 Weeks",
    features: [
      "Roof waterproofing & facade repainting",
      "Structural wet trade & foundation masonry",
      "Heavy load 3-phase DB box upgrades",
      "Central air-con VRV trunking concealment",
      "Custom acoustic partitions & fire-rated doors",
      "Comprehensive site safety management",
    ],
    idealFor: "Terrace, semi-D, and commercial office renovations needing direct engineering teams.",
  },
];

const comparison = [
  {
    feature: "Cost Structure",
    directContractor: "Direct wholesale contractor prices (Save 20% - 35%)",
    idFirm: "Heavily marked up to cover showroom rent & designer commissions",
  },
  {
    feature: "Workmanship & Craftsmen",
    directContractor: "100% In-house tilers, carpenters, electricians & painters",
    idFirm: "Outsourced to 3rd-party sub-contractors with variable quality",
  },
  {
    feature: "On-Site Communication",
    directContractor: "Direct coordination with senior site supervisors & project managers",
    idFirm: "Sales coordinator acts as middleman; messages often diluted",
  },
  {
    feature: "Quotations & Variations",
    directContractor: "Detailed itemized breakdown per foot run with zero hidden clauses",
    idFirm: "Lump sum packages with frequent costly variation orders (VO)",
  },
  {
    feature: "Defect Rectification",
    directContractor: "Fast direct response within 24–48 hours under 12-month warranty",
    idFirm: "Often delayed while the designer argues with their subcontractor",
  },
];

export default async function HouseRenovationPage() {
  const siteData = await getLiveSiteData();
  const contact = { ...siteConfig.contact, ...(siteData?.contact || {}) };
  const overrides = siteData?.site_images || {};
  const pageData = siteData?.service_pages?.house_renovation;

  const heroImage =
    overrides["house_reno_hero"] ||
    overrides["/images/house-reno/1.jpeg"] ||
    pageData?.hero?.defaultImage ||
    "/images/house-reno/1.jpeg";

  const renoPhases = (pageData?.phases || []).map((phase: any) => ({
    ...phase,
    image: overrides[phase.slotId] || overrides[phase.image] || phase.image,
  }));

  const faqs = pageData?.faqs || [];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-screen flex items-center py-20 lg:py-28">
        <LiveImage
          src={heroImage}
          slotId="house_reno_hero"
          alt="House Renovation Contractor Singapore"
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
              <Home className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>{pageData?.hero?.subtitle || "Singapore Direct Home Renovation Contractor · In-House Crews"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              {pageData?.hero?.title || "Whole House Renovation"}
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-md">
              {pageData?.hero?.desc ||
                "Transform your HDB, condominium, or landed property with Singapore's trusted renovation specialists. Zero middleman interior design markups. We own the teams that hack, tile, wire, and build your dream home."}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`https://wa.me/${contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20whole%20house%20renovation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-2xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp Floor Plan For Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-all"
              >
                <CalendarCheck className="w-4 h-4 text-[#A3E635]" />
                <span>Book Free Site Inspection</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                <p className="text-xs text-slate-300 font-medium">Direct In-House Crews</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">Save 25%</p>
                <p className="text-xs text-slate-300 font-medium">No ID Markups</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">HDB/BCA</p>
                <p className="text-xs text-slate-300 font-medium">Full Permit Filings</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">12-Month</p>
                <p className="text-xs text-slate-300 font-medium">Direct Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic 4-Phase Renovation Roadmap */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4E9A3C] block mb-2">
            Execution Framework
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] mb-4">
            Our 4-Phase Turnkey Execution
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            Every renovation milestone is managed by dedicated in-house trade specialists with transparent sign-offs at each completion gate.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {renoPhases.map((phase: any, idx: number) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={phase.phase}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                    <LiveImage
                      src={phase.image}
                      slotId={phase.slotId}
                      alt={phase.title}
                      className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#16263F]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                      {phase.phase} · {phase.tag}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#16263F] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                      Singapore Standard Verified
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
                    {phase.phase} Architecture
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2 leading-tight">
                    {phase.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mb-4">{phase.subtitle}</p>
                  <p className="text-slate-600 leading-relaxed mb-6 font-normal">{phase.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {phase.specs?.map((spec: string, sIdx: number) => (
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

      {/* Property Typology Matrix */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Property Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Tailored Scopes For Every Singapore Property
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal">
              Whether preparing a brand-new BTO or gut-renovating a 30-year-old resale flat, our packages are customized to your exact layout.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((prop, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#0F172A]">{prop.type}</h3>
                    <span className="text-xs font-bold text-[#2C6BA6] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      {prop.estTime}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {prop.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                        <Check className="w-3.5 h-3.5 text-[#8CCB6B] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  {prop.idealFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison: Direct Contractor vs ID Firm */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4E9A3C] block mb-2">
              Transparent Truth
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Direct Contractor vs Interior Design (ID) Firm
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal">
              See why hundreds of Singapore homeowners choose Renovation Contractor SG over commissioned design brokers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#16263F] text-white">
                  <th className="py-4 px-6 font-bold">Key Consideration</th>
                  <th className="py-4 px-6 font-bold bg-[#1e3456] text-[#A3E635]">
                    Renovation Contractor SG (Direct)
                  </th>
                  <th className="py-4 px-6 font-bold text-slate-300">Typical ID Firm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#0F172A]">{row.feature}</td>
                    <td className="py-4 px-6 bg-emerald-50/50 font-semibold text-emerald-950">
                      {row.directContractor}
                    </td>
                    <td className="py-4 px-6 text-slate-500">{row.idFirm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4E9A3C] block mb-2">
              Homeowner FAQs
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About House Renovation
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq: any, idx: number) => (
              <details
                key={idx}
                className="group bg-white rounded-xl p-6 border border-slate-200 shadow-sm open:shadow-md transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-base text-[#0F172A] group-open:text-[#2C6BA6]">
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

      {/* Final Conversion CTA */}
      <section className="py-20 bg-[#16263F] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to Begin Your Home Transformation?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 font-normal text-sm sm:text-base leading-relaxed">
            Send us your floor plan or schedule an on-site survey. We provide free layout consultation, transparent itemized quotes, and zero sales pressure.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20whole%20house%20renovation.`}
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
