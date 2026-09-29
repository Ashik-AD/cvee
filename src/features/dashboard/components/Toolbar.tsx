import { Flex } from "@/components/common/layout";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

function Toolbar() {
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <Flex className="gap-4 items-center justify-between">
      <span>All Resume</span>

      <Flex className="gap-4 items-center">
        <Flex className="rounded-md overflow-hidden p-0 border">
          <Button
            variant="ghost"
            className={cn(
              "rounded-r-sm border",
              view === "grid" && "bg-muted-foreground/20",
            )}
            onClick={() => setView("grid")}
          >
            <LayoutGrid />
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "rounded-l-sm border",
              view === "list" && "bg-muted-foreground/20",
            )}
            onClick={() => setView("list")}
          >
            <List />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Toolbar;
