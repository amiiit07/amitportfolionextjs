import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogs } from "@/lib/queries";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on web development, Next.js, React, and modern frontend technologies.",
  keywords: ["Next.js blog", "React tutorials", "frontend engineering", "performance optimization"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${siteName}`,
    description: siteDescription,
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const blogs = await getBlogs();
  const featured = blogs.filter((b) => b.featured);
  const primary = featured[0] ?? blogs[0] ?? null;

  const tagCounts = new Map<string, number>();
  for (const blog of blogs) {
    for (const tag of blog.tags) tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  }
  const topTags = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);

  return (
    <>
      <SiteHeader />
      <main className="pt-28 pb-16">
        <div className="page-container">
          <SectionHeading
            label="Insights"
            title="Engineering notes, UI decisions, and production playbooks."
            description="Deep dives into Next.js, React, and real-world shipping strategies."
          />

          {primary && (
            <Reveal delay={0.05}>
              <Link href={`/blog/${primary.slug}`} className="group block glass rounded-2xl p-6 sm:p-8 mt-8 hover:bg-white/[0.06] transition-all">
                <span className="text-[10px] uppercase tracking-wider text-[#4F8CFF]">Featured</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 group-hover:text-[#4F8CFF] transition-colors">
                  {primary.title}
                </h2>
                <p className="text-[#B4B4B4] mt-3 text-sm leading-relaxed line-clamp-2">{primary.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {primary.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-[10px] rounded-full bg-white/5 border border-white/10 text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-[#4F8CFF] font-medium mt-4">
                  Read More <ArrowUpRight size={14} />
                </span>
              </Link>
            </Reveal>
          )}

          {topTags.length > 0 && (
            <Reveal delay={0.08}>
              <div className="flex flex-wrap gap-2 mt-6">
                {topTags.map(([tag, count]) => (
                  <span key={tag} className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/50">
                    {tag} ({count})
                  </span>
                ))}
              </div>
            </Reveal>
          )}

          {blogs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {blogs.map((blog, i) => (
                <Reveal key={blog.id} delay={i * 0.05}>
                  <Link href={`/blog/${blog.slug}`} className="group block glass rounded-2xl p-5 hover:bg-white/[0.06] transition-all h-full">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 border border-white/10 text-white/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-white font-semibold group-hover:text-[#4F8CFF] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-[#B4B4B4] mt-2 line-clamp-2">{blog.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-[#4F8CFF] mt-3 font-medium">
                      Read <ArrowUpRight size={12} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center mt-8">
              <p className="text-[#B4B4B4]">No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
