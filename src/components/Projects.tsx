"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { projectsData } from "@/data/portfolioData";
import { Project, ProjectImage } from "@/types/portfolio";
import {
  Cloud,
  CheckCircle2,
  ExternalLink,
  Shield,
  X,
  Users,
  Calendar,
  AlertTriangle,
  FileText,
  Bell,
  Network,
  Crown,
  ChevronRight,
  ChevronLeft,
  Image as ImageIcon,
  ZoomIn,
  Briefcase,
  ArrowRight,
} from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "gallery" | "background" | "architecture" | "timeline" | "challenges"
  >("overview");
  const [lightboxImage, setLightboxImage] = useState<ProjectImage | null>(null);
  const [galleryCategory, setGalleryCategory] = useState<string>("Semua");
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [activeTab, selectedProject]);

  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeBtn = tabsContainerRef.current.querySelector<HTMLButtonElement>(
        `[data-tab="${activeTab}"]`
      );
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeTab, selectedProject]);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsContainerRef.current) {
      const offset = direction === "left" ? -220 : 220;
      tabsContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleOpenProjectModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId?: string; tab?: typeof activeTab }>;
      const projectId = customEvent.detail?.projectId;
      const tab = customEvent.detail?.tab || "overview";
      if (!projectId) return;

      const found = projectsData.find((p) => p.id === projectId);
      if (found) {
        setSelectedProject(found);
        setActiveTab(tab);
        setGalleryCategory("Semua");
      }
    };

    window.addEventListener("open-project-modal", handleOpenProjectModal);
    return () => {
      window.removeEventListener("open-project-modal", handleOpenProjectModal);
    };
  }, []);

  const handleNavigateToExperience = (expId: string) => {
    // 1. Dispatch custom event so About component switches to experience tab and focuses the card
    window.dispatchEvent(
      new CustomEvent("open-experience", {
        detail: { expId },
      })
    );

    // 2. Smoothly scroll to #about or specific card
    const targetEl = document.getElementById(`experience-${expId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      targetEl.classList.add("ring-4", "ring-blue-500/60");
      setTimeout(() => targetEl.classList.remove("ring-4", "ring-blue-500/60"), 2500);
    } else {
      const aboutSec = document.getElementById("about");
      if (aboutSec) aboutSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openModal = (project: Project, tab: typeof activeTab = "overview") => {
    setSelectedProject(project);
    setActiveTab(tab);
    setGalleryCategory("Semua");
  };

  return (
    <section id="projects" className="py-28 relative overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-mono font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
            {"// 03. PROYEK UNGGULAN"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Arsitektur Cloud & <span className="text-blue-600 dark:text-blue-400">Proyek Pilihan</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Implementasi infrastruktur produksi AWS Multi-AZ, otomatisasi deployment multi-tier,
            dan perancangan sistem berdaya tahan tinggi yang telah saya pimpin dan kerjakan.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-blue-400/80 dark:hover:border-blue-600/80 transition-all duration-300"
            >
              <div className="p-6 sm:p-8 space-y-5">
                {/* Card Top Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                      {project.organization}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {project.period}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-800">
                    {project.category}
                  </span>
                </div>

                {/* Title & Role */}
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">
                      Peran: <strong className="text-slate-900 dark:text-white font-semibold">{project.role}</strong>
                    </span>
                    {project.teamName && (
                      <>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400 font-medium">
                          {project.teamName}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Architecture Highlights Chips */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Arsitektur & Pilar Teknis:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.architectureHighlights.map((hl) => (
                      <span
                        key={hl}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800"
                      >
                        ✓ {hl}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Linked Experience Card */}
                {project.relatedExperienceId && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2 min-w-0 text-xs">
                      <Briefcase className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <div className="break-words">
                        <span className="text-slate-500">Terkait: </span>
                        <strong className="text-slate-800 dark:text-slate-200 font-semibold">
                          {project.relatedExperienceCompany}
                        </strong>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNavigateToExperience(project.relatedExperienceId!)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                    >
                      <span>Lihat Riwayat</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 sm:p-8 pt-0">
                <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    onClick={() => openModal(project, "overview")}
                    data-project={project.id}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
                  >
                    <span>Rincian & Arsitektur</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {project.gallery && project.gallery.length > 0 && (
                    <button
                      onClick={() => openModal(project, "gallery")}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                      <span>Galeri ({project.gallery.length})</span>
                    </button>
                  )}

                  {project.documentationUrl && (
                    <a
                      href={project.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-doc-link={project.id}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Artefak</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog for Deep Project Inspection & Presentation Dossier */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090e1a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 shrink-0">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                    {selectedProject.organization} • {selectedProject.period}
                  </span>
                  {selectedProject.teamName && (
                    <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                      {selectedProject.teamName}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {selectedProject.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {selectedProject.documentationUrl && (
                  <a
                    href={selectedProject.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Slide & Artefak</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Navigation Tabs (If rich presentation data exists) */}
            {selectedProject.timelinePhases && (
              <div className="relative shrink-0 border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/50 flex items-center">
                <button
                  type="button"
                  onClick={() => scrollTabs("left")}
                  className="hidden sm:flex items-center justify-center p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors shrink-0 z-10"
                  aria-label="Scroll tabs left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div
                  ref={tabsContainerRef}
                  className="flex-1 flex items-center px-3 sm:px-2 overflow-x-auto scrollbar-thin py-0.5 gap-1"
                >
                  <button
                    onClick={() => setActiveTab("overview")}
                    data-tab="overview"
                    className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                      activeTab === "overview"
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-white/70 dark:bg-slate-800/80 rounded-t-lg shadow-xs"
                        : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Ikhtisar & Tim</span>
                  </button>

                  {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <button
                      onClick={() => setActiveTab("gallery")}
                      data-tab="gallery"
                      className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                        activeTab === "gallery"
                          ? "border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400 bg-white/70 dark:bg-slate-800/80 rounded-t-lg shadow-xs"
                          : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <ImageIcon className="w-4 h-4 shrink-0" />
                      <span>Dokumentasi ({selectedProject.gallery.length})</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveTab("background")}
                    data-tab="background"
                    className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                      activeTab === "background"
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-white/70 dark:bg-slate-800/80 rounded-t-lg shadow-xs"
                        : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Latar Belakang & Masalah</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("architecture")}
                    data-tab="architecture"
                    className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                      activeTab === "architecture"
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-white/70 dark:bg-slate-800/80 rounded-t-lg shadow-xs"
                        : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Cloud className="w-4 h-4 shrink-0" />
                    <span>Arsitektur & Jaringan</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("timeline")}
                    data-tab="timeline"
                    className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                      activeTab === "timeline"
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-white/70 dark:bg-slate-800/80 rounded-t-lg shadow-xs"
                        : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Timeline 6 Minggu</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("challenges")}
                    data-tab="challenges"
                    className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                      activeTab === "challenges"
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-white/70 dark:bg-slate-800/80 rounded-t-lg shadow-xs"
                        : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Shield className="w-4 h-4 shrink-0" />
                    <span>Kebutuhan & Kriteria</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => scrollTabs("right")}
                  className="hidden sm:flex items-center justify-center p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors shrink-0 z-10"
                  aria-label="Scroll tabs right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Modal Body */}
            <div ref={modalBodyRef} className="p-4 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 flex-1 min-h-0">
              {/* TAB 1: IKHTISAR & TIM */}
              {activeTab === "overview" && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Linked Experience Banner */}
                  {selectedProject.relatedExperienceId && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/70 to-indigo-50/80 dark:from-blue-950/50 dark:via-sky-950/40 dark:to-indigo-950/50 border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/70 text-blue-600 dark:text-blue-400 shrink-0">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                            Terkait Pengalaman Kerja / Magang
                          </div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {selectedProject.relatedExperienceRole} di {selectedProject.relatedExperienceCompany}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const expId = selectedProject.relatedExperienceId!;
                          setSelectedProject(null);
                          handleNavigateToExperience(expId);
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all shrink-0"
                      >
                        <span>Buka Rekam Jejak Pengalaman</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Overview text */}
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Ringkasan Eksekutif Proyek
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Objectives vs Goals (From Presentation) */}
                  {selectedProject.objectives && selectedProject.objectives.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Project Objectives & Target Sasaran
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedProject.objectives.map((obj, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3"
                          >
                            <div className="space-y-1">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                                Sasaran #{idx + 1}
                              </span>
                              <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                {obj.objective}
                              </h5>
                            </div>
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                              <ChevronRight className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                              <span>{obj.goal}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Team Structure (Kelompok B_Jakarta) */}
                  {selectedProject.teamMembers && selectedProject.teamMembers.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Struktur Tim Pengembang ({selectedProject.teamName || "Our Team"})
                        </div>
                        <span className="text-xs text-slate-500 font-mono">
                          {selectedProject.teamMembers.length} Personel
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedProject.teamMembers.map((member, idx) => (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 ${
                              member.isLeader
                                ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/60 dark:to-indigo-950/50 border-blue-300 dark:border-blue-700/80 shadow-sm"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                                member.isLeader
                                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {member.isLeader ? (
                                <Crown className="w-5 h-5 text-amber-300" />
                              ) : (
                                member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join("")
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-bold text-slate-900 dark:text-white flex flex-wrap items-center gap-1.5">
                                <span>{member.name}</span>
                                {member.isLeader && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                                    Leader
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                                {member.role}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technical Responsibilities */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Tanggung Jawab Teknis & Implementasi
                    </div>
                    <div className="space-y-2.5">
                      {selectedProject.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60"
                        >
                          <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Komponen & Layanan Cloud
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: GALERI DOKUMENTASI FOTO */}
              {activeTab === "gallery" && selectedProject.gallery && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Gallery Filter and Intro */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-sky-500" />
                        <span>Dokumentasi & Bukti Implementasi Produksi ({selectedProject.gallery.length} Foto)</span>
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Klik pada foto untuk memperbesar tampilan dan melihat rincian konfigurasi teknis.
                      </p>
                    </div>

                    {/* Filter categories */}
                    <div className="flex flex-wrap gap-1.5">
                      {["Semua", "Infrastruktur AWS", "Web Server & Nginx", "Monitoring & Testing", "Aplikasi Web SEALS"].map(
                        (cat) => (
                          <button
                            key={cat}
                            onClick={() => setGalleryCategory(cat)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                              galleryCategory === cat
                                ? "bg-sky-600 text-white shadow-sm"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            {cat}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Image Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.gallery
                      .filter((img) => galleryCategory === "Semua" || img.category === galleryCategory)
                      .map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setLightboxImage(img)}
                          className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-sky-500 dark:hover:border-sky-500 transition-all flex flex-col justify-between"
                        >
                          <div className="relative aspect-video bg-slate-950 overflow-hidden">
                            <Image
                              src={img.url}
                              alt={img.title}
                              fill
                              className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white">
                              <span className="px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-sm flex items-center gap-1.5 text-xs font-semibold">
                                <ZoomIn className="w-3.5 h-3.5" />
                                <span>Perbesar Foto</span>
                              </span>
                            </div>
                            {img.category && (
                              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/75 text-sky-300 border border-white/20 backdrop-blur-md">
                                {img.category}
                              </span>
                            )}
                          </div>

                          <div className="p-4 space-y-1">
                            <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                              {img.title}
                            </h5>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              {img.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB 2: LATAR BELAKANG & MASALAH */}
              {activeTab === "background" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold">Problematika Bisnis Sebelum Solusi Cloud:</strong>{" "}
                      {selectedProject.backgroundSummary ||
                        "Kebutuhan modernisasi dan penguatan infrastruktur cloud sebelum sistem dideploy ke lingkungan produksi."}
                    </div>
                  </div>

                  {/* 5 Pain Points Grid */}
                  {selectedProject.painPoints && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Masalah Utama Sistem Lama yang Diselesaikan
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedProject.painPoints.map((item) => (
                          <div
                            key={item.number}
                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between">
                              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 font-mono font-bold text-xs flex items-center justify-center border border-rose-200 dark:border-rose-800">
                                {item.number}
                              </span>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                                Pain Point
                              </span>
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                                {item.title}
                              </h5>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Solution Highlights */}
                  {selectedProject.solutionHighlights && selectedProject.solutionHighlights.length > 0 && (
                    <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Solusi yang Kami Hadirkan</span>
                      </div>
                      <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
                        {selectedProject.solutionHighlights.map((sol, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: ARSITEKTUR AWS & JARINGAN */}
              {activeTab === "architecture" && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Architecture Diagram Card */}
                  <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Cloud className="w-5 h-5 text-sky-400" />
                        <h4 className="text-base font-bold text-white">
                          Topologi Arsitektur 3-Tier Multi-AZ AWS
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md self-start sm:self-auto">
                        Region: {selectedProject.architectureDetails?.region || "us-east-1"}
                      </span>
                    </div>

                    {/* Visual 3-Tier Diagram */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                      {/* Web Tier */}
                      <div className="p-4 rounded-2xl bg-slate-950/90 border border-sky-500/30 space-y-2.5">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <span className="text-sky-400 font-bold">1. Web / Gateway Layer</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-sky-500/20 text-sky-300">
                            Public
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                          {selectedProject.architectureDetails?.webTier}
                        </p>
                      </div>

                      {/* App Tier */}
                      <div className="p-4 rounded-2xl bg-slate-950/90 border border-blue-500/30 space-y-2.5">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <span className="text-blue-400 font-bold">2. Application / Compute</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-500/20 text-blue-300">
                            App Layer
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                          {selectedProject.architectureDetails?.appTier}
                        </p>
                      </div>

                      {/* DB Tier */}
                      <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-2.5">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <span className="text-indigo-400 font-bold">3. Database Tier</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-indigo-500/20 text-indigo-300">
                            Private DB
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                          {selectedProject.architectureDetails?.dbTier}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Network Routing & Security Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Routing & Network Security */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        <Network className="w-4 h-4" />
                        <span>Keamanan Jaringan & Segmentasi VPC</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {selectedProject.architectureDetails?.networkSecurity}
                      </p>
                    </div>

                    {/* Monitoring & Testing */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        <Bell className="w-4 h-4" />
                        <span>Observabilitas, Monitoring & Testing</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {selectedProject.architectureDetails?.monitoring}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: TIMELINE 6 MINGGU */}
              {activeTab === "timeline" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Roadmap Pelaksanaan Proyek (6 Minggu)
                  </div>

                  {selectedProject.timelinePhases && (
                    <div className="space-y-4">
                      {selectedProject.timelinePhases.map((phase, idx) => (
                        <div
                          key={phase.period}
                          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative pl-12 transition-all hover:border-blue-400 dark:hover:border-blue-600"
                        >
                          {/* Step Number Dot */}
                          <div className="absolute left-4 top-5 w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md shadow-blue-500/20">
                            {idx + 1}
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <h5 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                              {phase.milestone}
                            </h5>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 w-fit">
                              {phase.period}
                            </span>
                          </div>

                          <div className="mt-3 space-y-2">
                            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Aktivitas & Tugas:
                            </div>
                            <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                              {phase.tasks.map((task, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-2">
                                  <span className="text-blue-500">•</span>
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
                            <span className="font-semibold text-slate-500 dark:text-slate-400">
                              Deliverable:
                            </span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                              {phase.deliverables}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: KEBUTUHAN & SOLUSI */}
              {activeTab === "challenges" && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Challenges & Solutions */}
                  {selectedProject.challenges && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Tantangan Teknis & Solusi yang Diterapkan
                      </div>
                      <div className="space-y-3">
                        {selectedProject.challenges.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                          >
                            <div className="flex items-start gap-2 text-xs sm:text-sm text-rose-700 dark:text-rose-400 font-semibold">
                              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                              <span>Tantangan: {item.challenge}</span>
                            </div>
                            <div className="flex items-start gap-2 text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-semibold pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                              <span>Solusi: {item.solution}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Acceptance Criteria */}
                  {selectedProject.acceptanceCriteria && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Kriteria Penerimaan (Acceptance Criteria)
                      </div>
                      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                        {selectedProject.acceptanceCriteria.map((crit, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{crit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Non-Functional Requirements */}
                  {selectedProject.nonFunctionalReqs && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Kebutuhan Non-Fungsional (SLA & Kualitas)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProject.nonFunctionalReqs.map((nfr, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1"
                          >
                            <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                              {nfr.title}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              {nfr.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer Banner with Direct Link */}
            <div className="p-3.5 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090e1a] flex items-center justify-end gap-2.5 shrink-0">
              {selectedProject.documentationUrl && (
                <a
                  href={selectedProject.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <span>Buka Presentasi & Artefak</span>
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal for Gallery Images */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                  {lightboxImage.category || "Dokumentasi Implementasi"}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {lightboxImage.title}
                </h4>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 sm:p-4 bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
              <Image
                src={lightboxImage.url}
                alt={lightboxImage.title}
                width={1400}
                height={900}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lightboxImage.caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
