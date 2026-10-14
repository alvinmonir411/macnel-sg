import { Hero } from "@/components/Hero";
import { CredentialsBar } from "@/components/CredentialsBar";
import { OtherServices } from "@/components/OtherServices";
import { CustomerReviews } from "@/components/CustomerReviews";
import { ProjectsPreview } from "@/components/ProjectsPreview";
import { AboutSection } from "@/components/AboutSection";
import { PricingSection } from "@/components/PricingSection";
import { WarrantyPaymentSection } from "@/components/WarrantyPaymentSection";
import { ToiletSpotlight } from "@/components/ToiletSpotlight";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { ContactLocationSection } from "@/components/ContactLocationSection";
import { FAQSection } from "@/components/FAQSection";

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
