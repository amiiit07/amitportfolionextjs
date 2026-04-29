type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
};

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <p className="eyebrow">{label}</p>
      <h2 className="max-w-4xl text-2xl font-semibold leading-tight text-white text-balance sm:text-3xl md:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8 md:text-lg">{description}</p>
    </div>
  );
}
