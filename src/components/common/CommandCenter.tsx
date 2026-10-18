import { useCommandCenterState, useCommonActions } from "@/store/common";
import { Activity, useEffect, type MouseEvent } from "react";
import { Flex, FlexCenter, FlexColumn, Grid } from "./layout";
import Searchbar from "./Searchbar";
import { Separator } from "../ui/separator";
import {
  Download,
  FileText,
  Import,
  Keyboard,
  Plus,
  type LucideIcon,
} from "lucide-react";
import type { ActionKey, MenuAction } from "@/constants/menubar";
import { useSearchApp } from "@/hooks/useSearchApp";
import type { ResumePopulate } from "@/lib/model/resume";
import { Link } from "wouter";
import { Button } from "../ui/button";
import { Kbd } from "../ui/kbd";
import { toast } from "../ui/toast";
import { getErrorMessage } from "@/utils/error";
import useMenuActions from "@/hooks/useMenuActions";

function CommandCenter() {
  const { showCommandCenter } = useCommandCenterState();
  const { toggleCommandCenter } = useCommonActions();

  return (
    <Activity mode={showCommandCenter ? "visible" : "hidden"}>
      <Flex className="fixed inset-0 p-10 bg-muted/5 backdrop-blur-[2px]">
        <CommandCenterContent />
        <div
          className="absolute inset-0 h-full w-full"
          onClick={toggleCommandCenter}
          onKeyUp={(e) => {
            if (e.key === "Escape" || e.key === "Enter") toggleCommandCenter();
          }}
        />
      </Flex>
    </Activity>
  );
}

function CommandCenterContent() {
  const { toggleCommandCenter } = useCommonActions();
  const { result, onSearch, searchTerm } = useSearchApp();

  function handleEcapeKey(e: KeyboardEvent) {
    if (e.key === "Escape") toggleCommandCenter();
  }

  useEffect(() => {
    window.addEventListener("keyup", handleEcapeKey);

    return () => {
      window.removeEventListener("keyup", handleEcapeKey);
    };
  }, []);

  function handleSearchChange(val: string) {
    onSearch(val);
  }

  const notFound =
    result &&
    result?.actions &&
    result.actions?.length === 0 &&
    result.resumes &&
    result?.resumes?.length === 0;

  return (
    <div className="max-h-[90svh] h-auto bg-neutral-0E0E0E border max-w-2xl mx-auto overflow-y-auto scrollbar-thin rounded-sm z-1">
      <FlexColumn className="gap-4 pt-0! p-4">
        <FlexColumn className="sticky top-0 gap-3 bg-neutral-0E0E0E pt-4">
          <Flex className="gap-1 items-center">
            <Searchbar
              onChange={handleSearchChange}
              className="flex-1 border-0 bg-transparent rounded-none focus-within:border-transparent! focus-within:ring-0!"
              focus
            />
            <Kbd>ESC</Kbd>
          </Flex>
          <Separator />
        </FlexColumn>

        {notFound && searchTerm && (
          <FlexCenter className="text-muted-foreground">
            No results for &nbsp;{" "}
            <span className="text-white">"{searchTerm}"</span>
          </FlexCenter>
        )}

        <FlexColumn className="gap-6">
          <FlexColumn className="gap-3">
            <p className="text-sm font-semibold text-muted-foreground">
              Quick Actions
            </p>
            <QuickActions />
          </FlexColumn>

          {result?.resumes && result?.resumes.length > 0 && (
            <ResumeResults resumes={result.resumes} />
          )}
          {result?.actions && result?.actions.length > 0 && (
            <MenuActionResult actions={result.actions} />
          )}
        </FlexColumn>
      </FlexColumn>
    </div>
  );
}

function ResumeResults({ resumes }: { resumes: ResumePopulate[] }) {
  return (
    <FlexColumn className="gap-4">
      <p className="text-sm font-semibold text-muted-foreground">Resume</p>

      <FlexColumn className="gap-2">
        {resumes?.map((resume) => {
          return (
            <Link
              href={`/editor?id=${resume.id}`}
              className="flex bg-neutral-171717 p-2 rounded-sm hover:bg-neutral-1C1917 hover:shadow-md gap-2"
              key={resume.id}
            >
              <FileText size={18} className="text-emerald-600" />
              <span className="flex flex-col gap-1">
                <strong className="text-sm font-medium truncate">
                  {resume.meta?.title}
                </strong>
                <span className="text-xs text-muted-foreground line-clamp-2">
                  {resume?.meta?.description}
                </span>
              </span>
            </Link>
          );
        })}
      </FlexColumn>
    </FlexColumn>
  );
}

function MenuActionResult({ actions }: { actions: MenuAction[] }) {
  return (
    <FlexColumn className="gap-4">
      <p className="text-sm font-semibold text-muted-foreground">
        Menu Actions
      </p>
      <Grid className="gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {actions?.map((action) => {
          return (
            <Button
              className="flex flex-col p-2 rounded-sm hover:shadow-md gap-1 h-auto text-xs!"
              variant="secondary"
              key={action.key}
            >
              <action.icon />
              {action.label}
              <span className="text-xs text-muted-foreground mt-1">
                {action.cmd}
              </span>
            </Button>
          );
        })}
      </Grid>
    </FlexColumn>
  );
}

type QuickAction = {
  label: string;
  description: string;
  icon: LucideIcon;
  actionKey: ActionKey;
};

const QUICK_ACTIONS: Array<QuickAction> = [
  {
    label: "Create Cv",
    description: "Create new CV",
    icon: Plus,
    actionKey: "new-cv",
  },
  {
    label: "Import JSON",
    description: "Import existing CV JSON file.",
    icon: Import,
    actionKey: "import-json",
  },
  {
    label: "Export JSON",
    description: "Export all CV JSON file.",
    icon: Download,
    actionKey: "export-all-json",
  },
  {
    label: "Keyboard Shortcuts",
    description: "View all keyboard shortcuts",
    icon: Keyboard,
    actionKey: "keyboard-shortcuts",
  },
];

function QuickActions() {
  const { execMenuAction } = useMenuActions();
  const { toggleCommandCenter } = useCommonActions();

  async function handleExecAction(event: MouseEvent<HTMLButtonElement>) {
    try {
      const actionKey = event.currentTarget.dataset.key as ActionKey;
      await execMenuAction(actionKey);
      toggleCommandCenter()
    } catch (error) {
      toast.add({
        type: "error",
        title: getErrorMessage(error),
      });
    }
  }

  return (
    <Grid className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {QUICK_ACTIONS.map((action) => {
        return (
          <button
            key={action.actionKey}
            className="flex flex-col gap-4 border rounded-md px-2 py-3 hover:bg-neutral-2A2A2A/50 cursor-pointer justify-center items-center"
            data-key={action.actionKey}
            onClick={handleExecAction}
          >
            <action.icon className="text-neutral-400" />
            <span className="flex flex-col gap-2">
              <span className="text-center text-sm">{action.label}</span>
              <span className="text-xs text-center text-muted-foreground">
                {action.description}
              </span>
            </span>
          </button>
        );
      })}
    </Grid>
  );
}

export default CommandCenter;
