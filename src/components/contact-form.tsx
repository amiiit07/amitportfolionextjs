type ContactFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  returnTo?: "/" | "/contact";
};

export function ContactForm({ action, returnTo = "/contact" }: ContactFormProps) {
  return (
    <form action={action} className="surface rounded-[2rem] p-6 md:p-8">
      <input type="hidden" name="returnTo" value={returnTo} />

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-white/88">
          <span>Name</span>
          <input className="field" name="name" placeholder="Your name" minLength={2} required />
        </label>

        <label className="space-y-2 text-sm font-medium text-white/88">
          <span>Email</span>
          <input className="field" name="email" type="email" placeholder="you@example.com" required />
        </label>
      </div>

      <label className="mt-5 block space-y-2 text-sm font-medium text-white/88">
        <span>Message</span>
        <textarea
          className="field min-h-40 resize-y"
          name="message"
          placeholder="Tell me about your project, goals, and timeline."
          minLength={20}
          required
        />
        <span className="text-xs text-muted">Please write at least 20 characters.</span>
      </label>

      <input type="hidden" name="website" value="" />

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-sm leading-7 text-muted">
          Clean, simple contact flow with subtle validation and spam filtering.
        </p>
        <button type="submit" className="neon-button px-6 py-3 text-sm font-semibold text-white">
          Hire Me
        </button>
      </div>
    </form>
  );
}
