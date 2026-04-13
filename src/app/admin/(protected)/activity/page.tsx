import { format } from "date-fns";
import { getActivityLogs } from "@/lib/queries";

export default async function ActivityPage() {
  const activityLogs = await getActivityLogs();

  return (
    <section className="surface rounded-[2rem] p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.18em] text-accent">Activity</p>
      <h1 className="mt-2 text-3xl font-semibold">Recent admin actions</h1>

      <div className="mt-8 space-y-4">
        {activityLogs.length ? (
          activityLogs.map((item) => (
            <article key={item.id} className="rounded-[1.5rem] border border-black/8 bg-white/70 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{item.action}</h2>
                  <p className="text-sm text-muted">
                    {item.entity_type}
                    {item.admin_email ? ` · ${item.admin_email}` : ""}
                  </p>
                </div>
                <p className="text-sm text-muted">
                  {item.created_at ? format(new Date(item.created_at), "dd MMM yyyy, hh:mm a") : "Recent"}
                </p>
              </div>
              {item.details ? <p className="mt-3 text-sm leading-7 text-muted">{item.details}</p> : null}
            </article>
          ))
        ) : (
          <p className="rounded-[1.5rem] border border-dashed border-black/12 px-5 py-6 text-sm text-muted">
            Activity will appear once admins start making changes.
          </p>
        )}
      </div>
    </section>
  );
}

