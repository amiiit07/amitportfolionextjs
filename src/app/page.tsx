import Link from "next/link";
import { submitContactAction } from "@/app/actions/contact";
import { ContactForm } from "@/components/contact-form";
import { HeroVisual } from "@/components/hero-visual";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillsGrid } from "@/components/skills-grid";
import { SocialLinks } from "@/components/social-links";
import { StatsGrid } from "@/components/stats-grid";
import { TechStackGrid } from "@/components/tech-stack-grid";
import { aboutHighlights, experienceTimeline } from "@/lib/site-data";
import { getProjects, getSiteSettings } from "@/lib/queries";

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const [settings, projects, params] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    searchParams,
  ]);
  const success = getParam(params.success);
  const error = getParam(params.error);

  return (
    <>
      <SiteHeader />
      <main className="pb-24">
        <section className="page-shell grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              <p className="hero-kicker">WELCOME TO MY PORTFOLIO</p>
              <h1 className="hero-heading text-balance">
                Hi, I&apos;m <span>Amit Kumar</span>
              </h1>
              <p className="max-w-2xl text-3xl font-medium text-white/88 md:text-4xl">
                Full Stack Developer
              </p>
              <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
                I build professional web applications with Next.js, Node.js, Supabase, and
                MongoDB, combining scalable architecture with clean modern UI.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/projects" className="primary-cta rounded-2xl px-8 py-4 text-lg font-semibold">
                View Projects
              </Link>
              <a href="#contact" className="secondary-cta rounded-2xl px-8 py-4 text-lg font-semibold">
                Contact Me
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <HeroVisual />
          </Reveal>
        </section>

        <section className="page-shell mt-18">
          <Reveal>
            <SectionHeading
              label="About"
              title="I build modern full stack web applications with a focus on clean UI and scalable architecture."
              description="My goal is to create websites and web apps that not only look professional but also perform smoothly, scale well, and give users a polished experience."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
            <Reveal>
              <div className="surface rounded-[2rem] p-6 md:p-8">
                <div className="space-y-5">
                  {aboutHighlights.map((item) => (
                    <p key={item} className="text-base leading-8 text-white/82">
                      {item}
                    </p>
                  ))}
                </div>
                <div className="dash my-6" />
                <div className="space-y-4">
                  {experienceTimeline.map((item) => (
                    <article
                      key={item.year}
                      className="rounded-[1.4rem] border border-white/8 bg-black/18 p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-accent">{item.year}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-6">
                <div className="surface rounded-[2rem] p-6 md:p-8">
                  <p className="eyebrow">My Expertise</p>
                  <h3 className="mt-5 text-2xl font-semibold text-white md:text-3xl">
                    Full Stack Web Development with modern frontend and backend technologies.
                  </h3>
                  <p className="mt-4 text-base leading-8 text-muted">
                    I work across the full development cycle, from building responsive interfaces
                    with HTML, CSS, JavaScript, React, and Next.js to creating backend systems
                    with Node.js, Express.js, and MongoDB.
                  </p>
                </div>

                <SkillsGrid />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="page-shell mt-18">
          <Reveal>
            <SectionHeading
              label="Tech Stack"
              title="Technologies I use to design, develop, and deploy professional web applications."
              description="My stack covers frontend development, backend integration, database workflows, and modern frameworks for complete full stack projects."
            />
          </Reveal>

          <div className="mt-10">
            <TechStackGrid />
          </div>
        </section>

        <section className="page-shell mt-18">
          <Reveal>
            <SectionHeading
              label="Projects"
              title="Professional projects presented with strong structure and clean visual hierarchy."
              description="Each project card is designed to showcase the product clearly while keeping the interface premium and modern."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {projects.slice(0, 4).map((project, index) => (
              <Reveal key={project.id} delay={index * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="page-shell mt-18">
          <Reveal>
            <SectionHeading
              label="Stats"
              title="A quick snapshot of output, experience, and technical range."
              description="Simple supporting numbers that reinforce credibility without overloading the design."
            />
          </Reveal>

          <div className="mt-10">
            <StatsGrid />
          </div>
        </section>

        <section id="contact" className="page-shell mt-18 grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal>
            <div className="surface rounded-[2rem] p-6 md:p-8">
              <SectionHeading
                label="Contact"
                title="Need a clean, professional portfolio or full-stack application?"
                description="Send a message and I will get back with the right approach for your project, whether it is a personal portfolio, dashboard, or product build."
              />

              <div className="mt-8 space-y-4 text-sm leading-7 text-muted">
                <p>
                  <span className="font-semibold text-white">Email:</span> {settings.contact_email}
                </p>
                <p>
                  <span className="font-semibold text-white">Phone:</span> {settings.contact_phone}
                </p>
                <p>
                  <span className="font-semibold text-white">Location:</span> {settings.location}
                </p>
              </div>

              <div className="mt-8">
                <SocialLinks />
              </div>

              {success ? (
                <div className="mt-6 rounded-[1.4rem] border border-emerald-400/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
                  Your message has been sent successfully.
                </div>
              ) : null}

              {error ? (
                <div className="mt-6 rounded-[1.4rem] border border-amber-400/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
                  {error === "config"
                    ? "Supabase configuration is missing, so messages cannot be stored yet."
                    : "Something went wrong while submitting the form. Please try again."}
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm action={submitContactAction} returnTo="/" />
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
