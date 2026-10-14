"use client";

import Link from "next/link";
import projectsData from "../../data/projects.json";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRight, Sparkles } from "lucide-react";

export function ProjectsPreview() {
  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200/70">
      {/* Subtle Architectural Dot Grid - Matching Core Services (NO LINE GRID) */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#166534] mb-2.5">
              Verified Workmanship
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Recent Completed Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl font-normal leading-relaxed">
              Direct-to-builder transformations across Singapore HDBs and private estates.
              Toggle Before &amp; After on each card or click to view the full scope.
            </p>
          </div>

          <Link
            href="/project-gallery"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs sm:text-sm shadow-sm transition-all self-start md:self-end shrink-0"
          >
            <span>View All Projects &amp; Gallery</span>
            <ArrowRight className="w-4 h-4 text-[#16a34a]" />
          </Link>
        </div>

        {/* 3 Featured Compact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.slice(0, 3).map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}
