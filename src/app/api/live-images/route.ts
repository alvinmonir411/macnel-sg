import { NextResponse } from "next/server";
import { getSettings } from "@/lib/db";
import siteSettingsFallback from "../../../../data/siteSettings.json";

export async function GET() {
  try {
    const settings = await getSettings();
    const overrides = {
      ...((siteSettingsFallback as any).site_images || {}),
      ...(settings?.site_images || {}),
    };

    return NextResponse.json(
      {
        success: true,
        overrides,
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
        overrides: (siteSettingsFallback as any).site_images || {},
        error: error.message,
      },
      { status: 200 }
    );
  }
}
