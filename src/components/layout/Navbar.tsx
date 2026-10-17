"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const navItems = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Contact",
] as const;

const sectionIds = ["hero", ...navItems.map((item) => item.toLowerCase())];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container>
        <nav aria-label="Main" className="flex h-20 items-center justify-between">
          <a
            href="#hero"
            onClick={() => setIsOpen(false)}
            className="text-xl font-bold text-foreground transition-colors hover:text-primary"
          >
            Sahan<span aria-hidden="true" className="text-primary">.</span>
          </a>

          <div className="flex items-center gap-4">
            <ul className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => {
                const id = item.toLowerCase();
                const isActive = activeId === id;
                return (
                  <li key={item}>
                    <a
                      href={`#${id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block py-1 text-sm font-medium transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-muted hover:text-foreground",
                      )}
                    >
                      {item}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-primary transition-transform duration-200 ease-out-expo",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <ThemeToggle />

            <button
              ref={toggleRef}
              onClick={() => setIsOpen((open) => !open)}
              className="rounded-md border border-border bg-card p-2 text-foreground md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="border-t border-border bg-background/95 backdrop-blur md:hidden"
        >
          <Container>
            <ul className="space-y-1 py-4">
              {navItems.map((item) => {
                const id = item.toLowerCase();
                const isActive = activeId === id;
                return (
                  <li key={item}>
                    <a
                      href={`#${id}`}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary-soft text-primary"
                          : "text-muted hover:bg-card hover:text-foreground",
                      )}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
