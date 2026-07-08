"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import { SectionHeading } from "./section-heading";

const certifications = [
  {
    title: "Full Stack Web Development",
    issuer: "Multiple Platforms",
    description: "Comprehensive training in modern web development technologies including React, Node.js, MongoDB, and more.",
    year: "2024",
    verifyUrl: null,
  },
  {
    title: "Data Analysis with Python",
    issuer: "NIT Patna",
    description: "Professional certification covering data analysis, visualization, and statistical methods using Python.",
    year: "2024",
    verifyUrl: null,
  },
  {
    title: "Computer Networking (CCNA Basics)",
    issuer: "Cimage Catalyst College",
    description: "Foundational knowledge in networking concepts, protocols, and network infrastructure.",
    year: "2023",
    verifyUrl: null,
  },
  {
    title: "Power BI Data Analytics",
    issuer: "Cimage Catalyst College",
    description: "Certification in business intelligence, data visualization, and dashboard creation with Power BI.",
    year: "2024",
    verifyUrl: null,
  },
  {
    title: "JavaScript",
    issuer: "Infosys Springboard",
    description: "Certification in JavaScript fundamentals, ES6+, and modern web development concepts.",
    year: "2024",
    verifyUrl: null,
  },
  {
    title: "Java",
    issuer: "IIT Bombay",
    description: "Certification in Java programming, object-oriented concepts, and application development.",
    year: "2025",
    verifyUrl: null,
  },
  {
    title: "C++",
    issuer: "IIT Bombay",
    description: "Certification in C++ programming, data structures, and problem-solving techniques.",
    year: "2025",
    verifyUrl: null,
  },
  {
    title: "C",
    issuer: "IIT Bombay",
    description: "Certification in C programming, procedural programming, and algorithmic problem-solving.",
    year: "2024",
    verifyUrl: null,
  },
];

function CertCard({ cert, index }: { cert: typeof certifications[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group glass rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5 text-[#4F8CFF]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white font-medium text-sm sm:text-base truncate">{cert.title}</h3>
            <span className="shrink-0 text-[10px] text-[#B4B4B4] font-mono">{cert.year}</span>
          </div>
          <p className="text-xs text-[#4F8CFF] mt-0.5">{cert.issuer}</p>
          <p className="text-sm text-[#B4B4B4] mt-2 leading-relaxed line-clamp-2">{cert.description}</p>
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-xs text-[#4F8CFF] hover:underline"
            >
              Verify <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function CertificationsSection() {
  return (
    <section className="section-padding">
      <div className="page-container">
        <SectionHeading
          label="Certifications"
          title="Continuous learning credentials."
          description="Professional certifications that validate my expertise and commitment to growth."
        />

        <div className="grid sm:grid-cols-2 gap-4 mt-10">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
