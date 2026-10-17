"use client";

import { useEffect, useRef, useState } from "react";
import {
  Home,
  User,
  Code,
  Briefcase,
  BookOpen,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useCommandPalette } from "@/hooks/useCommandPalette";

const commands = [
  { id: "home", label: "Go to Home", section: "Navigation", icon: Home, action: () => scrollToSection("hero") },
  { id: "about", label: "Go to About", section: "Navigation", icon: User, action: () => scrollToSection("about") },
  { id: "skills", label: "Go to Skills", section: "Navigation", icon: Code, action: () => scrollToSection("skills") },
  { id: "projects", label: "Go to Projects", section: "Navigation", icon: Briefcase, action: () => scrollToSection("projects") },
  { id: "experience", label: "Go to Experience", section: "Navigation", icon: Briefcase, action: () => scrollToSection("experience") },
  { id: "education", label: "Go to Education", section: "Navigation", icon: BookOpen, action: () => scrollToSection("education") },
  { id: "contact", label: "Go to Contact", section: "Navigation", icon: Mail, action: () => scrollToSection("contact") },
];

function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (section) {
    const yOffset = -80;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

export default function CommandPalette() {
  const { isOpen, close } = useCommandPalette();
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allCommands = [
    ...commands,
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-background/80 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
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
            className="w-full bg-transparent text-foreground outline-none placeholder:text-muted"
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
      </div>
    </div>
  );
}
