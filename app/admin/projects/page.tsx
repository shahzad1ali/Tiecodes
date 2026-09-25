"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/components/providers/toast-provider";

const apiUrl = "/api/v1";

type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  clientName?: string | null;
  industry?: string | null;
  liveUrl?: string | null;
  technologies?: unknown;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
  sortOrder: number;
};

type FormState = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  clientName: string;
  industry: string;
  liveUrl: string;
  technologies: string;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
  sortOrder: string;
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  clientName: "",
  industry: "",
  liveUrl: "",
  technologies: "",
  status: "DRAFT",
  featured: false,
  sortOrder: "0",
};

function technologiesToText(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").join(", ");
  }
  if (typeof value === "string") return value;
  return "";
}

function toForm(project: Project): FormState {
  return {
    title: project.title ?? "",
    slug: project.slug ?? "",
    summary: project.summary ?? "",
    description: project.description ?? "",
    clientName: project.clientName ?? "",
    industry: project.industry ?? "",
    liveUrl: project.liveUrl ?? "",
    technologies: technologiesToText(project.technologies),
    status: project.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    featured: Boolean(project.featured),
    sortOrder: String(project.sortOrder ?? 0),
  };
}

export default function AdminProjectsPage() {
  const router = useRouter();
  const { success, error, info } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    const response = await fetch(`${apiUrl}/projects/admin`, {
      credentials: "include",
    });
    if (response.status === 401) {
      router.replace("/");
      return;
    }
    if (response.ok) setProjects(await response.json());
  }

  useEffect(() => {
    void (async () => {
      const me = await fetch(`${apiUrl}/auth/me`, { credentials: "include" });
      if (!me.ok) {
        router.replace("/");
        return;
      }
      await load();
      setReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only auth gate
  }, [router]);

  function reset() {
    setEditingId(null);
    setForm(emptyForm);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function startEdit(project: Project) {
    setEditingId(project.id);
    setForm(toForm(project));
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    info("Editing project", project.title);
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      summary: form.summary.trim(),
      description: form.description.trim(),
      clientName: form.clientName.trim() || undefined,
      industry: form.industry.trim() || undefined,
      liveUrl: form.liveUrl.trim() || undefined,
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      status: form.status,
      featured: form.featured,
      sortOrder: Number(form.sortOrder) || 0,
    };

    const response = await fetch(
      editingId ? `${apiUrl}/projects/${editingId}` : `${apiUrl}/projects`,
      {
        method: editingId ? "PATCH" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (response.status === 401) {
      router.replace("/");
      setSaving(false);
      return;
    }

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      error("Could not save project", body?.error ?? "Check the fields and try again.");
      setSaving(false);
      return;
    }

    const project = (await response.json()) as Project;

    if (image) {
      const data = new FormData();
      data.append("file", image);
      const upload = await fetch(`${apiUrl}/projects/${project.id}/images`, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      if (!upload.ok) {
        error("Project saved", "Image upload failed. You can try uploading again.");
        await load();
        reset();
        setSaving(false);
        return;
      }
    }

    success(
      editingId ? "Project updated" : "Project created",
      project.title
    );
    reset();
    await load();
    setSaving(false);
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

    if (editingId === deleteTarget.id) reset();
    success("Project deleted", deleteTarget.title);
    setDeleteTarget(null);
    setDeleting(false);
    await load();
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
      <div>
        <h1 className="font-heading text-4xl font-semibold">Portfolio admin</h1>
        <p className="mt-2 text-muted-foreground">
          Only the signed-in TieCodes admin can manage these projects.
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={submit}
        className="mt-10 grid gap-4 rounded-xl border border-border/60 bg-card p-6 shadow-sm md:grid-cols-2"
      >
        <h2 className="font-heading text-xl font-semibold md:col-span-2">
          {editingId ? "Edit project" : "Add project"}
        </h2>
        {(
          [
            "title",
            "slug",
            "summary",
            "clientName",
            "industry",
            "liveUrl",
            "technologies",
            "sortOrder",
          ] as const
        ).map((field) => (
          <input
            key={field}
            required={["title", "slug", "summary"].includes(field)}
            type={field === "sortOrder" ? "number" : "text"}
            value={form[field]}
            onChange={(event) =>
              setForm({ ...form, [field]: event.target.value })
            }
            placeholder={
              field === "technologies" ? "React, Next.js, MySQL" : field
            }
            className="rounded-xl border border-border bg-background px-3 py-2.5 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        ))}
        <textarea
          required
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
          placeholder="description"
          className="min-h-32 rounded-xl border border-border bg-background px-3 py-2.5 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 md:col-span-2"
        />
        <select
          value={form.status}
          onChange={(event) =>
            setForm({
              ...form,
              status: event.target.value as FormState["status"],
            })
          }
          className="cursor-pointer rounded-xl border border-border bg-background px-3 py-2.5 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2.5">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) =>
              setForm({ ...form, featured: event.target.checked })
            }
          />{" "}
          Featured project
        </label>
        <label className="cursor-pointer rounded-xl border border-border px-3 py-2.5 text-sm md:col-span-2">
          Project image
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
            className="mt-2 block w-full cursor-pointer text-sm"
          />
        </label>
        <div className="flex flex-wrap gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer rounded-xl bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving…"
              : editingId
                ? "Update project"
                : "Save project"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer rounded-xl border border-border bg-background px-5 py-2.5 font-medium transition-colors hover:bg-muted"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="mt-10 space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card px-4 py-4 shadow-sm transition-colors ${
              editingId === project.id
                ? "border-primary/50"
                : "border-border/70 hover:border-primary/25"
            }`}
          >
            <div className="min-w-0">
              <p className="font-medium text-foreground">{project.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {project.status}
                {project.featured ? " · Featured" : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(project)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-primary bg-transparent px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Pencil className="size-3.5" aria-hidden />
                Edit
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(project)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-destructive bg-transparent px-3.5 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-white"
              >
                <Trash2 className="size-3.5" aria-hidden />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

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
