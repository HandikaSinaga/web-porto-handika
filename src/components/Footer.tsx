"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getContactData } from "@/data/portfolioData";
import { uiTranslations } from "@/data/translations";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/icons/SocialIcons";
import { ArrowUp, Mail } from "lucide-react";

const CURRENT_YEAR = 2026;

export default function Footer() {
  const { lang } = useLanguage();
  const contactData = getContactData(lang);
  const t = uiTranslations[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 lg:pb-12 pt-4 transition-colors">
      <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0d1322] border border-slate-200 dark:border-slate-800/80 p-5 sm:p-7 shadow-lg shadow-slate-900/5 dark:shadow-black/50 space-y-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          {/* Telemetry info */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-center sm:text-left">
            <span className="font-bold text-slate-900 dark:text-white">
              handika.cloud
            </span>
            <span>•</span>
            <span>Portfolio of {contactData.fullName}</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              99.98% SLO
            </span>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={contactData.github}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${contactData.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <WhatsappIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${contactData.email}`}
              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Email"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2 text-center sm:text-left">
          <div>
            &copy; {CURRENT_YEAR} {contactData.fullName}. {t.footer.rights}
          </div>
          <div>
            {t.footer.location}
          </div>
        </div>
      </div>
    </footer>
  );
}
