"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";

export function ProjectGalleryClient({ initialProjects }: { initialProjects: any[] }) {
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
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  return (
    <>
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
    </>
  );
}

