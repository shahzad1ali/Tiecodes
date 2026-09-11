"use client";

import { useEffect, useId, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from "framer-motion";

const ROUTE =
  "M40 170 C110 40, 200 190, 290 85 S470 35, 560 125 S680 55, 760 70";

/** Truck that drives along a live GPS-style route path. */
export function MovingTruck({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const pathId = useId();
  const pathRef = useRef<SVGPathElement | null>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(progress, 1, {
      duration: 9,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [progress, reduce]);

  const x = useTransform(progress, (t) => {
    const path = pathRef.current;
    if (!path) return 560;
    const len = path.getTotalLength();
    return path.getPointAtLength(t * len).x;
  });
  const y = useTransform(progress, (t) => {
    const path = pathRef.current;
    if (!path) return 125;
    const len = path.getTotalLength();
    return path.getPointAtLength(t * len).y;
  });
  const rotate = useTransform(progress, (t) => {
    const path = pathRef.current;
    if (!path) return 0;
    const len = path.getTotalLength();
    const p1 = path.getPointAtLength(Math.max(0, t * len - 2));
    const p2 = path.getPointAtLength(Math.min(len, t * len + 2));
    return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
  });

  return (
    <div className={className} aria-hidden>
      <svg
        viewBox="0 0 800 220"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`${pathId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={ROUTE}
          stroke="rgba(46,183,229,0.18)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <motion.path
          ref={pathRef}
          d={ROUTE}
          stroke="#2EB7E5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="10 12"
          initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />

        <circle
          cx="40"
          cy="170"
          r="6"
          fill="#F5A524"
          filter={`url(#${pathId}-glow)`}
        />
        <circle cx="290" cy="85" r="4" fill="#2EB7E5" opacity="0.7" />
        <circle cx="560" cy="125" r="4" fill="#2EB7E5" opacity="0.7" />
        <circle
          cx="760"
          cy="70"
          r="6"
          fill="#2EB7E5"
          filter={`url(#${pathId}-glow)`}
        />

        {!reduce && (
          <motion.circle
            cx="760"
            cy="70"
            r="10"
            stroke="#2EB7E5"
            strokeWidth="2"
            fill="none"
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <motion.g style={{ x, y, rotate }}>
          <g transform="translate(-22, -12)">
            <rect x="0" y="4" width="16" height="14" rx="2" fill="#2EB7E5" />
            <rect
              x="3"
              y="6"
              width="7"
              height="6"
              rx="1"
              fill="#0A1628"
              opacity="0.55"
            />
            <rect x="16" y="2" width="26" height="16" rx="2" fill="#E8EEF7" />
            <rect
              x="20"
              y="5"
              width="6"
              height="10"
              rx="1"
              fill="#0A1628"
              opacity="0.15"
            />
            <rect
              x="28"
              y="5"
              width="6"
              height="10"
              rx="1"
              fill="#0A1628"
              opacity="0.15"
            />
            <rect
              x="36"
              y="5"
              width="4"
              height="10"
              rx="1"
              fill="#F5A524"
              opacity="0.85"
            />
            <circle
              cx="8"
              cy="20"
              r="3.2"
              fill="#0A1628"
              stroke="#2EB7E5"
              strokeWidth="1"
            />
            <circle
              cx="24"
              cy="20"
              r="3.2"
              fill="#0A1628"
              stroke="#2EB7E5"
              strokeWidth="1"
            />
            <circle
              cx="36"
              cy="20"
              r="3.2"
              fill="#0A1628"
              stroke="#2EB7E5"
              strokeWidth="1"
            />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
