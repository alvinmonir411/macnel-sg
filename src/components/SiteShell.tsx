"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { AiChatWidget } from "@/components/AiChatWidget";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { MarketingBodyScripts } from "@/components/MarketingScripts";

export function SiteShell({
  children,
  siteData,
}: {
  children: React.ReactNode;
  siteData?: any;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // The CMS is an operational workspace, not a customer-facing page. Keeping
  // campaign scripts and conversion widgets out of it avoids obscured controls,
  // misleading customer actions, and unnecessary tracking in the back office.
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
