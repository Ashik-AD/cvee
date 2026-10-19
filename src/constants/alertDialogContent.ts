import ConfirmDeleteResume from '@/components/dialogs/ConfirmDeleteResume';
import ConfirmDuplicateResume from '@/components/dialogs/ConfirmDuplicateResume';
import type { ReactNode } from 'react';

export type AlertDialogKeys = 'duplicateResume' | 'deleteResume';

export const alertDialogContent: Record<
  AlertDialogKeys,
  (args: any) => ReactNode
> = {
  duplicateResume: ConfirmDuplicateResume,
  deleteResume: ConfirmDeleteResume,
};
