import { Flex } from '@/components/common/layout';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

type SectionItemActionsProps = {
  onDelete: () => void;
};

function SectionItemActions({ onDelete }: SectionItemActionsProps) {
  return (
    <Flex className="justify-end">
      <Button
        type="button"
        variant="destructive"
        size="icon-sm"
        onClick={onDelete}
      >
        <Trash />
        <span className="sr-only">Remove</span>
      </Button>
    </Flex>
  );
}

export default SectionItemActions;
