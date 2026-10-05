import type { LucideIcon } from "lucide-react";

import {
  FilePlusCorner,
  Copy,
  Pencil,
  Trash2,
  Import,
  Download,
  Printer,
  // Plus,
  SquarePen,
  // CopyPlus,
  // ArrowUp,
  // ArrowDown,
  Eye,
  // Save,
  PanelLeft,
  // Monitor,
  // Smartphone,
  Keyboard,
  Command,
  BookOpen,
  Info,
  MessageSquareWarning,
  File,
  SplinePointer,
  // FilePenLine,
  CircleQuestionMark,
} from "lucide-react";

export const ACTION_KEYS = {
  NEW_CV: "new-cv",
  DUPLICATE_CV: "duplicate-cv",
  RENAME_CV: "rename-cv",
  DELETE_CV: "delete-cv",

  IMPORT_JSON: "import-json",
  EXPORT_JSON: "export-json",

  PRINT_PDF: "print-pdf",

  CHANGE_TEMPLATE: "change-template",

  ADD_SECTION: "add-section",
  EDIT_SECTION: "edit-section",
  DUPLICATE_SECTION: "duplicate-section",
  DELETE_SECTION: "delete-section",

  MOVE_SECTION_UP: "move-section-up",
  MOVE_SECTION_DOWN: "move-section-down",

  TOGGLE_SECTION_VISIBILITY: "toggle-section-visibility",

  SAVE: "save",

  VIEW_EDITOR: "view-editor",
  VIEW_PREVIEW: "view-preview",
  VIEW_SPLIT: "view-split",
  VIEW_DESKTOP: "view-desktop",
  VIEW_MOBILE: "view-mobile",

  PRINT_CV: "print-cv",
  PRINT_PREVIEW: "print-preview",

  KEYBOARD_SHORTCUTS: "keyboard-shortcuts",
  COMMAND_PALETTE: "command-palette",
  GETTING_STARTED: "getting-started",
  ABOUT: "about",
  FEEDBACK: "feedback",
} as const;

export type ActionKey = (typeof ACTION_KEYS)[keyof typeof ACTION_KEYS];

export type MenuAction = {
  type: "action";
  key: ActionKey;
  label: string;
  icon: LucideIcon;
  cmd?: string;
};

type MenuSeparator = {
  type: "separator";
};

type MenuItem = MenuAction | MenuSeparator;

type Menu = {
  name: string;
  cmd: string;
  actions: MenuItem[];
  icon: LucideIcon;
};

export const menu: Menu[] = [
  {
    name: "File",
    cmd: "Alt+F",
    icon: File,
    actions: [
      {
        type: "action",
        key: "new-cv",
        label: "New CV",
        icon: FilePlusCorner,
        cmd: "Ctrl+N",
      },
      {
        type: "action",
        key: "duplicate-cv",
        label: "Duplicate CV",
        icon: Copy,
        cmd: "Ctrl+D",
      },
      {
        type: "action",
        key: "rename-cv",
        label: "Rename CV",
        icon: Pencil,
        cmd: "F2",
      },
      {
        type: "action",
        key: "delete-cv",
        label: "Delete CV",
        icon: Trash2,
        cmd: "Delete",
      },

      { type: "separator" },

      {
        type: "action",
        key: "import-json",
        label: "Import JSON",
        icon: Import,
        cmd: "Ctrl+I",
      },
      {
        type: "action",
        key: "export-json",
        label: "Export JSON",
        icon: Download,
      },

      { type: "separator" },

      {
        type: "action",
        key: "print-pdf",
        label: "Print / Save as PDF",
        icon: Printer,
        cmd: "Ctrl+P",
      },
    ],
  },

  {
    name: "View",
    cmd: "Alt+V",
    icon: SplinePointer,
    actions: [
      {
        type: "action",
        key: "view-editor",
        label: "Editor",
        icon: SquarePen,
        cmd: "Ctrl+[",
      },
      {
        type: "action",
        key: "view-preview",
        label: "Preview",
        icon: Eye,
        cmd: "Ctrl+]",
      },
      {
        type: "action",
        key: "view-split",
        label: "Split View",
        icon: PanelLeft,
        cmd: "Ctrl+\\",
      },
    ],
  },

  {
    name: "Print",
    cmd: "Alt+P",
    icon: Printer,
    actions: [
      {
        type: "action",
        key: "print-cv",
        label: "Print CV",
        icon: Printer,
        cmd: "Ctrl+P",
      },
      {
        type: "action",
        key: "print-preview",
        label: "Open print preview",
        icon: Eye,
      },
    ],
  },

  {
    name: "Help",
    cmd: "Alt+H",
    icon: CircleQuestionMark,
    actions: [
      {
        type: "action",
        key: "keyboard-shortcuts",
        label: "Keyboard shortcuts",
        icon: Keyboard,
        cmd: "?",
      },
      {
        type: "action",
        key: "command-palette",
        label: "Command palette",
        icon: Command,
        cmd: "Ctrl+K",
      },

      { type: "separator" },

      {
        type: "action",
        key: "getting-started",
        label: "Getting started / quick guide",
        icon: BookOpen,
      },

      { type: "separator" },

      {
        type: "action",
        key: "about",
        label: "About",
        icon: Info,
      },
      {
        type: "action",
        key: "feedback",
        label: "Feedback / report issue",
        icon: MessageSquareWarning,
      },
    ],
  },
];
