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

export async function ensureCoreTables() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(50) PRIMARY KEY,
        client_name VARCHAR(255) NOT NULL,
        client_phone VARCHAR(50) NOT NULL,
        client_email VARCHAR(255),
        service_id VARCHAR(100) NOT NULL,
        service_name VARCHAR(255) NOT NULL,
        service_detail TEXT,
        property_type VARCHAR(100),
        property_size VARCHAR(100),
        timeline VARCHAR(100),
        inspection_date VARCHAR(50),
        time_slot VARCHAR(50),
        postal_code VARCHAR(50),
        unit_number VARCHAR(50),
        notes TEXT,
        status VARCHAR(50) DEFAULT 'confirmed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        service VARCHAR(255),
        property_type VARCHAR(100),
        estimated_budget VARCHAR(100),
        message TEXT,
        source VARCHAR(100) DEFAULT 'website',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
  } catch (err) {
    console.warn("Neon DB table check notice:", err);
  }
}

export async function saveBooking(booking: BookingRecord) {
  await ensureCoreTables();
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
  await ensureCoreTables();
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

export async function getSettings() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        key VARCHAR(100) PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const rows = await sql`
      SELECT key, value FROM site_settings;
    `;

    if (rows.length > 0) {
      const dbSettings: any = {};
      for (const row of rows) {
        dbSettings[row.key] = row.value;
      }
      return dbSettings;
    }
  } catch (err) {
    console.warn("Neon DB getSettings fallback to JSON:", err);
  }

  // Fallback to local JSON file
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "data", "siteSettings.json");
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (e) {
    console.error("Failed to read siteSettings.json fallback:", e);
    return null;
  }
}

export async function saveSettings(category: string, value: any) {
  // 1. Save to Neon PostgreSQL
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        key VARCHAR(100) PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    await sql`
      INSERT INTO site_settings (key, value, updated_at)
      VALUES (${category}, ${JSON.stringify(value)}, NOW())
      ON CONFLICT (key)
      DO UPDATE SET value = ${JSON.stringify(value)}, updated_at = NOW();
    `;
  } catch (err) {
    console.warn("Neon DB saveSettings warning:", err);
  }

  // 2. Also update local JSON file cache
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "data", "siteSettings.json");
    let currentData: any = {};
    try {
      const content = await fs.readFile(filePath, "utf-8");
      currentData = JSON.parse(content);
    } catch {}
    currentData[category] = value;
    await fs.writeFile(filePath, JSON.stringify(currentData, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write to siteSettings.json:", e);
  }

  return { success: true };
}

import servicesFallback from "../../data/services.json";
import projectsFallback from "../../data/projects.json";
import pricingFallback from "../../data/pricing.json";
import reviewsFallback from "../../data/reviews.json";
import siteSettingsFallback from "../../data/siteSettings.json";

export async function getLiveSiteData() {
  "use cache";
  const dbSettings = await getSettings();

  return {
    settings: dbSettings || {},
    services:
      dbSettings?.services && Array.isArray(dbSettings.services) && dbSettings.services.length > 0
        ? dbSettings.services
        : (servicesFallback as any[]),
    projects:
      dbSettings?.projects && Array.isArray(dbSettings.projects) && dbSettings.projects.length > 0
        ? dbSettings.projects
        : (projectsFallback as any[]),
    pricing: dbSettings?.pricing || pricingFallback,
    reviews: dbSettings?.reviews || reviewsFallback,
    contact: {
      ...(siteSettingsFallback.contact || {}),
      ...(dbSettings?.contact || {}),
    },
    credentials: {
      ...(siteSettingsFallback.credentials || {}),
      ...(dbSettings?.credentials || {}),
    },
    marketing: {
      ...(siteSettingsFallback.marketing || {}),
      ...(dbSettings?.marketing || {}),
    },
    ai: {
      ...(siteSettingsFallback.ai || {}),
      ...(dbSettings?.ai || {}),
    },
    site_images: {
      ...((siteSettingsFallback as any).site_images || {}),
      ...(dbSettings?.site_images || {}),
    },
  };
}
