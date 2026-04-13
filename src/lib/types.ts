export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  stack: string[];
  live_url: string | null;
  repo_url: string | null;
  cover_image: string | null;
  featured: boolean;
  status: "Planning" | "In Progress" | "Shipped";
  sort_order: number;
  created_at?: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  budget: string | null;
  project_type: string | null;
  message: string;
  is_read: boolean;
  admin_notes: string | null;
  created_at?: string;
};

export type ActivityLog = {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: string | null;
  created_at?: string;
  admin_email: string | null;
};

export type AdminProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  title: string | null;
  bio: string | null;
  is_super_admin: boolean;
};

export type SiteSettings = {
  id: string;
  hero_badge: string;
  hero_title: string;
  hero_description: string;
  availability_text: string;
  contact_email: string;
  contact_phone: string;
  location: string;
};

export type DashboardSnapshot = {
  totalContacts: number;
  unreadContacts: number;
  totalProjects: number;
  featuredProjects: number;
};

