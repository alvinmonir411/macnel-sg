import { Hero } from "@/components/Hero";
import { CoreServices } from "@/components/CoreServices";
import { ToiletSpotlight } from "@/components/ToiletSpotlight";
import { OtherServices } from "@/components/OtherServices";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { FAQSection } from "@/components/FAQSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CoreServices />
      <ToiletSpotlight />
      <OtherServices />
      <WhyChooseUs />
      <QuoteCalculator />
      <FAQSection />
    </>
  );
}
