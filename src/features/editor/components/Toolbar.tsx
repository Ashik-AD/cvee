import { Flex, Grid } from "@/components/common/layout";
import { Button } from "@/components/ui/button";
import usePrintResume from "@/hooks/usePrintResume";
import { FileUser, Printer } from "lucide-react";
import { useEditorActions, useEditorMeta, useEditorSettings } from "../store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TemplateSelectOptions,
  type CVTemplates,
} from "@/components/templates";
import { Slider } from "@/components/ui/slider";

function Toolbar() {
  const onPrint = usePrintResume();
  const meta = useEditorMeta();
  const { updateMeta } = useEditorActions();
  const { zoomLevel } = useEditorSettings();
  const { setEditorSettings } = useEditorActions();

  function handleChangeTemplate(template?: CVTemplates | null) {
    if (template) {
      updateMeta({ template });
    }
  }

  // Set preview document view
  function handleZoomLevelChange(val: number | readonly number[]) {
    let level;

    if (Array.isArray(val)) {
      level = val[0];
    } else {
      level = val;
    }

    setEditorSettings({
      zoomLevel: level,
    });
  }

  return (
    <Grid className="editor-toolbar grid-cols-2 px-1 border-b border-t p-1 print:hidden!">
      <Flex>
        {meta.title && (
          <Flex className="gap-1 items-center">
            <FileUser size={18} className="text-neutral-C4C7C8" />
            <span className="text-sm">{meta.title}</span>
          </Flex>
        )}
      </Flex>

      {/* Preview toolbar */}
      <Flex className="justify-end items-center gap-3">
        <div className="hidden md:inline-block">
          <Select
            items={TemplateSelectOptions}
            value={meta.template}
            onValueChange={handleChangeTemplate}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Templates</SelectLabel>
                {TemplateSelectOptions.map((option) => {
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Flex className="items-center gap-1">
          <span className="text-xs">{zoomLevel}%</span>
          <Slider
            defaultValue={[zoomLevel]}
            step={1}
            max={100}
            min={10}
            className="min-w-16 max-w-24 w-full"
            onValueChange={(val) => handleZoomLevelChange(val)}
          />
        </Flex>
        <Button
          onClick={onPrint}
          variant="outline"
          size="sm"
          className="rounded-none hidden md:flex"
        >
          Export
          <Printer />
        </Button>
      </Flex>
    </Grid>
  );
}

export default Toolbar;
