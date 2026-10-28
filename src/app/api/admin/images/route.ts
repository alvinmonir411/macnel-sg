import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getSettings, saveSettings } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

// Initialize Cloudinary SDK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dgaiqqh7k",
  api_key: process.env.CLOUDINARY_API_KEY || "875271365121148",
  api_secret: process.env.CLOUDINARY_API_SECRET || "iK1IexEaZEoKT_UFPr0Rlrc6QFs",
  secure: true,
});

// Defined image slots across website
export const DEFAULT_IMAGE_SLOTS = [
  {
    id: "hero_desktop",
    category: "hero",
    label: "Hero Desktop Banner",
    description: "Main full-width desktop background banner on homepage",
    paths: ["/hero-modern-desktop.webp", "/hero-poster.webp"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/root/roepaxqzy8zxviqaydjp.webp",
  },
  {
    id: "hero_mobile",
    category: "hero",
    label: "Hero Mobile Banner",
    description: "Mobile-optimized header visual for mobile screens",
    paths: ["/hero-modern-mobile.webp", "/hero-poster-mobile.webp"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/root/bzajapadazjq33qpohdw.webp",
  },
  {
    id: "hero_video",
    category: "hero",
    label: "Hero Desktop Background Video",
    description: "Ambient background video loop on desktop (MP4 format)",
    paths: ["/hero-video.mp4"],
    defaultUrl: "/hero-video.mp4",
  },

  {
    id: "owner_photo",
    category: "team",
    label: "Founder & MD On-Site Photo",
    description: "Shown on About Us & Credentials sections as the lead supervisor",
    paths: ["/images/team/owner.jpg", "/images/owner.jpg"],
    defaultUrl: "/images/owner.jpg",
  },
  {
    id: "brand_logo",
    category: "brand",
    label: "Site Brand Logo / Icon",
    description: "Shown in Navbar header and Footer",
    paths: ["/macnel-icon.svg"],
    defaultUrl: "/macnel-icon.svg",
  },
  // 8 Core Trade Services
  {
    id: "service_house_renovation",
    category: "services",
    label: "House Renovation Featured",
    description: "Turnkey HDB & Condo whole-home makeover visual",
    paths: ["/images/house-reno/1.jpeg", "/House reno/1.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092307/renovation-contractor-sg/House_reno/kp1ixhf6xovgkbyehhwn.jpg",
  },
  {
    id: "service_toilet_renovation",
    category: "services",
    label: "Toilet & Bathroom Renovation",
    description: "Luxury master bathroom & waterproofing spotlight",
    paths: ["/images/tiling/7.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/pgg34u2g076q3f4zhyjh.jpg",
  },
  {
    id: "service_tiling_works",
    category: "services",
    label: "Floor & Wall Tiling",
    description: "Laser level homogeneous & porcelain tiling",
    paths: ["/images/tiling/13.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/s29ff99hvhg4hft2d9v5.jpg",
  },
  {
    id: "service_carpentry",
    category: "services",
    label: "Custom In-House Carpentry",
    description: "Full-height wardrobes & kitchen cabinet visual",
    paths: ["/images/carpentry/2.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/images/carpentry/vmqoqcizb3esgu9rrign.jpg",
  },
  {
    id: "service_false_ceiling",
    category: "services",
    label: "False Ceiling & Partition",
    description: "Cove lighting pelmet & acoustic drywall visual",
    paths: ["/images/partition-ceiling/Floating-Ceiling-Effect_Picfinder.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/vks1v9m8a1naw5o2r6j2.jpg",
  },
  {
    id: "service_painting",
    category: "services",
    label: "Painting & Plastering",
    description: "Nippon Paint & wall skimming showcase",
    paths: ["/images/partition-ceiling/12.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/aedg32l78d91g8b6uh1k.jpg",
  },
  {
    id: "service_door_window",
    category: "services",
    label: "Doors & Windows",
    description: "Fire-rated main doors & soundproof sliding windows",
    paths: ["/images/door-window/1.jpeg", "/Door&window/1.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092302/renovation-contractor-sg/Door_window/nch930yir3js4pchyjoa.jpg",
  },
  {
    id: "service_flooring_carpet",
    category: "services",
    label: "Flooring & SPC Vinyl / Carpet",
    description: "Heavy-duty waterproof click vinyl & flooring",
    paths: ["/images/tiling/11.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/p4u1m6f9f9yq46r9f4w4.jpg",
  },
  // Projects
  {
    id: "project_1_before",
    category: "projects",
    label: "Project 1 (4-Room BTO) - Before",
    description: "Bare screed condition before renovation",
    paths: ["/images/projects/proj-1-before.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/root/aqhvpkoy2mrbwng2bbrk.jpg",
  },
  {
    id: "project_1_after",
    category: "projects",
    label: "Project 1 (4-Room BTO) - After",
    description: "Completed modern luxury makeover",
    paths: ["/images/projects/proj-1-after.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/root/roepaxqzy8zxviqaydjp.webp",
  },
  {
    id: "project_2_before",
    category: "projects",
    label: "Project 2 (Bathroom) - Before",
    description: "Existing worn bathroom tiles before hacking",
    paths: ["/images/doc-updates/image24.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092309/renovation-contractor-sg/images/doc-updates/d30kkw2q72m8y7vj5r3z.jpg",
  },
  {
    id: "project_2_after",
    category: "projects",
    label: "Project 2 (Bathroom) - After",
    description: "Luxury hotel-grade master toilet finish",
    paths: ["/images/projects/proj-2-after.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/pgg34u2g076q3f4zhyjh.jpg",
  },
];

async function getLocalCloudinaryData() {
  const filePath = path.join(process.cwd(), "data", "cloudinaryImages.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { urlMap: {}, images: [] };
  }
}

async function saveLocalCloudinaryData(data: any) {
  const filePath = path.join(process.cwd(), "data", "cloudinaryImages.json");
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await getSettings();
    const dbImageOverrides = settings?.site_images || {};
    const localData = await getLocalCloudinaryData();
    const urlMap = localData.urlMap || {};

    // Combine default slots with live overrides
    const slots = DEFAULT_IMAGE_SLOTS.map((slot) => {
      const dbUrl = dbImageOverrides[slot.id];
      const mappedUrl = slot.paths.map((p) => urlMap[p]).find(Boolean);
      const activeUrl = dbUrl || mappedUrl || slot.defaultUrl;

      return {
        ...slot,
        currentUrl: activeUrl,
        isCustomized: Boolean(dbUrl || (mappedUrl && mappedUrl !== slot.defaultUrl)),
      };
    });

    return NextResponse.json({
      success: true,
      slots,
      overrides: dbImageOverrides,
      totalMappedImages: Object.keys(urlMap).length,
      sampleImages: (localData.images || []).slice(0, 80),
    });
  } catch (error: any) {
    console.error("Failed to fetch image manager data:", error);
    return NextResponse.json(
      { error: "Failed to load images", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = request.headers.get("content-type") || "";

    // 1. Direct File Upload via FormData
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const slotId = formData.get("slotId") as string | null;

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dgaiqqh7k";
      const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || "renovation_preset";

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mime = file.type || "image/jpeg";
      const fileName = file.name || "upload.jpg";

      let uploadedUrl = "";

      // 0. If this is the Hero Video, write directly to public/hero-video.mp4
      if (slotId === "hero_video" || fileName.endsWith(".mp4") || mime.includes("video")) {
        try {
          const videoDest = path.join(process.cwd(), "public", "hero-video.mp4");
          await fs.writeFile(videoDest, buffer);
          uploadedUrl = `/hero-video.mp4?v=${Date.now()}`;
        } catch (vidErr: any) {
          console.warn("Direct hero video write error:", vidErr);
        }
      }

      // 1. Try Cloudinary Direct Upload using the configured upload_preset
      if (!uploadedUrl) {
        try {
          const uploadFormData = new FormData();
          uploadFormData.append("upload_preset", uploadPreset);
          uploadFormData.append("folder", "renovation-contractor-sg/dashboard-uploads");

          const blob = new Blob([buffer], { type: mime });
          uploadFormData.append("file", blob, fileName);

          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: uploadFormData,
          });

          if (res.ok) {
            const data = await res.json();
            uploadedUrl = data.secure_url || data.url;
          } else {
            const errText = await res.text();
            console.warn("Cloudinary upload returned non-200, trying signed upload:", errText);
          }
        } catch (cloudErr) {
          console.warn("Cloudinary direct upload fetch error:", cloudErr);
        }
      }

      // 2. If direct preset failed, try signed SDK upload
      if (!uploadedUrl) {
        try {
          const base64Uri = `data:${mime};base64,${buffer.toString("base64")}`;
          const uploadRes = await cloudinary.uploader.upload(base64Uri, {
            folder: "renovation-contractor-sg/dashboard-uploads",
            resource_type: "image",
          });
          uploadedUrl = uploadRes.secure_url;
        } catch (signedErr) {
          console.warn("Cloudinary signed upload error:", signedErr);
        }
      }

      // 3. Robust Local Fallback (if Cloudinary is unavailable)
      if (!uploadedUrl) {
        try {
          const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
          await fs.mkdir(uploadsDir, { recursive: true });
          const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
          const filePath = path.join(uploadsDir, safeName);
          await fs.writeFile(filePath, buffer);
          uploadedUrl = `/images/uploads/${safeName}`;
        } catch (localErr: any) {
          throw new Error(`Failed to save image locally and to Cloudinary: ${localErr.message}`);
        }
      }


      // If slotId is provided, save image override into Neon PostgreSQL & local map!
      if (slotId) {
        const slot = DEFAULT_IMAGE_SLOTS.find((s) => s.id === slotId);
        const settings = await getSettings();
        const existingOverrides = settings?.site_images || {};

        existingOverrides[slotId] = uploadedUrl;
        await saveSettings("site_images", existingOverrides);

        // Also update local cloudinary mapping for all matching paths
        const localData = await getLocalCloudinaryData();
        if (slot) {
          for (const p of slot.paths) {
            localData.urlMap[p] = uploadedUrl;
          }
          await saveLocalCloudinaryData(localData);
        }

        return NextResponse.json({
          success: true,
          url: uploadedUrl,
          slotId,
          message: `Photo successfully updated for ${slot?.label || slotId}!`,
        });
      }

      return NextResponse.json({
        success: true,
        url: uploadedUrl,
        message: "Image uploaded successfully!",
      });
    }


    // 2. JSON actions: update_slot or reset_slot or custom_path
    const body = await request.json();
    const { action, slotId, newUrl, customPath } = body;

    const settings = await getSettings();
    const existingOverrides = settings?.site_images || {};
    const localData = await getLocalCloudinaryData();

    if (action === "update_slot") {
      if (!slotId || !newUrl) {
        return NextResponse.json(
          { error: "slotId and newUrl are required" },
          { status: 400 }
        );
      }

      const slot = DEFAULT_IMAGE_SLOTS.find((s) => s.id === slotId);

      // Save in Neon DB
      existingOverrides[slotId] = newUrl;
      await saveSettings("site_images", existingOverrides);

      // Save in urlMap for all paths associated with this slot
      if (slot) {
        for (const p of slot.paths) {
          localData.urlMap[p] = newUrl;
        }
        await saveLocalCloudinaryData(localData);
      }

      return NextResponse.json({
        success: true,
        message: `Updated image for ${slot?.label || slotId}!`,
        currentUrl: newUrl,
      });
    }

    if (action === "reset_slot") {
      if (!slotId) {
        return NextResponse.json({ error: "slotId is required" }, { status: 400 });
      }

      const slot = DEFAULT_IMAGE_SLOTS.find((s) => s.id === slotId);

      delete existingOverrides[slotId];
      await saveSettings("site_images", existingOverrides);

      if (slot) {
        for (const p of slot.paths) {
          localData.urlMap[p] = slot.defaultUrl;
        }
        await saveLocalCloudinaryData(localData);
      }

      return NextResponse.json({
        success: true,
        message: `Reset ${slot?.label || slotId} to default image.`,
        currentUrl: slot?.defaultUrl,
      });
    }

    if (action === "custom_path") {
      if (!customPath || !newUrl) {
        return NextResponse.json(
          { error: "customPath and newUrl are required" },
          { status: 400 }
        );
      }

      const cleanPath = customPath.startsWith("/") ? customPath : `/${customPath}`;
      localData.urlMap[cleanPath] = newUrl;
      await saveLocalCloudinaryData(localData);

      existingOverrides[`custom_${cleanPath}`] = newUrl;
      await saveSettings("site_images", existingOverrides);

      return NextResponse.json({
        success: true,
        message: `Path ${cleanPath} successfully mapped to new image.`,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    console.error("Image operation failed:", error);
    return NextResponse.json(
      { error: "Failed to process image operation", details: error.message },
      { status: 500 }
    );
  }
}
