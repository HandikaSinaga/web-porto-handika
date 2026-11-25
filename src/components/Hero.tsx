"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getContactData } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { Send, FolderGit2 } from "lucide-react";

export default function Hero() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const contactData = getContactData(lang);
  const isHomePage = pathname === "/";

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHomePage) {
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const summaryItems = [
    {
      value: "2",
      label: lang === "EN" ? "AWS Cloud Projects" : "Proyek Cloud AWS",
    },
    {
      value: "2021 - 2026",
      label: lang === "EN" ? "B.S. Computer Science" : "S1 Teknik Informatika",
    },
    {
      value: "10",
      label: lang === "EN" ? "Verified Credentials" : "Sertifikasi Terverifikasi",
    },
  ];

  return (
    <section
      id="home"
      className="relative w-full pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            {/* Real Availability Status Indicator (static dot, no infinite pulse) */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs sm:text-[13px] font-medium"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: "var(--color-emerald)" }}
                aria-hidden="true"
              />
              <span>
                {lang === "EN"
                  ? "DevOps & Cloud Engineer · Open to Opportunities"
                  : "DevOps & Cloud Engineer · Terbuka untuk Peluang"}
              </span>
            </div>

            <div className="space-y-2">
              <p
                className="text-base sm:text-lg font-semibold tracking-tight"
                style={{ color: "var(--color-primary-text)" }}
              >
                {lang === "EN" ? "Hello everyone, I am" : "Halo Semua, Saya"}
              </p>
              <h1
                className="font-heading font-extrabold tracking-[-0.03em] leading-[1.12]"
                style={{
                  fontSize: "clamp(2rem, 5.2vw, 3.35rem)",
                  color: "var(--color-text-main)",
                }}
              >
                {contactData.name}
              </h1>
            </div>

            <p
              className="text-base sm:text-[17px] leading-relaxed max-w-xl"
              style={{ color: "var(--color-text-muted)" }}
            >
              {lang === "EN" ? (
                <>
                  Computer Science graduate from{" "}
                  <strong style={{ color: "var(--color-text-main)" }}>
                    Pamulang University (GPA 3.59)
                  </strong>{" "}
                  focusing on AWS cloud architecture, Docker containers, CI/CD automation, and Linux production infrastructure.
                </>
              ) : (
                <>
                  Lulusan{" "}
                  <strong style={{ color: "var(--color-text-main)" }}>
                    S1 Teknik Informatika, Universitas Pamulang (IPK 3,59)
                  </strong>{" "}
                  yang berfokus pada arsitektur cloud AWS, container Docker, otomasi CI/CD, dan infrastruktur server Linux.
                </>
              )}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <Link
                href="/#contact"
                onClick={(e) => handleAnchor(e, "contact")}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-7 py-3 rounded-full text-sm sm:text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)",
                  boxShadow: "0 6px 20px var(--color-primary-glow)",
                }}
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>{lang === "EN" ? "Contact Me" : "Hubungi Saya"}</span>
              </Link>

              <Link
                href="/#portfolio"
                onClick={(e) => handleAnchor(e, "portfolio")}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 rounded-full text-sm sm:text-[15px] font-semibold border transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-main)",
                }}
              >
                <FolderGit2 className="w-4 h-4" aria-hidden="true" />
                <span>{lang === "EN" ? "View Cloud Projects" : "Lihat Proyek Cloud"}</span>
              </Link>
            </div>

            {/* Verified Summary Strip */}
            <div
              className="mt-4 rounded-2xl border p-4 sm:px-6 sm:py-5 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-xl"
              style={{
                backgroundColor: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
              }}
            >
              {summaryItems.map((item, idx) => (
                <div
                  key={item.label}
                  className={idx === 2 ? "col-span-2 sm:col-span-1 text-center" : "text-center"}
                >
                  <div
                    className="font-heading text-lg sm:text-xl font-extrabold tracking-tight"
                    style={{ color: "var(--color-primary-text)" }}
                  >
                    {item.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Portrait */}
          <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
            <div className="relative flex items-center justify-center w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[330px] lg:h-[330px]">
              {/* Subtle dashed outer ring (static, non-looping) */}
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-full border-2 border-dashed opacity-25 pointer-events-none"
                style={{ borderColor: "var(--color-primary)" }}
              />

              {/* Circular Crimson Framed Portrait */}
              <div
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{
                  border: "4px solid var(--color-primary)",
                  boxShadow: "0 0 0 8px var(--color-primary-tint), 0 18px 42px var(--color-primary-glow)",
                  backgroundColor: "var(--color-bg-card)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={contactData.avatarUrl || "/images/profile.png"}
                  alt={contactData.name}
                  width={330}
                  height={330}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
