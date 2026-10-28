import { NextResponse } from "next/server";
import { connection } from "next/server";
import { saveInquiry, deleteInquiry, sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const saved = await saveInquiry({
      name: body.name,
      phone: body.phone,
      email: body.email,
      service: body.service,
      property_type: body.propertyType,
      estimated_budget: body.estimatedBudget,
      message: body.message,
      source: body.source || "website",
    });

    return NextResponse.json({ success: true, inquiry: saved }, { status: 201 });
  } catch (error) {
    console.error("Failed to save inquiry to Neon DB:", error);
    return NextResponse.json(
      { error: "Internal Server Error saving inquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connection();
  try {
    const inquiries = await sql`
      SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 100;
    `;
    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return NextResponse.json(
      { error: "Failed to load inquiries from database." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Inquiry ID is required." },
        { status: 400 }
      );
    }

    await deleteInquiry(Number(id));
    return NextResponse.json({ success: true, message: `Inquiry ${id} deleted.` });
  } catch (error: any) {
    console.error("Failed to delete inquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry from database.", details: error.message },
      { status: 500 }
    );
  }
}

