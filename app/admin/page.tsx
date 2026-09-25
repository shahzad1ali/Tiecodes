"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const apiUrl = "/api/v1";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    void fetch(`${apiUrl}/auth/me`, { credentials: "include" })
      .then((response) => {
        if (response.ok) router.replace("/admin/projects");
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/admin/projects");
  }

  if (checking) {
    return (
      <main className="mx-auto max-w-md px-4 py-24 sm:px-6">
        <p className="text-sm text-muted-foreground">Checking session…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-4 py-24 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold">Admin login</h1>
      <p className="mt-2 text-muted-foreground">Manage the TieCodes portfolio.</p>
      <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-border/60 p-6">
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          autoComplete="username"
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          className="w-full rounded-lg border border-border bg-background px-3 py-2"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground"
        >
          Sign in
        </button>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </form>
    </main>
  );
}
