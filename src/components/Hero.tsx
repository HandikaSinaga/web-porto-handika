"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getContactData } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { uiTranslations } from "@/data/translations";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/icons/SocialIcons";
import {
  FileDown,
  FileText,
  Mail,
  MapPin,
  ChevronDown,
} from "lucide-react";

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { lang } = useLanguage();
  const contactData = getContactData(lang);
  const t = uiTranslations[lang];

  return (
    <section id="home" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2">
      {/* Master Profile Header Bento Card */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 p-4 sm:p-7 shadow-xl shadow-slate-900/5 dark:shadow-black/50 transition-colors">
        {/* Ambient Gradient Glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/10 dark:bg-cyan-600/10 blur-3xl" />

        {/* Mobile Header Row (Compact view matching reference screenshot) */}
        <div className="flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 p-0.5 shadow-md shadow-blue-500/20">
                <div className="relative h-full w-full rounded-[14px] bg-slate-900 flex items-center justify-center overflow-hidden">
                  <Image
                    src={contactData.avatarUrl || "/images/profile.png"}
                    alt={contactData.name}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover object-top"
                    priority
                  />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-[#0d1322]" />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight break-words">
                {contactData.name}
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5">
                DevOps &amp; Cloud Engineer
              </p>
            </div>
          </div>

          {/* Toggle Expand / Collapse Details Button on Mobile */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 transition-all flex-shrink-0"
            aria-label="Toggle profile details"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Expandable Mobile Tray & Desktop Full Bento Row */}
        <div
          className={`${
            isExpanded ? "flex" : "hidden lg:flex"
          } flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800/60 transition-all`}
        >
          {/* Desktop Avatar & Identification (Hidden on mobile as it is already in the compact top bar) */}
          <div className="hidden lg:flex items-center gap-4 sm:gap-5">
            <div className="relative flex-shrink-0">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/25">
                <div className="relative h-full w-full rounded-[14px] bg-slate-900 flex items-center justify-center overflow-hidden">
                  <Image
                    src={contactData.avatarUrl || "/images/profile.png"}
                    alt={contactData.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover object-top"
                    priority
                  />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-[#0d1322]" />
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                {contactData.name}
              </h1>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 font-mono">
                DevOps &amp; Cloud Engineer
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                <span>{t.hero.location}</span>
              </p>
            </div>
          </div>

          {/* Availability Status Card */}
          <div className="flex flex-col justify-center rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 px-4 py-3 sm:px-6">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {t.common.availability}
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {t.common.availableForProjects}
              </span>
            </div>
            <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {t.common.repliesWithin24h}
            </span>
          </div>

          {/* Action Buttons & Social Links */}
          <div className="flex flex-col items-start lg:items-end justify-center gap-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <a
                href={contactData.cvUrl || "https://s.id/cv_handika"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileDown className="h-4 w-4" />
                <span>{t.hero.downloadCv}</span>
              </a>
              <a
                href={contactData.cvUrl || "https://s.id/cv_handika"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                <span>ATS Resume</span>
              </a>
            </div>

            <div className="flex items-center gap-4 flex-wrap text-xs text-slate-600 dark:text-slate-400">
              <a
                href={`mailto:${contactData.email}`}
                className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono"
              >
                <Mail className="h-3.5 w-3.5 text-blue-500" />
                <span>{contactData.email}</span>
              </a>

              <div className="flex items-center gap-2">
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/${contactData.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <WhatsappIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
