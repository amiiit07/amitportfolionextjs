import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Amit Kumar — Full Stack Developer",
    template: "%s | Amit Kumar",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    title: "Amit Kumar — Full Stack Developer",
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Kumar — Full Stack Developer",
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
      url: getSiteUrl().toString(),
      name: siteName,
      description: siteDescription,
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": new URL("/#person", getSiteUrl()).toString(),
      name: "Amit Kumar",
      url: getSiteUrl().toString(),
      jobTitle: "Full Stack Developer",
      description: siteDescription,
      knowsAbout: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "MongoDB"],
      sameAs: [
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
      className={`${inter.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-screen">
        <div className="noise-overlay" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
