export const siteName = "Amit Kumar";
export const siteDescription =
  "Full-stack developer crafting premium digital experiences with Next.js, React, TypeScript, and modern web technologies.";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;

  if (configuredUrl) {
    return new URL(configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`);
  }

  return new URL("http://localhost:3000");
}