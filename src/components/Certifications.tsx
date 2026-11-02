"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useIsMounted } from "@/hooks/useIsMounted";
import { usePortfolioData } from "@/data/portfolioData";
import { uiTranslations } from "@/data/translations";
import { Certification } from "@/types/portfolio";
import ExpandableText from "@/components/ExpandableText";
import {
  ExternalLink,
  X,
  Eye,
  Calendar,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
  Award,
} from "lucide-react";

type FilterTab = "featured" | "all" | "Cloud" | "Networking" | "Internship" | "Development";

export default function Certifications() {
  const { certificationsData, lang } = usePortfolioData();
  const t = uiTranslations[lang];
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const isMounted = useIsMounted();

  // Key primary credentials to highlight matching canvas / industry standards
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

  // Filtered certifications calculation
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

  // Lock body scroll when certificate modal is open
  useEffect(() => {
    if (activeCert) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeCert]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (activeCertIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCertIndex(null);
      } else if (e.key === "ArrowRight") {
        nextCert();
      } else if (e.key === "ArrowLeft") {
        prevCert();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCertIndex, nextCert, prevCert]);

  // Helper to reliably extract 4-digit year & ongoing validity status
  const extractYearInfo = (issueDate?: string) => {
    if (!issueDate) return { year: lang === "EN" ? "Official" : "Resmi", isOngoing: false };
    const yearMatch = issueDate.match(/\b(20\d{2})\b/);
    const year = yearMatch ? yearMatch[1] : (lang === "EN" ? "Official" : "Resmi");
    const isOngoing = issueDate.toLowerCase().includes("masa berlaku") || issueDate.toLowerCase().includes("expires");
    return { year, isOngoing };
  };

  const getFilterCount = (filter: FilterTab) => {
    if (filter === "featured") return primaryIds.length;
    if (filter === "all") return certificationsData.length;
    return certificationsData.filter((c) => c.category === filter).length;
  };

  return (
    <section
      id="certifications"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      <div className="rounded-3xl bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 p-5 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5 dark:shadow-black/50 space-y-7 transition-colors">
        {/* 1. Header & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                05
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="h-6 w-6 text-blue-500" />
                {t.certifications.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
              {t.certifications.subtitle}
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.certifications.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2. Interactive Category Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {(
            [
              { key: "featured", label: t.certifications.filterFeatured, icon: Sparkles },
              { key: "all", label: t.certifications.filterAll, icon: null },
              { key: "Cloud", label: "Cloud Computing", icon: null },
              { key: "Internship", label: "MSIB Internship", icon: null },
              { key: "Networking", label: "Networking", icon: null },
              { key: "Development", label: "Development", icon: null },
            ] as const
          ).map((tab) => {
            const count = getFilterCount(tab.key);
            const isActive = selectedFilter === tab.key;
            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedFilter(tab.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                <span>{tab.label}</span>
                <span
                  className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3. Total vs Visible Indicator & Status Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="text-slate-700 dark:text-slate-300">
              <span>{t.certifications.showingCounter} </span>
              <strong className="font-bold text-slate-900 dark:text-white font-mono">
                {displayedCertifications.length}
              </strong>
              <span> {t.certifications.ofCounter} </span>
              <strong className="font-bold text-slate-900 dark:text-white font-mono">
                {certificationsData.length}
              </strong>
              <span> {lang === "EN" ? "verified certifications" : "sertifikat resmi terverifikasi"}</span>
              {searchQuery && (
                <span className="text-blue-600 dark:text-blue-400 ml-1">
                  ({lang === "EN" ? `matching "${searchQuery}"` : `hasil pencarian "${searchQuery}"`})
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {(selectedFilter !== "all" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedFilter("all");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {lang === "EN" ? `Show All (${certificationsData.length})` : `Tampilkan Semua (${certificationsData.length})`}
              </button>
            )}
          </div>
        </div>

        {/* 4. Credentials Grid with Consistent Heights and No Text Cutoff */}
        {displayedCertifications.length === 0 ? (
          <div className="py-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-2">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {lang === "EN"
                ? `No certifications found matching "${searchQuery}".`
                : `Tidak ada sertifikat yang cocok dengan pencarian "${searchQuery}".`}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedFilter("all");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {lang === "EN" ? "Reset Filter & Show All" : "Reset Filter & Tampilkan Semua"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCertifications.map((cert, idx) => {
              const isBNSP = cert.id.includes("bnsp");
              const isAlibaba = cert.id.includes("alibaba");
              const isAWS = cert.id.includes("aws");

              const categoryBadgeBg =
                cert.category === "Cloud"
                  ? "bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300"
                  : cert.category === "Networking"
                  ? "bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300"
                  : cert.category === "Development"
                  ? "bg-indigo-50 dark:bg-indigo-950/70 border-indigo-200 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300"
                  : "bg-blue-50 dark:bg-blue-950/70 border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300";

              const hoverBorder = isBNSP
                ? "hover:border-emerald-500/50"
                : isAlibaba
                ? "hover:border-blue-500/50"
                : isAWS
                ? "hover:border-amber-500/50"
                : "hover:border-indigo-500/50";

              const yearInfo = extractYearInfo(cert.issueDate);

              return (
                <div
                  key={cert.id}
                  onClick={() => setActiveCertIndex(idx)}
                  className={`group cursor-pointer rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 ${hoverBorder} hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-black/40`}
                >
                  {/* Top section: Category & Year Badge */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-md border text-[10px] font-mono font-semibold px-2.5 py-0.5 shrink-0 ${categoryBadgeBg}`}
                      >
                        {cert.category}
                      </span>

                      {/* Year pill with calendar icon - Never cut off */}
                      <div className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-mono text-slate-700 dark:text-slate-200 shadow-2xs">
                        <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="font-semibold">{yearInfo.year}</span>
                        {yearInfo.isOngoing && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            • {lang === "EN" ? "Active" : "Aktif"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Issuer Row with Icon */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate font-medium">{cert.issuer}</span>
                    </div>

                    {/* Certificate Title - Uniform min-height */}
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[3rem] leading-snug">
                        {cert.title}
                      </h3>

                      {/* Credential ID row - Uniform min-height */}
                      <div className="min-h-[1.75rem] flex items-center mt-1.5">
                        {cert.credentialId ? (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate bg-slate-100/90 dark:bg-slate-800/70 px-2 py-0.5 rounded border border-slate-200/70 dark:border-slate-800">
                            {cert.credentialId}
                          </p>
                        ) : (
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono italic">
                            {lang === "EN" ? "Verified Digital Credential" : "Kredensial Digital Terverifikasi"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description - Uniform min-height */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 min-h-[3.6rem]">
                      {cert.description}
                    </p>

                    {/* Verified Skills Tags */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 min-h-[1.75rem] pt-1">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800/40">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-semibold">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{lang === "EN" ? "View Certificate" : "Lihat Sertifikat"}</span>
                    </span>
                    {cert.verificationUrl ? (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Credly</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium font-mono text-[11px]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{lang === "EN" ? "Verified" : "Terverifikasi"}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Certificate Modal Lightbox with Next / Previous Arrows & Keyboard Navigation */}
      {isMounted && activeCert && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveCertIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090e1a] flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60">
                    {activeCert.issuer}
                  </span>
                  {activeCertIndex !== null && displayedCertifications.length > 1 && (
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                      {lang === "EN"
                        ? `Certificate ${activeCertIndex + 1} of ${displayedCertifications.length}`
                        : `Sertifikat ${activeCertIndex + 1} dari ${displayedCertifications.length}`}
                    </span>
                  )}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {activeCert.title}
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  {activeCert.issueDate || (lang === "EN" ? "Official" : "Resmi")}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {displayedCertifications.length > 1 && (
                  <div className="flex items-center gap-1 mr-1">
                    <button
                      type="button"
                      onClick={prevCert}
                      className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      title={lang === "EN" ? "Previous Certificate (Left Arrow)" : "Sertifikat Sebelumnya (Panah Kiri)"}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextCert}
                      className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      title={lang === "EN" ? "Next Certificate (Right Arrow)" : "Sertifikat Berikutnya (Panah Kanan)"}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setActiveCertIndex(null)}
                  className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  title={lang === "EN" ? "Close (Esc)" : "Tutup (Esc)"}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {activeCert.imageUrl && (
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
                  <Image
                    src={activeCert.imageUrl}
                    alt={activeCert.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {/* Meta badges row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {activeCert.credentialId && (
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans font-semibold">
                      {t.certifications.modalCredId}
                    </span>
                    {activeCert.credentialId}
                  </div>
                )}
                {activeCert.signatory && (
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans font-semibold">
                      {lang === "EN" ? "Official Signatory" : "Penandatangan Resmi"}
                    </span>
                    {activeCert.signatory}
                  </div>
                )}
              </div>

              {/* Verified Skills Tags */}
              {activeCert.skills && activeCert.skills.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                    {t.certifications.modalSkills}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <ExpandableText
                text={activeCert.description}
                previewWords={20}
                maxWords={300}
                className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-loose"
              />

              {/* Verified Link */}
              {activeCert.verificationUrl && (
                <div className="pt-2">
                  <a
                    href={activeCert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <span>{t.certifications.modalVerify}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer with Previous / Next Buttons */}
            {displayedCertifications.length > 1 && activeCertIndex !== null && (
              <div className="flex items-center justify-between p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090e1a] text-xs">
                <button
                  type="button"
                  onClick={prevCert}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{lang === "EN" ? "Previous" : "Sebelumnya"}</span>
                </button>
                <span className="font-mono text-slate-500 text-[11px]">
                  {activeCertIndex + 1} / {displayedCertifications.length}
                </span>
                <button
                  type="button"
                  onClick={nextCert}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors cursor-pointer"
                >
                  <span>{lang === "EN" ? "Next" : "Berikutnya"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
