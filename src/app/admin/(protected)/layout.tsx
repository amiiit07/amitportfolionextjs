import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { SetupNotice } from "@/components/admin/setup-notice";
import { signOutAction } from "@/app/admin/(protected)/actions";
import { requireAdmin } from "@/lib/auth";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin();

  if (session.unavailable) {
    return (
      <div className="page-shell py-14">
        <SetupNotice />
      </div>
    );
  }

  return (
    <AdminShell profile={session.profile!} signOutAction={signOutAction}>
      {children}
    </AdminShell>
  );
}

