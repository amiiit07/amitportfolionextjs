import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.email("Valid email is required."),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  company: z.string().trim().max(80).optional().or(z.literal("")),
  budget: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(20, "Please add a brief project message."),
  website: z.string().trim().max(0).optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, "Project title is required."),
  slug: z.string().trim().optional().or(z.literal("")),
  summary: z.string().trim().min(10, "Add a short summary."),
  description: z.string().trim().min(20, "Add project details."),
  stack: z.string().trim().min(2, "Add at least one technology."),
  liveUrl: z.url().optional().or(z.literal("")),
  repoUrl: z.url().optional().or(z.literal("")),
  status: z.enum(["Planning", "In Progress", "Shipped"]),
  featured: z.enum(["true", "false"]),
  sortOrder: z.coerce.number().min(0).max(999),
});

export const contactAdminSchema = z.object({
  id: z.string().min(1),
  isRead: z.enum(["true", "false"]),
  adminNotes: z.string().trim().max(500).optional().or(z.literal("")),
});

export const settingsSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  title: z.string().trim().min(2, "Title is required."),
  bio: z.string().trim().min(20, "Add a short bio."),
  heroBadge: z.string().trim().min(2, "Badge is required."),
  heroTitle: z.string().trim().min(10, "Hero title is required."),
  heroDescription: z.string().trim().min(20, "Hero description is required."),
  availabilityText: z.string().trim().min(5, "Availability text is required."),
  contactEmail: z.email("Valid contact email is required."),
  contactPhone: z.string().trim().min(8, "Contact phone is required."),
  location: z.string().trim().min(2, "Location is required."),
});

