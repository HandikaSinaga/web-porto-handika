"use client";

import React, { useState, useEffect } from "react";
import {
  contactData,
  educationData,
  experiencesData,
  trainingsData,
} from "@/data/portfolioData";
import { ExperienceCertificate } from "@/types/portfolio";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Building2,
  FolderGit2,
  FileCheck,
  ShieldCheck,
  Eye,
  X,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const [selectedCert, setSelectedCert] = useState<ExperienceCertificate | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleOpenExperience = (e: any) => {
      const expId = e.detail?.expId;
      if (!expId) return;

      setActiveTab("experience");

      setTimeout(() => {
        const el = document.getElementById(`experience-${expId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-2", "ring-blue-500/60");
          setTimeout(() => el.classList.remove("ring-2", "ring-blue-500/60"), 2500);
        }
      }, 150);
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
      const projSec = document.getElementById("projects");
      if (projSec) projSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-mono font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
            // 01. PENGALAMAN & LATAR BELAKANG
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Rekam Jejak <span className="text-blue-600 dark:text-blue-400">Profesional</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {contactData.summary}
          </p>
        </div>

        {/* Quick Metrics / Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              3+
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              Magang & Proyek Industri
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {educationData.gpa.split(" ")[0] || "3.59"}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              IPK S1 Teknik Informatika
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              5+
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              Sertifikasi & Pelatihan AWS
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Multi-AZ
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              AWS High Availability
            </div>
          </div>
        </div>

        {/* Tab Controls: Experience vs Education */}
        <div className="flex justify-start mb-8">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "experience"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span>Pengalaman Kerja ({experiencesData.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "education"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span>Pendidikan & Pelatihan</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Work Experience Timeline */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            {experiencesData.map((exp) => (
              <div
                key={exp.id}
                id={`experience-${exp.id}`}
                className="relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all"
              >
                {/* Header row: Role, Company, Period */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                        {exp.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-blue-500" />
                        {exp.company}
                      </span>

                      {/* Official placement badge */}
                      {exp.placementPartner && (
                        <>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                            <Award className="w-3 h-3" />
                            {exp.placementPartner}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Placement note if provided */}
                {exp.placementNote && (
                  <div className="mb-4 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                    <strong className="text-slate-700 dark:text-slate-300 font-semibold">
                      Konteks Penempatan:
                    </strong>{" "}
                    {exp.placementNote}
                  </div>
                )}

                {exp.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 italic">
                    &quot;{exp.description}&quot;
                  </p>
                )}

                {/* Bullet Points of Duties */}
                <div className="space-y-2 mb-5">
                  {exp.highlights.map((duty, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {duty}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Linked Certificates Trigger Row */}
                {exp.certificates && exp.certificates.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mr-1">
                      Sertifikat Terkait:
                    </span>
                    {exp.certificates.map((cert) => (
                      <button
                        key={cert.id}
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-blue-950/50 text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 border border-slate-200/80 dark:border-slate-800 transition-colors"
                        title="Klik untuk melihat sertifikat resmi"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="truncate max-w-[200px] sm:max-w-none">{cert.title}</span>
                        <Eye className="w-3 h-3 text-slate-400 ml-0.5" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Linked Project Banner */}
                {exp.relatedProjectId && (
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>Implementasi Proyek Terkait</span>
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {exp.relatedProjectTitle}
                      </div>
                    </div>

                    <button
                      onClick={() => handleNavigateToProject(exp.relatedProjectId!)}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shrink-0"
                    >
                      <span>Detail Proyek</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Education & Trainings */}
        {activeTab === "education" && (
          <div className="space-y-6">
            {/* Formal University Degree */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {educationData.degree} {educationData.field}
                      </h3>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {educationData.institution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{educationData.period}</span>
                  </div>
                  <div className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    IPK: {educationData.gpa}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                {educationData.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialized AWS Trainings Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Pelatihan Khusus & Studi Independen Cloud
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainingsData.map((training, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                        <span className="uppercase text-blue-600 dark:text-blue-400 font-semibold">
                          {training.issuer}
                        </span>
                        <span>{training.issueDate}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {training.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                        {Array.isArray(training.description)
                          ? training.description.join(" ")
                          : training.description}
                      </p>
                    </div>

                    {training.credentialId && (
                      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500">
                        <span>ID: {training.credentialId}</span>
                        {training.verificationUrl && (
                          <a
                            href={training.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            <span>Verifikasi</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* High-Resolution Certificate Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold uppercase">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {selectedCert.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={selectedCert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Tab Baru</span>
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
              {/* Full Image */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 flex items-center justify-center p-2 sm:p-4">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="w-auto h-auto max-h-[58vh] object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Certificate Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-slate-500 font-medium">Program</span>
                  <div className="font-semibold text-slate-900 dark:text-white">{selectedCert.program}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-slate-500 font-medium">Kredensial</span>
                  <div className="font-semibold font-mono text-slate-900 dark:text-white">
                    {selectedCert.credentialId || "-"} {selectedCert.nim ? `| ${selectedCert.nim}` : ""}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-slate-500 font-medium">Tanggal Terbit</span>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {selectedCert.issueDate || selectedCert.period || "-"}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-slate-500 font-medium">Penandatangan</span>
                  <div className="font-semibold text-slate-900 dark:text-white truncate" title={selectedCert.signatory}>
                    {selectedCert.signatory || "-"}
                  </div>
                </div>
              </div>

              {/* Description & Competencies */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Keterangan Dokumen
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedCert.description}
                </p>
                {selectedCert.skills && selectedCert.skills.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                      Kompetensi Teruji:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCert.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <a
                  href={selectedCert.imageUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Unduh Dokumen</span>
                </a>
                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verifikasi Digital Badge</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
