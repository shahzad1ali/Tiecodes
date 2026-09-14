"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company } from "@/lib/content";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in name, email, and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = (await res.json()) as { error?: string; mailto?: boolean };

      if (!res.ok) {
        if (data.mailto) {
          const subject = encodeURIComponent(`Project inquiry from ${name.trim()}`);
          const body = encodeURIComponent(
            `Name: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone.trim() || "—"}\n\n${message.trim()}`
          );
          window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
          setError(
            "Email service is not configured yet — we opened your mail app as a backup."
          );
          return;
        }
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setError("Network error. Please try again or email us directly.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl bg-transparent p-6 sm:p-8">
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground">
        {company.responseTime} NDA available on request.
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Your name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          autoComplete="name"
          disabled={pending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          disabled={pending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+92 …"
          autoComplete="tel"
          disabled={pending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your fleet, drivers, or logistics needs…"
          className="min-h-32"
          disabled={pending}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && (
        <p className="text-sm font-medium text-primary">
          Message sent. {company.responseTime}
        </p>
      )}
      <Button type="submit" size="lg" className="h-11 w-full sm:w-auto px-6" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Prefer email?{" "}
        <a href={`mailto:${company.email}`} className="text-primary hover:underline">
          {company.email}
        </a>
      </p>
    </form>
  );
}
