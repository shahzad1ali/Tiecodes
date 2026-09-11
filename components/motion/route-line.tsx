"use client";

import { motion, useReducedMotion } from "framer-motion";

export function RouteLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      className={className}
      viewBox="0 0 800 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <motion.path
        d="M20 180 C120 40, 220 200, 320 90 S520 40, 620 120 S740 60, 780 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="8 10"
        className="text-primary/50"
        initial={reduce ? false : { pathLength: 0, opacity: 0.3 }}
        animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      />
      {!reduce && (
        <motion.circle
          r="7"
          fill="#2EB7E5"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          style={{ offsetPath: "path('M20 180 C120 40, 220 200, 320 90 S520 40, 620 120 S740 60, 780 40')" }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />
      )}
      <circle cx="20" cy="180" r="5" fill="#F5A524" />
      <circle cx="780" cy="40" r="5" fill="#2EB7E5" />
    </svg>
  );
}
