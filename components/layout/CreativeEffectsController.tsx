"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type CreativeMode = "green" | "neon";

type CreativeSettings = {
  heroGridEnabled: boolean;
  particleDensity: "low" | "high";
  mode: CreativeMode;
};

type CreativeContextValue = CreativeSettings & {
  setHeroGridEnabled: (v: boolean) => void;
  setParticleDensity: (v: CreativeSettings["particleDensity"]) => void;
  setMode: (v: CreativeMode) => void;
};

const CreativeContext = createContext<CreativeContextValue | null>(null);

const defaultSettings: CreativeSettings = {
  heroGridEnabled: true,
  particleDensity: "high",
  mode: "neon",
};

export function CreativeEffectsController({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<CreativeSettings>(defaultSettings);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("creative_settings_v1");
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<CreativeSettings>;
      setSettings((prev) => ({ ...prev, ...parsed }));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("creative_settings_v1", JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  const value = useMemo<CreativeContextValue>(
    () => ({
      ...settings,
      setHeroGridEnabled: (heroGridEnabled) =>
        setSettings((prev) => ({ ...prev, heroGridEnabled })),
      setParticleDensity: (particleDensity) =>
        setSettings((prev) => ({ ...prev, particleDensity })),
      setMode: (mode) => setSettings((prev) => ({ ...prev, mode })),
    }),
    [settings]
  );

  return (
    <CreativeContext.Provider value={value}>{children}</CreativeContext.Provider>
  );
}

export function useCreativeEffects() {
  const ctx = useContext(CreativeContext);
  if (!ctx) throw new Error("useCreativeEffects must be used within CreativeEffectsController");
  return ctx;
}

