import {
  createBlogAction,
} from "@/app/admin/(protected)/actions";
import { Reveal } from "@/components/reveal";

export default async function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <section className="surface rounded-[2rem] p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.18em] text-accent">Blog</p>
        <h1 className="mt-2 text-3xl font-semibold">Create a new blog post</h1>

        <form action={createBlogAction} className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            <span>Title</span>
            <input className="field" name="title" placeholder="Building Modern Web Apps" required />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Slug</span>
            <input className="field" name="slug" placeholder="building-modern-web-apps" />
          </label>
          <label className="space-y-2 text-sm font-medium md:col-span-2">
            <span>Excerpt</span>
            <textarea
              className="field min-h-24 resize-y"
              name="excerpt"
              placeholder="A brief summary of the blog post..."
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium md:col-span-2">
            <span>Content</span>
            <textarea
              className="field min-h-48 resize-y"
              name="content"
              placeholder="Full blog post content..."
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Cover Image URL</span>
            <input className="field" name="coverImage" placeholder="https://example.com/image.jpg" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Tags</span>
            <input className="field" name="tags" placeholder="Next.js, React, Web Dev" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Published</span>
            <select className="field" name="published" defaultValue="true">
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Featured</span>
            <select className="field" name="featured" defaultValue="false">
              <option value="true">Featured</option>
              <option value="false">Standard</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Sort Order</span>
            <input className="field" type="number" min="0" name="sortOrder" defaultValue="0" />
          </label>
          <button
            type="submit"
            className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white md:col-span-2 md:w-fit"
          >
            Create Blog Post
          </button>
        </form>
      </section>

      <section className="surface rounded-[2rem] p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.18em] text-accent">Existing Blogs</p>
        <Reveal>
          <div className="mt-8 space-y-4 text-center text-muted">
            <p>No blog posts yet. Create your first one above!</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
