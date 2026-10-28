import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

async function readProjectsFile() {
  try {
    const filePath = path.join(process.cwd(), "data", "projects.json");
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeProjectsFile(data: any) {
  try {
    const filePath = path.join(process.cwd(), "data", "projects.json");
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to data/projects.json:", err);
    throw err;
  }
}

export async function GET() {
  try {
    const projects = await readProjectsFile();
    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects", details: error.message },
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
    const projects = Array.isArray(body) ? body : body.projects;

    if (!Array.isArray(projects)) {
      return NextResponse.json(
        { error: "Invalid payload. Projects array required." },
        { status: 400 }
      );
    }

    await writeProjectsFile(projects);

    return NextResponse.json({
      success: true,
      message: "Projects updated successfully.",
      projects,
    });
  } catch (error: any) {
    console.error("Error saving projects:", error);
    return NextResponse.json(
      { error: "Failed to save projects", details: error.message },
      { status: 500 }
    );
  }
}

