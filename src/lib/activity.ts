import { getAdminSession } from "@/lib/auth";

type LogParams = {
  action: string;
  entityType: string;
  entityId?: string | null;
  details?: string | null;
};

export async function logAdminActivity({
  action,
  entityType,
  entityId = null,
  details = null,
}: LogParams) {
  const session = await getAdminSession();

  if (session.unavailable || !session.supabase || !session.user) {
    return;
  }

  await session.supabase.from("activity_logs").insert([
    {
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      admin_email: session.user.email ?? null,
    },
  ]);
}

