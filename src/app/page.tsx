import { Hero } from "@/components/Hero";
import { CredentialsBar } from "@/components/CredentialsBar";
import { OtherServices } from "@/components/OtherServices";
import { CustomerReviews } from "@/components/CustomerReviews";
import { ProjectsPreview } from "@/components/ProjectsPreview";
import { AboutSection } from "@/components/AboutSection";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { ContactLocationSection } from "@/components/ContactLocationSection";
import { FAQSection } from "@/components/FAQSection";
import { getLiveSiteData } from "@/lib/db";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default async function Home() {
  const siteData = await getLiveSiteData();

  const mobileHero = optimizeCloudinaryUrl(
    siteData.site_images?.hero_mobile ||
      siteData.site_images?.["/hero-modern-mobile.webp"] ||
      "/hero-modern-mobile.webp",
    { width: 768 }
  );

  const desktopHero = optimizeCloudinaryUrl(
    siteData.site_images?.hero_desktop ||
      siteData.site_images?.["/hero-modern-desktop.webp"] ||
      "/hero-modern-desktop.webp",
    { width: 1920 }
  );

  return (
    <>
      {/* 1. Hero Section with Responsive Image & Deferred HD Ambient Video */}
      <Hero
        initialMobileHero={mobileHero}
        initialDesktopHero={desktopHero}
      />

      {/* 2. Official Business Credentials Bar (RSC: 0KB Client JS) */}
      <CredentialsBar credentials={siteData.credentials} />

      {/* 3. Core Renovation Services (Single Tabbed Version with Category Filter) */}
      <OtherServices initialServices={siteData.services} />

      {/* 4. Real Customer Reviews Grid with Schema Markup & Sample Banner */}
      <CustomerReviews initialReviews={siteData.reviews} />

      {/* 5. Completed Projects Portfolio Preview with Before/After Views */}
      <ProjectsPreview initialProjects={siteData.projects} />

      {/* 6. About Us, Team Leadership & On-Site Works (RSC: 0KB Client JS) */}
      <AboutSection customCredentials={siteData.credentials} customTeam={siteData.team} customContact={siteData.contact} />

      {/* 7. Interactive Quote Request Form with SG Phone & PDPA Consent */}
      <QuoteCalculator />

      {/* 8. Office Location, Lazy-Loaded Google Map & Social Proof Strip */}
      <ContactLocationSection contact={siteData.contact} />

      {/* 9. Frequently Asked Questions with FAQPage JSON-LD Schema */}
      <FAQSection />
    </>
  );
}
