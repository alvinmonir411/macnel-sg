import { LiveImage } from "@/components/LiveImage";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getLiveSiteData } from "@/lib/db";
import {
  ShieldCheck,
  Users,
  Award,
  Hammer,
  MessageCircle,
  MapPin,
  CheckCircle,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Wrench,
  Zap,
  Sparkles,
  ArrowRight,
  Phone,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Renovation Contractor SG - Direct Singapore Contractor",
  description:
    "Learn about Renovation Contractor SG (UEN: 202402481G) — premier renovation contractor in Singapore. In-house craftsmen handling core renovation trades with scheduled milestones and written warranties.",
};

export default async function AboutUsPage() {
  const siteData = await getLiveSiteData();
  const contact = { ...siteConfig.contact, ...(siteData?.contact || {}) };
  const credentials = { ...siteConfig, ...(siteData?.credentials || {}) };

  const legalName = credentials.legalName || siteConfig.legalName;
  const uen = credentials.uen || siteConfig.uen;
  const whatsappNumber = contact.whatsapp || siteConfig.contact.whatsapp;
  const whatsappDisplay = whatsappNumber.replace(/^65/, "");
  const phonePrimary = contact.phonePrimary || siteConfig.contact.phonePrimary;
  const phoneCallTarget = contact.phoneTel || phonePrimary.replace(/[^0-9+]/g, "");

  const tradeGuilds = [
    {
      trade: "In-House Carpentry Workshop",
      desc: "Our master carpenters fabricate bespoke kitchen cabinets, wardrobes, and feature walls directly in our Singapore carpentry workshop using solid marine plywood and Blum hardware.",
      icon: Hammer,
      badge: "Workshop Fabricated",
    },
    {
      trade: "Wet Trade & Masonry Guild",
      desc: "Full-time tilers specialized in large-format 600x1200 homogeneous slabs, zero-hollow buttering, screed leveling, and dual-layer SikaTop waterproofing membranes.",
      icon: Building2,
      badge: "BCA Certified Tilers",
    },
    {
      trade: "EMA Electrical Engineering",
      desc: "Licensed Electrical Workers (LEW) executing safe CP5-compliant concealed rewiring, DB box upgrades, smart home neutral wiring, and high-draw appliance isolation.",
      icon: Zap,
      badge: "EMA Licensed",
    },
    {
      trade: "Licensed PUB Plumbing Crew",
      desc: "Concealed SS304 stainless steel piping, sanitary ware installations, pressure-tested distribution, and acoustic leak detection with zero recurring leakages.",
      icon: Wrench,
      badge: "PUB Approved",
    },
  ];

  const standards = [
    {
      title: "100% Direct In-House Craftsmen",
      desc: "We do not pass your project to third-party sub-contractors. Our own foremen and master craftsmen manage your site daily.",
    },
    {
      title: "HDB & BCA Regulatory Compliance",
      desc: "All structural hacking, window installations, and sanitary alterations follow strict Singapore Building and Construction Authority codes.",
    },
    {
      title: "Mandatory 48-Hour Water Ponding Leak Test",
      desc: "Before laying bathroom tiles, we submerge waterproofed floors in water for 48 hours to guarantee zero water seepage to lower floor units.",
    },
    {
      title: "Itemized Milestone Quotations",
      desc: "Clear per-foot-run pricing with zero surprise variation orders (VO). You pay progressively according to completed construction stages.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-screen flex items-center py-20 lg:py-28">
        <img
          src="/images/house-reno/1.jpeg"
          alt="About Renovation Contractor SG Singapore"
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
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/15 px-4 py-1.5 text-xs font-bold text-white mb-6 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>{legalName} · UEN: {uen}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              Craftsmanship First. <br />
              <span className="text-[#8CCB6B]">Zero Middlemen Markups.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-md">
              At {siteConfig.name}, we eliminate the bloated overhead of design sales agencies. We own our
              carpentry workshop, employ our own tilers and plumbers, and deliver turnkey renovations with uncompromising structural
              integrity.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello%20${encodeURIComponent(siteConfig.name)}%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20renovation%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-2xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Speak Directly with Project Manager</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-all"
              >
                <CalendarCheck className="w-4 h-4 text-[#A3E635]" />
                <span>Book Site Consultation</span>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                <p className="text-xs text-slate-300 font-medium">In-House Tradesmen</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">8</p>
                <p className="text-xs text-slate-300 font-medium">Core Trades</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">BCA / HDB</p>
                <p className="text-xs text-slate-300 font-medium">Permit Compliant</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">12 Mos</p>
                <p className="text-xs text-slate-300 font-medium">Direct Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Heritage */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Our Founding Principle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mb-6">
              Why We Refuse to Subcontract Your Home
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-5 font-normal">
              Most homeowners in Singapore hire an interior design firm thinking the designer builds the house. In reality,
              typical design firms are sales brokerages who subcontract every single trade to third-party workers, pocketing
              a 20% to 35% margin while diluting quality control.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-6 font-normal">
              {siteConfig.name} was established to restore pure direct contractor craftsmanship. When you work with us, you deal
              directly with our Founder, Managing Director, and master tradesmen responsible for your hacking, waterproofing, piping, tiling, electrical, and
              custom cabinetry.
            </p>

            <div className="space-y-3 pt-2">
              {standards.map((std, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#8CCB6B]/20 flex items-center justify-center text-[#4E9A3C] shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{std.title}</h4>
                    <p className="text-xs text-slate-600 font-normal mt-0.5">{std.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8CCB6B]/40 group">
            <LiveImage src={"/images/team/owner.jpg"}
              alt="Renovation Contractor SG Founder & Managing Director on site"
              className="w-full h-[520px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#16263F]/95 via-[#16263F]/35 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs uppercase font-bold text-[#A3E635] tracking-wider mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8CCB6B]" />
                <span>Founder &amp; Managing Director On-Site</span>
              </span>
              <p className="text-xl font-bold">
                Direct Hands-On Supervision from Founder to Handover
              </p>
              <p className="text-xs text-slate-300 mt-2">
                BCA Registered Contractor (CR06 / L1 Interior Decoration) · Compliance with BCA SS CP5, PUB Code of Practice, and HDB guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 In-House Guilds */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Direct Trade Guilds
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Our Specialized In-House Trade Units
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal">
              Unlike brokerage firms, we equip and employ our own trade specialists with industrial-grade tools and vehicles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tradeGuilds.map((guild, idx) => {
              const Icon = guild.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#16263F] text-[#A3E635] flex items-center justify-center mb-5 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#2C6BA6] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 block w-max mb-3">
                      {guild.badge}
                    </span>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">{guild.trade}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{guild.desc}</p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#16263F]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8CCB6B]" />
                    <span>In-House Employed</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office & Operations Details */}
      <section className="py-20 bg-gradient-to-r from-[#16263F] to-[#2C6BA6] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#A3E635] bg-white/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <MapPin className="w-4 h-4" />
            <span>Singapore Registered Business · UEN Verified</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">{legalName}</h3>

          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal">
            UEN: {uen} · {contact.address}
            <br />
            Operations: {contact.operatingHours}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20${encodeURIComponent(legalName)}%2C%20I%20would%20like%20to%20visit%20or%20inquire%20about%20renovation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-slate-950 font-black text-sm shadow-2xl hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>WhatsApp Us: +65 {whatsappDisplay}</span>
            </a>

            <a
              href={`tel:${phoneCallTarget}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#16263F] font-bold text-sm shadow-xl hover:bg-slate-100 transition-all"
            >
              <Phone className="w-4 h-4 text-[#2C6BA6]" />
              <span>Call Hotline: {phonePrimary}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
