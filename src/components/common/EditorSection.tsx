import type { ReactNode } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Flex } from "./layout";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

type EditorSectionProps = {
  title: string;
  id: string;
  children: ReactNode;
};

function EditorSection({ children, title, id }: EditorSectionProps) {
  return (
    <AccordionItem value={id} className="bg-neutral-201F1F">
      <AccordionTrigger className="border border-border rounded-none border-x-0 px-1.5">
        <Flex className="justify-between items-center gap-4 w-full">
          <h2>{title}</h2>

          <Flex className="items-center gap-2">
            <Button variant="ghost">
              <Eye />
            </Button>
          </Flex>
        </Flex>
      </AccordionTrigger>
      <AccordionContent className="p-3 bg-neutral-1C1B1B">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export default EditorSection;
