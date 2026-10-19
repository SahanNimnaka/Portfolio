"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Home,
  User,
  Code,
  Briefcase,
  BookOpen,
  Award,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { achievements } from "@/data/achievements";

const navigationCommands = [
  { id: "home", label: "Go to Home", section: "Navigation", icon: Home },
  { id: "about", label: "Go to About", section: "Navigation", icon: User },
  { id: "skills", label: "Go to Skills", section: "Navigation", icon: Code },
  { id: "projects", label: "Go to Projects", section: "Navigation", icon: Briefcase },
  { id: "experience", label: "Go to Experience", section: "Navigation", icon: Briefcase },
  { id: "education", label: "Go to Education", section: "Navigation", icon: BookOpen },
  ...(achievements.length
    ? [{ id: "achievements", label: "Go to Achievements", section: "Navigation", icon: Award }]
    : []),
  { id: "contact", label: "Go to Contact", section: "Navigation", icon: Mail },
];

export default function CommandPalette() {
  const { isOpen, close } = useCommandPalette();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion() ?? false;

  function goToSection(id: string) {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }

    // On subpages (e.g. case studies) the section lives on the home page.
    router.push(`/#${id}`);
  }

  const allCommands = [
    ...navigationCommands.map((cmd) => ({
      ...cmd,
      action: () => goToSection(cmd.id),
    })),
    {
      id: "theme",
      label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
      section: "Actions",
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        toggleTheme();
        close();
      },
    },
  ];

  const filteredCommands = allCommands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      const timer = setTimeout(() => {
        setSearch("");
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filteredCommands[selectedIndex];
        if (cmd) {
          cmd.action();
          close();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, close]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);

  function trapFocus(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        const target = previouslyFocusedRef.current;
        if (target?.isConnected) {
          target.focus({ preventScroll: true });
        }
        previouslyFocusedRef.current = null;
      }}
    >
      {isOpen && (
        <motion.div
          key="command-palette"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-background/80 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            ref={containerRef}
            id="command-palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onKeyDown={trapFocus}
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: reduce ? 0 : 10,
              scale: reduce ? 1 : 0.98,
              transition: { duration: reduce ? 0 : 0.12 },
            }}
            transition={{ duration: reduce ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card shadow-overlay"
          >
            <div className="border-b border-border p-4">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                aria-label="Search commands"
                className="w-full rounded-sm bg-transparent text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              />
            </div>
            <div className="max-h-80 overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-muted">No results found</div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        close();
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-foreground transition-colors hover:bg-background ${
                        idx === selectedIndex ? "bg-background" : ""
                      }`}
                    >
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span className="flex-1">{cmd.label}</span>
                      <span className="font-mono text-xs uppercase tracking-wider text-muted">
                        {cmd.section}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
            <div className="flex items-center justify-between border-t border-border p-3 font-mono text-xs text-muted">
              <span>Use ↑↓ to navigate</span>
              <span>Enter to select • Esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
