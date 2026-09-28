"use client";

import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

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

type FieldKey =
  | "title"
  | "slug"
  | "summary"
  | "description"
  | "clientName"
  | "industry"
  | "liveUrl"
  | "technologies"
  | "sortOrder";

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

const REQUIRED_FIELDS = new Set<FieldKey>([
  "title",
  "slug",
  "summary",
  "description",
  "liveUrl",
]);

const FIELD_LABELS: Record<FieldKey, string> = {
  title: "Name",
  slug: "URL slug",
  summary: "Summary",
  description: "Description",
  clientName: "Client name",
  industry: "Industry",
  liveUrl: "Live URL",
  technologies: "Technologies",
  sortOrder: "Sort order",
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

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
      {label}
      {required ? <span className="ml-0.5 text-destructive">*</span> : null}
    </label>
  );
}

function AdminProjectsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { success, error, info } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    void (async () => {
      const me = await fetch(`${apiUrl}/auth/me`, { credentials: "include" });
      if (!me.ok) {
        router.replace("/");
        return;
      }

      if (editId) {
        const response = await fetch(`${apiUrl}/projects/${editId}`, {
          credentials: "include",
        });
        if (response.status === 401) {
          router.replace("/");
          return;
        }
        if (!response.ok) {
          error("Project not found", "It may have been deleted.");
          router.replace("/admin/profile");
          return;
        }
        const project = (await response.json()) as Project;
        setEditingId(project.id);
        setForm(toForm(project));
        info("Editing project", project.title);
      } else {
        setEditingId(null);
        setForm(emptyForm);
      }

      setReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load when edit id changes
  }, [editId, router]);

  function reset() {
    setEditingId(null);
    setForm(emptyForm);
    setImage(null);
    setFieldErrors({});
    setTouched(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    router.replace("/admin/projects");
  }

  function validateClient(): Partial<Record<FieldKey, string>> {
    const errors: Partial<Record<FieldKey, string>> = {};
    if (!form.title.trim()) errors.title = "This field is required.";
    if (!form.slug.trim()) errors.slug = "This field is required.";
    if (!form.summary.trim()) errors.summary = "This field is required.";
    if (!form.description.trim()) errors.description = "This field is required.";
    if (!form.liveUrl.trim()) {
      errors.liveUrl = "This field is required.";
    } else if (!isValidUrl(form.liveUrl.trim())) {
      errors.liveUrl = "Enter a valid URL starting with http:// or https://";
    }
    return errors;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setTouched(true);
    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      error("Missing required fields", "Please fill all fields marked with *.");
      return;
    }

    setSaving(true);
    setFieldErrors({});

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      summary: form.summary.trim(),
      description: form.description.trim(),
      clientName: form.clientName.trim() || undefined,
      industry: form.industry.trim() || undefined,
      liveUrl: form.liveUrl.trim(),
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
      const body = (await response.json().catch(() => null)) as {
        error?: string;
        fieldErrors?: Record<string, string>;
      } | null;
      if (body?.fieldErrors) {
        setFieldErrors(body.fieldErrors as Partial<Record<FieldKey, string>>);
      }
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
        setSaving(false);
        router.push("/admin/profile");
        return;
      }
    }

    success(editingId ? "Project updated" : "Project created", project.title);
    setSaving(false);
    router.push("/admin/profile");
  }

  function inputClass(field: FieldKey) {
    const invalid = touched && fieldErrors[field];
    return cn(
      "w-full rounded-xl border bg-background px-3 py-2.5 outline-none transition-colors focus:ring-2",
      invalid
        ? "border-destructive focus:border-destructive focus:ring-destructive/20"
        : "border-border focus:border-primary focus:ring-primary/20"
    );
  }

  function updateField(field: FieldKey, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  if (!ready) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm text-muted-foreground">Checking admin access…</p>
      </main>
    );
  }

  const textFields: FieldKey[] = [
    "title",
    "slug",
    "summary",
    "liveUrl",
    "clientName",
    "industry",
    "technologies",
    "sortOrder",
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link
        href="/admin/profile"
        className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to profile
      </Link>

      <div className="mt-4">
        <h1 className="font-heading text-4xl font-semibold">
          {editingId ? "Edit project" : "Add project"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Fields marked with <span className="text-destructive">*</span> are required.
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={submit}
        noValidate
        className="mt-10 grid gap-4 rounded-xl border border-border/60 bg-card p-6 shadow-sm md:grid-cols-2"
      >
        {textFields.map((field) => (
          <div key={field} className={field === "summary" ? "md:col-span-2" : undefined}>
            <FieldLabel
              htmlFor={field}
              label={FIELD_LABELS[field]}
              required={REQUIRED_FIELDS.has(field)}
            />
            <input
              id={field}
              name={field}
              type={field === "sortOrder" ? "number" : field === "liveUrl" ? "url" : "text"}
              min={field === "sortOrder" ? 0 : undefined}
              value={form[field]}
              onChange={(event) => updateField(field, event.target.value)}
              placeholder={
                field === "technologies"
                  ? "React, Next.js, MySQL"
                  : field === "liveUrl"
                    ? "https://example.com"
                    : FIELD_LABELS[field]
              }
              aria-invalid={touched && Boolean(fieldErrors[field])}
              aria-describedby={fieldErrors[field] ? `${field}-error` : undefined}
              className={inputClass(field)}
            />
            {touched && fieldErrors[field] ? (
              <p id={`${field}-error`} className="mt-1 text-xs text-destructive">
                {fieldErrors[field]}
              </p>
            ) : null}
          </div>
        ))}

        <div className="md:col-span-2">
          <FieldLabel htmlFor="description" label={FIELD_LABELS.description} required />
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Description"
            aria-invalid={touched && Boolean(fieldErrors.description)}
            aria-describedby={fieldErrors.description ? "description-error" : undefined}
            className={cn(inputClass("description"), "min-h-32")}
          />
          {touched && fieldErrors.description ? (
            <p id="description-error" className="mt-1 text-xs text-destructive">
              {fieldErrors.description}
            </p>
          ) : null}
        </div>

        <div>
          <FieldLabel htmlFor="status" label="Status" />
          <select
            id="status"
            value={form.status}
            onChange={(event) =>
              setForm({
                ...form,
                status: event.target.value as FormState["status"],
              })
            }
            className="w-full cursor-pointer rounded-xl border border-border bg-background px-3 py-2.5 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2.5 md:mt-7">
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
            {saving ? "Saving…" : editingId ? "Update project" : "Save project"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer rounded-xl border border-border bg-background px-5 py-2.5 font-medium transition-colors hover:bg-muted"
            >
              Cancel
            </button>
          ) : (
            <Link
              href="/admin/profile"
              className="cursor-pointer rounded-xl border border-border bg-background px-5 py-2.5 font-medium transition-colors hover:bg-muted"
            >
              Cancel
            </Link>
          )}
        </div>
      </form>
    </main>
  );
}

export default function AdminProjectsPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </main>
      }
    >
      <AdminProjectsForm />
    </Suspense>
  );
}
