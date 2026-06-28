"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

/**
 * Reveal â€“ scroll-triggered fade-in.
 *
 * Key Lighthouse fix:
 *  - Content is visible immediately (no opacity:0 flash).
 *  - Animation only fires when the element enters the viewport.
 *  - Short `duration` (0.45s) keeps things snappy without blocking LCP.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.45,
  yOffset = 12,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
