import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Database,
  Globe,
  Layers3,
  LayoutDashboard,
  MonitorSmartphone,
  ServerCog,
  Sparkles,
} from "lucide-react";
import type { Project, SiteSettings } from "@/lib/types";

export const skills = [
  "Full Stack Web Development",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
];

export const skillMetrics = [
  {
    name: "HTML / CSS",
    level: 95,
    icon: "</>",
    description: "Responsive layouts, clean styling, modern sections, and polished user interfaces.",
  },
  {
    name: "JavaScript",
    level: 93,
    icon: "{ }",
    description: "Core language for interactive frontend behavior and scalable full-stack development.",
  },
  {
    name: "React / Next.js",
    level: 92,
    icon: "[]",
    description: "Component-driven UI, App Router architecture, responsive rendering, and modern product builds.",
  },
  {
    name: "Node.js / Express / MongoDB",
    level: 89,
    icon: "++",
    description: "Backend APIs, database integration, authentication flows, and complete full-stack applications.",
  },
];

export const experienceTimeline = [
  {
    year: "3+ Years",
    title: "Building modern web products",
    description:
      "Shipping polished frontend experiences and scalable full-stack applications for brands, creators, and startups.",
  },
  {
    year: "Next.js Focus",
    title: "App Router and product interfaces",
    description:
      "Working with SSR, responsive systems, reusable components, and recruiter-friendly portfolio experiences.",
  },
  {
    year: "Backend Ready",
    title: "Databases, auth, and dashboards",
    description:
      "Pairing modern UI with admin tools, lead workflows, and structured backend systems that stay maintainable.",
  },
];

export const aboutHighlights = [
  "I build full stack web applications with a strong focus on clean UI, smooth user experience, and scalable backend structure.",
  "My core skills include HTML, CSS, JavaScript, React, Next.js, Node.js, Express.js, and MongoDB for complete end-to-end development.",
];

export const techStackItems: Array<{
  name: string;
  category: string;
  icon: LucideIcon;
  glow: string;
}> = [
  { name: "React", category: "Frontend", icon: Sparkles, glow: "hover:shadow-[0_0_30px_rgba(59,224,255,0.16)]" },
  { name: "Next.js", category: "Framework", icon: Layers3, glow: "hover:shadow-[0_0_30px_rgba(100,140,255,0.2)]" },
  { name: "HTML", category: "Markup", icon: Code2, glow: "hover:shadow-[0_0_30px_rgba(59,224,255,0.16)]" },
  { name: "CSS", category: "Styling", icon: Sparkles, glow: "hover:shadow-[0_0_30px_rgba(59,224,255,0.16)]" },
  { name: "JavaScript", category: "Language", icon: Globe, glow: "hover:shadow-[0_0_30px_rgba(100,140,255,0.18)]" },
  { name: "Node.js", category: "Backend", icon: ServerCog, glow: "hover:shadow-[0_0_30px_rgba(86,255,172,0.16)]" },
  { name: "Express.js", category: "Backend", icon: LayoutDashboard, glow: "hover:shadow-[0_0_30px_rgba(53,163,255,0.18)]" },
  { name: "Supabase", category: "Backend", icon: Database, glow: "hover:shadow-[0_0_30px_rgba(59,224,255,0.16)]" },
  { name: "MongoDB", category: "Database", icon: Globe, glow: "hover:shadow-[0_0_30px_rgba(85,255,153,0.16)]" },
  { name: "Tailwind CSS", category: "Styling", icon: Code2, glow: "hover:shadow-[0_0_30px_rgba(59,224,255,0.16)]" },
  { name: "Framer Motion", category: "Motion", icon: MonitorSmartphone, glow: "hover:shadow-[0_0_30px_rgba(255,60,172,0.16)]" },
  { name: "Dashboards", category: "Systems", icon: LayoutDashboard, glow: "hover:shadow-[0_0_30px_rgba(181,23,255,0.18)]" },
];

export const portfolioStats = [
  { label: "Projects Completed", value: "20+" },
  { label: "Technologies", value: "15+" },
  { label: "Experience", value: "3+ Years" },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/amit" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amit" },
];

export const sampleProjects: Project[] = [
  {
    id: "project-1",
    title: "Developer Portfolio Platform",
    slug: "developer-portfolio-platform",
    summary: "A premium portfolio UI with animations, contact capture, and responsive performance.",
    description:
      "Built as a modern recruiter-facing experience with glassmorphism cards, motion-rich sections, and clean content flow.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    live_url: "https://example.com",
    repo_url: "https://github.com/example/developer-portfolio",
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 1,
  },
  {
    id: "project-2",
    title: "SaaS Admin Dashboard",
    slug: "saas-admin-dashboard",
    summary: "A scalable internal dashboard with role-aware views and realtime backend workflows.",
    description:
      "Focused on clarity, performance, and maintainable architecture using reusable components and structured data flows.",
    stack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    live_url: "https://example.com",
    repo_url: "https://github.com/example/saas-dashboard",
    cover_image: null,
    featured: true,
    status: "In Progress",
    sort_order: 2,
  },
  {
    id: "project-3",
    title: "Realtime Collaboration App",
    slug: "realtime-collaboration-app",
    summary: "A full-stack productivity tool built for fast collaboration and smooth UI feedback.",
    description:
      "Designed around clean state handling, modern interaction patterns, and responsive layouts for both desktop and mobile.",
    stack: ["Node.js", "MongoDB", "React", "Socket.io"],
    live_url: "https://example.com",
    repo_url: "https://github.com/example/realtime-app",
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 3,
  },
  {
    id: "project-4",
    title: "Startup Landing System",
    slug: "startup-landing-system",
    summary: "A conversion-focused landing experience with CMS-ready sections and strong visual hierarchy.",
    description:
      "Created to help early-stage teams launch quickly while maintaining a polished brand presence and performance-focused frontend.",
    stack: ["Next.js", "Supabase", "Tailwind CSS"],
    live_url: "https://example.com",
    repo_url: "https://github.com/example/startup-landing",
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 4,
  },
];

export const fallbackSettings: SiteSettings = {
  id: "default-settings",
  hero_badge: "Full-Stack Developer",
  hero_title: "Full-Stack Developer | Building Scalable Web Applications",
  hero_description:
    "Next.js, Node.js, Supabase, and MongoDB for modern products that look polished and scale cleanly.",
  availability_text: "Available for freelance, contract, and product-focused development work.",
  contact_email: "hello@amit.dev",
  contact_phone: "+91 98765 43210",
  location: "India · Remote",
};

export const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/contacts", label: "Contacts" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/activity", label: "Activity" },
];
