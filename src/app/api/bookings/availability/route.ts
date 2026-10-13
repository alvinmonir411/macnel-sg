import { NextResponse } from "next/server";
import { connection } from "next/server";
import { getBookedSlotsForDate } from "@/lib/db";

export async function GET(request: Request) {
  await connection();

  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Date query parameter is required (YYYY-MM-DD)." },
        { status: 400 }
      );
    }

    const bookedSlots = await getBookedSlotsForDate(date);

    return NextResponse.json({
      date,
      bookedSlots,
    });
  } catch (error) {
    console.error("Failed to query slot availability:", error);
    return NextResponse.json(
      { error: "Failed to query slot availability." },
      { status: 500 }
    );
  }
}
