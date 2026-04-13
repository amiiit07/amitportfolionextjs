import type { Metadata } from "next";
import { submitContactAction } from "@/app/actions/contact";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteDescription, siteName } from "@/lib/site";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about your portfolio, dashboard, or full-stack web app and I’ll respond with a practical build approach.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${siteName}`,
    description: siteDescription,
    url: "/contact",
  },
};

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [settings, params] = await Promise.all([getSiteSettings(), searchParams]);
  const success = getParam(params.success);
  const error = getParam(params.error);

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-6">
            <SectionHeading
              label="Contact"
              title="Send your project brief through a neon-lit interface that feels as premium as the site itself."
              description="Share the type of build, your timeline, and the visual direction you want. I can adapt this exact cyberpunk polish to your brand."
            />

            <div className="surface rounded-[2rem] p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-accent">Direct Channel</p>
              <div className="mt-5 space-y-3 text-sm leading-7 text-muted">
                <p>{settings.contact_email}</p>
                <p>{settings.contact_phone}</p>
                <p>{settings.location}</p>
              </div>
            </div>

            {success ? (
              <div className="rounded-[1.5rem] border border-emerald-400/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
                Your message was submitted successfully.
              </div>
            ) : null}

            {error ? (
              <div className="rounded-[1.5rem] border border-amber-400/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
                {error === "config"
                  ? "Supabase is not configured yet, so submissions cannot be stored."
                  : "There was a problem sending your message. Please review the form and try again."}
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm action={submitContactAction} returnTo="/contact" />
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
