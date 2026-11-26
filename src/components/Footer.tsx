"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getContactData } from "@/data/portfolioData";
import {
  NAV_SECTIONS,
  SectionKey,
  getSectionDomId,
  getSectionHash,
  getSectionHref,
} from "@/data/navigation";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import { ArrowUp, Mail, MapPin } from "lucide-react";

const CURRENT_YEAR = 2026;

export default function Footer() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const contactData = getContactData(lang);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, key: SectionKey) => {
    if (pathname === "/") {
      const el = document.getElementById(getSectionDomId(key));
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${getSectionHash(key, lang)}`);
      }
    }
  };

  const focusAreas = [
    { labelID: "Infrastruktur Cloud AWS (VPC, EC2, RDS)", labelEN: "AWS Cloud Infrastructure (VPC, EC2, RDS)" },
    { labelID: "Containerization & CI/CD (Docker, GitLab CI)", labelEN: "Containerization & CI/CD (Docker, GitLab CI)" },
    { labelID: "Observabilitas & Load Test (Prometheus, Grafana, k6)", labelEN: "Observability & Load Testing (Prometheus, Grafana, k6)" },
    { labelID: "Server Linux, Nginx Reverse Proxy & PM2", labelEN: "Linux Servers, Nginx Reverse Proxy & PM2" },
  ];

  return (
    <footer
      className="section-accent-footer mt-16 border-t transition-colors"
      style={{
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 py-12 sm:py-14 space-y-10">
        {/* 3-Column Editorial Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand Summary */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href={getSectionHref("home", lang)}
              onClick={(e) => handleAnchor(e, "home")}
              className="inline-block font-heading text-xl font-extrabold tracking-tight"
            >
              <span style={{ color: "var(--color-primary-text)" }}>handika</span>
              <span style={{ color: "var(--color-text-main)" }}>sinaga</span>
            </Link>
            <div>
              <h3 className="text-base font-bold" style={{ color: "var(--color-text-main)" }}>
                {contactData.fullName}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed max-w-sm" style={{ color: "var(--color-text-muted)" }}>
                {lang === "EN"
                  ? "DevOps & Cloud Engineer focusing on AWS cloud infrastructure, CI/CD automation, and real-time observability."
                  : "Cloud & DevOps Engineer yang berfokus pada infrastruktur cloud AWS, otomasi CI/CD, dan pemantauan sistem real-time."}
              </p>
            </div>
            <div className="space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <a
                href={`mailto:${contactData.email}`}
                className="inline-flex items-center gap-2 hover:underline"
                style={{ color: "var(--color-text-main)" }}
              >
                <Mail className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                <span>{contactData.email}</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                <span>{lang === "EN" ? "South Tangerang, Indonesia" : "Tangerang Selatan, Indonesia"}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core Focus */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="text-sm font-bold tracking-tight" style={{ color: "var(--color-text-main)" }}>
              {lang === "EN" ? "Core Engineering Focus" : "Fokus Keahlian"}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {focusAreas.map((area) => (
                <li key={area.labelEN}>
                  <Link
                    href={getSectionHref("portfolio", lang)}
                    onClick={(e) => handleAnchor(e, "portfolio")}
                    className="inline-block py-0.5 transition-colors hover:text-[var(--color-primary-text)]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {lang === "EN" ? area.labelEN : area.labelID}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Page Navigation */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-sm font-bold tracking-tight" style={{ color: "var(--color-text-main)" }}>
              {lang === "EN" ? "Page Navigation" : "Navigasi Halaman"}
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {NAV_SECTIONS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={getSectionHref(item.key, lang)}
                    onClick={(e) => handleAnchor(e, item.key)}
                    className="inline-block py-0.5 transition-colors hover:text-[var(--color-primary-text)]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {lang === "EN" ? item.labelEN : item.labelID}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Social Circles & Copyright */}
        <div
          className="pt-8 border-t flex flex-col items-center gap-4 text-center"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center justify-center gap-3">
            <a
              href={`mailto:${contactData.email}`}
              aria-label="Email"
              title="Email"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 hover:text-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)]"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-main)",
              }}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 hover:text-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)]"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-main)",
              }}
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={contactData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 hover:text-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)]"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-main)",
              }}
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={contactData.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 hover:text-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)]"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-main)",
              }}
            >
              <WhatsappIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
            <p>
              &copy; {CURRENT_YEAR}{" "}
              <strong style={{ color: "var(--color-text-main)" }}>{contactData.fullName}</strong>.
            </p>
            <p>
              {lang === "EN"
                ? "Designed and built with Next.js & Tailwind CSS."
                : "Dirancang dan dikembangkan dengan Next.js & Tailwind CSS."}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Back-to-Top Crimson Circle */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={lang === "EN" ? "Back to top" : "Kembali ke atas"}
          title={lang === "EN" ? "Back to top" : "Kembali ke atas"}
          className="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:-translate-y-1"
          style={{
            backgroundColor: "var(--color-primary)",
            boxShadow: "0 8px 24px var(--color-primary-glow)",
          }}
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </footer>
  );
}
