import { Code, Link2, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export const splitDescription = (description: string) =>
  description
    .split('- ')
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
      <Icon className="size-2" />
      {children}
    </span>
  );
};

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b border-black pb-1 text-[10px] font-bold tracking-[0.15em] uppercase">
    {children}
  </div>
);

export function ProjectLink({
  website,
  repo,
}: {
  website?: string;
  repo?: string;
}) {
  return (
    <>
      {website?.trim() && website?.startsWith('https') && (
        <a href={website} className="inline-flex items-center gap-1 underline">
          <Link2 className="size-2" />
          {website}
        </a>
      )}
      {repo?.trim() &&
        (repo.startsWith('https://github.com') ||
          repo.startsWith('https://gitlab.com')) && (
          <a href={repo} className="inline-flex items-center gap-1 underline">
            <Code className="size-2" />
            {repo}
          </a>
        )}
    </>
  );
}
