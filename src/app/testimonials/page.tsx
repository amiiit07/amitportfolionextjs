import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialCard } from "@/components/testimonial-card";
import { getTestimonials } from "@/lib/queries";
import { siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What clients say about working with me on web development projects.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: `Testimonials | ${siteName}`,
    description: siteDescription,
    url: "/testimonials",
  },
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-14">
        <Reveal>
          <SectionHeading
            label="Testimonials"
            title="What clients say about my work."
            description="Trusted by businesses and startups for delivering quality web solutions on time."
          />
        </Reveal>

        {testimonials.length > 0 ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 0.06}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[2rem] border border-dashed border-white/10 p-12 text-center">
            <p className="text-muted">No testimonials yet.</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
