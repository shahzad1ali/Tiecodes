"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Unique geometric fleet + network art — no stock photos. */
export function FleetNetworkArt({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      className={className}
      viewBox="0 0 640 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id="fn-glow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#73B9ED" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#73B9ED" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fn-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563C7" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#2563C7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D98B35" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <circle cx="420" cy="200" r="180" fill="url(#fn-glow)" />

      {/* Soft map rings */}
      <circle cx="360" cy="250" r="150" stroke="#2563C7" strokeOpacity="0.12" strokeWidth="1" />
      <circle cx="360" cy="250" r="100" stroke="#2563C7" strokeOpacity="0.18" strokeWidth="1" />
      <circle cx="360" cy="250" r="55" stroke="#2563C7" strokeOpacity="0.25" strokeWidth="1" />

      {/* Network edges */}
      <path
        d="M120 360 L220 280 L310 300 L380 180 L470 220 L540 140"
        stroke="url(#fn-line)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
      <path
        d="M180 140 L260 200 L360 160 L440 280 L520 300"
        stroke="#2563C7"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M100 220 L200 240 L300 200 L400 260 L500 200"
        stroke="#D98B35"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Nodes */}
      {[
        [120, 360],
        [220, 280],
        [310, 300],
        [380, 180],
        [470, 220],
        [540, 140],
        [180, 140],
        [260, 200],
        [440, 280],
        [200, 240],
        [400, 260],
      ].map(([cx, cy], i) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={i % 3 === 0 ? 6 : 4} fill={i % 4 === 0 ? "#D98B35" : "#2563C7"} />
          {!reduce && i % 3 === 0 && (
            <motion.circle
              cx={cx}
              cy={cy}
              r={6}
              stroke="#2563C7"
              strokeWidth="1.5"
              fill="none"
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.15 }}
            />
          )}
        </g>
      ))}

      {/* Geometric truck mark */}
      <g transform="translate(330 300)">
        <rect x="0" y="8" width="22" height="18" rx="3" fill="#2563C7" />
        <rect x="5" y="11" width="9" height="8" rx="1.5" fill="#3F1731" opacity="0.5" />
        <rect x="22" y="4" width="40" height="22" rx="3" fill="#F2D7E6" />
        <rect x="28" y="8" width="8" height="14" rx="1" fill="#3F1731" opacity="0.18" />
        <rect x="40" y="8" width="8" height="14" rx="1" fill="#3F1731" opacity="0.18" />
        <rect x="52" y="8" width="6" height="14" rx="1" fill="#D98B35" />
        <circle cx="12" cy="30" r="4" fill="#17345D" stroke="#2563C7" />
        <circle cx="36" cy="30" r="4" fill="#17345D" stroke="#2563C7" />
        <circle cx="52" cy="30" r="4" fill="#17345D" stroke="#2563C7" />
      </g>

      {/* AI node cluster */}
      <g transform="translate(470 90)">
        <circle r="28" fill="#F7FBFF" stroke="#2563C7" strokeWidth="1.5" />
        <circle r="10" fill="#2563C7" opacity="0.9" />
        <circle cx="-14" cy="-8" r="4" fill="#D98B35" />
        <circle cx="14" cy="-6" r="3.5" fill="#2563C7" />
        <circle cx="8" cy="14" r="3.5" fill="#2563C7" />
        <circle cx="-10" cy="12" r="3" fill="#F2D7E6" />
        <path
          d="M-14 -8 L0 0 L14 -6 M0 0 L8 14 M0 0 L-10 12"
          stroke="#2563C7"
          strokeOpacity="0.7"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
