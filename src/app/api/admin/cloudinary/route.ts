import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

function getCloudinaryCredentials() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dgaiqqh7k";
  const apiKey = process.env.CLOUDINARY_API_KEY || "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "";
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || "renovation_preset";
  return { cloudName, apiKey, apiSecret, uploadPreset };
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cloudName, apiKey, apiSecret, uploadPreset } = getCloudinaryCredentials();

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    let pingOk = false;
    let pingError = null;

    try {
      const pingRes = await cloudinary.api.ping();
      if (pingRes.status === "ok") {
        pingOk = true;
      }
    } catch (err: any) {
      pingError = err.message || "Failed to ping Cloudinary API";
    }

    // Check if mapping file exists
    const mapPath = path.join(process.cwd(), "data", "cloudinaryImages.json");
    let mappedImagesCount = 0;
    let totalScanned = 186;
    let lastUploadedAt = null;
    let images: any[] = [];

    if (fs.existsSync(mapPath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(mapPath, "utf-8"));
        mappedImagesCount = raw.successCount || 0;
        totalScanned = raw.totalImages || 186;
        lastUploadedAt = raw.uploadedAt || null;
        images = (raw.images || []).slice(0, 60); // sample for preview
      } catch (e) {
        // ignore
      }
    }

    return NextResponse.json({
      success: true,
      config: {
        cloudName,
        uploadPreset,
        apiKeyMasked: apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : "Not set",
        configured: Boolean(cloudName && apiKey && apiSecret),
      },
      status: {
        pingOk,
        pingError,
        mappedImagesCount,
        totalScanned,
        lastUploadedAt,
        allUploaded: mappedImagesCount > 0 && mappedImagesCount === totalScanned,
      },
      sampleImages: images,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to get Cloudinary status", details: error.message },
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

    // 1. Direct Multipart Form File Upload (used by /admin/services & /admin/projects)
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "general";

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      const { cloudName, uploadPreset } = getCloudinaryCredentials();
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mime = file.type || "image/jpeg";
      const fileName = file.name || "upload.jpg";

      let uploadedUrl = "";

      // Try unsigned Cloudinary upload
      try {
        const uploadFormData = new FormData();
        uploadFormData.append("upload_preset", uploadPreset);
        uploadFormData.append("folder", `renovation-contractor-sg/${folder}`);
        const blob = new Blob([buffer], { type: mime });
        uploadFormData.append("file", blob, fileName);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: uploadFormData,
        });

        if (res.ok) {
          const data = await res.json();
          uploadedUrl = data.secure_url || data.url;
        }
      } catch (cloudErr) {
        console.warn("Direct upload error:", cloudErr);
      }

      // Fallback to signed Cloudinary SDK upload
      if (!uploadedUrl) {
        try {
          const base64Uri = `data:${mime};base64,${buffer.toString("base64")}`;
          const uploadRes = await cloudinary.uploader.upload(base64Uri, {
            folder: `renovation-contractor-sg/${folder}`,
            resource_type: "image",
          });
          uploadedUrl = uploadRes.secure_url;
        } catch (signedErr) {
          console.warn("Signed upload error:", signedErr);
        }
      }

      // Local fallback
      if (!uploadedUrl) {
        try {
          const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
          const filePath = path.join(uploadsDir, safeName);
          fs.writeFileSync(filePath, buffer);
          uploadedUrl = `/images/uploads/${safeName}`;
        } catch (localErr: any) {
          throw new Error(`Failed to save image: ${localErr.message}`);
        }
      }

      return NextResponse.json({
        success: true,
        url: uploadedUrl,
        message: "Image uploaded successfully!",
      });
    }

    // 2. JSON actions (e.g. test connection)
    const body = await request.json();
    const { action, cloudName, uploadPreset } = body;

    const activeCloudName = cloudName || process.env.CLOUDINARY_CLOUD_NAME || "dgaiqqh7k";
    const activePreset = uploadPreset || process.env.CLOUDINARY_UPLOAD_PRESET || "renovation_preset";

    if (action === "test") {
      try {
        const formData = new FormData();
        formData.append("upload_preset", activePreset);
        formData.append("folder", "renovation-contractor-sg/_healthcheck");
        formData.append(
          "file",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAA="
        );

        const res = await fetch(`https://api.cloudinary.com/v1_1/${activeCloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Upload failed (${res.status}): ${errText}`);
        }

        const data = await res.json();

        return NextResponse.json({
          success: true,
          uploadPermission: true,
          cloudName: activeCloudName,
          uploadPreset: activePreset,
          testUrl: data.secure_url,
          message: "Cloudinary upload test passed successfully!",
        });
      } catch (err: any) {
        return NextResponse.json({
          success: false,
          error: err.message || "Failed to connect to Cloudinary",
        });
      }
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Cloudinary operation failed", details: error.message },
      { status: 500 }
    );
  }
}
