import { format } from "date-fns";
import { updateContactAction } from "@/app/admin/(protected)/actions";
import { getContacts } from "@/lib/queries";

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <section className="surface rounded-[2rem] p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Contacts</p>
          <h1 className="mt-2 text-3xl font-semibold">Manage client inquiries</h1>
        </div>
        <p className="text-sm text-muted">{contacts.length} total records</p>
      </div>

      <div className="mt-8 space-y-6">
        {contacts.length ? (
          contacts.map((contact) => (
            <form
              key={contact.id}
              action={updateContactAction}
              className="rounded-[1.8rem] border border-black/8 bg-white/70 p-5"
            >
              <input type="hidden" name="id" value={contact.id} />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{contact.name}</h2>
                  <p className="text-sm text-muted">
                    {contact.email}
                    {contact.phone ? ` · ${contact.phone}` : ""}
                    {contact.company ? ` · ${contact.company}` : ""}
                  </p>
                </div>
                <p className="text-sm text-muted">
                  {contact.created_at ? format(new Date(contact.created_at), "dd MMM yyyy, hh:mm a") : "Recent"}
                </p>
              </div>

              <p className="mt-4 text-sm leading-7 text-muted">{contact.message}</p>

              <div className="mt-5 grid gap-4 md:grid-cols-[170px_1fr]">
                <label className="space-y-2 text-sm font-medium">
                  <span>Status</span>
                  <select className="field" name="isRead" defaultValue={contact.is_read ? "true" : "false"}>
                    <option value="false">Unread</option>
                    <option value="true">Read</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm font-medium">
                  <span>Admin notes</span>
                  <textarea
                    className="field min-h-28 resize-y"
                    name="adminNotes"
                    defaultValue={contact.admin_notes ?? ""}
                    placeholder="Add internal notes for follow-up."
                  />
                </label>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.16em] text-muted">
                {contact.project_type ? <span>Type: {contact.project_type}</span> : null}
                {contact.budget ? <span>Budget: {contact.budget}</span> : null}
              </div>

              <button
                type="submit"
                className="neon-button mt-5 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Save Contact
              </button>
            </form>
          ))
        ) : (
          <p className="rounded-[1.5rem] border border-dashed border-black/12 px-5 py-6 text-sm text-muted">
            No contacts yet. Form submissions from the public contact page will appear here.
          </p>
        )}
      </div>
    </section>
  );
}

