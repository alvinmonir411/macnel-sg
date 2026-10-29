"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ProjectImage } from "@/components/ProjectImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt = "Project before and after comparison",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore button clicks
    if ((e.target as HTMLElement).tagName === "BUTTON") return;
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  // Window-level tracking so dragging never drops when cursor moves outside container
  useEffect(() => {
    if (!isDragging) return;

    const handleWindowPointerMove = (e: PointerEvent) => {
      e.preventDefault();
      updatePosition(e.clientX);
    };

    const handleWindowPointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handleWindowPointerMove, { passive: false });
    window.addEventListener("pointerup", handleWindowPointerUp);
    window.addEventListener("pointercancel", handleWindowPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
      window.removeEventListener("pointercancel", handleWindowPointerUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onDragStart={(e) => e.preventDefault()}
      style={{ touchAction: "none" }}
      className={`group relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200/90 select-none ${
        isDragging ? "cursor-grabbing" : "cursor-ew-resize"
      } ${className}`}
    >
      {/* After Image (Base layer) - pointer-events-none prevents native ghost image drag */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <ProjectImage
          src={afterImage}
          alt={`${alt} After`}
          className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-102"
        />
      </div>

      {/* Before Image (Clipped overlay) - pointer-events-none */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <ProjectImage
          src={beforeImage}
          alt={`${alt} Before`}
          className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-102"
        />
      </div>

      {/* Vertical Slider Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_16px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Center Drag Handle */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-[0_4px_25px_rgba(0,0,0,0.45)] border-2 border-slate-900/90 flex items-center justify-center text-slate-900 transition-all ${
            isDragging ? "scale-125 ring-4 ring-[#8CCB6B]/70" : "group-hover:scale-110"
          }`}
        >
          <div className="flex items-center -space-x-1 text-slate-950">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.8]" />
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.8]" />
          </div>
        </div>
      </div>

      {/* Accessible native range input overlay for keyboard and touch support */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        aria-label="Before and after comparison slider"
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10 touch-none"
      />

      {/* Interactive Switcher / Badges */}
      <div className="absolute top-3.5 left-3.5 z-30 flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSliderPosition(100);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md backdrop-blur-md cursor-pointer ${
            sliderPosition > 50
              ? "bg-amber-600 text-white ring-2 ring-white/30"
              : "bg-black/60 text-white/80 hover:bg-black/80 hover:text-white"
          }`}
          title="Show Before view"
        >
          Before
        </button>
      </div>

      <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSliderPosition(0);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md backdrop-blur-md cursor-pointer ${
            sliderPosition < 50
              ? "bg-[#166534] text-white ring-2 ring-white/30"
              : "bg-black/60 text-white/80 hover:bg-black/80 hover:text-white"
          }`}
          title="Show After view"
        >
          After
        </button>
      </div>
    </div>
  );
}

