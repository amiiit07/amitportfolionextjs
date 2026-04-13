import Link from "next/link";

type SetupNoticeProps = {
  title?: string;
  description?: string;
};

export function SetupNotice({
  title = "Supabase connection is not configured yet.",
  description = "Add your Supabase URL and anon key to .env.local, run the SQL schema, then set ADMIN_EMAIL and ADMIN_PASSWORD and run the admin seed script.",
}: SetupNoticeProps) {
  return (
    <section className="surface rounded-[2rem] p-6 md:p-8">
      <p className="eyebrow">Setup Required</p>
      <h2 className="mt-5 text-3xl font-semibold text-foreground">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
        >
          Check Contact Page
        </Link>
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-foreground"
        >
          Open Supabase
        </a>
      </div>
    </section>
  );
}
