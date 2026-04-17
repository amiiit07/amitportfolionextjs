import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogs } from "@/lib/queries";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on web development, Next.js, React, and modern frontend technologies.",
  keywords: [
    "Next.js blog",
    "React tutorials",
    "frontend engineering",
    "performance optimization",
    "portfolio case studies",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${siteName}`,
    description: siteDescription,
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteName}`,
    description: "Read actionable frontend engineering guides, architecture notes, and performance playbooks.",
  },
};

export default async function BlogPage() {
  const blogs = await getBlogs();
  const featuredBlogs = blogs.filter((blog) => blog.featured);
  const primaryBlog = featuredBlogs[0] ?? blogs[0] ?? null;

  const categoryMap = new Map<string, number>();
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      categoryMap.set(tag, (categoryMap.get(tag) ?? 0) + 1);
    }
  }
  const categoryEntries = Array.from(categoryMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteName} Blog`,
    description: "Frontend engineering notes, case studies, and production optimization guides.",
    url: new URL("/blog", getSiteUrl()).toString(),
    blogPost: blogs.slice(0, 10).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      url: new URL(`/blog/${blog.slug}`, getSiteUrl()).toString(),
      datePublished: blog.created_at ?? new Date().toISOString(),
      keywords: blog.tags.join(", "),
    })),
  };

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
        />

        <Reveal>
          <SectionHeading
            label="Blog"
            title="Engineering notes, UI decisions, and production playbooks."
            description="Deep dives into Next.js, React, Tailwind CSS, architecture trade-offs, and real-world shipping strategies."
          />
        </Reveal>

        {primaryBlog ? (
          <Reveal delay={0.05}>
            <article className="surface mt-10 rounded-[2rem] p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Featured Insight</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">
                {primaryBlog.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-muted md:text-base">{primaryBlog.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {primaryBlog.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ) : null}

        {categoryEntries.length > 0 ? (
          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap gap-3">
              {categoryEntries.map(([category, count]) => (
                <span
                  key={category}
                  className="subtle-tag rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/75"
                >
                  {category} ({count})
                </span>
              ))}
            </div>
          </Reveal>
        ) : null}

        {blogs.length > 0 ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog, index) => (
              <Reveal key={blog.id} delay={index * 0.05}>
                <BlogCard blog={blog} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[2rem] border border-dashed border-white/10 p-12 text-center">
            <p className="text-muted">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
