import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: new URL("/", siteUrl).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/about", siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/projects", siteUrl).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: new URL("/contact", siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}