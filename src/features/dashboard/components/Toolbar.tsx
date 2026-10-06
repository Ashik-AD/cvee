import { Flex } from "@/components/common/layout";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { LayoutGrid, List } from "lucide-react";
import type { ViewMode } from "..";

const viewList = [
  {
    label: "Grid",
    icon: LayoutGrid,
    key: "grid",
  },
  {
    label: "List",
    icon: List,
    key: "list",
  },
];

function Toolbar({
  resumeCount = 0,
  viewMode,
  onViewChange,
}: {
  viewMode: string;
  onViewChange: (mode: ViewMode) => void;
  resumeCount: number;
}) {
  return (
    <Flex className="gap-4 items-center justify-between">
      <span>
        All Resume <small className="text-muted-foreground">({resumeCount})</small>
      </span>

      <Flex className="gap-4 items-center">
        <Flex className="rounded-md overflow-hidden p-0 border">
          {viewList.map((view) => {
            const Icon = view.icon;
            return (
              <Button
                variant="ghost"
                className={cn(
                  "rounded-r-sm border",
                  viewMode === view.key && "bg-muted-foreground/20",
                )}
                onClick={() => onViewChange(view.key as ViewMode)}
                type="button"
              >
                <Icon />
                <span className="sr-only">{view.label} view</span>
              </Button>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Toolbar;
