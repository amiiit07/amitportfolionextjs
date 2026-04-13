type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
};

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-4">
      <p className="eyebrow">{label}</p>
      <h2 className="max-w-4xl text-4xl font-semibold leading-tight text-white text-balance md:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">{description}</p>
    </div>
  );
}
