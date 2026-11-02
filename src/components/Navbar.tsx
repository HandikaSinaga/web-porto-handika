"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  Sun,
  Moon,
  Menu,
  X,
  FileDown,
  Terminal,
  Cloud,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Sertifikasi", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-[#070b12]/85 backdrop-blur-md shadow-sm border-b border-blue-100/60 dark:border-blue-950/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 font-mono text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="flex items-center gap-1">
              <span className="text-blue-600 dark:text-blue-400">handika</span>
              <span className="text-slate-400">.</span>
              <span className="text-slate-700 dark:text-slate-200">cloud</span>
              <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-0.5" />
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                      : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Theme Toggle & CV Download */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 active:scale-90 transition-all shadow-sm overflow-hidden"
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                <Sun
                  className={`w-4 h-4 text-amber-500 transition-all duration-300 transform absolute inset-0 m-auto ${
                    theme === "dark"
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-0 opacity-0"
                  }`}
                />
                <Moon
                  className={`w-4 h-4 text-blue-600 transition-all duration-300 transform absolute inset-0 m-auto ${
                    theme === "dark"
                      ? "rotate-90 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                />
              </div>
            </button>

            <a
              href="https://s.id/cv-handika"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all transform hover:-translate-y-0.5"
            >
              <FileDown className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Hamburger & Theme Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="relative p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 active:scale-90 transition-all"
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                <Sun
                  className={`w-4 h-4 text-amber-500 transition-all duration-300 transform absolute inset-0 m-auto ${
                    theme === "dark"
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-0 opacity-0"
                  }`}
                />
                <Moon
                  className={`w-4 h-4 text-blue-600 transition-all duration-300 transform absolute inset-0 m-auto ${
                    theme === "dark"
                      ? "rotate-90 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                />
              </div>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0a0f1b]/95 backdrop-blur-lg px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={toggleTheme}
                type="button"
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 active:scale-[0.98] transition-all"
              >
                <span className="flex items-center gap-2.5">
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <Sun
                      className={`w-4 h-4 text-amber-500 transition-all duration-300 transform absolute inset-0 m-auto ${
                        theme === "dark"
                          ? "rotate-0 scale-100 opacity-100"
                          : "-rotate-90 scale-0 opacity-0"
                      }`}
                    />
                    <Moon
                      className={`w-4 h-4 text-blue-600 transition-all duration-300 transform absolute inset-0 m-auto ${
                        theme === "dark"
                          ? "rotate-90 scale-0 opacity-0"
                          : "rotate-0 scale-100 opacity-100"
                      }`}
                    />
                  </div>
                  <span>Ganti ke Mode {theme === "dark" ? "Terang" : "Gelap"}</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-mono">
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </button>

              <a
                href="https://s.id/cv-handika"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25"
              >
                <FileDown className="w-4 h-4" />
                <span>Download CV (PDF)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
