"use client";

import { useState } from "react";
import Link from "next/link";
import projectsData from "../../../data/projects.json";
import { siteConfig } from "@/config/site";
import { ProjectCard } from "@/components/ProjectCard";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";

export default function ProjectGalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "House Renovation",
    "Toilet Renovation",
    "Condo Renovation",
    "Carpentry",
    "False Ceiling",
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-[#F8FAFC] text-slate-900 min-h-screen py-16 sm:py-24 relative overflow-hidden border-b border-slate-200/70">
      {/* Subtle Architectural Dot Grid - Matching Core Services (NO LINE GRID) */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-[#166534] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>Interactive Before &amp; After Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-4 leading-tight">
            Singapore Completed Renovation Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Toggle between Before &amp; After directly on each project card. Click any project
            to view the full detailed brief, technical highlights, and itemized scope of works.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-12">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#16263F] text-white shadow-md scale-[1.02]"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Compact, Interactive Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>

        {/* Bottom Booking Banner */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#166534] block mb-2">
            Direct In-House Builder
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Need an Itemized Renovation Quotation for Your Property?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Consult directly with our on-site project directors. We provide free on-site floorplan
            measurements, HDB/condo advice, and itemized quotations with zero hidden variation buffers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition-transform"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Free Site Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(siteConfig.name)}%2C%20I%20would%20like%20a%20free%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm sm:text-base transition-all shadow-sm"
            >
              <span>Instant WhatsApp Quote</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
