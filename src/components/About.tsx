"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { uiTranslations } from "@/data/translations";

export default function About() {
  const [isExpandedStory, setIsExpandedStory] = useState(false);
  const { lang, isEN } = useLanguage();
  const t = uiTranslations[lang];

  return (
    <article className="space-y-6">
      {/* PROFESSIONAL OVERVIEW (ABOUT VIEW) */}
      <section id="about" className="w-full scroll-mt-20">
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800/80 p-5 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5 dark:shadow-black/50 transition-colors">
          
          {/* Section Header with Accent */}
          <div className="space-y-2.5 border-b border-slate-200/80 dark:border-slate-800/80 pb-6 mb-8">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              {t.about.badge}
            </div>

            <div className="flex items-baseline gap-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {t.about.title}
              </h1>
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                .
              </span>
            </div>

            <div className="h-1 w-12 rounded-full bg-blue-600 dark:bg-blue-500" />
          </div>

          {/* 2-Column Split: Engineering Metrics Profile (Left) & Narrative (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Engineering Profile Spec Card */}
            <div className="md:col-span-4 space-y-4">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 block mb-1">
                  {t.about.specTitle}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                  {t.about.specSubtitle}
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="rounded-xl p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
                  <span className="font-mono text-[10px] uppercase text-slate-400 dark:text-slate-500 block">
                    {t.about.roleLabel}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {t.about.roleVal}
                  </span>
                </div>

                <div className="rounded-xl p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
                  <span className="font-mono text-[10px] uppercase text-slate-400 dark:text-slate-500 block">
                    {t.about.locationLabel}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {t.about.locationVal}
                  </span>
                </div>

                <div className="rounded-xl p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
                  <span className="font-mono text-[10px] uppercase text-slate-400 dark:text-slate-500 block">
                    {t.about.honorsLabel}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {t.about.honorsVal}
                  </span>
                </div>

                <div className="rounded-xl p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
                  <span className="font-mono text-[10px] uppercase text-slate-400 dark:text-slate-500 block">
                    {t.about.certLabel}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {t.about.certVal}
                  </span>
                </div>
              </div>

              {/* Operational SLO Guarantee */}
              <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-transparent border border-blue-500/20">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-blue-400">
                    {t.about.sloLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.about.sloDesc}
                </p>
              </div>
            </div>

            {/* Right: Executive Narrative Story */}
            <div className="md:col-span-8 space-y-4 text-sm sm:text-base leading-relaxed sm:leading-loose text-slate-700 dark:text-slate-300 font-sans">
              {isEN ? (
                <>
                  <p>
                    Computer Science graduate from{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      Pamulang University (GPA: 3.59 / 4.00)
                    </strong>{" "}
                    with deep domain expertise in{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      DevOps Engineering
                    </span>
                    ,{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      Cloud Infrastructure
                    </span>
                    , and enterprise-grade production application lifecycle management.
                  </p>
                  <p>
                    Proven track record in designing resilient AWS production environments{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      (EC2, Multi-AZ RDS MySQL, VPC network isolation)
                    </strong>
                    , containerizing microservices with{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      Docker
                    </strong>
                    , building automated CI/CD pipelines via{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      GitLab CI/CD
                    </strong>
                    , configuring reverse proxies with{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      Nginx &amp; PM2
                    </strong>
                    , and driving full-stack observability with{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      Prometheus, Grafana, and Grafana k6
                    </strong>
                    .
                  </p>

                  {isExpandedStory && (
                    <div className="space-y-3 pt-1 text-slate-600 dark:text-slate-300 animate-fadeIn">
                      <p>
                        My engineering methodology focuses on reproducible Infrastructure as Code (IaC), continuous delivery pipelines, defense-in-depth security (least-privilege IAM, strict VPC subnetting, and automated security group firewalls), and preemptive incident prevention through high-concurrency stress benchmarks prior to release.
                      </p>
                      <p>
                        Spearheaded cloud deployments for the <strong className="text-slate-800 dark:text-slate-200">Adaptive Learning Platform POLINEMA (SEALS)</strong> with load benchmarks of 100 concurrent Virtual Users (VUs) and zero error rate, and architected a fault-tolerant 3-tier High Availability cloud foundation for <strong className="text-slate-800 dark:text-slate-200">Gazebo Samasta on AWS</strong>. Formally certified as a BNSP Network Administrator and credentialed by AWS Academy and Alibaba Cloud.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p>
                    Lulusan{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      S1 Teknik Informatika Universitas Pamulang (IPK 3.59)
                    </strong>{" "}
                    yang memiliki kompetensi mendalam di bidang{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      DevOps Engineering
                    </span>
                    ,{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      Cloud Infrastructure
                    </span>
                    , serta pengelolaan ekosistem aplikasi skala produksi.
                  </p>
                  <p>
                    Berpengalaman nyata dalam merancang infrastruktur produksi berbasis{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      AWS (EC2, RDS MySQL Multi-AZ, VPC terisolasi)
                    </strong>
                    , containerization dengan{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      Docker
                    </strong>
                    , automasi pipeline{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      GitLab CI/CD
                    </strong>
                    , reverse proxy{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      Nginx &amp; PM2
                    </strong>
                    , serta telemetri observabilitas real-time menggunakan{" "}
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      Prometheus, Grafana, dan Grafana K6
                    </strong>
                    .
                  </p>

                  {isExpandedStory && (
                    <div className="space-y-3 pt-1 text-slate-600 dark:text-slate-300 animate-fadeIn">
                      <p>
                        Dalam pendekatan rekayasa cloud dan DevOps, saya berfokus pada otomasi terukur (Infrastructure as Code &amp; Continuous Delivery), standar keamanan berlapis (Least Privilege IAM, isolasi VPC, dan firewall Security Groups), serta pencegahan insiden melalui simulasi stress test beban ekstrem sebelum rilis produksi.
                      </p>
                      <p>
                        Telah memimpin implementasi cloud deployment pada <strong className="text-slate-800 dark:text-slate-200">Adaptive Learning Platform POLINEMA (SEALS)</strong> dengan uji beban 100 concurrent Virtual Users (VUs) zero error rate, serta merancang arsitektur 3-tier High Availability untuk <strong className="text-slate-800 dark:text-slate-200">Gazebo Samasta AWS Reservation</strong>. Memegang sertifikasi kompetensi nasional BNSP Network Administrator dan kredensial resmi dari AWS Academy &amp; Alibaba Cloud.
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Toggle Read More / Collapse */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsExpandedStory(!isExpandedStory)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer select-none py-1"
                  aria-expanded={isExpandedStory}
                >
                  <span>{isExpandedStory ? t.common.showLess : t.common.readMore}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isExpandedStory ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Core Competencies Badges */}
              <div className="pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">
                  {t.about.coreComp}
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    "AWS Cloud",
                    "Docker & K8s",
                    "GitLab CI/CD",
                    "Terraform IaC",
                    "Prometheus & Grafana",
                    "Linux & Nginx",
                    "MySQL Multi-AZ",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Navigation Action Buttons */}
              <div className="pt-4 flex items-center gap-3 flex-wrap">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{t.about.explorePortfolio}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                >
                  <span>{t.about.viewFullResume}</span>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>
    </article>
  );
}
