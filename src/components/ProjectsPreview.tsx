"use client";

import { useState } from "react";
import Link from "next/link";
import projectsData from "../../data/projects.json";
import { ProjectImage } from "@/components/ProjectImage";
import {
  Calendar,
  Banknote,
  Maximize2,
  MapPin,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";

export function ProjectsPreview() {
  const [activeTabMap, setActiveTabMap] = useState<Record<string, "after" | "before">>({});

  const toggleTab = (id: string, tab: "after" | "before") => {
    setActiveTabMap((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-[#121F33] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#8CCB6B] mb-2.5">
              Verified Workmanship
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Recent Completed Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-normal">
              Direct-to-builder transformations across Singapore HDBs and private estates.
              View actual timelines, scope, and cost ranges.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all self-start md:self-end shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 text-[#8CCB6B]" />
          </Link>
        </div>

        {/* 3-Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.slice(0, 3).map((proj) => {
            const currentTab = activeTabMap[proj.id] || "after";
            const currentImg =
              currentTab === "after" ? proj.afterImage : proj.beforeImage;

            return (
              <div
                key={proj.id}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#8CCB6B]/40 transition-all shadow-xl group"
              >
                {/* Image Container with Before/After Toggle */}
                <div>
                  <div className="relative aspect-[16/11] w-full bg-slate-900 overflow-hidden">
                    <ProjectImage
                      src={currentImg}
                      alt={`${proj.title.replace("TODO_REPLACE: ", "")} (${currentTab})`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Before/After Segmented Control */}
                    <div className="absolute top-3 right-3 z-10 flex rounded-lg bg-black/60 backdrop-blur-md p-1 border border-white/20 text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => toggleTab(proj.id, "before")}
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          currentTab === "before"
                            ? "bg-[#8CCB6B] text-slate-900 shadow-sm"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        Before
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleTab(proj.id, "after")}
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          currentTab === "after"
                            ? "bg-[#8CCB6B] text-slate-900 shadow-sm"
                            : "text-slate-300 hover:text-white"
                        }`}
                      >
                        After
                      </button>
                    </div>

                    {/* Property Type Badge */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-semibold text-white border border-white/15">
                        {proj.propertyType.replace("TODO_REPLACE: ", "")}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-[#8CCB6B] font-semibold mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{proj.location.replace("TODO_REPLACE: ", "")}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#8CCB6B] transition-colors leading-snug">
                      {proj.title.replace("TODO_REPLACE: ", "")}
                    </h3>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs text-slate-300 my-4">
                      <div className="flex items-center gap-2">
                        <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{proj.sizeSqft.replace("TODO_REPLACE: ", "")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{proj.durationDays.replace("TODO_REPLACE: ", "")}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-2 text-white font-bold">
                        <Banknote className="w-3.5 h-3.5 text-[#8CCB6B] shrink-0" />
                        <span>Cost: {proj.costRange.replace("TODO_REPLACE: ", "")}</span>
                      </div>
                    </div>

                    {/* Scope of Work Tags */}
                    <div className="space-y-1.5 mb-2">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                        Scope of Work:
                      </span>
                      {proj.scopeOfWork.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-1.5 text-xs text-slate-300"
                        >
                          <span className="text-[#8CCB6B] mt-0.5">•</span>
                          <span className="truncate">
                            {item.replace("TODO_REPLACE: ", "")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <Link
                    href="/book"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-[#8CCB6B] hover:text-slate-900 border border-white/15 text-xs font-bold transition-all"
                  >
                    <span>Book Free Site Inspection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
