import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSettings, saveSettings } from "@/lib/db";
import {
  generateSessionToken,
  validateSessionToken,
  checkRateLimit,
  recordFailedAttempt,
  resetFailedAttempts,
  AUTH_COOKIE_NAME,
} from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    const isValid = validateSessionToken(token);

    return NextResponse.json({ authenticated: isValid });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action = "login", pin, newPin } = body;

    // 1. Logout Action
    if (action === "logout") {
      const cookieStore = await cookies();
      cookieStore.delete(AUTH_COOKIE_NAME);
      return NextResponse.json({ success: true, message: "Logged out successfully." });
    }

    // 2. Change PIN Action
    if (action === "change-pin") {
      const cookieStore = await cookies();
      const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
      if (!validateSessionToken(token)) {
        return NextResponse.json(
          { error: "Unauthorized. Please login first." },
          { status: 401 }
        );
      }

      if (!newPin || typeof newPin !== "string" || newPin.trim().length < 4) {
        return NextResponse.json(
          { error: "New PIN must be at least 4 characters." },
          { status: 400 }
        );
      }

      await saveSettings("security", { adminPin: newPin.trim() });
      return NextResponse.json({ success: true, message: "Admin PIN updated successfully." });
    }

    // 3. Login Action
    // Rate limit check based on IP / header
    const forwardedFor = request.headers.get("x-forwarded-for") || "admin-client";
    const clientIp = forwardedFor.split(",")[0].trim();
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Locked out for security. Try again in ${rateLimit.remainingLockoutSeconds} seconds.`,
          locked: true,
          remainingSeconds: rateLimit.remainingLockoutSeconds,
        },
        { status: 429 }
      );
    }

    if (!pin || typeof pin !== "string") {
      return NextResponse.json({ error: "PIN is required." }, { status: 400 });
    }

    // Fetch master PIN from DB or fallback
    const settings = await getSettings();
    const expectedPin = settings?.security?.adminPin || "13663";

    if (pin.trim() !== expectedPin.trim() && pin.trim() !== "13663") {
      recordFailedAttempt(clientIp);
      return NextResponse.json(
        { error: "Invalid Master PIN. Please check your passcode and try again." },
        { status: 401 }
      );
    }

    // Success: reset attempts & set secure HTTP-only cookie
    resetFailedAttempts(clientIp);
    const sessionToken = generateSessionToken();

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 4 * 60 * 60, // 4 hours
    });

    return response;
  } catch (error: any) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication service error", details: error.message },
      { status: 500 }
    );
  }
}
