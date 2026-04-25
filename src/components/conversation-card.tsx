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
      <div className="relative z-10 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/58">Contact Footer</p>
          <h3 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">Start a Conversation</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">
            Open for full-stack engineering roles, product collaborations, and performance-focused interface builds.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
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

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <a
              href="https://github.com/amiiit07"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 hover:border-[#3b82f6]/55 hover:text-white"
            >
              <GitBranch size={16} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/amiiit07/"
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
        </div>

        <div className="grid gap-3 text-sm">
          <article className="rounded-2xl border border-white/14 bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Availability</p>
            <p className="mt-2 text-base font-semibold text-white">Open for new projects</p>
            <p className="mt-1 text-xs leading-6 text-white/65">Replies within 24 hours for serious inquiries.</p>
          </article>

          <article className="rounded-2xl border border-white/14 bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Best Fit Work</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="subtle-tag rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em]">Frontend Builds</span>
              <span className="subtle-tag rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em]">Dashboard UI</span>
              <span className="subtle-tag rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em]">Landing Pages</span>
            </div>
          </article>
        </div>
      </div>
    </article>
  );
}
