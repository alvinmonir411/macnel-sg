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
    if (siteImagesOverrides[cleanPath]) return siteImagesOverrides[cleanPath];
    if (siteImagesOverrides[unslashedPath]) return siteImagesOverrides[unslashedPath];
    if (siteImagesOverrides[localPath]) return siteImagesOverrides[localPath];
  }

  // 2. Check runtime in-memory overrides (e.g. from DB / dashboard live updates)
  if (runtimeOverrides[cleanPath]) return runtimeOverrides[cleanPath];
  if (runtimeOverrides[unslashedPath]) return runtimeOverrides[unslashedPath];
  if (runtimeOverrides[localPath]) return runtimeOverrides[localPath];

  // 3. Check window.__IMAGE_OVERRIDES__ if on client side
  if (typeof window !== "undefined") {
    const winOverrides = (window as any).__IMAGE_OVERRIDES__;
    if (winOverrides) {
      if (winOverrides[cleanPath]) return winOverrides[cleanPath];
      if (winOverrides[unslashedPath]) return winOverrides[unslashedPath];
      if (winOverrides[localPath]) return winOverrides[localPath];
    }
  }

  // 4. Check persistent siteSettings JSON
  if (siteSettingsOverrides[cleanPath]) return siteSettingsOverrides[cleanPath];
  if (siteSettingsOverrides[unslashedPath]) return siteSettingsOverrides[unslashedPath];
  if (siteSettingsOverrides[localPath]) return siteSettingsOverrides[localPath];

  // 5. Check persistent Cloudinary JSON mapping
  return map[cleanPath] || map[unslashedPath] || localPath;
}

export default cloudinaryData as unknown as CloudinaryMapping;
