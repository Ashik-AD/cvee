import { useEffect, useRef, useState } from 'react';

export function useResizeObserver(
  onResize?: (entries: ResizeObserverEntry[]) => void,
) {
  const [resizeWidth, setResizeWidth] = useState<number | null>(null);
  const resizeEleRef = useRef<HTMLElement | null>(null);
  const cbRef = useRef(onResize);

  useEffect(() => {
    cbRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    let eleRef = resizeEleRef.current;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          setResizeWidth(entry.contentBoxSize[0].inlineSize);
        }
      }
      cbRef.current?.(entries);
    });

    if (eleRef) {
      observer.observe(eleRef);
    }

    return () => {
      if (eleRef) {
        observer.disconnect();
      }
    };
  }, []);

  return { resizeWidth, resizeElement: resizeEleRef } as const;
}
