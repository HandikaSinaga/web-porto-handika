"use client";

import React from "react";
import { contactData } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { Terminal, ArrowUp, Mail, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#070b12] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <a
              href="#home"
              className="flex items-center gap-2 font-mono text-base font-bold text-slate-900 dark:text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <span>
                <span className="text-blue-600 dark:text-blue-400">handika</span>.cloud
              </span>
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Portfolio landing page of {contactData.fullName} — Cloud Engineer & DevOps Engineer.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={contactData.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${contactData.email}`}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-sm ml-2"
              title="Kembali ke Atas"
              aria-label="Kembali ke Atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            &copy; 2026 {contactData.fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with Next.js, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
