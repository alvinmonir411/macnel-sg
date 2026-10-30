"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface ProjectImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
}

export function ProjectImage({
  src,
  alt,
  className = "",
  fallbackText = "Add real project photo",
  aspectRatio,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);
  const resolveSrc = () => {
    if (typeof window !== "undefined" && src) {
      try {
        const raw = localStorage.getItem("site_images_latest_overrides");
        if (raw) {
          const stored = JSON.parse(raw);
          if (stored[src]) return stored[src];
        }
      } catch {}
    }
    return getCloudinaryUrl(src);
  };

  const [activeSrc, setActiveSrc] = useState<string>(() => resolveSrc());

  // Sync when prop changes or on client hydration
  useEffect(() => {
    setActiveSrc(resolveSrc());
    setHasError(false);
  }, [src]);

  // Listen to live instant updates triggered from dashboard without page refresh
  useEffect(() => {
    const handleLiveImageUpdate = () => {
      setActiveSrc(resolveSrc());
      setHasError(false);
    };

    window.addEventListener("live-image-updated", handleLiveImageUpdate);
    window.addEventListener("storage", handleLiveImageUpdate);
    return () => {
      window.removeEventListener("live-image-updated", handleLiveImageUpdate);
      window.removeEventListener("storage", handleLiveImageUpdate);
    };
  }, [src]);

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
    <Image
      key={activeSrc}
      src={activeSrc}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setHasError(true)}
      className={`object-cover object-center ${className}`}
    />
  );
}
