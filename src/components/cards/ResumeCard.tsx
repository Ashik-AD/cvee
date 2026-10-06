import { FileText, Pencil } from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";
import { Flex, FlexColumn } from "../common/layout";
import { Badge } from "../ui/badge";
import { resumeStatusStyles } from "@/features/dashboard/constant";
import ResumeDropdownMenu from "@/features/dashboard/components/ResumeDropdownMenu";
import { getLastModifiedTime } from "@/utils/getLastModifiedTime";

type ResumeCardProps = {
  title: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;
  id: string;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
  onPrint: (id: string) => void;
  status: "draft" | "inProgress" | "complete";
};

export function ResumeCard({
  title,
  description,
  createdAt,
  updatedAt,
  id,
  onDelete,
  onPreview,
  onPrint,
  status,
}: ResumeCardProps) {
  const mapStatus = resumeStatusStyles?.[status];
  const lastModified = getLastModifiedTime(updatedAt ?? createdAt ?? "");

  return (
    <Card className="w-full rounded-sm border-border bg-card py-0 shadow-none">
      <CardHeader className="gap-3 px-4 py-1">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <Badge className={cn(mapStatus.className, "rounded-full text-xs")}>
            {mapStatus?.label}
          </Badge>
          <div className="flex items-center justify-end">
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

            <ResumeDropdownMenu
              id={id}
              onPreview={onPreview}
              onPrint={onPrint}
              onDelete={onDelete}
            />
          </div>
        </div>
        {/* Title */}
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-3 flex gap-3 items-start h-full">
        <div>
          <Flex
            className={cn(
              "text-green-600 p-2 items-center justify-center bg-green-500/10 rounded-[0.5rem]",
              mapStatus.className,
            )}
          >
            <FileText />
          </Flex>
        </div>
        <FlexColumn className="gap-4 justify-between flex-1 h-full">
          <FlexColumn className="gap-2">
            <h3 className="text-sm leading-6 font-medium text-foreground">
              {title}
            </h3>

            <p className="text-xs leading-5 text-muted-foreground">
              {description}
            </p>
          </FlexColumn>

          <span className="text-xs text-muted-foreground">{lastModified}</span>
        </FlexColumn>
        {/* Metadata */}
      </CardContent>
    </Card>
  );
}
