"use client";

import React, { useState } from "react";
import { skillCategoriesData } from "@/data/portfolioData";
import {
  Server,
  Cloud,
  Network,
  Database,
  Share2,
  TrendingUp,
  ShieldCheck,
  Boxes,
  GitMerge,
  GitBranch,
  Activity,
  BarChart3,
  Zap,
  Bell,
  Terminal,
  Globe,
  Cpu,
  Layers,
} from "lucide-react";

// Icon dictionary matching iconName to Lucide component
const ICON_MAP: Record<string, React.ElementType> = {
  Server,
  Cloud,
  Network,
  Database,
  Share2,
  TrendingUp,
  ShieldCheck,
  Boxes,
  GitMerge,
  GitBranch,
  Activity,
  BarChart3,
  Zap,
  Bell,
  Terminal,
  Globe,
  Cpu,
  Layers,
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...skillCategoriesData.map((c) => c.categoryName)];

  const filteredCategories =
    selectedCategory === "All"
      ? skillCategoriesData
      : skillCategoriesData.filter((c) => c.categoryName === selectedCategory);

  return (
    <section id="skills" className="py-28 relative overflow-hidden bg-slate-50/50 dark:bg-[#080d17]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-mono font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
            // 02. KEAHLIAN TEKNIS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Tech Stack & <span className="text-blue-600 dark:text-blue-400">Tools DevOps</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Perangkat lunak, platform cloud, dan metodologi otomatisasi infrastruktur yang
            diterapkan dalam proyek riset dan arsitektur produksi berskala tinggi.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grouped Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.categoryName}
              className="p-6 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {category.categoryName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {category.description}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 shrink-0">
                    {category.skills.length} Tools
                  </span>
                </div>

                {/* Skills Chips Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {category.skills.map((skill) => {
                    const IconComponent = ICON_MAP[skill.iconName] || Cloud;
                    return (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-2.5 group hover:border-blue-400/60 dark:hover:border-blue-600/60 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {skill.name}
                            </div>
                            {skill.details && (
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                                {skill.details}
                              </div>
                            )}
                          </div>
                        </div>

                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-medium shrink-0 ${
                            skill.level === "Advanced"
                              ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80"
                              : "bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80"
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
