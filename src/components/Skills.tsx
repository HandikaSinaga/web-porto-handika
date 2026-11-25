"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { uiTranslations } from "@/data/translations";
import { Cloud, Boxes, Activity, Terminal } from "lucide-react";

interface SkillPillar {
  title: string;
  categoryKey: string;
  icon: React.ElementType;
  descriptionID: string;
  descriptionEN: string;
  skills: string[];
}

const PILLARS: SkillPillar[] = [
  {
    title: "Cloud Infrastructure",
    categoryKey: "cloud",
    icon: Cloud,
    descriptionID: "Perancangan, isolasi jaringan VPC, dan manajemen komputasi scalable.",
    descriptionEN: "VPC network architecture, network isolation, and scalable cloud compute management.",
    skills: ["AWS EC2", "AWS VPC", "RDS MySQL", "AWS ALB", "Auto Scaling", "Alibaba Cloud"],
  },
  {
    title: "CI/CD & Containers",
    categoryKey: "cicd",
    icon: Boxes,
    descriptionID: "Automasi rilis aplikasi dan standarisasi runtime environment.",
    descriptionEN: "Automated application delivery pipelines and containerized runtime environments.",
    skills: ["Docker", "GitLab CI/CD", "Docker Compose", "Git & GitHub"],
  },
  {
    title: "Observability",
    categoryKey: "monitoring",
    icon: Activity,
    descriptionID: "Pemantauan kesehatan host, metrik telemetri, dan load test.",
    descriptionEN: "System telemetry monitoring, real-time alerting, and distributed load stress testing.",
    skills: ["Prometheus", "Grafana", "Grafana K6", "CloudWatch"],
  },
  {
    title: "OS & Web Servers",
    categoryKey: "os",
    icon: Terminal,
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
    selectedPillar === "all" ? PILLARS : PILLARS.filter((p) => p.categoryKey === selectedPillar);

  return (
    <section
      id="skills"
      className="section-flow py-12 sm:py-16 scroll-mt-20 transition-colors"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"
            style={{ color: "var(--color-primary-text)" }}
          >
            <span>SKILLS</span>
          </div>
          <h1
            className="font-heading font-extrabold tracking-[-0.02em]"
            style={{
              fontSize: "clamp(1.65rem, 4vw, 2.5rem)",
              color: "var(--color-text-main)",
            }}
          >
            {t.skills.title}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            {t.skills.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedPillar("all")}
            className="min-h-[42px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-colors"
            style={{
              backgroundColor: selectedPillar === "all" ? "var(--color-primary)" : "var(--color-bg-card)",
              borderColor: selectedPillar === "all" ? "var(--color-primary)" : "var(--color-border)",
              color: selectedPillar === "all" ? "#ffffff" : "var(--color-text-muted)",
            }}
          >
            {t.skills.filterAll}
          </button>
          {PILLARS.map((p) => (
            <button
              key={p.categoryKey}
              type="button"
              onClick={() => setSelectedPillar(p.categoryKey)}
              className="min-h-[42px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-colors"
              style={{
                backgroundColor: selectedPillar === p.categoryKey ? "var(--color-primary)" : "var(--color-bg-card)",
                borderColor: selectedPillar === p.categoryKey ? "var(--color-primary)" : "var(--color-border)",
                color: selectedPillar === p.categoryKey ? "#ffffff" : "var(--color-text-muted)",
              }}
            >
              {p.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="surface-card surface-card-interactive rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "var(--color-primary-tint)",
                      color: "var(--color-primary-text)",
                    }}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="font-heading text-base font-bold" style={{ color: "var(--color-text-main)" }}>
                    {pillar.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {lang === "EN" ? pillar.descriptionEN : pillar.descriptionID}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {pillar.skills.map((skill) => (
                    <span
                      key={skill}
                      className="surface-chip px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ color: "var(--color-text-muted)" }}
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
