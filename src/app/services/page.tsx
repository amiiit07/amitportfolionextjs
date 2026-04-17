import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { services } from "@/lib/site-data";
import { siteDescription, siteName } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional web development services including portfolio websites, full-stack applications, and SaaS dashboards.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Services | ${siteName}`,
    description: siteDescription,
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell py-14">
        <Reveal>
          <SectionHeading
            label="Services"
            title="Professional web development services tailored to your needs."
            description="From stunning portfolios to powerful web applications, I deliver solutions that drive results."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <div
                className={`surface relative h-full overflow-hidden rounded-[2rem] p-8 ${
                  service.popular ? "border-accent/40" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-black">
                    Most Popular
                  </div>
                )}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                    <service.icon size={28} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="text-lg font-bold text-accent">{service.price}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted">{service.description}</p>
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/80">
                      <Check size={18} className="text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="primary-cta mt-8 flex w-fit items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
                >
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 rounded-[2rem] border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent p-8 text-center">
            <h3 className="text-2xl font-semibold text-white">Need a Custom Solution?</h3>
            <p className="mt-3 max-w-xl mx-auto text-muted">
              Have a unique project in mind? Let&apos;s discuss your requirements and create a
              tailored solution for your business.
            </p>
            <Link
              href="/contact"
              className="neon-button-secondary mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Contact Me <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
