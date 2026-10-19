import { useAlertDialogState } from '@/store/alert-dialog';
import { alertDialogContent } from '@/constants/alertDialogContent';

function AlertDialogsRender() {
  const { isOpen, alertName, alertProps } = useAlertDialogState();

  if (!isOpen) return;
  if (!alertName) return;

  const AlertDialog = alertDialogContent?.[alertName];
  const props = alertProps ?? {};

  return <AlertDialog {...props} />;
}

export default AlertDialogsRender;
