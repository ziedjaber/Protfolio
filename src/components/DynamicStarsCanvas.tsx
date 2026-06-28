"use client";

import dynamic from "next/dynamic";

const DynamicStarsCanvas = dynamic(
  () => import("@/components/StarBackground").then((mod) => mod.StarsCanvas),
  { ssr: false, loading: () => null }
);

export default DynamicStarsCanvas;