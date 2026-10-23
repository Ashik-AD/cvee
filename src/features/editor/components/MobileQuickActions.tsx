import { Flex } from '@/components/common/layout';
import type { ActionKey } from '@/constants/menubar';
import useMenuActions from '@/hooks/useMenuActions';
import {
  Download,
  Eye,
  Keyboard,
  Printer,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { useViewSettingState } from '@/store/setting';
import { toast } from '@/components/ui/toast';
import { getErrorMessage } from '@/utils/error';

const ACTIONS: { label: string; icon: LucideIcon; actionKey: ActionKey }[] = [
  {
    label: 'Template',
    actionKey: 'change-template',
    icon: Star,
  },
  {
    label: 'Print',
    actionKey: 'print-pdf',
    icon: Printer,
  },
  {
    label: 'Export',
    actionKey: 'export-json',
    icon: Download,
  },
];

function MobileQuickActions() {
  const { execMenuAction } = useMenuActions();
  const { mode } = useViewSettingState();

  async function handleQuickAction(key: ActionKey) {
    try {
      if ((key === 'print-cv' || key === 'print-pdf') && mode === 'editor') {
        await execMenuAction('view-preview');
      }
      await execMenuAction(key);
    } catch (error) {
      toast.add({
        type: 'error',
        title: getErrorMessage(error),
      });
    }
  }

  return (
    <Flex className="bg-neutral-1C1B1B hidden-on-print absolute bottom-2 left-1/2 -translate-x-1/2 items-center gap-2 rounded-full border p-0.5">
      <button
        type="button"
        className="hover:bg-neutral-0E0E0E flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full p-2 focus-visible:ring"
        onClick={() =>
          handleQuickAction(mode === 'editor' ? 'view-preview' : 'view-editor')
        }
      >
        {mode === 'editor' ? <Eye size={18} /> : <Keyboard size={18} />}
        <span className="hidden text-sm min-[26rem]:inline-flex">
          {mode === 'editor' ? 'Preview' : 'Editor'}
        </span>
      </button>
      {ACTIONS.map((action) => {
        return (
          <button
            type="button"
            key={action.actionKey}
            className="hover:bg-neutral-0E0E0E flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full p-2 focus-visible:ring"
            onClick={() => handleQuickAction(action.actionKey)}
          >
            <action.icon size={18} />
            <span className="hidden text-sm min-[26rem]:inline-flex">
              {action.label}
            </span>
          </button>
        );
      })}
    </Flex>
  );
}

export default MobileQuickActions;
