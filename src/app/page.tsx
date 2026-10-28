import { Hero } from "@/components/Hero";
import { CredentialsBar } from "@/components/CredentialsBar";
import { OtherServices } from "@/components/OtherServices";
import { CustomerReviews } from "@/components/CustomerReviews";
import { ProjectsPreview } from "@/components/ProjectsPreview";
import { AboutSection } from "@/components/AboutSection";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { ContactLocationSection } from "@/components/ContactLocationSection";
import { FAQSection } from "@/components/FAQSection";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section with Responsive Image & Deferred HD Ambient Video */}
      <Hero />

      {/* 2. Official Business Credentials Bar (RSC: 0KB Client JS) */}
      <CredentialsBar />

      {/* 3. Core Renovation Services (Single Tabbed Version with Category Filter) */}
      <OtherServices />

      {/* 4. Real Customer Reviews Grid with Schema Markup & Sample Banner */}
      <CustomerReviews />

      {/* 5. Completed Projects Portfolio Preview with Before/After Views */}
      <ProjectsPreview />

      {/* 6. About Us, Team Leadership & On-Site Works (RSC: 0KB Client JS) */}
      <AboutSection />

      {/* 7. Interactive Quote Request Form with SG Phone & PDPA Consent */}
      <QuoteCalculator />

      {/* 8. Office Location, Lazy-Loaded Google Map & Social Proof Strip */}
      <ContactLocationSection />

      {/* 9. Frequently Asked Questions with FAQPage JSON-LD Schema */}
      <FAQSection />
    </>
  );
}
