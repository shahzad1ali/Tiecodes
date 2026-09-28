"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastTone = "success" | "error" | "info";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
};

type ToastInput = {
  title: string;
  description?: string;
  tone?: ToastTone;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toneStyles: Record<ToastTone, string> = {
  success:
    "border-[color:var(--c-success)]/40 bg-[color:var(--c-success-soft)] text-[color:var(--c-ink)] shadow-[color:var(--c-success)]/10",
  error:
    "border-[color:var(--c-danger)]/40 bg-[color:var(--c-danger)]/10 text-[color:var(--c-ink)] shadow-[color:var(--c-danger)]/10",
  info:
    "border-[color:var(--c-blue)]/35 bg-[color:var(--c-sky)] text-[color:var(--c-navy)] shadow-[color:var(--c-blue)]/10",
};

const toneIcon: Record<ToastTone, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: CircleAlert,
  info: Info,
};

const toneIconClass: Record<ToastTone, string> = {
  success: "text-[color:var(--c-success)]",
  error: "text-[color:var(--c-danger)]",
  info: "text-[color:var(--c-blue)]",
};

const toneDescriptionClass: Record<ToastTone, string> = {
  success: "text-[color:var(--c-success)]/80",
  error: "text-[color:var(--c-danger)]/80",
  info: "text-[color:var(--c-slate)]",
};

const toneCloseClass: Record<ToastTone, string> = {
  success:
    "text-[color:var(--c-success)]/70 hover:bg-[color:var(--c-success-soft)] hover:text-[color:var(--c-ink)]",
  error:
    "text-[color:var(--c-danger)]/70 hover:bg-[color:var(--c-danger)]/10 hover:text-[color:var(--c-ink)]",
  info: "text-[color:var(--c-blue)]/70 hover:bg-[color:var(--c-sky)] hover:text-[color:var(--c-blue)]",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const item: ToastItem = {
        id,
        title: input.title,
        description: input.description,
        tone: input.tone ?? "info",
      };
      setItems((current) => [...current, item].slice(-4));
      window.setTimeout(() => dismiss(id), 3500);
    },
    [dismiss]
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toast,
      success: (title, description) => toast({ title, description, tone: "success" }),
      error: (title, description) => toast({ title, description, tone: "error" }),
      info: (title, description) => toast({ title, description, tone: "info" }),
    }),
    [toast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className="flex w-full max-w-md flex-col gap-2">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const Icon = toneIcon[item.tone];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg",
                    toneStyles[item.tone]
                  )}
                >
                  <Icon
                    className={cn("mt-0.5 size-5 shrink-0", toneIconClass[item.tone])}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{item.title}</p>
                    {item.description ? (
                      <p className={cn("mt-0.5 text-xs", toneDescriptionClass[item.tone])}>
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismiss(item.id)}
                    className={cn(
                      "cursor-pointer rounded-lg p-1 transition-colors",
                      toneCloseClass[item.tone]
                    )}
                    aria-label="Dismiss notification"
                  >
                    <X className="size-4" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
