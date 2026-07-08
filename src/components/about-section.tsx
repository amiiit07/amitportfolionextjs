"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Code2, Layers, Sparkles, GraduationCap, Award } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal, FadeIn } from "./reveal";

function AnimatedCounter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let start = 0;
          const duration = 2000;
          const step = 16;
          const increment = end / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-sm text-[#B4B4B4] mt-1">{label}</div>
    </div>
  );
}

const timeline = [
  {
    year: "2023 — 2024",
    title: "Frontend Developer",
    description: "Developed responsive interfaces and component libraries for multiple client projects.",
    tags: ["HTML", "JavaScript", "Tailwind CSS"],
  },
  {
    year: "2024 — 2025",
    title: "Backend Developer",
    description: "Built scalable server-side solutions, RESTful APIs, and managed databases for web applications.",
    tags: ["Node.js", "Express", "MongoDB", "SQL"],
  },
  {
    year: "2025 — Present",
    title: "Full Stack Developer",
    description: "Building premium web applications with modern tech stack, focusing on clean architecture and exceptional user experiences.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
  },
];

const techStack = [
  { name: "React", level: 92, color: "#4F8CFF" },
  { name: "Next.js", level: 90, color: "#7B61FF" },
  { name: "TypeScript", level: 85, color: "#3178C6" },
  { name: "Node.js", level: 85, color: "#339933" },
  { name: "MongoDB", level: 80, color: "#47A248" },
  { name: "Tailwind CSS", level: 95, color: "#06B6D4" },
  { name: "Framer Motion", level: 88, color: "#FF6B6B" },
  { name: "GSAP", level: 78, color: "#00D084" },
];

export function AboutSection() {
  return (
    <section className="section-padding">
      <div className="page-container">
        <SectionHeading
          label="About"
          title="Crafting digital experiences with precision and purpose."
          description="A passionate full-stack developer focused on building premium, performant web applications."
        />

        <div className="grid lg:grid-cols-5 gap-8 mt-12">
          <div className="lg:col-span-3 space-y-6">
            <Reveal>
              <div className="glass rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-4">The Approach</h3>
                <p className="text-[#B4B4B4] leading-relaxed">
                  I believe every pixel tells a story. My development philosophy centers on creating interfaces
                  that are not only visually striking but also inherently functional and accessible. From concept
                  to deployment, I maintain a relentless focus on quality, performance, and user experience.
                </p>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4">
              <Reveal delay={0.1}>
                <div className="glass rounded-2xl p-6">
                  <Code2 className="w-5 h-5 text-[#4F8CFF] mb-3" />
                  <h4 className="text-white font-medium mb-2">Clean Architecture</h4>
                  <p className="text-sm text-[#B4B4B4] leading-relaxed">
                    Scalable, maintainable code structures built with best practices and type safety.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="glass rounded-2xl p-6">
                  <Layers className="w-5 h-5 text-[#7B61FF] mb-3" />
                  <h4 className="text-white font-medium mb-2">Motion Design</h4>
                  <p className="text-sm text-[#B4B4B4] leading-relaxed">
                    Intentional animations that guide users and elevate the overall experience.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="glass rounded-2xl p-6">
                  <Sparkles className="w-5 h-5 text-[#4F8CFF] mb-3" />
                  <h4 className="text-white font-medium mb-2">Performance First</h4>
                  <p className="text-sm text-[#B4B4B4] leading-relaxed">
                    Optimized bundles, lazy loading, and efficient rendering for blazing-fast experiences.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="glass rounded-2xl p-6">
                  <GraduationCap className="w-5 h-5 text-[#7B61FF] mb-3" />
                  <h4 className="text-white font-medium mb-2">Continuous Learning</h4>
                  <p className="text-sm text-[#B4B4B4] leading-relaxed">
                    Always exploring emerging technologies and refining my craft.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <Reveal delay={0.1} direction="right">
              <div className="glass rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-white mb-6">Tech Proficiency</h3>
                <div className="space-y-4">
                  {techStack.map((tech, i) => (
                    <div key={tech.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-white/80">{tech.name}</span>
                        <span className="text-[#B4B4B4]">{tech.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: tech.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} direction="right">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-5 h-5 text-[#4F8CFF]" />
                  <h3 className="text-lg font-semibold text-white">Highlights</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <AnimatedCounter end={7} suffix="+" label="Projects" />
                  <AnimatedCounter end={15} suffix="+" label="Technologies" />
                  <AnimatedCounter end={2} suffix="+" label="Years" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <motion.a
                href="/resume.pdf"
                download
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#4F8CFF] text-white font-medium hover:bg-[#4F8CFF]/90 transition-all hover:shadow-lg hover:shadow-[#4F8CFF]/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                Download Resume
              </motion.a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-8 glass rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <GraduationCap size={18} className="text-[#4F8CFF]" />
              Experience Timeline
            </h3>
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="relative pl-7 sm:pl-8 pb-6 sm:pb-8 last:pb-0">
                  <div className="absolute left-[6px] sm:left-[7px] top-2 bottom-0 w-[2px] bg-white/5 last:hidden" />
                  <div className="absolute left-0 top-2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-[#4F8CFF] bg-[#0A0A0A]" />
                  <div>
                    <span className="text-xs text-[#4F8CFF] font-mono">{item.year}</span>
                    <h4 className="text-white font-medium mt-1">{item.title}</h4>
                    <p className="text-sm text-[#B4B4B4] mt-1">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
