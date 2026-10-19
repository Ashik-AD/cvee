import type { ReactNode } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Flex } from './layout';
import type { LucideIcon } from 'lucide-react';

type EditorSectionProps = {
  title: string;
  id: string;
  icon?: LucideIcon;
  children: ReactNode;
};

function EditorSection({ children, title, id, icon }: EditorSectionProps) {
  const Icon = icon;

  return (
    <AccordionItem value={id} className="bg-neutral-201F1F">
      <AccordionTrigger className="border-border rounded-none border border-x-0 px-1.5">
        <Flex className="w-full items-center gap-2">
          {Icon && <Icon className="text-muted-foreground size-5" />}
          <h2 className="text-base text-gray-300">{title}</h2>
        </Flex>
      </AccordionTrigger>
      <AccordionContent className="bg-neutral-1C1B1B p-3">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export default EditorSection;
