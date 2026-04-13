"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { loginSchema } from "@/lib/validators";
import {
  createLocalAdminCookieValue,
  localAdminCookieName,
} from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    redirect("/admin/login?error=validation");
  }

  const localAdminCookieValue = createLocalAdminCookieValue();

  if (
    localAdminCookieValue &&
    parsed.data.email.trim().toLowerCase() === (process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "") &&
    parsed.data.password === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies();
    cookieStore.set(localAdminCookieName, localAdminCookieValue, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect("/admin/dashboard");
  }

  if (!isSupabaseConfigured()) {
    redirect("/admin/login?error=config");
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/admin/login?error=config");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    redirect("/admin/login?error=invalid");
  }

  redirect("/admin/dashboard");
}

