import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { experienceTimeline, skills } from "@/lib/site-data";
import { getSiteSettings } from "@/lib/queries";

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-14">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.92fr]">
          <Reveal>
            <div className="surface rounded-[2rem] p-6 md:p-10">
              <SectionHeading
                label="About"
                title="I design portfolio websites like product interfaces, not static brochure pages."
                description="The goal is a memorable first impression for recruiters and a backend structure that still feels practical after launch."
              />
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/82">
                I like layouts with atmosphere, clean technical execution, and enough structure to
                grow into admin tools, project systems, and real lead management. That is why this
                build pairs a cinematic frontend with Supabase-driven workflows.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface rounded-[2rem] p-6 md:p-10">
              <p className="eyebrow">Profile Snapshot</p>
              <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
                <p>
                  <span className="font-semibold text-white">Role:</span> {settings.hero_badge}
                </p>
                <p>
                  <span className="font-semibold text-white">Base:</span> {settings.location}
                </p>
                <p>
                  <span className="font-semibold text-white">Availability:</span>{" "}
                  {settings.availability_text}
                </p>
                <p>
                  <span className="font-semibold text-white">Primary Stack:</span> Next.js,
                  Supabase, Tailwind CSS, Framer Motion, Vercel
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="surface rounded-[2rem] p-6 md:p-8">
              <p className="eyebrow">Timeline</p>
              <div className="mt-6 space-y-5">
                {experienceTimeline.map((item) => (
                  <article key={item.year} className="rounded-[1.5rem] border border-white/8 bg-black/18 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-accent">{item.year}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface rounded-[2rem] p-6 md:p-8">
              <p className="eyebrow">Capabilities</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/85"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-muted">
                I focus on the intersection of visual impact and backend usefulness: premium hero
                sections, motion-driven cards, clean code organization, and admin workflows that do
                not feel bolted on.
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

