"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePortfolioData } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import {
  Mail,
  Copy,
  Check,
  Cloud,
  Boxes,
  Activity,
  Terminal,
  CheckCircle2,
  User,
  ArrowUpRight,
} from "lucide-react";

const CATEGORY_ICONS = [Cloud, Boxes, Activity, Terminal];

export default function About() {
  const { isEN } = useLanguage();
  const { contactData, skillCategoriesData } = usePortfolioData();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const contributions = isEN
    ? [
        {
          title: "Production AWS Cloud & Cost Optimization",
          desc: "Architected VPC (10.0.0.0/16), Multi-AZ ALB, Auto Scaling, and RDS MySQL; reduced AWS costs by ~28.8% ($123.58 to $87.96/month) via AWS Pricing Calculator while scaling RDS from t3.micro to t3.medium for 50 to 80+ users.",
        },
        {
          title: "Fullstack Deployment, Containers & CI/CD",
          desc: "Managed application releases using Nginx, PM2 clustering, Docker, and GitLab CI, configuring production custom domains (seals.id), API subdomains (api.seals.id), and SSL certificates.",
        },
        {
          title: "Real-Time Observability & Load Benchmarking",
          desc: "Built Prometheus metric scraping (port 9090), Grafana dashboards, CloudWatch and SNS alerting, plus Grafana K6 load testing (100 VUs, 20,100+ requests) to eliminate backend bottlenecks.",
        },
        {
          title: "Cross-Functional Leadership & HKI Research",
          desc: "Led a 7-member team for 6 weeks on Gazebo Samasta 3-tier AWS delivery, served as MSIB Batch 7 Tribe Leader for 50+ interns, and produced an HKI-registered cloud thesis system at PT Link Apisindo Media.",
        },
      ]
    : [
        {
          title: "Arsitektur Cloud AWS & Optimasi Biaya",
          desc: "Merancang VPC (10.0.0.0/16), Multi-AZ ALB, Auto Scaling, dan RDS MySQL; memangkas biaya AWS ~28,8% ($123,58 menjadi $87,96/bulan) via AWS Pricing Calculator sambil scaling RDS t3.micro ke t3.medium (50 ke 80+ pengguna).",
        },
        {
          title: "Deployment Fullstack, Container & CI/CD",
          desc: "Mengelola deployment dengan Nginx reverse proxy, PM2 clustering, Docker, dan GitLab CI termasuk konfigurasi custom domain (seals.id), API subdomain (api.seals.id), dan sertifikat SSL.",
        },
        {
          title: "Observabilitas Real-Time & Pengujian Beban",
          desc: "Membangun monitoring Prometheus dan Grafana, alerting CloudWatch dan SNS, serta uji beban Grafana K6 (100 VUs, 20.100+ requests) untuk mengidentifikasi bottleneck dan mengoptimalkan performa backend.",
        },
        {
          title: "Kepemimpinan Tim & Karya Ilmiah Ber-HKI",
          desc: "Memimpin tim 7 orang selama 6 minggu pada arsitektur 3-tier AWS Gazebo Samasta, menjadi Tribe Leader MSIB Batch 7 untuk 50+ peserta, serta menyusun sistem magang cloud berluaran HKI di PT Link Apisindo Media.",
        },
      ];

  return (
    <section
      id="about"
      className="section-flow py-12 sm:py-16 scroll-mt-20 transition-colors"
    >
      <div id="tentang" className="scroll-mt-20" />
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 space-y-7">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"
            style={{ color: "var(--color-primary-text)" }}
          >
            <User className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isEN ? "ABOUT ME" : "TENTANG SAYA"}</span>
          </div>
          <h2
            className="font-heading font-extrabold tracking-[-0.02em]"
            style={{
              fontSize: "clamp(1.65rem, 4vw, 2.5rem)",
              color: "var(--color-text-main)",
            }}
          >
            {isEN ? "Engineering Profile & Technical Stack" : "Profil Rekayasa & Tech Stack"}
          </h2>
        </div>

        {/* Row 1: Profile Summary + Direct Connect */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Profile Summary */}
          <div className="surface-card rounded-2xl p-6 sm:p-8 space-y-4">
            <h3
              className="font-heading text-xl sm:text-[22px] font-bold tracking-tight"
              style={{ color: "var(--color-text-main)" }}
            >
              {isEN ? "Profile Summary" : "Ringkasan Profil"}
            </h3>

            <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              <p>{contactData.summary}</p>
              <p>
                {isEN
                  ? "Certified as a BNSP Network Engineer (Network Administrator) and credentialed by AWS Academy (Cloud Architecting & Cloud Foundations) and Alibaba Cloud (ACA & Certified Developer), alongside an HKI-output undergraduate thesis built for PT Link Apisindo Media."
                  : "Tersertifikasi Nasional BNSP Network Engineer (Network Administrator) serta memiliki kredensial resmi AWS Academy (Cloud Architecting & Cloud Foundations) dan Alibaba Cloud (ACA & Certified Developer), serta skripsi berluaran HKI di PT Link Apisindo Media."}
              </p>
            </div>
          </div>

          {/* Card 2: Connect */}
          <div className="surface-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3
                  className="font-heading text-xl sm:text-[22px] font-bold tracking-tight"
                  style={{ color: "var(--color-text-main)" }}
                >
                  {isEN ? "Let's Connect" : "Mari Terkoneksi"}
                </h3>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                  style={{
                    backgroundColor: "var(--color-emerald-tint)",
                    borderColor: "var(--color-emerald-border)",
                    color: "var(--color-emerald)",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                  <span>{isEN ? "Open to Roles" : "Terbuka Peluang"}</span>
                </span>
              </div>

              <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {isEN
                  ? "Open for DevOps Engineer, Cloud Engineer, or Infrastructure collaboration and career opportunities. Reach me through the channels below."
                  : "Terbuka untuk peluang kerja DevOps Engineer, Cloud Engineer, maupun kolaborasi infrastruktur cloud. Hubungi saya lewat kanal berikut."}
              </p>

              {/* Labeled Channel Cards (No unlabeled icon-only guesswork, no redundant Phone dial button) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {[
                  {
                    name: "WhatsApp",
                    hint: isEN ? "Fast chat" : "Chat cepat",
                    href: contactData.whatsapp,
                    icon: WhatsappIcon,
                    iconBg: "var(--color-emerald-tint)",
                    iconColor: "var(--color-emerald)",
                  },
                  {
                    name: "LinkedIn",
                    hint: isEN ? "Career profile" : "Profil karier",
                    href: contactData.linkedin,
                    icon: LinkedinIcon,
                    iconBg: "var(--color-primary-tint)",
                    iconColor: "var(--color-primary-text)",
                  },
                  {
                    name: "GitHub",
                    hint: isEN ? "Repositories" : "Repositori",
                    href: contactData.github,
                    icon: GithubIcon,
                    iconBg: "var(--color-bg-secondary)",
                    iconColor: "var(--color-text-main)",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="surface-inset group flex flex-row sm:flex-col sm:justify-between items-center sm:items-stretch justify-between gap-2.5 min-h-[54px] p-3.5 rounded-xl border transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary)]"
                    >
                      <span className="flex items-center sm:justify-between gap-2.5">
                        <span
                          aria-hidden="true"
                          className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: item.iconBg,
                            color: item.iconColor,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="sm:hidden">
                          <span className="block text-xs font-bold" style={{ color: "var(--color-text-main)" }}>
                            {item.name}
                          </span>
                          <span className="block text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                            {item.hint}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="hidden sm:block w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          style={{ color: "var(--color-text-muted)" }}
                          aria-hidden="true"
                        />
                      </span>

                      <span className="hidden sm:block">
                        <span className="block text-sm font-bold leading-tight" style={{ color: "var(--color-text-main)" }}>
                          {item.name}
                        </span>
                        <span className="block text-xs mt-0.5 leading-snug" style={{ color: "var(--color-text-muted)" }}>
                          {item.hint}
                        </span>
                      </span>

                      <ArrowUpRight
                        className="sm:hidden w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: "var(--color-text-muted)" }}
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Direct Email Box with Send & Copy Actions */}
            <div className="surface-inset rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div
                  className="text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-primary-text)" }}
                >
                  {isEN ? "DIRECT EMAIL" : "EMAIL LANGSUNG"}
                </div>
                <div className="text-sm sm:text-base font-bold break-all" style={{ color: "var(--color-text-main)" }}>
                  {contactData.email}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`mailto:${contactData.email}`}
                  className="surface-chip inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors hover:border-[var(--color-primary)]"
                  style={{ color: "var(--color-text-main)" }}
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isEN ? "Email" : "Kirim"}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-live="polite"
                  className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:brightness-110"
                  style={{
                    backgroundColor: copiedEmail ? "#047857" : "var(--color-primary)",
                  }}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{isEN ? "Copied" : "Tersalin"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{isEN ? "Copy" : "Salin"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Tech Stack + Engineering Contributions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Card 3: Core Tech Stack */}
          <div className="surface-card rounded-2xl p-6 sm:p-8 space-y-5">
            <h3
              className="font-heading text-xl sm:text-[22px] font-bold tracking-tight"
              style={{ color: "var(--color-text-main)" }}
            >
              {isEN ? "Specializations & Core Tech Stack" : "Spesialisasi & Tech Stack Inti"}
            </h3>

            <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {skillCategoriesData.map((category, idx) => {
                const Icon = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
                return (
                  <div
                    key={category.categoryName}
                    className={idx === 0 ? "pb-4" : "py-4 last:pb-0"}
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                      <h4 className="text-sm font-bold" style={{ color: "var(--color-text-main)" }}>
                        {category.categoryName}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill.name}
                          title={skill.details}
                          className="surface-inset inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                          style={{ color: "var(--color-text-main)" }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 4: Professional Contributions */}
          <div className="surface-card rounded-2xl p-6 sm:p-8 space-y-5">
            <h3
              className="font-heading text-xl sm:text-[22px] font-bold tracking-tight"
              style={{ color: "var(--color-text-main)" }}
            >
              {isEN ? "Engineering Contributions" : "Kontribusi Profesional"}
            </h3>

            <div className="space-y-3.5">
              {contributions.map((item) => (
                <div
                  key={item.title}
                  className="surface-inset rounded-xl p-4 flex items-start gap-3"
                >
                  <CheckCircle2
                    className="w-4 h-4 mt-1 shrink-0"
                    style={{ color: "var(--color-emerald)" }}
                    aria-hidden="true"
                  />
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-sm font-bold leading-snug" style={{ color: "var(--color-text-main)" }}>
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
