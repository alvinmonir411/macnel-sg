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
  // Deterministic server-safe baseline URL: identical on both server and client initial render
  const getInitialUrl = () => {
    let url = getCloudinaryUrl(src);

    if (slotId === "brand_logo" || src.includes("icon") || src.includes("logo")) {
      return optimizeCloudinaryUrl(url, { width: 240, quality: "auto" });
    }

    if (slotId && slotId.toLowerCase().includes("hero")) {
      return optimizeCloudinaryUrl(url, { width: 1200, quality: "auto" });
    }

    if (url && url.includes("res.cloudinary.com")) {
      return optimizeCloudinaryUrl(url, { quality: "auto" });
    }

    return url;
  };

  // Client-only URL resolution that safely incorporates localStorage and window overrides
  const resolveClientUrl = () => {
    let url = "";
    if (typeof window !== "undefined") {
      // 1. Direct synchronous localStorage read
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

    if (slotId === "brand_logo" || src.includes("icon") || src.includes("logo")) {
      return optimizeCloudinaryUrl(url, { width: 240, quality: "auto" });
    }

    if (slotId && slotId.toLowerCase().includes("hero")) {
      return optimizeCloudinaryUrl(url, { width: 1200, quality: "auto" });
    }

    if (url && url.includes("res.cloudinary.com")) {
      return optimizeCloudinaryUrl(url, { quality: "auto" });
    }

    return url;
  };

  // Initial state uses purely deterministic URL to guarantee 0 SSR/client hydration mismatch
  const [currentSrc, setCurrentSrc] = useState<string>(getInitialUrl);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const syncImage = () => {
    const nextUrl = resolveClientUrl();
    if (nextUrl) {
      setCurrentSrc(nextUrl);
      if (imgRef.current && imgRef.current.src !== nextUrl) {
        imgRef.current.src = nextUrl;
      }
    }
  };

  // Sync client overrides post-hydration safely in useEffect
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

  const isHero = Boolean(slotId?.toLowerCase().includes("hero"));

  return (
    <img
      ref={imgRef}
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      loading={props.loading || (isHero ? "eager" : "lazy")}
      fetchPriority={props.fetchPriority || (isHero ? "high" : "auto")}
      decoding="async"
      className={className}
      style={style}
      suppressHydrationWarning
      {...props}
    />
  );
}
