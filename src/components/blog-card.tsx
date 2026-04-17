import Image from "next/image";
import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import type { Blog } from "@/lib/types";

type BlogCardProps = {
  blog: Blog;
};

export function BlogCard({ blog }: BlogCardProps) {
  const primaryTag = blog.tags[0] ?? "Article";

  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <article className="surface h-full overflow-hidden rounded-[1.8rem] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(2,8,23,0.38)]">
        {blog.cover_image && (
          <div className="aspect-video w-full overflow-hidden">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              width={960}
              height={540}
              unoptimized
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              {primaryTag}
            </span>
            {blog.featured ? (
              <span className="rounded-full border border-[#8b5cf6]/32 bg-[#8b5cf6]/16 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ddd6fe]">
                Featured
              </span>
            ) : null}
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-xs font-medium text-accent"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-accent">
            {blog.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
            {blog.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Clock size={14} />
              {blog.reading_time} min read
            </span>
            {blog.created_at ? <span>{new Date(blog.created_at).toLocaleDateString("en-US")}</span> : null}
          </div>
        </div>
      </article>
    </Link>
  );
}
