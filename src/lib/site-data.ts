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
  Monitor,
} from "lucide-react";
import type { Blog, Project, SiteSettings, Testimonial } from "@/lib/types";

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

export const sampleTestimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    client_name: "Sarah Johnson",
    client_role: "CTO",
    company: "TechStart Inc.",
    content: "Amit delivered an exceptional portfolio that exceeded our expectations. His attention to detail and modern design approach made our product stand out.",
    rating: 5,
    avatar_url: null,
    featured: true,
    sort_order: 1,
  },
  {
    id: "testimonial-2",
    client_name: "Michael Chen",
    client_role: "Founder",
    company: "LaunchPad",
    content: "Working with Amit was a pleasure. He understood our requirements perfectly and delivered a scalable dashboard on time.",
    rating: 5,
    avatar_url: null,
    featured: true,
    sort_order: 2,
  },
  {
    id: "testimonial-3",
    client_name: "Emily Rodriguez",
    client_role: "Product Manager",
    company: "Digital Agency",
    content: "The admin panel Amit built for us simplified our workflow significantly. Clean code, responsive design, and great communication throughout.",
    rating: 5,
    avatar_url: null,
    featured: true,
    sort_order: 3,
  },
];

export const sampleBlogs: Blog[] = [
  {
    id: "blog-1",
    title: "Building Modern Web Applications with Next.js 14",
    slug: "building-modern-web-applications-nextjs-14",
    excerpt: "Explore the latest features in Next.js 14 including Server Actions, improved routing, and enhanced performance optimizations.",
    content: "Next.js 14 brings significant improvements to the developer experience and application performance. In this comprehensive guide, we explore Server Actions, which allow you to write asynchronous server code directly in your React components. This eliminates the need for API routes in many scenarios, making your code cleaner and more maintainable.",
    cover_image: null,
    tags: ["Next.js", "React", "Web Development"],
    published: true,
    featured: true,
    reading_time: 5,
    sort_order: 1,
  },
  {
    id: "blog-2",
    title: "Creating Beautiful UIs with Tailwind CSS",
    slug: "creating-beautiful-uis-tailwind-css",
    excerpt: "Learn how to build stunning user interfaces efficiently using Tailwind CSS utility classes and modern design patterns.",
    content: "Tailwind CSS has revolutionized the way we style web applications. Unlike traditional CSS approaches, Tailwind provides low-level utility classes that let you build custom designs without leaving your HTML. This approach offers incredible flexibility and ensures consistency across your entire application.",
    cover_image: null,
    tags: ["CSS", "Tailwind", "UI Design"],
    published: true,
    featured: false,
    reading_time: 4,
    sort_order: 2,
  },
  {
    id: "blog-3",
    title: "Full Stack Development with Supabase",
    slug: "full-stack-development-supabase",
    excerpt: "A practical guide to building complete full-stack applications using Supabase as your backend-as-a-service platform.",
    content: "Supabase is an open-source Firebase alternative that provides a complete backend solution including authentication, database, storage, and real-time subscriptions. In this article, we dive deep into setting up your Supabase project and integrating it with a Next.js frontend for a seamless full-stack development experience.",
    cover_image: null,
    tags: ["Supabase", "Backend", "Full Stack"],
    published: true,
    featured: false,
    reading_time: 6,
    sort_order: 3,
  },
];

export const services = [
  {
    title: "Portfolio Website",
    description: "Professional portfolio with modern design, animations, and contact functionality.",
    price: "₹15,000 - ₹25,000",
    features: ["Custom Design", "Responsive Layout", "Contact Form", "SEO Optimization", "Fast Loading"],
    icon: Monitor,
    popular: true,
  },
  {
    title: "Full Stack Web Application",
    description: "Complete web application with frontend, backend, database, and admin dashboard.",
    price: "₹50,000 - ₹1,50,000",
    features: ["Custom Frontend", "REST/GraphQL API", "Database Design", "Admin Dashboard", "User Authentication", "Cloud Deployment"],
    icon: Code2,
    popular: true,
  },
  {
    title: "SaaS Dashboard",
    description: "Data-rich dashboard with analytics, charts, and user management.",
    price: "₹40,000 - ₹80,000",
    features: ["Data Visualization", "User Roles", "Real-time Updates", "Export Functionality", "API Integration"],
    icon: LayoutDashboard,
    popular: false,
  },
  {
    title: "Landing Page",
    description: "High-converting landing page for your product or service.",
    price: "₹8,000 - ₹15,000",
    features: ["Lead Capture Form", "A/B Testing Ready", "Mobile Responsive", "Fast Performance", "Analytics Setup"],
    icon: Globe,
    popular: false,
  },
];

export const sampleProjects: Project[] = [
  {
    id: "project-1",
    title: "Bihar Tourism",
    slug: "bihar-tourism",
    summary: "Full stack tourism platform with admin dashboard, CMS, contact system, and advanced authentication",
    description:
      "Full stack tourism platform with admin dashboard, CMS, contact system, and advanced authentication. Multi-user authentication system, real-time database management, responsive and modern design, admin dashboard with CMS, contact form integration.",
    stack: ["Node.js", "MongoDB", "Tailwind CSS", "Express", "EJS"],
    live_url: "https://www.explorebihar.online/",
    repo_url: null,
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 1,
  },
  {
    id: "project-2",
    title: "WHOIS Lookup Website",
    slug: "whois-lookup",
    summary: "Web-based WHOIS lookup tool for domain registration details",
    description:
      "Web-based WHOIS lookup tool that fetches domain registration details such as registrar, status, creation date, and expiration date. Fast and accurate lookups, clean and intuitive UI, real-time API integration, registrar information display.",
    stack: ["JavaScript", "Node.js", "APIs", "HTML", "CSS"],
    live_url: "https://whoislookup.onrender.com",
    repo_url: null,
    cover_image: null,
    featured: false,
    status: "Shipped",
    sort_order: 2,
  },
  {
    id: "project-3",
    title: "Recipe App",
    slug: "recipe-app",
    summary: "Responsive recipe search application with external API integration",
    description:
      "Responsive recipe search application that fetches and displays recipes dynamically from an external API. Real-time recipe search, responsive design across devices, efficient dynamic content rendering, clean user-friendly interface, dynamic recipe data fetching.",
    stack: ["HTML5", "CSS3", "JavaScript (ES6)", "External Recipe API"],
    live_url: "https://recipeappamiit.netlify.app/",
    repo_url: null,
    cover_image: null,
    featured: false,
    status: "Shipped",
    sort_order: 3,
  },
  {
    id: "project-4",
    title: "RAJ EVENTS",
    slug: "raj-events",
    summary: "Full stack event management and booking system with admin panel",
    description:
      "Full stack event management and booking system with a comprehensive admin panel for events, services, bookings, galleries, blogs, packages, and testimonials. Secure JWT authentication with role-based access, online event booking with real-time validation, comprehensive admin dashboard with statistics, multi-image upload with Cloudinary integration.",
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "EJS", "Tailwind CSS", "JWT", "Cloudinary", "Nodemailer"],
    live_url: "https://raj-events.onrender.com/",
    repo_url: null,
    cover_image: null,
    featured: false,
    status: "Shipped",
    sort_order: 4,
  },
  {
    id: "project-5",
    title: "Polymers & Granules Hub",
    slug: "polymers-granules-hub",
    summary: "B2B polymer sourcing platform for recycled and virgin plastic raw materials",
    description:
      "B2B polymer sourcing platform for recycled and virgin plastic raw materials with bulk ordering and quote-driven procurement. Category-based product discovery for PET, HDPE, PVC, LDPE, PP, and PS, bulk order flow with quote and cart workflow, featured products with per-kg pricing and MOQ, B2B trust sections, delivery coverage, and industry use cases.",
    stack: ["Node.js", "Express", "MongoDB", "EJS", "Tailwind CSS"],
    live_url: "https://www.granuleshub.com/",
    repo_url: null,
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 5,
  },
  {
    id: "project-6",
    title: "Avnautics Aviation Institute",
    slug: "avnautics-aviation",
    summary: "Aviation training and placement-focused platform",
    description:
      "Aviation training and placement-focused platform with career programs, counselling funnel, enquiry capture, and aviation branding for admissions. Aviation program showcase for pilot, ground staff, and hospitality tracks, quick enquiry and counselling registration flow, placement mentorship and testimonial sections.",
    stack: ["Node.js", "Express", "EJS", "Tailwind CSS", "JavaScript"],
    live_url: "https://aero-tft2.onrender.com/",
    repo_url: null,
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 6,
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
  { href: "/admin/blogs", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/activity", label: "Activity" },
];
