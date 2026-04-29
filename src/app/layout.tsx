import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Graduate, Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import { CyberBackground, ThreeBackground } from "@/components/client-only";
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
    default: "Full Stack Developer",
    template: "%s | Full Stack Developer",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    title: "Full Stack Developer",
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Stack Developer",
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
      "jobTitle": "Full Stack Developer",
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
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <CyberBackground />
          <ThreeBackground />
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
