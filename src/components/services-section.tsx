"use client";

import { motion } from "framer-motion";
import { Code2, Globe, LayoutDashboard, Server, Monitor, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./reveal";

const services = [
  {
    title: "Portfolio Websites",
    description: "Premium portfolio websites with modern design, smooth animations, and full CMS integration.",
    features: ["Custom Design", "Responsive Layout", "Contact Form", "SEO Optimization", "Fast Loading", "CMS Ready"],
    icon: Monitor,
    price: "₹15,000 - ₹25,000",
    popular: true,
  },
  {
    title: "Full Stack Applications",
    description: "Complete web applications with frontend, backend, database, and admin dashboard.",
    features: ["Custom Frontend", "REST API", "Database Design", "Admin Dashboard", "Authentication", "Cloud Deployment"],
    icon: Code2,
    price: "₹50,000 - ₹1,50,000",
    popular: true,
  },
  {
    title: "Backend API Development",
    description: "Scalable REST or GraphQL APIs with authentication, database integration, and deployment.",
    features: ["API Design", "Authentication", "Database Integration", "Error Handling", "Documentation", "Monitoring"],
    icon: Server,
    price: "₹30,000 - ₹80,000",
    popular: false,
  },
  {
    title: "SaaS Dashboards",
    description: "Data-rich dashboards with analytics, charts, user management, and real-time updates.",
    features: ["Data Visualization", "User Roles", "Real-time Updates", "Export Features", "API Integration"],
    icon: LayoutDashboard,
    price: "₹40,000 - ₹80,000",
    popular: false,
  },
  {
    title: "Landing Pages",
    description: "High-converting landing pages optimized for lead generation and brand storytelling.",
    features: ["Lead Capture", "A/B Testing Ready", "Mobile Optimized", "Fast Performance", "Analytics Setup"],
    icon: Globe,
    price: "₹8,000 - ₹15,000",
    popular: false,
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
    >
      {service.popular && (
        <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[#4F8CFF] text-[10px] font-semibold text-white uppercase tracking-wider flex items-center gap-1">
          <Sparkles size={10} />
          Popular
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#4F8CFF]" />
          </div>
          <span className="text-xs text-[#B4B4B4] font-mono">{service.price}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
        <p className="text-sm text-[#B4B4B4] leading-relaxed mb-4">{service.description}</p>

        <div className="pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-2">
            {service.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2 text-sm text-[#B4B4B4]">
                <span className="w-1 h-1 rounded-full bg-[#4F8CFF]" />
                {feat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section className="section-padding">
      <div className="page-container">
        <SectionHeading
          label="Services"
          title="What I can build for you."
          description="Professional web development services tailored to your project needs."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {services.slice(0, 3).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="flex justify-center mt-6">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4F8CFF] text-white font-medium hover:bg-[#4F8CFF]/90 transition-all hover:shadow-lg hover:shadow-[#4F8CFF]/25 text-sm"
            >
              Discuss Your Project
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
