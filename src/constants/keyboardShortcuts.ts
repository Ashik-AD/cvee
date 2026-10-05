import type { ActionKey } from "./menubar";

export const KeyboardShortcutGroups: {
  label: string;
  actions: ActionKey[];
}[] = [
  {
    label: "General",
    actions: ["save", "command-palette", "keyboard-shortcuts"],
  },

  {
    label: "CV",
    actions: ["new-cv", "duplicate-cv", "rename-cv", "delete-cv"],
  },

  // {
  //   label: "Editing",
  //   actions: [
  //     "add-section",
  //     "edit-section",
  //     "duplicate-section",
  //     "delete-section",
  //     "move-section-up",
  //     "move-section-down",
  //     "toggle-section-visibility",
  //   ],
  // },

  {
    label: "View",
    actions: ["view-editor", "view-preview", "view-split"],
  },

  {
    label: "Print",
    actions: ["print-cv", "print-preview"],
  },

  {
    label: "Help",
    actions: ["getting-started", "about", "feedback"],
  },
];
