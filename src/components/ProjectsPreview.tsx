"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import projectsData from "../../data/projects.json";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Sliders,
  Check,
  Maximize2,
} from "lucide-react";

export function ProjectsPreview() {
  // Only display featured projects on the homepage
  const featuredProjects = projectsData.filter((p) => p.featured === true);
  const displayProjects =
    featuredProjects.length > 0 ? featuredProjects : projectsData.slice(0, 3);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          prev === 0 ? displayProjects.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) =>
          prev === displayProjects.length - 1 ? 0 : prev + 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayProjects.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayProjects.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === displayProjects.length - 1 ? 0 : prev + 1
    );
  };

  const currentProject = displayProjects[currentIndex];

  return (
    <section
      id="portfolio"
      className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200/70"
    >
      {/* Subtle Architectural Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Recent Completed Projects
            </h2>
          </div>

          {/* Carousel Slide Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 tabular-nums">
              <span className="text-slate-900 text-sm font-black">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>{" "}
              / {String(displayProjects.length).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous project transformation"
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-950 shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next project transformation"
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-950 shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Grand High-Impact Before & After Showcase Slider */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main Large Before/After Display */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-950">
            {displayProjects.map((proj, idx) => (
              <div
                key={proj.id}
                className={`transition-opacity duration-500 ${
                  idx === currentIndex ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                <BeforeAfterSlider
                  beforeImage={proj.beforeImage}
                  afterImage={proj.afterImage}
                  alt={proj.title || "Renovation Project"}
                  className="aspect-[16/10] sm:aspect-[16/9] min-h-[360px] sm:min-h-[520px] w-full rounded-none border-0"
                />
              </div>
            ))}

            {/* Floating Left / Right Arrow Buttons on Image */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Project"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Project"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Interactive Thumbnail Navigation Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Project Thumbnails Selector */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar max-w-full">
              {displayProjects.map((proj, idx) => (
                <button
                  type="button"
                  key={proj.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    currentIndex === idx
                      ? "border-[#166534] ring-2 ring-[#166534]/30 scale-105 shadow-md"
                      : "border-slate-300 hover:border-slate-500 opacity-60 hover:opacity-100"
                  }`}
                  style={{ width: "80px", height: "54px" }}
                  title={`View project ${idx + 1}`}
                >
                  <img
                    src={proj.afterImage}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                  {currentIndex === idx && (
                    <div className="absolute inset-0 bg-[#166534]/20 border-t-2 border-[#166534]" />
                  )}
                </button>
              ))}
            </div>

            {/* Link to Full Projects Gallery */}
            <Link
              href="/project-gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold shadow-sm transition-all hover:border-slate-400 group"
            >
              <span>View All Projects in Gallery ({projectsData.length})</span>
              <ArrowRight className="w-4 h-4 text-[#16a34a] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
