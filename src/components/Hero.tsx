"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getContactData } from "@/data/portfolioData";
import { SectionKey, getSectionDomId, getSectionHash, getSectionHref } from "@/data/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Send, FolderGit2 } from "lucide-react";

export default function Hero() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const contactData = getContactData(lang);
  const isHomePage = pathname === "/";

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, key: SectionKey) => {
    if (isHomePage) {
      const el = document.getElementById(getSectionDomId(key));
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${getSectionHash(key, lang)}`);
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
      className="relative overflow-hidden w-full pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 scroll-mt-20"
    >
      <div id="beranda" className="scroll-mt-20" />
      {/* Multi-Tone Ambient Engineering Backdrop */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        {/* Masked Engineering Blueprint Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--hero-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--hero-grid-line) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage: "radial-gradient(ellipse 85% 78% at 50% 42%, #000 35%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 78% at 50% 42%, #000 35%, transparent 100%)",
          }}
        />

        {/* Animated Multi-Hue Aurora Orbs (Crimson + Amber + Emerald + Sky) */}
        <div
          className="hero-orb-a absolute -top-24 right-[-6%] h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--hero-orb-crimson) 0%, transparent 70%)",
          }}
        />
        <div
          className="hero-orb-b absolute -top-20 left-[-8%] h-[360px] w-[360px] sm:h-[460px] sm:w-[460px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--hero-orb-amber) 0%, transparent 70%)",
          }}
        />
        <div
          className="hero-orb-c absolute -bottom-28 left-[18%] h-[340px] w-[340px] sm:h-[440px] sm:w-[440px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--hero-orb-emerald) 0%, transparent 70%)",
          }}
        />
        <div
          className="hero-orb-a absolute bottom-[-15%] right-[16%] h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--hero-orb-sky) 0%, transparent 70%)",
            animationDelay: "-7s",
          }}
        />

        {/* Traveling Telemetry Light Traces along Grid Tracks */}
        <div
          className="hero-beam-x absolute top-[104px] left-0 h-[1.5px] w-48 sm:w-72"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #dc2626 45%, #f59e0b 85%, transparent 100%)",
          }}
        />
        <div
          className="hero-beam-x absolute bottom-[104px] left-0 h-[1.5px] w-40 sm:w-64"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #10b981 45%, #38bdf8 85%, transparent 100%)",
            animationDelay: "-4.5s",
          }}
        />
        <div
          className="hero-beam-y hidden md:block absolute top-0 left-[260px] w-[1.5px] h-44"
          style={{
            background: "linear-gradient(180deg, transparent 0%, #f59e0b 45%, #dc2626 85%, transparent 100%)",
            animationDelay: "-2s",
          }}
        />
        <div
          className="hero-beam-y hidden md:block absolute top-0 right-[260px] w-[1.5px] h-48"
          style={{
            background: "linear-gradient(180deg, transparent 0%, #38bdf8 45%, #10b981 85%, transparent 100%)",
            animationDelay: "-6.5s",
          }}
        />

        {/* Subtle Floating Telemetry Accent Dots */}
        <span
          className="hero-node-float absolute top-[18%] left-[10%] h-2 w-2 rounded-full"
          style={{ backgroundColor: "#f59e0b", boxShadow: "0 0 12px rgba(245, 158, 11, 0.55)" }}
        />
        <span
          className="hero-node-float absolute top-[72%] left-[44%] h-2 w-2 rounded-full"
          style={{ backgroundColor: "#10b981", boxShadow: "0 0 12px rgba(16, 185, 129, 0.55)", animationDelay: "-2.2s" }}
        />
        <span
          className="hero-node-float hidden sm:block absolute top-[22%] right-[12%] h-2 w-2 rounded-full"
          style={{ backgroundColor: "#38bdf8", boxShadow: "0 0 12px rgba(56, 189, 248, 0.55)", animationDelay: "-4.1s" }}
        />
        <span
          className="hero-node-float hidden sm:block absolute bottom-[18%] right-[40%] h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "#f87171", boxShadow: "0 0 10px rgba(248, 113, 113, 0.55)", animationDelay: "-1.3s" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 sm:px-6">
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
                  Informatics Engineering graduate from{" "}
                  <strong style={{ color: "var(--color-text-main)" }}>
                    Universitas Pamulang (GPA 3.59 / 4.00)
                  </strong>{" "}
                  specializing in AWS cloud architecture (EC2, RDS, VPC, Auto Scaling), Nginx, PM2, Docker, CI/CD pipelines, and observability with Prometheus, Grafana, and K6.
                </>
              ) : (
                <>
                  Lulusan{" "}
                  <strong style={{ color: "var(--color-text-main)" }}>
                    S1 Teknik Informatika, Universitas Pamulang (IPK 3,59 / 4,00)
                  </strong>{" "}
                  dengan keahlian arsitektur cloud AWS (EC2, RDS, VPC, Auto Scaling), deployment Nginx, PM2, Docker, pipeline CI/CD, serta observabilitas Prometheus, Grafana, dan K6.
                </>
              )}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <Link
                href={getSectionHref("contact", lang)}
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
                href={getSectionHref("portfolio", lang)}
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
              {/* Orbital Multi-Accent Rings around Portrait */}
              <div
                aria-hidden="true"
                className="hero-orbit absolute -inset-5 rounded-full border-2 border-dashed opacity-35 pointer-events-none"
                style={{ borderColor: "var(--color-primary)" }}
              >
                <span
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: "#f59e0b",
                    boxShadow: "0 0 12px rgba(245, 158, 11, 0.7)",
                  }}
                />
                <span
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: "#10b981",
                    boxShadow: "0 0 12px rgba(16, 185, 129, 0.7)",
                  }}
                />
              </div>
              <div
                aria-hidden="true"
                className="hero-orbit-reverse absolute -inset-9 rounded-full border opacity-20 pointer-events-none hidden sm:block"
                style={{ borderColor: "#38bdf8" }}
              >
                <span
                  className="absolute top-1/2 -right-1 -translate-y-1/2 h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: "#38bdf8",
                    boxShadow: "0 0 10px rgba(56, 189, 248, 0.7)",
                  }}
                />
              </div>

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
                  src={contactData.avatarUrl || "/images/profile.jpg"}
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
