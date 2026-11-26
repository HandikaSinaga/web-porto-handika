"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { CV_OPTIONS } from "@/data/portfolioData";
import {
  NAV_SECTIONS,
  NavSectionItem,
  getSectionHash,
  getSectionHref,
} from "@/data/navigation";
import {
  Sun,
  Moon,
  Download,
  ChevronDown,
  FileText,
  Search,
  Menu,
  X,
} from "lucide-react";

export default function TopNavbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const { lang, setLang } = useLanguage();

  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isMobileCvOpen, setIsMobileCvOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cvRef = useRef<HTMLDivElement>(null);
  const cvButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const isHomePage = pathname === "/";

  // Track sticky elevation state
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy across home sections
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = NAV_SECTIONS.map((n) => n.domId);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHomePage]);

  // Close CV dropdown on outside click or Escape
  useEffect(() => {
    if (!isCvOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (cvRef.current && !cvRef.current.contains(e.target as Node)) {
        setIsCvOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCvOpen(false);
        cvButtonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCvOpen]);

  // Lock body scroll and support Escape for mobile drawer
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const isNavItemActive = (item: NavSectionItem) => {
    if (isHomePage) {
      return activeSection === item.domId;
    }
    return item.routeMatch === pathname;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavSectionItem) => {
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      const target = document.getElementById(item.domId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(item.domId);
        window.history.replaceState(null, "", `#${getSectionHash(item.key, lang)}`);
      }
    }
  };

  const openCommandPalette = () => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("toggle-command-menu"));
  };

  const isDark = mounted ? theme === "dark" : true;

  const renderCvOptions = (onSelect: () => void) =>
    CV_OPTIONS.map((cv) => (
      <a
        key={cv.id}
        href={cv.href}
        target="_blank"
        rel="noopener noreferrer"
        role="menuitem"
        onClick={onSelect}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--color-primary-tint)]"
      >
        <FileText
          className="w-4 h-4 shrink-0"
          style={{ color: "var(--color-primary-text)" }}
          aria-hidden="true"
        />
        <span className="min-w-0">
          <span className="block text-sm font-semibold" style={{ color: "var(--color-text-main)" }}>
            {cv.title}
          </span>
          <span className="block text-xs" style={{ color: "var(--color-text-muted)" }}>
            {cv.subtitle}
          </span>
        </span>
      </a>
    ));

  return (
    <header
      className="sticky top-0 z-50 w-full transition-colors duration-200"
      style={{
        backgroundColor: isScrolled ? "var(--color-nav-bg)" : "transparent",
        backdropFilter: isScrolled ? "blur(14px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--color-border)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-[74px] w-full max-w-[1240px] items-center justify-between gap-4 xl:gap-8 px-4 sm:px-6">
        {/* Brand Wordmark */}
        <Link
          href={getSectionHref("home", lang)}
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("home");
              window.history.replaceState(null, "", `#${getSectionHash("home", lang)}`);
            }
          }}
          className="font-heading text-xl sm:text-[22px] font-extrabold tracking-tight shrink-0 py-2"
        >
          <span style={{ color: "var(--color-primary-text)" }}>handika</span>
          <span style={{ color: "var(--color-text-main)" }}>sinaga</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label={lang === "EN" ? "Primary navigation" : "Navigasi utama"}
          className="hidden xl:flex flex-1 items-center justify-center gap-0.5 pl-4"
        >
          {NAV_SECTIONS.map((item) => {
            const active = isNavItemActive(item);
            return (
              <Link
                key={item.key}
                href={getSectionHref(item.key, lang)}
                onClick={(e) => handleNavClick(e, item)}
                aria-current={active ? "page" : undefined}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] transition-colors"
                style={{
                  backgroundColor: active ? "var(--color-primary-tint)" : "transparent",
                  color: active ? "var(--color-primary-text)" : "var(--color-text-muted)",
                  fontWeight: active ? 700 : 500,
                }}
              >
                {lang === "EN" ? item.labelEN : item.labelID}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search (Desktop / Tablet) */}
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label={lang === "EN" ? "Open quick search (Ctrl+K)" : "Buka pencarian cepat (Ctrl+K)"}
            className="hidden md:inline-flex items-center gap-2 min-h-[42px] px-3 rounded-full text-xs font-medium transition-colors border"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-muted)",
            }}
          >
            <Search className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden 2xl:inline">{lang === "EN" ? "Search" : "Cari"}</span>
            <kbd
              className="rounded px-1.5 py-0.5 text-[10px] font-mono"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                color: "var(--color-text-subtle)",
              }}
            >
              Ctrl+K
            </kbd>
          </button>

          {/* Download CV Dropdown (Desktop / Tablet) */}
          <div ref={cvRef} className="relative hidden sm:block">
            <button
              ref={cvButtonRef}
              type="button"
              onClick={() => setIsCvOpen((prev) => !prev)}
              aria-expanded={isCvOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-2 min-h-[42px] px-4 rounded-full text-[13px] font-semibold border transition-colors"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: isCvOpen ? "var(--color-primary)" : "var(--color-border)",
                color: "var(--color-text-main)",
              }}
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{lang === "EN" ? "Download CV" : "Unduh CV"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isCvOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {isCvOpen && (
              <div
                role="menu"
                aria-label={lang === "EN" ? "CV Language Options" : "Pilihan Bahasa CV"}
                className="absolute right-0 mt-2 w-60 rounded-2xl p-1.5 shadow-xl z-50 border animate-modal-enter"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  borderColor: "var(--color-border)",
                }}
              >
                {renderCvOptions(() => setIsCvOpen(false))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div
            role="group"
            aria-label={lang === "EN" ? "Language selection" : "Pilihan bahasa"}
            className="hidden sm:flex items-center rounded-full p-1 border"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
            }}
          >
            {(["ID", "EN"] as const).map((code) => {
              const selected = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={selected}
                  className="min-h-[32px] min-w-[34px] px-2.5 rounded-full text-xs font-semibold transition-colors"
                  style={{
                    backgroundColor: selected ? "var(--color-primary)" : "transparent",
                    color: selected ? "#ffffff" : "var(--color-text-muted)",
                  }}
                >
                  {code}
                </button>
              );
            })}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark
                ? lang === "EN"
                  ? "Switch to light mode"
                  : "Ganti ke mode terang"
                : lang === "EN"
                ? "Switch to dark mode"
                : "Ganti ke mode gelap"
            }
            title={
              isDark
                ? lang === "EN"
                  ? "Switch to light mode"
                  : "Ganti ke mode terang"
                : lang === "EN"
                ? "Switch to dark mode"
                : "Ganti ke mode gelap"
            }
            className="inline-flex h-[42px] w-[42px] sm:h-[44px] sm:w-[44px] items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 hover:border-[var(--color-border-hover)] active:scale-95"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
              color: isDark ? "#fbbf24" : "var(--color-primary-text)",
              boxShadow: isDark
                ? "0 0 14px rgba(251, 191, 36, 0.14)"
                : "0 0 14px rgba(155, 28, 28, 0.12)",
            }}
          >
            <span className="relative flex h-[18px] w-[18px] items-center justify-center" aria-hidden="true">
              <Sun
                className={`absolute h-[18px] w-[18px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
                }`}
              />
              <Moon
                className={`absolute h-[18px] w-[18px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isDark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              />
            </span>
          </button>

          {/* Mobile Menu Trigger (Labeled for discoverability per antislop-layoutmobile) */}
          <button
            ref={mobileMenuButtonRef}
            type="button"
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev);
              setIsMobileCvOpen(false);
            }}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isMobileMenuOpen ? (lang === "EN" ? "Close menu" : "Tutup menu") : (lang === "EN" ? "Open menu" : "Buka menu")}
            className="xl:hidden inline-flex items-center gap-1.5 min-h-[44px] px-3.5 rounded-full border text-xs font-semibold transition-colors"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-main)",
            }}
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" aria-hidden="true" />
            )}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 top-[74px] z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsMobileCvOpen(false);
          }}
        >
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={lang === "EN" ? "Mobile navigation" : "Menu navigasi"}
            className="w-full border-b p-5 space-y-4 max-h-[calc(100dvh-74px)] overflow-y-auto shadow-2xl"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {NAV_SECTIONS.map((item) => {
                const active = isNavItemActive(item);
                return (
                  <Link
                    key={item.key}
                    href={getSectionHref(item.key, lang)}
                    onClick={(e) => handleNavClick(e, item)}
                    className="flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-xl text-sm transition-colors"
                    style={{
                      backgroundColor: active ? "var(--color-primary-tint)" : "var(--color-bg-secondary)",
                      color: active ? "var(--color-primary-text)" : "var(--color-text-main)",
                      fontWeight: active ? 700 : 500,
                    }}
                  >
                    <span>{lang === "EN" ? item.labelEN : item.labelID}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t flex flex-wrap items-center gap-2.5" style={{ borderColor: "var(--color-border)" }}>
              <button
                type="button"
                onClick={openCommandPalette}
                className="flex-1 min-w-[140px] min-h-[44px] inline-flex items-center justify-center gap-2 px-4 rounded-xl text-xs font-semibold border"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-main)",
                }}
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>{lang === "EN" ? "Quick Search" : "Pencarian Cepat"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMobileCvOpen((prev) => !prev)}
                aria-expanded={isMobileCvOpen}
                aria-haspopup="menu"
                className="flex-1 min-w-[130px] min-h-[44px] inline-flex items-center justify-center gap-2 px-4 rounded-xl text-xs font-semibold text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>{lang === "EN" ? "Download CV" : "Unduh CV"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isMobileCvOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              <div
                role="group"
                aria-label={lang === "EN" ? "Language selection" : "Pilihan bahasa"}
                className="flex items-center rounded-xl p-1 border"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  borderColor: "var(--color-border)",
                }}
              >
                {(["ID", "EN"] as const).map((code) => {
                  const selected = lang === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLang(code)}
                      aria-pressed={selected}
                      className="min-h-[36px] px-3 rounded-lg text-xs font-semibold transition-colors"
                      style={{
                        backgroundColor: selected ? "var(--color-primary)" : "transparent",
                        color: selected ? "#ffffff" : "var(--color-text-muted)",
                      }}
                    >
                      {code}
                    </button>
                  );
                })}
              </div>
            </div>

            {isMobileCvOpen && (
              <div
                role="menu"
                aria-label={lang === "EN" ? "CV Language Options" : "Pilihan Bahasa CV"}
                className="surface-chip rounded-2xl p-1.5 space-y-1 animate-modal-enter"
              >
                {renderCvOptions(() => {
                  setIsMobileCvOpen(false);
                  setIsMobileMenuOpen(false);
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
