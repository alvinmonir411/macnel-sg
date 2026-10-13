import { NextResponse } from "next/server";
import { saveBooking, sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.clientName || !body.clientPhone || !body.selectedService) {
      return NextResponse.json(
        { error: "Client name, phone, and service are required." },
        { status: 400 }
      );
    }

    const bookingId =
      body.bookingId ||
      `MC-${Date.now().toString().slice(-6)}-${Math.floor(10 + Math.random() * 90)}`;

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

export async function GET() {
  try {
    const bookings = await sql`
      SELECT * FROM bookings ORDER BY created_at DESC LIMIT 50;
    `;
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { error: "Failed to load bookings from database." },
      { status: 500 }
    );
  }
}
