"use client";

import { useState, useRef, useCallback } from "react";
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
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Pointer capture already released
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: "pan-y" }}
      className={`group relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-xl border border-slate-200/90 cursor-ew-resize select-none transition-shadow ${className}`}
    >
      {/* After Image (Base layer) */}
      <div className="absolute inset-0 w-full h-full">
        <ProjectImage
          src={afterImage}
          alt={`${alt} After`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
        />
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <ProjectImage
          src={beforeImage}
          alt={`${alt} Before`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
        />
      </div>

      {/* Vertical Slider Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.7)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Center Drag Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-2xl border-2 border-slate-800 flex items-center justify-center text-slate-800 transition-transform group-hover:scale-110">
          <div className="flex items-center -space-x-1 text-slate-900">
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Interactive Switcher / Badges */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSliderPosition(100);
          }}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-md backdrop-blur-md cursor-pointer ${
            sliderPosition > 50
              ? "bg-amber-600 text-white shadow-amber-600/30"
              : "bg-black/60 text-white/85 hover:bg-black/80 hover:text-white"
          }`}
          title="Show Before view"
        >
          Before
        </button>
      </div>

      <div className="absolute top-3 right-3 z-30 flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSliderPosition(0);
          }}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-md backdrop-blur-md cursor-pointer ${
            sliderPosition < 50
              ? "bg-[#166534] text-white shadow-[#166534]/30"
              : "bg-black/60 text-white/85 hover:bg-black/80 hover:text-white"
          }`}
          title="Show After view"
        >
          After
        </button>
      </div>
    </div>
  );
}

