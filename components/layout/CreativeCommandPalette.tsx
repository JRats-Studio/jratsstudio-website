"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCreativeEffects } from "./CreativeEffectsController";

type PaletteAction = {
  id: string;
  label: string;
  hint?: string;
  onRun: () => void;
};

function jumpToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CreativeCommandPalette() {
  const { heroGridEnabled, particleDensity, mode, setHeroGridEnabled, setParticleDensity, setMode } =
    useCreativeEffects();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const actions = useMemo<PaletteAction[]>(
    () => [
      {
        id: "jump-hero",
        label: "Jump: Hero",
        onRun: () => jumpToId("hero"),
      },
      {
        id: "jump-services",
        label: "Jump: Services",
        onRun: () => jumpToId("services"),
      },
      {
        id: "jump-about",
        label: "Jump: About",
        onRun: () => jumpToId("about"),
      },
      {
        id: "jump-contact",
        label: "Jump: Contact",
        onRun: () => jumpToId("contact"),
      },
      {
        id: "toggle-hero-grid",
        label: heroGridEnabled ? "Disable: Grid Scan" : "Enable: Grid Scan",
        hint: "Instant",
        onRun: () => setHeroGridEnabled(!heroGridEnabled),
      },
      {
        id: "density",
        label:
          particleDensity === "high" ? "Particles: Low density" : "Particles: High density",
        hint: "Affects background",
        onRun: () =>
          setParticleDensity(particleDensity === "high" ? "low" : "high"),
      },
      {
        id: "mode",
        label: mode === "neon" ? "Mode: Green only" : "Mode: Neon (Green + Cyan)",
        hint: "Accent colors",
        onRun: () => setMode(mode === "neon" ? "green" : "neon"),
      },
    ],
    [heroGridEnabled, particleDensity, setHeroGridEnabled, mode, setParticleDensity, setMode]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => (a.label + " " + (a.hint ?? "")).toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      if (modKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-1/2 top-[14%] w-[92vw] max-w-xl -translate-x-1/2 pointer-events-auto"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/15 shadow-2xl overflow-hidden">
              <div className="p-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="text-[#08cb00] font-mono text-sm">›</div>
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a command…"
                    className="w-full bg-transparent text-white placeholder:text-white/40 outline-none font-mono text-sm"
                  />
                  <div className="text-white/50 text-xs font-mono">Ctrl/⌘ K</div>
                </div>
              </div>

              <div className="max-h-[50vh] overflow-auto">
                {filtered.map((a, idx) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      a.onRun();
                      setOpen(false);
                      setQuery("");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5 last:border-b-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-white font-mono text-sm">
                        {a.label}
                      </div>
                      {idx === 0 ? (
                        <div className="text-[#08cb00] text-xs font-mono">ENTER</div>
                      ) : (
                        a.hint && <div className="text-white/40 text-xs font-mono">{a.hint}</div>
                      )}
                    </div>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div className="px-4 py-8 text-white/50 font-mono text-sm">
                    No matches.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

