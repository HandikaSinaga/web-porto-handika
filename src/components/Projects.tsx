"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePortfolioData } from "@/data/portfolioData";
import { uiTranslations } from "@/data/translations";
import {
  ExternalLink,
  BookOpen,
  Cloud,
  Search,
  FolderGit2,
  Images,
  X,
} from "lucide-react";

export default function Projects() {
  const { projectsData, lang } = usePortfolioData();
  const isEN = lang === "EN";
  const t = uiTranslations[lang];

  const [projectFilter, setProjectFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
              const detailHref = `/portfolio/${project.id}`;
              return (
                <article
                  key={project.id}
                  id={`project-${project.id === "adaptive-learning-polinema" ? "seals-polinema" : "gazebo-samasta"}`}
                  className="surface-card surface-card-interactive rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Preview Media */}
                    <Link
                      href={detailHref}
                      className="relative aspect-[16/9] w-full overflow-hidden border-b group block"
                      style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        borderColor: "var(--color-border)",
                      }}
                      aria-label={`${isEN ? "Read case study for" : "Baca studi kasus"} ${project.title}`}
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
                    </Link>

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
                        <h3 className="font-heading text-lg sm:text-xl font-bold leading-snug">
                          <Link
                            href={detailHref}
                            className="hover:underline"
                            style={{ color: "var(--color-text-main)" }}
                          >
                            {project.title}
                          </Link>
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
                    <Link
                      href={detailHref}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white transition-all hover:brightness-110"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{isEN ? "Read Case Study" : "Baca Detail Proyek"}</span>
                    </Link>

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
    </section>
  );
}
