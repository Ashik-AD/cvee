import {
  CircleAlert,
  Info,
  type LucideIcon,
  TriangleAlert,
} from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { FlexColumn } from './layout';

type AlertDialogType = 'info' | 'warning' | 'destructive';

const dialogMeta: Record<
  AlertDialogType,
  {
    icon: LucideIcon;
    mediaStyle: string;
    confirmStyle?: string;
  }
> = {
  info: {
    icon: Info,
    mediaStyle: 'bg-blue-500/10 text-blue-500',
  },
  warning: {
    icon: TriangleAlert,
    mediaStyle: 'bg-amber-500/10 text-amber-500',
  },
  destructive: {
    icon: CircleAlert,
    mediaStyle: 'bg-red-500/10 text-destructive',
    confirmStyle:
      'bg-destructive! text-destructive-foreground hover:bg-destructive/90',
  },
};

interface ActionInteruptDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  type?: AlertDialogType;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export function ActionInteruptDialog(props: ActionInteruptDialogProps) {
  const {
    open,
    onOpenChange,
    title,
    description,
    type = 'info',
    onConfirm,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    isLoading,
  } = props;

  const meta = dialogMeta[type];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex items-start">
          <AlertDialogMedia
            className={cn(meta.mediaStyle, 'rounded-full size-6 mb-0')}
          >
            <meta.icon size={16} />
          </AlertDialogMedia>
          <FlexColumn className="justify-start!">
            <AlertDialogTitle className="text-left text-sm font-semibold">
              <span className="text-muted-foreground">//</span> {title}
            </AlertDialogTitle>
            {description && (
              <AlertDialogDescription className="text-left">
                {description}
              </AlertDialogDescription>
            )}
          </FlexColumn>
        </AlertDialogHeader>
        <AlertDialogFooter className="items-center bg-transparent">
          <AlertDialogCancel disabled={isLoading}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(meta.confirmStyle)}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
