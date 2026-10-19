import type { ActionKey } from '@/constants/menubar';
import { usePathname } from 'wouter/use-browser-location';

export default function useMenu() {
  const pathname = usePathname();
  const isEditor = pathname.startsWith('/editor');

  function isMenuActionEnabled(action: ActionKey) {
    switch (action) {
      case 'duplicate-cv':
      case 'rename-cv':
      case 'delete-cv':
      case 'print-pdf':
      case 'add-section':
      case 'edit-section':
      case 'duplicate-section':
      case 'delete-section':
      case 'move-section-up':
      case 'move-section-down':
      case 'toggle-section-visibility':
      case 'save':
      case 'view-editor':
      case 'view-preview':
      case 'view-split':
      case 'view-desktop':
      case 'view-mobile':
      case 'print-cv':
      case 'print-preview':
        return isEditor;
      default:
        return true;
    }
  }

  return { isMenuActionEnabled } as const;
}
