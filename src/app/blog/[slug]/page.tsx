import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { BlogReadingProgress } from "@/components/blog-reading-progress";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogBySlug, getBlogs } from "@/lib/queries";
import { getSiteUrl, siteName } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Post Not Found" };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: blog.tags,
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title: `${blog.title} | ${siteName}`,
      description: blog.excerpt,
      type: "article",
      url: `/blog/${blog.slug}`,
      images: blog.cover_image
        ? [
            {
              url: blog.cover_image,
              width: 1400,
              height: 800,
              alt: blog.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.cover_image ? [blog.cover_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [blog, allBlogs] = await Promise.all([getBlogBySlug(slug), getBlogs()]);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = allBlogs
    .filter((item) => item.slug !== blog.slug)
    .map((item) => {
      const overlap = item.tags.filter((tag) => blog.tags.includes(tag)).length;
      return { item, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)
    .map((entry) => entry.item);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.cover_image ? [blog.cover_image] : undefined,
    datePublished: blog.created_at ?? new Date().toISOString(),
    dateModified: blog.created_at ?? new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Amit Kumar",
    },
    publisher: {
      "@type": "Person",
      name: "Amit Kumar",
    },
    url: new URL(`/blog/${blog.slug}`, getSiteUrl()).toString(),
    keywords: blog.tags.join(", "),
  };

  return (
    <>
      <SiteHeader />
      <BlogReadingProgress targetId="blog-post-content" />
      <main className="page-shell py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <article className="mt-8">
          <Reveal>
            <header className="max-w-3xl">
              <div className="mb-4 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-xs font-medium text-accent"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                {blog.title}
              </h1>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted">
                <span className="inline-flex items-center gap-1">
                  <Clock size={16} />
                  {blog.reading_time} min read
                </span>
                {blog.created_at && (
                  <time dateTime={blog.created_at}>
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>
            </header>
          </Reveal>

          {blog.cover_image && (
            <Reveal>
              <div className="mt-10 overflow-hidden rounded-[1.8rem] border border-white/10">
                <Image
                  src={blog.cover_image}
                  alt={blog.title}
                  width={1400}
                  height={800}
                  unoptimized
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div id="blog-post-content" className="surface mt-10 max-w-3xl rounded-[2rem] p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                {blog.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-6 text-base leading-relaxed text-white/85">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {relatedBlogs.length > 0 ? (
            <section className="mt-12">
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">Related Posts</h2>
              </Reveal>
              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {relatedBlogs.map((relatedBlog, index) => (
                  <Reveal key={relatedBlog.id} delay={index * 0.06}>
                    <BlogCard blog={relatedBlog} />
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
