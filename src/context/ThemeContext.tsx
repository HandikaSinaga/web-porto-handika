"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  const applyTheme = (newTheme: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const body = document.body;

    if (newTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
      if (body) {
        body.classList.add("dark");
        body.classList.remove("light");
        body.setAttribute("data-theme", "dark");
      }
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
      if (body) {
        body.classList.add("light");
        body.classList.remove("dark");
        body.setAttribute("data-theme", "light");
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("portfolio_theme") as Theme | null;
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
        applyTheme(saved);
      } else {
        setThemeState("dark");
        applyTheme("dark");
      }
    } catch {
      setThemeState("dark");
      applyTheme("dark");
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    if (typeof document === "undefined") {
      setThemeState(newTheme);
      return;
    }

    const executeChange = () => {
      setThemeState(newTheme);
      try {
        localStorage.setItem("portfolio_theme", newTheme);
      } catch {
        // Ignore localStorage failure
      }
      applyTheme(newTheme);
    };

    // Use standard View Transitions API for GPU-accelerated smooth crossfade if supported
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (document as any).startViewTransition === "function") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document as any).startViewTransition(() => {
        executeChange();
      });
      return;
    }

    // Fallback: apply temporary transition class for 250ms so colors smoothly glide
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    executeChange();
    window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 280);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
