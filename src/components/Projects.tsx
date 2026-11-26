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
  BookOpen,
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
  ShieldCheck,
  Images,
  Cpu,
} from "lucide-react";

type ModalView = "story" | "gallery";
type IncomingTab = "overview" | "gallery" | "architecture" | "challenges";

export default function Projects() {
  const { projectsData, lang } = usePortfolioData();
  const isEN = lang === "EN";
  const t = uiTranslations[lang];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeView, setActiveView] = useState<ModalView>("story");
  const [lightboxImage, setLightboxImage] = useState<ProjectImage | null>(null);
  const [galleryCategory, setGalleryCategory] = useState<string>("All");
  const [projectFilter, setProjectFilter] = useState<string>("All");
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
  }, [activeView, selectedProject]);

  useEffect(() => {
    const handleOpenProjectModal = (e: Event) => {
      const customEvent = e as CustomEvent<{
        projectId?: string;
        tab?: IncomingTab;
      }>;
      const { projectId, tab } = customEvent.detail || {};
      if (!projectId) return;

      const project = projectsData.find((p) => p.id === projectId);
      if (project) {
        setSelectedProject(project);
        setActiveView(tab === "gallery" ? "gallery" : "story");
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

  const openProject = (project: Project, view: ModalView = "story") => {
    setSelectedProject(project);
    setGalleryCategory(allLabel);
    setActiveView(view);
  };

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
        projectFilter === "All" ||
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
    { key: "All", label: isEN ? "All" : "Semua" },
    { key: "Client", label: isEN ? "Client Projects" : "Proyek Klien" },
    { key: "MSIB", label: isEN ? "MSIB Capstone" : "Proyek MSIB" },
  ];

  const primaryActionUrl = activeProject?.liveUrl || activeProject?.presentationUrl || activeProject?.documentationUrl;
  const primaryActionLabel = activeProject?.liveUrl
    ? isEN
      ? "Visit Live Site"
      : "Buka Situs"
    : isEN
    ? "View Slides"
    : "Lihat Slide";

  return (
    <section
      id="portfolio"
      className="section-flow py-12 sm:py-16 scroll-mt-20 transition-colors"
    >
      <div id="projects" className="scroll-mt-20" />
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 space-y-8">
        {/* Section Header */}
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
                setProjectFilter("All");
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
                    {/* Preview Media (Clickable to open Case Study) */}
                    <button
                      type="button"
                      onClick={() => openProject(project, "story")}
                      className="relative aspect-[16/9] w-full overflow-hidden border-b group block text-left"
                      style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        borderColor: "var(--color-border)",
                      }}
                      aria-label={`${isEN ? "Open case study for" : "Buka studi kasus"} ${project.title}`}
                    >
                      {coverImage ? (
                        <Image
                          src={coverImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Cloud className="w-10 h-10" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                        </div>
                      )}
                      {project.gallery && project.gallery.length > 0 && (
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/75 text-white backdrop-blur-xs">
                          <Images className="w-3 h-3" aria-hidden="true" />
                          <span>
                            {project.gallery.length} {isEN ? "Artifacts" : "Artefak"}
                          </span>
                        </span>
                      )}
                    </button>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-4">
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
                          {project.role} {project.period ? `• ${project.period}` : ""}
                        </div>
                        <h3
                          className="font-heading text-lg sm:text-xl font-bold leading-snug"
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
                    className="px-5 sm:px-6 py-4 border-t flex items-center justify-between gap-3"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <button
                      type="button"
                      onClick={() => openProject(project, "story")}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white transition-all hover:brightness-110"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{isEN ? "Read Case Study" : "Baca Detail Proyek"}</span>
                    </button>

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 text-xs sm:text-sm font-semibold hover:underline shrink-0"
                        style={{ color: "var(--color-text-main)" }}
                      >
                        <span>{isEN ? "Live Site" : "Situs Live"}</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    ) : project.presentationUrl ? (
                      <a
                        href={project.presentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 text-xs sm:text-sm font-semibold hover:underline shrink-0"
                        style={{ color: "var(--color-text-main)" }}
                      >
                        <span>{isEN ? "Pitch Deck" : "Slide"}</span>
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

      {/* INDUSTRY-GRADE EDITORIAL CASE STUDY MODAL (Full-screen sheet on mobile, centered dialog on desktop) */}
      {isMounted &&
        activeProject &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
          >
            <div
              className="relative w-full h-[100dvh] sm:h-auto sm:max-h-[90dvh] sm:max-w-5xl rounded-none sm:rounded-3xl sm:border shadow-2xl overflow-hidden flex flex-col animate-modal-enter"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Slim Sticky Top Bar (Keeps mobile viewport focused on reading content) */}
              <div
                className="px-4 sm:px-6 h-16 border-b flex items-center justify-between gap-3 shrink-0"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="min-w-0 flex items-center gap-2.5">
                  <span
                    className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shrink-0"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {activeProject.category}
                  </span>
                  <div className="min-w-0">
                    <div
                      className="text-[11px] font-mono font-semibold truncate"
                      style={{ color: "var(--color-primary-text)" }}
                    >
                      {activeProject.organization} • {activeProject.period}
                    </div>
                    <div
                      className="text-sm font-bold truncate"
                      style={{ color: "var(--color-text-main)" }}
                    >
                      {activeProject.title}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {primaryActionUrl && (
                    <a
                      href={primaryActionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-semibold text-white transition-all hover:brightness-110"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{primaryActionLabel}</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    aria-label={isEN ? "Close project detail" : "Tutup detail proyek"}
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

              {/* Clean 2-Option Segmented View Switcher (Fits effortlessly at every phone width) */}
              <div
                className="px-4 sm:px-6 py-2.5 border-b flex items-center justify-between gap-3 shrink-0"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div
                  role="tablist"
                  aria-label={isEN ? "Project views" : "Tampilan proyek"}
                  className="grid grid-cols-2 sm:inline-flex w-full sm:w-auto rounded-xl p-1 border gap-1"
                  style={{
                    backgroundColor: "var(--color-bg-secondary)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  {(
                    [
                      {
                        id: "story" as const,
                        label: isEN ? "Case Study" : "Ringkasan & Kasus",
                        icon: BookOpen,
                      },
                      {
                        id: "gallery" as const,
                        label: isEN ? "Visuals & Artifacts" : "Galeri & Topologi",
                        count: activeProject.gallery?.length || 0,
                        icon: Images,
                      },
                    ]
                  ).map((tab) => {
                    const selected = activeView === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActiveView(tab.id)}
                        className="min-h-[40px] px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-1.5"
                        style={{
                          backgroundColor: selected ? "var(--color-primary)" : "transparent",
                          color: selected ? "#ffffff" : "var(--color-text-muted)",
                        }}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span className="truncate">{tab.label}</span>
                        {"count" in tab && (
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full font-mono shrink-0"
                            style={{
                              backgroundColor: selected ? "rgba(255,255,255,0.2)" : "var(--color-primary-tint)",
                              color: selected ? "#ffffff" : "var(--color-primary-text)",
                            }}
                          >
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {primaryActionUrl && (
                  <a
                    href={primaryActionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:hidden inline-flex items-center gap-1 min-h-[40px] px-3 rounded-xl text-xs font-semibold shrink-0 border"
                    style={{
                      backgroundColor: "var(--color-bg-secondary)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-primary-text)",
                    }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isEN ? "Open" : "Buka"}</span>
                  </a>
                )}
              </div>

              {/* Scrollable Reading Body */}
              <div ref={modalBodyRef} className="p-4 sm:p-8 overflow-y-auto flex-1">
                {activeView === "story" && (
                  <div className="mx-auto max-w-4xl space-y-7 pb-6">
                    {/* Case Study Hero Header (Scrolls naturally so mobile screen isn't cramped) */}
                    <header className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          {activeProject.category}
                        </span>
                        {activeProject.teamName && (
                          <span
                            className="surface-chip px-2.5 py-1 rounded-full text-[11px] font-medium"
                            style={{ color: "var(--color-primary-text)" }}
                          >
                            {activeProject.teamName}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3
                          className="font-heading text-xl sm:text-3xl font-extrabold tracking-tight leading-snug"
                          style={{ color: "var(--color-text-main)" }}
                        >
                          {activeProject.title}
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                          {activeProject.subtitle}
                        </p>
                      </div>

                      {/* Quick Metadata Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="surface-inset p-3.5 rounded-xl">
                          <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                            {isEN ? "Role" : "Peran"}
                          </div>
                          <div className="text-xs sm:text-sm font-bold mt-1" style={{ color: "var(--color-text-main)" }}>
                            {activeProject.role}
                          </div>
                        </div>
                        <div className="surface-inset p-3.5 rounded-xl">
                          <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                            {isEN ? "Organization" : "Organisasi"}
                          </div>
                          <div className="text-xs sm:text-sm font-bold mt-1" style={{ color: "var(--color-text-main)" }}>
                            {activeProject.organization}
                          </div>
                        </div>
                        <div className="surface-inset p-3.5 rounded-xl">
                          <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                            {isEN ? "Timeline" : "Periode"}
                          </div>
                          <div className="text-xs sm:text-sm font-bold mt-1" style={{ color: "var(--color-text-main)" }}>
                            {activeProject.period}
                          </div>
                        </div>
                      </div>
                    </header>

                    {/* Section 1: Summary & Context */}
                    <section className="space-y-3 pt-5 border-t" style={{ borderColor: "var(--color-border)" }}>
                      <h4 className="font-heading text-base sm:text-lg font-bold flex items-center gap-2" style={{ color: "var(--color-text-main)" }}>
                        <FileText className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                        <span>{isEN ? "Project Overview & Context" : "Ringkasan & Konteks Proyek"}</span>
                      </h4>
                      <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {activeProject.description}
                      </p>
                      {activeProject.backgroundSummary && (
                        <div
                          className="surface-inset p-4 rounded-xl border-l-4 text-xs sm:text-sm leading-relaxed"
                          style={{
                            borderLeftColor: "var(--color-primary)",
                            color: "var(--color-text-main)",
                          }}
                        >
                          <strong className="block text-[11px] uppercase tracking-wider mb-1" style={{ color: "var(--color-primary-text)" }}>
                            {isEN ? "Problem Statement" : "Latar Belakang Masalah"}
                          </strong>
                          {activeProject.backgroundSummary}
                        </div>
                      )}
                    </section>

                    {/* Section 2: System Flow & Infrastructure Architecture */}
                    {(activeProject.nodeFlow?.length || activeProject.architectureDetails) && (
                      <section className="space-y-4 pt-5 border-t" style={{ borderColor: "var(--color-border)" }}>
                        <h4 className="font-heading text-base sm:text-lg font-bold flex items-center gap-2" style={{ color: "var(--color-text-main)" }}>
                          <Layers className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                          <span>{isEN ? "System Architecture & Data Flow" : "Arsitektur Sistem & Alur Infrastruktur"}</span>
                        </h4>

                        {activeProject.nodeFlow && activeProject.nodeFlow.length > 0 && (
                          <div className="surface-inset p-4 rounded-2xl">
                            <div className="text-[11px] font-mono font-bold uppercase tracking-wider mb-3" style={{ color: "var(--color-primary-text)" }}>
                              {isEN ? "Request & Infrastructure Flow" : "Alur Trafik & Infrastruktur"}
                            </div>
                            <ol className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2">
                              {activeProject.nodeFlow.map((node, idx) => (
                                <li key={node} className="flex items-center gap-2">
                                  <span
                                    className="surface-chip px-3 py-1.5 rounded-lg text-xs font-medium w-full sm:w-auto flex items-center gap-2"
                                    style={{ color: "var(--color-text-main)" }}
                                  >
                                    <span
                                      className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded"
                                      style={{
                                        backgroundColor: "var(--color-primary-tint)",
                                        color: "var(--color-primary-text)",
                                      }}
                                    >
                                      0{idx + 1}
                                    </span>
                                    <span>{node}</span>
                                  </span>
                                  {idx < activeProject.nodeFlow!.length - 1 && (
                                    <ArrowRight
                                      className="hidden sm:block w-3.5 h-3.5 shrink-0"
                                      style={{ color: "var(--color-text-muted)" }}
                                      aria-hidden="true"
                                    />
                                  )}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {activeProject.architectureDetails && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                            <div className="surface-chip p-4 rounded-xl space-y-2">
                              <div className="flex items-center gap-2 text-xs font-bold uppercase" style={{ color: "var(--color-text-main)" }}>
                                <Server className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                                <span>{isEN ? "Web & App Layer" : "Lapisan Web & App"}</span>
                              </div>
                              <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                {activeProject.architectureDetails.webTier}
                              </p>
                              <p className="text-xs sm:text-[13px] pt-2 border-t leading-relaxed" style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border)" }}>
                                {activeProject.architectureDetails.appTier}
                              </p>
                            </div>

                            <div className="surface-chip p-4 rounded-xl space-y-2">
                              <div className="flex items-center gap-2 text-xs font-bold uppercase" style={{ color: "var(--color-text-main)" }}>
                                <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                                <span>{isEN ? "Network & Region" : "Jaringan & Keamanan"}</span>
                              </div>
                              <p className="text-xs font-mono font-semibold" style={{ color: "var(--color-primary-text)" }}>
                                {activeProject.architectureDetails.region} ({activeProject.architectureDetails.zones.join(", ")})
                              </p>
                              <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                {activeProject.architectureDetails.networkSecurity}
                              </p>
                            </div>

                            <div className="surface-chip p-4 rounded-xl space-y-2">
                              <div className="flex items-center gap-2 text-xs font-bold uppercase" style={{ color: "var(--color-text-main)" }}>
                                <Database className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                                <span>{isEN ? "Database & Telemetry" : "Database & Monitoring"}</span>
                              </div>
                              <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                {activeProject.architectureDetails.dbTier}
                              </p>
                              <p className="text-xs sm:text-[13px] pt-2 border-t leading-relaxed" style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border)" }}>
                                {activeProject.architectureDetails.monitoring}
                              </p>
                            </div>
                          </div>
                        )}
                      </section>
                    )}

                    {/* Section 3: Key Deliverables & Impact (Clean Scannable Checklist) */}
                    {activeProject.details && activeProject.details.length > 0 && (
                      <section className="space-y-3 pt-5 border-t" style={{ borderColor: "var(--color-border)" }}>
                        <h4 className="font-heading text-base sm:text-lg font-bold flex items-center gap-2" style={{ color: "var(--color-text-main)" }}>
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--color-emerald)" }} aria-hidden="true" />
                          <span>{isEN ? "Key Deliverables & Impact" : "Capaian Utama & Dampak"}</span>
                        </h4>
                        <ul className="space-y-2.5">
                          {activeProject.details.map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span
                                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-mono font-bold"
                                style={{
                                  backgroundColor: "var(--color-emerald-tint)",
                                  color: "var(--color-emerald)",
                                }}
                              >
                                {idx + 1}
                              </span>
                              <span className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                {hl}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Section 4: Operational Challenges & Solutions */}
                    {activeProject.challenges && activeProject.challenges.length > 0 && (
                      <section className="space-y-3 pt-5 border-t" style={{ borderColor: "var(--color-border)" }}>
                        <h4 className="font-heading text-base sm:text-lg font-bold flex items-center gap-2" style={{ color: "var(--color-text-main)" }}>
                          <AlertCircle className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                          <span>{isEN ? "Challenges & Solutions" : "Tantangan & Solusi Rekayasa"}</span>
                        </h4>
                        <div className="space-y-3">
                          {activeProject.challenges.map((ch, idx) => (
                            <div key={idx} className="surface-inset p-4 sm:p-5 rounded-2xl space-y-2.5">
                              <div className="flex items-start gap-2.5">
                                <span
                                  className="px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 mt-0.5"
                                  style={{
                                    backgroundColor: "var(--color-primary-tint)",
                                    color: "var(--color-primary-text)",
                                  }}
                                >
                                  {isEN ? "Issue" : "Kendala"}
                                </span>
                                <p className="text-sm font-semibold leading-snug" style={{ color: "var(--color-text-main)" }}>
                                  {ch.challenge}
                                </p>
                              </div>
                              <div className="flex items-start gap-2.5 pt-2 border-t" style={{ borderColor: "var(--color-border)" }}>
                                <span
                                  className="px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 mt-0.5"
                                  style={{
                                    backgroundColor: "var(--color-emerald-tint)",
                                    color: "var(--color-emerald)",
                                  }}
                                >
                                  {isEN ? "Fix" : "Solusi"}
                                </span>
                                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                  {ch.solution}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Section 5: Complete Tech Stack */}
                    <section className="space-y-3 pt-5 border-t" style={{ borderColor: "var(--color-border)" }}>
                      <h4 className="font-heading text-base sm:text-lg font-bold flex items-center gap-2" style={{ color: "var(--color-text-main)" }}>
                        <Cpu className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                        <span>{isEN ? "Technologies Used" : "Teknologi yang Digunakan"}</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="surface-chip px-3 py-1.5 rounded-lg text-xs font-medium"
                            style={{ color: "var(--color-text-main)" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>

                    {/* Footer Cross-Links: Related Experience + Jump to Visuals */}
                    <div
                      className="pt-5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      {activeProject.relatedExperienceId ? (
                        <button
                          type="button"
                          onClick={() => handleNavigateToExperience(activeProject.relatedExperienceId!)}
                          className="surface-chip inline-flex items-center justify-center sm:justify-start gap-2.5 min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors hover:border-[var(--color-primary)]"
                          style={{ color: "var(--color-text-main)" }}
                        >
                          <Briefcase className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                          <span className="truncate">
                            {isEN ? "See Experience:" : "Lihat Pengalaman:"} {activeProject.relatedExperienceCompany}
                          </span>
                        </button>
                      ) : (
                        <div />
                      )}

                      {activeProject.gallery && activeProject.gallery.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveView("gallery")}
                          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white transition-all hover:brightness-110"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          <Images className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>
                            {isEN
                              ? `View ${activeProject.gallery.length} Visual Artifacts`
                              : `Lihat ${activeProject.gallery.length} Galeri & Topologi`}
                          </span>
                          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {activeView === "gallery" && (
                  <div className="mx-auto max-w-5xl space-y-6 pb-6">
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
                                ? "AWS Blueprint Artifacts, Grafana K6 & SEALS Platform"
                                : "Artefak Blueprint AWS, Grafana K6 & Platform SEALS"}
                            </h4>
                            <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                              {isEN
                                ? "Isolated VPC (10.0.0.0/16), EC2 & RDS t3.medium, Nginx Reverse Proxy seals.id, and K6 100 VUs testing."
                                : "VPC terisolasi (10.0.0.0/16), EC2 & RDS t3.medium, Nginx Reverse Proxy seals.id, serta uji beban K6 100 VUs."}
                            </p>
                          </div>
                        </div>

                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold text-white shrink-0"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{isEN ? "Visit seals.id" : "Kunjungi seals.id"}</span>
                        </a>
                      </div>
                    )}

                    {availableCategories.length > 1 && (
                      <div className="flex flex-wrap items-center gap-2 pb-3 border-b" style={{ borderColor: "var(--color-border)" }}>
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
                              className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors flex items-center gap-1.5 ${isActive ? "" : "surface-chip"}`}
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
                            className="surface-chip group text-left rounded-2xl overflow-hidden transition-all flex flex-col hover:-translate-y-0.5 active:scale-[0.99]"
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
                              <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
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
                                className="flex items-center justify-between pt-2 border-t text-[11px] font-medium"
                                style={{
                                  borderColor: "var(--color-border)",
                                  color: "var(--color-primary-text)",
                                }}
                              >
                                <span>{isEN ? "Tap to inspect" : "Ketuk untuk perbesar"}</span>
                                <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="surface-inset p-10 text-center rounded-2xl border-dashed space-y-3">
                        <Layers className="w-8 h-8 mx-auto" style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
                        <p className="text-sm font-semibold" style={{ color: "var(--color-text-main)" }}>
                          {isEN ? "No artifacts in this category" : "Tidak ada artefak dalam kategori ini"}
                        </p>
                        <button
                          type="button"
                          onClick={() => setGalleryCategory(allLabel)}
                          className="min-h-[42px] px-4 py-1.5 rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          {isEN ? "Show All" : "Tampilkan Semua"}
                        </button>
                      </div>
                    )}
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
                  containerClassName="h-[52dvh] sm:h-[66dvh]"
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
