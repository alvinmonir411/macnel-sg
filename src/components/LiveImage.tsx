"use client";

import { useState, useEffect, useRef } from "react";
import { getCloudinaryUrl, optimizeCloudinaryUrl } from "@/lib/cloudinary";

interface LiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  slotId?: string;
}

export function LiveImage({
  src,
  alt,
  slotId,
  className = "",
  style,
  ...props
}: LiveImageProps) {
  const resolveUrl = () => {
    let url = "";
    if (typeof window !== "undefined") {
      // 1. Direct synchronous localStorage read (instant cross-tab & hard refresh cache)
      try {
        const raw = localStorage.getItem("site_images_latest_overrides");
        if (raw) {
          const stored = JSON.parse(raw);
          if (slotId && stored[slotId]) url = stored[slotId];
          else if (stored[src]) url = stored[src];
        }
      } catch {}

      // 2. Global window overrides injected by root layout or live updates
      if (!url) {
        const winOverrides = (window as any).__IMAGE_OVERRIDES__;
        if (winOverrides) {
          if (slotId && winOverrides[slotId]) url = winOverrides[slotId];
          else if (winOverrides[src]) url = winOverrides[src];
        }
      }
    }

    if (!url) {
      url = getCloudinaryUrl(src);
    }

    // Auto-optimize if this is brand_logo or icon to 80px thumbnail
    if (slotId === "brand_logo" || src.includes("icon") || src.includes("logo")) {
      return optimizeCloudinaryUrl(url, { width: 80, quality: "auto" });
    }

    return url;
  };

  const [currentSrc, setCurrentSrc] = useState<string>(() => resolveUrl());
  const imgRef = useRef<HTMLImageElement | null>(null);

  const syncImage = () => {
    const nextUrl = resolveUrl();
    setCurrentSrc(nextUrl);
    // Explicitly update native DOM attribute to defeat React hydration attribute suppression
    if (imgRef.current && imgRef.current.src !== nextUrl) {
      imgRef.current.src = nextUrl;
    }
  };

  // Sync on mount and prop changes
  useEffect(() => {
    syncImage();
  }, [src, slotId]);

  // Listen to live broadcast events and cross-tab storage changes
  useEffect(() => {
    const handleUpdate = () => {
      syncImage();
    };

    window.addEventListener("live-image-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("live-image-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [src, slotId]);

  return (
    <img
      ref={imgRef}
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      {...props}
    />
  );
}
