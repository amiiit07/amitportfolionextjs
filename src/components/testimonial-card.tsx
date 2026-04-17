import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="surface h-full overflow-hidden rounded-[1.8rem] p-6">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < testimonial.rating ? "fill-accent text-accent" : "text-white/20"}
          />
        ))}
      </div>
      <blockquote className="text-sm leading-relaxed text-white/85">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-lg font-semibold text-accent">
          {testimonial.client_name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-white">{testimonial.client_name}</p>
          <p className="text-sm text-muted">
            {testimonial.client_role} at {testimonial.company}
          </p>
        </div>
      </div>
    </article>
  );
}
