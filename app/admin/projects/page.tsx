"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const apiUrl = "/api/v1";
type Project = { id: string; title: string; slug: string; summary: string; description: string; clientName?: string | null; industry?: string | null; liveUrl?: string | null; technologies?: unknown; status: "DRAFT" | "PUBLISHED"; featured: boolean; sortOrder: number };
type FormState = { title: string; slug: string; summary: string; description: string; clientName: string; industry: string; liveUrl: string; technologies: string; status: "DRAFT" | "PUBLISHED"; featured: boolean; sortOrder: string };
const emptyForm: FormState = { title: "", slug: "", summary: "", description: "", clientName: "", industry: "", liveUrl: "", technologies: "", status: "DRAFT", featured: false, sortOrder: "0" };

function toForm(project: Project): FormState {
  return { title: project.title, slug: project.slug, summary: project.summary, description: project.description, clientName: project.clientName ?? "", industry: project.industry ?? "", liveUrl: project.liveUrl ?? "", technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : "", status: project.status, featured: project.featured, sortOrder: String(project.sortOrder) };
}

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    const response = await fetch(`${apiUrl}/projects/admin`, { credentials: "include" });
    if (response.ok) setProjects(await response.json());
  }

  useEffect(() => {
    void fetch(`${apiUrl}/auth/me`, { credentials: "include" }).then((response) => response.ok ? response.json() : null).then((user: { email?: string } | null) => setAdminEmail(user?.email ?? ""));
    void fetch(`${apiUrl}/projects/admin`, { credentials: "include" }).then((response) => response.ok ? response.json() : []).then((data: Project[]) => setProjects(data));
  }, []);

  function reset() { setEditingId(null); setForm(emptyForm); setImage(null); setMessage(""); }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const payload = { ...form, technologies: form.technologies.split(",").map((item) => item.trim()).filter(Boolean), sortOrder: Number(form.sortOrder) };
    const response = await fetch(editingId ? `${apiUrl}/projects/${editingId}` : `${apiUrl}/projects`, { method: editingId ? "PATCH" : "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) { setMessage("Please check the fields and try again."); return; }
    const project = await response.json() as Project;
    if (image) {
      const data = new FormData();
      data.append("file", image);
      const upload = await fetch(`${apiUrl}/projects/${project.id}/images`, { method: "POST", credentials: "include", body: data });
      if (!upload.ok) { setMessage("Project saved, but image upload failed."); await load(); return; }
    }
    setMessage(editingId ? "Project updated." : "Project created.");
    reset();
    await load();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this project?")) return;
    const response = await fetch(`${apiUrl}/projects/${id}`, { method: "DELETE", credentials: "include" });
    setMessage(response.ok ? "Project deleted." : "Could not delete project.");
    await load();
  }

  async function logout() {
    await fetch(`${apiUrl}/auth/logout`, { method: "POST", credentials: "include" });
    router.push("/admin");
  }

  return <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="font-heading text-4xl font-semibold">Portfolio admin</h1><p className="mt-2 text-muted-foreground">Only the signed-in TieCodes admin can manage these projects.</p></div><div className="flex items-center gap-3 text-sm text-muted-foreground">{adminEmail ? <span>{adminEmail}</span> : null}<button type="button" onClick={logout} className="text-primary hover:underline">Log out</button></div></div>
    <form onSubmit={submit} className="mt-10 grid gap-4 rounded-2xl border border-border/60 p-6 md:grid-cols-2">
      <h2 className="font-heading text-xl font-semibold md:col-span-2">{editingId ? "Edit project" : "Add project"}</h2>
      {(["title", "slug", "summary", "clientName", "industry", "liveUrl", "technologies", "sortOrder"] as const).map((field) => <input key={field} required={["title", "slug", "summary"].includes(field)} type={field === "sortOrder" ? "number" : "text"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} placeholder={field === "technologies" ? "React, Next.js, MySQL" : field} className="rounded-lg border border-border bg-background px-3 py-2" />)}
      <textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="description" className="min-h-32 rounded-lg border border-border bg-background px-3 py-2 md:col-span-2" />
      <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as FormState["status"] })} className="rounded-lg border border-border bg-background px-3 py-2"><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option></select>
      <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2"><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} /> Featured project</label>
      <label className="rounded-lg border border-border px-3 py-2 text-sm md:col-span-2">Project image<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => setImage(event.target.files?.[0] ?? null)} className="mt-2 block w-full text-sm" /></label>
      <div className="flex gap-3 md:col-span-2"><button type="submit" className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground">{editingId ? "Update project" : "Save project"}</button>{editingId ? <button type="button" onClick={reset} className="rounded-lg border border-border px-4 py-2">Cancel</button> : null}</div>
      {message ? <p className="text-sm text-muted-foreground md:col-span-2">{message}</p> : null}
    </form>
    <div className="mt-10 space-y-3">{projects.map((project) => <div key={project.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 py-4"><div><p className="font-medium">{project.title}</p><p className="text-xs text-muted-foreground">{project.status}{project.featured ? " · Featured" : ""}</p></div><div className="flex gap-3 text-sm"><button type="button" onClick={() => { setEditingId(project.id); setForm(toForm(project)); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-primary hover:underline">Edit</button><button type="button" onClick={() => void remove(project.id)} className="text-destructive hover:underline">Delete</button></div></div>)}</div>
  </main>;
}
