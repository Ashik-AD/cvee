import { useEffect, useRef } from "react";

export default function useDebounceCallback<TArgs>(
  cb: (args: TArgs) => void,
  duration?: number,
) {
  const timerRef = useRef<number | null>(null);
  const cbRef = useRef(cb);

  function clearTimer() {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  useEffect(() => {
    return clearTimer;
  }, []);

  return (args?: unknown) => {
    clearTimer();

    timerRef.current = setTimeout(() => {
      cbRef.current(args as TArgs);
      timerRef.current = null;
    }, duration ?? 200);
  };
}
