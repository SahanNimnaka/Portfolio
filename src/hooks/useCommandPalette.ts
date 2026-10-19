"use client";

import { useSyncExternalStore } from "react";

let openState = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return openState;
}

function getServerSnapshot() {
  return false;
}

export function setPaletteOpen(open: boolean) {
  if (openState === open) return;
  openState = open;
  emit();
}

export function togglePalette() {
  setPaletteOpen(!openState);
}

function openPalette() {
  setPaletteOpen(true);
}

function closePalette() {
  setPaletteOpen(false);
}

if (typeof window !== "undefined") {
  window.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      togglePalette();
    } else if (event.key === "Escape") {
      setPaletteOpen(false);
    }
  });
}

/**
 * Shared command-palette state. A single module-level store and keydown
 * listener keep the Navbar trigger and the palette in sync — and make
 * Ctrl/Cmd+K work exactly once per press.
 */
export function useCommandPalette() {
  const isOpen = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    isOpen,
    open: openPalette,
    close: closePalette,
    toggle: togglePalette,
  };
}
