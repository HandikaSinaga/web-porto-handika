"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useIsMounted } from "@/hooks/useIsMounted";
import { usePortfolioData } from "@/data/portfolioData";
import { uiTranslations } from "@/data/translations";
import { getSectionHref } from "@/data/navigation";
import { ProjectImage } from "@/types/portfolio";
import ZoomableImage from "@/components/ZoomableImage";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  X,
  FileText,
  Briefcase,
  AlertCircle,
  Server,
  Database,
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Presentation,
  ZoomIn,
  Layers,
  ShieldCheck,
  Images,
  Cpu,
  Calendar,
  Building2,
  UserCheck,
} from "lucide-react";

interface ProjectDetailViewProps {
  projectId: string;
}

export default function ProjectDetailView({ projectId }: ProjectDetailViewProps) {
  const { projectsData, lang } = usePortfolioData();
  const isEN = lang === "EN";
  const t = uiTranslations[lang];
  const isMounted = useIsMounted();

  const project = useMemo(
    () => projectsData.find((p) => p.id === projectId) || projectsData[0],
    [projectsData, projectId]
  );

  const otherProject = useMemo(
    () => projectsData.find((p) => p.id !== project.id),
    [projectsData, project.id]
  );

  const allLabel = isEN ? "All" : "Semua";
  const [galleryCategory, setGalleryCategory] = useState<string>(allLabel);
  const [lightboxImage, setLightboxImage] = useState<ProjectImage | null>(null);

  const availableCategories = useMemo(() => {
    if (!project.gallery) return [];
    const cats = Array.from(
      new Set(project.gallery.map((img) => img.category).filter(Boolean) as string[])
    );
    return [allLabel, ...cats];
  }, [project.gallery, allLabel]);

  const activeGalleryCategory = useMemo(() => {
    if (availableCategories.includes(galleryCategory)) return galleryCategory;
    return allLabel;
  }, [availableCategories, galleryCategory, allLabel]);

  const visibleGalleryImages = useMemo(() => {
    if (!project.gallery) return [];
    if (activeGalleryCategory === allLabel) return project.gallery;
    return project.gallery.filter((img) => img.category === activeGalleryCategory);
  }, [project.gallery, activeGalleryCategory, allLabel]);

  const currentGallery = useMemo(() => project.gallery || [], [project.gallery]);
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
    if (!lightboxImage) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
      else if (e.key === "ArrowLeft") handlePrevLightbox();
      else if (e.key === "ArrowRight") handleNextLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxImage, handlePrevLightbox, handleNextLightbox]);

  const coverImage = project.gallery?.[0];
  const primaryActionUrl = project.liveUrl || project.presentationUrl || project.documentationUrl;
  const primaryActionLabel = project.liveUrl
    ? isEN
      ? "Visit Live Site"
      : "Kunjungi Situs Live"
    : isEN
    ? "View Presentation"
    : "Lihat Slide Presentasi";

  const tocItems = [
    { id: "overview", label: isEN ? "Overview" : "Ringkasan" },
    ...(project.nodeFlow?.length || project.architectureDetails
      ? [{ id: "architecture", label: isEN ? "Architecture" : "Arsitektur" }]
      : []),
    ...(project.details?.length ? [{ id: "deliverables", label: isEN ? "Deliverables" : "Capaian" }] : []),
    ...(project.challenges?.length ? [{ id: "challenges", label: isEN ? "Challenges" : "Tantangan" }] : []),
    { id: "tech-stack", label: isEN ? "Tech Stack" : "Teknologi" },
    ...(project.gallery?.length
      ? [{ id: "visuals", label: `${isEN ? "Visuals" : "Galeri"} (${project.gallery.length})` }]
      : []),
  ];

  const experienceHref = getSectionHref("experience", lang);
  const portfolioBackHref = getSectionHref("portfolio", lang);

  return (
    <article className="py-8 sm:py-12">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 space-y-8 sm:space-y-10">
        {/* Top Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={portfolioBackHref}
            className="surface-chip inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors hover:border-[var(--color-primary)]"
            style={{ color: "var(--color-text-main)" }}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{isEN ? "Back to Portfolio" : "Kembali ke Portofolio"}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {project.presentationFileUrl && (
              <a
                href={project.presentationFileUrl}
                download="gazebo-samasta-final-presentation.pptx"
                className="surface-chip inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors hover:border-[var(--color-primary)]"
                style={{ color: "var(--color-text-main)" }}
              >
                <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.projects.downloadPptx}</span>
              </a>
            )}
            {primaryActionUrl && (
              <a
                href={primaryActionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[42px] px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)",
                  boxShadow: "0 4px 14px var(--color-primary-glow)",
                }}
              >
                <span>{primaryActionLabel}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* Full Unobstructed Case Study Header */}
        <header className="space-y-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {project.category}
              </span>
              {project.teamName && (
                <span
                  className="surface-chip px-3 py-1 rounded-full text-xs font-medium"
                  style={{ color: "var(--color-primary-text)" }}
                >
                  {project.teamName}
                </span>
              )}
            </div>

            <h1
              className="font-heading font-extrabold tracking-[-0.025em] leading-[1.18]"
              style={{
                fontSize: "clamp(1.65rem, 3.8vw, 2.75rem)",
                color: "var(--color-text-main)",
              }}
            >
              {project.title}
            </h1>

            <p className="text-sm sm:text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              {project.subtitle}
            </p>
          </div>

          {/* 3-Card Project Metadata Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="surface-card rounded-2xl p-4 flex items-start gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "var(--color-primary-tint)",
                  color: "var(--color-primary-text)",
                }}
              >
                <UserCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                  {isEN ? "Role" : "Peran"}
                </div>
                <div className="text-sm font-bold mt-0.5 leading-snug" style={{ color: "var(--color-text-main)" }}>
                  {project.role}
                </div>
              </div>
            </div>

            <div className="surface-card rounded-2xl p-4 flex items-start gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "var(--color-primary-tint)",
                  color: "var(--color-primary-text)",
                }}
              >
                <Building2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                  {isEN ? "Organization" : "Organisasi"}
                </div>
                <div className="text-sm font-bold mt-0.5 leading-snug" style={{ color: "var(--color-text-main)" }}>
                  {project.organization}
                </div>
              </div>
            </div>

            <div className="surface-card rounded-2xl p-4 flex items-start gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "var(--color-primary-tint)",
                  color: "var(--color-primary-text)",
                }}
              >
                <Calendar className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                  {isEN ? "Timeline" : "Periode"}
                </div>
                <div className="text-sm font-bold mt-0.5 leading-snug" style={{ color: "var(--color-text-main)" }}>
                  {project.period}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Cover (Clickable to Lightbox) */}
          {coverImage && (
            <button
              type="button"
              onClick={() => setLightboxImage(coverImage)}
              className="surface-card group relative block w-full aspect-[16/9] max-h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden text-left"
              aria-label={`${isEN ? "Enlarge preview:" : "Perbesar gambar:"} ${coverImage.title || project.title}`}
            >
              <Image
                src={coverImage.url}
                alt={coverImage.title || project.title}
                fill
                priority
                sizes="(max-width: 1240px) 100vw, 1240px"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-black/80 text-white backdrop-blur-xs">
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isEN ? "Inspect Preview" : "Perbesar Gambar"}</span>
              </span>
            </button>
          )}
        </header>

        {/* Mobile Quick-Jump Section Bar (Clean wrapping pills, zero overflow) */}
        <nav
          aria-label={isEN ? "Case study sections" : "Bagian studi kasus"}
          className="lg:hidden flex flex-wrap gap-2"
        >
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="surface-chip inline-flex items-center min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors hover:border-[var(--color-primary)]"
              style={{ color: "var(--color-text-main)" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Main 2-Column Editorial Case Study Grid (Sticky TOC rail on desktop + spacious reading column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sticky Sidebar Rail */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            <div className="surface-card rounded-2xl p-5 space-y-4">
              <div
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--color-primary-text)" }}
              >
                {isEN ? "On This Page" : "Daftar Isi Proyek"}
              </div>
              <nav aria-label={isEN ? "Section navigation" : "Navigasi bagian"} className="space-y-1">
                {tocItems.map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--color-primary-tint)] hover:text-[var(--color-primary-text)]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <span className="font-mono text-xs opacity-70">{String(idx + 1).padStart(2, "0")}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            {project.relatedExperienceId && (
              <div className="surface-card rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-primary-text)" }}>
                  <Briefcase className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{isEN ? "Related Experience" : "Pengalaman Terkait"}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold" style={{ color: "var(--color-text-main)" }}>
                    {project.relatedExperienceCompany}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {project.relatedExperienceRole}
                  </div>
                </div>
                <Link
                  href={experienceHref}
                  className="surface-chip inline-flex items-center justify-center gap-2 w-full min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold transition-colors hover:border-[var(--color-primary)]"
                  style={{ color: "var(--color-text-main)" }}
                >
                  <span>{isEN ? "View Experience Timeline" : "Lihat Pengalaman"}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            )}
          </aside>

          {/* Main Reading Content Column */}
          <div className="lg:col-span-8 space-y-10 min-w-0">
            {/* 1. Overview & Context */}
            <section id="overview" className="scroll-mt-24 surface-card rounded-2xl p-5 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                <h2 className="font-heading text-xl sm:text-2xl font-bold" style={{ color: "var(--color-text-main)" }}>
                  {isEN ? "Project Overview & Problem Context" : "Ringkasan & Konteks Masalah"}
                </h2>
              </div>

              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {project.description}
              </p>

              {project.backgroundSummary && (
                <div
                  className="surface-inset p-4 sm:p-5 rounded-xl border-l-4 space-y-1.5"
                  style={{ borderLeftColor: "var(--color-primary)" }}
                >
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-primary-text)" }}>
                    {isEN ? "Why It Mattered" : "Masalah yang Diselesaikan"}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-main)" }}>
                    {project.backgroundSummary}
                  </p>
                </div>
              )}

              {project.solutionHighlights && project.solutionHighlights.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-text-main)" }}>
                    {isEN ? "Key Architecture Highlights" : "Sorotan Solusi Utama"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.solutionHighlights.map((item, idx) => (
                      <div key={idx} className="surface-inset p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 2. Architecture & Flow */}
            {(project.nodeFlow?.length || project.architectureDetails) && (
              <section id="architecture" className="scroll-mt-24 surface-card rounded-2xl p-5 sm:p-8 space-y-6">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-5 h-5 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                  <h2 className="font-heading text-xl sm:text-2xl font-bold" style={{ color: "var(--color-text-main)" }}>
                    {isEN ? "System Architecture & Data Flow" : "Arsitektur Sistem & Alur Trafik"}
                  </h2>
                </div>

                {project.nodeFlow && project.nodeFlow.length > 0 && (
                  <div className="surface-inset p-4 sm:p-5 rounded-xl space-y-3">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--color-primary-text)" }}>
                      {isEN ? "Production Request Pipeline" : "Alur Request & Infrastruktur"}
                    </div>
                    <ol className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2">
                      {project.nodeFlow.map((node, idx) => (
                        <li key={node} className="flex items-center gap-2">
                          <span
                            className="surface-chip px-3 py-2 rounded-xl text-xs font-semibold w-full sm:w-auto flex items-center gap-2"
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
                          {idx < project.nodeFlow!.length - 1 && (
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

                {project.architectureDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="surface-inset p-4 rounded-xl space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase" style={{ color: "var(--color-text-main)" }}>
                        <Server className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                        <span>{isEN ? "Web & App Layer" : "Lapisan Web & App"}</span>
                      </div>
                      <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {project.architectureDetails.webTier}
                      </p>
                      <p className="text-xs sm:text-[13px] pt-2 border-t leading-relaxed" style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border)" }}>
                        {project.architectureDetails.appTier}
                      </p>
                    </div>

                    <div className="surface-inset p-4 rounded-xl space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase" style={{ color: "var(--color-text-main)" }}>
                        <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                        <span>{isEN ? "Network & Region" : "Jaringan & Keamanan"}</span>
                      </div>
                      <p className="text-xs font-mono font-semibold" style={{ color: "var(--color-primary-text)" }}>
                        {project.architectureDetails.region} ({project.architectureDetails.zones.join(", ")})
                      </p>
                      <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {project.architectureDetails.networkSecurity}
                      </p>
                    </div>

                    <div className="surface-inset p-4 rounded-xl space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase" style={{ color: "var(--color-text-main)" }}>
                        <Database className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                        <span>{isEN ? "Database & Telemetry" : "Database & Monitoring"}</span>
                      </div>
                      <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {project.architectureDetails.dbTier}
                      </p>
                      <p className="text-xs sm:text-[13px] pt-2 border-t leading-relaxed" style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border)" }}>
                        {project.architectureDetails.monitoring}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* 3. Deliverables & Impact */}
            {project.details && project.details.length > 0 && (
              <section id="deliverables" className="scroll-mt-24 surface-card rounded-2xl p-5 sm:p-8 space-y-5">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "var(--color-emerald)" }} aria-hidden="true" />
                  <h2 className="font-heading text-xl sm:text-2xl font-bold" style={{ color: "var(--color-text-main)" }}>
                    {isEN ? "Key Deliverables & Impact" : "Capaian Utama & Dampak"}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {project.details.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-mono font-bold"
                        style={{
                          backgroundColor: "var(--color-emerald-tint)",
                          color: "var(--color-emerald)",
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-sm sm:text-[15px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {hl}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 4. Operational Challenges & Solutions */}
            {project.challenges && project.challenges.length > 0 && (
              <section id="challenges" className="scroll-mt-24 surface-card rounded-2xl p-5 sm:p-8 space-y-5">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                  <h2 className="font-heading text-xl sm:text-2xl font-bold" style={{ color: "var(--color-text-main)" }}>
                    {isEN ? "Challenges & Engineering Solutions" : "Tantangan & Solusi Rekayasa"}
                  </h2>
                </div>

                <div className="space-y-4">
                  {project.challenges.map((ch, idx) => (
                    <div key={idx} className="surface-inset p-4 sm:p-5 rounded-xl space-y-3">
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
                        <p className="text-sm sm:text-base font-semibold leading-snug" style={{ color: "var(--color-text-main)" }}>
                          {ch.challenge}
                        </p>
                      </div>
                      <div className="flex items-start gap-2.5 pt-2.5 border-t" style={{ borderColor: "var(--color-border)" }}>
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 mt-0.5"
                          style={{
                            backgroundColor: "var(--color-emerald-tint)",
                            color: "var(--color-emerald)",
                          }}
                        >
                          {isEN ? "Solution" : "Solusi"}
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

            {/* 5. Technologies Used */}
            <section id="tech-stack" className="scroll-mt-24 surface-card rounded-2xl p-5 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-5 h-5 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                <h2 className="font-heading text-xl sm:text-2xl font-bold" style={{ color: "var(--color-text-main)" }}>
                  {isEN ? "Technologies Used" : "Teknologi yang Digunakan"}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="surface-inset px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium"
                    style={{ color: "var(--color-text-main)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Mobile Related Experience Card */}
            {project.relatedExperienceId && (
              <div className="lg:hidden surface-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-primary-text)" }}>
                    {isEN ? "Related Experience" : "Pengalaman Terkait"}
                  </div>
                  <div className="text-sm font-bold mt-0.5" style={{ color: "var(--color-text-main)" }}>
                    {project.relatedExperienceRole} • {project.relatedExperienceCompany}
                  </div>
                </div>
                <Link
                  href={experienceHref}
                  className="surface-chip inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold shrink-0"
                  style={{ color: "var(--color-text-main)" }}
                >
                  <span>{isEN ? "View Experience" : "Lihat Pengalaman"}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 6. Full-Width Visual Artifacts & Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <section id="visuals" className="scroll-mt-24 surface-card rounded-2xl p-5 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <Images className="w-5 h-5 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                  <h2 className="font-heading text-xl sm:text-2xl font-bold" style={{ color: "var(--color-text-main)" }}>
                    {isEN ? "Visual Artifacts & Topology" : "Galeri Artefak & Topologi"}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {isEN
                    ? "Click or tap any screenshot to inspect full resolution with zoom controls."
                    : "Klik atau ketuk gambar untuk melihat ukuran penuh dilengkapi kontrol zoom."}
                </p>
              </div>

              {project.id === "gazebo-samasta-reservation" && (project.presentationFileUrl || project.presentationUrl) && (
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {project.presentationFileUrl && (
                    <a
                      href={project.presentationFileUrl}
                      download="gazebo-samasta-final-presentation.pptx"
                      className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <Presentation className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.projects.downloadPptx}</span>
                    </a>
                  )}
                  {project.presentationUrl && (
                    <a
                      href={project.presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="surface-chip inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold"
                      style={{ color: "var(--color-text-main)" }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.projects.openGdrive}</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {availableCategories.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 pb-3 border-b" style={{ borderColor: "var(--color-border)" }}>
                {availableCategories.map((cat) => {
                  const count =
                    cat === allLabel
                      ? project.gallery?.length || 0
                      : project.gallery?.filter((img) => img.category === cat).length || 0;
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleGalleryImages.map((img, idx) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setLightboxImage(img)}
                  className="surface-inset group text-left rounded-2xl overflow-hidden transition-all flex flex-col hover:-translate-y-0.5 active:scale-[0.99] border"
                  style={{ borderColor: "var(--color-border)" }}
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
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between gap-2 w-full">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold line-clamp-1" style={{ color: "var(--color-text-main)" }}>
                        {img.title || img.caption}
                      </h3>
                      <p className="text-[11px] sm:text-xs line-clamp-2 mt-1 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {img.caption}
                      </p>
                    </div>
                    <div
                      className="flex items-center justify-between pt-2 border-t text-[11px] font-semibold"
                      style={{
                        borderColor: "var(--color-border)",
                        color: "var(--color-primary-text)",
                      }}
                    >
                      <span>{isEN ? "Inspect full resolution" : "Ketuk untuk perbesar"}</span>
                      <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Case Study Switcher */}
        <footer className="surface-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href={portfolioBackHref}
            className="surface-chip inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold"
            style={{ color: "var(--color-text-main)" }}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{isEN ? "All Projects" : "Semua Proyek"}</span>
          </Link>

          {otherProject && (
            <Link
              href={`/portfolio/${otherProject.id}`}
              className="inline-flex items-center justify-between sm:justify-end gap-3 min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <span className="truncate">
                {isEN ? "Next Case Study:" : "Proyek Lainnya:"} {otherProject.title}
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Link>
          )}
        </footer>
      </div>

      {/* Single Clean Full-Screen Image Lightbox */}
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
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                  {lightboxImage.title || lightboxImage.caption}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                  {lightboxImage.caption}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </article>
  );
}
