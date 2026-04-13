import { updateSettingsAction } from "@/app/admin/(protected)/actions";
import { getAdminProfile, getSiteSettings } from "@/lib/queries";

export default async function SettingsPage() {
  const [profile, settings] = await Promise.all([getAdminProfile(), getSiteSettings()]);

  return (
    <section className="surface rounded-[2rem] p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.18em] text-accent">Settings</p>
      <h1 className="mt-2 text-3xl font-semibold">Profile and portfolio content</h1>

      <form action={updateSettingsAction} className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          <span>Full name</span>
          <input className="field" name="fullName" defaultValue={profile?.full_name ?? "Amit"} />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Professional title</span>
          <input className="field" name="title" defaultValue={profile?.title ?? "Full-Stack Developer"} />
        </label>
        <label className="space-y-2 text-sm font-medium md:col-span-2">
          <span>Bio</span>
          <textarea
            className="field min-h-32 resize-y"
            name="bio"
            defaultValue={
              profile?.bio ??
              "Full-stack developer focused on modern portfolio sites, admin tooling, and clean user journeys."
            }
          />
        </label>

        <label className="space-y-2 text-sm font-medium">
          <span>Hero badge</span>
          <input className="field" name="heroBadge" defaultValue={settings.hero_badge} />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Availability text</span>
          <input className="field" name="availabilityText" defaultValue={settings.availability_text} />
        </label>
        <label className="space-y-2 text-sm font-medium md:col-span-2">
          <span>Hero title</span>
          <input className="field" name="heroTitle" defaultValue={settings.hero_title} />
        </label>
        <label className="space-y-2 text-sm font-medium md:col-span-2">
          <span>Hero description</span>
          <textarea
            className="field min-h-32 resize-y"
            name="heroDescription"
            defaultValue={settings.hero_description}
          />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Contact email</span>
          <input className="field" type="email" name="contactEmail" defaultValue={settings.contact_email} />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Contact phone</span>
          <input className="field" name="contactPhone" defaultValue={settings.contact_phone} />
        </label>
        <label className="space-y-2 text-sm font-medium md:col-span-2">
          <span>Location</span>
          <input className="field" name="location" defaultValue={settings.location} />
        </label>

        <button
          type="submit"
          className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white md:w-fit"
        >
          Save Settings
        </button>
      </form>
    </section>
  );
}

