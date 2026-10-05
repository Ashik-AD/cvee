import { Activity, type MouseEvent } from "react";
import { Circle, Disc2 } from "lucide-react";
import { cn } from "cn";
import { Flex, FlexColumn } from "@/components/common/layout";
import { TemplateSelectOptions } from "@/components/templates";
import { Button } from "@/components/ui/button";
import { useViewSettingState } from "@/store/setting";
import { useEditorActions, useEditorMeta, useEditorSettings } from "../store";
import useMenuActions from "@/hooks/useMenuActions";

export default function ResumeTemplatePicker() {
  const { showTemplatePicker } = useEditorSettings();
  return (
    <Activity mode={showTemplatePicker ? "visible" : "hidden"}>
      <div className="absolute bg-neutral-0E0E0E bottom-16 w-[90%] overflow-x-auto -translate-x-1/2 left-1/2 px-4 py-4 border scrollbar-thin z-1">
        <Picker />
      </div>

      <div className="fixed h-screen w-screen inset-0 bg-neutral-2F3131/50" />
    </Activity>
  );
}

function Picker() {
  const { mode } = useViewSettingState();
  const { updateMeta, setEditorSettings } = useEditorActions();
  const { template: selectedTemplate } = useEditorMeta();
  const { execMenuAction } = useMenuActions();

  async function handleTemplateChange(event: MouseEvent<HTMLButtonElement>) {
    // template name from clicked button
    const value = event.currentTarget.name;
    try {
      if (mode === "editor") {
        await execMenuAction("view-preview");
      }
    } catch (error) {
      console.log(error);
    } finally {
      updateMeta({
        template: value,
      });
    }
  }

  function handleClose() {
    setEditorSettings({
      showTemplatePicker: false,
    });
  }

  return (
    <FlexColumn className="gap-4">
      <Flex className="gap-2">
        {TemplateSelectOptions?.map((template) => {
          const isActive = template.value === selectedTemplate;
          return (
            <Button
              key={template.value}
              variant="outline"
              name={template.value}
              className={cn(
                "flex flex-col flex-1 h-auto py-2",
                isActive && "border-emerald-600",
              )}
              onClick={handleTemplateChange}
            >
              {isActive ? <Disc2 className="text-emerald-600" /> : <Circle />}
              <strong>{template.label}</strong>
              <span className="text-xs text-neutral-8E9192">
                {template.description}
              </span>
            </Button>
          );
        })}
      </Flex>

      <Flex>
        <Button
          variant="secondary"
          className="sticky left-0"
          onClick={handleClose}
        >
          Close
        </Button>
      </Flex>
    </FlexColumn>
  );
}
