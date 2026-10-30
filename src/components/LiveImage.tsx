"use client";

import { useState, useEffect } from "react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface LiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function LiveImage({ src, alt, className = "", style, ...props }: LiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(() => getCloudinaryUrl(src));

  useEffect(() => {
    setCurrentSrc(getCloudinaryUrl(src));
  }, [src]);

  useEffect(() => {
    const handleUpdate = () => {
      setCurrentSrc(getCloudinaryUrl(src));
    };

    window.addEventListener("live-image-updated", handleUpdate);
    return () => {
      window.removeEventListener("live-image-updated", handleUpdate);
    };
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      {...props}
    />
  );
}
