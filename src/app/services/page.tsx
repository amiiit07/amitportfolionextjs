import type { Metadata } from "next";
import { ArrowRight, Check, Target, Rocket, Shield, ShoppingCart, Stethoscope, GraduationCap, Hotel, Building, Factory, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { services } from "@/lib/site-data";
import { siteDescription, siteName } from "@/lib/site";

const industries = [
  { title: "Retail & E-commerce", description: "Online stores, product catalogs, shopping platforms", icon: ShoppingCart },
  { title: "Healthcare", description: "Hospitals, clinics, medical practitioners", icon: Stethoscope },
  { title: "Education", description: "Schools, colleges, coaching institutes", icon: GraduationCap },
  { title: "Hospitality", description: "Hotels, restaurants, travel agencies", icon: Hotel },
  { title: "Real Estate", description: "Property listings, builders, consultants", icon: Building },
  { title: "Professional Services", description: "Law firms, consultancies, agencies", icon: Target },
  { title: "Manufacturing", description: "Industrial companies, B2B suppliers", icon: Factory },
  { title: "NGOs & Non-Profits", description: "Charitable organizations, social causes", icon: Heart },
];

const whyChooseUs = [
  { title: "Results-Driven", description: "Every design decision maps to your business goals.", icon: Target },
  { title: "Fast & Optimized", description: "Performance-focused builds with clean code.", icon: Rocket },
  { title: "Secure & Reliable", description: "Production-ready architecture with stable deployment.", icon: Shield },
];

export const metadata: Metadata = {
  title: "Services",
  description: "Professional web development services including portfolio websites, full-stack applications, and SaaS dashboards.",
  alternates: { canonical: "/services" },
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
      <main className="pt-28 pb-16">
        <div className="page-container space-y-16">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <span className="eyebrow">Industries</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">Industries I Serve</h2>
              <p className="text-[#B4B4B4] mt-3">Expert web development solutions tailored for diverse sectors.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {industries.map((industry, i) => {
                const Icon = industry.icon;
                return (
                  <Reveal key={industry.title} delay={i * 0.04}>
                    <div className="glass rounded-2xl p-6 text-center group hover:bg-white/[0.06] transition-all">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center text-[#4F8CFF]">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-white font-semibold mt-4">{industry.title}</h3>
                      <p className="text-sm text-[#B4B4B4] mt-2">{industry.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="glass rounded-2xl p-8 sm:p-10 text-center">
              <h2 className="text-3xl font-bold text-white">Why Clients Choose Me</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {whyChooseUs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center text-[#4F8CFF]">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-white font-semibold mt-3">{item.title}</h3>
                      <p className="text-sm text-[#B4B4B4] mt-2">{item.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-[#4F8CFF]/5 border border-[#4F8CFF]/10">
                <p className="text-sm text-[#B4B4B4]">
                  Based in India, I help businesses and startups build modern websites that perform fast, rank better, and convert visitors.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <SectionHeading
              label="Services"
              title="Professional web development services."
              description="From stunning portfolios to powerful web applications."
            />
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.08}>
                <div className={`glass rounded-2xl p-6 sm:p-8 relative ${service.popular ? "border-[#4F8CFF]/30" : ""}`}>
                  {service.popular && (
                    <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#4F8CFF] text-[10px] font-semibold text-white uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={10} />
                      Popular
                    </div>
                  )}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center shrink-0">
                      <service.icon size={24} className="text-[#4F8CFF]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                      <p className="text-lg font-bold text-[#4F8CFF]">{service.price}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#B4B4B4]">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
                        <Check size={14} className="text-[#4F8CFF]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-[#4F8CFF] text-white text-sm font-medium hover:bg-[#4F8CFF]/90 transition-all">
                    Get Started <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white">Need a Custom Solution?</h3>
              <p className="text-[#B4B4B4] mt-3 max-w-xl mx-auto">Let&apos;s discuss your requirements and create a tailored solution for your business.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-[#4F8CFF] text-white font-medium hover:bg-[#4F8CFF]/90 transition-all">
                Contact Me <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
