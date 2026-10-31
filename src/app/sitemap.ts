import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import projectsData from "../../data/projects.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const buildDate = new Date().toISOString();

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/book", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/about-us", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact-us", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/project-gallery", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    // 8 Core Service Pages
    {
      path: "/toilet-renovation-in-singapore",
      priority: 0.95,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/house-renovation",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/tiling-works",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/door-window-services",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/false-ceiling",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/house-painting-plastering",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/plastering-services",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/flooring-carpet-services",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/carpentry-services",
      priority: 0.85,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/electrical-works-rewiring",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
  ];

  const projectRoutes = projectsData.map((p) => ({
    path: `/projects/${p.id}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const allRoutes = [...staticRoutes, ...projectRoutes];

  return allRoutes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: buildDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
