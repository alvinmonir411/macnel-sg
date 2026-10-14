"use client";

import { useState } from "react";
import Link from "next/link";
import projectsData from "../../../data/projects.json";
import { siteConfig } from "@/config/site";
import { ProjectImage } from "@/components/ProjectImage";
import {
  Calendar,
  Banknote,
  Maximize2,
  MapPin,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Filter,
} from "lucide-react";

export default function ProjectGalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTabMap, setActiveTabMap] = useState<Record<string, "after" | "before">>({});

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

  const toggleTab = (id: string, tab: "after" | "before", e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveTabMap((prev) => ({ ...prev, [id]: tab }));
  };

  const clean = (val: string | undefined) =>
    val ? val.replace(/^TODO_REPLACE:\s*/i, "").trim() : "";

  return (
    <main className="bg-[#0A1124] text-white min-h-screen py-16 sm:py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2C6BA6]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#8CCB6B]/15 rounded-full blur-3xl pointer-events-none" />
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] [background-size:36px_36px] pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/30 bg-[#8CCB6B]/10 px-4 py-1.5 text-xs font-bold text-[#8CCB6B] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8CCB6B]" />
            <span>Interactive Before &amp; After Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Singapore Completed Renovation Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Click any project to inspect the full transformation brief, itemized scope of work,
            before/after comparisons, timelines, and direct contractor cost breakdown.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-12">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#8CCB6B] text-slate-950 shadow-lg scale-105"
                  : "bg-white/5 text-slate-300 border border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((proj) => {
            const currentTab = activeTabMap[proj.id] || "after";
            const currentImg =
              currentTab === "after" ? proj.afterImage : proj.beforeImage;

            return (
              <div
                key={proj.id}
                className="group rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#8CCB6B]/50 hover:shadow-2xl transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Image Container with Before/After Interactive Control */}
                  <div className="relative aspect-[16/11] w-full bg-slate-950 overflow-hidden">
                    <ProjectImage
                      src={currentImg}
                      alt={`${clean(proj.title)} (${currentTab})`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Category Chip */}
                    <div className="absolute top-3 left-3 z-10 bg-[#0A1424]/90 backdrop-blur-md text-[11px] font-bold text-white px-3 py-1 rounded-full border border-white/20 shadow-md">
                      {proj.category}
                    </div>

                    {/* Before/After Segmented Control */}
                    <div className="absolute top-3 right-3 z-20 flex rounded-xl bg-black/70 backdrop-blur-md p-1 border border-white/20 text-xs font-bold shadow-lg">
                      <button
                        type="button"
                        onClick={(e) => toggleTab(proj.id, "before", e)}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          currentTab === "before"
                            ? "bg-[#8CCB6B] text-slate-950 font-black shadow-sm"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        Before
                      </button>
                      <button
                        type="button"
                        onClick={(e) => toggleTab(proj.id, "after", e)}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          currentTab === "after"
                            ? "bg-[#8CCB6B] text-slate-950 font-black shadow-sm"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        After
                      </button>
                    </div>

                    {/* Stage Badge on Bottom Left */}
                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow ${
                          currentTab === "before"
                            ? "bg-amber-500 text-slate-950"
                            : "bg-[#8CCB6B] text-slate-950"
                        }`}
                      >
                        {currentTab === "before" ? "Site Condition (Before)" : "Completed (After)"}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-[#8CCB6B] flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{clean(proj.location)}</span>
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-medium shrink-0">
                        {clean(proj.propertyType)}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#8CCB6B] transition-colors line-clamp-1">
                      {clean(proj.title)}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed font-normal line-clamp-2">
                      {clean(proj.summary)}
                    </p>

                    {/* Key Metrics Bar */}
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 text-xs text-slate-300 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{clean(proj.sizeSqft)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{clean(proj.durationDays)}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-1.5 font-bold text-white pt-1">
                        <Banknote className="w-3.5 h-3.5 text-[#8CCB6B]" />
                        <span>Cost: {clean(proj.costRange)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer with Direct Link to Details */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/projects/${proj.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-[#8CCB6B] text-white hover:text-slate-950 text-xs sm:text-sm font-bold border border-white/20 transition-all duration-300 group-hover:bg-[#8CCB6B] group-hover:text-slate-950 shadow-md"
                  >
                    <span>View Project Details &amp; Brief</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#16263F] via-[#0F1E36] to-[#16263F] border border-white/15 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#8CCB6B] block mb-2">
            Direct In-House Builder
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Need an Itemized Renovation Quotation for Your Property?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Consult directly with our on-site project directors. We provide free on-site floorplan
            measurements, HDB/condo advice, and itemized quotations with zero hidden variation buffers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-2xl hover:scale-105 transition-transform"
            >
              <span>Book Free Site Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base transition-all"
            >
              <span>View Indicative Pricing Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
