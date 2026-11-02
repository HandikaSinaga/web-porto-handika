"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  User,
  FolderGit2,
  FileText,
  Cpu,
  Award,
  Mail,
  Search,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const PRIMARY_NAV: NavItem[] = [
  { label: "ABOUT", href: "/", icon: User },
  { label: "RESUME", href: "/resume", icon: FileText },
  { label: "PORTFOLIO", href: "/portfolio", icon: FolderGit2 },
  { label: "SKILLS", href: "/skills", icon: Cpu },
  { label: "CERTIFICATIONS", href: "/certifications", icon: Award },
  { label: "CONTACT", href: "/contact", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    if (isMoreOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMoreOpen]);

  const isActive = (href: string) => {
    if (href === "/" || href === "/about") {
      return pathname === "/" || pathname === "/about";
    }
    const cleanHref = href.split("#")[0];
    return pathname === cleanHref || pathname.startsWith(cleanHref + "/");
  };

  const handleOpenSearch = () => {
    setIsMoreOpen(false);
    window.dispatchEvent(new CustomEvent("toggle-command-menu"));
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 1. DESKTOP STICKY LEFT SIDEBAR (Visible on lg: screens) */}
      {/* ======================================================== */}
      <aside className="hidden lg:block lg:col-span-3 space-y-4 lg:sticky lg:top-6">
        <div className="rounded-2xl bg-white/95 dark:bg-[#0c121e]/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 p-3.5 shadow-xl shadow-slate-900/5 dark:shadow-black/60 transition-colors">
          
          {/* Main Navigation Stack */}
          <nav className="space-y-1">
            {PRIMARY_NAV.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs tracking-wider transition-all ${
                    active
                      ? "bg-blue-600/10 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500 font-semibold shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 ${
                        active ? "text-blue-600 dark:text-blue-400" : "text-slate-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Controls: Search & Language / Theme Switcher */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2.5">
            {/* Quick Search Button */}
            <button
              onClick={handleOpenSearch}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-mono hover:border-blue-500/50 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" />
                <span>SEARCH</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700 font-mono">
                CTRL+K
              </kbd>
            </button>

            {/* Language Switcher Pill (EN | ID) + Theme Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex rounded-xl bg-slate-100 dark:bg-slate-900/80 p-1 border border-slate-200/80 dark:border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setLang("EN")}
                  className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                    lang === "EN"
                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("ID")}
                  className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                    lang === "ID"
                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  ID
                </button>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-600" />
                )}
              </button>
            </div>
          </div>

        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. FIXED MOBILE BOTTOM NAVIGATION BAR (Matches user's reference image)    */}
      {/* ========================================================================= */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0c121e]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800/90 shadow-2xl pb-[calc(env(safe-area-inset-bottom,0px)+6px)] pt-2 px-1 transition-colors"
      >
        <div className="grid grid-cols-6 items-center text-center">
          
          {/* 1. ABOUT */}
          <Link
            href="/"
            onClick={() => setIsMoreOpen(false)}
            className={`flex flex-col items-center justify-center py-1 border-r border-slate-200/60 dark:border-slate-800/60 transition-colors ${
              isActive("/") ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <User className="h-4 w-4 mb-1" />
            <span className="text-[9px] font-mono tracking-wider">ABOUT</span>
          </Link>

          {/* 2. PORTFOLIO */}
          <Link
            href="/portfolio"
            onClick={() => setIsMoreOpen(false)}
            className={`flex flex-col items-center justify-center py-1 border-r border-slate-200/60 dark:border-slate-800/60 transition-colors ${
              isActive("/portfolio") ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <FolderGit2 className="h-4 w-4 mb-1" />
            <span className="text-[9px] font-mono tracking-wider">PORTFOLIO</span>
          </Link>

          {/* 3. RESUME */}
          <Link
            href="/resume"
            onClick={() => setIsMoreOpen(false)}
            className={`flex flex-col items-center justify-center py-1 border-r border-slate-200/60 dark:border-slate-800/60 transition-colors ${
              isActive("/resume") ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <FileText className="h-4 w-4 mb-1" />
            <span className="text-[9px] font-mono tracking-wider">RESUME</span>
          </Link>

          {/* 4. SKILLS */}
          <Link
            href="/skills"
            onClick={() => setIsMoreOpen(false)}
            className={`flex flex-col items-center justify-center py-1 border-r border-slate-200/60 dark:border-slate-800/60 transition-colors ${
              isActive("/skills") ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <Cpu className="h-4 w-4 mb-1" />
            <span className="text-[9px] font-mono tracking-wider">SKILLS</span>
          </Link>

          {/* 5. CONTACT */}
          <Link
            href="/contact"
            onClick={() => setIsMoreOpen(false)}
            className={`flex flex-col items-center justify-center py-1 border-r border-slate-200/60 dark:border-slate-800/60 transition-colors ${
              isActive("/contact") ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <Mail className="h-4 w-4 mb-1" />
            <span className="text-[9px] font-mono tracking-wider">CONTACT</span>
          </Link>

          {/* 6. MORE (Opens Sub-Menu & Quick Action Drawer) */}
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              isMoreOpen
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "text-slate-400 dark:text-slate-500"
            }`}
            aria-label="More navigation and tools"
          >
            <Menu className="h-4 w-4 mb-1" />
            <span className="text-[9px] font-mono tracking-wider">MORE</span>
          </button>

        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. MOBILE "MORE" BOTTOM DRAWER MODAL SHEET                                */}
      {/* ========================================================================= */}
      {isMoreOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-fadeIn"
          onClick={() => setIsMoreOpen(false)}
        >
          <div
            className="w-full bg-white dark:bg-[#0c1220] rounded-t-3xl border-t border-slate-200 dark:border-slate-800 p-5 pb-24 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Drag Pill & Header */}
            <div className="flex flex-col items-center">
              <div className="h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-700 mb-4" />
              <div className="w-full flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  {lang === "EN" ? "Quick Navigation & Tools" : "Navigasi Cepat & Pengaturan"}
                </span>
                <button
                  onClick={() => setIsMoreOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Direct Link: CERTIFICATIONS */}
            <Link
              href="/certifications"
              onClick={() => setIsMoreOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Award className="h-4 w-4 text-blue-500" />
                <span>CERTIFICATIONS</span>
              </div>
            </Link>

            {/* Quick Search Button */}
            <button
              onClick={handleOpenSearch}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-blue-500" />
                <span>{lang === "EN" ? "Quick Search" : "Pencarian Cepat"}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 text-[10px] text-slate-600 dark:text-slate-300 font-mono">
                CTRL+K
              </span>
            </button>

            {/* Theme Toggle & Language Switcher */}
            <div className="flex items-center gap-2 pt-1">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 text-amber-400" />
                    <span>{lang === "EN" ? "Switch to Light" : "Mode Terang"}</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 text-slate-600" />
                    <span>{lang === "EN" ? "Switch to Dark" : "Mode Gelap"}</span>
                  </>
                )}
              </button>

              {/* Language Switcher */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setLang("EN")}
                  className={`px-3 py-2 rounded-lg ${
                    lang === "EN" ? "bg-blue-600 text-white font-bold" : "text-slate-400"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("ID")}
                  className={`px-3 py-2 rounded-lg ${
                    lang === "ID" ? "bg-blue-600 text-white font-bold" : "text-slate-400"
                  }`}
                >
                  ID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
