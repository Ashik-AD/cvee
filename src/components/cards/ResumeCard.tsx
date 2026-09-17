import { MoreHorizontal, Pencil, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "wouter";

type ResumeCardProps = {
  title: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;
  id: string;
};

export function ResumeCard({
  title,
  description,
  createdAt,
  updatedAt,
  id,
}: ResumeCardProps) {
  return (
    <Card className="w-full rounded-sm border-border bg-card py-0 shadow-none">
      <CardHeader className="gap-3 px-4 py-3">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="rounded-xs border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] leading-4 tracking-wide text-foreground uppercase">
              Default
            </Badge>

            <span className="font-mono text-xs leading-4 text-muted-foreground">
              cv-prod-01
            </span>
          </div>

          <div className="flex items-center">
            <Link href={`/editor?id=${id}`}>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 rounded-xs text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Pencil className="size-3.5" />
                <span className="sr-only">Edit resume</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="size-7 rounded-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <MoreHorizontal className="size-4" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-0.5">
          <h3 className="text-base leading-6 font-medium text-foreground">
            {title}
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-3">
        {/* Document preview */}
        <div className="rounded-xs border border-border bg-background px-1.5 pt-2 pb-1.5">
          <div className="flex h-24 flex-col gap-1.5 overflow-hidden bg-document p-2">
            <div className="h-2 w-28 bg-document-heading" />

            <div className="h-1 w-44 bg-document-muted" />

            <div className="flex h-[5px] items-center py-0.5">
              <div className="h-px w-full bg-document-guide" />
            </div>

            <div className="flex flex-1 gap-2">
              <div className="flex flex-1 flex-col gap-1">
                <div className="h-1.5 w-56 bg-document-foreground" />
                <div className="h-1 w-full bg-document-guide" />
                <div className="h-1 w-52 bg-document-guide" />
              </div>

              <div className="flex w-12 flex-col gap-1">
                <div className="h-1 w-full bg-document-muted" />
                <div className="h-1 w-full bg-document-guide" />
              </div>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <dl className="space-y-2 border-t border-border pt-2 font-mono text-xs leading-4">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Template</dt>
            <dd className="text-foreground">Minimal (Single)</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Format</dt>
            <dd className="text-foreground">US Letter / A4</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Schema</dt>
            <dd className="text-foreground">v2.4 valid</dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border px-4 py-2 text-xs">
        <span className="text-muted-foreground">
          Modified {new Date(updatedAt ?? createdAt).toTimeString()} ago
        </span>

        <CheckCircle2 className="size-2.5 text-primary" />
      </CardFooter>
    </Card>
  );
}
