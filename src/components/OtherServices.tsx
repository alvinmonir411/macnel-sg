"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Grid3X3,
  DoorOpen,
  Lightbulb,
  Paintbrush,
  Hammer,
  Home,
  Layers,
  Droplets,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
  BadgeCheck,
} from "lucide-react";

interface MainService {
  id: string;
  category: "all" | "renovation" | "surfaces" | "walls-ceiling" | "doors";
  title: string;
  badge: string;
  desc: string;
  specs: string[];
  image: string;
  href: string;
  icon: typeof Grid3X3;
}

const mainServicesList: MainService[] = [
  {
    id: "house-renovation",
    category: "renovation",
    title: "House Renovation",
    badge: "Direct Turnkey Contractor",
    desc: "Complete home transformation for HDB BTO, mature resale apartments, condominiums, and landed homes with direct contractor pricing and zero ID markups.",
    specs: ["Save 20% - 30% without ID middleman", "Full HDB & BCA renovation permit submission", "Dedicated on-site supervisor & guaranteed timeline"],
    image: "/images/house-reno/1.jpeg",
    href: "/house-renovation",
    icon: Home,
  },
  {
    id: "tiling-services",
    category: "surfaces",
    title: "Tiling Services",
    badge: "BCA Certified Tilers",
    desc: "High-precision floor and wall tiling for bathrooms, kitchens, and living rooms. Zero-hollow buttering, R10 anti-slip, and 45° mitred external edge joints.",
    specs: ["600x1200 Large format homogeneous slabs", "Laser 3D leveling with zero tile lippage", "Mapei Ultracolor anti-mold waterproof grout"],
    image: "/images/tiling/2.jpeg",
    href: "/tiling-works",
    icon: Grid3X3,
  },
  {
    id: "door-window",
    category: "doors",
    title: "Door & Window Services",
    badge: "BCA Approved Installers",
    desc: "BCA-certified aluminium casement & sliding windows, soundproof acoustic double glazing, fire-rated timber entrance doors, and trackless toilet bi-fold doors.",
    specs: ["Grade SS304 stainless safety rivets & stays", "-42 dB Acoustic noise reduction glass", "Trackless Slide & Swing toilet doors (No hacking)"],
    image: "/images/door-window/4.jpeg",
    href: "/door-window-services",
    icon: DoorOpen,
  },
  {
    id: "false-ceiling-partition",
    category: "walls-ceiling",
    title: "False Ceiling & Partition",
    badge: "Saint-Gobain Gyproc",
    desc: "Architectural drop ceilings, cove lighting pelmets, curtain boxes, and acoustic drywall partitions built with heavy-duty galvanized steel framing.",
    specs: ["Hot-dipped zinc galvanised steel channel grids", "Acoustic rockwool sound insulation infill", "3-coat fiber-reinforced anti-crack joint taping"],
    image: "/images/partition-ceiling/Floating-Ceiling-Effect_Picfinder.jpg",
    href: "/false-ceiling",
    icon: Lightbulb,
  },
  {
    id: "painting-services",
    category: "walls-ceiling",
    title: "Painting Services",
    badge: "Nippon Paint System",
    desc: "Flawless wall and ceiling painting using genuine Nippon Odourless and Medifresh anti-bacterial paint. Full floor masking and clean furniture wrapping.",
    specs: ["Nippon 5101 Odour-Less wall sealer coat", "2 coats Nippon Medifresh anti-bacterial paint", "Comprehensive furniture and floor drop-sheet wrapping"],
    image: "/images/partition-ceiling/6.jpeg",
    href: "/house-painting-plastering",
    icon: Paintbrush,
  },
  {
    id: "plastering-services",
    category: "walls-ceiling",
    title: "Plastering Services",
    badge: "Ultra-Smooth Skim Coat",
    desc: "Expert wall smoothing, multi-layer skim coating, plaster patching, and joint repair. Eliminates wall undulations, hairline cracks, and surface blemishes.",
    specs: ["Pre-mixed polymer-modified fine skim coating", "Fiberglass mesh reinforcement for crack bridging", "Laser-flat surface inspection prior to painting"],
    image: "/images/partition-ceiling/4.jpeg",
    href: "/house-painting-plastering",
    icon: Hammer,
  },
  {
    id: "flooring-carpet-services",
    category: "surfaces",
    title: "Flooring & Carpet Services",
    badge: "Bona Dust-Free Sanding",
    desc: "Swedish Bona 99% dust-free parquet sanding & varnishing, 100% waterproof SPC rigid vinyl click-lock flooring, and heavy-duty commercial carpet tiles.",
    specs: ["Non-toxic Swedish Bona Traffic HD polyurethane", "100% waterproof SPC direct tile overlay", "High-density nylon commercial acoustic carpet tiles"],
    image: "/images/tiling/11.jpeg",
    href: "/flooring-carpet-services",
    icon: Layers,
  },
  {
    id: "toilet-renovation",
    category: "renovation",
    title: "Toilet & Bathroom Renovation",
    badge: "Signature Wet Trade",
    desc: "Turnkey bathroom overhauls: regulated pneumatic hacking, dual-layer SikaTop waterproofing, concealed PUB piping, tiling, and sanitary ware fit-out.",
    specs: ["Mandatory 48-hour water ponding leak test", "PUB certified SS304 stainless steel piping", "R10 anti-slip floor tiles with clean fall to drain"],
    image: "/images/tiling/12.jpeg",
    href: "/toilet-renovation-in-singapore",
    icon: Droplets,
  },
];

export function OtherServices() {
  const [activeTab, setActiveTab] = useState<"all" | "renovation" | "surfaces" | "walls-ceiling" | "doors">("all");

  const filteredServices =
    activeTab === "all"
      ? mainServicesList
      : mainServicesList.filter((item) => item.category === activeTab);

  const tabs = [
    { id: "all", label: "All Main Services" },
    { id: "renovation", label: "House & Toilet Renovation" },
    { id: "surfaces", label: "Tiling, Flooring & Carpet" },
    { id: "walls-ceiling", label: "Ceiling, Partition, Paint & Plaster" },
    { id: "doors", label: "Door & Window" },
  ] as const;

  return (
    <section id="other-services" className="py-24 lg:py-32 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative architectural background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/15 px-3.5 py-1 text-xs font-bold text-[#16263F] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#4E9A3C]" />
              <span>Direct Renovation Contractor · Singapore</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">
              Our Core Renovation Services
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Direct in-house craftsmen for Tiling, Doors &amp; Windows, False Ceiling &amp; Partitions, Painting &amp; Plastering,
              Flooring &amp; Carpets, and Turnkey House Renovation. Zero middleman ID markups.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 hover:border-[#16263F] text-[#16263F] text-xs font-bold shadow-sm transition-all"
            >
              <span>View All Service Scopes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#16263F] text-white shadow-md scale-[1.02]"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editorial Photo-Driven Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#8CCB6B]/60 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Subtle dark gradient overlay so badges pop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                  {/* Certified Tag */}
                  <div className="absolute top-3 left-3 bg-[#16263F]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                    <BadgeCheck className="w-3 h-3 text-[#A3E635]" />
                    <span>{service.badge}</span>
                  </div>

                  {/* Floating Circular Icon */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md text-[#16263F] shadow-lg flex items-center justify-center group-hover:bg-[#8CCB6B] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0F172A] mb-2 group-hover:text-[#2C6BA6] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-5">
                      {service.desc}
                    </p>

                    {/* Specification Badges */}
                    <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                      {service.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-[11px] text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#4E9A3C] shrink-0 mt-0.5" />
                          <span className="leading-tight">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#16263F] hover:text-[#2C6BA6] transition-colors"
                    >
                      <span>Explore Scope</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20quotation%20for%20${encodeURIComponent(
                        service.title
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8CCB6B]/15 hover:bg-[#8CCB6B] text-[#16263F] hover:text-white text-[11px] font-bold transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Quote</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Multi-Trade Value Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#16263F] to-[#2C6BA6] p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
            <Building2 className="w-72 h-72 text-white" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-[#A3E635] mb-3 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Renovation Contractor Guarantee</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Need Multiple Renovation Trades Handled Seamlessly?
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed mb-6 font-normal">
              When you hire MACNEL for your Tiling, False Ceilings, Painting, Plastering, Doors, and Flooring, our dedicated
              in-house project foremen coordinate every stage with zero downtime, saving you thousands on middleman fees.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20have%20a%20renovation%20project%20and%20would%20like%20a%20direct%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl brand-gradient text-white text-xs font-bold shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Get Direct Contractor Quotation</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#16263F] text-xs font-bold shadow-md hover:bg-slate-100 transition-all"
              >
                <span>Book Free Site Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
