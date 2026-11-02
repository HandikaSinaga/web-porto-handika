"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useIsMounted } from "@/hooks/useIsMounted";
import { usePortfolioData } from "@/data/portfolioData";
import { uiTranslations } from "@/data/translations";
import { Project, ProjectImage } from "@/types/portfolio";
import ExpandableText from "@/components/ExpandableText";
import {
  ExternalLink,
  CheckCircle2,
  X,
  FileText,
  Briefcase,
  AlertCircle,
  Eye,
  Server,
  Cloud,
  ArrowRight,
  Database,
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Presentation,
  ZoomIn,
  Layers,
} from "lucide-react";

export default function Projects() {
  const { projectsData, lang } = usePortfolioData();
  const t = uiTranslations[lang];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "gallery" | "architecture" | "challenges"
  >("overview");
  const [lightboxImage, setLightboxImage] = useState<ProjectImage | null>(null);
  const [galleryCategory, setGalleryCategory] = useState<string>("Semua");
  const [projectFilter, setProjectFilter] = useState<string>("Semua");
  const isMounted = useIsMounted();
  const modalBodyRef = useRef<HTMLDivElement>(null);

  const activeProject = useMemo(() => {
    if (!selectedProject) return null;
    return projectsData.find((p) => p.id === selectedProject.id) || selectedProject;
  }, [selectedProject, projectsData]);

  // Lock body scroll when any modal or lightbox is active
  useEffect(() => {
    if (selectedProject || lightboxImage) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedProject, lightboxImage]);

  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  useEffect(() => {
    const handleOpenProjectModal = (e: Event) => {
      const customEvent = e as CustomEvent<{
        projectId?: string;
        tab?: "overview" | "gallery" | "architecture" | "challenges";
      }>;
      const { projectId, tab } = customEvent.detail || {};
      if (!projectId) return;

      const project = projectsData.find((p) => p.id === projectId);
      if (project) {
        setSelectedProject(project);
        if (tab) setActiveTab(tab);
      }
    };

    window.addEventListener("open-project-modal", handleOpenProjectModal as EventListener);
    return () => {
      window.removeEventListener("open-project-modal", handleOpenProjectModal as EventListener);
    };
  }, [projectsData]);

  // Dynamic category pills derived from selected project's gallery
  const allLabel = lang === "EN" ? "All" : "Semua";
  const availableCategories = useMemo(() => {
    if (!activeProject?.gallery) return [];
    const cats = Array.from(
      new Set(
        activeProject.gallery
          .map((img) => img.category)
          .filter(Boolean) as string[]
      )
    );
    return [allLabel, ...cats];
  }, [activeProject, allLabel]);

  // Pure derived active category ensuring validity without effect-driven setState
  const activeGalleryCategory = useMemo(() => {
    if (availableCategories.includes(galleryCategory)) return galleryCategory;
    return allLabel;
  }, [availableCategories, galleryCategory, allLabel]);

  const visibleGalleryImages = useMemo(() => {
    if (!activeProject?.gallery) return [];
    if (activeGalleryCategory === allLabel) return activeProject.gallery;
    return activeProject.gallery.filter((img) => img.category === activeGalleryCategory);
  }, [activeProject, activeGalleryCategory, allLabel]);

  const currentGallery = useMemo(() => activeProject?.gallery || [], [activeProject]);
  const currentLightboxIndex = useMemo(() => {
    if (!lightboxImage || !currentGallery.length) return -1;
    return currentGallery.findIndex((img) => img.url === lightboxImage.url);
  }, [lightboxImage, currentGallery]);

  const handlePrevLightbox = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentGallery.length <= 1 || currentLightboxIndex === -1) return;
      const prevIndex = (currentLightboxIndex - 1 + currentGallery.length) % currentGallery.length;
      setLightboxImage(currentGallery[prevIndex]);
    },
    [currentGallery, currentLightboxIndex]
  );

  const handleNextLightbox = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentGallery.length <= 1 || currentLightboxIndex === -1) return;
      const nextIndex = (currentLightboxIndex + 1) % currentGallery.length;
      setLightboxImage(currentGallery[nextIndex]);
    },
    [currentGallery, currentLightboxIndex]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImage) setLightboxImage(null);
        else if (selectedProject) setSelectedProject(null);
      } else if (lightboxImage) {
        if (e.key === "ArrowLeft") handlePrevLightbox();
        else if (e.key === "ArrowRight") handleNextLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage, selectedProject, handlePrevLightbox, handleNextLightbox]);

  const handleNavigateToExperience = (expId: string) => {
    setSelectedProject(null);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-experience", { detail: { expId } }));
      const el = document.getElementById(`experience-${expId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-blue-500");
        setTimeout(() => el.classList.remove("ring-2", "ring-blue-500"), 2500);
      }
    }, 150);
  };

  const filteredProjects = projectsData.filter((p) => {
    if (projectFilter === "Semua") return true;
    if (projectFilter === "Client") return p.category.toLowerCase().includes("client");
    if (projectFilter === "MSIB")
      return p.category.toLowerCase().includes("msib") || p.organization.toLowerCase().includes("seal");
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. FEATURED PROJECTS SECTION */}
      <section id="portfolio" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div id="projects" className="scroll-mt-20" />
        <div className="rounded-3xl bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5 dark:shadow-black/50 transition-colors">
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">03</span>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {t.projects.title}
                </h3>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.projects.subtitle}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setProjectFilter("Semua")}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                  projectFilter === "Semua"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {lang === "EN" ? "All" : "Semua"} <span className="ml-1 text-[10px] opacity-80">2</span>
              </button>
              <button
                onClick={() => setProjectFilter("Client")}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                  projectFilter === "Client"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {lang === "EN" ? "Client Projects" : "Proyek Klien"} <span className="ml-1 text-[10px] opacity-80">1</span>
              </button>
              <button
                onClick={() => setProjectFilter("MSIB")}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                  projectFilter === "MSIB"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {lang === "EN" ? "MSIB Projects" : "Proyek MSIB"} <span className="ml-1 text-[10px] opacity-80">1</span>
              </button>
            </div>
          </div>

          {/* Project List: In-depth Bento Layout */}
          <div className="space-y-10">
            {/* Project 1: SEALS POLINEMA */}
            {filteredProjects.some((p) => p.id === "adaptive-learning-polinema") && (
              <div
                id="project-seals-polinema"
                className="rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 transition-all hover:border-blue-500/30 space-y-6"
              >
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {lang === "EN" ? "CLIENT PROJECT • PROFILE IMAGE STUDIO" : "PROYEK KLIEN • PROFILE IMAGE STUDIO"}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                    {projectsData.find((p) => p.id === "adaptive-learning-polinema")?.title || "Adaptive Learning Platform for POLINEMA (SEALS)"}
                  </h4>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 font-mono mt-1">
                    {lang === "EN"
                      ? "Role: Cloud Engineer & DevOps Specialist (PROFILE IMAGE STUDIO × SEAL)"
                      : "Peran: Cloud Engineer & DevOps Specialist (PROFILE IMAGE STUDIO × SEAL)"}
                  </p>
                </div>

                <ExpandableText
                  text={
                    projectsData.find((p) => p.id === "adaptive-learning-polinema")?.description ||
                    ""
                  }
                  previewWords={24}
                  maxWords={300}
                  expandLabel={t.common.readMore}
                  collapseLabel={t.common.showLess}
                  className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-loose"
                >
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {lang === "EN" ? "AWS VPC Network Isolation & Security Groups" : "Segmentasi Jaringan AWS VPC & Security Groups"}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed sm:leading-loose mt-0.5">
                          {lang === "EN"
                            ? "Configured 10.0.0.0/16 VPC with multi-tier Security Groups, restricting MySQL 3306 database port access strictly to application EC2 instances."
                            : "Mengonfigurasi VPC 10.0.0.0/16 dengan firewall Security Groups berlapis, mengunci akses port database MySQL 3306 hanya untuk instance aplikasi EC2."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {lang === "EN" ? "Nginx Reverse Proxy & PM2 Process Clustering" : "Nginx Reverse Proxy & PM2 Process Clustering"}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed sm:leading-loose mt-0.5">
                          {lang === "EN"
                            ? "Configured domain seals.id routing and API reverse-proxying with automated SSL, plus PM2 clustering for zero-downtime reloads and automated crash recovery."
                            : "Routing domain seals.id dan proxy ke backend api.seals.id dengan SSL otomatis, serta PM2 clustering untuk auto-restart saat exception dan zero-downtime maintenance."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {lang === "EN" ? "Grafana k6 Stress Benchmarks & Real-Time Observability" : "Validasi Stress Test Grafana K6 & Observabilitas Real-Time"}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed sm:leading-loose mt-0.5">
                          {lang === "EN"
                            ? "Executed 100 Virtual Users (20,100 requests) stress testing and built Prometheus/Grafana dashboards for real-time CPU, memory, and network telemetry."
                            : "Pengujian ketahanan beban 100 Virtual Users (20.100 requests) dan dashboard Prometheus/Grafana untuk telemetri CPU, memori, dan trafik real-time hingga serah terima sukses."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      AWS EC2 t3.medium
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      AWS RDS MySQL
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      AWS VPC (10.0.0.0/16)
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      Nginx + PM2
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      Prometheus &amp; Grafana
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      Grafana K6
                    </span>
                  </div>

                  {/* Actions & Verification */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                    <a
                      href="https://seals.id"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-600/30 transition-all"
                    >
                      <span>{lang === "EN" ? "Visit seals.id" : "Kunjungi seals.id"}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        const proj = projectsData.find((p) => p.id === "adaptive-learning-polinema");
                        if (proj) setSelectedProject(proj);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-500" />
                      <span>{lang === "EN" ? "Open Blueprint & Artifacts" : "Buka Blueprint & Artefak"}</span>
                    </button>

                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-semibold flex items-center gap-1.5 ml-auto">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {lang === "EN" ? "Production Handover Complete" : "Produksi Diserahterimakan"}
                    </span>
                  </div>
                </ExpandableText>
              </div>
            )}

            {/* Project 2: Gazebo Samasta */}
            {filteredProjects.some((p) => p.id === "gazebo-samasta-reservation") && (
              <div
                id="project-gazebo-samasta"
                className="rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 transition-all hover:border-indigo-500/30 space-y-6"
              >
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {lang === "EN" ? "MSIB CAPSTONE PROJECT • PROJECT LEADER" : "MSIB FINAL PROJECT • PROJECT LEADER"}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                    {projectsData.find((p) => p.id === "gazebo-samasta-reservation")?.title || "Aplikasi Reservasi Restoran di AWS (Gazebo Samasta)"}
                  </h4>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 font-mono mt-1">
                    {lang === "EN"
                      ? "Role: Project Leader & Cloud Engineer (Kelompok B_Jakarta • 7 Members)"
                      : "Peran: Project Leader & Cloud Engineer (Kelompok B_Jakarta • 7 Anggota)"}
                  </p>
                </div>

                <ExpandableText
                  text={
                    projectsData.find((p) => p.id === "gazebo-samasta-reservation")?.description ||
                    ""
                  }
                  previewWords={26}
                  maxWords={300}
                  expandLabel={t.common.readMore}
                  collapseLabel={t.common.showLess}
                  className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-loose"
                >
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {lang === "EN" ? "7-Engineer Cross-Functional Leadership" : "Kepemimpinan Proyek Tim 7 Orang"}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed sm:leading-loose mt-0.5">
                          {lang === "EN"
                            ? "Led weekly sprint ceremonies, task allocation across frontend, backend, and cloud teams, stress benchmarks, and final technical delivery."
                            : "Memimpin koordinasi sprint mingguan, pembagian tugas frontend, backend, infrastruktur cloud, pengujian beban, hingga pembuatan dokumentasi teknis akhir."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {lang === "EN" ? "Multi-AZ High Availability & Dynamic Auto Scaling" : "High Availability & Auto Scaling Dinamis"}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed sm:leading-loose mt-0.5">
                          {lang === "EN"
                            ? "Integrated ALB with dynamic Auto Scaling Groups on EC2 and Multi-AZ RDS MySQL to guarantee fault-tolerant operations during rush hours."
                            : "Mengintegrasikan ALB dengan Auto Scaling Group pada EC2 serta Amazon RDS MySQL Multi-AZ untuk memastikan toleransi kegagalan tanpa downtime pada jam sibuk."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {lang === "EN" ? "CloudWatch & SNS Early Warning System" : "Sistem Alarm Dini CloudWatch & SNS"}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed sm:leading-loose mt-0.5">
                          {lang === "EN"
                            ? "Configured automated alarms monitoring CPU load and error thresholds, dispatching instant SNS email notifications to the engineering lead."
                            : "Konfigurasi metrik utilisasi CPU dan alarm otomatis yang mengirimkan email peringatan dini ke tim jika terjadi lonjakan beban komputasi."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      AWS VPC (Multi-AZ)
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      Elastic Load Balancer
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      Auto Scaling Group
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      RDS MySQL Multi-AZ
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      Amazon CloudWatch
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                      Amazon SNS
                    </span>
                  </div>

                  {/* Actions & Verification */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                    <a
                      href="https://s.id/28vAD"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all"
                    >
                      <span>{lang === "EN" ? "Open Pitch Deck & Docs" : "Buka Presentasi & Dokumen"}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        const proj = projectsData.find((p) => p.id === "gazebo-samasta-reservation");
                        if (proj) setSelectedProject(proj);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{lang === "EN" ? "Open Blueprint & Artifacts" : "Buka Blueprint & Artefak"}</span>
                    </button>

                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-semibold flex items-center gap-1.5 ml-auto">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      {lang === "EN" ? "MSIB Capstone Graduated" : "Final Project MSIB Lulus"}
                    </span>
                  </div>
                </ExpandableText>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. MODAL: IN-DEPTH PROJECT DOSSIER & ARTIFACTS */}
      {isMounted && activeProject && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090e1a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                    {activeProject.organization} • {activeProject.period}
                  </span>
                  {activeProject.teamName && (
                    <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                      {activeProject.teamName}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {activeProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {activeProject.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {activeProject.documentationUrl && (
                  <a
                    href={activeProject.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{lang === "EN" ? "Deck & Artifacts" : "Slide & Artefak"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label={lang === "EN" ? "Close Modal" : "Tutup Modal"}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1220] flex items-center gap-1 sm:gap-2 overflow-x-auto shrink-0 scrollbar-thin">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {t.projects.tabOverview}
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "gallery"
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <span>{t.projects.tabGallery}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 rounded-full font-mono">
                  {activeProject.gallery?.length || 0}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "architecture"
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {t.projects.tabArchitecture}
              </button>
              <button
                onClick={() => setActiveTab("challenges")}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "challenges"
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {t.projects.tabChallenges}
              </button>
            </div>

            {/* Modal Body */}
            <div ref={modalBodyRef} className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
              {/* Tab: Overview */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {activeProject.relatedExperienceId && (
                    <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                            {lang === "EN" ? "Related Work Experience / Internship" : "Terkait Pengalaman Kerja / Magang"}
                          </div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {activeProject.relatedExperienceRole} {lang === "EN" ? "at" : "di"} {activeProject.relatedExperienceCompany}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const expId = activeProject.relatedExperienceId!;
                          setSelectedProject(null);
                          handleNavigateToExperience(expId);
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all shrink-0"
                      >
                        <span>{lang === "EN" ? "Open Experience Record" : "Buka Rekam Jejak Pengalaman"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
                      {lang === "EN" ? "Executive Summary" : "Deskripsi Ringkas"}
                    </h4>
                    <ExpandableText
                      text={activeProject.description}
                      previewWords={28}
                      maxWords={300}
                      className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-loose"
                    />
                  </div>

                  {/* Highlights / Details */}
                  {activeProject.details && activeProject.details.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
                        {lang === "EN" ? "Key Deliverables & Project Impact" : "Capaian Utama & Hasil Proyek"}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeProject.details.map((hl, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/80 flex items-start gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {hl}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Gallery */}
              {activeTab === "gallery" && (
                <div className="space-y-6">
                  {/* Presentation & Artifacts Highlight Banner */}
                  {activeProject.id === "gazebo-samasta-reservation" && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/10 border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
                          <Presentation className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300/40 dark:border-blue-800">
                              Official Final Project Deck
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              {lang === "EN" ? "18 HD Slides • PPTX Format" : "18 Slide HD • Format PPTX"}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {lang === "EN"
                              ? "Presentation Deck & 3-Tier Multi-AZ Architecture Topology"
                              : "Slide Presentasi & Topologi Arsitektur 3-Tier Multi-AZ"}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                            {lang === "EN"
                              ? "Complete architectural blueprint for Gazebo Samasta Makassar restaurant reservation: AWS Cloud architecture, Multi-AZ ALB, Auto Scaling EC2, standby RDS MySQL, and CloudWatch & SNS observability."
                              : "Rancangan lengkap sistem reservasi restoran Gazebo Samasta Makassar: arsitektur cloud AWS, Multi-AZ ALB, Auto Scaling EC2, RDS MySQL standby, serta observabilitas CloudWatch & SNS."}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 pt-2 md:pt-0">
                        {activeProject.presentationFileUrl && (
                          <a
                            href={activeProject.presentationFileUrl}
                            download="gazebo-samasta-final-presentation.pptx"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm shadow-blue-500/25"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{t.projects.downloadPptx}</span>
                          </a>
                        )}
                        {activeProject.presentationUrl && (
                          <a
                            href={activeProject.presentationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                            <span>{t.projects.openGdrive}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {activeProject.id === "adaptive-learning-polinema" && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900/20 via-blue-900/20 to-indigo-900/10 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                          <Cloud className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-800">
                              Live Production Verified
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              {lang === "EN" ? "14 Cloud & Web Platform Artifacts" : "14 Artefak Cloud & Web Platform"}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {lang === "EN"
                              ? "AWS Blueprint Artifacts, Grafana k6 Observability & SEALS Web Platform"
                              : "Artefak Blueprint AWS, Observabilitas Grafana K6 & Web Platform SEALS"}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                            {lang === "EN"
                              ? "Production-verified documentation: isolated VPC (CIDR 10.0.0.0/16), t3.medium EC2 instances, Nginx Reverse Proxy seals.id, k6 100 VUs stress testing, and complete adaptive learning interface."
                              : "Dokumentasi produksi terverifikasi: VPC terisolasi (CIDR 10.0.0.0/16), instance EC2 t3.medium, Nginx Reverse Proxy seals.id, stress test K6 100 VUs, dan seluruh antarmuka web adaptif."}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 pt-2 md:pt-0">
                        {activeProject.liveUrl && (
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm shadow-emerald-500/25"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{lang === "EN" ? "Visit seals.id" : "Kunjungi seals.id"}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Filter Pills with Counts */}
                  {availableCategories.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-slate-200/60 dark:border-slate-800/80">
                      {availableCategories.map((cat) => {
                        const count =
                          cat === allLabel
                            ? activeProject.gallery?.length || 0
                            : activeProject.gallery?.filter((img) => img.category === cat).length || 0;

                        const isActive = activeGalleryCategory === cat;

                        return (
                          <button
                            key={cat}
                            onClick={() => setGalleryCategory(cat)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                              isActive
                                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                                : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            <span>{cat}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                              }`}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Artifacts Grid */}
                  {visibleGalleryImages.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {visibleGalleryImages.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setLightboxImage(img)}
                          className="group rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0c1424] hover:border-blue-500/70 dark:hover:border-blue-500/70 transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col"
                        >
                          {/* Image Container */}
                          <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                            <Image
                              src={img.url}
                              alt={img.title || img.caption}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                            {/* Top Badges */}
                            <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                              {img.category && (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-blue-300 border border-white/10">
                                  {img.category}
                                </span>
                              )}
                              <span className="ml-auto px-1.5 py-0.5 rounded-md text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-md border border-white/10">
                                #{String(idx + 1).padStart(2, "0")}
                              </span>
                            </div>

                            {/* Hover Zoom Prompt */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/90 text-white text-xs font-semibold backdrop-blur-sm shadow-lg">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>{lang === "EN" ? "Zoom Artifact" : "Perbesar Artefak"}</span>
                              </span>
                            </div>
                          </div>

                          {/* Card Content Footer */}
                          <div className="p-3.5 flex flex-col flex-1 justify-between gap-1.5 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-slate-800/80">
                            <div>
                              <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {img.title || img.caption}
                              </h5>
                              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                                {img.caption}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-800/60 text-[10px] font-mono text-slate-400">
                              <span>{lang === "EN" ? "Click for full detail" : "Klik untuk detail lengkap"}</span>
                              <ZoomIn className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
                      <Layers className="w-8 h-8 text-slate-400 mx-auto" />
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {lang === "EN" ? "No artifacts found in this category" : "Tidak ada artefak dalam kategori ini"}
                      </div>
                      <button
                        onClick={() => setGalleryCategory(allLabel)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        {lang === "EN" ? "Show All Artifacts" : "Tampilkan Semua Artefak"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Architecture */}
              {activeTab === "architecture" && activeProject.architectureDetails && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                      {lang === "EN" ? "Region & Networking" : "Region & Jaringan"}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed sm:leading-loose">
                      Region: {activeProject.architectureDetails.region} • Availability Zones:{" "}
                      {activeProject.architectureDetails.zones.join(", ")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
                        <Server className="w-4 h-4 text-blue-500" />
                        <span>Web &amp; App Layer</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {activeProject.architectureDetails.webTier}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                        {activeProject.architectureDetails.appTier}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
                        <Cloud className="w-4 h-4 text-sky-500" />
                        <span>{lang === "EN" ? "Network Security" : "Keamanan Jaringan"}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {activeProject.architectureDetails.networkSecurity}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
                        <Database className="w-4 h-4 text-indigo-500" />
                        <span>Database &amp; Monitoring</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {activeProject.architectureDetails.dbTier}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                        {activeProject.architectureDetails.monitoring}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Challenges */}
              {activeTab === "challenges" && activeProject.challenges && (
                <div className="space-y-4">
                  {activeProject.challenges.map((ch, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                            {lang === "EN" ? "Operational Challenge" : "Tantangan Operasional"}
                          </div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {ch.challenge}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div className="w-full">
                          <div className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                            {lang === "EN" ? "Engineering Solution & Outcome" : "Solusi Rekayasa & Hasil"}
                          </div>
                          <ExpandableText
                            text={ch.solution}
                            previewWords={20}
                            maxWords={300}
                            className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 4. LIGHTBOX IMAGE ZOOM MODAL */}
      {isMounted && lightboxImage && createPortal(
        <div
          className="fixed inset-0 z-[120] flex flex-col justify-between p-3 sm:p-6 bg-slate-950/95 backdrop-blur-xl animate-fadeIn select-none"
          onClick={() => setLightboxImage(null)}
        >
          {/* Header Bar */}
          <div
            className="w-full max-w-6xl mx-auto flex items-center justify-between gap-3 text-white pb-3 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-blue-600/30 text-blue-300 border border-blue-500/30">
                {lightboxImage.category || (lang === "EN" ? "Artifact" : "Artefak")}
              </span>
              {currentGallery.length > 0 && currentLightboxIndex !== -1 && (
                <span className="text-xs font-mono text-slate-400">
                  {currentLightboxIndex + 1} / {currentGallery.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={lightboxImage.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title={lang === "EN" ? "Open Original Image (New Tab)" : "Buka Gambar Asli (Tab Baru)"}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={lightboxImage.url}
                download
                className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title={lang === "EN" ? "Download Artifact" : "Unduh Artefak"}
              >
                <Download className="w-4 h-4" />
              </a>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-red-500/80 transition-colors"
                aria-label={lang === "EN" ? "Close Lightbox" : "Tutup Lightbox"}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Stage with Navigation Chevrons */}
          <div
            className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-2 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Chevron */}
            {currentGallery.length > 1 && (
              <button
                onClick={handlePrevLightbox}
                className="absolute left-1 sm:left-3 z-30 p-2.5 sm:p-3.5 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white transition-all shadow-xl border border-slate-700/80 backdrop-blur-sm group"
                aria-label={lang === "EN" ? "Previous Artifact (Left Arrow)" : "Artefak Sebelumnya (Panah Kiri)"}
                title={lang === "EN" ? "Previous (←)" : "Sebelumnya (←)"}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}

            {/* Next Chevron */}
            {currentGallery.length > 1 && (
              <button
                onClick={handleNextLightbox}
                className="absolute right-1 sm:right-3 z-30 p-2.5 sm:p-3.5 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white transition-all shadow-xl border border-slate-700/80 backdrop-blur-sm group"
                aria-label={lang === "EN" ? "Next Artifact (Right Arrow)" : "Artefak Selanjutnya (Panah Kanan)"}
                title={lang === "EN" ? "Next (→)" : "Selanjutnya (→)"}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}

            {/* Image Container */}
            <div className="relative w-full h-full max-h-[66vh] rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex items-center justify-center shadow-2xl">
              <Image
                src={lightboxImage.url}
                alt={lightboxImage.caption}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Footer Info & Thumbnail Carousel */}
          <div
            className="w-full max-w-6xl mx-auto space-y-2 pt-2 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Captions */}
            <div className="text-center px-4 max-w-3xl mx-auto">
              <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                {lightboxImage.title || lightboxImage.caption}
              </h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {lightboxImage.caption}
              </p>
            </div>

            {/* Thumbnail Carousel */}
            {currentGallery.length > 1 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 scrollbar-thin max-w-full">
                {currentGallery.map((thumb, idx) => {
                  const isCurrent = thumb.url === lightboxImage.url;
                  return (
                    <button
                      key={idx}
                      onClick={() => setLightboxImage(thumb)}
                      className={`relative w-14 h-9 sm:w-16 sm:h-10 rounded-lg overflow-hidden shrink-0 border transition-all ${
                        isCurrent
                          ? "ring-2 ring-blue-500 border-white scale-105 opacity-100"
                          : "border-slate-800 opacity-50 hover:opacity-100"
                      }`}
                      title={thumb.title || thumb.caption}
                    >
                      <Image
                        src={thumb.url}
                        alt={thumb.title || ""}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
