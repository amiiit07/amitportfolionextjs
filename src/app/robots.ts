import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog", "/projects", "/about", "/services", "/contact", "/testimonials"],
        disallow: ["/admin", "/admin/*"],
      },
    ],
    host: siteUrl.toString(),
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}