import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json({ success: true, settings: settings || {} });
  } catch (error: any) {
    console.error("Error fetching settings:", error);
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

    await saveSettings(category, data);

    const updated = await getSettings();
    return NextResponse.json({
      success: true,
      message: `${category} settings saved successfully.`,
      settings: updated,
    });
  } catch (error: any) {
    console.error("Error saving settings:", error);
    return NextResponse.json(
      { error: "Failed to save settings", details: error.message },
      { status: 500 }
    );
  }
}
