import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { getLiveSiteData } from "@/lib/db";
import { SiteShell } from "@/components/SiteShell";
import { MarketingHeadScripts } from "@/components/MarketingScripts";
import { setBatchRuntimeOverrides } from "@/lib/cloudinary";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "800"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600"],
  display: "swap",
  preload: true,
});


export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Renovation Contractor Singapore`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Renovation Contractor Singapore`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_SG",
    type: "website",
    images: [
      {
        url: "/images/partition-ceiling/Floating-Ceiling-Effect_Picfinder.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Singapore Renovation Specialists`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Renovation Contractor Singapore`,
    description: siteConfig.description,
    images: ["/images/partition-ceiling/Floating-Ceiling-Effect_Picfinder.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/macnel-icon.svg",
    shortcut: "/macnel-icon.svg",
    apple: "/macnel-icon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteData = await getLiveSiteData();
  if (siteData?.site_images) {
    setBatchRuntimeOverrides(siteData.site_images);
  }
  const socialsList = Object.values(siteConfig.socials).filter(
    (url) => url && !url.includes("TODO_REPLACE")
  );

  const businessSchema: Record<string, any> = {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName.replace("TODO_REPLACE: ", ""),
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: siteConfig.contact.phonePrimary,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.replace("TODO_REPLACE: ", ""),
      addressCountry: "SG",
      addressLocality: "Singapore",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "1.3090",
      longitude: "103.8560",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Singapore",
    },
    sameAs: socialsList.length > 0 ? socialsList : undefined,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Renovation & Construction Services",
      itemListElement: siteConfig.coreServices.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };

  // Rule E.2: Add aggregateRating ONLY if real review data exists
  if (
    siteConfig.reviews.rating !== null &&
    siteConfig.reviews.reviewCount !== null &&
    siteConfig.reviews.googleReviewsUrl
  ) {
    businessSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviews.rating,
      reviewCount: siteConfig.reviews.reviewCount,
      bestRating: 5,
    };
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema,
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: {
          "@id": `${siteConfig.url}/#business`,
        },
        inLanguage: "en-SG",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <head>
        {/* ⚡ High-Priority Modern Renovation Hero Image Preloads */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/hero-modern-mobile.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/hero-modern-desktop.webp"
          media="(min-width: 769px)"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          id="image-overrides-data"
          dangerouslySetInnerHTML={{
            __html: `window.__IMAGE_OVERRIDES__ = ${JSON.stringify(
              siteData.site_images || {}
            )};`,
          }}
        />
        <script
          id="site-live-data"
          dangerouslySetInnerHTML={{
            __html: `window.__SITE_DATA__ = ${JSON.stringify(siteData)};`,
          }}
        />
        {/* Dynamic Marketing & Tracking Scripts (GA4, GTM, Meta Pixel, Custom Head) */}
        <MarketingHeadScripts marketing={siteData.marketing} />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-[#0F172A]">
        <SiteShell siteData={siteData}>{children}</SiteShell>
      </body>
    </html>
  );
}
