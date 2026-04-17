import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  Hotel,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
  BadgeCheck,
  Factory,
  Rocket,
  Target,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { services } from "@/lib/site-data";
import { siteDescription, siteName } from "@/lib/site";
import Link from "next/link";

const industries = [
  {
    title: "Retail & E-commerce",
    description: "Online stores, product catalogs, shopping platforms",
    icon: ShoppingCart,
  },
  {
    title: "Healthcare",
    description: "Hospitals, clinics, medical practitioners, pharmacies",
    icon: Stethoscope,
  },
  {
    title: "Education",
    description: "Schools, colleges, coaching institutes, e-learning",
    icon: Code2,
  },
  {
    title: "Hospitality",
    description: "Hotels, restaurants, travel agencies, resorts",
    icon: Hotel,
  },
  {
    title: "Real Estate",
    description: "Property listings, builders, brokers, consultants",
    icon: BadgeCheck,
  },
  {
    title: "Professional Services",
    description: "Law firms, consultancies, accounting, agencies",
    icon: Clock3,
  },
  {
    title: "Manufacturing",
    description: "Industrial companies, B2B suppliers, distributors",
    icon: Factory,
  },
  {
    title: "NGOs & Non-Profits",
    description: "Charitable organizations, foundations, social causes",
    icon: CheckCircle2,
  },
];

const whyChooseUs = [
  {
    title: "Results-Driven",
    description: "Every design decision is mapped to your business goal, lead quality, and conversion intent.",
    icon: Target,
    accent: "text-[#60a5fa]",
    glow: "hover:shadow-[0_0_26px_rgba(59,130,246,0.22)]",
  },
  {
    title: "Fast & Optimized",
    description: "Performance-focused builds with clean code, fast load speed, and search-friendly structure.",
    icon: Rocket,
    accent: "text-[#8b5cf6]",
    glow: "hover:shadow-[0_0_26px_rgba(139,92,246,0.2)]",
  },
  {
    title: "Secure & Reliable",
    description: "Production-ready architecture with stable deployment workflow and scalable backend patterns.",
    icon: ShieldCheck,
    accent: "text-[#93c5fd]",
    glow: "hover:shadow-[0_0_26px_rgba(96,165,250,0.18)]",
  },
];

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
          <section className="mb-14">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-4xl font-semibold text-white md:text-5xl">
                Industries We Serve in Patna
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted md:text-lg">
                Expert web design and development solutions tailored for diverse business sectors across Patna and Bihar.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {industries.map((industry, index) => {
                const Icon = industry.icon;

                return (
                  <Reveal key={industry.title} delay={index * 0.04}>
                    <article className="group relative h-full rounded-[1.35rem] border border-white/10 bg-[#0b0f1a]/92 p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f59e0b]/35 hover:shadow-[0_0_28px_rgba(245,158,11,0.14)]">
                      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#f59e0b]/35 bg-[#f59e0b]/8 text-[#fbbf24] transition-transform duration-300 group-hover:scale-105">
                        <Icon size={28} />
                      </span>
                      <h3 className="mt-5 text-2xl font-semibold text-white">{industry.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/66">{industry.description}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.06}>
          <section className="mb-14 rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0a1326]/92 to-[#11192f]/88 p-6 md:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-4xl font-semibold text-white md:text-5xl">
                Why Clients Choose Us
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted md:text-lg">
                We do not just deliver websites. We deliver performance-focused digital products that support real business growth.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title} delay={index * 0.06}>
                    <article className={`group h-full rounded-[1.5rem] border border-white/10 bg-[#0b1427]/82 p-6 transition-all duration-300 hover:-translate-y-0.5 ${item.glow}`}>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/6 ${item.accent}`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="mt-5 text-3xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/68">{item.description}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center md:px-6">
              <p className="text-sm leading-7 text-white/72 md:text-base">
                Based in <span className="font-semibold text-white">Patna, Bihar</span>, I help local businesses,
                startups, and service brands build modern websites that perform fast, rank better, and convert visitors
                into qualified leads.
              </p>
            </div>
          </section>
        </Reveal>

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
