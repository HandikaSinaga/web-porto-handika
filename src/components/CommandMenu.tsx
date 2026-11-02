"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLanguage } from "@/context/LanguageContext";
import { getContactData } from "@/data/portfolioData";
import { uiTranslations } from "@/data/translations";
import {
  Search,
  X,
  FileDown,
  Layers,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Cpu,
  Award,
  Mail,
  MessageCircle,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  action: () => void;
  badge?: string;
}

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const router = useRouter();
  const { lang } = useLanguage();
  const contactData = getContactData(lang);
  const t = uiTranslations[lang];

  const [query, setQuery] = useState("");
  const isMounted = useIsMounted();

  // Lock body scroll when command menu is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          window.dispatchEvent(new CustomEvent("toggle-command-menu"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (path: string) => {
    onClose();
    router.push(path);
  };

  const navCategory = lang === "EN" ? "Navigation" : "Navigasi";
  const projCategory = lang === "EN" ? "Project" : "Proyek";
  const resumeCategory = "Resume";
  const docCategory = lang === "EN" ? "Document" : "Dokumen";
  const contactCategory = lang === "EN" ? "Contact" : "Kontak";

  const items: CommandItem[] = [
    {
      id: "overview",
      title: t.command.aboutTitle,
      category: navCategory,
      icon: Layers,
      action: () => navigateTo("/"),
      badge: "Route",
    },
    {
      id: "portfolio",
      title: t.command.portfolioTitle,
      category: navCategory,
      icon: FolderGit2,
      action: () => navigateTo("/portfolio"),
      badge: "Route",
    },
    {
      id: "seals",
      title: "SEALS POLINEMA (Adaptive Learning AWS VPC)",
      category: projCategory,
      icon: FolderGit2,
      action: () => navigateTo("/portfolio#project-seals-polinema"),
      badge: "Client",
    },
    {
      id: "gazebo",
      title: "Gazebo Samasta (AWS Multi-AZ 3-Tier)",
      category: projCategory,
      icon: FolderGit2,
      action: () => navigateTo("/portfolio#project-gazebo-samasta"),
      badge: "MSIB",
    },
    {
      id: "resume",
      title: lang === "EN" ? "Work & Internship Experience (Resume)" : "Pengalaman Kerja & Magang (Resume)",
      category: navCategory,
      icon: Briefcase,
      action: () => navigateTo("/resume"),
      badge: "Route",
    },
    {
      id: "education",
      title: lang === "EN" ? "Education (B.S. in Computer Science Unpam)" : "Pendidikan (S1 Teknik Informatika Unpam)",
      category: resumeCategory,
      icon: GraduationCap,
      action: () => navigateTo("/resume#education"),
      badge: lang === "EN" ? "Education" : "Pendidikan",
    },
    {
      id: "trainings",
      title: lang === "EN" ? "Academy Trainings & Credentials (AWS)" : "Pelatihan Akademi & Kredensial (AWS)",
      category: resumeCategory,
      icon: Award,
      action: () => navigateTo("/resume#education-trainings"),
      badge: lang === "EN" ? "Training" : "Pelatihan",
    },
    {
      id: "skills",
      title: t.command.skillsTitle,
      category: navCategory,
      icon: Cpu,
      action: () => navigateTo("/skills"),
      badge: "Route",
    },
    {
      id: "certifications",
      title: t.command.certsTitle,
      category: navCategory,
      icon: Award,
      action: () => navigateTo("/certifications"),
      badge: "Route",
    },
    {
      id: "contact",
      title: t.command.contactTitle,
      category: navCategory,
      icon: Mail,
      action: () => navigateTo("/contact"),
      badge: "Route",
    },
    {
      id: "cv",
      title: t.command.downloadCvTitle,
      category: docCategory,
      icon: FileDown,
      action: () => {
        window.open(contactData.cvUrl || "https://s.id/cv_handika", "_blank");
        onClose();
      },
      badge: "PDF",
    },
    {
      id: "whatsapp",
      title: lang === "EN" ? "Chat via Official WhatsApp" : "Chat via WhatsApp Resmi",
      category: contactCategory,
      icon: MessageCircle,
      action: () => {
        window.open(
          `https://wa.me/${contactData.phone.replace(/[^0-9]/g, "")}`,
          "_blank"
        );
        onClose();
      },
      badge: "Quick",
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090e1a]/80">
          <Search className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder={lang === "EN" ? "Type a page, project, skill, or certification..." : "Ketik tujuan navigasi, proyek, skill, sertifikasi..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">
              {lang === "EN" ? `No results found for "${query}"` : `Tidak ada hasil untuk "${query}"`}
            </div>
          ) : (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-colors text-slate-600 dark:text-slate-300 flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex-shrink-0 ml-2">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-[#090e1a] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>{lang === "EN" ? "Press ESC to close" : "Tekan ESC untuk menutup"}</span>
          <span>{lang === "EN" ? "Portfolio Multi-Page Navigation" : "Antarmuka Portofolio Multi-Halaman"}</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
