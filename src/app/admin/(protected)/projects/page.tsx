import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/app/admin/(protected)/actions";
import { getProjects } from "@/lib/queries";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <section className="surface rounded-[2rem] p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.18em] text-accent">Projects</p>
        <h1 className="mt-2 text-3xl font-semibold">Add a new case study</h1>

        <form action={createProjectAction} className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            <span>Title</span>
            <input className="field" name="title" placeholder="Premium Portfolio Build" required />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Slug</span>
            <input className="field" name="slug" placeholder="premium-portfolio-build" />
          </label>
          <label className="space-y-2 text-sm font-medium md:col-span-2">
            <span>Summary</span>
            <input
              className="field"
              name="summary"
              placeholder="One-line summary for cards and project highlights."
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium md:col-span-2">
            <span>Description</span>
            <textarea
              className="field min-h-32 resize-y"
              name="description"
              placeholder="Longer project description."
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Stack</span>
            <input className="field" name="stack" placeholder="Next.js, Supabase, Tailwind CSS" required />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Status</span>
            <select className="field" name="status" defaultValue="Shipped">
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Shipped">Shipped</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Live URL</span>
            <input className="field" name="liveUrl" placeholder="https://example.com" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Repo URL</span>
            <input className="field" name="repoUrl" placeholder="https://github.com/username/repo" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Sort order</span>
            <input className="field" type="number" min="0" name="sortOrder" defaultValue="0" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Featured</span>
            <select className="field" name="featured" defaultValue="true">
              <option value="true">Featured</option>
              <option value="false">Standard</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white md:col-span-2 md:w-fit"
          >
            Create Project
          </button>
        </form>
      </section>

      <section className="surface rounded-[2rem] p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.18em] text-accent">Existing Projects</p>
        <div className="mt-8 space-y-6">
          {projects.map((project) => (
            <form
              key={project.id}
              action={updateProjectAction}
              className="rounded-[1.8rem] border border-black/8 bg-white/70 p-5"
            >
              <input type="hidden" name="id" value={project.id} />

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-medium">
                  <span>Title</span>
                  <input className="field" name="title" defaultValue={project.title} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Slug</span>
                  <input className="field" name="slug" defaultValue={project.slug} />
                </label>
                <label className="space-y-2 text-sm font-medium md:col-span-2">
                  <span>Summary</span>
                  <input className="field" name="summary" defaultValue={project.summary} />
                </label>
                <label className="space-y-2 text-sm font-medium md:col-span-2">
                  <span>Description</span>
                  <textarea
                    className="field min-h-32 resize-y"
                    name="description"
                    defaultValue={project.description}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Stack</span>
                  <input className="field" name="stack" defaultValue={project.stack.join(", ")} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Status</span>
                  <select className="field" name="status" defaultValue={project.status}>
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Shipped">Shipped</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Live URL</span>
                  <input className="field" name="liveUrl" defaultValue={project.live_url ?? ""} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Repo URL</span>
                  <input className="field" name="repoUrl" defaultValue={project.repo_url ?? ""} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Sort order</span>
                  <input className="field" type="number" min="0" name="sortOrder" defaultValue={project.sort_order} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Featured</span>
                  <select className="field" name="featured" defaultValue={project.featured ? "true" : "false"}>
                    <option value="true">Featured</option>
                    <option value="false">Standard</option>
                  </select>
                </label>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="neon-button px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Update Project
                </button>
                <button
                  formAction={deleteProjectAction}
                  type="submit"
                  className="rounded-full border border-rose-200 px-5 py-2.5 text-sm font-semibold text-rose-600"
                >
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}

