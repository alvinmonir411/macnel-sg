import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

async function readJsonFile(fileName: string, fallback: any = {}) {
  try {
    const filePath = path.join(process.cwd(), "data", fileName);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}

async function writeJsonFile(fileName: string, data: any) {
  try {
    const filePath = path.join(process.cwd(), "data", fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Failed to write to data/${fileName}:`, err);
  }
}

async function syncSiteConfig(category: string, data: any) {
  try {
    const configPath = path.join(process.cwd(), "data", "siteConfig.ts");
    let content = await fs.readFile(configPath, "utf-8");
    if (category === "contact" && data) {
      if (data.email) {
        content = content.replace(/email:\s*"[^"]*"/, `email: "${data.email}"`);
      }
      if (data.whatsapp) {
        content = content.replace(/whatsapp:\s*"[^"]*"/, `whatsapp: "${data.whatsapp}"`);
      }
      if (data.phonePrimary) {
        content = content.replace(/phonePrimary:\s*"[^"]*"/, `phonePrimary: "${data.phonePrimary}"`);
        content = content.replace(/phoneTel:\s*"[^"]*"/, `phoneTel: "${data.phonePrimary.replace(/[^0-9+]/g, "")}"`);
      }
      if (data.phoneSecondary) {
        content = content.replace(/phoneSecondary:\s*"[^"]*"/, `phoneSecondary: "${data.phoneSecondary}"`);
      }
      if (data.address) {
        content = content.replace(/address:\s*"[^"]*"/, `address: "${data.address}"`);
      }
      if (data.operatingHours) {
        content = content.replace(/operatingHours:\s*"[^"]*"/, `operatingHours: "${data.operatingHours}"`);
      }
    } else if (category === "credentials" && data) {
      if (data.legalName) {
        content = content.replace(/legalName:\s*"[^"]*"/, `legalName: "${data.legalName}"`);
      }
      if (data.uen) {
        content = content.replace(/uen:\s*"[^"]*"/, `uen: "${data.uen}"`);
      }
      if (data.bcaLicense) {
        content = content.replace(/bcaLicense:\s*"[^"]*"/, `bcaLicense: "${data.bcaLicense}"`);
      }
      if (data.hdbLicense !== undefined) {
        content = content.replace(/hdbLicense:\s*"[^"]*"/, `hdbLicense: "${data.hdbLicense}"`);
      }
    }
    await fs.writeFile(configPath, content, "utf-8");
  } catch {
    // Expected on read-only serverless platforms like Vercel
  }
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: "Unauthorized. Valid admin session required." },
        { status: 401 }
      );
    }

    const dbSettings = await getSettings();
    const projects = await readJsonFile("projects.json", []);
    const pricing = await readJsonFile("pricing.json", {});
    const reviews = await readJsonFile("reviews.json", {});
    const services = await readJsonFile("services.json", []);

    return NextResponse.json({
      success: true,
      settings: dbSettings || {},
      projects: dbSettings?.projects || projects,
      pricing: dbSettings?.pricing || pricing,
      reviews: dbSettings?.reviews || reviews,
      services: dbSettings?.services || services,
    });
  } catch (error: any) {
    console.error("Error fetching admin content & settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: "Unauthorized. Valid admin session required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { category, data } = body;

    if (!category || data === undefined) {
      return NextResponse.json(
        { error: "Category and data are required." },
        { status: 400 }
      );
    }

    // 1. Save to Neon PostgreSQL
    await saveSettings(category, data);

    // 2. Sync to corresponding data/*.json files for static generation & instant updates
    if (category === "projects") {
      await writeJsonFile("projects.json", data);
    } else if (category === "pricing") {
      await writeJsonFile("pricing.json", data);
    } else if (category === "reviews") {
      await writeJsonFile("reviews.json", data);
    } else if (category === "services") {
      await writeJsonFile("services.json", data);
    } else {
      // Sync siteSettings.json
      const currentSettings = await readJsonFile("siteSettings.json", {});
      currentSettings[category] = data;
      await writeJsonFile("siteSettings.json", currentSettings);

      // Sync siteConfig.ts in dev / writeable environments
      await syncSiteConfig(category, data);

      // If AI settings saved with a geminiApiKey, persist it to .env.local
      if (category === "ai" && data?.geminiApiKey) {
        try {
          const envPath = path.join(process.cwd(), ".env.local");
          let envContent = "";
          try {
            envContent = await fs.readFile(envPath, "utf-8");
          } catch {
            envContent = "";
          }
          if (/^GEMINI_API_KEY=.*/m.test(envContent)) {
            envContent = envContent.replace(
              /^GEMINI_API_KEY=.*/m,
              `GEMINI_API_KEY=${data.geminiApiKey}`
            );
          } else {
            envContent = envContent.trimEnd() + `\nGEMINI_API_KEY=${data.geminiApiKey}\n`;
          }
          await fs.writeFile(envPath, envContent, "utf-8");
        } catch (envErr) {
          console.error("Failed to persist GEMINI_API_KEY to .env.local:", envErr);
        }
      }
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/contact-us");
      revalidatePath("/about");
      revalidatePath("/about-us");
      revalidatePath("/book");
      revalidatePath("/services");
      revalidatePath("/projects");
    } catch (e) {
      console.warn("revalidatePath error:", e);
    }

    const updated = await getSettings();
    return NextResponse.json({
      success: true,
      message: `${category} updated successfully across Database and Website.`,
      settings: updated,
    });
  } catch (error: any) {
    console.error("Error saving content & settings:", error);
    return NextResponse.json(
      { error: "Failed to save settings", details: error.message },
      { status: 500 }
    );
  }
}
