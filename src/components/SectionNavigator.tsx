"use client";

import React from "react";
import { ArrowRight, ArrowUp, Sparkles } from "lucide-react";
import { usePageTransition } from "@/context/PageTransitionContext";

interface SectionNavigatorProps {
  nextSection: string;
  nextTitle: string;
  sectionNumber: string;
  isBackToTop?: boolean;
}

export default function SectionNavigator({
  nextSection,
  nextTitle,
  sectionNumber,
  isBackToTop = false,
}: SectionNavigatorProps) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(`#${nextSection}`, nextTitle);
  };

  return (
    <div className="mt-20 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
        <span>{isBackToTop ? "Bagian Akhir Portofolio" : "Navigasi Antar Halaman"}</span>
      </div>

      <button
        onClick={handleClick}
        className="group relative inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 hover:bg-blue-50/70 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 text-slate-800 dark:text-slate-100 font-semibold text-sm shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        data-nav-label={nextTitle}
      >
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
            {isBackToTop ? "Kembali ke Awal" : "Lanjut ke Halaman Berikutnya"}
          </span>
          <span className="text-sm font-bold flex items-center gap-1.5">
            <span className="text-blue-500 dark:text-blue-400 font-mono">{sectionNumber}.</span>
            {nextTitle}
          </span>
        </div>

        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center group-hover:translate-x-1 group-hover:bg-blue-500 transition-all shadow-md shadow-blue-500/25 shrink-0">
          {isBackToTop ? (
            <ArrowUp className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </div>
      </button>
    </div>
  );
}
