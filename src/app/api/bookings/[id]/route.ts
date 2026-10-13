import { NextResponse } from "next/server";
import { updateBookingStatus, deleteBooking } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.status) {
      return NextResponse.json(
        { error: "Status field is required." },
        { status: 400 }
      );
    }

    const updated = await updateBookingStatus(id, body.status);

    if (!updated) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return NextResponse.json(
      { error: "Internal Server Error updating booking." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteBooking(id);
    return NextResponse.json({ success: true, message: `Booking ${id} deleted.` });
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return NextResponse.json(
      { error: "Internal Server Error deleting booking." },
      { status: 500 }
    );
  }
}
