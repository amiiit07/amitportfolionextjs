import Link from "next/link";
import { format } from "date-fns";
import { getActivityLogs, getDashboardSnapshot, getProjects, getUnreadMessages } from "@/lib/queries";

export default async function DashboardPage() {
  const [snapshot, unreadMessages, activityLogs, projects] = await Promise.all([
    getDashboardSnapshot(),
    getUnreadMessages(),
    getActivityLogs(),
    getProjects(),
  ]);

  const cards = [
    { label: "Total Contacts", value: snapshot.totalContacts },
    { label: "Unread Messages", value: snapshot.unreadContacts },
    { label: "Projects", value: snapshot.totalProjects },
    { label: "Featured", value: snapshot.featuredProjects },
  ];

  return (
    <>
      <section className="surface rounded-[2rem] p-6 md:p-8">
        <p className="eyebrow">Dashboard</p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {cards.map((card) => (
            <article key={card.label} className="rounded-[1.5rem] bg-white/70 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-muted">{card.label}</p>
              <p className="mt-3 text-4xl font-semibold text-foreground">{card.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <div className="surface rounded-[2rem] p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-accent">Unread Inbox</p>
              <h2 className="mt-2 text-3xl font-semibold">Recent inquiries</h2>
            </div>
            <Link href="/admin/messages" className="text-sm font-semibold text-accent">
              Open messages
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {unreadMessages.length ? (
              unreadMessages.slice(0, 4).map((message) => (
                <article key={message.id} className="rounded-[1.5rem] border border-black/8 bg-white/70 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{message.name}</h3>
                      <p className="text-sm text-muted">{message.email}</p>
                    </div>
                    <p className="text-sm text-muted">
                      {message.created_at ? format(new Date(message.created_at), "dd MMM yyyy") : "New"}
                    </p>
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">{message.message}</p>
                </article>
              ))
            ) : (
              <p className="rounded-[1.5rem] border border-dashed border-black/12 px-5 py-6 text-sm text-muted">
                No unread messages right now.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <section className="surface rounded-[2rem] p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-accent">Project Stack</p>
                <h2 className="mt-2 text-3xl font-semibold">Managed projects</h2>
              </div>
              <Link href="/admin/projects" className="text-sm font-semibold text-accent">
                Manage
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {projects.slice(0, 4).map((project) => (
                <article key={project.id} className="rounded-[1.5rem] bg-white/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{project.title}</h3>
                    <span className="text-xs uppercase tracking-[0.18em] text-muted">{project.status}</span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted">{project.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="surface rounded-[2rem] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-accent">Activity Log</p>
            <div className="mt-6 space-y-3">
              {activityLogs.length ? (
                activityLogs.slice(0, 5).map((item) => (
                  <div key={item.id} className="rounded-[1.25rem] bg-white/70 px-4 py-3">
                    <p className="text-sm font-semibold text-foreground">{item.action}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                      {item.created_at ? format(new Date(item.created_at), "dd MMM yyyy, hh:mm a") : "Recent"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-[1.25rem] border border-dashed border-black/12 px-4 py-5 text-sm text-muted">
                  Activity will appear here after admin actions begin.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
