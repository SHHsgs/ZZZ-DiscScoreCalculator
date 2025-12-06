"use client";
import React, { useEffect, useRef, useState } from "react";

type ThemeKey = "light" | "dark" | "gray";

const THEMES: Record<ThemeKey, { name: string; background: string; foreground: string }> = {
  light: { name: "Light", background: "#e0e0e0ff", foreground: "#171717" },
  dark: { name: "Dark", background: "#0a0a0a", foreground: "#ededed" },
  gray: { name: "Gray", background: "#3d3d3d", foreground: "#ededed" },
};

export default function ThemeToggle() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeKey>((typeof window !== "undefined" && (localStorage.getItem("theme") as ThemeKey)) || "light");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (_) {}
  }, [theme]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  function applyTheme(t: ThemeKey) {
    const data = THEMES[t];
    const root = document.documentElement;
    root.style.setProperty("--background", data.background);
    root.style.setProperty("--foreground", data.foreground);
  }

  return (
    <div ref={ref} className="fixed top-4 right-4 z-50 text-sm">
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="px-3 py-2 bg-white border rounded shadow-sm hover:bg-gray-50"
      >
        Theme
      </button>

      {open && (
        <div className="mt-2 w-40 rounded border bg-white shadow-md">
          {(["light", "dark", "gray"] as ThemeKey[]).map((k) => (
            <button
              key={k}
              onClick={() => {
                setTheme(k);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${theme === k ? "font-semibold" : ""}`}
            >
              {THEMES[k].name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
