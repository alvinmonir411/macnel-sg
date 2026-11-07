import { NextResponse } from "next/server";
import { connection } from "next/server";
import {
  savePopupLead,
  getPopupLeads,
  updatePopupLead,
  deletePopupLead,
} from "@/lib/db";

// POST: Public endpoint to capture lead from the popup
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const source = typeof body.source === "string" ? body.source.trim() : "website_popup";

    // Validation: Phone and Email are required
    if (!phone || phone.length < 6) {
      return NextResponse.json(
        { error: "A valid phone number is required." },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const saved = await savePopupLead({
      phone,
      email,
      source,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Our renovation consultant will contact you shortly.",
        lead: saved,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Failed to capture popup lead:", error);
    return NextResponse.json(
      { error: "Internal Server Error saving lead.", details: error?.message },
      { status: 500 }
    );
  }
}

// GET: Admin endpoint to retrieve all leads
export async function GET() {
  await connection();
  try {
    const leads = await getPopupLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error("Failed to fetch popup leads:", error);
    return NextResponse.json(
      { error: "Failed to load leads from database." },
      { status: 500 }
    );
  }
}

// PATCH: Admin endpoint to update lead status or notes
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required." },
        { status: 400 }
      );
    }

    const updated = await updatePopupLead(id, {
      status: body.status,
      notes: body.notes,
    });

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    console.error("Failed to update lead:", error);
    return NextResponse.json(
      { error: "Failed to update lead." },
      { status: 500 }
    );
  }
}

// DELETE: Admin endpoint to delete a lead
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required." },
        { status: 400 }
      );
    }

    await deletePopupLead(Number(id));
    return NextResponse.json({ success: true, message: `Lead ${id} deleted.` });
  } catch (error: any) {
    console.error("Failed to delete lead:", error);
    return NextResponse.json(
      { error: "Failed to delete lead." },
      { status: 500 }
    );
  }
}

