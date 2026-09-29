import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export const splitDescription = (description: string) =>
  description
    .split("- ")
    .map((item) => item.trim())
    .filter(Boolean);

export const Contact = ({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children?: ReactNode;
}) => {
  if (!children) return null;

  return (
    <span className="inline-flex items-center gap-1">
      <Icon className="size-3" />
      {children}
    </span>
  );
};

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b border-black pb-1 text-[10px] font-bold uppercase tracking-[0.15em]">
    {children}
  </div>
);
