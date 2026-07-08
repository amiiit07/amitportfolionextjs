"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, MapPin, Sparkles, Clock, MessageCircle } from "lucide-react";
import { SectionHeading } from "./section-heading";

const initialForm = { name: "", email: "", subject: "", message: "" };
const initialErrors = { name: "", email: "", subject: "", message: "" };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ContactSection({ email: contactEmail, location }: { email: string; location: string }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const validate = () => {
    const e = { name: "", email: "", subject: "", message: "" };
    let valid = true;
    if (!form.name.trim()) { e.name = "Name is required"; valid = false; }
    if (!form.email.trim()) { e.email = "Email is required"; valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email = "Invalid email address"; valid = false; }
    if (!form.message.trim()) { e.message = "Message is required"; valid = false; }
    setErrors(e);
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F8CFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7B61FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="page-container relative">
        <SectionHeading
          label="Contact"
          title="Let's build something together."
          description="Have a project in mind? Let's discuss how I can help bring your vision to life."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-5 gap-8 mt-10"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4F8CFF]/20 to-[#7B61FF]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F8CFF] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4F8CFF]" />
                  </span>
                  <span className="text-sm text-white font-medium">Available for new projects</span>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  {[
                    { icon: Mail, label: "Email", value: contactEmail, href: `mailto:${contactEmail}` },
                    { icon: MapPin, label: "Location", value: location },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 group/item">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#7B61FF]/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <item.icon size={15} className="text-[#4F8CFF]" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#B4B4B4]">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-white hover:text-[#4F8CFF] transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-sm text-white">{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <MessageCircle size={16} className="text-[#4F8CFF]" />
                Let&apos;s Connect
              </h4>
              <p className="text-sm text-[#B4B4B4] leading-relaxed">
                Whether you need a full-stack application, a stunning portfolio, or technical consultation —
                I&apos;m here to help.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} className="text-[#4F8CFF]" />
                <span className="text-xs uppercase tracking-wider text-[#B4B4B4]">Response Time</span>
              </div>
              <p className="text-sm text-white/80">Typically within 24 hours</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4F8CFF]/20 to-[#7B61FF]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-6 sm:p-8 space-y-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-white/20 outline-none transition-all duration-300 ${
                          errors.name ? "border-red-500/50" : "border-white/10 focus:border-[#4F8CFF]/50 focus:bg-white/[0.08]"
                        }`}
                        placeholder="John Doe"
                      />
                    </motion.div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-red-400 mt-1 block"
                        >
                          {errors.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-white/20 outline-none transition-all duration-300 ${
                          errors.email ? "border-red-500/50" : "border-white/10 focus:border-[#4F8CFF]/50 focus:bg-white/[0.08]"
                        }`}
                        placeholder="john@example.com"
                      />
                    </motion.div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-red-400 mt-1 block"
                        >
                          {errors.email}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-2">
                    Subject
                  </label>
                  <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                    <input
                      id="subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#4F8CFF]/50 focus:bg-white/[0.08]"
                      placeholder="What is this regarding?"
                    />
                  </motion.div>
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-white/20 outline-none transition-all duration-300 resize-none ${
                        errors.message ? "border-red-500/50" : "border-white/10 focus:border-[#4F8CFF]/50 focus:bg-white/[0.08]"
                      }`}
                      placeholder="Tell me about your project, goals, and timeline..."
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-red-400 mt-1 block"
                      >
                        {errors.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#4F8CFF] to-[#7B61FF] px-6 py-3.5 text-white font-medium transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    {status === "loading" ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : status === "success" ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 size={18} />
                        Sent Successfully
                      </motion.span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} />
                        Send Message
                      </span>
                    )}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-red-400 text-center bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/20"
                    >
                      Something went wrong. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
