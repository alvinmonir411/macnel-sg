import cloudinaryData from "../../data/cloudinaryImages.json";

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
  return map[cleanPath] || localPath;
}

export default cloudinaryData as unknown as CloudinaryMapping;
