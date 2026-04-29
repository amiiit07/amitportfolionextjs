import type { MetadataRoute } from "next";
import { getBlogs, getProjects } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();
  const [blogs, projects] = await Promise.all([getBlogs(), getProjects()]);

  const baseRoutes: MetadataRoute.Sitemap = [
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
      url: new URL("/services", siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/testimonials", siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/blog", siteUrl).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: new URL("/contact", siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
    lastModified: project.created_at ? new Date(project.created_at) : lastModified,
    changeFrequency: "monthly",
    priority: project.featured ? 0.82 : 0.72,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: new URL(`/blog/${blog.slug}`, siteUrl).toString(),
    lastModified: blog.created_at ? new Date(blog.created_at) : lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...baseRoutes, ...projectRoutes, ...blogRoutes];
}
