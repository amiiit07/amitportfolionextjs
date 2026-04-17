"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { contactSchema } from "@/lib/validators";

const contactSubmissionSchema = contactSchema.omit({ website: true });

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

export async function submitContactAction(formData: FormData) {
  const returnTo = formData.get("returnTo");
  const redirectPath = returnTo === "/" || returnTo === "/contact" ? returnTo : "/contact";

  const website = getFormValue(formData, "website");

  if (website && website.trim().length > 0) {
    redirect(`${redirectPath}?success=1`);
  }

  const parsed = contactSubmissionSchema.safeParse({
    name: getFormValue(formData, "name"),
    email: getFormValue(formData, "email"),
    phone: getFormValue(formData, "phone"),
    company: getFormValue(formData, "company"),
    budget: getFormValue(formData, "budget"),
    projectType: getFormValue(formData, "projectType"),
    message: getFormValue(formData, "message"),
  });

  if (!parsed.success) {
    redirect(`${redirectPath}?error=validation`);
  }

  if (!isSupabaseConfigured()) {
    console.log("Demo mode: Contact saved (Supabase not configured)");
    redirect(`${redirectPath}?success=1`);
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    console.log("Demo mode: Contact saved (Supabase client unavailable)");
    redirect(`${redirectPath}?success=1`);
  }

  const { error } = await supabase.from("contacts").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    company: parsed.data.company || null,
    budget: parsed.data.budget || null,
    project_type: parsed.data.projectType || null,
    message: parsed.data.message,
  });

  if (error) {
    console.error("Contact insert error:", error.message);
    redirect(`${redirectPath}?error=server`);
  }

  redirect(`${redirectPath}?success=1`);
}
