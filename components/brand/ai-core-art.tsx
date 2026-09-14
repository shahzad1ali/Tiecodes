"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Abstract AI brain + route intelligence artwork. */
export function AiCoreArt({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      className={className}
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="ai-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>

      <rect width="480" height="360" rx="24" fill="#1E293B" />
      <circle cx="240" cy="175" r="120" fill="#3B82F6" fillOpacity="0.08" />

      {!reduce && (
        <motion.circle
          cx="240"
          cy="175"
          r="70"
          stroke="url(#ai-ring)"
          strokeWidth="2"
          strokeDasharray="8 10"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "240px 175px" }}
        />
      )}

      <circle cx="240" cy="175" r="48" stroke="#3B82F6" strokeWidth="2" fill="#111827" />
      <circle cx="240" cy="175" r="22" fill="#3B82F6" />
      <circle cx="240" cy="175" r="8" fill="#1E293B" />

      {/* Orbiting nodes */}
      {[
        [240, 95],
        [310, 135],
        [320, 215],
        [240, 255],
        [160, 215],
        [150, 135],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="240" y1="175" x2={x} y2={y} stroke="#3B82F6" strokeOpacity="0.35" />
          <circle cx={x} cy={y} r="7" fill={i % 2 ? "#60A5FA" : "#3B82F6"} />
        </g>
      ))}

      {/* Bottom route strip */}
      <path
        d="M40 300 C100 270, 160 320, 240 290 S380 270, 440 300"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeDasharray="5 7"
        strokeOpacity="0.7"
      />
      <circle cx="40" cy="300" r="5" fill="#60A5FA" />
      <circle cx="440" cy="300" r="5" fill="#3B82F6" />
    </svg>
  );
}
