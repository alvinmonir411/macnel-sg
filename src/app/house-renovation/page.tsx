import { LiveImage } from "@/components/LiveImage";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getCloudinaryUrl } from "@/lib/cloudinary";
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

export default function HouseRenovationPage() {
  const renoPhases = [
    {
      phase: "Phase 01",
      title: "HDB/BCA Permit Submission, Protection & Structural Hacking",
      subtitle: "Safe Demolition with Full Floor & Lift Padding",
      desc: "We handle all mandatory HDB and MCST permit filings before commencement. Heavy-duty corrugated cardboard and corrugated plastic sheets protect common corridors, lifts, and existing fixtures before pneumatic hacking.",
      specs: ["HDB e-permit submission & approval", "Lifting corridor & lift protection", "Load-bearing wall radar verification", "Daily debris bagging & disposal"],
      image: "/images/house-reno/1.jpeg",
      tag: "Site Prep & Demolition",
    },
    {
      phase: "Phase 02",
      title: "Wet Trade Masonry, Screeding & High-Precision Tiling",
      subtitle: "Laser-Guided Leveling with Zero-Hollow Bonding",
      desc: "Our master masons cast reinforced kerbs, shower drop kerbs, and pre-packed screed beds. Tiles are back-buttered with C2TE flexible cementitious adhesive and spaced with reusable leveling clips for flush, razor-sharp grout lines.",
      specs: ["C2TE heavy-duty polymer adhesive", "Double-coat SikaTop 107 seal", "Laser 3D horizontal floor leveling", "Micro-mitred 45° marble edges"],
      image: "/images/doc-updates/image75.jpg",
      tag: "Wet Trade & Masonry",
    },
    {
      phase: "Phase 03",
      title: "Architectural False Ceilings, Pelmets & Drywall Partitions",
      subtitle: "Heavy-Duty Galvanised Framing & Anti-Crack Finishing",
      desc: "We construct seamless drop ceilings, cove lighting pelmets, and acoustic drywall acoustic dividers using Saint-Gobain 9mm/12mm moisture-resistant boards mounted on hot-dipped galvanised steel channel grids.",
      specs: ["Hot-dipped zinc galvanised studs", "Saint-Gobain Gyproc board", "3-coat fiber-reinforced joint tape", "Precision recessed spotlight cuts"],
      image: "/images/doc-updates/image29.jpg",
      tag: "Ceiling & Partition",
    },
    {
      phase: "Phase 04",
      title: "Premium Surface Painting, Chemical Wash & Handover",
      subtitle: "Multi-Coat Skim Coat & Zero-VOC Anti-Bacterial Coating",
      desc: "Complete wall skimming with pre-mixed skim coat removes all undulations before 1 sealer coat and 2 topcoats of Nippon Odourless or Benjamin Moore paint. Deep chemical acid cleaning and joint sealant touch-up completes the handover.",
      specs: ["Nippon 5101 odour-less wall sealer", "2 coats Nippon Medifresh anti-bacterial", "Full chemical acid cleaning", "12-month defect warranty cert"],
      image: "/images/doc-updates/image25.jpg",
      tag: "Finishing & Handover",
    },
  ];

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
      estTime: "6 - 9 Weeks",
      features: [
        "MCST renovation permit & deposit handling",
        "Protective lift & lobby cladding",
        "Feature wall & bespoke architectural joinery",
        "Marble restoration or large format slabs",
        "Smart lighting automation setup",
        "Strict adherence to noise & weekend curfews",
      ],
      idealFor: "Condo owners seeking luxury finishes executed strictly within MCST rules.",
    },
    {
      type: "Landed & Commercial",
      estTime: "10 - 16 Weeks",
      features: [
        "Multi-storey plumbing & distribution box",
        "Structural beam reinforcing & wet trade",
        "External facade painting & waterproofing",
        "Roof terrace tiling & glass balustrades",
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

  const faqs = [
    {
      q: "Do you handle all HDB renovation permits and approvals?",
      a: "Yes. Renovation Contractor SG handles all necessary HDB renovation permits, hacking endorsements, window replacement permits, and MCST condominium applications directly. You do not need to deal with any paperwork or municipal submissions.",
    },
    {
      q: "Can I do a whole house renovation without hiring an interior designer (ID)?",
      a: "Absolutely. Over 60% of savvy Singaporean homeowners now hire direct contractors like Renovation Contractor SG. If you already have floor plan layouts, Pinterest mood boards, or standard aesthetic requirements, you can save anywhere from $15,000 to $35,000 by working directly with our master craftsmen.",
    },
    {
      q: "What is your payment milestone structure for whole house renovations?",
      a: "We operate on a transparent, milestone-based progressive payment schedule tied to completed work stages (e.g. 10% confirmation deposit, 30% upon completion of hacking & M&E rough-in, 30% upon tiling & plastering, 25% upon carpentry delivery, and 5% final retention upon defect handover).",
    },
    {
      q: "How long does a full 4-room or 5-room HDB renovation take?",
      a: "A new BTO flat typically takes 5 to 7 weeks. A complete resale overhaul (with full hacking of both bathrooms, kitchen, rewiring, and flooring) takes roughly 8 to 10 weeks. We provide a detailed Gantt project timeline before starting.",
    },
    {
      q: "Do you provide warranty coverage after renovation handover?",
      a: "Yes, we provide an official 12-month direct contractor defect warranty covering workmanship, carpentry hinges/sliders, waterproofing integrity, and electrical terminations, with dedicated emergency repair support.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-screen flex items-center py-20 lg:py-28">
        <LiveImage src={"/images/house-reno/1.jpeg"}
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
              <span>Singapore Direct Home Renovation Contractor · In-House Crews</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              Whole House Renovation <br />
              <span className="text-[#8CCB6B]">Engineered with In-House Craftsmanship</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-md">
              Transform your HDB, condominium, or landed property with Singapore&apos;s trusted renovation specialists.
              Zero middleman interior design markups. We own the teams that hack, tile, wire, and build your dream home.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20whole%20house%20renovation.`}
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
                <p className="text-xl sm:text-2xl font-black text-white">HDB / BCA</p>
                <p className="text-xs text-slate-300 font-medium">Approved Permits</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">12 Mos</p>
                <p className="text-xs text-slate-300 font-medium">Defect Warranty</p>
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
              <span className="text-xs sm:text-sm font-semibold tracking-wide">BCA Registered Contractor</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Award className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">15+ Years Singapore Experience</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Guaranteed On-Time Handover</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <DollarSign className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Progressive Payment Milestones</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Phase Architectural Walkthrough (Zig-Zag) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
            Systematic Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Our Master Turnkey Renovation Process
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            Every step is coordinated directly by our senior on-site supervisors to ensure zero delays, tight budget control,
            and superior structural longevity.
          </p>
        </div>

        <div className="space-y-24">
          {renoPhases.map((phase, idx) => {
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
                    <LiveImage src={phase.image}
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
                    {phase.specs.map((spec, sIdx) => (
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
                  <p className="text-xs text-slate-500 mb-6 italic">{prop.idealFor}</p>

                  <ul className="space-y-3 mb-6">
                    {prop.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#4E9A3C] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hi%20Renovation%20Contractor%20SG%2C%20I%20am%20interested%20in%20renovating%20my%20${encodeURIComponent(
                    prop.type
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-xl border border-slate-300 hover:border-[#16263F] hover:bg-[#16263F] hover:text-white text-[#16263F] text-xs font-bold transition-all"
                >
                  Request {prop.type} Scope
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table: Direct Contractor vs Interior Designer */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
            Smart Homeowner Choice
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
            Direct Contractor vs Interior Design (ID) Firm
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            Why pay an extra 20% to 35% commission just for an ID to call contractors like us? Work directly with Renovation Contractor SG.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <thead>
              <tr className="bg-[#16263F] text-white">
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider w-1/4">Evaluation Point</th>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider w-3/8 text-[#A3E635] bg-[#1a2d4b]">
                  Renovation Contractor SG
                </th>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider w-3/8 text-slate-300">
                  Typical Interior Design (ID) Firm
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              {comparison.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50">{item.feature}</td>
                  <td className="py-4 px-6 font-semibold text-emerald-800 bg-emerald-50/40">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item.directContractor}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{item.idFirm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="py-20 bg-[#F1F5F9] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Homeowner Clarifications
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About House Renovation
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

      {/* High Impact Bottom CTA */}
      <section className="bg-gradient-to-r from-[#16263F] to-[#2C6BA6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to Renovate Your Home With Direct Contractor Rates?
          </h2>
          <p className="text-base text-slate-200 max-w-2xl mx-auto mb-8 font-normal">
            Send us your floor plan or schedule a free on-site survey. We will provide an itemized, transparent quotation
            within 24 hours.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(siteConfig.name)}%2C%20I%20would%20like%20a%20quotation%20for%20house%20renovation.`}
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
              <span>Book Site Inspection</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
