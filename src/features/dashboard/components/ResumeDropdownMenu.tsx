import { Copy, Eye, MoreHorizontal, Printer, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from 'cn';
import { buttonVariants } from '@/components/ui/button';

type ResumeDropdownMenuProps = {
  id: string;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
  onPrint: (id: string) => void;
};

function ResumeDropdownMenu({
  id,
  onDelete,
  onPrint,
  onPreview,
}: ResumeDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'size-7 rounded-xs text-muted-foreground hover:bg-muted hover:text-foreground',
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
        <DropdownMenuItem variant="destructive" onClick={() => onDelete(id)}>
          <Trash2 className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ResumeDropdownMenu;
