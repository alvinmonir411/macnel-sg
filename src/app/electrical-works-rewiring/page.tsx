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
  Zap,
  ShieldCheck,
  Cpu,
  Sparkles,
  CalendarCheck,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Radio,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Electrical Works & Rewiring Singapore | EMA Licensed - Renovation Contractor SG",
  description:
    "Certified EMA licensed electrical contractor in Singapore. Full house rewiring, DB box replacement, power socket addition, smart switches & emergency power trip troubleshooting.",
  keywords: [
    "electrical contractor singapore",
    "house rewiring singapore",
    "licensed electrician singapore",
    "db box replacement singapore",
    "power trip repair singapore",
    "smart switch installation singapore",
  ],
};

const loadMatrix = [
  {
    appliance: "Storage Water Heater (25L - 50L)",
    powerDraw: "2,500W - 3,000W",
    requiredCable: "2.5mm² Copper Cable",
    protection: "20A Double-Pole DP Isolator",
  },
  {
    appliance: "Multi-Zone Induction Hob",
    powerDraw: "4,000W - 7,400W",
    requiredCable: "4.0mm² - 6.0mm² Cable",
    protection: "32A Dedicated MCB Circuit",
  },
  {
    appliance: "Multi-Split Inverter Air-Conditioner",
    powerDraw: "2,000W - 4,500W",
    requiredCable: "4.0mm² High-Temp Cable",
    protection: "20A Weatherproof Rotary Isolator",
  },
  {
    appliance: "Built-In Convection Oven",
    powerDraw: "2,800W - 3,500W",
    requiredCable: "2.5mm² Heat-Resistant Wire",
    protection: "15A/20A Dedicated Loop",
  },
];

export default async function ElectricalPage() {
  const siteData = await getLiveSiteData();
  const overrides = siteData?.site_images || {};
  const pageData = siteData?.service_pages?.electrical;

  const heroImage =
    overrides["electrical_hero"] ||
    overrides["/images/electrical/hero.jpeg"] ||
    pageData?.hero?.defaultImage ||
    "/images/electrical/hero.jpeg";

  const disciplines = (pageData?.disciplines || []).map((d: any) => ({
    ...d,
    image: overrides[d.slotId] || overrides[d.image] || d.image,
  }));

  const faqs = pageData?.faqs || [];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-screen flex items-center py-20 lg:py-28">
        <LiveImage
          src={heroImage}
          slotId="electrical_hero"
          alt="Electrical Works & Rewiring Singapore"
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
              <Zap className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>{pageData?.hero?.subtitle || "EMA Certified Electrical Contractor · Singapore"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              {pageData?.hero?.title || "Licensed EMA Electrical Works & Complete House Rewiring"}
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-md">
              {pageData?.hero?.desc ||
                "Certified electrical installation and rewiring for HDB flats, condominiums, and commercial spaces. Concealed conduits, distribution board upgrades, architectural cove LED lighting, and smart home switches."}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20electrical%20works%20and%20rewiring.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-2xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp Floor Plan For Electrical Quote</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-all"
              >
                <Phone className="w-4 h-4 text-[#A3E635]" />
                <span>Call {siteConfig.contact.phonePrimary}</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">EMA</p>
                <p className="text-xs text-slate-300 font-medium">Licensed Workers</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">CP5 / SS638</p>
                <p className="text-xs text-slate-300 font-medium">Safety Compliant</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">30mA RCD</p>
                <p className="text-xs text-slate-300 font-medium">Surge Protection</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">12-Month</p>
                <p className="text-xs text-slate-300 font-medium">Direct Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (4 Disciplines) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {disciplines.map((item: any, idx: number) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={item.discipline}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                    <LiveImage
                      src={item.image}
                      slotId={item.slotId}
                      alt={item.title}
                      className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#16263F]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                      {item.discipline} · {item.tag}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#16263F] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                      EMA Licensed Verification
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
                    {item.discipline} Scope
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mb-4">{item.subtitle}</p>
                  <p className="text-slate-600 leading-relaxed mb-6 font-normal">{item.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {item.specs?.map((spec: string, sIdx: number) => (
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

      {/* Appliance Load & Amperage Safety Matrix */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
              Engineering Specs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
              High-Amperage Circuit Specifications
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Modern heavy electrical appliances require dedicated cabling dimensions and breakers to prevent hazardous cable overheating and frequent DB box trips.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-xs sm:text-sm">
              <thead className="bg-[#16263F] text-white">
                <tr>
                  <th className="py-4 px-6 font-bold">Appliance Category</th>
                  <th className="py-4 px-6 font-bold">Estimated Power Draw</th>
                  <th className="py-4 px-6 font-bold">Dedicated Cable Spec</th>
                  <th className="py-4 px-6 font-bold">Breaker / Isolator Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {loadMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{item.appliance}</td>
                    <td className="py-4 px-6">{item.powerDraw}</td>
                    <td className="py-4 px-6 font-semibold text-[#2C6BA6]">{item.requiredCable}</td>
                    <td className="py-4 px-6 font-semibold text-emerald-800">{item.protection}</td>
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
              Safety Clarifications
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About Electrical Works
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq: any, idx: number) => (
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
            Need Certified Electrical Works or Safe Rewiring?
          </h2>
          <p className="text-base text-slate-200 max-w-2xl mx-auto mb-8 font-normal">
            Contact our licensed electrical workers (LEW) today for an on-site safety inspection and electrical point quotation.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(siteConfig.name)}%2C%20I%20would%20like%20an%20electrical%20quotation.`}
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
