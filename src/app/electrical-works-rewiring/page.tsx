import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getCloudinaryUrl } from "@/lib/cloudinary";
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

export default function ElectricalPage() {
  const disciplines = [
    {
      discipline: "Discipline 01",
      title: "Full House Rewiring & Concealed Conduit Chasing",
      subtitle: "Singapore CP5 Electrical Standard with Neutral Wires for Smart Automation",
      desc: "Old brittle rubber or substandard wiring poses severe fire hazards. Our EMA-licensed electricians run 100% high-purity copper core cables enclosed inside heavy-gauge high-impact PVC conduits. We chase clean wall channels and conceal all cables flush with the wall.",
      specs: [
        "Singapore Standard CP5 & SS 638 compliance",
        "Concealed wall chasing or ultra-slim surface casing",
        "Dedicated neutral wiring at every light switch for smart homes",
        "Full continuity and insulation resistance megger testing",
      ],
      image: "/images/partition-ceiling/2.jpeg",
      tag: "Concealed Rewiring",
    },
    {
      discipline: "Discipline 02",
      title: "Main Distribution Board (DB Box) Upgrades & RCD Protection",
      subtitle: "ABB, Hager & Schneider Residual Current Devices (30mA Safety)",
      desc: "Upgrade obsolete fuse boxes with modern modular consumer units. We install sensitive 30mA Residual Current Circuit Breakers (RCCB/RCD) and individual miniature circuit breakers (MCB) to prevent fatal shocks and localize electrical faults without tripping the entire house.",
      specs: [
        "High-grade Hager or Schneider Electric components",
        "Type A 30mA RCD protection for lightning surge safety",
        "Individual loop isolation for fridges and critical devices",
        "Clear color-coded printed circuit directory labels",
      ],
      image: "/images/partition-ceiling/10.jpeg",
      tag: "DB Box Replacement",
    },
    {
      discipline: "Discipline 03",
      title: "Architectural Cove Lighting, Track Lights & Smart Automation",
      subtitle: "Flicker-Free High CRI90+ LED Drivers & Zigbee/Matter Integration",
      desc: "Elevate your interior ambience with architectural lighting circuits. We design customized double-switched loops, aluminum profile cove extrusions, magnetic low-voltage tracks, and smart dimmer modules compatible with Apple HomeKit, Google Home, and Alexa.",
      specs: [
        "High CRI > 90 LED strip channels with zero dotting",
        "Constant-voltage flicker-free Mean Well drivers",
        "Zigbee / Tuya / Philips Hue smart switch integration",
        "2-way and intermediate staircase/corridor switching",
      ],
      image: "/images/partition-ceiling/1.jpeg",
      tag: "Architectural Lighting",
    },
    {
      discipline: "Discipline 04",
      title: "Dedicated High-Amperage 15A/20A Power Circuit Routing",
      subtitle: "Independent Radial Circuits for Ovens, Induction Hobs & EV Wallboxes",
      desc: "Modern built-in kitchen appliances and fast EV chargers draw substantial amperage. We install dedicated 2.5mm² to 6.0mm² radial circuits protected by 20A/32A double-pole isolator switches directly from the main DB to ensure zero nuisance tripping.",
      specs: [
        "Dedicated 20A double-pole water heater switches",
        "High-draw 32A induction hob radial supply",
        "Built-in oven & steam combi independent loops",
        "EV charger 7.4kW single-phase / 22kW 3-phase cabling",
      ],
      image: "/images/carpentry/6.jpeg",
      tag: "Heavy Appliance Circuits",
    },
  ];

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

  const faqs = [
    {
      q: "Are all your electricians licensed by the Energy Market Authority (EMA)?",
      a: "Yes. All our senior electrical works and DB box installations are performed and certified by licensed electrical workers (LEW) holding valid EMA licenses, ensuring full compliance with Singapore's mandatory safety codes.",
    },
    {
      q: "Is it necessary to rewire a resale flat that is 25+ years old?",
      a: "Highly recommended. Resale flats older than 20 years typically have aged PVC wiring insulation that has degraded over decades of heat, increasing the risk of short circuits and electrical fires. Furthermore, older wiring lacks dedicated earthing cables and cannot support modern induction cookers or multiple aircons.",
    },
    {
      q: "Can I conceal all wiring in an HDB flat instead of using surface casing?",
      a: "Under HDB guidelines, concealed hacking is permitted on brick/block internal partition walls, but not on precast structural reinforced concrete (RC) columns or load-bearing beams. Where RC columns exist, we utilize ultra-low-profile, paintable PVC mini-trunking or conceal the cables inside false ceilings.",
    },
    {
      q: "Why do I need a neutral wire for smart light switches?",
      a: "Modern smart switches (such as Aqara, Tuya, Lutron, and Sonoff) have built-in Wi-Fi or Zigbee radio chips that require a continuous 230V standby current. Running a dedicated neutral wire to every switch plate ensures reliable connection without flickering LED bulbs.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-screen flex items-center py-20 lg:py-28">
        <img
          src={getCloudinaryUrl("/images/partition-ceiling/12.jpeg")}
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
              <span>EMA Certified Electrical Contractor · Singapore</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              Electrical Works &amp; Rewiring <br />
              <span className="text-[#8CCB6B]">Engineered for Safety &amp; Smart Living</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-md">
              Complete turnkey residential &amp; commercial electrical solutions. From whole-unit concealed rewiring
              and DB box safety replacements to high-load appliance isolation and smart lighting design.
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

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">EMA</p>
                <p className="text-xs text-slate-300 font-medium">Licensed Electricians</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">CP5 / SS638</p>
                <p className="text-xs text-slate-300 font-medium">Safety Standard</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                <p className="text-xs text-slate-300 font-medium">Pure Copper Cables</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">24/7</p>
                <p className="text-xs text-slate-300 font-medium">Trip Diagnostics</p>
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
              <span className="text-xs sm:text-sm font-semibold tracking-wide">EMA Safety Compliance</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Cpu className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Smart Home Neutral Wiring</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Lightbulb className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">High CRI Architectural Lighting</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <FileCheck className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Single Line Diagram (SLD) Testing</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Trade Disciplines (Zig-Zag) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
            Engineering Precision
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Specialized Electrical Engineering Services
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            We handle everything from clean concealed wall hacking to high-voltage appliance circuits with zero risk of overload.
          </p>
        </div>

        <div className="space-y-24">
          {disciplines.map((item, idx) => {
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
                    <img
                      src={getCloudinaryUrl(item.image)}
                      alt={item.title}
                      className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#16263F]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                      {item.discipline} · {item.tag}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#16263F] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                      EMA Certified Work
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] block mb-2">
                    {item.discipline} Standard
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mb-4">{item.subtitle}</p>
                  <p className="text-slate-600 leading-relaxed mb-6 font-normal">{item.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {item.specs.map((spec, sIdx) => (
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

      {/* Appliance Load & Cable Matrix */}
      <section className="py-24 bg-[#F8FAFC] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Safety Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              High-Amperage Appliance Load Matrix
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal">
              Ensuring each heavy appliance receives correct wire gauges and dedicated breakers eliminates fire hazards and power tripping.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <thead>
                <tr className="bg-[#16263F] text-white">
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Appliance Type</th>
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Estimated Power Draw</th>
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Required Cable Gauge</th>
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Dedicated Circuit Protection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-sm">
                {loadMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50">{item.appliance}</td>
                    <td className="py-4 px-6 text-slate-700 font-medium">{item.powerDraw}</td>
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
