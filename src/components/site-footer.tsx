import { getSiteSettings } from "@/lib/queries";
import { SiteFooterContent } from "./site-footer-content";

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const currentYear = new Date().getFullYear();

  return (
    <SiteFooterContent 
      contactEmail={settings.contact_email}
      location={settings.location}
      currentYear={currentYear}
    />
  );
}