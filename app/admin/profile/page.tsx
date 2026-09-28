"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/components/providers/toast-provider";

const apiUrl = "/api/v1";
const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 350;
const MIN_SEARCH_WORDS = 2;

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
};

type AdminListResponse = {
  items: Project[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export default function AdminProfilePage() {
  const router = useRouter();
  const { success, error } = useToast();

  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [draftQuery, setDraftQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipAutoSearchRef = useRef(true);

  const load = useCallback(async (nextPage: number, nextQuery: string) => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(nextPage),
      pageSize: String(PAGE_SIZE),
    });
    if (nextQuery.trim()) params.set("q", nextQuery.trim());

    const response = await fetch(`${apiUrl}/projects/admin?${params}`, {
      credentials: "include",
    });

    if (response.status === 401) {
      router.replace("/");
      return;
    }

    if (!response.ok) {
      error("Could not load projects", "Please try again.");
      setLoading(false);
      return;
    }

    const data = (await response.json()) as AdminListResponse;
    setItems(data.items ?? []);
    setTotal(data.total ?? 0);
    setPage(data.page ?? nextPage);
    setTotalPages(data.totalPages ?? 1);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable toast helpers
  }, [router]);

  useEffect(() => {
    void (async () => {
      const me = await fetch(`${apiUrl}/auth/me`, { credentials: "include" });
      if (!me.ok) {
        router.replace("/");
        return;
      }
      await load(1, "");
      setReady(true);
      skipAutoSearchRef.current = false;
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only auth gate
  }, [router]);

  useEffect(() => {
    if (!ready || skipAutoSearchRef.current) return;

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    searchTimerRef.current = setTimeout(() => {
      const trimmed = draftQuery.trim();
      const words = wordCount(trimmed);

      if (words >= MIN_SEARCH_WORDS) {
        setQuery(trimmed);
        void load(1, trimmed);
        return;
      }

      setQuery((prev) => {
        if (prev) void load(1, "");
        return "";
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [draftQuery, load, ready]);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    const trimmed = draftQuery.trim();
    if (wordCount(trimmed) < MIN_SEARCH_WORDS && trimmed) return;
    setQuery(trimmed);
    void load(1, trimmed);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const response = await fetch(`${apiUrl}/projects/${deleteTarget.id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.status === 401) {
      router.replace("/");
      setDeleting(false);
      return;
    }

    if (!response.ok) {
      error("Could not delete project", deleteTarget.title);
      setDeleting(false);
      setDeleteTarget(null);
      return;
    }

    success("Project deleted", deleteTarget.title);
    setDeleteTarget(null);
    setDeleting(false);

    const nextPage =
      items.length === 1 && page > 1 ? page - 1 : page;
    await load(nextPage, query);
  }

  if (!ready) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm text-muted-foreground">Checking admin access…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl font-semibold">Profile</h1>
          <p className="mt-2 text-muted-foreground">
            Search, edit, and delete portfolio projects.
          </p>
        </div>
        <Link
          href="/admin/projects"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="size-4" aria-hidden />
          Add project
        </Link>
      </div>

      <form
        onSubmit={onSearch}
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={draftQuery}
            onChange={(event) => setDraftQuery(event.target.value)}
            placeholder="Type at least 2 words to search…"
            className="w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-10 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        {query || draftQuery ? (
          <button
            type="button"
            onClick={() => {
              if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
              skipAutoSearchRef.current = true;
              setDraftQuery("");
              setQuery("");
              void load(1, "").finally(() => {
                skipAutoSearchRef.current = false;
              });
            }}
            className="cursor-pointer rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Clear
          </button>
        ) : null}
      </form>

      <p className="mt-4 text-sm text-muted-foreground">
        {loading
          ? "Loading…"
          : total === 0
            ? query
              ? "No projects match your search."
              : "No projects yet."
            : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, total)} of ${total}`}
      </p>

      <div className="mt-4 space-y-3">
        {items.map((project) => (
          <div
            key={project.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm transition-colors hover:border-primary/25"
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{project.title}</p>
              <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                {project.summary || project.description}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {project.status}
                {project.featured ? " · Featured" : ""} · /{project.slug}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/projects?edit=${project.id}`}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-primary bg-transparent px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Pencil className="size-3.5" aria-hidden />
                Edit
              </Link>
              <button
                type="button"
                onClick={() => setDeleteTarget(project)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-destructive bg-transparent px-3.5 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-[color:var(--c-white)]"
              >
                <Trash2 className="size-3.5" aria-hidden />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={loading || page <= 1}
            onClick={() => void load(page - 1, query)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="size-4" aria-hidden />
            Previous
          </button>
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>
          <button
            type="button"
            disabled={loading || page >= totalPages}
            onClick={() => void load(page + 1, query)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      ) : null}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete project?"
        description={
          deleteTarget
            ? `“${deleteTarget.title}” will be permanently removed. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete project"
        busy={deleting}
        onCancel={() => {
          if (!deleting) setDeleteTarget(null);
        }}
        onConfirm={() => void confirmDelete()}
      />
    </main>
  );
}
