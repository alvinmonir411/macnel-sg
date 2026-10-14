import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

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
  keywords: siteConfig.seoKeywords,
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
        alt: `${siteConfig.name} - Direct Renovation Contractor Singapore`,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        telephone: siteConfig.contact.phonePrimary,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          addressCountry: "SG",
          addressLocality: "Singapore",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "1.3521",
          longitude: "103.8198",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        areaServed: {
          "@type": "Country",
          name: "Singapore",
        },
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
      },
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
        {/* Preload Critical LCP Hero Image for immediate < 1.0s first paint */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/hero-poster.webp"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-[#0F172A]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
