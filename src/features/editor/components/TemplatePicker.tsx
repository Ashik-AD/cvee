import { Activity, type MouseEvent } from 'react';
import { Circle, Disc2 } from 'lucide-react';
import { cn } from 'cn';
import { Flex, FlexColumn } from '@/components/common/layout';
import { TemplateSelectOptions } from '@/components/templates';
import { Button } from '@/components/ui/button';
import { useViewSettingState } from '@/store/setting';
import { useEditorActions, useEditorMeta, useEditorSettings } from '../store';
import useMenuActions from '@/hooks/useMenuActions';
import { toast } from '@/components/ui/toast';
import { getErrorMessage } from '@/utils/error';

export default function ResumeTemplatePicker() {
  const { showTemplatePicker } = useEditorSettings();
  return (
    <Activity mode={showTemplatePicker ? 'visible' : 'hidden'}>
      <div className="bg-neutral-0E0E0E absolute bottom-16 left-1/2 z-1 w-[90%] -translate-x-1/2 scrollbar-thin overflow-x-auto border px-4 py-4">
        <Picker />
      </div>

      <div className="bg-neutral-2F3131/50 fixed inset-0 h-screen w-screen" />
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
      if (mode === 'editor') {
        await execMenuAction('view-preview');
      }
    } catch (error) {
      toast.add({
        type: 'error',
        title: getErrorMessage(
          error,
          'Failed to change template. Please try again.',
        ),
      });
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
                'flex flex-col flex-1 h-auto py-2',
                isActive && 'border-emerald-600',
              )}
              onClick={handleTemplateChange}
            >
              {isActive ? <Disc2 className="text-emerald-600" /> : <Circle />}
              <strong>{template.label}</strong>
              <span className="text-neutral-8E9192 text-xs">
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
