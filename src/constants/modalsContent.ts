import ResumeImport from "@/components/ResumeImport";
import type { ReactNode } from "react";

interface ModalContent {
  element: () => ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const modalsContent: Record<string, ModalContent> = {
  "import-json": {
    element: ResumeImport,
    title: "Import Resume from JSON",
    description: "Upload a JSON Resume, or reactive-resume export file.",
    className: "sm:min-w-[90%] lg:min-w-4xl",
  },
};
