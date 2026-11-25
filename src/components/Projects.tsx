"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useIsMounted } from "@/hooks/useIsMounted";
import { usePortfolioData } from "@/data/portfolioData";
import { uiTranslations } from "@/data/translations";
import { Project, ProjectImage } from "@/types/portfolio";
import ZoomableImage from "@/components/ZoomableImage";
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
  Search,
  FolderGit2,
} from "lucide-react";

export default function Projects() {
  const { projectsData, lang } = usePortfolioData();
  const isEN = lang === "EN";
  const t = uiTranslations[lang];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "gallery" | "architecture" | "challenges">("overview");
  const [lightboxImage, setLightboxImage] = useState<ProjectImage | null>(null);
  const [galleryCategory, setGalleryCategory] = useState<string>("Semua");
  const [projectFilter, setProjectFilter] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isMounted = useIsMounted();
  const modalBodyRef = useRef<HTMLDivElement>(null);

  const activeProject = useMemo(() => {
    if (!selectedProject) return null;
    return projectsData.find((p) => p.id === selectedProject.id) || selectedProject;
  }, [selectedProject, projectsData]);

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

  const allLabel = isEN ? "All" : "Semua";
  const availableCategories = useMemo(() => {
    if (!activeProject?.gallery) return [];
    const cats = Array.from(
      new Set(activeProject.gallery.map((img) => img.category).filter(Boolean) as string[])
    );
    return [allLabel, ...cats];
  }, [activeProject, allLabel]);

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
      }
    }, 150);
  };

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchesCategory =
        projectFilter === "Semua" ||
        (projectFilter === "Client" && p.category.toLowerCase().includes("client")) ||
        (projectFilter === "MSIB" &&
          (p.category.toLowerCase().includes("msib") || p.organization.toLowerCase().includes("seal")));

      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.organization.toLowerCase().includes(q) ||
        p.techStack.some((tech) => tech.toLowerCase().includes(q))
      );
    });
  }, [projectsData, projectFilter, searchQuery]);

  const filterButtons = [
    { key: "Semua", label: isEN ? "All" : "Semua" },
    { key: "Client", label: isEN ? "Client Projects" : "Proyek Klien" },
    { key: "MSIB", label: isEN ? "MSIB Capstone" : "Proyek MSIB" },
  ];

  return (
    <section
      id="portfolio"
      className="section-flow py-12 sm:py-16 scroll-mt-20 transition-colors"
    >
      <div id="projects" className="scroll-mt-20" />
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 space-y-8">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"
            style={{ color: "var(--color-primary-text)" }}
          >
            <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>PORTFOLIO</span>
          </div>
          <h2
            className="font-heading font-extrabold tracking-[-0.02em]"
            style={{
              fontSize: "clamp(1.65rem, 4vw, 2.5rem)",
              color: "var(--color-text-main)",
            }}
          >
            {isEN ? "Featured Cloud Implementations" : "Koleksi Proyek & Infrastruktur"}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filter Pills + Search Input Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {filterButtons.map((btn) => {
              const active = projectFilter === btn.key;
              return (
                <button
                  key={btn.key}
                  type="button"
                  onClick={() => setProjectFilter(btn.key)}
                  aria-pressed={active}
                  className="min-h-[42px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all"
                  style={{
                    backgroundColor: active ? "var(--color-primary)" : "var(--color-bg-card)",
                    borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                    color: active ? "#ffffff" : "var(--color-text-muted)",
                    boxShadow: active ? "0 4px 14px var(--color-primary-glow)" : "none",
                  }}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <label htmlFor="project-search-input" className="sr-only">
              {isEN ? "Search projects or technologies" : "Cari proyek atau teknologi"}
            </label>
            <Search
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--color-text-muted)" }}
              aria-hidden="true"
            />
            <input
              id="project-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEN ? "Search project or stack..." : "Cari proyek atau teknologi..."}
              className="w-full min-h-[44px] pl-10 pr-9 py-2 rounded-full border text-sm focus:outline-none transition-colors"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-main)",
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label={isEN ? "Clear project search" : "Hapus pencarian proyek"}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full"
                style={{ color: "var(--color-text-muted)" }}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Counter */}
        <div className="text-xs sm:text-sm" style={{ color: "var(--color-text-muted)" }}>
          {isEN ? "Showing " : "Menampilkan "}
          <strong style={{ color: "var(--color-text-main)" }}>{filteredProjects.length}</strong>
          {isEN ? " of " : " dari "}
          <strong style={{ color: "var(--color-text-main)" }}>{projectsData.length}</strong>
          {isEN ? " projects" : " total proyek"}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div
            className="rounded-2xl border border-dashed p-10 text-center space-y-3"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
            }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
              {isEN
                ? `No projects match "${searchQuery}".`
                : `Tidak ada proyek yang cocok dengan pencarian "${searchQuery}".`}
            </p>
            <button
              type="button"
              onClick={() => {
                setProjectFilter("Semua");
                setSearchQuery("");
              }}
              className="min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {isEN ? "Reset Filters" : "Tampilkan Semua Proyek"}
            </button>
          </div>
        ) : (
          /* Balanced 2-Column Editorial Card Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => {
              const coverImage = project.gallery?.[0]?.url;
              return (
                <article
                  key={project.id}
                  id={`project-${project.id === "adaptive-learning-polinema" ? "seals-polinema" : "gazebo-samasta"}`}
                  className="surface-card surface-card-interactive rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Preview Media */}
                    <div
                      className="relative aspect-[16/9] w-full overflow-hidden border-b group"
                      style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      {coverImage ? (
                        <Image
                          src={coverImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Cloud className="w-10 h-10" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className="surface-chip px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {project.organization}
                        </span>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          {project.category}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-xs font-medium" style={{ color: "var(--color-primary-text)" }}>
                          {project.role} {project.period ? `(${project.period})` : ""}
                        </div>
                        <h3
                          className="font-heading text-xl font-bold leading-snug"
                          style={{ color: "var(--color-text-main)" }}
                        >
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--color-text-muted)" }}>
                        {project.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="surface-chip px-2.5 py-1 rounded-lg text-xs font-medium"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 5 && (
                          <span
                            className="px-2 py-1 text-xs font-semibold"
                            style={{ color: "var(--color-primary-text)" }}
                          >
                            +{project.techStack.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div
                    className="px-6 py-4 border-t flex flex-wrap items-center justify-between gap-3"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProject(project);
                        setActiveTab("overview");
                      }}
                      className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white transition-colors"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <Eye className="w-4 h-4" aria-hidden="true" />
                      <span>{isEN ? "Project Blueprint & Gallery" : "Detail & Artefak Proyek"}</span>
                    </button>

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 min-h-[42px] px-3 py-2 text-xs sm:text-sm font-semibold hover:underline"
                        style={{ color: "var(--color-text-main)" }}
                      >
                        <span>{isEN ? "Visit Live Site" : "Kunjungi Situs"}</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    ) : project.presentationUrl ? (
                      <a
                        href={project.presentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 min-h-[42px] px-3 py-2 text-xs sm:text-sm font-semibold hover:underline"
                        style={{ color: "var(--color-text-main)" }}
                      >
                        <span>{isEN ? "Pitch Deck" : "Slide Presentasi"}</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* PROJECT DETAIL MODAL */}
      {isMounted &&
        activeProject &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
          >
            <div
              className="relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-modal-enter"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className="p-4 sm:p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="text-xs font-mono uppercase tracking-wider font-semibold"
                      style={{ color: "var(--color-primary-text)" }}
                    >
                      {activeProject.organization} • {activeProject.period}
                    </span>
                    {activeProject.teamName && (
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
                        style={{
                          backgroundColor: "var(--color-primary-tint)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-primary-text)",
                        }}
                      >
                        {activeProject.teamName}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-lg sm:text-2xl font-extrabold leading-tight" style={{ color: "var(--color-text-main)" }}>
                    {activeProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: "var(--color-text-muted)" }}>
                    {activeProject.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {activeProject.documentationUrl && (
                    <a
                      href={activeProject.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{isEN ? "Deck & Docs" : "Slide & Dokumen"}</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    aria-label={isEN ? "Close modal" : "Tutup modal"}
                    className="h-11 w-11 inline-flex items-center justify-center rounded-full border transition-colors"
                    style={{
                      backgroundColor: "var(--color-bg-card)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-main)",
                    }}
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div
                role="tablist"
                aria-label={isEN ? "Project sections" : "Bagian proyek"}
                className="px-4 sm:px-6 border-b flex items-center gap-1 sm:gap-2 overflow-x-auto shrink-0 scrollbar-thin"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  borderColor: "var(--color-border)",
                }}
              >
                {(
                  [
                    { id: "overview", label: t.projects.tabOverview },
                    { id: "gallery", label: t.projects.tabGallery, count: activeProject.gallery?.length || 0 },
                    { id: "architecture", label: t.projects.tabArchitecture },
                    { id: "challenges", label: t.projects.tabChallenges },
                  ] as const
                ).map((tab) => {
                  const selected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveTab(tab.id)}
                      className="min-h-[44px] py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
                      style={{
                        borderColor: selected ? "var(--color-primary)" : "transparent",
                        color: selected ? "var(--color-primary-text)" : "var(--color-text-muted)",
                      }}
                    >
                      <span>{tab.label}</span>
                      {"count" in tab && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full font-mono"
                          style={{
                            backgroundColor: "var(--color-primary-tint)",
                            color: "var(--color-primary-text)",
                          }}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Modal Body */}
              <div ref={modalBodyRef} className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {activeProject.relatedExperienceId && (
                      <div className="surface-inset p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0"
                            style={{ backgroundColor: "var(--color-primary)" }}
                          >
                            <Briefcase className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <div>
                            <div
                              className="text-[11px] font-bold uppercase tracking-wider"
                              style={{ color: "var(--color-primary-text)" }}
                            >
                              {isEN ? "Related Experience" : "Terkait Pengalaman Kerja / Magang"}
                            </div>
                            <div className="text-sm sm:text-base font-bold" style={{ color: "var(--color-text-main)" }}>
                              {activeProject.relatedExperienceRole} {isEN ? "at" : "di"} {activeProject.relatedExperienceCompany}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNavigateToExperience(activeProject.relatedExperienceId!)}
                          className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white shrink-0"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          <span>{isEN ? "Open Experience" : "Lihat Pengalaman"}</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    )}

                    <div className="surface-inset p-5 rounded-2xl space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-primary-text)" }}>
                        {isEN ? "Executive Summary" : "Deskripsi Ringkas"}
                      </h4>
                      <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {activeProject.description}
                      </p>
                    </div>

                    {activeProject.details && activeProject.details.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-text-main)" }}>
                          {isEN ? "Key Deliverables & Impact" : "Capaian Utama & Hasil Proyek"}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {activeProject.details.map((hl, idx) => (
                            <div
                              key={idx}
                              className="surface-chip p-3.5 rounded-xl flex items-start gap-2.5"
                            >
                              <CheckCircle2
                                className="w-4 h-4 shrink-0 mt-0.5"
                                style={{ color: "var(--color-emerald)" }}
                                aria-hidden="true"
                              />
                              <span className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                {hl}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "gallery" && (
                  <div className="space-y-6">
                    {activeProject.id === "gazebo-samasta-reservation" && (
                      <div className="surface-inset p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start sm:items-center gap-3.5">
                          <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: "var(--color-primary-tint)",
                              color: "var(--color-primary-text)",
                            }}
                          >
                            <Presentation className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded"
                                style={{
                                  backgroundColor: "var(--color-primary-tint)",
                                  color: "var(--color-primary-text)",
                                }}
                              >
                                Final Project Deck
                              </span>
                              <span className="text-[11px] font-mono" style={{ color: "var(--color-text-muted)" }}>
                                {isEN ? "18 Slides • PPTX" : "18 Slide • Format PPTX"}
                              </span>
                            </div>
                            <h4 className="text-sm sm:text-base font-bold" style={{ color: "var(--color-text-main)" }}>
                              {isEN
                                ? "Presentation Deck & 3-Tier Multi-AZ Topology"
                                : "Slide Presentasi & Topologi Arsitektur 3-Tier Multi-AZ"}
                            </h4>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          {activeProject.presentationFileUrl && (
                            <a
                              href={activeProject.presentationFileUrl}
                              download="gazebo-samasta-final-presentation.pptx"
                              className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold text-white"
                              style={{ backgroundColor: "var(--color-primary)" }}
                            >
                              <Download className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{t.projects.downloadPptx}</span>
                            </a>
                          )}
                          {activeProject.presentationUrl && (
                            <a
                              href={activeProject.presentationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold border"
                              style={{
                                backgroundColor: "var(--color-bg-card)",
                                borderColor: "var(--color-border)",
                                color: "var(--color-text-main)",
                              }}
                            >
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{t.projects.openGdrive}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {activeProject.id === "adaptive-learning-polinema" && activeProject.liveUrl && (
                      <div className="surface-inset p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start sm:items-center gap-3.5">
                          <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: "var(--color-emerald-tint)",
                              color: "var(--color-emerald)",
                            }}
                          >
                            <Cloud className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold" style={{ color: "var(--color-text-main)" }}>
                              {isEN
                                ? "AWS Blueprint Artifacts, Grafana k6 & SEALS Platform"
                                : "Artefak Blueprint AWS, Grafana K6 & Platform SEALS"}
                            </h4>
                            <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                              {isEN
                                ? "Isolated VPC (10.0.0.0/16), EC2 t3.medium, Nginx Reverse Proxy seals.id, and k6 100 VUs stress testing."
                                : "VPC terisolasi (10.0.0.0/16), EC2 t3.medium, Nginx Reverse Proxy seals.id, serta stress test K6 100 VUs."}
                            </p>
                          </div>
                        </div>

                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold text-white shrink-0"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{isEN ? "Visit seals.id" : "Kunjungi seals.id"}</span>
                        </a>
                      </div>
                    )}

                    {availableCategories.length > 1 && (
                      <div className="flex flex-wrap items-center gap-2 pb-2 border-b" style={{ borderColor: "var(--color-border)" }}>
                        {availableCategories.map((cat) => {
                          const count =
                            cat === allLabel
                              ? activeProject.gallery?.length || 0
                              : activeProject.gallery?.filter((img) => img.category === cat).length || 0;
                          const isActive = activeGalleryCategory === cat;

                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setGalleryCategory(cat)}
                              className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors flex items-center gap-1.5 ${isActive ? "" : "surface-chip"}`}
                              style={
                                isActive
                                  ? {
                                      backgroundColor: "var(--color-primary)",
                                      borderColor: "var(--color-primary)",
                                      color: "#ffffff",
                                    }
                                  : {
                                      color: "var(--color-text-muted)",
                                    }
                              }
                            >
                              <span>{cat}</span>
                              <span className="text-[10px] opacity-85 font-mono">({count})</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {visibleGalleryImages.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {visibleGalleryImages.map((img, idx) => (
                          <button
                            key={img.url}
                            type="button"
                            onClick={() => setLightboxImage(img)}
                            className="surface-chip group text-left rounded-2xl overflow-hidden transition-all flex flex-col hover:-translate-y-0.5"
                          >
                            <div className="relative aspect-video w-full bg-black overflow-hidden">
                              <Image
                                src={img.url}
                                alt={img.title || img.caption}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                                {img.category && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/75 text-white">
                                    {img.category}
                                  </span>
                                )}
                                <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-mono text-white bg-black/75">
                                  #{String(idx + 1).padStart(2, "0")}
                                </span>
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <span
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold"
                                  style={{ backgroundColor: "var(--color-primary)" }}
                                >
                                  <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                                  <span>{isEN ? "Zoom" : "Perbesar"}</span>
                                </span>
                              </div>
                            </div>

                            <div className="p-3.5 flex flex-col flex-1 justify-between gap-2 w-full">
                              <div>
                                <h5 className="text-xs sm:text-sm font-bold line-clamp-1" style={{ color: "var(--color-text-main)" }}>
                                  {img.title || img.caption}
                                </h5>
                                <p className="text-[11px] sm:text-xs line-clamp-2 mt-1 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                  {img.caption}
                                </p>
                              </div>
                              <div
                                className="flex items-center justify-between pt-2 border-t text-[11px]"
                                style={{
                                  borderColor: "var(--color-border)",
                                  color: "var(--color-primary-text)",
                                }}
                              >
                                <span>{isEN ? "Inspect image" : "Lihat gambar"}</span>
                                <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="surface-inset p-10 text-center rounded-2xl border-dashed space-y-3"
                      >
                        <Layers className="w-8 h-8 mx-auto" style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
                        <p className="text-sm font-semibold" style={{ color: "var(--color-text-main)" }}>
                          {isEN ? "No artifacts in this category" : "Tidak ada artefak dalam kategori ini"}
                        </p>
                        <button
                          type="button"
                          onClick={() => setGalleryCategory(allLabel)}
                          className="min-h-[40px] px-4 py-1.5 rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          {isEN ? "Show All" : "Tampilkan Semua"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "architecture" && activeProject.architectureDetails && (
                  <div className="space-y-6">
                    <div className="surface-inset p-4 rounded-2xl">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-primary-text)" }}>
                        {isEN ? "Region & Networking" : "Region & Jaringan"}
                      </h4>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-main)" }}>
                        Region: {activeProject.architectureDetails.region} • Availability Zones:{" "}
                        {activeProject.architectureDetails.zones.join(", ")}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="surface-chip p-4 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase" style={{ color: "var(--color-text-main)" }}>
                          <Server className="w-4 h-4" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                          <span>Web & App Layer</span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                          {activeProject.architectureDetails.webTier}
                        </p>
                        <p className="text-xs pt-2 border-t" style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border)" }}>
                          {activeProject.architectureDetails.appTier}
                        </p>
                      </div>

                      <div className="surface-chip p-4 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase" style={{ color: "var(--color-text-main)" }}>
                          <Cloud className="w-4 h-4" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                          <span>{isEN ? "Network Security" : "Keamanan Jaringan"}</span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                          {activeProject.architectureDetails.networkSecurity}
                        </p>
                      </div>

                      <div className="surface-chip p-4 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase" style={{ color: "var(--color-text-main)" }}>
                          <Database className="w-4 h-4" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                          <span>Database & Monitoring</span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                          {activeProject.architectureDetails.dbTier}
                        </p>
                        <p className="text-xs pt-2 border-t" style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border)" }}>
                          {activeProject.architectureDetails.monitoring}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "challenges" && activeProject.challenges && (
                  <div className="space-y-4">
                    {activeProject.challenges.map((ch, idx) => (
                      <div
                        key={idx}
                        className="surface-inset p-5 rounded-2xl space-y-3"
                      >
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                          <div>
                            <div className="text-xs font-bold uppercase" style={{ color: "var(--color-primary-text)" }}>
                              {isEN ? "Operational Challenge" : "Tantangan Operasional"}
                            </div>
                            <div className="text-sm sm:text-base font-bold" style={{ color: "var(--color-text-main)" }}>
                              {ch.challenge}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 pt-2 border-t" style={{ borderColor: "var(--color-border)" }}>
                          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-emerald)" }} aria-hidden="true" />
                          <div className="w-full">
                            <div className="text-xs font-bold uppercase mb-1" style={{ color: "var(--color-emerald)" }}>
                              {isEN ? "Engineering Solution & Outcome" : "Solusi Rekayasa & Hasil"}
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                              {ch.solution}
                            </p>
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

      {/* LIGHTBOX MODAL */}
      {isMounted &&
        lightboxImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] flex flex-col justify-between p-3 sm:p-6 bg-black/95 backdrop-blur-md select-none"
            onClick={() => setLightboxImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxImage.title || lightboxImage.caption}
          >
            <div
              className="w-full max-w-6xl mx-auto flex items-center justify-between gap-3 text-white pb-3 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {lightboxImage.category || (isEN ? "Artifact" : "Artefak")}
                </span>
                {currentGallery.length > 0 && currentLightboxIndex !== -1 && (
                  <span className="text-xs font-mono text-zinc-300">
                    {currentLightboxIndex + 1} / {currentGallery.length}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={lightboxImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isEN ? "Open original image" : "Buka gambar asli"}
                  className="h-11 w-11 inline-flex items-center justify-center rounded-full bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={lightboxImage.url}
                  download
                  aria-label={isEN ? "Download artifact" : "Unduh artefak"}
                  className="h-11 w-11 inline-flex items-center justify-center rounded-full bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  aria-label={isEN ? "Close lightbox" : "Tutup lightbox"}
                  className="h-11 w-11 inline-flex items-center justify-center rounded-full bg-zinc-800 text-zinc-200 hover:bg-red-600"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-2 min-h-0"
              onClick={(e) => e.stopPropagation()}
            >
              {currentGallery.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevLightbox}
                  aria-label={isEN ? "Previous image" : "Gambar sebelumnya"}
                  className="absolute left-2 sm:left-3 z-30 h-11 w-11 inline-flex items-center justify-center rounded-full bg-zinc-900/90 hover:bg-red-600 text-white border border-white/15"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
              {currentGallery.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextLightbox}
                  aria-label={isEN ? "Next image" : "Gambar berikutnya"}
                  className="absolute right-2 sm:right-3 z-30 h-11 w-11 inline-flex items-center justify-center rounded-full bg-zinc-900/90 hover:bg-red-600 text-white border border-white/15"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              )}

              <div className="w-full max-w-5xl">
                <ZoomableImage
                  key={lightboxImage.url}
                  src={lightboxImage.url}
                  alt={lightboxImage.caption}
                  containerClassName="h-[58vh] sm:h-[66vh]"
                  isEN={isEN}
                />
              </div>
            </div>

            <div
              className="w-full max-w-6xl mx-auto space-y-2 pt-2 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center px-4 max-w-3xl mx-auto">
                <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                  {lightboxImage.title || lightboxImage.caption}
                </h4>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                  {lightboxImage.caption}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
