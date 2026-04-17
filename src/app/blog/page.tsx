import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogs } from "@/lib/queries";
import { siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on web development, Next.js, React, and modern frontend technologies.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${siteName}`,
    description: siteDescription,
    url: "/blog",
  },
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-14">
        <Reveal>
          <SectionHeading
            label="Blog"
            title="Insights and tutorials on modern web development."
            description="Deep dives into Next.js, React, Tailwind CSS, and building production-ready applications."
          />
        </Reveal>

        {blogs.length > 0 ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog, index) => (
              <Reveal key={blog.id} delay={index * 0.06}>
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
