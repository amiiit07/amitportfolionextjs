"use client";

import { useState } from "react";
import { Copy, Check, GitBranch, BriefcaseBusiness, Mail } from "lucide-react";

type ConversationCardProps = {
  email: string;
  location: string;
};

export function ConversationCard({ email, location }: ConversationCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1700);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="glass-shell relative overflow-hidden rounded-[2rem] p-6 md:p-8">
      <div className="mesh-blob mesh-blob-purple -right-14 -top-12 h-36 w-36" />
      <p className="relative z-10 text-xs uppercase tracking-[0.22em] text-white/58">Contact Footer</p>
      <h3 className="relative z-10 mt-3 font-display text-3xl font-semibold text-white md:text-4xl">
        Start a Conversation
      </h3>
      <p className="relative z-10 mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">
        Open for frontend engineering roles, product collaborations, and performance-focused interface builds.
      </p>

      <div className="relative z-10 mt-7 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white hover:border-white/35"
        >
          <Mail size={16} />
          {email}
        </a>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white/85 hover:border-white/35 hover:text-white"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy Email"}
        </button>
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3 text-sm text-white/70">
        <a
          href="https://github.com/amit"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 hover:border-[#3b82f6]/55 hover:text-white"
        >
          <GitBranch size={16} />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/amit"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 hover:border-[#8b5cf6]/55 hover:text-white"
        >
          <BriefcaseBusiness size={16} />
          LinkedIn
        </a>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
          {location}
        </span>
      </div>
    </article>
  );
}
