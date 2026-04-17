import Image from "next/image";
import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import type { Blog } from "@/lib/types";

type BlogCardProps = {
  blog: Blog;
};

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <article className="surface h-full overflow-hidden rounded-[1.8rem] transition-transform duration-300 hover:-translate-y-1">
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
            {blog.featured && (
              <span className="rounded-full bg-accent/20 px-2 py-0.5 text-accent">
                Featured
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
