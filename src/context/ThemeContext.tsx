"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const emptySubscribe = () => () => {};

const subscribeTheme = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("theme-change", callback);
  };
};

const getThemeSnapshot = (): Theme => {
  try {
    const saved = localStorage.getItem("portfolio_theme");
    return saved === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
};

const getThemeServerSnapshot = (): Theme => "dark";

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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    if (typeof document === "undefined") return;

    const executeChange = () => {
      try {
        localStorage.setItem("portfolio_theme", newTheme);
      } catch {
        // Ignore localStorage error
      }
      applyTheme(newTheme);
      window.dispatchEvent(new Event("theme-change"));
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
