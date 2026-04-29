"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

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
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await action(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.05 }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-1 hover:border-accent/30 transition-colors duration-300"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-40 w-40 bg-accent/15 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-32 w-32 bg-accent-2/10 blur-3xl" />
      
      <motion.div className="relative rounded-[1.8rem] bg-black/50 p-5 sm:p-6 md:p-8 backdrop-blur-sm" variants={containerVariants}>
        <input type="hidden" name="returnTo" value={returnTo} />

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <motion.label variants={fieldVariants} className="space-y-2.5 text-sm font-medium text-white/80">
            <span>Name <span className="text-red-400">*</span></span>
            <motion.input 
              whileFocus={{ scale: 1.01 }}
              className="field w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10 focus:outline-none transition-all" 
              name="name" 
              placeholder="Your name" 
              minLength={2} 
              required 
            />
          </motion.label>

          <motion.label variants={fieldVariants} className="space-y-2.5 text-sm font-medium text-white/80">
            <span>Email <span className="text-red-400">*</span></span>
            <motion.input 
              whileFocus={{ scale: 1.01 }}
              className="field w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10 focus:outline-none transition-all" 
              name="email" 
              type="email" 
              placeholder="you@example.com" 
              required 
            />
          </motion.label>
        </div>

        <div className="mt-4 sm:mt-5 grid gap-4 sm:gap-5 md:grid-cols-2">
          <motion.label variants={fieldVariants} className="space-y-2.5 text-sm font-medium text-white/80">
            <span>Phone</span>
            <motion.input 
              whileFocus={{ scale: 1.01 }}
              className="field w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10 focus:outline-none transition-all" 
              name="phone" 
              type="tel" 
              placeholder="+91 98765 43210" 
            />
          </motion.label>

          <motion.label variants={fieldVariants} className="space-y-2.5 text-sm font-medium text-white/80">
            <span>Company</span>
            <motion.input 
              whileFocus={{ scale: 1.01 }}
              className="field w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10 focus:outline-none transition-all" 
              name="company" 
              placeholder="Your company (optional)" 
            />
          </motion.label>
        </div>

        <div className="mt-4 sm:mt-5 grid gap-4 sm:gap-5 md:grid-cols-2">
          <motion.label variants={fieldVariants} className="space-y-2.5 text-sm font-medium text-white/80">
            <span>Project Type</span>
            <motion.select 
              whileFocus={{ scale: 1.01 }}
              className="field w-full rounded-xl border border-white/10 bg-white/5 text-white focus:border-accent/50 focus:bg-white/10 focus:outline-none transition-all cursor-pointer"
              name="projectType"
            >
              <option value="" className="bg-black text-white">Select project type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-black text-white">
                  {type}
                </option>
              ))}
            </motion.select>
          </motion.label>

          <motion.label variants={fieldVariants} className="space-y-2.5 text-sm font-medium text-white/80">
            <span>Budget</span>
            <motion.select 
              whileFocus={{ scale: 1.01 }}
              className="field w-full rounded-xl border border-white/10 bg-white/5 text-white focus:border-accent/50 focus:bg-white/10 focus:outline-none transition-all cursor-pointer"
              name="budget"
            >
              <option value="" className="bg-black text-white">Select budget range</option>
              {budgets.map((budget) => (
                <option key={budget} value={budget} className="bg-black text-white">
                  {budget}
                </option>
              ))}
            </motion.select>
          </motion.label>
        </div>

        <motion.label variants={fieldVariants} className="mt-4 sm:mt-5 block space-y-2.5 text-sm font-medium text-white/80">
          <span>Message <span className="text-red-400">*</span></span>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            className="field min-h-32 w-full resize-y rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10 focus:outline-none transition-all"
            name="message"
            placeholder="Tell me about your project, goals, and timeline..."
            minLength={20}
            required
          />
          <motion.span className="text-xs text-white/40">Please write at least 20 characters</motion.span>
        </motion.label>

        <input type="hidden" name="website" value="" />

        <motion.div variants={fieldVariants} className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
          <motion.p className="text-xs sm:text-sm leading-7 text-white/50 font-medium">
            ⚡ I typically respond within 24 hours.
          </motion.p>
          <motion.button 
            type="submit" 
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.08, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" } : undefined}
            whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
            className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-black transition-all hover:shadow-lg hover:shadow-accent/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Loader2 size={18} />
                  </motion.div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  Send Message
                  <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Send size={16} />
                  </motion.div>
                </>
              )}
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.form>
  );
}