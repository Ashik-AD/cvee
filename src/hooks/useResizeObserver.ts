import { useEffect, useRef, useState } from "react";

export function useResizeObserver(
  onResize?: (entries: ResizeObserverEntry[]) => void,
) {
  const [resizeWidth, setResizeWidth] = useState<number | null>(null);
  const resizeEleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          setResizeWidth(entry.contentBoxSize[0].inlineSize);
        }
      }
      onResize && onResize(entries);
    });

    if (resizeEleRef.current) {
      observer.observe(resizeEleRef.current);
    }

    return () => {
      if (resizeEleRef.current) {
        observer.unobserve(resizeEleRef.current);
      }
    };
  }, []);

  return { resizeWidth, resizeElement: resizeEleRef } as const;
}
