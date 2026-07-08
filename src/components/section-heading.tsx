import { FadeIn } from "./reveal";

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ label, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <FadeIn>
      <div className={`space-y-4 ${align === "center" ? "text-center" : ""}`}>
        <span className="eyebrow">{label}</span>
        <h2 className="max-w-3xl text-3xl font-bold leading-tight text-white text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-xl text-sm leading-relaxed text-[#B4B4B4] sm:text-base">
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
