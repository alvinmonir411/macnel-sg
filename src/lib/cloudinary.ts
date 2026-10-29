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
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  runtimeOverrides[cleanPath] = url;
}

export function setBatchRuntimeOverrides(overrides: Record<string, string>) {
  runtimeOverrides = { ...runtimeOverrides, ...overrides };
}

/**
 * Returns the Cloudinary CDN URL for a given local public image path.
 * If not found in the mapping, gracefully returns the original local path.
 *
 * @example
 * getCloudinaryUrl("/images/projects/living-room.webp")
 * // => "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/..."
 */
export function getCloudinaryUrl(localPath: string | null | undefined): string {
  if (!localPath) return "";
  if (localPath.startsWith("http://") || localPath.startsWith("https://")) {
    return localPath;
  }
  const cleanPath = localPath.startsWith("/") ? localPath : `/${localPath}`;

  // 1. Check runtime in-memory overrides (e.g. from DB / dashboard live updates)
  if (runtimeOverrides[cleanPath]) {
    return runtimeOverrides[cleanPath];
  }

  // 2. Check window.__IMAGE_OVERRIDES__ if set by layout/script
  if (typeof window !== "undefined" && (window as any).__IMAGE_OVERRIDES__?.[cleanPath]) {
    return (window as any).__IMAGE_OVERRIDES__[cleanPath];
  }

  // 3. Check persistent siteSettings JSON
  if (siteSettingsOverrides[cleanPath]) {
    return siteSettingsOverrides[cleanPath];
  }

  // 4. Check persistent Cloudinary JSON mapping
  return map[cleanPath] || localPath;
}

export default cloudinaryData as unknown as CloudinaryMapping;

