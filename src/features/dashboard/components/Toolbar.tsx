import { Flex } from '@/components/common/layout';
import { Button } from '@/components/ui/button';
import { cn } from 'cn';
import { LayoutGrid, List } from 'lucide-react';
import type { ViewMode } from '..';

const viewList = [
  {
    label: 'Grid',
    icon: LayoutGrid,
    key: 'grid',
  },
  {
    label: 'List',
    icon: List,
    key: 'list',
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
    <Flex className="items-center justify-between gap-4">
      <span>
        All Resume{' '}
        <small className="text-muted-foreground">({resumeCount})</small>
      </span>

      <Flex className="items-center gap-4">
        <Flex className="overflow-hidden rounded-md border p-0">
          {viewList.map((view) => {
            const Icon = view.icon;
            return (
              <Button
                variant="ghost"
                className={cn(
                  'rounded-r-sm border',
                  viewMode === view.key && 'bg-muted-foreground/20',
                )}
                onClick={() => onViewChange(view.key as ViewMode)}
                type="button"
                key={view.key}
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
