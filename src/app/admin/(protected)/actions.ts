"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { logAdminActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import { localAdminCookieName } from "@/lib/auth";
import { slugify, toArray } from "@/lib/utils";
import { blogSchema, contactAdminSchema, projectSchema, settingsSchema, testimonialSchema } from "@/lib/validators";
import type { createSupabaseServerClient } from "@/lib/supabase/server";

type SupabaseClient = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

function getProtectedSupabase<T extends { supabase: SupabaseClient | null; unavailable: boolean }>(
  session: T,
) {
  if (session.unavailable || !session.supabase) {
    throw new Error("Supabase is not configured.");
  }

  return session.supabase;
}

export async function signOutAction() {
  const session = await requireAdmin();

  if (session.localAuth) {
    const cookieStore = await cookies();
    cookieStore.delete(localAdminCookieName);
    redirect("/admin/login");
  }

  const supabase = session.unavailable ? null : getProtectedSupabase(session);

  if (!supabase) {
    redirect("/admin/login");
  }

  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateContactAction(formData: FormData) {
  const parsed = contactAdminSchema.safeParse({
    id: formData.get("id"),
    isRead: formData.get("isRead"),
    adminNotes: formData.get("adminNotes"),
  });

  if (!parsed.success) {
    return;
  }

  const session = await requireAdmin();
  const supabase = getProtectedSupabase(session);

  await supabase
    .from("contacts")
    .update({
      is_read: parsed.data.isRead === "true",
      admin_notes: parsed.data.adminNotes || null,
    })
    .eq("id", parsed.data.id);

  await logAdminActivity({
    action: "contact.updated",
    entityType: "contact",
    entityId: parsed.data.id,
    details: parsed.data.isRead === "true" ? "Marked as read" : "Marked as unread",
  });

  revalidatePath("/admin/contacts");
  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
}

export async function createProjectAction(formData: FormData) {
  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    stack: formData.get("stack"),
    liveUrl: formData.get("liveUrl"),
    repoUrl: formData.get("repoUrl"),
    status: formData.get("status"),
    featured: formData.get("featured"),
    sortOrder: formData.get("sortOrder"),
  });

  if (!parsed.success) {
    return;
  }

  const session = await requireAdmin();
  const supabase = getProtectedSupabase(session);

  const slug = parsed.data.slug || slugify(parsed.data.title);

  const { data } = await supabase
    .from("projects")
    .insert({
      title: parsed.data.title,
      slug,
      summary: parsed.data.summary,
      description: parsed.data.description,
      stack: toArray(parsed.data.stack),
      live_url: parsed.data.liveUrl || null,
      repo_url: parsed.data.repoUrl || null,
      status: parsed.data.status,
      featured: parsed.data.featured === "true",
      sort_order: parsed.data.sortOrder,
    })
    .select("id")
    .single<{ id: string }>();

  await logAdminActivity({
    action: "project.created",
    entityType: "project",
    entityId: data?.id,
    details: parsed.data.title,
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");
}

export async function updateProjectAction(formData: FormData) {
  const parsed = projectSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    stack: formData.get("stack"),
    liveUrl: formData.get("liveUrl"),
    repoUrl: formData.get("repoUrl"),
    status: formData.get("status"),
    featured: formData.get("featured"),
    sortOrder: formData.get("sortOrder"),
  });

  if (!parsed.success || !parsed.data.id) {
    return;
  }

  const session = await requireAdmin();
  const supabase = getProtectedSupabase(session);

  await supabase
    .from("projects")
    .update({
      title: parsed.data.title,
      slug: parsed.data.slug || slugify(parsed.data.title),
      summary: parsed.data.summary,
      description: parsed.data.description,
      stack: toArray(parsed.data.stack),
      live_url: parsed.data.liveUrl || null,
      repo_url: parsed.data.repoUrl || null,
      status: parsed.data.status,
      featured: parsed.data.featured === "true",
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", parsed.data.id);

  await logAdminActivity({
    action: "project.updated",
    entityType: "project",
    entityId: parsed.data.id,
    details: parsed.data.title,
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");
}

export async function deleteProjectAction(formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string" || !id) {
    return;
  }

  const session = await requireAdmin();
  const supabase = getProtectedSupabase(session);

  await supabase.from("projects").delete().eq("id", id);

  await logAdminActivity({
    action: "project.deleted",
    entityType: "project",
    entityId: id,
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");
}

export async function updateSettingsAction(formData: FormData) {
  const parsed = settingsSchema.safeParse({
    fullName: formData.get("fullName"),
    title: formData.get("title"),
    bio: formData.get("bio"),
    heroBadge: formData.get("heroBadge"),
    heroTitle: formData.get("heroTitle"),
    heroDescription: formData.get("heroDescription"),
    availabilityText: formData.get("availabilityText"),
    contactEmail: formData.get("contactEmail"),
    contactPhone: formData.get("contactPhone"),
    location: formData.get("location"),
  });

  if (!parsed.success) {
    return;
  }

  const session = await requireAdmin();
  const supabase = getProtectedSupabase(session);

  await supabase.from("admin_profiles").upsert({
    id: session.user!.id,
    email: session.user!.email ?? parsed.data.contactEmail,
    full_name: parsed.data.fullName,
    title: parsed.data.title,
    bio: parsed.data.bio,
    is_super_admin: true,
  });

  await supabase.from("site_settings").upsert(
    {
      id: "site-settings",
      hero_badge: parsed.data.heroBadge,
      hero_title: parsed.data.heroTitle,
      hero_description: parsed.data.heroDescription,
      availability_text: parsed.data.availabilityText,
      contact_email: parsed.data.contactEmail,
      contact_phone: parsed.data.contactPhone,
      location: parsed.data.location,
    },
    { onConflict: "id" },
  );

  await logAdminActivity({
    action: "settings.updated",
    entityType: "site_settings",
    entityId: "site-settings",
    details: "Portfolio and admin profile updated",
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}

export async function createBlogAction(formData: FormData) {
  const parsed = blogSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage"),
    tags: formData.get("tags"),
    published: formData.get("published"),
    featured: formData.get("featured"),
    sortOrder: formData.get("sortOrder"),
  });

  if (!parsed.success) {
    return;
  }

  const session = await requireAdmin();
  const supabase = getProtectedSupabase(session);

  const slug = parsed.data.slug || slugify(parsed.data.title);
  const contentLength = parsed.data.content.split(/\s+/).length;
  const readingTime = Math.ceil(contentLength / 200);

  const { data } = await supabase
    .from("blogs")
    .insert({
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      cover_image: parsed.data.coverImage || null,
      tags: toArray(parsed.data.tags),
      published: parsed.data.published === "true",
      featured: parsed.data.featured === "true",
      reading_time: readingTime,
      sort_order: parsed.data.sortOrder,
    })
    .select("id")
    .single<{ id: string }>();

  await logAdminActivity({
    action: "blog.created",
    entityType: "blog",
    entityId: data?.id,
    details: parsed.data.title,
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  revalidatePath("/admin/dashboard");
}

export async function updateBlogAction(formData: FormData) {
  const parsed = blogSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage"),
    tags: formData.get("tags"),
    published: formData.get("published"),
    featured: formData.get("featured"),
    sortOrder: formData.get("sortOrder"),
  });

  if (!parsed.success || !parsed.data.id) {
    return;
  }

  const session = await requireAdmin();
  const supabase = getProtectedSupabase(session);

  const contentLength = parsed.data.content.split(/\s+/).length;
  const readingTime = Math.ceil(contentLength / 200);

  await supabase
    .from("blogs")
    .update({
      title: parsed.data.title,
      slug: parsed.data.slug || slugify(parsed.data.title),
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      cover_image: parsed.data.coverImage || null,
      tags: toArray(parsed.data.tags),
      published: parsed.data.published === "true",
      featured: parsed.data.featured === "true",
      reading_time: readingTime,
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", parsed.data.id);

  await logAdminActivity({
    action: "blog.updated",
    entityType: "blog",
    entityId: parsed.data.id,
    details: parsed.data.title,
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  revalidatePath("/admin/dashboard");
}

export async function deleteBlogAction(formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string" || !id) {
    return;
  }

  const session = await requireAdmin();
  const supabase = getProtectedSupabase(session);

  await supabase.from("blogs").delete().eq("id", id);

  await logAdminActivity({
    action: "blog.deleted",
    entityType: "blog",
    entityId: id,
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  revalidatePath("/admin/dashboard");
}

export async function createTestimonialAction(formData: FormData) {
  const parsed = testimonialSchema.safeParse({
    clientName: formData.get("clientName"),
    clientRole: formData.get("clientRole"),
    company: formData.get("company"),
    content: formData.get("content"),
    rating: formData.get("rating"),
    avatarUrl: formData.get("avatarUrl"),
    featured: formData.get("featured"),
    sortOrder: formData.get("sortOrder"),
  });

  if (!parsed.success) {
    return;
  }

  const session = await requireAdmin();
  const supabase = getProtectedSupabase(session);

  const { data } = await supabase
    .from("testimonials")
    .insert({
      client_name: parsed.data.clientName,
      client_role: parsed.data.clientRole,
      company: parsed.data.company,
      content: parsed.data.content,
      rating: parsed.data.rating,
      avatar_url: parsed.data.avatarUrl || null,
      featured: parsed.data.featured === "true",
      sort_order: parsed.data.sortOrder,
    })
    .select("id")
    .single<{ id: string }>();

  await logAdminActivity({
    action: "testimonial.created",
    entityType: "testimonial",
    entityId: data?.id,
    details: parsed.data.clientName,
  });

  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin/dashboard");
}

export async function updateTestimonialAction(formData: FormData) {
  const parsed = testimonialSchema.safeParse({
    id: formData.get("id"),
    clientName: formData.get("clientName"),
    clientRole: formData.get("clientRole"),
    company: formData.get("company"),
    content: formData.get("content"),
    rating: formData.get("rating"),
    avatarUrl: formData.get("avatarUrl"),
    featured: formData.get("featured"),
    sortOrder: formData.get("sortOrder"),
  });

  if (!parsed.success || !parsed.data.id) {
    return;
  }

  const session = await requireAdmin();
  const supabase = getProtectedSupabase(session);

  await supabase
    .from("testimonials")
    .update({
      client_name: parsed.data.clientName,
      client_role: parsed.data.clientRole,
      company: parsed.data.company,
      content: parsed.data.content,
      rating: parsed.data.rating,
      avatar_url: parsed.data.avatarUrl || null,
      featured: parsed.data.featured === "true",
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", parsed.data.id);

  await logAdminActivity({
    action: "testimonial.updated",
    entityType: "testimonial",
    entityId: parsed.data.id,
    details: parsed.data.clientName,
  });

  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin/dashboard");
}

export async function deleteTestimonialAction(formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string" || !id) {
    return;
  }

  const session = await requireAdmin();
  const supabase = getProtectedSupabase(session);

  await supabase.from("testimonials").delete().eq("id", id);

  await logAdminActivity({
    action: "testimonial.deleted",
    entityType: "testimonial",
    entityId: id,
  });

  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin/dashboard");
}
