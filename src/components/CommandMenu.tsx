"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLanguage } from "@/context/LanguageContext";
import { getContactData, CV_OPTIONS } from "@/data/portfolioData";
import { uiTranslations } from "@/data/translations";
import {
  Search,
  X,
  FileDown,
  Layers,
  Briefcase,
  GraduationCap,
  FolderGit2,
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
  const pathname = usePathname();
  const { lang } = useLanguage();
  const contactData = getContactData(lang);
  const t = uiTranslations[lang];

  const [query, setQuery] = useState("");
  const isMounted = useIsMounted();

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

  const navigateToSection = (sectionId: string, fallbackRoute: string) => {
    onClose();
    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    router.push(fallbackRoute);
  };

  const navCategory = lang === "EN" ? "Navigation" : "Navigasi";
  const projCategory = lang === "EN" ? "Project" : "Proyek";
  const resumeCategory = lang === "EN" ? "Profile" : "Profil";
  const docCategory = lang === "EN" ? "Document" : "Dokumen";
  const contactCategory = lang === "EN" ? "Contact" : "Kontak";

  const items: CommandItem[] = [
    {
      id: "overview",
      title: t.command.aboutTitle,
      category: navCategory,
      icon: Layers,
      action: () => navigateToSection("about", "/#about"),
      badge: "#about",
    },
    {
      id: "education",
      title: lang === "EN" ? "Education (Informatics Engineering Unpam)" : "Pendidikan (S1 Teknik Informatika Unpam)",
      category: resumeCategory,
      icon: GraduationCap,
      action: () => navigateToSection("pendidikan", "/#pendidikan"),
      badge: "#pendidikan",
    },
    {
      id: "experience",
      title: lang === "EN" ? "Work & Internship Experience" : "Pengalaman Kerja & Magang",
      category: resumeCategory,
      icon: Briefcase,
      action: () => navigateToSection("pengalaman", "/#pengalaman"),
      badge: "#pengalaman",
    },
    {
      id: "portfolio",
      title: t.command.portfolioTitle,
      category: navCategory,
      icon: FolderGit2,
      action: () => navigateToSection("portfolio", "/#portfolio"),
      badge: "#portfolio",
    },
    {
      id: "seals",
      title: "SEALS POLINEMA (Adaptive Learning AWS VPC)",
      category: projCategory,
      icon: FolderGit2,
      action: () => {
        navigateToSection("portfolio", "/#portfolio");
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("open-project-modal", {
              detail: { projectId: "adaptive-learning-polinema", tab: "overview" },
            })
          );
        }, 250);
      },
      badge: "Client",
    },
    {
      id: "gazebo",
      title: "Gazebo Samasta (AWS Multi-AZ 3-Tier)",
      category: projCategory,
      icon: FolderGit2,
      action: () => {
        navigateToSection("portfolio", "/#portfolio");
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("open-project-modal", {
              detail: { projectId: "gazebo-samasta-reservation", tab: "overview" },
            })
          );
        }, 250);
      },
      badge: "MSIB",
    },
    {
      id: "certifications",
      title: t.command.certsTitle,
      category: navCategory,
      icon: Award,
      action: () => navigateToSection("sertifikasi", "/#sertifikasi"),
      badge: "#sertifikasi",
    },
    {
      id: "contact",
      title: t.command.contactTitle,
      category: navCategory,
      icon: Mail,
      action: () => navigateToSection("contact", "/#contact"),
      badge: "#contact",
    },
    ...CV_OPTIONS.map((cv) => ({
      id: `cv-${cv.id}`,
      title: `${cv.title} (${cv.subtitle})`,
      category: docCategory,
      icon: FileDown,
      action: () => {
        window.open(cv.href, "_blank", "noopener,noreferrer");
        onClose();
      },
      badge: cv.id.toUpperCase(),
    })),
    {
      id: "whatsapp",
      title: lang === "EN" ? "Chat via Official WhatsApp" : "Chat via WhatsApp Resmi",
      category: contactCategory,
      icon: MessageCircle,
      action: () => {
        window.open(contactData.whatsapp, "_blank", "noopener,noreferrer");
        onClose();
      },
      badge: "WA",
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
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={lang === "EN" ? "Quick navigation search" : "Pencarian navigasi cepat"}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden animate-modal-enter"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderColor: "var(--color-border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center px-4 py-3.5 border-b"
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            borderColor: "var(--color-border)",
          }}
        >
          <Search className="w-5 h-5 mr-3 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
          <label htmlFor="command-search-input" className="sr-only">
            {lang === "EN" ? "Search navigation" : "Cari navigasi"}
          </label>
          <input
            id="command-search-input"
            type="text"
            placeholder={lang === "EN" ? "Search section, project, or action..." : "Cari bagian halaman, proyek, atau aksi..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm focus:outline-none"
            style={{ color: "var(--color-text-main)" }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={lang === "EN" ? "Clear search" : "Hapus pencarian"}
              className="p-2 rounded-lg mr-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === "EN" ? "Close search" : "Tutup pencarian"}
            className="px-2 py-1 text-[11px] font-mono rounded border"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-muted)",
            }}
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
              {lang === "EN" ? `No results found for "${query}"` : `Tidak ada hasil untuk "${query}"`}
            </div>
          ) : (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors group hover:bg-[var(--color-primary-tint)]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="p-2 rounded-lg shrink-0"
                      style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        color: "var(--color-primary-text)",
                      }}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--color-text-main)" }}>
                        {item.title}
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {item.category}
                      </p>
                    </div>
                  </div>
                  {item.badge && (
                    <span
                      className="px-2 py-0.5 text-[11px] font-mono rounded border shrink-0 ml-2"
                      style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        borderColor: "var(--color-border)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
