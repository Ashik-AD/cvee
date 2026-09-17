import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, FileCode2 } from "lucide-react";

export default function ResumeTemplateCard() {
  return (
    <Card className="w-96 gap-0 rounded-sm border-border bg-card p-2 shadow-none">
      <CardHeader className="gap-0 p-0">
        <div className="flex items-start justify-between">
          {/* File icon */}
          <div className="flex size-8 items-center justify-center rounded-sm bg-muted">
            <FileCode2 className="size-4 text-foreground" />
          </div>

          {/* Filename */}
          <span className="font-mono text-xs leading-4 text-muted-foreground">
            academic_cv.tex
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-0 pt-2 pb-0">
        <div className="space-y-1">
          <CardTitle className="text-base leading-6 font-medium">
            Academic &amp; Research
          </CardTitle>

          <p className="text-xs leading-5 text-muted-foreground">
            Sections tailored for peer-reviewed papers, citations, patents, and
            grant history.
          </p>
        </div>
      </CardContent>

      <CardFooter className="mt-2 flex justify-between border-t border-border px-0 pt-1.5 pb-0">
        <span className="font-mono text-xs leading-4 text-muted-foreground">
          BibTeX Friendly
        </span>

        <button
          type="button"
          className="flex items-center gap-1 text-xs leading-4 font-medium text-foreground hover:text-primary"
        >
          Clone Preset
          <ArrowUpRight className="size-2.5" />
        </button>
      </CardFooter>
    </Card>
  );
}
