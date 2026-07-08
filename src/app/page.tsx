import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { ServicesSection } from "@/components/services-section";
import { CertificationsSection } from "@/components/certifications-section";
import { SiteFooter } from "@/components/site-footer";
import { siteDescription, siteName } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amit Kumar — Full Stack Developer",
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <FeaturedProjects />
        <ServicesSection />
        <CertificationsSection />
      </main>
      <SiteFooter />
    </>
  );
}
