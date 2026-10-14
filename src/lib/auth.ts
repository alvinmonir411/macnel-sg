import crypto from "crypto";
import { cookies } from "next/headers";
import { getSettings, saveSettings } from "@/lib/db";

const AUTH_COOKIE_NAME = "macnel_admin_session";
const SERVER_SECRET = process.env.ADMIN_SECRET_KEY || "macnel-sg-secure-salt-2026-xyz987!";
const SESSION_EXPIRY_MS = 4 * 60 * 60 * 1000; // 4 hours

// In-memory rate limiting for brute force protection
const loginAttempts: Record<string, { count: number; lockedUntil?: number }> = {};

export function hashPassword(password: string): string {
  return crypto
    .createHmac("sha256", SERVER_SECRET)
    .update(password.trim())
    .digest("hex");
}

export function generateSessionToken(): string {
  const timestamp = Date.now();
  const random = crypto.randomBytes(16).toString("hex");
  const payload = `${timestamp}:${random}`;
  const signature = crypto
    .createHmac("sha256", SERVER_SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}:${signature}`;
}

export function validateSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(":");
  if (parts.length !== 3) return false;

  const [timestampStr, random, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp) || Date.now() - timestamp > SESSION_EXPIRY_MS) {
    return false; // Expired
  }

  const expectedSignature = crypto
    .createHmac("sha256", SERVER_SECRET)
    .update(`${timestamp}:${random}`)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expectedSignature, "hex")
  );
}

// Check rate limit for an identifier (e.g. IP)
export function checkRateLimit(identifier: string): { allowed: boolean; remainingLockoutSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts[identifier];

  if (!record) return { allowed: true };

  if (record.lockedUntil && now < record.lockedUntil) {
    const remaining = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingLockoutSeconds: remaining };
  }

  if (record.lockedUntil && now >= record.lockedUntil) {
    // Reset after lockout expired
    delete loginAttempts[identifier];
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAttempt(identifier: string) {
  const now = Date.now();
  if (!loginAttempts[identifier]) {
    loginAttempts[identifier] = { count: 1 };
  } else {
    loginAttempts[identifier].count += 1;
  }

  // Lock out after 5 consecutive failures for 15 minutes
  if (loginAttempts[identifier].count >= 5) {
    loginAttempts[identifier].lockedUntil = now + 15 * 60 * 1000;
  }
}

export function resetFailedAttempts(identifier: string) {
  delete loginAttempts[identifier];
}

// Server-side check if user is authenticated from request cookies
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return validateSessionToken(sessionCookie);
}

export { AUTH_COOKIE_NAME };
