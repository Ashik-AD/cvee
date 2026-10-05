import { About } from "@/components/About";
import KeyboardShortcuts from "@/components/common/KeyboardShortcuts";
import { QuickStartGuide } from "@/components/QuickGuideContent";
import ResumeImport from "@/components/ResumeImport";
import type { ReactNode } from "react";

interface ModalContent {
  element: () => ReactNode;
  title?: string;
  description?: string;
  className?: string;
  showCloseBtn?: boolean;
}

export const modalsContent: Record<string, ModalContent> = {
  "import-json": {
    element: ResumeImport,
    title: "Import Resume from JSON",
    description: "Upload a JSON Resume, or reactive-resume export file.",
    className: "sm:min-w-[90%] lg:min-w-4xl",
  },
  keyboardShortcut: {
    element: KeyboardShortcuts,
    className: "sm:min-w-[90%] lg:min-w-4xl bg-transparent border-0! ring-0!",
    showCloseBtn: false,
  },
  quickGuides: {
    element: QuickStartGuide,
    className: "sm:min-w-[90%] lg:min-w-4xl bg-transparent border-0! ring-0!",
    showCloseBtn: false,
  },
  about: {
    element: About,
    className: "sm:min-w-[90%] lg:min-w-4xl bg-transparent border-0! ring-0!",
    showCloseBtn: false,
  },
};
