"use client";

import { useState } from "react";
import { ProjectImage } from "@/components/ProjectImage";
import { Sparkles, Layers, ZoomIn } from "lucide-react";

interface ProjectDetailClientProps {
  project: {
    id: string;
    beforeImage: string;
    afterImage: string;
    gallery?: string[];
  };
  cleanTitle: string;
}

export function ProjectDetailClient({
  project,
  cleanTitle,
}: ProjectDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"after" | "before">("after");
  const [selectedImage, setSelectedImage] = useState<string>(project.afterImage);

  const allImages = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.afterImage, project.beforeImage];

  const handleToggle = (tab: "after" | "before") => {
    setActiveTab(tab);
    setSelectedImage(tab === "after" ? project.afterImage : project.beforeImage);
  };

  const handleSelectThumb = (img: string) => {
    setSelectedImage(img);
    if (img === project.beforeImage) {
      setActiveTab("before");
    } else if (img === project.afterImage) {
      setActiveTab("after");
    }
  };

  const isCurrentBefore = selectedImage === project.beforeImage;

  return (
    <div className="space-y-4">
      {/* Main Image Frame with Floating Before/After Pill Switcher */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-white/15 shadow-2xl aspect-[16/10] sm:aspect-[16/9] w-full">
        <ProjectImage
          src={selectedImage}
          alt={`${cleanTitle} - ${isCurrentBefore ? "Before Renovation" : "Completed Renovation"}`}
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* Ambient Dark Gradient Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Before / After Floating Segmented Control */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 flex items-center p-1 rounded-xl bg-[#0A1424]/90 backdrop-blur-md border border-white/20 shadow-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => handleToggle("before")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "before"
                ? "bg-[#8CCB6B] text-slate-950 shadow-md font-extrabold"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Before Work
          </button>
          <button
            type="button"
            onClick={() => handleToggle("after")}
            className={`px-3 sm:px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "after"
                ? "bg-[#8CCB6B] text-slate-950 shadow-md font-extrabold"
                : "text-slate-300 hover:text-white"
            }`}
          >
            After Completion
          </button>
        </div>

        {/* Stage Status Tag on Bottom Left */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider backdrop-blur-md border shadow-lg ${
              isCurrentBefore
                ? "bg-amber-500/90 text-slate-950 border-amber-300"
                : "bg-[#166534]/90 text-white border-emerald-400"
            }`}
          >
            {isCurrentBefore ? "Initial Site Condition (Before)" : "Completed Handover (After)"}
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-300 font-medium bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            Click thumbnails below to inspect details
          </span>
        </div>
      </div>

      {/* Thumbnails Strip */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 pt-2">
          {allImages.map((img, idx) => {
            const isSelected = selectedImage === img;
            const isBeforeThumb = img === project.beforeImage;
            const isAfterThumb = img === project.afterImage;

            return (
              <button
                type="button"
                key={idx}
                onClick={() => handleSelectThumb(img)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#8CCB6B] shadow-[0_0_15px_rgba(140,203,107,0.4)] scale-[1.02]"
                    : "border-white/15 opacity-70 hover:opacity-100 hover:border-white/40"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {(isBeforeThumb || isAfterThumb) && (
                  <span
                    className={`absolute bottom-1 right-1 text-[9px] font-black px-1.5 py-0.5 rounded shadow ${
                      isBeforeThumb
                        ? "bg-amber-500 text-slate-950"
                        : "bg-[#8CCB6B] text-slate-950"
                    }`}
                  >
                    {isBeforeThumb ? "Before" : "After"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
