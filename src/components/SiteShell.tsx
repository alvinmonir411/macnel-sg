"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { AiChatWidget } from "@/components/AiChatWidget";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { MarketingBodyScripts } from "@/components/MarketingScripts";
import { setBatchRuntimeOverrides } from "@/lib/cloudinary";

export function SiteShell({
  children,
  siteData,
}: {
  children: React.ReactNode;
  siteData?: any;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // 1. Initial sync from SSR siteData
  useEffect(() => {
    if (siteData?.site_images) {
      if (typeof window !== "undefined") {
        (window as any).__IMAGE_OVERRIDES__ = {
          ...((window as any).__IMAGE_OVERRIDES__ || {}),
          ...siteData.site_images,
        };
      }
      setBatchRuntimeOverrides(siteData.site_images);
      window.dispatchEvent(new CustomEvent("live-image-updated"));
    }
  }, [siteData?.site_images]);

  // 2. Real-time background fetch to guarantee fresh DB images on every visit/route transition & cross-tab sync
  useEffect(() => {
    let isMounted = true;

    const fetchLiveImages = async () => {
      try {
        const res = await fetch(`/api/live-images?t=${Date.now()}`, {
          cache: "no-store",
          headers: { Pragma: "no-cache" },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data?.overrides) {
          if (typeof window !== "undefined") {
            (window as any).__IMAGE_OVERRIDES__ = {
              ...((window as any).__IMAGE_OVERRIDES__ || {}),
              ...data.overrides,
            };
          }
          setBatchRuntimeOverrides(data.overrides);
          window.dispatchEvent(new CustomEvent("live-image-updated"));
        }
      } catch {
        // Silently swallow network errors on background check
      }
    };

    fetchLiveImages();

    // Re-check when window regains focus (e.g. user switched back from admin dashboard)
    window.addEventListener("focus", fetchLiveImages);
    
    // Cross-tab real-time sync via storage event
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "site_images_updated_at") {
        fetchLiveImages();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      isMounted = false;
      window.removeEventListener("focus", fetchLiveImages);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [pathname]);

  // The CMS is an operational workspace, not a customer-facing page.
  if (isAdminRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <MarketingBodyScripts marketing={siteData?.marketing} />
      <Header
        customContact={siteData?.contact}
        customCredentials={siteData?.credentials}
      />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer
        customContact={siteData?.contact}
        customCredentials={siteData?.credentials}
      />
      <FloatingCTA contact={siteData?.contact} />
      <AiChatWidget />
      <CookieConsentBanner />
    </>
  );
}
