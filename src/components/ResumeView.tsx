"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useRouter } from "next/navigation";
import { usePortfolioData } from "@/data/portfolioData";
import { uiTranslations } from "@/data/translations";
import { ExperienceCertificate } from "@/types/portfolio";
import ExpandableText from "@/components/ExpandableText";
import {
  MapPin,
  Award,
  ExternalLink,
  ArrowRight,
  X,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CertModalState {
  experienceTitle: string;
  certificates: ExperienceCertificate[];
  activeIndex: number;
}

type ResumeSectionTab = "experience" | "education" | "education-trainings";

export default function ResumeView() {
  const router = useRouter();
  const { experiencesData, educationData, trainingsData, lang } = usePortfolioData();
  const t = uiTranslations[lang];
  const [activeSection, setActiveSection] = useState<ResumeSectionTab>("experience");
  const [certModal, setCertModal] = useState<CertModalState | null>(null);
  const [expandedExps, setExpandedExps] = useState<Record<string, boolean>>({});
  const isMounted = useIsMounted();

  // Sync active section with URL hash
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "experience" || hash === "resume") {
        setActiveSection("experience");
      } else if (hash === "education") {
        setActiveSection("education");
      } else if (hash === "education-trainings" || hash === "trainings") {
        setActiveSection("education-trainings");
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  // IntersectionObserver for real-time scroll-spy active state tracking
  useEffect(() => {
    const targets: ResumeSectionTab[] = ["experience", "education", "education-trainings"];
    const elements = targets
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
          const currentId = visible[0].target.id as ResumeSectionTab;
          if (targets.includes(currentId)) {
            setActiveSection(currentId);
          }
        }
      },
      {
        rootMargin: "-15% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleScrollToSection = (sectionId: ResumeSectionTab) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${sectionId}`);
      }
    }
  };

  const nextCert = useCallback(() => {
    setCertModal((prev) => {
      if (!prev) return null;
      const nextIdx = (prev.activeIndex + 1) % prev.certificates.length;
      return { ...prev, activeIndex: nextIdx };
    });
  }, []);

  const prevCert = useCallback(() => {
    setCertModal((prev) => {
      if (!prev) return null;
      const prevIdx = (prev.activeIndex - 1 + prev.certificates.length) % prev.certificates.length;
      return { ...prev, activeIndex: prevIdx };
    });
  }, []);

  const openCertModal = (certs: ExperienceCertificate[], index: number, expTitle: string) => {
    setCertModal({
      experienceTitle: expTitle,
      certificates: certs,
      activeIndex: index,
    });
  };

  // Lock body scroll when certificate modal is open
  useEffect(() => {
    if (certModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [certModal]);

  // Close modal on Escape key & Arrow navigation
  useEffect(() => {
    if (!certModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCertModal(null);
      } else if (e.key === "ArrowRight") {
        nextCert();
      } else if (e.key === "ArrowLeft") {
        prevCert();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [certModal, nextCert, prevCert]);

  // Listen for open-experience event from other components
  useEffect(() => {
    const handleOpenExperience = (e: Event) => {
      const customEvent = e as CustomEvent<{ expId?: string }>;
      const expId = customEvent.detail?.expId;
      if (!expId) return;

      // Auto-expand target experience so all details are visible
      setExpandedExps((prev) => ({ ...prev, [expId]: true }));

      const el = document.getElementById(`experience-${expId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-blue-500");
        setTimeout(() => el.classList.remove("ring-2", "ring-blue-500"), 2500);
      }
    };

    window.addEventListener("open-experience", handleOpenExperience as EventListener);
    return () => {
      window.removeEventListener("open-experience", handleOpenExperience as EventListener);
    };
  }, []);

  const handleNavigateToProject = (projectId: string) => {
    window.dispatchEvent(
      new CustomEvent("open-project-modal", {
        detail: { projectId, tab: "overview" },
      })
    );

    const targetEl = document.getElementById(`project-${projectId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      targetEl.classList.add("ring-2", "ring-blue-500/60");
      setTimeout(() => targetEl.classList.remove("ring-2", "ring-blue-500/60"), 2500);
    } else {
      router.push(`/portfolio#project-${projectId}`);
    }
  };

  return (
    <article className="space-y-6">
      {/* 1. MASTER RESUME HEADER & SUB-MENU JUMP PILLS */}
      <section className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800/80 p-5 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-black/50 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6 mb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              {t.resume.badge}
            </div>
            <div className="flex items-baseline gap-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {t.resume.title}
              </h1>
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                .
              </span>
            </div>
            <div className="h-1 w-12 rounded-full bg-blue-600 dark:bg-blue-500" />
          </div>

          {/* Sub-Menu Quick Navigation Pills with Dynamic Responsive Active State */}
          <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 p-1.5 flex-wrap">
            {[
              { id: "experience" as const, label: t.resume.tabExperience, icon: Briefcase },
              { id: "education" as const, label: t.resume.tabEducation, icon: GraduationCap },
              { id: "education-trainings" as const, label: t.resume.tabTrainings, icon: Award },
            ].map((tab) => {
              const isActive = activeSection === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleScrollToSection(tab.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25 font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/80 dark:hover:bg-slate-800/80 font-medium"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-blue-500 dark:text-blue-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-loose">
          {t.resume.subtitle}
        </p>
      </section>

      {/* 2. WORK EXPERIENCE SECTION */}
      <section id="experience" className="w-full scroll-mt-20">
        <div id="resume" className="scroll-mt-20" />
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800/80 p-5 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5 dark:shadow-black/50 transition-colors">
          <div className="flex items-center gap-2 mb-8 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">01</span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              {t.resume.workExperienceTitle}
            </h2>
          </div>

          <div className="space-y-10">
            {experiencesData.map((exp, idx) => (
              <div
                key={exp.id}
                id={`experience-${exp.id}`}
                className={`grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 pb-10 transition-all ${
                  idx !== experiencesData.length - 1
                    ? "border-b border-slate-200/70 dark:border-slate-800/70"
                    : ""
                }`}
              >
                {/* Left Column: Period & Location */}
                <div className="md:col-span-4 space-y-2">
                  <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white font-mono">
                    {exp.period}
                  </div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60 font-mono">
                    {exp.type}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span>{exp.location}</span>
                  </p>

                  {/* Certificates linked to this experience */}
                  {exp.certificates && exp.certificates.length > 0 && (
                    <div className="pt-3 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-blue-500" />
                          <span>{lang === "EN" ? `Official Credentials (${exp.certificates.length})` : `Sertifikat Resmi (${exp.certificates.length})`}</span>
                        </span>
                        {exp.certificates.length > 1 && (
                          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200/60 dark:border-blue-900/40 font-medium">
                            {lang === "EN" ? `${exp.certificates.length} Credentials` : `${exp.certificates.length} Kredensial`}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        {exp.certificates.map((cert, cIdx) => (
                          <button
                            key={cert.id}
                            type="button"
                            onClick={() =>
                              openCertModal(
                                exp.certificates!,
                                cIdx,
                                `${exp.role} • ${exp.company}`
                              )
                            }
                            className="w-full text-left group flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-900/60 hover:bg-blue-50/80 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700/60 transition-all text-xs cursor-pointer shadow-xs"
                          >
                            <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-[10px] font-bold font-mono shrink-0 group-hover:scale-105 transition-transform">
                              {cIdx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 leading-snug">
                                {cert.title}
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate mt-0.5">
                                {cert.issuer} {cert.issueDate ? `• ${cert.issueDate}` : ""}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Role, Company & Contributions */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="mt-0.5 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {exp.company}{" "}
                      {exp.placementPartner && (
                        <span className="text-slate-400 font-normal">
                          × {exp.placementPartner}
                        </span>
                      )}
                    </div>
                  </div>

                  <ExpandableText
                    text={exp.description}
                    previewWords={26}
                    maxWords={300}
                    isExpanded={expandedExps[exp.id] ?? false}
                    onToggle={(val) => setExpandedExps((prev) => ({ ...prev, [exp.id]: val }))}
                    expandLabel={t.common.readMore}
                    collapseLabel={t.common.showLess}
                    className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-loose"
                  >
                    {/* Highlights Bullet List with Interactive Expandable Control */}
                    <div className="space-y-2.5 pt-1">
                      <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {lang === "EN" ? "Key Responsibilities & Contributions:" : "Tanggung Jawab & Kontribusi Utama:"}
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-loose list-none">
                        {exp.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stack pills & Jump to Project button */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {exp.relatedProjectId && (
                        <button
                          type="button"
                          onClick={() => handleNavigateToProject(exp.relatedProjectId!)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0 cursor-pointer"
                        >
                          <span>{t.resume.viewProjectArch}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </ExpandableText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SUB-MENU SECTION: EDUCATION */}
      <section id="education" className="w-full scroll-mt-20">
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800/80 p-5 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5 dark:shadow-black/50 transition-colors">
          <div className="flex items-center justify-between mb-8 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">02</span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                {t.resume.formalEducationTitle}
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
              {lang === "EN" ? "ACADEMIC CREDENTIAL" : "PENDIDIKAN FORMAL"}
            </span>
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60 w-fit">
                {educationData.degree} {educationData.field}
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                {lang === "EN" ? "2021 – 2026 • Graduated with Honors" : "2021 – 2026 • Lulus dengan Predikat Pujian"}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {educationData.institution}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {educationData.location}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {lang === "EN" ? "Cumulative GPA:" : "Indeks Prestasi Kumulatif (IPK):"}
              </span>
              <span className="text-base font-bold text-blue-600 dark:text-blue-400 font-mono">
                {educationData.gpa.includes("/ 4.00") ? educationData.gpa : `${educationData.gpa} / 4.00`}
              </span>
            </div>

            <div className="pt-2">
              <ExpandableText
                text={
                  lang === "EN"
                    ? "Completed Bachelor of Computer Science (S.Kom) degree focusing on software engineering, cloud architecture, operating systems, and computer network administration, graduating with honors (GPA: 3.59 / 4.00)."
                    : "Menyelesaikan studi Sarjana Komputer (S.Kom.) dengan fokus rekayasa perangkat lunak, arsitektur cloud, sistem operasi, serta administrasi jaringan komputasi awan dengan predikat kelulusan dengan pujian (IPK 3.59)."
                }
                previewWords={20}
                maxWords={300}
                expandLabel={lang === "EN" ? "View full academic highlights" : "Lihat highlight akademik selengkapnya"}
                collapseLabel={t.common.showLess}
                className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
              >
                <div className="space-y-3 pt-1">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                    {lang === "EN" ? "ACADEMIC HIGHLIGHTS & CORE CURRICULUM:" : "HIGHLIGHT AKADEMIK & KOMPETENSI INTI:"}
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-loose list-none">
                    {educationData.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ExpandableText>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUB-MENU SECTION: EDUCATION & ACADEMY TRAININGS */}
      <section id="education-trainings" className="w-full scroll-mt-20">
        <div id="trainings" className="scroll-mt-20" />
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800/80 p-5 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5 dark:shadow-black/50 transition-colors">
          <div className="flex items-center justify-between mb-8 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">03</span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                {t.resume.trainingsTitle}
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
              AWS ACADEMY CREDENTIALS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingsData.map((training, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 space-y-3 transition-all hover:border-blue-500/40 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {training.title}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                      {training.hours}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {training.issuer} — {training.program}
                  </h3>

                  <div className="pt-0.5">
                    <ExpandableText
                      text={training.description.join(" ")}
                      previewWords={18}
                      maxWords={300}
                      expandLabel={lang === "EN" ? "View course syllabus details" : "Lihat detail materi pelatihan"}
                      collapseLabel={t.common.showLess}
                      className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                      <div className="space-y-2 pt-1">
                        <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                          {lang === "EN" ? "Competencies Acquired:" : "Kompetensi yang Dipelajari:"}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {training.skillsGained.map((sk) => (
                            <span
                              key={sk}
                              className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/60 text-[10px] font-mono text-blue-700 dark:text-blue-300"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </ExpandableText>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                  {training.verificationUrl && (
                    <a
                      href={training.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Award className="h-4 w-4" />
                      <span>{lang === "EN" ? "Verify Digital Badge on Credly" : "Verifikasi Kredensial di Credly Badge"}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Certificate Preview Modal with Multi-Certificate Support */}
      {isMounted && certModal && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setCertModal(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090e1a] space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60">
                      {certModal.certificates[certModal.activeIndex].issuer}
                    </span>
                    {certModal.certificates.length > 1 && (
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                        Sertifikat {certModal.activeIndex + 1} dari {certModal.certificates.length}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {certModal.certificates[certModal.activeIndex].title}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    {certModal.experienceTitle} • {certModal.certificates[certModal.activeIndex].issueDate || "Resmi"}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {certModal.certificates.length > 1 && (
                    <div className="flex items-center gap-1 mr-1">
                      <button
                        type="button"
                        onClick={prevCert}
                        className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Sertifikat Sebelumnya (Panah Kiri)"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextCert}
                        className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Sertifikat Berikutnya (Panah Kanan)"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => setCertModal(null)}
                    className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Tutup (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Certificate selector pills if more than 1 */}
              {certModal.certificates.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
                  {certModal.certificates.map((c, idx) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCertModal((prev) => prev ? { ...prev, activeIndex: idx } : null)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                        certModal.activeIndex === idx
                          ? "bg-blue-600 text-white shadow-xs font-semibold"
                          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center bg-black/15 dark:bg-white/20">
                        {idx + 1}
                      </span>
                      <span className="truncate max-w-[160px] sm:max-w-[220px]">
                        {c.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {certModal.certificates[certModal.activeIndex].imageUrl && (
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
                  <Image
                    src={certModal.certificates[certModal.activeIndex].imageUrl}
                    alt={certModal.certificates[certModal.activeIndex].title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {/* Meta badges row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {certModal.certificates[certModal.activeIndex].credentialId && (
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans font-semibold">
                      {lang === "EN" ? "Credential ID" : "Nomor Kredensial"}
                    </span>
                    {certModal.certificates[certModal.activeIndex].credentialId}
                  </div>
                )}
                {certModal.certificates[certModal.activeIndex].signatory && (
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span className="text-slate-400 block text-[10px] uppercase font-sans font-semibold">
                      {lang === "EN" ? "Official Signatory" : "Penandatangan Resmi"}
                    </span>
                    {certModal.certificates[certModal.activeIndex].signatory}
                  </div>
                )}
              </div>

              {/* Skills Pills */}
              {certModal.certificates[certModal.activeIndex].skills && certModal.certificates[certModal.activeIndex].skills!.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                    {lang === "EN" ? "Verified Competencies:" : "Kompetensi Terverifikasi:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {certModal.certificates[certModal.activeIndex].skills!.map((skill) => (
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
              {certModal.certificates[certModal.activeIndex].description && (
                <ExpandableText
                  text={certModal.certificates[certModal.activeIndex].description}
                  maxWords={300}
                  expandLabel={t.common.readMore}
                  collapseLabel={t.common.showLess}
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-loose"
                />
              )}

              {/* External verification button (Credly) */}
              {certModal.certificates[certModal.activeIndex].verificationUrl && (
                <div className="pt-2">
                  <a
                    href={certModal.certificates[certModal.activeIndex].verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <span>{lang === "EN" ? "Verify Digital Badge on Credly" : "Verifikasi Digital Badge di Credly"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer with Previous / Next Buttons */}
            {certModal.certificates.length > 1 && (
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
                  {certModal.activeIndex + 1} / {certModal.certificates.length}
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
    </article>
  );
}
