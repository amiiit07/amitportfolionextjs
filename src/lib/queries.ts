import { fallbackSettings, sampleBlogs, sampleProjects, sampleTestimonials } from "@/lib/site-data";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type {
  ActivityLog,
  AdminProfile,
  Blog,
  Contact,
  DashboardSnapshot,
  Project,
  SiteSettings,
  Testimonial,
} from "@/lib/types";

const projectPriority = new Map([
  ["polymers-granules-hub", 0],
  ["bihar-tourism", 1],
  ["avnautics-aviation", 2],
]);

function sortPortfolioProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    const aPriority = projectPriority.get(a.slug) ?? Number.POSITIVE_INFINITY;
    const bPriority = projectPriority.get(b.slug) ?? Number.POSITIVE_INFINITY;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    return a.sort_order - b.sort_order;
  });
}

export async function getSiteSettings() {
  if (!isSupabaseConfigured()) {
    return fallbackSettings;
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return fallbackSettings;
  }

  const { data } = await supabase
    .from("site_settings")
    .select(
      "id, hero_badge, hero_title, hero_description, availability_text, contact_email, contact_phone, location",
    )
    .limit(1)
    .maybeSingle<SiteSettings>();

  return data ?? fallbackSettings;
}

export async function getProjects() {
  if (!isSupabaseConfigured()) {
    return sortPortfolioProjects(sampleProjects);
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return sortPortfolioProjects(sampleProjects);
  }

  const { data } = await supabase
    .from("projects")
    .select(
      "id, title, slug, summary, description, stack, live_url, repo_url, cover_image, featured, status, sort_order, created_at",
    )
    .order("sort_order", { ascending: true })
    .returns<Project[]>();

  return sortPortfolioProjects(data?.length ? data : sampleProjects);
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, 3);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getDashboardSnapshot() {
  const base: DashboardSnapshot = {
    totalContacts: 0,
    unreadContacts: 0,
    totalProjects: sampleProjects.length,
    featuredProjects: sampleProjects.filter((project) => project.featured).length,
  };

  if (!isSupabaseConfigured()) {
    return base;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return base;
  }

  const [{ count: totalContacts }, { count: unreadContacts }, { count: totalProjects }, { count: featuredProjects }] =
    await Promise.all([
      supabase.from("contacts").select("*", { count: "exact", head: true }),
      supabase.from("contacts").select("*", { count: "exact", head: true }).eq("is_read", false),
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }).eq("featured", true),
    ]);

  return {
    totalContacts: totalContacts ?? 0,
    unreadContacts: unreadContacts ?? 0,
    totalProjects: totalProjects ?? 0,
    featuredProjects: featuredProjects ?? 0,
  };
}

export async function getContacts() {
  if (!isSupabaseConfigured()) {
    return [] as Contact[];
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [] as Contact[];
  }

  const { data } = await supabase
    .from("contacts")
    .select(
      "id, name, email, phone, company, budget, project_type, message, is_read, admin_notes, created_at",
    )
    .order("created_at", { ascending: false })
    .returns<Contact[]>();

  return data ?? [];
}

export async function getUnreadMessages() {
  const contacts = await getContacts();
  return contacts.filter((contact) => !contact.is_read);
}

export async function getActivityLogs() {
  if (!isSupabaseConfigured()) {
    return [] as ActivityLog[];
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return [] as ActivityLog[];
  }

  const { data } = await supabase
    .from("activity_logs")
    .select("id, action, entity_type, entity_id, details, created_at, admin_email")
    .order("created_at", { ascending: false })
    .limit(20)
    .returns<ActivityLog[]>();

  return data ?? [];
}

export async function getBlogs() {
  if (!isSupabaseConfigured()) {
    return sampleBlogs;
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return [] as Blog[];
  }

  const { data } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, content, cover_image, tags, published, featured, reading_time, sort_order, created_at")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .returns<Blog[]>();

  return data?.length ? data : sampleBlogs;
}

export async function getBlogBySlug(slug: string) {
  if (!isSupabaseConfigured()) {
    return sampleBlogs.find((blog) => blog.slug === slug) ?? null;
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return null as Blog | null;
  }

  const { data } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, content, cover_image, tags, published, featured, reading_time, sort_order, created_at")
    .eq("slug", slug)
    .eq("published", true)
    .single<Blog>();

  return data ?? sampleBlogs.find((blog) => blog.slug === slug) ?? null;
}

export async function getTestimonials() {
  if (!isSupabaseConfigured()) {
    return sampleTestimonials;
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return [] as Testimonial[];
  }

  const { data } = await supabase
    .from("testimonials")
    .select("id, client_name, client_role, company, content, rating, avatar_url, featured, sort_order, created_at")
    .order("sort_order", { ascending: true })
    .returns<Testimonial[]>();

  return data ?? [];
}

export async function getFeaturedTestimonials() {
  const testimonials = await getTestimonials();
  return testimonials.filter((t) => t.featured);
}

export async function getAdminProfile() {
  if (!isSupabaseConfigured()) {
    return null as AdminProfile | null;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return null as AdminProfile | null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null as AdminProfile | null;
  }

  const { data } = await supabase
    .from("admin_profiles")
    .select("id, email, full_name, title, bio, is_super_admin")
    .eq("id", user.id)
    .single<AdminProfile>();

  return data ?? null;
}
