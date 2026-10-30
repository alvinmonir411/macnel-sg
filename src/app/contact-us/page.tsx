import { getLiveSiteData } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { ContactUsClient } from "./ContactUsClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Contact Us | Licensed Renovation Contractor Singapore | ${siteConfig.name}`,
  description:
    "Get in touch with Singapore direct renovation contractor for a free on-site inspection, quote, and transparent project advice.",
};

export default async function ContactUsPage() {
  const siteData = await getLiveSiteData();
  const contact = {
    ...siteConfig.contact,
    ...(siteData?.contact || {}),
  };

  return <ContactUsClient initialContact={contact} />;
}
