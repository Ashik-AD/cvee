import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowUpRight, FileCode2 } from 'lucide-react';

export default function ResumeTemplateCard() {
  return (
    <Card className="border-border bg-card w-96 gap-0 rounded-sm p-2 shadow-none">
      <CardHeader className="gap-0 p-0">
        <div className="flex items-start justify-between">
          {/* File icon */}
          <div className="bg-muted flex size-8 items-center justify-center rounded-sm">
            <FileCode2 className="text-foreground size-4" />
          </div>

          {/* Filename */}
          <span className="text-muted-foreground font-mono text-xs leading-4">
            academic_cv.tex
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-0 pt-2 pb-0">
        <div className="space-y-1">
          <CardTitle className="text-base leading-6 font-medium">
            Academic &amp; Research
          </CardTitle>

          <p className="text-muted-foreground text-xs leading-5">
            Sections tailored for peer-reviewed papers, citations, patents, and
            grant history.
          </p>
        </div>
      </CardContent>

      <CardFooter className="border-border mt-2 flex justify-between border-t px-0 pt-1.5 pb-0">
        <span className="text-muted-foreground font-mono text-xs leading-4">
          BibTeX Friendly
        </span>

        <button
          type="button"
          className="text-foreground hover:text-primary flex items-center gap-1 text-xs leading-4 font-medium"
        >
          Clone Preset
          <ArrowUpRight className="size-2.5" />
        </button>
      </CardFooter>
    </Card>
  );
}
