"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function DataLayerTracker() {
  const pathname = usePathname();

  // 1. Automatic Virtual Page View Tracking on Route Navigation
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: pathname,
      page_title: typeof document !== "undefined" ? document.title : "",
      timestamp: new Date().toISOString(),
    });
  }, [pathname]);

  // 2. Global Event Listener for Clicks (WhatsApp, Phone Call, Booking, CTAs)
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];

    const handleGlobalClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("a, button") as HTMLElement | null;
      if (!target) return;

      const tagName = target.tagName.toLowerCase();
      const href = target.getAttribute("href") || "";
      const text = (target.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100);
      const ariaLabel = target.getAttribute("aria-label") || target.getAttribute("title") || "";
      const label = text || ariaLabel || tagName;

      // A. WhatsApp Clicks
      if (
        href.includes("wa.me") ||
        href.includes("whatsapp.com") ||
        label.toLowerCase().includes("whatsapp")
      ) {
        window.dataLayer.push({
          event: "whatsapp_click",
          event_category: "lead_generation",
          event_label: label,
          target_url: href,
          page_path: window.location.pathname,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      // B. Phone Call Clicks
      if (
        href.startsWith("tel:") ||
        label.toLowerCase().includes("call now") ||
        label.toLowerCase().includes("hotline")
      ) {
        const phone = href.replace("tel:", "").trim() || label;
        window.dataLayer.push({
          event: "phone_call_click",
          event_category: "lead_generation",
          phone_number: phone,
          event_label: label,
          target_url: href,
          page_path: window.location.pathname,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      // C. Book Site Inspection Clicks
      if (
        href.includes("/book") ||
        label.toLowerCase().includes("book inspection") ||
        label.toLowerCase().includes("free inspection")
      ) {
        window.dataLayer.push({
          event: "book_inspection_click",
          event_category: "conversion_intent",
          event_label: label,
          target_url: href,
          page_path: window.location.pathname,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      // D. General Button / CTA Click
      if (
        tagName === "button" ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("brand-gradient") ||
        href.startsWith("/")
      ) {
        // Exclude trivial navigational links like privacy/terms from spamming unless they're buttons
        window.dataLayer.push({
          event: "button_click",
          event_category: "user_interaction",
          element_type: tagName,
          button_text: label,
          target_url: href || undefined,
          page_path: window.location.pathname,
          timestamp: new Date().toISOString(),
        });
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}

