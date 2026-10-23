import { useEffect, useState } from 'react';

const messages = [
  'Initializing workspace',
  'Loading resume data',
  'Preparing editor',
];

export default function AppLoading() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStep((current) => (current + 1) % messages.length);
    }, 1200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main
      className="bg-muted fixed inset-0 z-50 flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-xs px-6">
        {/* Status message */}
        <div className="mb-3 flex min-h-5 items-center gap-2">
          <span
            className="size-1.5 shrink-0 rounded-full bg-emerald-500"
            aria-hidden="true"
          />

          <p key={step} className="boot-message font-mono text-xs">
            {messages[step]}...
          </p>

          <span className="boot-cursor font-mono text-xs text-emerald-300">
            _
          </span>
        </div>

        {/* Indeterminate progress */}
        <div
          className="h-1 overflow-hidden rounded-full bg-neutral-200"
          aria-hidden="true"
        >
          <div className="boot-progress h-full w-2/5 rounded-full bg-neutral-900" />
        </div>

        <div
          className="mt-3 flex justify-between font-mono text-[10px]"
          aria-hidden="true"
        >
          <span>PLEASE WAIT</span>
          <span>COOKING...</span>
        </div>
      </div>
    </main>
  );
}
