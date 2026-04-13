import { format } from "date-fns";
import { updateContactAction } from "@/app/admin/(protected)/actions";
import { getUnreadMessages } from "@/lib/queries";

export default async function MessagesPage() {
  const messages = await getUnreadMessages();

  return (
    <section className="surface rounded-[2rem] p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.18em] text-accent">Messages</p>
      <h1 className="mt-2 text-3xl font-semibold">Unread inquiries</h1>

      <div className="mt-8 space-y-5">
        {messages.length ? (
          messages.map((message) => (
            <form
              key={message.id}
              action={updateContactAction}
              className="rounded-[1.8rem] border border-black/8 bg-white/70 p-5"
            >
              <input type="hidden" name="id" value={message.id} />
              <input type="hidden" name="adminNotes" value={message.admin_notes ?? ""} />
              <input type="hidden" name="isRead" value="true" />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{message.name}</h2>
                  <p className="text-sm text-muted">{message.email}</p>
                </div>
                <p className="text-sm text-muted">
                  {message.created_at ? format(new Date(message.created_at), "dd MMM yyyy, hh:mm a") : "Recent"}
                </p>
              </div>

              <p className="mt-4 text-sm leading-7 text-muted">{message.message}</p>

              <button
                type="submit"
                className="mt-5 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-foreground"
              >
                Mark as Read
              </button>
            </form>
          ))
        ) : (
          <p className="rounded-[1.5rem] border border-dashed border-black/12 px-5 py-6 text-sm text-muted">
            No unread messages at the moment.
          </p>
        )}
      </div>
    </section>
  );
}

