import { neon } from "@neondatabase/serverless";

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_MjvdxH72CEiN@ep-withered-firefly-b5fn2kvv-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const sql = neon(databaseUrl);

export interface BookingRecord {
  id: string;
  client_name: string;
  client_phone: string;
  client_email?: string;
  service_id: string;
  service_name: string;
  service_detail?: string;
  property_type?: string;
  property_size?: string;
  timeline?: string;
  inspection_date?: string;
  time_slot?: string;
  postal_code?: string;
  unit_number?: string;
  notes?: string;
  status?: string;
}

export interface InquiryRecord {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  property_type?: string;
  estimated_budget?: string;
  message?: string;
  source?: string;
}

export async function saveBooking(booking: BookingRecord) {
  const result = await sql`
    INSERT INTO bookings (
      id,
      client_name,
      client_phone,
      client_email,
      service_id,
      service_name,
      service_detail,
      property_type,
      property_size,
      timeline,
      inspection_date,
      time_slot,
      postal_code,
      unit_number,
      notes,
      status
    ) VALUES (
      ${booking.id},
      ${booking.client_name},
      ${booking.client_phone},
      ${booking.client_email || null},
      ${booking.service_id},
      ${booking.service_name},
      ${booking.service_detail || null},
      ${booking.property_type || null},
      ${booking.property_size || null},
      ${booking.timeline || null},
      ${booking.inspection_date || null},
      ${booking.time_slot || null},
      ${booking.postal_code || null},
      ${booking.unit_number || null},
      ${booking.notes || null},
      ${booking.status || "confirmed"}
    )
    RETURNING *;
  `;
  return result[0];
}

export async function saveInquiry(inquiry: InquiryRecord) {
  const result = await sql`
    INSERT INTO inquiries (
      name,
      phone,
      email,
      service,
      property_type,
      estimated_budget,
      message,
      source
    ) VALUES (
      ${inquiry.name},
      ${inquiry.phone},
      ${inquiry.email || null},
      ${inquiry.service || null},
      ${inquiry.property_type || null},
      ${inquiry.estimated_budget || null},
      ${inquiry.message || null},
      ${inquiry.source || "website"}
    )
    RETURNING *;
  `;
  return result[0];
}

export async function getBookedSlotsForDate(date: string): Promise<string[]> {
  const rows = await sql`
    SELECT time_slot FROM bookings
    WHERE inspection_date = ${date}
      AND status != 'cancelled';
  `;
  return rows.map((r: any) => String(r.time_slot));
}

export async function updateBookingStatus(id: string, status: string) {
  const result = await sql`
    UPDATE bookings
    SET status = ${status}
    WHERE id = ${id}
    RETURNING *;
  `;
  return result[0];
}

export async function deleteBooking(id: string) {
  const result = await sql`
    DELETE FROM bookings
    WHERE id = ${id}
    RETURNING *;
  `;
  return result[0];
}

export async function deleteInquiry(id: number) {
  const result = await sql`
    DELETE FROM inquiries
    WHERE id = ${id}
    RETURNING *;
  `;
  return result[0];
}

