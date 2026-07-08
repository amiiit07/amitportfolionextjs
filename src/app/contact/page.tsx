import type { Metadata } from "next";
import { Mail, MapPin, Sparkles } from "lucide-react";
import { submitContactAction } from "@/app/actions/contact";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteDescription, siteName } from "@/lib/site";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about your portfolio, dashboard, or full-stack web app.",
  alternates: { canonical: "/contact" },
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
      <main className="pt-28 pb-16">
        <div className="page-container">
          <div className="grid lg:grid-cols-5 gap-8">
            <Reveal className="lg:col-span-2 space-y-4">
              <div>
                <span className="eyebrow">Contact</span>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4 leading-tight">
                  Let&apos;s build something <span className="gradient-text">amazing</span>
                </h1>
                <p className="mt-3 text-sm text-[#B4B4B4] leading-relaxed">
                  Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s discuss how we can work together.
                </p>
              </div>

              <div className="glass rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
                    <Mail size={16} className="text-[#4F8CFF]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#B4B4B4]">Email</p>
                    <a href={`mailto:${settings.contact_email}`} className="text-sm text-white hover:text-[#4F8CFF] transition-colors">
                      {settings.contact_email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7B61FF]/10 flex items-center justify-center">
                    <MapPin size={16} className="text-[#7B61FF]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#B4B4B4]">Location</p>
                    <p className="text-sm text-white">{settings.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
                    <Sparkles size={16} className="text-[#4F8CFF]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#B4B4B4]">Response</p>
                    <p className="text-sm text-white">Within 24 hours</p>
                  </div>
                </div>
              </div>

              {success && (
                <div className="glass rounded-2xl p-5 border border-emerald-500/30">
                  <p className="text-emerald-400 font-medium">Message sent successfully!</p>
                  <p className="text-sm text-emerald-400/70 mt-1">I&apos;ll get back to you within 24 hours.</p>
                </div>
              )}

              {error && (
                <div className="glass rounded-2xl p-5 border border-amber-500/30">
                  <p className="text-amber-400 font-medium">Something went wrong</p>
                  <p className="text-sm text-amber-400/70 mt-1">
                    {error === "config" ? "Please email me directly instead." : "Please try again or email me directly."}
                  </p>
                </div>
              )}
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-3">
              <ContactForm action={submitContactAction} returnTo="/contact" />
            </Reveal>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
