"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { uiTranslations } from "@/data/translations";
import {
  Cloud,
  Boxes,
  Activity,
  Terminal,
} from "lucide-react";

interface SkillPillar {
  title: string;
  categoryKey: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  descriptionID: string;
  descriptionEN: string;
  skills: string[];
}

const PILLARS: SkillPillar[] = [
  {
    title: "Cloud Infrastructure",
    categoryKey: "cloud",
    icon: Cloud,
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-600/10",
    descriptionID: "Perancangan, isolasi jaringan VPC, dan manajemen komputasi scalable.",
    descriptionEN: "VPC network architecture, network isolation, and scalable cloud compute management.",
    skills: [
      "AWS EC2",
      "AWS VPC",
      "RDS MySQL",
      "AWS ALB",
      "Auto Scaling",
      "Alibaba Cloud",
    ],
  },
  {
    title: "CI/CD & Containers",
    categoryKey: "cicd",
    icon: Boxes,
    iconColor: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-600/10",
    descriptionID: "Automasi rilis aplikasi dan standarisasi runtime environment.",
    descriptionEN: "Automated application delivery pipelines and containerized runtime environments.",
    skills: ["Docker", "GitLab CI/CD", "Docker Compose", "Git & GitHub"],
  },
  {
    title: "Observability",
    categoryKey: "monitoring",
    icon: Activity,
    iconColor: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-600/10",
    descriptionID: "Pemantauan kesehatan host, metrik telemetri, dan load test.",
    descriptionEN: "System telemetry monitoring, real-time alerting, and distributed load stress testing.",
    skills: ["Prometheus", "Grafana", "Grafana K6", "CloudWatch"],
  },
  {
    title: "OS & Web Servers",
    categoryKey: "os",
    icon: Terminal,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-600/10",
    descriptionID: "Administrasi Linux, reverse proxy, dan process management.",
    descriptionEN: "Linux system administration, reverse proxy optimization, and process management.",
    skills: ["Linux Ubuntu", "Nginx Proxy", "PM2 Manager", "Node.js Runtime"],
  },
];

export default function Skills() {
  const { lang } = useLanguage();
  const t = uiTranslations[lang];
  const [selectedPillar, setSelectedPillar] = useState<string>("all");

  const displayedPillars =
    selectedPillar === "all"
      ? PILLARS
      : PILLARS.filter((p) => p.categoryKey === selectedPillar);

  return (
    <section id="skills" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="rounded-3xl bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5 dark:shadow-black/50 space-y-8 transition-colors">
        {/* Header & Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">04</span>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.skills.title}
              </h3>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.skills.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedPillar("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPillar === "all"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {t.skills.filterAll}
            </button>
            {PILLARS.map((p) => (
              <button
                key={p.categoryKey}
                onClick={() => setSelectedPillar(p.categoryKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedPillar === p.categoryKey
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Bento Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-5 space-y-3.5 transition-all hover:border-blue-500/40"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl ${pillar.bgColor} ${pillar.iconColor}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {lang === "EN" ? pillar.descriptionEN : pillar.descriptionID}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {pillar.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
