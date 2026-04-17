import type { Metadata } from "next";
import { Graduate, Inter, Space_Grotesk } from "next/font/google";
import { CyberBackground } from "@/components/cyber-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThreeBackground } from "@/components/three-background";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const graduate = Graduate({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brand",
  display: "swap",
});

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
  "@graph": [
    {
      "@type": "WebSite",
      "@id": new URL("/#website", getSiteUrl()).toString(),
      "url": getSiteUrl().toString(),
      "name": siteName,
      "description": siteDescription,
      "inLanguage": "en-US",
    },
    {
      "@type": "Person",
      "@id": new URL("/#person", getSiteUrl()).toString(),
      "name": "Amit Kumar",
      "url": getSiteUrl().toString(),
      "jobTitle": "Frontend Engineer",
      "description": siteDescription,
      "knowsAbout": ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase"],
      "sameAs": [
        "https://github.com/amiiit07",
        "https://www.linkedin.com/in/amiiit07/",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${graduate.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
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
