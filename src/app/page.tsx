import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { CredentialsBar } from "@/components/CredentialsBar";
import { OtherServices } from "@/components/OtherServices";

// ⚡ Code-split below-the-fold components with SSR enabled
// Eliminates main-thread blocking on initial mobile paint while preserving 100% SEO
const CustomerReviews = dynamic(
  () => import("@/components/CustomerReviews").then((mod) => mod.CustomerReviews),
  { ssr: true }
);
const ProjectsPreview = dynamic(
  () => import("@/components/ProjectsPreview").then((mod) => mod.ProjectsPreview),
  { ssr: true }
);
const AboutSection = dynamic(
  () => import("@/components/AboutSection").then((mod) => mod.AboutSection),
  { ssr: true }
);
const PricingSection = dynamic(
  () => import("@/components/PricingSection").then((mod) => mod.PricingSection),
  { ssr: true }
);
const WarrantyPaymentSection = dynamic(
  () => import("@/components/WarrantyPaymentSection").then((mod) => mod.WarrantyPaymentSection),
  { ssr: true }
);
const ToiletSpotlight = dynamic(
  () => import("@/components/ToiletSpotlight").then((mod) => mod.ToiletSpotlight),
  { ssr: true }
);
const WhyChooseUs = dynamic(
  () => import("@/components/WhyChooseUs").then((mod) => mod.WhyChooseUs),
  { ssr: true }
);
const QuoteCalculator = dynamic(
  () => import("@/components/QuoteCalculator").then((mod) => mod.QuoteCalculator),
  { ssr: true }
);
const ContactLocationSection = dynamic(
  () => import("@/components/ContactLocationSection").then((mod) => mod.ContactLocationSection),
  { ssr: true }
);
const FAQSection = dynamic(
  () => import("@/components/FAQSection").then((mod) => mod.FAQSection),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      {/* 1. Hero Section with Deferred HD Ambient Video */}
      <Hero />

      {/* 2. Official Business Credentials Bar (UEN, Licenses, Insurance) */}
      <CredentialsBar />

      {/* 3. Core Renovation Services (Single Tabbed Version with Category Filter) */}
      <OtherServices />

      {/* 4. Real Customer Reviews Grid with Schema Markup & Sample Banner */}
      <CustomerReviews />

      {/* 5. Completed Projects Portfolio Preview with Before/After Views */}
      <ProjectsPreview />

      {/* 6. About Us, Team Leadership & 6-Step Working Process */}
      <AboutSection />

      {/* 7. Transparent Indicative Pricing Guide with Disclaimer */}
      <PricingSection />

      {/* 8. Warranty by Trade & Milestone Payment Terms + Sample Quote PDF */}
      <WarrantyPaymentSection />

      {/* 9. Specialized Toilet Renovation Deep-Dive */}
      <ToiletSpotlight />

      {/* 10. Why Homeowners Choose Us (Verified In-House Builder Reasons) */}
      <WhyChooseUs />

      {/* 11. Interactive Quote Request Form with SG Phone & PDPA Consent */}
      <QuoteCalculator />

      {/* 12. Office Location, Lazy-Loaded Google Map & Social Proof Strip */}
      <ContactLocationSection />

      {/* 13. Frequently Asked Questions with FAQPage JSON-LD Schema */}
      <FAQSection />
    </>
  );
}
