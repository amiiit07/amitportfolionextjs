"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

function useMousePosition() {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [x, y]);

  return { x, y };
}

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; alpha: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 140, 255, ${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");

  return (
    <span className="inline-flex flex-wrap">
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden mr-[0.3em]">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              className="inline-block"
              initial={{ opacity: 0, y: 80, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.06 + j * 0.03,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

function TypingAnimation({ texts }: { texts: string[] }) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = texts[currentIndex];
      if (!textRef.current) return;

      if (!isDeleting) {
        textRef.current.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          timeout = setTimeout(() => { isDeleting = true; type(); }, 2000);
          return;
        }
        timeout = setTimeout(type, 60);
      } else {
        textRef.current.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % texts.length;
          timeout = setTimeout(type, 300);
          return;
        }
        timeout = setTimeout(type, 30);
      }
    };

    timeout = setTimeout(type, 1000);
    return () => clearTimeout(timeout);
  }, [texts]);

  return <span ref={textRef} />;
}

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
    const maxDist = 150;
    const strength = Math.max(0, 1 - dist / maxDist) * 12;
    const moveX = (e.clientX - centerX) / rect.width * strength;
    const moveY = (e.clientY - centerY) / rect.height * strength;
    x.set(moveX);
    y.set(moveY);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function HeroSection() {
  const { x: mouseX, y: mouseY } = useMousePosition();
  const glowX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F8CFF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7B61FF]/10 rounded-full blur-[100px]" />
        <Particles />
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle 400px at ${glowX.get() * 100}% ${glowY.get() * 100}%, rgba(79, 140, 255, 0.08), transparent)`,
        }}
      />

      <div className="page-container relative z-10 w-full pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="space-y-8">
          <div className="space-y-6 sm:space-y-8">
              <h1 className="max-w-full text-[clamp(2.45rem,13vw,4.5rem)] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.92] sm:leading-[0.88] tracking-tight text-white">
                <span className="text-[#4F8CFF]">
                  <SplitText text="Where" delay={2.8} />
                </span>
                <br />
                <SplitText text="Design" delay={3.2} />
                <br />
                <SplitText text="Meets" delay={3.6} />
                <br />
                <span className="text-[#4F8CFF]">
                  <SplitText text="Development" delay={4.0} />
                </span>
              </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 4 }}
              className="max-w-lg text-sm leading-7 text-[#B4B4B4] sm:text-lg sm:leading-relaxed"
            >
              Crafting premium full-stack applications with modern frameworks, elegant motion, and meticulous attention to detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 4.2 }}
              className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <MagneticButton
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#4F8CFF] px-6 py-3.5 text-sm font-medium text-white overflow-hidden transition-shadow hover:shadow-lg hover:shadow-[#4F8CFF]/25 sm:w-auto sm:px-7 sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a Project
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </MagneticButton>

              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white/80 transition-all hover:text-white hover:border-white/30 sm:w-auto sm:px-7 sm:text-base"
              >
                View Work
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="flex justify-center mt-8"
        >
          <div className="scroll-indicator">
            <span className="text-xs text-white/30 uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown size={16} className="text-white/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
