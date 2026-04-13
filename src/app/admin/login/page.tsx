import { redirect } from "next/navigation";
import { loginAction } from "@/app/admin/login/actions";
import { SetupNotice } from "@/components/admin/setup-notice";
import { SiteHeader } from "@/components/site-header";
import { getAdminSession } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const [session, params] = await Promise.all([getAdminSession(), searchParams]);

  if (!session.unavailable && session.user && session.profile?.is_super_admin) {
    redirect("/admin/dashboard");
  }

  const error = getParam(params.error);

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-14">
        {session.unavailable ? (
          <SetupNotice />
        ) : (
          <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="surface rounded-[2rem] p-6 md:p-10">
              <p className="eyebrow">Secure Admin</p>
              <h1 className="display-title mt-6 text-5xl font-semibold leading-none text-balance">
                Portfolio dashboard login
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted">
                Sign in with your Supabase Auth admin account to manage projects, messages,
                settings, and activity logs.
              </p>
            </div>

            <form action={loginAction} className="surface rounded-[2rem] p-6 md:p-10">
              <div className="space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-accent">Admin Access</p>
                  <h2 className="mt-3 text-3xl font-semibold">Welcome back</h2>
                </div>

                {error ? (
                  <div className="rounded-[1.25rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                    {error === "config"
                      ? "Supabase credentials are missing from your environment."
                      : error === "invalid"
                        ? "The email or password is incorrect."
                        : "Please enter a valid email and password."}
                  </div>
                ) : null}

                <label className="block space-y-2 text-sm font-medium">
                  <span>Email</span>
                  <input
                    className="field"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                  />
                </label>

                <label className="block space-y-2 text-sm font-medium">
                  <span>Password</span>
                  <input
                    className="field"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="neon-button w-full px-6 py-3 text-sm font-semibold text-white"
                >
                  Sign In
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </>
  );
}

