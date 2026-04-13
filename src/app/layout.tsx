import type { Metadata } from "next";
import { CyberBackground } from "@/components/cyber-background";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amit | Futuristic Developer Portfolio",
  description: "Cyberpunk-inspired full-stack developer portfolio built with Next.js, Tailwind CSS, Framer Motion, Supabase, and Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <CyberBackground />
        {children}
      </body>
    </html>
  );
}
