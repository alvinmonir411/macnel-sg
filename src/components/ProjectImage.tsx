"use client";

import { useState } from "react";
import { ImageOff, Camera } from "lucide-react";

interface ProjectImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  aspectRatio?: string;
}

export function ProjectImage({
  src,
  alt,
  className = "",
  fallbackText = "Add real project photo",
  aspectRatio,
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  // If no source or failed to load, show neutral placeholder
  if (!src || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-slate-800/80 border border-dashed border-slate-600/80 text-slate-400 p-6 text-center select-none ${
          aspectRatio || "h-full w-full min-h-[220px]"
        } ${className}`}
      >
        <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center mb-2.5 text-slate-400">
          <Camera className="w-6 h-6 stroke-[1.5]" />
        </div>
        <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
          {fallbackText}
        </span>
        <span className="text-[11px] text-slate-400 mt-1 max-w-[200px] truncate">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      loading="lazy"
      className={`object-cover object-center ${className}`}
    />
  );
}
