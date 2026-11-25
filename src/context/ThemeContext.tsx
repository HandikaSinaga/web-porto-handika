"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

interface ThemeOrigin {
  x: number;
  y: number;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (eventOrOrigin?: React.MouseEvent<HTMLElement> | ThemeOrigin) => void;
  setTheme: (theme: Theme, origin?: ThemeOrigin) => void;
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

  const setTheme = (newTheme: Theme, origin?: ThemeOrigin) => {
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

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      executeChange();
      return;
    }

    type ViewTransitionDoc = Document & {
      startViewTransition?: (updateCallback: () => void) => {
        ready: Promise<void>;
      };
    };

    const vtDoc = document as ViewTransitionDoc;
    if (typeof vtDoc.startViewTransition === "function") {
      const x = origin?.x ?? window.innerWidth - 48;
      const y = origin?.y ?? 36;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = vtDoc.startViewTransition(() => {
        flushSync(() => {
          executeChange();
        });
      });

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 540,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {
          // Ignore aborted transition if user toggles rapidly
        });
      return;
    }

    // Fallback: smooth CSS property glide for browsers without View Transitions API
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    executeChange();
    window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 460);
  };

  const toggleTheme = (eventOrOrigin?: React.MouseEvent<HTMLElement> | ThemeOrigin) => {
    let resolvedOrigin: ThemeOrigin | undefined;

    if (eventOrOrigin && "currentTarget" in eventOrOrigin) {
      const hasPointerCoords = eventOrOrigin.clientX > 0 || eventOrOrigin.clientY > 0;
      if (hasPointerCoords) {
        resolvedOrigin = { x: eventOrOrigin.clientX, y: eventOrOrigin.clientY };
      } else if (eventOrOrigin.currentTarget) {
        const rect = eventOrOrigin.currentTarget.getBoundingClientRect();
        resolvedOrigin = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
    } else if (eventOrOrigin && "x" in eventOrOrigin && "y" in eventOrOrigin) {
      resolvedOrigin = eventOrOrigin;
    }

    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme, resolvedOrigin);
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
