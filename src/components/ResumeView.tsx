"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useIsMounted } from "@/hooks/useIsMounted";
import { usePortfolioData } from "@/data/portfolioData";
import { uiTranslations } from "@/data/translations";
import { ExperienceCertificate } from "@/types/portfolio";
import ZoomableImage from "@/components/ZoomableImage";
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
  Calendar,
  CheckCircle2,
} from "lucide-react";

interface CertModalState {
  experienceTitle: string;
  certificates: ExperienceCertificate[];
  activeIndex: number;
}

export default function ResumeView() {
  const router = useRouter();
  const { experiencesData, educationData, trainingsData, lang } = usePortfolioData();
  const isEN = lang === "EN";
  const t = uiTranslations[lang];

  const [certModal, setCertModal] = useState<CertModalState | null>(null);
  const isMounted = useIsMounted();

  const nextCert = useCallback(() => {
    setCertModal((prev) => {
      if (!prev) return null;
      return { ...prev, activeIndex: (prev.activeIndex + 1) % prev.certificates.length };
    });
  }, []);

  const prevCert = useCallback(() => {
    setCertModal((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        activeIndex: (prev.activeIndex - 1 + prev.certificates.length) % prev.certificates.length,
      };
    });
  }, []);

  useEffect(() => {
    if (certModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [certModal]);

  useEffect(() => {
    if (!certModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCertModal(null);
      else if (e.key === "ArrowRight") nextCert();
      else if (e.key === "ArrowLeft") prevCert();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [certModal, nextCert, prevCert]);

  useEffect(() => {
    const handleOpenExperience = (e: Event) => {
      const customEvent = e as CustomEvent<{ expId?: string }>;
      const expId = customEvent.detail?.expId;
      if (!expId) return;
      const el = document.getElementById(`experience-${expId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    window.addEventListener("open-experience", handleOpenExperience as EventListener);
    return () => window.removeEventListener("open-experience", handleOpenExperience as EventListener);
  }, []);

  const handleNavigateToProject = (projectId: string) => {
    router.push(`/portfolio/${projectId}`);
  };

  return (
    <>
      {/* 1. EDUCATION & ACADEMY TRAININGS SECTION */}
      <section
        id="pendidikan"
        className="section-flow py-12 sm:py-16 scroll-mt-20 transition-colors"
      >
        <div id="education" className="scroll-mt-20" />
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <div
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"
              style={{ color: "var(--color-primary-text)" }}
            >
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span>{isEN ? "EDUCATION" : "PENDIDIKAN"}</span>
            </div>
            <h2
              className="font-heading font-extrabold tracking-[-0.02em]"
              style={{
                fontSize: "clamp(1.65rem, 4vw, 2.5rem)",
                color: "var(--color-text-main)",
              }}
            >
              {isEN ? "Academic Background & AWS Trainings" : "Riwayat Pendidikan & Pelatihan"}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              {isEN
                ? "Bachelor's degree in Computer Science complemented by intensive AWS Academy cloud architecture training."
                : "Pendidikan sarjana Teknik Informatika yang dilengkapi pelatihan arsitektur cloud resmi dari AWS Academy."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Formal Education Card */}
            <article className="lg:col-span-5 surface-card surface-card-interactive rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "var(--color-primary-tint)",
                      color: "var(--color-primary-text)",
                    }}
                  >
                    <GraduationCap className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: "var(--color-primary-text)" }}
                  >
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{educationData.period}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold" style={{ color: "var(--color-text-main)" }}>
                    {educationData.institution}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: "var(--color-primary-text)" }}>
                      {educationData.degree} - {educationData.field}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                      style={{
                        backgroundColor: "var(--color-primary-tint)",
                        borderColor: "var(--color-border)",
                        color: "var(--color-primary-text)",
                      }}
                    >
                      {isEN ? "GPA" : "IPK"} {educationData.gpa}
                    </span>
                  </div>
                  {educationData.location && (
                    <p className="text-xs mt-1.5 flex items-center gap-1.5" style={{ color: "var(--color-text-muted)" }}>
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{educationData.location}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {isEN
                      ? "Bachelor of Computer Science (Informatics Engineering) graduate with an HKI-output thesis and national BNSP networking certification."
                      : "Lulusan S1 Teknik Informatika dengan Tugas Akhir berluaran HKI serta sertifikasi kompetensi jaringan BNSP."}
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm list-none" style={{ color: "var(--color-text-muted)" }}>
                    {educationData.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: "var(--color-emerald)" }}
                          aria-hidden="true"
                        />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                <a
                  href="https://unpam.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:underline"
                  style={{ color: "var(--color-primary-text)" }}
                >
                  <span>{isEN ? "Visit University Website" : "Kunjungi Situs Resmi"}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>

            {/* AWS Academy Trainings Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {trainingsData.map((training) => (
                <article
                  key={training.title}
                  className="surface-card surface-card-interactive rounded-2xl p-6 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: "var(--color-primary-text)" }}
                      >
                        {training.issuer}
                      </span>
                      {training.hours && (
                        <span
                          className="surface-chip px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {training.hours}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-lg font-bold leading-snug" style={{ color: "var(--color-text-main)" }}>
                      {training.title}
                    </h3>

                    <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                      {training.program}
                    </p>

                    <div className="space-y-3">
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {training.description.join(" ")}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {training.skillsGained.map((sk) => (
                          <span
                            key={sk}
                            className="surface-chip px-2 py-0.5 rounded-md text-[11px] font-medium"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {training.verificationUrl && (
                    <div className="pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                      <a
                        href={training.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:underline"
                        style={{ color: "var(--color-primary-text)" }}
                      >
                        <Award className="w-4 h-4" aria-hidden="true" />
                        <span>{isEN ? "Verify Badge on Credly" : "Verifikasi Badge Credly"}</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. WORK & INTERNSHIP EXPERIENCE SECTION */}
      <section
        id="pengalaman"
        className="section-flow py-12 sm:py-16 scroll-mt-20 transition-colors"
      >
        <div id="experience" className="scroll-mt-20" />
        <div id="resume" className="scroll-mt-20" />
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <div
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"
              style={{ color: "var(--color-primary-text)" }}
            >
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              <span>{isEN ? "EXPERIENCE" : "PENGALAMAN"}</span>
            </div>
            <h2
              className="font-heading font-extrabold tracking-[-0.02em]"
              style={{
                fontSize: "clamp(1.65rem, 4vw, 2.5rem)",
                color: "var(--color-text-main)",
              }}
            >
              {isEN ? "Industry & Leadership Experience" : "Pengalaman Industri & Kepemimpinan"}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              {t.resume.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {experiencesData.map((exp, idx) => (
              <article
                key={exp.id}
                id={`experience-${exp.id}`}
                className={`surface-card surface-card-interactive rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5 ${
                  experiencesData.length === 3 && idx === 2 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-start gap-4">
                    <div
                      className="h-12 w-12 rounded-xl border flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        borderColor: "var(--color-border)",
                        color: "var(--color-primary-text)",
                      }}
                    >
                      <Briefcase className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold" style={{ color: "var(--color-primary-text)" }}>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{exp.period}</span>
                        </span>
                        <span>•</span>
                        <span>{exp.type}</span>
                      </div>
                      <p className="text-xs flex items-center gap-1" style={{ color: "var(--color-text-muted)" }}>
                        <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{exp.location}</span>
                      </p>
                      <h3 className="font-heading text-lg sm:text-xl font-bold leading-snug pt-0.5" style={{ color: "var(--color-text-main)" }}>
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold" style={{ color: "var(--color-primary-text)" }}>
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Description & Contributions Box */}
                  <div className="space-y-3">
                    {exp.description && (
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {exp.description}
                      </p>
                    )}
                    <div className="surface-inset rounded-xl p-4 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-primary-text)" }}>
                        {isEN ? "Key Contributions & Deliverables:" : "Kontribusi & Pencapaian:"}
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm list-none" style={{ color: "var(--color-text-muted)" }}>
                        {exp.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <CheckCircle2
                              className="w-4 h-4 shrink-0 mt-0.5"
                              style={{ color: "var(--color-primary-text)" }}
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="surface-chip px-2.5 py-1 rounded-lg text-xs font-medium"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Linked Certificates & Project Jump */}
                <div className="pt-4 border-t space-y-3" style={{ borderColor: "var(--color-border)" }}>
                  {exp.certificates && exp.certificates.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.certificates.map((cert, cIdx) => (
                        <button
                          key={cert.id}
                          type="button"
                          onClick={() =>
                            setCertModal({
                              experienceTitle: `${exp.role} (${exp.company})`,
                              certificates: exp.certificates!,
                              activeIndex: cIdx,
                            })
                          }
                          className="surface-chip inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors hover:border-[var(--color-primary)]"
                          style={{ color: "var(--color-text-main)" }}
                        >
                          <Award className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                          <span className="truncate max-w-[220px]">{cert.title}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {exp.relatedProjectId && (
                    <button
                      type="button"
                      onClick={() => handleNavigateToProject(exp.relatedProjectId!)}
                      className="inline-flex items-center gap-1.5 min-h-[38px] text-xs sm:text-sm font-semibold hover:underline"
                      style={{ color: "var(--color-primary-text)" }}
                    >
                      <span>{t.resume.viewProjectArch}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE CERTIFICATE MODAL */}
      {isMounted &&
        certModal &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setCertModal(null)}
            role="dialog"
            aria-modal="true"
            aria-label={certModal.certificates[certModal.activeIndex].title}
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
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                    style={{
                      backgroundColor: "var(--color-primary-tint)",
                      color: "var(--color-primary-text)",
                    }}
                  >
                    {certModal.certificates[certModal.activeIndex].issuer}
                  </span>
                  <h4 className="font-heading text-base sm:text-lg font-bold leading-snug" style={{ color: "var(--color-text-main)" }}>
                    {certModal.certificates[certModal.activeIndex].title}
                  </h4>
                  <p className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
                    {certModal.experienceTitle} • {certModal.certificates[certModal.activeIndex].issueDate || "Resmi"}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {certModal.certificates.length > 1 && (
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
                    onClick={() => setCertModal(null)}
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
                {certModal.certificates[certModal.activeIndex].imageUrl && (
                  <ZoomableImage
                    key={certModal.certificates[certModal.activeIndex].imageUrl}
                    src={certModal.certificates[certModal.activeIndex].imageUrl}
                    alt={certModal.certificates[certModal.activeIndex].title}
                    containerClassName="h-64 sm:h-80 md:h-[400px]"
                    isEN={isEN}
                  />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {certModal.certificates[certModal.activeIndex].credentialId && (
                    <div
                      className="surface-inset p-3 rounded-xl"
                      style={{ color: "var(--color-text-main)" }}
                    >
                      <span className="block text-[10px] uppercase font-sans font-semibold mb-0.5" style={{ color: "var(--color-text-muted)" }}>
                        {isEN ? "Credential ID" : "Nomor Kredensial"}
                      </span>
                      {certModal.certificates[certModal.activeIndex].credentialId}
                    </div>
                  )}
                  {certModal.certificates[certModal.activeIndex].signatory && (
                    <div
                      className="surface-inset p-3 rounded-xl"
                      style={{ color: "var(--color-text-main)" }}
                    >
                      <span className="block text-[10px] uppercase font-sans font-semibold mb-0.5" style={{ color: "var(--color-text-muted)" }}>
                        {isEN ? "Official Signatory" : "Penandatangan Resmi"}
                      </span>
                      {certModal.certificates[certModal.activeIndex].signatory}
                    </div>
                  )}
                </div>

                {certModal.certificates[certModal.activeIndex].description && (
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {certModal.certificates[certModal.activeIndex].description}
                  </p>
                )}

                {certModal.certificates[certModal.activeIndex].verificationUrl && (
                  <a
                    href={certModal.certificates[certModal.activeIndex].verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <span>{isEN ? "Verify Badge on Credly" : "Verifikasi di Credly"}</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
