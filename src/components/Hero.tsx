"use client";

import React from "react";
import SectionNavigator from "@/components/SectionNavigator";
import { contactData } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import {
  FileDown,
  ArrowRight,
  Mail,
  MapPin,
  ShieldCheck,
  Server,
  Cloud,
  CheckCircle2,
  Activity,
  Layers,
  Cpu,
  GitBranch,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 overflow-hidden"
    >
      {/* Background Subtle Gradient & Grid Accent */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-blue-500/10 via-sky-400/5 to-transparent dark:from-blue-600/15 dark:via-cyan-500/10 dark:to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-400/5 dark:bg-blue-700/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-20 w-80 h-80 bg-indigo-400/5 dark:bg-indigo-900/15 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Introductions & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Cloud & DevOps Roles</span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                {contactData.fullName}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400">
                Cloud & DevOps Engineer
              </p>
            </div>

            {/* Value Proposition / Summary */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Fokus pada perancangan arsitektur{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">
                AWS High Availability (Multi-AZ)
              </strong>
              , otomatisasi pipeline{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">
                CI/CD
              </strong>
              , orkestrasi container Docker, serta pemantauan observabilitas sistem
              dengan Prometheus & Grafana.
            </p>

            {/* Technical Focus Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                AWS Multi-AZ VPC
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                GitLab CI/CD Automation
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                Docker Containers
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                Prometheus & Grafana
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 w-full sm:w-auto">
              <a
                href={contactData.cvUrl || "https://s.id/cv_handika"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <FileDown className="w-4 h-4" />
                <span>Download CV Lengkap</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-sm transition-all"
              >
                <span>Lihat Proyek</span>
                <ArrowRight className="w-4 h-4 text-blue-500" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>Hubungi Saya</span>
              </a>
            </div>

            {/* Quick Meta: Location & Social */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/80 w-full">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                {contactData.location}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                {contactData.email}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center gap-2">
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Cloud & Operations Telemetry Console */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer Subtle Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 to-sky-600/20 blur-xl transition-all" />

              {/* Console Box */}
              <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0c1220]/95 backdrop-blur-xl shadow-xl overflow-hidden">
                {/* Console Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-[#090e1a] border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-200">
                      INFRASTRUCTURE CONSOLE
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    ap-southeast-1 (Jakarta)
                  </span>
                </div>

                {/* Operations & Architecture Matrix */}
                <div className="p-5 space-y-4">
                  {/* Item 1: AWS Multi-AZ */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                        <Cloud className="w-3.5 h-3.5 text-blue-500" />
                        <span>AWS High Availability VPC</span>
                      </div>
                      <span className="text-emerald-500 font-semibold text-[11px]">
                        Multi-AZ Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      Public & Private Subnets (Zone A & B), Application Load Balancer,
                      Auto-Scaling EC2, Multi-AZ RDS MySQL.
                    </p>
                  </div>

                  {/* Item 2: CI/CD Pipeline */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                        <GitBranch className="w-3.5 h-3.5 text-sky-500" />
                        <span>GitLab CI/CD Pipeline</span>
                      </div>
                      <span className="text-emerald-500 font-semibold text-[11px]">
                        Passing (Automated)
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      Otomatisasi pengujian, build image Docker, dan deployment tanpa downtime (Zero-Downtime Rolling Update).
                    </p>
                  </div>

                  {/* Item 3: Observability Stack */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                        <Activity className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Monitoring & Telemetry</span>
                      </div>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-[11px]">
                        Prometheus & Grafana
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      Node Exporter metriks host, visualisasi performa real-time, dan alert otomatis via Telegram/Webhook.
                    </p>
                  </div>

                  {/* Console Metrics Footer */}
                  <div className="pt-2 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Target Uptime</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">99.9%</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Architecture</div>
                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400">Multi-Tier</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Security</div>
                      <div className="text-sm font-bold text-emerald-500">IAM & WAF</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Bridge: Next Page */}
        <SectionNavigator
          nextSection="about"
          nextTitle="Tentang Saya (Profil & Pengalaman)"
          sectionNumber="01"
        />
      </div>
    </section>
  );
}
