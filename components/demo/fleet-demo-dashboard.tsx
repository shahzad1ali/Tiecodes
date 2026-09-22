"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Radio, Truck } from "lucide-react";

type Status = "active" | "idle" | "offline";

const vehicles = [
  { id: "TK-102", driver: "A. Malik", status: "active" as Status, eta: "14 min", route: "Lahore → Multan" },
  { id: "TK-118", driver: "S. Raza", status: "idle" as Status, eta: "—", route: "Depot" },
  { id: "TK-221", driver: "N. Iqbal", status: "active" as Status, eta: "32 min", route: "Faisalabad → Lahore" },
  { id: "TK-088", driver: "H. Ali", status: "offline" as Status, eta: "—", route: "Maintenance" },
  { id: "TK-340", driver: "M. Khan", status: "active" as Status, eta: "9 min", route: "City loop B" },
  { id: "TK-156", driver: "R. Noor", status: "idle" as Status, eta: "—", route: "Waiting load" },
];

const statusColor: Record<Status, string> = {
  active: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
  idle: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  offline: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

export function FleetDemoDashboard() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<"all" | Status>("all");

  const filtered = useMemo(
    () => (filter === "all" ? vehicles : vehicles.filter((v) => v.status === filter)),
    [filter]
  );

  const counts = useMemo(
    () => ({
      active: vehicles.filter((v) => v.status === "active").length,
      idle: vehicles.filter((v) => v.status === "idle").length,
      offline: vehicles.filter((v) => v.status === "offline").length,
    }),
    []
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-primary/15 bg-white text-foreground shadow-[0_28px_60px_-36px_rgb(37_66_102_/_0.2)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            Live preview
          </p>
          <h2 className="font-heading text-lg font-semibold">Fleet overview</h2>
        </div>
        <p className="text-xs text-muted-foreground">Simulated data · not a live GPS feed</p>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-3">
        {[
          { label: "Active", value: counts.active, icon: Truck },
          { label: "Idle", value: counts.idle, icon: MapPin },
          { label: "Offline", value: counts.offline, icon: Radio },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-slate-50 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <stat.icon className="size-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="font-heading text-2xl font-semibold text-primary">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 border-t border-border p-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {(["all", "active", "idle", "offline"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  filter === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-slate-100 text-muted-foreground hover:bg-blue-50 hover:text-primary"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
          <ul className="space-y-2">
            {filtered.map((v) => (
              <li
                key={v.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-slate-50 px-3 py-3"
              >
                <div>
                  <p className="font-heading text-sm font-semibold">{v.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {v.driver} · {v.route}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${statusColor[v.status]}`}>
                    {v.status}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">ETA {v.eta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-56 overflow-hidden rounded-2xl border border-primary/20 bg-[#eef6ff]">
          <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden>
            <path
              d="M30 200 C90 80, 150 220, 210 110 S310 60, 370 120"
              stroke="#2563C7"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="8 8"
            />
            <circle cx="30" cy="200" r="6" fill="#F0A64F" />
            <circle cx="370" cy="120" r="6" fill="#2563C7" />
            {!reduce && (
              <motion.circle
                r="7"
                fill="#2563C7"
                animate={{
                  offsetDistance: ["0%", "100%"],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                style={{
                  offsetPath:
                    "path('M30 200 C90 80, 150 220, 210 110 S310 60, 370 120')",
                }}
              />
            )}
          </svg>
          <p className="absolute bottom-3 left-3 text-[10px] tracking-wide text-slate-500 uppercase">
            Route preview
          </p>
        </div>
      </div>
    </div>
  );
}
