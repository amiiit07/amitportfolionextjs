"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

type ContactFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  returnTo?: "/" | "/contact";
};

const projectTypes = [
  "Website Development",
  "Web Application",
  "E-commerce Store",
  "Portfolio Website",
  "Dashboard/Admin Panel",
  "API Development",
  "Other",
];

const budgets = [
  "Under ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹2,00,000",
  "Above ₹2,00,000",
  "Not Sure",
];

export function ContactForm({ action, returnTo = "/contact" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await action(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-1"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-32 bg-accent/20 blur-3xl" />
      
      <div className="relative rounded-[1.8rem] bg-black/40 p-6 backdrop-blur-sm md:p-8">
        <input type="hidden" name="returnTo" value={returnTo} />

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-white/80">
            <span>Name <span className="text-red-400">*</span></span>
            <input 
              className="field w-full rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10" 
              name="name" 
              placeholder="Your name" 
              minLength={2} 
              required 
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-white/80">
            <span>Email <span className="text-red-400">*</span></span>
            <input 
              className="field w-full rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10" 
              name="email" 
              type="email" 
              placeholder="you@example.com" 
              required 
            />
          </label>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-white/80">
            <span>Phone</span>
            <input 
              className="field w-full rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10" 
              name="phone" 
              type="tel" 
              placeholder="+91 98765 43210" 
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-white/80">
            <span>Company</span>
            <input 
              className="field w-full rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10" 
              name="company" 
              placeholder="Your company (optional)" 
            />
          </label>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-white/80">
            <span>Project Type</span>
            <select 
              className="field w-full rounded-xl border-white/10 bg-white/5 text-white focus:border-accent/50 focus:bg-white/10"
              name="projectType"
            >
              <option value="" className="bg-black">Select project type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-black">
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-white/80">
            <span>Budget</span>
            <select 
              className="field w-full rounded-xl border-white/10 bg-white/5 text-white focus:border-accent/50 focus:bg-white/10"
              name="budget"
            >
              <option value="" className="bg-black">Select budget range</option>
              {budgets.map((budget) => (
                <option key={budget} value={budget} className="bg-black">
                  {budget}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-5 block space-y-2 text-sm font-medium text-white/80">
          <span>Message <span className="text-red-400">*</span></span>
          <textarea
            className="field min-h-32 w-full resize-y rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10"
            name="message"
            placeholder="Tell me about your project, goals, and timeline..."
            minLength={20}
            required
          />
          <span className="text-xs text-white/40">Please write at least 20 characters</span>
        </label>

        <input type="hidden" name="website" value="" />

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-7 text-white/50">
            I typically respond within 24 hours.
          </p>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-8 py-3.5 text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-accent/30 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={16} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}