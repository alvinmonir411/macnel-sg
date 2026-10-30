import { NextResponse } from "next/server";
import { getSettings } from "@/lib/db";
import siteSettingsFallback from "../../../../data/siteSettings.json";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dbSettings = await getSettings();
    const fallback = siteSettingsFallback as any;

    const contact = {
      ...siteConfig.contact,
      ...(fallback.contact || {}),
      ...(dbSettings?.contact || {}),
    };

    const credentials = {
      legalName: dbSettings?.credentials?.legalName || fallback.credentials?.legalName || siteConfig.legalName,
      uen: dbSettings?.credentials?.uen || fallback.credentials?.uen || siteConfig.uen,
      bcaLicense: dbSettings?.credentials?.bcaLicense || fallback.credentials?.bcaLicense || siteConfig.bcaLicense,
      hdbLicense: dbSettings?.credentials?.hdbLicense !== undefined
        ? dbSettings.credentials.hdbLicense
        : (fallback.credentials?.hdbLicense !== undefined ? fallback.credentials.hdbLicense : siteConfig.hdbLicense),
      bizSafe: dbSettings?.credentials?.bizSafe || fallback.credentials?.bizSafe || "bizSAFE Level 3 Certified",
      yearsInBusiness: dbSettings?.credentials?.yearsInBusiness || fallback.credentials?.yearsInBusiness || siteConfig.yearsInBusiness,
    };

    const marketing = {
      ...(fallback.marketing || {}),
      ...(dbSettings?.marketing || {}),
    };

    const ai = {
      ...(fallback.ai || {}),
      ...(dbSettings?.ai || {}),
    };

    return NextResponse.json(
      {
        success: true,
        settings: {
          contact,
          credentials,
          marketing,
          ai,
        },
        timestamp: Date.now(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

