"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useIsMounted } from "@/hooks/useIsMounted";
import { usePortfolioData } from "@/data/portfolioData";
import { uiTranslations } from "@/data/translations";
import { Certification } from "@/types/portfolio";
import ZoomableImage from "@/components/ZoomableImage";
import {
  ExternalLink,
  X,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  Award,
} from "lucide-react";

type FilterTab = "featured" | "all" | "Cloud" | "Networking" | "Internship" | "Development";

export default function Certifications() {
  const { certificationsData, lang } = usePortfolioData();
  const isEN = lang === "EN";
  const t = uiTranslations[lang];

  const [selectedFilter, setSelectedFilter] = useState<FilterTab>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const isMounted = useIsMounted();

  const primaryIds = useMemo(
    () => [
      "bnsp-network-engineer",
      "alibaba-aca",
      "alibaba-certified-developer",
      "aws-academy-architecting",
      "aws-academy-foundations",
      "seal-msib-cloud-engineer",
    ],
    []
  );

  const displayedCertifications = useMemo(() => {
    let list: Certification[] = [];
    if (selectedFilter === "featured") {
      list = certificationsData.filter((c) => primaryIds.includes(c.id));
    } else if (selectedFilter === "all") {
      list = certificationsData;
    } else {
      list = certificationsData.filter((c) => c.category === selectedFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.issuer.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          (c.credentialId && c.credentialId.toLowerCase().includes(q)) ||
          c.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return list;
  }, [certificationsData, selectedFilter, searchQuery, primaryIds]);

  const activeCert = activeCertIndex !== null ? displayedCertifications[activeCertIndex] : null;

  const nextCert = useCallback(() => {
    setActiveCertIndex((prev) => {
      if (prev === null || displayedCertifications.length === 0) return 0;
      return (prev + 1) % displayedCertifications.length;
    });
  }, [displayedCertifications.length]);

  const prevCert = useCallback(() => {
    setActiveCertIndex((prev) => {
      if (prev === null || displayedCertifications.length === 0) return 0;
      return (prev - 1 + displayedCertifications.length) % displayedCertifications.length;
    });
  }, [displayedCertifications.length]);

  useEffect(() => {
    if (activeCert) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeCert]);

  useEffect(() => {
    if (activeCertIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCertIndex(null);
      else if (e.key === "ArrowRight") nextCert();
      else if (e.key === "ArrowLeft") prevCert();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCertIndex, nextCert, prevCert]);

  const extractYearInfo = (issueDate?: string) => {
    if (!issueDate) return isEN ? "Official" : "Resmi";
    const yearMatch = issueDate.match(/\b(20\d{2})\b/);
    return yearMatch ? yearMatch[1] : isEN ? "Official" : "Resmi";
  };

  const getFilterCount = (filter: FilterTab) => {
    if (filter === "featured") return primaryIds.length;
    if (filter === "all") return certificationsData.length;
    return certificationsData.filter((c) => c.category === filter).length;
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "featured", label: t.certifications.filterFeatured },
    { key: "all", label: t.certifications.filterAll },
    { key: "Cloud", label: "Cloud" },
    { key: "Internship", label: "MSIB" },
    { key: "Networking", label: "Networking" },
    { key: "Development", label: "Development" },
  ];

  return (
    <section
      id="sertifikasi"
      className="py-12 sm:py-16 scroll-mt-20 transition-colors"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      <div id="certifications" className="scroll-mt-20" />
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 space-y-8">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"
            style={{ color: "var(--color-primary-text)" }}
          >
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>{isEN ? "CERTIFICATIONS" : "SERTIFIKASI"}</span>
          </div>
          <h2
            className="font-heading font-extrabold tracking-[-0.02em]"
            style={{
              fontSize: "clamp(1.65rem, 4vw, 2.5rem)",
              color: "var(--color-text-main)",
            }}
          >
            {isEN ? "Licenses & Certifications" : "Sertifikasi & Pelatihan"}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            {t.certifications.subtitle}
          </p>
        </div>

        {/* Filter Bar + Search Input */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const count = getFilterCount(tab.key);
              const active = selectedFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedFilter(tab.key)}
                  aria-pressed={active}
                  className="inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all"
                  style={{
                    backgroundColor: active ? "var(--color-primary)" : "var(--color-bg-card)",
                    borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                    color: active ? "#ffffff" : "var(--color-text-muted)",
                    boxShadow: active ? "0 4px 14px var(--color-primary-glow)" : "none",
                  }}
                >
                  <span>{tab.label}</span>
                  <span className="text-[11px] font-mono opacity-85">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <label htmlFor="cert-search-input" className="sr-only">
              {t.certifications.searchPlaceholder}
            </label>
            <Search
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--color-text-muted)" }}
              aria-hidden="true"
            />
            <input
              id="cert-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.certifications.searchPlaceholder}
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
                aria-label={isEN ? "Clear search" : "Hapus pencarian"}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full"
                style={{ color: "var(--color-text-muted)" }}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Counter */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm" style={{ color: "var(--color-text-muted)" }}>
          <div>
            {t.certifications.showingCounter}{" "}
            <strong style={{ color: "var(--color-text-main)" }}>{displayedCertifications.length}</strong>{" "}
            {t.certifications.ofCounter}{" "}
            <strong style={{ color: "var(--color-text-main)" }}>{certificationsData.length}</strong>{" "}
            {isEN ? "verified credentials" : "sertifikat terverifikasi"}
          </div>

          {(selectedFilter !== "all" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedFilter("all");
                setSearchQuery("");
              }}
              className="text-xs sm:text-sm font-semibold hover:underline"
              style={{ color: "var(--color-primary-text)" }}
            >
              {isEN ? `Show All (${certificationsData.length})` : `Tampilkan Semua (${certificationsData.length})`}
            </button>
          )}
        </div>

        {/* Empty State */}
        {displayedCertifications.length === 0 ? (
          <div
            className="py-12 px-6 text-center rounded-2xl border border-dashed space-y-3"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
            }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
              {isEN
                ? `No certifications found matching "${searchQuery}".`
                : `Tidak ada sertifikat yang cocok dengan "${searchQuery}".`}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedFilter("all");
                setSearchQuery("");
              }}
              className="min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {isEN ? "Reset & Show All" : "Reset & Tampilkan Semua"}
            </button>
          </div>
        ) : (
          /* 3-Column Visual Certificate Card Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCertifications.map((cert, idx) => {
              const year = extractYearInfo(cert.issueDate);
              return (
                <article
                  key={cert.id}
                  className="surface-card surface-card-interactive rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Certificate Thumbnail Header */}
                    <button
                      type="button"
                      onClick={() => setActiveCertIndex(idx)}
                      aria-label={`${isEN ? "Open certificate" : "Buka sertifikat"}: ${cert.title}`}
                      className="relative block w-full h-[180px] overflow-hidden border-b group text-left"
                      style={{
                        backgroundColor: "var(--color-bg-alt)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      {cert.imageUrl ? (
                        <Image
                          src={cert.imageUrl}
                          alt={cert.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Award className="w-10 h-10" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                        </div>
                      )}

                      {/* Floating Year Pill */}
                      <span
                        className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        <span>{year}</span>
                      </span>
                    </button>

                    {/* Body */}
                    <div className="p-5 sm:p-6 space-y-2.5">
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-bold uppercase tracking-wider"
                        style={{
                          borderColor: "var(--color-border)",
                          color: "var(--color-primary-text)",
                        }}
                      >
                        {cert.category}
                      </span>

                      <h3
                        className="font-heading text-base sm:text-[17px] font-bold leading-snug line-clamp-2"
                        style={{ color: "var(--color-text-main)" }}
                      >
                        {cert.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
                        {cert.issuer}
                      </p>

                      {cert.credentialId && (
                        <p className="text-xs font-mono truncate" style={{ color: "var(--color-text-subtle)" }}>
                          {cert.credentialId}
                        </p>
                      )}
                      {cert.issueDate && (
                        <p className="text-xs" style={{ color: "var(--color-text-subtle)" }}>
                          {cert.issueDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div
                    className="px-5 sm:px-6 py-3.5 border-t flex items-center justify-between gap-2"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveCertIndex(idx)}
                      className="inline-flex items-center gap-1.5 min-h-[40px] text-xs sm:text-sm font-semibold hover:underline"
                      style={{ color: "var(--color-primary-text)" }}
                    >
                      <Eye className="w-4 h-4" aria-hidden="true" />
                      <span>{isEN ? "View Certificate" : "Lihat Sertifikat"}</span>
                    </button>

                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 min-h-[40px] text-xs font-semibold hover:underline"
                        style={{ color: "var(--color-text-main)" }}
                      >
                        <span>Credly</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* CERTIFICATE LIGHTBOX MODAL */}
      {isMounted &&
        activeCert &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveCertIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.title}
          >
            <div
              className="relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-modal-enter"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="p-4 sm:p-5 border-b flex items-start justify-between gap-3"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{
                        backgroundColor: "var(--color-primary-tint)",
                        color: "var(--color-primary-text)",
                      }}
                    >
                      {activeCert.issuer}
                    </span>
                    {activeCertIndex !== null && displayedCertifications.length > 1 && (
                      <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
                        {activeCertIndex + 1} / {displayedCertifications.length}
                      </span>
                    )}
                  </div>
                  <h4 className="font-heading text-base sm:text-lg font-bold leading-snug" style={{ color: "var(--color-text-main)" }}>
                    {activeCert.title}
                  </h4>
                  <p className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
                    {activeCert.issueDate || (isEN ? "Official" : "Resmi")}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {displayedCertifications.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevCert}
                        aria-label={isEN ? "Previous certificate" : "Sertifikat sebelumnya"}
                        className="h-10 w-10 inline-flex items-center justify-center rounded-full border"
                        style={{
                          backgroundColor: "var(--color-bg-card)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-text-main)",
                        }}
                      >
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={nextCert}
                        aria-label={isEN ? "Next certificate" : "Sertifikat berikutnya"}
                        className="h-10 w-10 inline-flex items-center justify-center rounded-full border"
                        style={{
                          backgroundColor: "var(--color-bg-card)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-text-main)",
                        }}
                      >
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveCertIndex(null)}
                    aria-label={isEN ? "Close modal" : "Tutup modal"}
                    className="h-10 w-10 inline-flex items-center justify-center rounded-full border"
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

              <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
                {activeCert.imageUrl && (
                  <ZoomableImage
                    key={activeCert.imageUrl}
                    src={activeCert.imageUrl}
                    alt={activeCert.title}
                    containerClassName="h-64 sm:h-80 md:h-[400px]"
                    isEN={isEN}
                  />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {activeCert.credentialId && (
                    <div
                      className="surface-inset p-3 rounded-xl"
                      style={{ color: "var(--color-text-main)" }}
                    >
                      <span className="block text-[10px] uppercase font-sans font-semibold mb-0.5" style={{ color: "var(--color-text-muted)" }}>
                        {t.certifications.modalCredId}
                      </span>
                      {activeCert.credentialId}
                    </div>
                  )}
                  {activeCert.signatory && (
                    <div
                      className="surface-inset p-3 rounded-xl"
                      style={{ color: "var(--color-text-main)" }}
                    >
                      <span className="block text-[10px] uppercase font-sans font-semibold mb-0.5" style={{ color: "var(--color-text-muted)" }}>
                        {isEN ? "Official Signatory" : "Penandatangan Resmi"}
                      </span>
                      {activeCert.signatory}
                    </div>
                  )}
                </div>

                {activeCert.skills && activeCert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {activeCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="surface-chip px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {activeCert.description && (
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {activeCert.description}
                  </p>
                )}

                {activeCert.verificationUrl && (
                  <a
                    href={activeCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <span>{t.certifications.modalVerify}</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
