import {
  ArrowRight,
  FilePlusCorner,
  LayoutTemplate,
  Pencil,
  Printer,
  ScanSearch,
  X,
} from 'lucide-react';
import { Flex, FlexCenter } from './common/layout';
import { Button } from './ui/button';
import useCreateResume from '@/hooks/useCreateResume';
import { useLocation } from 'wouter';
import { useModalActions } from '@/store/modal';

const steps = [
  {
    number: '01',
    title: 'Create your CV',
    description: 'Start with a new CV or duplicate an existing one.',
    icon: FilePlusCorner,
  },
  {
    number: '02',
    title: 'Add your information',
    description:
      'Fill in your profile, experience, projects, skills, and education.',
    icon: Pencil,
  },
  {
    number: '03',
    title: 'Choose a template',
    description: 'Pick a template that matches your role and personal style.',
    icon: LayoutTemplate,
  },
  {
    number: '04',
    title: 'Review your CV',
    description: 'Use Preview or Split View to check your content and layout.',
    icon: ScanSearch,
  },
  {
    number: '05',
    title: 'Print or export',
    description: "When you're ready, use Print / Save as PDF.",
    icon: Printer,
  },
];

export function QuickStartGuide() {
  const createNewResume = useCreateResume();
  const [_, navigate] = useLocation();
  const { closeModal } = useModalActions();

  async function handleCreateNewResume() {
    let res = await createNewResume();
    if (res) {
      navigate(`/editor?id=${res.id}`);
    }
    closeModal();
  }

  return (
    <div className="bg-background w-full max-w-2xl overflow-hidden rounded-xl border shadow-xl">
      {/* Header */}
      <Flex className="items-start justify-between border-b px-6 py-5">
        <div>
          <div className="text-muted-foreground mb-1 text-[10px] font-medium tracking-widest uppercase">
            Quick Start
          </div>

          <h2 className="text-lg font-semibold tracking-tight">
            Build your CV
          </h2>

          <p className="text-muted-foreground mt-1 text-sm">
            Get your CV ready in a few simple steps.
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="rounded-full px-1.5"
          onClick={closeModal}
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </Button>
      </Flex>

      {/* Steps */}
      <div className="divide-y">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <Flex
              key={step.number}
              className="group hover:bg-muted/40 gap-4 px-6 py-4 transition-colors"
            >
              <Flex className="w-8 shrink-0 flex-col items-center">
                <span className="text-muted-foreground text-[12px] font-semibold">
                  {step.number}
                </span>

                <FlexCenter className="mt-2 size-8 rounded-md border border-emerald-600 bg-emerald-600/20">
                  <Icon className="size-4 text-emerald-600" />
                </FlexCenter>
              </Flex>

              <div className="min-w-0 pt-0.5">
                <h3 className="text-sm font-medium">{step.title}</h3>

                <p className="text-muted-foreground mt-1 max-w-lg text-xs leading-5">
                  {step.description}
                </p>
              </div>
            </Flex>
          );
        })}
      </div>

      {/* Footer */}
      <Flex className="justify-between border-t bg-emerald-700/10 px-6 py-4">
        <div>
          <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Tip
          </div>

          <p className="text-muted-foreground mt-0.5 text-xs">
            Your CV is saved automatically as you work.
          </p>
        </div>

        <Button
          type="button"
          className="bg-emerald-700/40 text-white hover:text-emerald-900"
          onClick={handleCreateNewResume}
        >
          Start editing
          <ArrowRight className="size-3.5" />
        </Button>
      </Flex>
    </div>
  );
}
