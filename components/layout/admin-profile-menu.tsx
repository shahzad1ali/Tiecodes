"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminProfileMenu() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void fetch("/api/v1/auth/me", { credentials: "include" })
      .then((response) => (response.ok ? response.json() : null))
      .then((user: { email?: string } | null) => {
        if (user?.email) setEmail(user.email);
      });
  }, []);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  async function logout() {
    setOpen(false);
    await fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/");
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Admin menu"
        className={cn(
          "inline-flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border",
          "bg-primary/10 text-primary shadow-sm transition-colors",
          "hover:border-primary/50 hover:bg-primary/15",
          open && "border-primary/50 bg-primary/15"
        )}
      >
        <UserRound className="size-5" aria-hidden />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-popover shadow-lg"
        >
          <div className="border-b border-border px-3 py-3">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Profile
            </p>
            <p className="mt-1 flex items-start gap-2 text-sm font-medium break-all text-foreground">
              <UserRound className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {email || "Admin"}
            </p>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => void logout()}
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="size-4" aria-hidden />
            Log out
          </button>
        </div>
      ) : null}
    </div>
  );
}
