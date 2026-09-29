import {
  Copy,
  Eye,
  FileText,
  MoreHorizontal,
  Pencil,
  Printer,
  Trash2,
} from "lucide-react";

import { cn } from "cn";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";
import { Flex, FlexColumn } from "../common/layout";
import { Badge } from "../ui/badge";

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

const Status = {
  draft: {
    label: "Draft",
    className: "bg-violet-600/10 text-violet-700",
  },
  inProgress: {
    label: "In Progress",
    className: "bg-blue-600/10 text-blue-700",
  },
  complete: {
    label: "Complete",
    className: "bg-emerald-500/10 text-emerald-400",
  },
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
  const mapStatus = Status?.[status];
  const docDate = updatedAt || createdAt;
  const modifiedDate = docDate ? new Date(docDate).toLocaleDateString() : null;

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

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-7 rounded-xs text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <MoreHorizontal className="size-4" />
                <span className="sr-only">More options</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onPreview(id)}>
                  <Eye className="mr-2 size-4" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPrint(id)}>
                  <Printer className="mr-2 size-4" />
                  Print
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 size-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete(id)}
                >
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <h3 className="text-base leading-6 font-medium text-foreground">
              {title}
            </h3>

            <p className="text-xs leading-5 text-muted-foreground">
              {description}
            </p>
          </FlexColumn>

          <Flex>
            {modifiedDate && (
              <span className="text-muted-foreground">
                Modified {modifiedDate} ago
              </span>
            )}
          </Flex>
        </FlexColumn>
        {/* Metadata */}
      </CardContent>
    </Card>
  );
}
