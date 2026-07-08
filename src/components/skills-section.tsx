"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Code2, Globe, Database, Smartphone, Box, Palette, Layers, Server, Terminal } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./reveal";

const categories = ["All", "Frontend", "Backend", "Tools", "Design"];

const skills = [
  { name: "React", category: "Frontend", level: 92, icon: Code2, color: "#4F8CFF" },
  { name: "Next.js", category: "Frontend", level: 90, icon: Layers, color: "#7B61FF" },
  { name: "TypeScript", category: "Frontend", level: 85, icon: Terminal, color: "#3178C6" },
  { name: "Tailwind CSS", category: "Frontend", level: 95, icon: Palette, color: "#06B6D4" },
  { name: "HTML", category: "Frontend", level: 92, icon: Code2, color: "#E34F26" },
  { name: "JavaScript", category: "Frontend", level: 88, icon: Terminal, color: "#F7DF1E" },
  { name: "Bootstrap", category: "Frontend", level: 85, icon: Box, color: "#7952B3" },
  { name: "Node.js", category: "Backend", level: 85, icon: Server, color: "#339933" },
  { name: "MongoDB", category: "Backend", level: 80, icon: Database, color: "#47A248" },
  { name: "Express", category: "Backend", level: 82, icon: Server, color: "#666666" },
  { name: "Supabase", category: "Backend", level: 78, icon: Database, color: "#3ECF8E" },
  { name: "Framer Motion", category: "Tools", level: 88, icon: Box, color: "#FF6B6B" },
  { name: "GSAP", category: "Tools", level: 78, icon: Box, color: "#00D084" },
  { name: "Git", category: "Tools", level: 85, icon: Globe, color: "#F05032" },
  { name: "Three.js", category: "Tools", level: 70, icon: Box, color: "#000000" },
  { name: "UI Design", category: "Design", level: 85, icon: Palette, color: "#FF6B6B" },
  { name: "Responsive Dev", category: "Design", level: 92, icon: Smartphone, color: "#4F8CFF" },
];

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    x.set((relX - 0.5) * 12);
    y.set((relY - 0.5) * 12);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Icon = skill.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative glass rounded-2xl p-5 cursor-default"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${skill.color}15, transparent 70%)`,
        }}
      />
      <div className="relative z-10">
        <Icon className="w-6 h-6 mb-3" style={{ color: skill.color }} />
        <h4 className="text-white font-medium text-sm mb-3">{skill.name}</h4>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: skill.color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs text-[#B4B4B4] mt-1.5 block">{skill.level}%</span>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section className="section-padding">
      <div className="page-container">
        <SectionHeading
          label="Skills"
          title="Technologies I work with daily."
          description="A curated selection of tools and technologies I use to build premium digital experiences."
        />

        <FadeIn>
          <div className="flex flex-wrap gap-2 mt-8 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#4F8CFF] text-white"
                    : "bg-white/5 text-white/50 hover:text-white/80 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
