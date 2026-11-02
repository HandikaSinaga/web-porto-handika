"use client";

import React, { useState } from "react";
import { certificationsData } from "@/data/portfolioData";
import { Certification } from "@/types/portfolio";
import {
  Award,
  ShieldCheck,
  Calendar,
  ExternalLink,
  X,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

export default function Certifications() {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-28 relative overflow-hidden bg-slate-50/50 dark:bg-[#080d17]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-mono font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
            // 04. SERTIFIKASI & KREDENSIAL
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Sertifikasi <span className="text-blue-600 dark:text-blue-400">Industri</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Sertifikasi resmi nasional dan internasional yang memvalidasi kompetensi dalam
            rekayasa jaringan, arsitektur komputasi awan, dan otomasi infrastruktur.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:border-blue-400/80 dark:hover:border-blue-600/80 transition-all duration-300"
            >
              <div>
                {/* Visual Certificate Header */}
                <div
                  onClick={() => setActiveCert(cert)}
                  className="relative h-44 bg-slate-900 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-200 dark:border-slate-800 cursor-pointer group/header"
                >
                  {cert.imageUrl ? (
                    <>
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-30 group-hover/header:opacity-45 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {cert.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-300 border border-blue-400/30 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-mono uppercase text-blue-300 font-semibold break-words leading-tight">
                        {cert.issuer}
                      </div>
                      <div className="text-xs text-slate-400">
                        Dokumen Resmi
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>
                      {cert.issueDate?.startsWith("Masa")
                        ? cert.issueDate
                        : `Terbit: ${cert.issueDate || "Resmi"}`}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Kompetensi Teruji:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveCert(cert)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-blue-950/60 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/80 dark:border-slate-800 transition-colors"
                >
                  <FileCheck className="w-4 h-4 text-emerald-500" />
                  <span>Lihat Dokumen Sertifikat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal View for Certificate */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                    {activeCert.issuer}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {activeCert.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveCert(null)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Certificate Preview if image exists */}
            {activeCert.imageUrl && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 p-2 sm:p-3 group">
                <img
                  src={activeCert.imageUrl}
                  alt={activeCert.title}
                  className="w-full h-auto max-h-[55vh] object-contain mx-auto rounded-lg shadow-md"
                />
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <a
                    href={activeCert.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/85 hover:bg-slate-900 text-white border border-slate-700 backdrop-blur-md transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Resolusi Penuh</span>
                  </a>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                <div className="text-[11px] font-semibold text-slate-500">Penerbit Kredensial</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
                  {activeCert.issuer}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                <div className="text-[11px] font-semibold text-slate-500">Kategori</div>
                <div className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                  {activeCert.category}
                </div>
              </div>
              {activeCert.issueDate && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500">Masa Berlaku</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">
                    {activeCert.issueDate}
                  </div>
                </div>
              )}
            </div>

            {activeCert.credentialId && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <span className="text-[11px] font-semibold text-slate-500 block">Nomor Kredensial Resmi</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-white break-all">
                    {activeCert.credentialId}
                  </span>
                </div>
                {activeCert.verificationUrl && (
                  <a
                    href={activeCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Verifikasi Kredensial</span>
                  </a>
                )}
              </div>
            )}

            {activeCert.description && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Keterangan Kredensial
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeCert.description}
                </p>
              </div>
            )}

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Daftar Kompetensi yang Divalidasi:
              </h4>
              <div className="space-y-2">
                {activeCert.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              {activeCert.imageUrl ? (
                <a
                  href={activeCert.imageUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Unduh Dokumen</span>
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={() => setActiveCert(null)}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
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
