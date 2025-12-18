"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const SmoothScroll = dynamic(() => import("./SmoothScroll").then(m => m.SmoothScroll), {
  ssr: false,
  loading: () => <></>,
});

export const ClientSmoothScroll = ({ children }: { children: ReactNode }) => {
  return <SmoothScroll>{children}</SmoothScroll>;
};
