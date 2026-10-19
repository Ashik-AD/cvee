import { useLayoutEffect } from 'react';
import { useResizeObserver } from './useResizeObserver';

export function useWindowResize() {
  const { resizeWidth, resizeElement } = useResizeObserver();

  useLayoutEffect(() => {
    resizeElement.current = document.body;
  }, []);

  return { width: resizeWidth } as const;
}
