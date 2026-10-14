"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ProjectImage } from "@/components/ProjectImage";
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
  CalendarCheck,
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
    badge: "Direct Contractor",
    desc: "Complete turnkey home transformation for HDB flats, condominiums, and landed homes with dedicated supervision.",
    specs: [
      "Single builder team with one accountable supervisor",
      "Full HDB and BCA renovation permit submission",
      "Guaranteed milestone schedule and defect checks",
    ],
    image: "/images/house-reno/1.jpeg",
    href: "/house-renovation",
    icon: Home,
  },
  {
    id: "tiling-services",
    category: "surfaces",
    title: "Tiling Services",
    badge: "Precision Masonry",
    desc: "Laser-aligned floor and wall tiling for bathrooms, kitchens, and living rooms with anti-slip finishes.",
    specs: [
      "Large format homogeneous, ceramic & porcelain slabs",
      "3D laser leveling with zero tile lippage",
      "Waterproof anti-mold cement and epoxy grouting",
    ],
    image: "/images/tiling/2.jpeg",
    href: "/tiling-works",
    icon: Grid3X3,
  },
  {
    id: "door-window",
    category: "doors",
    title: "Door & Window Services",
    badge: "BCA Compliant",
    desc: "BCA-certified aluminium sliding windows, soundproof double glazing, and trackless bi-fold doors.",
    specs: [
      "Grade SS304 stainless safety rivets and stays",
      "Acoustic noise reduction glass configurations",
      "Trackless Slide & Swing toilet bi-fold doors",
    ],
    image: "/images/door-window/4.jpeg",
    href: "/door-window-services",
    icon: DoorOpen,
  },
  {
    id: "false-ceiling-partition",
    category: "walls-ceiling",
    title: "False Ceiling & Partition",
    badge: "Galvanized Steel",
    desc: "Architectural drop ceilings, cove lighting pelmets, curtain boxes, and acoustic drywall partitions.",
    specs: [
      "Hot-dipped galvanized steel channel framing",
      "Moisture-resistant plasterboard for wet areas",
      "Acoustic rockwool sound insulation infills",
    ],
    image: "/images/partition-ceiling/Floating-Ceiling-Effect_Picfinder.jpg",
    href: "/false-ceiling",
    icon: Lightbulb,
  },
  {
    id: "painting-services",
    category: "walls-ceiling",
    title: "Painting Services",
    badge: "Nippon Paint",
    desc: "Flawless wall and ceiling painting with genuine Nippon Odourless and Medifresh anti-bacterial paint.",
    specs: [
      "Nippon 5101 Odour-Less wall sealer undercoat",
      "2 finishing coats of genuine Nippon paint",
      "Complete floor and furniture masking protection",
    ],
    image: "/images/partition-ceiling/6.jpeg",
    href: "/house-painting-plastering",
    icon: Paintbrush,
  },
  {
    id: "plastering-services",
    category: "walls-ceiling",
    title: "Plastering Services",
    badge: "Skim Coating",
    desc: "Multi-layer skim coating, surface repair, and crack patching for perfectly flat, smooth surfaces.",
    specs: [
      "Polymer-modified fine skim coat application",
      "Fiberglass mesh reinforcement on crack joints",
      "Laser-flat surface inspection prior to painting",
    ],
    image: "/images/partition-ceiling/4.jpeg",
    href: "/house-painting-plastering",
    icon: Hammer,
  },
  {
    id: "flooring-carpet-services",
    category: "surfaces",
    title: "Flooring & Carpet Services",
    badge: "SPC & Parquet",
    desc: "100% waterproof SPC rigid vinyl flooring, dust-free parquet sanding, and commercial carpet tiles.",
    specs: [
      "100% waterproof SPC rigid vinyl click overlay",
      "Swedish Bona 99% dust-free parquet restoration",
      "Heavy-traffic commercial modular carpet tiles",
    ],
    image: "/images/tiling/11.jpeg",
    href: "/flooring-carpet-services",
    icon: Layers,
  },
  {
    id: "toilet-renovation",
    category: "renovation",
    title: "Toilet Renovation",
    badge: "Wet Trade Specialty",
    desc: "Turnkey bathroom overhauls: pneumatic hacking, dual-layer waterproofing, PUB piping, and tiling.",
    specs: [
      "Hacking down to bare structural concrete",
      "Dual-coat waterproof membrane & 48-hr ponding test",
      "PUB-licensed plumbing and sanitary fixture setup",
    ],
    image: "/images/tiling/12.jpeg",
    href: "/toilet-renovation-in-singapore",
    icon: Droplets,
  },
];

export function OtherServices() {
  const [activeTab, setActiveTab] = useState<
    "all" | "renovation" | "surfaces" | "walls-ceiling" | "doors"
  >("all");

  const filteredServices =
    activeTab === "all"
      ? mainServicesList
      : mainServicesList.filter((item) => item.category === activeTab);

  const tabs = [
    { id: "all", label: "All Main Services" },
    { id: "renovation", label: "House & Toilet Renovation" },
    { id: "surfaces", label: "Tiling, Flooring & Carpet" },
    { id: "walls-ceiling", label: "Ceiling, Partition & Paint" },
    { id: "doors", label: "Door & Window" },
  ] as const;

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] mb-3">
              Direct In-House Core Trades
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Our Core Renovation Services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Direct certified craftsmen for Tiling, Doors &amp; Windows, False Ceiling,
              Painting, Flooring, and Turnkey Renovation. Every project is executed with
              scheduled milestones and written warranties.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 hover:border-[#16263F] text-[#16263F] text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <span>View All 8 Core Trades</span>
              <ArrowRight className="w-4 h-4 text-[#2C6BA6]" />
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#16263F] text-white shadow-md scale-[1.02]"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editorial Photo-Driven Cards Grid (Rule A.3 & A.5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#8CCB6B]/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Image Header using <ProjectImage> (Rule A.5) */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <ProjectImage
                    src={service.image}
                    alt={service.title}
                    fallbackText="Add real project photo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                  {/* Certified Tag */}
                  <div className="absolute top-3 left-3 bg-[#16263F]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#8CCB6B]" />
                    <span>{service.badge}</span>
                  </div>

                  {/* Floating Circular Icon */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md text-[#16263F] shadow-lg flex items-center justify-center group-hover:bg-[#8CCB6B] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Body: Min 14px text, Max 2 lines desc, Max 3 bullets (Rule A.3) */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0F172A] mb-2 group-hover:text-[#2C6BA6] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal mb-5 line-clamp-2">
                      {service.desc}
                    </p>

                    {/* Specification Badges (Max 3, clean text) */}
                    <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                      {service.specs.slice(0, 3).map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#4E9A3C] shrink-0 mt-0.5" />
                          <span className="leading-snug">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Area: Consistent Primary CTA (Rule C.4) */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <Link
                      href={`/book?service=${encodeURIComponent(service.id)}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Book Free Site Inspection</span>
                    </Link>

                    {/* Secondary Actions */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#16263F] hover:text-[#2C6BA6] transition-colors"
                      >
                        <span>Explore Scope</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(
                          siteConfig.name
                        )}%2C%20I%20would%20like%20a%20quotation%20for%20${encodeURIComponent(
                          service.title
                        )}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-[#8CCB6B] text-emerald-800 hover:text-white border border-emerald-200 hover:border-[#8CCB6B] text-xs font-bold transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
