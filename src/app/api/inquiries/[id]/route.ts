import { NextResponse } from "next/server";
import { deleteInquiry } from "@/lib/db";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteInquiry(parseInt(id, 10));
    return NextResponse.json({ success: true, message: `Inquiry ${id} deleted.` });
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return NextResponse.json(
      { error: "Internal Server Error deleting inquiry." },
      { status: 500 }
    );
  }
}
