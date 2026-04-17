import {
  createTestimonialAction,
  deleteTestimonialAction,
  updateTestimonialAction,
} from "@/app/admin/(protected)/actions";
import { getTestimonials } from "@/lib/queries";
import { Reveal } from "@/components/reveal";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <section className="surface rounded-[2rem] p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.18em] text-accent">Testimonials</p>
        <h1 className="mt-2 text-3xl font-semibold">Add a client testimonial</h1>

        <form action={createTestimonialAction} className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            <span>Client Name</span>
            <input className="field" name="clientName" placeholder="John Doe" required />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Client Role</span>
            <input className="field" name="clientRole" placeholder="CEO" required />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Company</span>
            <input className="field" name="company" placeholder="Acme Inc." required />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Rating (1-5)</span>
            <input className="field" type="number" min="1" max="5" name="rating" defaultValue="5" required />
          </label>
          <label className="space-y-2 text-sm font-medium md:col-span-2">
            <span>Testimonial</span>
            <textarea
              className="field min-h-32 resize-y"
              name="content"
              placeholder="What the client said about your work..."
              required
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Avatar URL</span>
            <input className="field" name="avatarUrl" placeholder="https://example.com/avatar.jpg" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Sort Order</span>
            <input className="field" type="number" min="0" name="sortOrder" defaultValue="0" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>Featured</span>
            <select className="field" name="featured" defaultValue="false">
              <option value="true">Featured</option>
              <option value="false">Standard</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white md:col-span-2 md:w-fit"
          >
            Add Testimonial
          </button>
        </form>
      </section>

      <section className="surface rounded-[2rem] p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.18em] text-accent">Existing Testimonials</p>
        {testimonials.length > 0 ? (
          <div className="mt-8 space-y-6">
            {testimonials.map((testimonial) => (
              <form
                key={testimonial.id}
                action={updateTestimonialAction}
                className="rounded-[1.8rem] border border-black/8 bg-white/70 p-5"
              >
                <input type="hidden" name="id" value={testimonial.id} />

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium">
                    <span>Client Name</span>
                    <input className="field" name="clientName" defaultValue={testimonial.client_name} />
                  </label>
                  <label className="space-y-2 text-sm font-medium">
                    <span>Client Role</span>
                    <input className="field" name="clientRole" defaultValue={testimonial.client_role} />
                  </label>
                  <label className="space-y-2 text-sm font-medium">
                    <span>Company</span>
                    <input className="field" name="company" defaultValue={testimonial.company} />
                  </label>
                  <label className="space-y-2 text-sm font-medium">
                    <span>Rating</span>
                    <input className="field" type="number" min="1" max="5" name="rating" defaultValue={testimonial.rating} />
                  </label>
                  <label className="space-y-2 text-sm font-medium md:col-span-2">
                    <span>Testimonial</span>
                    <textarea className="field min-h-24 resize-y" name="content" defaultValue={testimonial.content} />
                  </label>
                  <label className="space-y-2 text-sm font-medium">
                    <span>Avatar URL</span>
                    <input className="field" name="avatarUrl" defaultValue={testimonial.avatar_url ?? ""} />
                  </label>
                  <label className="space-y-2 text-sm font-medium">
                    <span>Sort Order</span>
                    <input className="field" type="number" min="0" name="sortOrder" defaultValue={testimonial.sort_order} />
                  </label>
                  <label className="space-y-2 text-sm font-medium">
                    <span>Featured</span>
                    <select className="field" name="featured" defaultValue={testimonial.featured ? "true" : "false"}>
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
                    Update
                  </button>
                  <button
                    formAction={deleteTestimonialAction}
                    type="submit"
                    className="rounded-full border border-rose-200 px-5 py-2.5 text-sm font-semibold text-rose-600"
                  >
                    Delete
                  </button>
                </div>
              </form>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="mt-8 space-y-4 text-center text-muted">
              <p>No testimonials yet. Add your first one above!</p>
            </div>
          </Reveal>
        )}
      </section>
    </div>
  );
}
