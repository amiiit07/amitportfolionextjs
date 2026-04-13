import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, supabaseUrl } from "@/lib/supabase/env";
import type { AdminProfile } from "@/lib/types";

const localAdminEmail = process.env.ADMIN_EMAIL?.trim();
const localAdminPassword = process.env.ADMIN_PASSWORD;
export const localAdminCookieName = "admin-session";

type SessionBase = {
  supabase: any;
  user: { id: string; email?: string } | null;
  unavailable: boolean;
  localAuth: boolean;
};

type AdminSession = SessionBase & { profile: AdminProfile };
type UnavailableSession = SessionBase & { profile: null; unavailable: true };
type NoUserSession = SessionBase & { profile: null; unavailable: false };

type AdminSessionResult = AdminSession | UnavailableSession | NoUserSession;

function createServiceRoleClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!isSupabaseConfigured() || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl!, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function createLocalAdminCookieValue() {
  if (!localAdminEmail || !localAdminPassword) {
    return null;
  }

  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY ?? localAdminPassword;
  const signature = createHmac("sha256", secret).update(`${localAdminEmail}:${localAdminPassword}`).digest("hex");

  return `${localAdminEmail}.${signature}`;
}

async function getLocalAdminSession(): Promise<AdminSession | null> {
  const expectedValue = createLocalAdminCookieValue();

  if (!expectedValue) {
    return null;
  }

  const cookieStore = await cookies();
  const storedValue = cookieStore.get(localAdminCookieName)?.value;

  if (storedValue !== expectedValue) {
    return null;
  }

  const supabase = createServiceRoleClient() ?? (await createSupabaseServerClient());

  if (!supabase) {
    return null;
  }

  return {
    supabase,
    user: {
      id: "local-admin",
      email: localAdminEmail,
    },
    profile: {
      id: "local-admin",
      email: localAdminEmail,
      full_name: "Amit Kumar",
      title: "Administrator",
      bio: "Primary admin account for portfolio management.",
      is_super_admin: true,
    } as AdminProfile,
    unavailable: false as const,
    localAuth: true as const,
  };
}

export async function getAdminSession(): Promise<AdminSessionResult> {
  const localSession = await getLocalAdminSession();

  if (localSession) {
    return localSession;
  }

  if (!isSupabaseConfigured()) {
    return { supabase: null, user: null, profile: null, unavailable: true as const, localAuth: false as const };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { supabase: null, user: null, profile: null, unavailable: true as const, localAuth: false as const };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, profile: null, unavailable: false as const, localAuth: false as const };
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id, email, full_name, title, bio, is_super_admin")
    .eq("id", user.id)
    .single<AdminProfile>();

  return { supabase, user, profile: profile ?? null, unavailable: false as const, localAuth: false as const };
}

export async function requireAdmin(): Promise<AdminSessionResult> {
  const session = await getAdminSession();

  if (session.unavailable) {
    return session;
  }

  if (!session.user || !session.profile?.is_super_admin) {
    redirect("/admin/login");
  }

  return session;
}

