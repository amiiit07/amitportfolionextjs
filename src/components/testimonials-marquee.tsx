"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "./section-heading";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechStart Inc.",
    content: "Amit delivered an exceptional portfolio that exceeded our expectations. His attention to detail and modern design approach made our product stand out.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "LaunchPad",
    content: "Working with Amit was a pleasure. He understood our requirements perfectly and delivered a scalable dashboard on time.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "Digital Agency",
    content: "The admin panel Amit built for us simplified our workflow significantly. Clean code, responsive design, and great communication throughout.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "CEO",
    company: "InnovateTech",
    content: "Amit's frontend expertise transformed our outdated interface into a modern, fast, and beautiful experience. Highly recommended.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Design Lead",
    company: "Creative Studio",
    content: "A rare developer who truly understands design. Every animation, spacing, and interaction felt intentional and polished.",
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6 min-w-[260px] sm:min-w-[320px] max-w-[380px] shrink-0 mx-2 sm:mx-3">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-[#4F8CFF] text-[#4F8CFF]" />
        ))}
      </div>
      <p className="text-sm text-[#B4B4B4] leading-relaxed mb-4">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#7B61FF] flex items-center justify-center text-xs font-bold text-white">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-medium text-white">{testimonial.name}</div>
          <div className="text-xs text-[#B4B4B4]">{testimonial.role}, {testimonial.company}</div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsMarquee() {
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3);

  return (
    <section className="section-padding">
      <div className="page-container">
        <SectionHeading
          label="Testimonials"
          title="Kind words from clients."
          description="What people say about working with me."
          align="center"
        />
      </div>

      <div className="mt-10 overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>

      <div className="mt-4 overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...row2, ...row2, ...row1.slice(0, 2)].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
