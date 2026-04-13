export const siteName = "Amit Kumar";
export const siteDescription =
  "Futuristic full-stack developer portfolio built with Next.js, Supabase, Tailwind CSS, and Framer Motion.";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;

  if (configuredUrl) {
    return new URL(configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`);
  }

  return new URL("http://localhost:3000");
}