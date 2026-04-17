import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogBySlug, getBlogs } from "@/lib/queries";
import { siteName } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Post Not Found" };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: `${blog.title} | ${siteName}`,
      description: blog.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-14">
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
                <img
                  src={blog.cover_image}
                  alt={blog.title}
                  className="w-full object-cover"
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div className="surface mt-10 max-w-3xl rounded-[2rem] p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                {blog.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-6 text-base leading-relaxed text-white/85">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
