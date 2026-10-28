import { NextResponse } from "next/server";
import { connection } from "next/server";
import { saveBooking, updateBookingStatus, deleteBooking, sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.clientName || !body.clientPhone || !body.selectedService) {
      return NextResponse.json(
        { error: "Client name, phone, and service are required." },
        { status: 400 }
      );
    }

    // Double-booking check: prevent booking a slot that is already reserved
    if (body.selectedDate && body.selectedSlot) {
      const existing = await sql`
        SELECT id FROM bookings
        WHERE inspection_date = ${body.selectedDate}
          AND time_slot = ${body.selectedSlot}
          AND status != 'cancelled'
        LIMIT 1;
      `;

      if (existing.length > 0) {
        return NextResponse.json(
          {
            error: `The slot (${body.selectedSlot}) on ${body.selectedDate} has already been reserved. Please pick another available time.`,
          },
          { status: 409 }
        );
      }
    }

    const bookingId =
      body.bookingId ||
      `MC-SG-${Math.floor(1000 + Math.random() * 9000)}`;

    const saved = await saveBooking({
      id: bookingId,
      client_name: body.clientName,
      client_phone: body.clientPhone,
      client_email: body.clientEmail,
      service_id: body.selectedService,
      service_name: body.serviceName || body.selectedService,
      service_detail: body.serviceDetail,
      property_type: body.propertyType,
      property_size: body.propertySize,
      timeline: body.timeline,
      inspection_date: body.selectedDate,
      time_slot: body.selectedSlot,
      postal_code: body.postalCode,
      unit_number: body.unitNumber,
      notes: body.additionalNotes,
      status: "confirmed",
    });

    return NextResponse.json({ success: true, booking: saved }, { status: 201 });
  } catch (error) {
    console.error("Failed to save booking to Neon DB:", error);
    return NextResponse.json(
      { error: "Internal Server Error saving booking." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await connection();
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");
    const search = searchParams.get("search");

    let bookings = await sql`
      SELECT * FROM bookings ORDER BY created_at DESC LIMIT 200;
    `;

    if (status && status !== "all") {
      bookings = bookings.filter((b: any) => b.status === status);
    }

    if (date && date !== "all") {
      bookings = bookings.filter((b: any) => b.inspection_date === date);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      bookings = bookings.filter(
        (b: any) =>
          b.client_name?.toLowerCase().includes(q) ||
          b.client_phone?.toLowerCase().includes(q) ||
          b.id?.toLowerCase().includes(q) ||
          b.postal_code?.toLowerCase().includes(q) ||
          b.service_name?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { error: "Failed to load bookings from database." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Booking ID and new status are required." },
        { status: 400 }
      );
    }

    const updated = await updateBookingStatus(id, status);
    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    console.error("Failed to update booking status:", error);
    return NextResponse.json(
      { error: "Failed to update booking in database.", details: error.message },
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
        { error: "Booking ID is required." },
        { status: 400 }
      );
    }

    await deleteBooking(id);
    return NextResponse.json({ success: true, message: `Booking ${id} deleted.` });
  } catch (error: any) {
    console.error("Failed to delete booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking from database.", details: error.message },
      { status: 500 }
    );
  }
}

