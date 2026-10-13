import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const buildDate = "2026-10-13T00:00:00.000Z";

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/book", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.95, changeFrequency: "weekly" as const },
    {
      path: "/toilet-renovation-in-singapore",
      priority: 0.95,
      changeFrequency: "weekly" as const,
    },
    { path: "/project-gallery", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/about-us", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact-us", priority: 0.9, changeFrequency: "monthly" as const },
    {
      path: "/house-renovation",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/door-window-services",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/flooring-carpet-services",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/house-painting-plastering",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    { path: "/tiling-works", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/false-ceiling", priority: 0.85, changeFrequency: "weekly" as const },
    {
      path: "/electrical-works-rewiring",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/carpentry-services",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: buildDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
