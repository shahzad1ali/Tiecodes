"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

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

function toForm(project: Project): FormState {
  return {
    title: project.title,
    slug: project.slug,
    summary: project.summary,
    description: project.description,
    clientName: project.clientName ?? "",
    industry: project.industry ?? "",
    liveUrl: project.liveUrl ?? "",
    technologies: Array.isArray(project.technologies)
      ? project.technologies.join(", ")
      : "",
    status: project.status,
    featured: project.featured,
    sortOrder: String(project.sortOrder),
  };
}

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

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
    setMessage("");
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const payload = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      sortOrder: Number(form.sortOrder),
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
      return;
    }
    if (!response.ok) {
      setMessage("Please check the fields and try again.");
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
        setMessage("Project saved, but image upload failed.");
        await load();
        return;
      }
    }
    setMessage(editingId ? "Project updated." : "Project created.");
    reset();
    await load();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this project?")) return;
    const response = await fetch(`${apiUrl}/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.status === 401) {
      router.replace("/");
      return;
    }
    setMessage(response.ok ? "Project deleted." : "Could not delete project.");
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
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
            className="mt-2 block w-full cursor-pointer text-sm"
          />
        </label>
        <div className="flex flex-wrap gap-3 md:col-span-2">
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {editingId ? "Update project" : "Save project"}
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
        {message ? (
          <p className="text-sm text-muted-foreground md:col-span-2">{message}</p>
        ) : null}
      </form>

      <div className="mt-10 space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm transition-colors hover:border-primary/25"
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
                onClick={() => {
                  setEditingId(project.id);
                  setForm(toForm(project));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-primary bg-transparent px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Pencil className="size-3.5" aria-hidden />
                Edit
              </button>
              <button
                type="button"
                onClick={() => void remove(project.id)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-destructive bg-transparent px-3.5 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-white"
              >
                <Trash2 className="size-3.5" aria-hidden />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
