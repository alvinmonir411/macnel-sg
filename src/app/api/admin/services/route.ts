import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

async function readServicesFile() {
  try {
    const filePath = path.join(process.cwd(), "data", "services.json");
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeServicesFile(data: any) {
  try {
    const filePath = path.join(process.cwd(), "data", "services.json");
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to data/services.json:", err);
    throw err;
  }
}

export async function GET() {
  try {
    const services = await readServicesFile();
    return NextResponse.json({
      success: true,
      services,
    });
  } catch (error: any) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services", details: error.message },
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
    const services = Array.isArray(body) ? body : body.services;

    if (!Array.isArray(services)) {
      return NextResponse.json(
        { error: "Invalid payload. Services array required." },
        { status: 400 }
      );
    }

    await writeServicesFile(services);

    return NextResponse.json({
      success: true,
      message: "Services updated successfully.",
      services,
    });
  } catch (error: any) {
    console.error("Error saving services:", error);
    return NextResponse.json(
      { error: "Failed to save services", details: error.message },
      { status: 500 }
    );
  }
}

