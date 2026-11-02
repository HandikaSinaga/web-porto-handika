"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import SectionSkeletonTransition from "@/components/SectionSkeletonTransition";

interface PageTransitionContextType {
  isTransitioning: boolean;
  targetSection: string;
  targetTitle: string;
  navigateTo: (href: string, title?: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(
  undefined
);

const SECTION_TITLE_MAP: Record<string, string> = {
  home: "Beranda Utama",
  about: "Tentang Saya (Profil & Pengalaman)",
  skills: "Keahlian & Ekosistem Teknologi",
  projects: "Portofolio Proyek Terpilih",
  certifications: "Sertifikasi Industri",
  contact: "Kontak & Saluran Kolaborasi",
};

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [targetSection, setTargetSection] = useState<string>("home");
  const [targetTitle, setTargetTitle] = useState<string>("Beranda Utama");

  const timersRef = useRef<{
    scrollTimer?: NodeJS.Timeout;
    fadeTimer?: NodeJS.Timeout;
    completeTimer?: NodeJS.Timeout;
  }>({});

  const navigateTo = useCallback((href: string, title?: string) => {
    // Clean up any ongoing transition timers
    if (timersRef.current.scrollTimer) clearTimeout(timersRef.current.scrollTimer);
    if (timersRef.current.fadeTimer) clearTimeout(timersRef.current.fadeTimer);
    if (timersRef.current.completeTimer) clearTimeout(timersRef.current.completeTimer);

    const rawId = href.startsWith("#") ? href.substring(1) : href;
    const cleanId = rawId.split("?")[0] || "home";
    const resolvedTitle = title || SECTION_TITLE_MAP[cleanId] || cleanId;

    setTargetSection(cleanId);
    setTargetTitle(resolvedTitle);
    setIsTransitioning(true);
    setIsFading(false);

    // Scroll to section with offset after skeleton appears
    timersRef.current.scrollTimer = setTimeout(() => {
      const el = document.getElementById(cleanId);
      if (el) {
        const navHeight = 75;
        const targetPos =
          el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: "smooth",
        });
      } else if (cleanId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      try {
        window.history.pushState(null, "", `#${cleanId}`);
      } catch (e) {}
    }, 280);

    // Start fade-out of skeleton overlay
    timersRef.current.fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 560);

    // Completely unmount transition skeleton overlay
    timersRef.current.completeTimer = setTimeout(() => {
      setIsTransitioning(false);
      setIsFading(false);
    }, 850);
  }, []);

  // Global anchor interceptor for seamless transition on all # links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      if (href.startsWith("#tab-") || href.startsWith("#accordion-")) return;

      const rawId = href.substring(1);
      const targetEl = document.getElementById(rawId);
      if (!targetEl && rawId !== "home") return;

      // Ignore if user used modifier keys (Ctrl+click, etc.) or default was prevented
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      e.preventDefault();
      const label =
        target.getAttribute("data-nav-label") || target.textContent?.trim();
      navigateTo(href, label);
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      if (timersRef.current.scrollTimer) clearTimeout(timersRef.current.scrollTimer);
      if (timersRef.current.fadeTimer) clearTimeout(timersRef.current.fadeTimer);
      if (timersRef.current.completeTimer) clearTimeout(timersRef.current.completeTimer);
    };
  }, [navigateTo]);

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        targetSection,
        targetTitle,
        navigateTo,
      }}
    >
      {children}
      {isTransitioning && (
        <SectionSkeletonTransition
          targetSection={targetSection}
          targetTitle={targetTitle}
          isFading={isFading}
        />
      )}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider"
    );
  }
  return ctx;
}
