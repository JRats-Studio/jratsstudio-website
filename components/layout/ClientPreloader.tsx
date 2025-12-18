"use client";

import dynamic from "next/dynamic";

// Dynamic import with ssr: false - allows Hero to render server-side for LCP measurement
// while Preloader appears on client hydration (user experience unchanged)
const PreloaderComponent = dynamic(
  () => import("@/components/layout/Preloader").then(mod => mod.Preloader),
  { ssr: false }
);

export const ClientPreloader = () => {
  return <PreloaderComponent />;
};
