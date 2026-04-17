import type { Metadata } from "next";
import { CyberBackground } from "@/components/cyber-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThreeBackground } from "@/components/three-background";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    title: siteName,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  alternates: {
    canonical: "/",
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Amit Kumar",
  "url": getSiteUrl(),
  "jobTitle": "Full Stack Developer",
  "description": siteDescription,
  "knowsAbout": ["Next.js", "React", "Node.js", "TypeScript", "MongoDB", "Supabase"],
  "sameAs": [
    "https://github.com/amit",
    "https://www.linkedin.com/in/amit"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CyberBackground />
        <ThreeBackground />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
