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
  Sparkles,
  Check,
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
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-[#080d17]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Stack & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Keahlian <span className="text-blue-600 dark:text-blue-400">Cloud & DevOps</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Perangkat lunak, platform cloud, dan metodologi otomatisasi infrastruktur yang
            telah saya kuasai dan terapkan dalam lingkungan produksi dan riset.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Category Grid */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <div key={category.categoryName} className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>{category.categoryName}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.skills.map((skill) => {
                  const IconComponent = ICON_MAP[skill.iconName] || Cloud;
                  return (
                    <div
                      key={skill.name}
                      className="p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                            skill.level === "Advanced"
                              ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                              : "bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {skill.name}
                      </h4>

                      {skill.details && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                          {skill.details}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
