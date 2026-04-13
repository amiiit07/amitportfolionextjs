import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";

export default async function AdminIndexPage() {
  const session = await getAdminSession();

  if (!session.unavailable && session.user && session.profile?.is_super_admin) {
    redirect("/admin/dashboard");
  }

  redirect("/admin/login");
}

