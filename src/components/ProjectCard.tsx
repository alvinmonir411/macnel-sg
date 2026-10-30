"use client";

import { useState } from "react";
import Link from "next/link";
import { ProjectImage } from "@/components/ProjectImage";
import {
  MapPin,
  Maximize2,
  Clock,
  ArrowRight,
} from "lucide-react";

export interface ProjectCardProps {
  project: {
    id: string;
    category?: string;
    title: string;
    propertyType: string;
    location: string;
    sizeSqft: string;
    durationDays: string;
    costRange?: string;
    beforeImage: string;
    afterImage: string;
    summary: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [currentTab, setCurrentTab] = useState<"after" | "before">("after");
  const [hasInteractedBefore, setHasInteractedBefore] = useState(false);

  const clean = (val: string | undefined) =>
    val ? val.replace(/^TODO_REPLACE:\s*/i, "").trim() : "";

  const toggleTab = (tab: "after" | "before", e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (tab === "before") setHasInteractedBefore(true);
    setCurrentTab(tab);
  };

  const handleCardClick = () => {
    setHasInteractedBefore(true);
    setCurrentTab((prev) => (prev === "after" ? "before" : "after"));
  };

  return (
    <div
      onMouseEnter={() => setHasInteractedBefore(true)}
      className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-[#16a34a]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Interactive Image Frame */}
        <div
          onClick={handleCardClick}
          className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden cursor-pointer select-none group/img"
          title="Click to toggle Before / After view"
        >
          {/* After Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              currentTab === "after" ? "opacity-100 z-1" : "opacity-0 pointer-events-none"
            }`}
          >
            <ProjectImage
              src={project.afterImage}
              alt={`${clean(project.title)} (After Renovation)`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Before Image: Only mounted after first hover or click to eliminate initial bandwidth penalty */}
          {hasInteractedBefore && (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                currentTab === "before" ? "opacity-100 z-1" : "opacity-0 pointer-events-none"
              }`}
            >
              <ProjectImage
                src={project.beforeImage}
                alt={`${clean(project.title)} (Before Renovation)`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          )}

          {/* Subtle bottom gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25 pointer-events-none z-10" />

          {/* Category Chip (Top Left) */}
          <div className="absolute top-3 left-3 z-20 bg-[#0A1424]/90 backdrop-blur-md text-[11px] font-bold text-white px-3 py-1 rounded-full border border-white/20 shadow-md">
            {project.category || clean(project.propertyType)}
          </div>

          {/* Before/After Interactive Switcher (Top Right) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 z-20 flex rounded-xl bg-black/75 backdrop-blur-md p-1 border border-white/25 text-xs font-bold shadow-lg"
          >
            <button
              type="button"
              onClick={(e) => toggleTab("before", e)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                currentTab === "before"
                  ? "bg-amber-700 text-white font-black shadow-sm"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              Before
            </button>
            <button
              type="button"
              onClick={(e) => toggleTab("after", e)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                currentTab === "after"
                  ? "bg-[#15803d] text-white font-black shadow-sm"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              After
            </button>
          </div>

          {/* Stage Status Tag (Bottom Left) */}
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow backdrop-blur-md ${
                currentTab === "before"
                  ? "bg-amber-500/95 text-slate-950 font-bold"
                  : "bg-[#166534]/95 text-white font-bold"
              }`}
            >
              {currentTab === "before" ? "Site Before Work" : "Completed Handover"}
            </span>
          </div>

          {/* Click to Flip Prompt (Bottom Right) */}
          <div className="absolute bottom-3 right-3 z-20 text-[10px] font-semibold text-white/80 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10 opacity-80 group-hover/img:opacity-100 transition-opacity">
            Click to {currentTab === "after" ? "view Before" : "view After"} ⟲
          </div>
        </div>

        {/* Compact Card Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-[#166534] flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#16a34a]" />
              <span className="truncate">{clean(project.location)}</span>
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold shrink-0 border border-slate-200">
              {clean(project.propertyType)}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#166534] transition-colors line-clamp-1">
            {clean(project.title)}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed font-normal line-clamp-2">
            {clean(project.summary)}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium truncate">{clean(project.sizeSqft)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium truncate">{clean(project.durationDays)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="p-5 sm:p-6 pt-0">
        <Link
          href={`/projects/${project.id}`}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-[#166534] text-white text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 group-hover:bg-[#166534]"
        >
          <span>View Project Details &amp; Scope</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
