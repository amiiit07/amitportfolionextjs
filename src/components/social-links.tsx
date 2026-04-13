import { BriefcaseBusiness, GitBranch } from "lucide-react";
import { socialLinks } from "@/lib/site-data";

const iconMap = {
  GitHub: GitBranch,
  LinkedIn: BriefcaseBusiness,
};

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.label as keyof typeof iconMap];

        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="neon-button-secondary inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
          >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
