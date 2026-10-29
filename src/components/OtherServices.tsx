"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ProjectImage } from "@/components/ProjectImage";
import servicesData from "../../data/services.json";
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

const iconMap: Record<string, any> = {
  Home,
  Grid3X3,
  DoorOpen,
  Lightbulb,
  Paintbrush,
  Hammer,
  Layers,
  Droplets,
};

export function OtherServices({ initialServices }: { initialServices?: any[] } = {}) {
  const [activeTab, setActiveTab] = useState<
    "all" | "renovation" | "surfaces" | "walls-ceiling" | "doors"
  >("all");

  const listSource = (initialServices && initialServices.length > 0) ? initialServices : servicesData;
  const mainServicesList: MainService[] = (listSource as any[]).map((item) => ({
    ...item,
    icon: iconMap[item.iconName] || Home,
  }));

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
    <section id="services" className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-b border-slate-200/70">
      {/* Subtle Architectural Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] mb-3">
              Our Services
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

        {/* Editorial Photo-Driven Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#8CCB6B]/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Image Header using <ProjectImage> */}
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

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0F172A] mb-2 group-hover:text-[#2C6BA6] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal mb-5 line-clamp-2">
                      {service.desc}
                    </p>

                    {/* Specification Badges */}
                    <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                      {service.specs.slice(0, 3).map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#4E9A3C] shrink-0 mt-0.5" />
                          <span className="leading-snug">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Area */}
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
