import { useModalActions } from '@/store/modal';
import { IconBrandGithub } from '@tabler/icons-react';
import {
  Code2,
  ExternalLink,
  FileText,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { Button } from './ui/button';
import { FlexCenter } from './common/layout';

const features = [
  {
    icon: Sparkles,
    title: 'Simple by design',
    description: 'No clutter. Just the tools you need to build a great CV.',
  },
  {
    icon: ShieldCheck,
    title: 'Your data stays yours',
    description:
      'Work locally without creating an account or handing over your data.',
  },
  {
    icon: FileText,
    title: 'Made for real CVs',
    description: 'Clean templates built to look good on screen and on paper.',
  },
  {
    icon: Code2,
    title: 'Built for developers',
    description:
      'Fast, keyboard-friendly, and designed with a developer mindset.',
  },
];

export function About() {
  const { closeModal } = useModalActions();

  return (
    <div className="bg-background w-full max-w-3xl overflow-hidden rounded-xl border shadow-2xl">
      {/* Header */}
      <header className="flex items-start justify-between border-b px-6 py-5">
        <div>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Your CV, your way.
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            A modern, fast and flexible CV builder designed for developers and
            professionals. Create, customize, and export your CV with ease.
          </p>
        </div>

        <Button
          type="button"
          onClick={closeModal}
          variant="ghost"
          className="rounded-md"
          aria-label="Close"
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </Button>
      </header>

      <div className="max-h-160 scrollbar-thin overflow-y-auto px-6">
        {/* Features */}
        <section className="grid divide-x divide-y border-b sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="border-0 p-5">
                <FlexCenter className="mb-3 size-8 rounded-md border border-emerald-800 bg-emerald-800/20">
                  <Icon className="size-4 text-emerald-500" />
                </FlexCenter>

                <h3 className="text-sm font-medium">{feature.title}</h3>

                <p className="text-muted-foreground mt-1.5 text-xs leading-5">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Meta */}
        <section className="flex items-end gap-10 py-5">
          <div>
            <pre className="text-xs leading-none! text-emerald-700">
              {`   ~~
__( o)>
\\ <_. )
 \`---'
  lazyduck`}
            </pre>
          </div>

          <a
            href="https://github.com/ashik-ad/cvee"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-medium transition-colors"
          >
            <IconBrandGithub className="size-4" />
            Source
            <ExternalLink className="size-3" />
          </a>
        </section>
      </div>
    </div>
  );
}
