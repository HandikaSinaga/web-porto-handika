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
  CheckCircle2,
  ChevronRight,
  Building2,
  BookOpen,
  Sparkles,
  ArrowRight,
  FolderGit2,
  FileCheck,
  ShieldCheck,
  Eye,
  X,
  Maximize2,
  ExternalLink,
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
          el.classList.add("ring-4", "ring-blue-500/60");
          setTimeout(() => el.classList.remove("ring-4", "ring-blue-500/60"), 2500);
        }
      }, 150);
    };

    window.addEventListener("open-experience", handleOpenExperience as EventListener);
    return () => {
      window.removeEventListener("open-experience", handleOpenExperience as EventListener);
    };
  }, []);

  const handleNavigateToProject = (projectId: string) => {
    // 1. Dispatch custom event so Projects component opens the modal
    window.dispatchEvent(
      new CustomEvent("open-project-modal", {
        detail: { projectId, tab: "overview" },
      })
    );

    // 2. Smoothly scroll to the project card or section
    const targetEl = document.getElementById(`project-${projectId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      targetEl.classList.add("ring-4", "ring-blue-500/60");
      setTimeout(() => targetEl.classList.remove("ring-4", "ring-blue-500/60"), 2500);
    } else {
      const projSec = document.getElementById("projects");
      if (projSec) projSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profil & Rekam Jejak</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tentang <span className="text-blue-600 dark:text-blue-400">Saya</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {contactData.summary}
          </p>
        </div>

        {/* Quick Metrics / Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              3+
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              Magang & Project Industri
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              {educationData.gpa.split(" ")[0] || "3.59"}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              IPK S1 Teknik Informatika
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              5+
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              Sertifikasi & Pelatihan AWS
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              Multi-AZ
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              AWS HA & Auto-Scaling
            </div>
          </div>
        </div>

        {/* Tab Controls: Experience vs Education */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === "experience"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Work Experience (Pengalaman Kerja)</span>
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === "education"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education & Pelatihan</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Work Experience Timeline */}
        {activeTab === "experience" && (
          <div className="space-y-8 animate-fadeIn">
            {experiencesData.map((exp, index) => (
              <div
                key={exp.id}
                id={`experience-${exp.id}`}
                className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/90 shadow-sm hover:border-blue-300 dark:hover:border-blue-700/60 transition-all group"
              >
                {/* Accent top gradient on hover */}
                <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-base font-medium text-blue-600 dark:text-blue-400">
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 font-mono">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Official Placement Banner if present */}
                {exp.placementNote && (
                  <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-sky-50/80 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-sky-950/40 border border-blue-200/90 dark:border-blue-800/80 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {exp.placementProgram || "Program Resmi MSIB Kemendikbudristek"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-700">
                          {exp.placementPartner || "SEAL × Kemendikbudristek"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {exp.placementNote}
                      </p>
                    </div>
                  </div>
                )}

                {exp.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 italic">
                    &quot;{exp.description}&quot;
                  </p>
                )}

                {/* Bullet Points of Duties */}
                <div className="space-y-2.5 mb-6">
                  {exp.highlights.map((duty, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                        {duty}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Linked Certificates Showcase */}
                {exp.certificates && exp.certificates.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                        <FileCheck className="w-4 h-4 text-emerald-500" />
                        <span>Sertifikat Resmi Kelulusan & Kepesertaan Program</span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {exp.certificates.length} Terverifikasi
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Klik sertifikat untuk memperbesar dokumen
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exp.certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="group/cert relative flex flex-col justify-between p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-400 dark:hover:border-blue-500/60 hover:shadow-md transition-all"
                        >
                          <div className="space-y-3">
                            {/* Thumbnail Image with hover overlay */}
                            <div
                              onClick={() => setSelectedCert(cert)}
                              className="relative h-44 rounded-xl overflow-hidden bg-slate-900/20 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer group-hover/cert:border-blue-400 dark:group-hover/cert:border-blue-600 transition-colors"
                            >
                              <img
                                src={cert.imageUrl}
                                alt={cert.title}
                                className="w-full h-full object-cover object-top group-hover/cert:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                                <Maximize2 className="w-4 h-4" />
                                <span>Perbesar Dokumen</span>
                              </div>
                              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Verified</span>
                              </div>
                            </div>

                            {/* Certificate Details */}
                            <div className="space-y-1.5">
                              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                                {cert.issuer}
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                                {cert.title}
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                                {cert.description}
                              </p>
                            </div>

                            {/* Metadata Tags */}
                            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
                              {cert.credentialId && (
                                <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                  {cert.credentialId}
                                </span>
                              )}
                              {cert.nim && (
                                <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                  {cert.nim}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action button */}
                          <button
                            onClick={() => setSelectedCert(cert)}
                            className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Lihat Sertifikat Lengkap</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Linked Project Banner / Card */}
                {exp.relatedProjectId && (
                  <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/70 to-indigo-50/80 dark:from-blue-950/40 dark:via-sky-950/30 dark:to-indigo-950/40 border border-blue-200/90 dark:border-blue-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group/project-link transition-all hover:border-blue-400 dark:hover:border-blue-600">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100/90 dark:bg-blue-900/60 border border-blue-300/60 dark:border-blue-800">
                        <FolderGit2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        <span>Implementasi Proyek Terkait</span>
                      </div>
                      <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover/project-link:text-blue-600 dark:group-hover/project-link:text-blue-400 transition-colors">
                        {exp.relatedProjectTitle}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {exp.id === "profile-image-studio"
                          ? "Arsitektur cloud AWS produksi (EC2 & RDS t3.medium), Nginx reverse proxy, PM2, Grafana K6 stress testing, dan 14 foto dokumentasi."
                          : "Arsitektur 3-tier High Availability AWS (Multi-AZ VPC, ALB, Auto Scaling LAMP Stack, RDS MySQL Multi-AZ, dan CloudWatch alarms)."}
                      </p>
                    </div>

                    <button
                      onClick={() => handleNavigateToProject(exp.relatedProjectId!)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md shadow-blue-500/25 transition-all duration-200 shrink-0 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Buka Detail Proyek</span>
                      <ArrowRight className="w-4 h-4 group-hover/project-link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Education & Trainings */}
        {activeTab === "education" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Formal University Degree */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/90 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {educationData.degree} {educationData.field}
                      </h3>
                      <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                        {educationData.institution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>{educationData.period}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    IPK: {educationData.gpa}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                {educationData.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialized AWS Trainings Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Pelatihan Khusus & Studi Independen Cloud
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trainingsData.map((training, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/90 shadow-sm flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all group"
                  >
                    <div>
                      {/* Image preview if exists */}
                      {training.imageUrl && (
                        <div
                          onClick={() => {
                            setSelectedCert({
                              id: `training-${index}`,
                              title: training.title,
                              issuer: training.issuer,
                              organization: training.issuer,
                              program: training.program,
                              credentialId: training.credentialId,
                              issueDate: training.issueDate,
                              imageUrl: training.imageUrl!,
                              description: training.description.join(" "),
                              skills: training.skillsGained,
                              verificationUrl: training.verificationUrl,
                            });
                          }}
                          className="relative h-44 mb-4 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer group/thumb"
                        >
                          <img
                            src={training.imageUrl}
                            alt={training.title}
                            className="w-full h-full object-cover object-top opacity-85 group-hover/thumb:opacity-100 group-hover/thumb:scale-105 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                            <Maximize2 className="w-4 h-4" />
                            <span>Lihat Sertifikat Lengkap</span>
                          </div>
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Verified Badge</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                          {training.issuer}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                          {training.hours && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {training.hours}
                            </span>
                          )}
                          <span>SEAL / MSIB</span>
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {training.title}
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-4">
                        {training.program} • {training.issueDate}
                      </p>

                      <div className="space-y-2 mb-4">
                        {training.description.map((desc, i) => (
                          <p
                            key={i}
                            className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                          >
                            • {desc}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 py-3 border-t border-slate-100 dark:border-slate-800">
                        {training.skillsGained.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {training.imageUrl && (
                        <div className="pt-3 flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedCert({
                                id: `training-${index}`,
                                title: training.title,
                                issuer: training.issuer,
                                organization: training.issuer,
                                program: training.program,
                                credentialId: training.credentialId,
                                issueDate: training.issueDate,
                                imageUrl: training.imageUrl!,
                                description: training.description.join(" "),
                                skills: training.skillsGained,
                                verificationUrl: training.verificationUrl,
                              });
                            }}
                            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Lihat Sertifikat</span>
                          </button>
                          {training.verificationUrl && (
                            <a
                              href={training.verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white border border-emerald-200 dark:border-emerald-800/60 transition-all flex items-center gap-1"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Credly</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Lightbox for Experience Certificate */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                      {selectedCert.issuer}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Dokumen Resmi Terverifikasi</span>
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
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
                  <div className="font-semibold text-slate-900 dark:text-white">{selectedCert.issueDate || selectedCert.period || "-"}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-slate-500 font-medium">Penandatangan</span>
                  <div className="font-semibold text-slate-900 dark:text-white truncate" title={selectedCert.signatory}>
                    {selectedCert.signatory || "-"}
                  </div>
                </div>
              </div>

              {/* Description & Competencies */}
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/60 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  Keterangan Resmi Dokumen
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
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
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
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
