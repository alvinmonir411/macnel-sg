import cloudinaryData from "../../data/cloudinaryImages.json";
import siteSettings from "../../data/siteSettings.json";

export interface CloudinaryMapping {
  uploadedAt: string;
  cloudName: string;
  uploadPreset?: string;
  totalImages: number;
  successCount: number;
  failedCount: number;
  urlMap: Record<string, string>;
  images: Array<{
    localPath: string;
    cloudinaryUrl: string;
    publicId: string;
    format: string;
    bytes: number;
    width: number | null;
    height: number | null;
  }>;
}

const map = (cloudinaryData as unknown as CloudinaryMapping).urlMap || {};
const siteSettingsOverrides = (siteSettings as any)?.site_images || {};

// Client-side and in-memory override registry
let runtimeOverrides: Record<string, string> = {};

export function setRuntimeImageOverride(path: string, url: string) {
  if (!path) return;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  runtimeOverrides[cleanPath] = url;
  runtimeOverrides[path] = url;
}

export function setBatchRuntimeOverrides(overrides: Record<string, string>) {
  if (!overrides) return;
  runtimeOverrides = { ...runtimeOverrides, ...overrides };
  for (const [k, v] of Object.entries(overrides)) {
    if (k.startsWith("/")) {
      runtimeOverrides[k.slice(1)] = v;
    } else {
      runtimeOverrides[`/${k}`] = v;
    }
  }
}

/**
 * Returns the Cloudinary CDN URL for a given local public image path.
 * If not found in the mapping, gracefully returns the original local path.
 */

/**
 * Automatically injects Cloudinary on-the-fly modern compression and format conversion (AVIF/WebP).
 * Never mutates SVGs or non-Cloudinary assets.
 */
export function optimizeCloudinaryUrl(
  url: string | null | undefined,
  options: { width?: number; quality?: string; format?: string } = {}
): string {
  if (!url || typeof url !== "string") return "";
  if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) {
    return url;
  }
  // Keep SVGs untouched (vector graphics)
  if (url.toLowerCase().endsWith(".svg") || url.includes(".svg?")) {
    return url;
  }
  // Don't re-transform if already transformed with f_auto or q_auto
  if (url.includes("/f_auto") || url.includes("/q_auto")) {
    return url;
  }

  const { width, quality = "auto", format = "auto" } = options;
  const transforms = [`f_${format}`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`, "c_limit");

  const transformStr = transforms.join(",") + "/";
  return url.replace("/image/upload/", `/image/upload/${transformStr}`);
}

export function getCloudinaryUrl(
  localPath: string | null | undefined,
  siteImagesOverrides?: Record<string, string>
): string {
  if (!localPath) return "";
  if (localPath.startsWith("http://") || localPath.startsWith("https://")) {
    return localPath;
  }
  const cleanPath = localPath.startsWith("/") ? localPath : `/${localPath}`;
  const unslashedPath = localPath.startsWith("/") ? localPath.slice(1) : localPath;

  // 1. Explicitly passed in live site overrides (from getLiveSiteData / RSC props)
  if (siteImagesOverrides) {
    if (siteImagesOverrides[cleanPath]) return optimizeCloudinaryUrl(siteImagesOverrides[cleanPath]);
    if (siteImagesOverrides[unslashedPath]) return optimizeCloudinaryUrl(siteImagesOverrides[unslashedPath]);
    if (siteImagesOverrides[localPath]) return optimizeCloudinaryUrl(siteImagesOverrides[localPath]);
  }

  // 2. Check runtime in-memory overrides (e.g. from DB / dashboard live updates)
  if (runtimeOverrides[cleanPath]) return optimizeCloudinaryUrl(runtimeOverrides[cleanPath]);
  if (runtimeOverrides[unslashedPath]) return optimizeCloudinaryUrl(runtimeOverrides[unslashedPath]);
  if (runtimeOverrides[localPath]) return optimizeCloudinaryUrl(runtimeOverrides[localPath]);

  // 3. Check client localStorage & window.__IMAGE_OVERRIDES__ if on client side
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("site_images_latest_overrides");
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored[cleanPath]) return optimizeCloudinaryUrl(stored[cleanPath]);
        if (stored[unslashedPath]) return optimizeCloudinaryUrl(stored[unslashedPath]);
        if (stored[localPath]) return optimizeCloudinaryUrl(stored[localPath]);
      }
    } catch {}

    const winOverrides = (window as any).__IMAGE_OVERRIDES__;
    if (winOverrides) {
      if (winOverrides[cleanPath]) return optimizeCloudinaryUrl(winOverrides[cleanPath]);
      if (winOverrides[unslashedPath]) return optimizeCloudinaryUrl(winOverrides[unslashedPath]);
      if (winOverrides[localPath]) return optimizeCloudinaryUrl(winOverrides[localPath]);
    }
  }

  // 4. Check persistent siteSettings JSON
  if (siteSettingsOverrides[cleanPath]) return optimizeCloudinaryUrl(siteSettingsOverrides[cleanPath]);
  if (siteSettingsOverrides[unslashedPath]) return optimizeCloudinaryUrl(siteSettingsOverrides[unslashedPath]);
  if (siteSettingsOverrides[localPath]) return optimizeCloudinaryUrl(siteSettingsOverrides[localPath]);

  // 5. Check persistent Cloudinary JSON mapping
  const finalUrl = map[cleanPath] || map[unslashedPath] || localPath;
  return optimizeCloudinaryUrl(finalUrl);
}

export default cloudinaryData as unknown as CloudinaryMapping;
