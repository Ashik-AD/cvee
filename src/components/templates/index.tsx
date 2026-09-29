import type {
  Education,
  Experience,
  PersonalInfo,
  Project,
} from "@/features/editor/types";
import type { ComponentType } from "react";
import { Obsidian } from "./Obsidian";
import { Classic } from "./Classsic";
import { Linear } from "./Linear";
import { Terminal } from "./Terminal";
import { Compact } from "./Compact";
import { Editorial } from "./Editorial";

export type CVTemplates =
  | "obsidian"
  | "classic"
  | "compact"
  | "editorial"
  | "terminal"
  | "linear";

export interface TemplateProps {
  personalInfo: PersonalInfo;
  aboutMe: string;
  experiences: Experience[];
  projects: Project[];
  educations?: Education[];
  skills: string[];
}

export const TemplateSelectOptions: {
  label: string;
  value: CVTemplates;
}[] = [
  { label: "Obsidian", value: "obsidian" },
  { label: "Classic", value: "classic" },
  { label: "Linear", value: "linear" },
  { label: "Editorial", value: "editorial" },
  { label: "Terminal", value: "terminal" },
  { label: "Compact", value: "compact" },
];

export interface CvTemplateProps extends TemplateProps {
  /**
   * Template Name `Templates`
   **/
  type?: CVTemplates;
}

const templates = {
  obsidian: Obsidian,
  classic: Classic,
  linear: Linear,
  terminal: Terminal,
  compact: Compact,
  editorial: Editorial,
} satisfies Record<CVTemplates, ComponentType<Omit<TemplateProps, "type">>>;

function CVTemplate({ type = "obsidian", ...rest }: CvTemplateProps) {
  const Comp = templates[type];
  return <Comp {...rest} />;
}

export default CVTemplate;
