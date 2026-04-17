/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = fs.readFileSync(filePath, "utf8");
  for (const line of data.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const idx = trimmed.indexOf("=");
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnv(path.join(process.cwd(), ".env.local"));
loadEnv(path.join(process.cwd(), ".env"));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("SEED_STATUS: FAIL");
  console.error("Reason: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const siteSettings = {
  id: "site-settings",
  hero_badge: "Frontend Engineer",
  hero_title: "Frontend Engineer from Patna, Bihar | Premium Web Experiences",
  hero_description:
    "React, Next.js, Supabase, and Framer Motion for fast, conversion-focused digital products.",
  availability_text: "Available for freelance projects and product-focused frontend work.",
  contact_email: "akverma7295@gmail.com",
  contact_phone: "+91 98765 43210",
  location: "Patna, Bihar, India",
};

const projects = [
  {
    title: "Bihar Tourism",
    slug: "bihar-tourism",
    summary:
      "Full stack tourism platform with admin dashboard, CMS, contact system, and advanced authentication",
    description:
      "Tourism platform with CMS, role-based admin, contact workflows, and modern responsive UI for regional travel discovery.",
    stack: ["Node.js", "MongoDB", "Tailwind CSS", "Express", "EJS"],
    live_url: "https://www.explorebihar.online/",
    repo_url: null,
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 1,
  },
  {
    title: "WHOIS Lookup Website",
    slug: "whois-lookup",
    summary: "Web-based WHOIS lookup tool for domain registration details",
    description:
      "Domain intelligence tool with real-time lookup API integration and clean frontend for quick registrar insights.",
    stack: ["JavaScript", "Node.js", "APIs", "HTML", "CSS"],
    live_url: "https://whoislookup.onrender.com",
    repo_url: null,
    cover_image: null,
    featured: false,
    status: "Shipped",
    sort_order: 2,
  },
  {
    title: "Recipe App",
    slug: "recipe-app",
    summary: "Responsive recipe search application with external API integration",
    description:
      "Recipe search interface with dynamic API rendering, responsive card layout, and optimized content loading.",
    stack: ["HTML5", "CSS3", "JavaScript (ES6)", "External Recipe API"],
    live_url: "https://recipeappamiit.netlify.app/",
    repo_url: null,
    cover_image: null,
    featured: false,
    status: "Shipped",
    sort_order: 3,
  },
  {
    title: "RAJ EVENTS",
    slug: "raj-events",
    summary: "Full stack event management and booking system with admin panel",
    description:
      "Event booking platform with secure authentication, dashboard controls, multi-entity management, and service workflows.",
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "EJS", "Tailwind CSS"],
    live_url: "https://raj-events.onrender.com/",
    repo_url: null,
    cover_image: null,
    featured: false,
    status: "Shipped",
    sort_order: 4,
  },
  {
    title: "Polymers & Granules Hub",
    slug: "polymers-granules-hub",
    summary: "B2B polymer sourcing platform for recycled and virgin plastic raw materials",
    description:
      "B2B sourcing platform with category discovery, quote workflow, MOQ logic, and procurement-focused product UI.",
    stack: ["Node.js", "Express", "MongoDB", "EJS", "Tailwind CSS"],
    live_url: "https://www.granuleshub.com/",
    repo_url: null,
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 5,
  },
  {
    title: "Avnautics Aviation Institute",
    slug: "avnautics-aviation",
    summary: "Aviation training and placement-focused platform",
    description:
      "Admissions-focused aviation institute website with counseling lead capture and career-track conversion flow.",
    stack: ["Node.js", "Express", "EJS", "Tailwind CSS", "JavaScript"],
    live_url: "https://aero-tft2.onrender.com/",
    repo_url: null,
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 6,
  },
];

const blogs = [
  {
    title: "Hi, I'm Amit Kumar - BCA Student and Aspiring Full Stack Developer from Patna, Bihar",
    slug: "amit-kumar-bca-student-full-stack-developer-patna-bihar",
    excerpt:
      "My journey from curiosity to coding, technical skills across frontend/backend/data, and my vision to build impactful digital products.",
    content:
      "Hi, I am Amit Kumar, a passionate and dedicated BCA student from Patna, Bihar, currently pursuing my degree at CIMAGE Catalyst College, Patna. I have a strong interest in technology, web development, software engineering, and modern digital solutions. My journey in the tech world started with curiosity, and today it has become my career goal.\n\nTechnical Skills\n\nFrontend Development: HTML, CSS, Tailwind CSS, JavaScript\nBackend Development: Node.js, Express.js, PHP\nDatabase: MongoDB, SQL, FoxPro\nProgramming Languages: C, JavaScript, Python (Basic)\nData Analysis Tools: Power BI, Pandas, NumPy, Matplotlib\nNetworking: Computer Networking, CCNA Basics\nOther Skills: Embedded Systems, GitHub, Deployment Platforms\n\nCareer Objective\n\nMy goal is to become a successful Full Stack Developer and build impactful digital products that solve real-world problems. I am continuously learning new technologies like Next.js, Supabase, Flutter, and AI tools to stay ahead in the tech industry.\n\nPersonal Strengths\n\nFast Learner\nProblem Solver\nTeam Player\nCreative Thinker\nHardworking and Consistent\nPassionate About Technology",
    cover_image: null,
    tags: ["About Me", "Full Stack", "Patna", "Bihar", "Career"],
    published: true,
    featured: true,
    reading_time: 5,
    sort_order: 0,
  },
  {
    title: "Building Modern Web Applications with Next.js 14",
    slug: "building-modern-web-applications-nextjs-14",
    excerpt:
      "Explore the latest features in Next.js including routing improvements and performance optimization.",
    content:
      "A practical guide to modern Next.js architecture with scalable routes, reusable components, and SEO-ready metadata patterns.",
    cover_image: null,
    tags: ["Next.js", "React", "Web Development"],
    published: true,
    featured: true,
    reading_time: 5,
    sort_order: 1,
  },
  {
    title: "Creating Beautiful UIs with Tailwind CSS",
    slug: "creating-beautiful-uis-tailwind-css",
    excerpt:
      "Build polished user interfaces using utility-first styling and repeatable design patterns.",
    content:
      "This article covers practical Tailwind strategies for spacing systems, responsive breakpoints, and maintainable component styling.",
    cover_image: null,
    tags: ["CSS", "Tailwind", "UI Design"],
    published: true,
    featured: false,
    reading_time: 4,
    sort_order: 2,
  },
  {
    title: "Full Stack Development with Supabase",
    slug: "full-stack-development-supabase",
    excerpt:
      "A practical way to build production-ready apps with Supabase authentication, database, and edge-ready architecture.",
    content:
      "Learn how to model tables, secure with policies, and connect Next.js App Router pages to Supabase for modern full stack delivery.",
    cover_image: null,
    tags: ["Supabase", "Backend", "Full Stack"],
    published: true,
    featured: false,
    reading_time: 6,
    sort_order: 3,
  },
];

const testimonials = [
  {
    client_name: "Sarah Johnson",
    client_role: "CTO",
    company: "TechStart Inc.",
    content:
      "Amit delivered an exceptional portfolio experience with strong design quality and clean implementation.",
    rating: 5,
    avatar_url: null,
    featured: true,
    sort_order: 1,
  },
  {
    client_name: "Michael Chen",
    client_role: "Founder",
    company: "LaunchPad",
    content:
      "Great collaboration and timely delivery. The dashboard architecture was clean and scalable.",
    rating: 5,
    avatar_url: null,
    featured: true,
    sort_order: 2,
  },
  {
    client_name: "Emily Rodriguez",
    client_role: "Product Manager",
    company: "Digital Agency",
    content:
      "Professional execution from planning to delivery. The final product exceeded expectations.",
    rating: 5,
    avatar_url: null,
    featured: true,
    sort_order: 3,
  },
];

async function checkCount(table) {
  const res = await supabase.from(table).select("id", { count: "exact", head: true });
  return res.error ? { ok: false, message: res.error.message } : { ok: true, count: res.count ?? 0 };
}

async function run() {
  const out = {};

  const settingsRes = await supabase.from("site_settings").upsert(siteSettings, { onConflict: "id" });
  out.site_settings = settingsRes.error ? { ok: false, message: settingsRes.error.message } : { ok: true };

  const projectsRes = await supabase.from("projects").upsert(projects, { onConflict: "slug" });
  out.projects = projectsRes.error
    ? { ok: false, message: projectsRes.error.message }
    : { ok: true, inserted: projects.length };

  const blogsRes = await supabase.from("blogs").upsert(blogs, { onConflict: "slug" });
  out.blogs = blogsRes.error ? { ok: false, message: blogsRes.error.message } : { ok: true, inserted: blogs.length };

  const testimonialsDeleteRes = await supabase
    .from("testimonials")
    .delete()
    .not("id", "is", null);

  if (testimonialsDeleteRes.error) {
    out.testimonials = { ok: false, message: testimonialsDeleteRes.error.message };
  } else {
    const testimonialsInsertRes = await supabase
      .from("testimonials")
      .insert(testimonials);
    out.testimonials = testimonialsInsertRes.error
      ? { ok: false, message: testimonialsInsertRes.error.message }
      : { ok: true, inserted: testimonials.length };
  }

  out.counts = {
    site_settings: await checkCount("site_settings"),
    projects: await checkCount("projects"),
    blogs: await checkCount("blogs"),
    testimonials: await checkCount("testimonials"),
  };

  const writes = ["site_settings", "projects", "blogs", "testimonials"];
  const allWritesOk = writes.every((key) => out[key]?.ok === true);
  const allCountsOk = Object.values(out.counts).every((value) => value.ok === true);

  console.log("SEED_STATUS:", allWritesOk && allCountsOk ? "OK" : "PARTIAL_OR_FAIL");
  console.log(JSON.stringify(out, null, 2));

  if (!(allWritesOk && allCountsOk)) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("SEED_STATUS: FAIL");
  console.error(err?.message || err);
  process.exit(1);
});
