import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteDescription, siteName } from "@/lib/site";
import { getSiteSettings } from "@/lib/queries";
import { Award, Code2, GraduationCap, MapPin, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Amit Kumar, a full-stack developer focused on polished portfolio sites and scalable web applications.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${siteName}`,
    description: siteDescription,
    url: "/about",
  },
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteHeader />
      <main className="pt-28 pb-16">
        <div className="page-container">
          <SectionHeading
            label="About"
            title="Crafting digital experiences with precision and purpose."
            description="A passionate full-stack developer focused on building premium, performant web applications."
          />

          <div className="grid lg:grid-cols-5 gap-6 mt-10">
            <div className="lg:col-span-3 space-y-6">
              <Reveal>
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">The Philosophy</h3>
                  <p className="text-[#B4B4B4] leading-relaxed">
                    I design portfolio websites like product interfaces, not static brochure pages.
                    The goal is a memorable first impression for recruiters and a backend structure
                    that still feels practical after launch.
                  </p>
                  <p className="text-[#B4B4B4] leading-relaxed mt-4">
                    I like layouts with atmosphere, clean technical execution, and enough structure to
                    grow into admin tools, project systems, and real lead management.
                  </p>
                </div>
              </Reveal>

              <div className="grid sm:grid-cols-2 gap-4">
                <Reveal delay={0.1}>
                  <div className="glass rounded-2xl p-6">
                    <Code2 className="w-5 h-5 text-[#4F8CFF] mb-3" />
                    <h4 className="text-white font-medium mb-2">Frontend Focus</h4>
                    <p className="text-sm text-[#B4B4B4] leading-relaxed">
                      Premium hero sections, motion-driven cards, clean code organization, and polished interfaces.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="glass rounded-2xl p-6">
                    <GraduationCap className="w-5 h-5 text-[#7B61FF] mb-3" />
                    <h4 className="text-white font-medium mb-2">Backend Ready</h4>
                    <p className="text-sm text-[#B4B4B4] leading-relaxed">
                      Admin workflows that don&apos;t feel bolted on. Scalable APIs and database architecture.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <Reveal delay={0.1}>
                <div className="glass rounded-2xl p-6">
                  <p className="eyebrow mb-4">Profile</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-[#4F8CFF]" />
                      <span className="text-[#B4B4B4]">Role:</span>
                      <span className="text-white">{settings.hero_badge}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#4F8CFF]" />
                      <span className="text-[#B4B4B4]">Base:</span>
                      <span className="text-white">{settings.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={14} className="text-[#4F8CFF]" />
                      <span className="text-[#B4B4B4]">Stack:</span>
                      <span className="text-white">Next.js, React, TypeScript, Node.js</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="glass rounded-2xl p-6">
                  <p className="eyebrow mb-4">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Framer Motion", "Supabase", "Express"].map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/60">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
