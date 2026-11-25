"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getContactData } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  FileDown,
  FileText,
  ClipboardCheck,
} from "lucide-react";

export default function Contact() {
  const { lang } = useLanguage();
  const isEN = lang === "EN";
  const contactData = getContactData(lang);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const cleanPhone = contactData.phone.replace(/[^0-9]/g, "");
  const intlPhone = cleanPhone.startsWith("0") ? `62${cleanPhone.slice(1)}` : cleanPhone;
  const waGreeting = encodeURIComponent(
    isEN
      ? "Hello Handika, I found your portfolio and would like to connect regarding a role / cloud project."
      : "Halo Handika, saya melihat portofolio Anda dan ingin berdiskusi terkait peluang kerja / proyek cloud."
  );
  const waUrl = `https://wa.me/${intlPhone}?text=${waGreeting}`;
  const mailSubject = encodeURIComponent(
    isEN
      ? "Opportunity / Collaboration Inquiry - Handika Portfolio"
      : "Penawaran Peluang / Kolaborasi - Portofolio Handika"
  );
  const mailtoUrl = `mailto:${contactData.email}?subject=${mailSubject}`;

  const contactSummaryText = [
    `${contactData.fullName} - DevOps & Cloud Engineer`,
    `Email: ${contactData.email}`,
    `Phone / WhatsApp: ${contactData.phone}`,
    `Location: ${contactData.location}`,
    `LinkedIn: ${contactData.linkedin}`,
    `GitHub: ${contactData.github}`,
  ].join("\n");

  const networkChannels = [
    {
      name: "LinkedIn",
      handle: isEN ? "Career & Credentials" : "Karier & Sertifikasi",
      desc: isEN
        ? "Full experience history, endorsements & verified badges."
        : "Riwayat pengalaman, pencapaian MSIB & kredensial resmi.",
      href: contactData.linkedin,
      icon: LinkedinIcon,
      accentBg: "var(--color-primary-tint)",
      accentColor: "var(--color-primary-text)",
    },
    {
      name: "GitHub",
      handle: "@HandikaSinaga",
      desc: isEN
        ? "Infrastructure repos, Docker setups & CI/CD pipelines."
        : "Repositori kode, konfigurasi Docker & otomasi CI/CD.",
      href: contactData.github,
      icon: GithubIcon,
      accentBg: "var(--color-primary-tint)",
      accentColor: "var(--color-primary-text)",
    },
    {
      name: isEN ? "Online CV" : "CV Online",
      handle: "s.id/cv_handika",
      desc: isEN
        ? "Latest printable CV document hosted online."
        : "Pratinjau dokumen CV terbaru yang siap dicetak.",
      href: contactData.cvUrl || "https://s.id/cv_handika",
      icon: FileText,
      accentBg: "var(--color-emerald-tint)",
      accentColor: "var(--color-emerald)",
    },
  ];

  const copiedFeedbackLabel =
    copiedField === "phone"
      ? isEN
        ? "Phone number copied to clipboard."
        : "Nomor telepon tersalin ke clipboard."
      : copiedField === "email"
      ? isEN
        ? "Email address copied to clipboard."
        : "Alamat email tersalin ke clipboard."
      : copiedField === "summary"
      ? isEN
        ? "Full contact summary copied to clipboard."
        : "Ringkasan kontak lengkap tersalin ke clipboard."
      : null;

  return (
    <section id="contact" className="section-flow py-12 sm:py-16 scroll-mt-20 transition-colors">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 space-y-8">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"
            style={{ color: "var(--color-primary-text)" }}
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>{isEN ? "CONTACT" : "KONTAK"}</span>
          </div>
          <h2
            className="font-heading font-extrabold tracking-[-0.02em]"
            style={{
              fontSize: "clamp(1.65rem, 4vw, 2.5rem)",
              color: "var(--color-text-main)",
            }}
          >
            {isEN ? "Get in Touch" : "Hubungi Saya"}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            {isEN
              ? "Interested in discussing DevOps roles, AWS cloud infrastructure, or project collaboration? Connect directly via any channel below."
              : "Tertarik mendiskusikan peluang kerja DevOps, arsitektur cloud AWS, atau kolaborasi proyek? Hubungi saya langsung melalui kanal berikut."}
          </p>
        </div>

        {/* Row 1: Two Featured Direct Contact Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WhatsApp & Direct Phone Card */}
          <div className="surface-card surface-card-interactive rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "var(--color-emerald-tint)",
                      color: "var(--color-emerald)",
                    }}
                  >
                    <WhatsappIcon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    {isEN ? "WHATSAPP & PHONE" : "WHATSAPP & TELEPON"}
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                  style={{
                    backgroundColor: "var(--color-emerald-tint)",
                    borderColor: "var(--color-emerald-border)",
                    color: "var(--color-emerald)",
                  }}
                >
                  {isEN ? "Fast Response" : "Respon Cepat"}
                </span>
              </div>

              <div className="space-y-1.5">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight hover:underline inline-block"
                  style={{ color: "var(--color-text-main)" }}
                >
                  {contactData.phone}
                </a>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {isEN
                    ? "Ideal for quick coordination, interview scheduling, or direct technical discussions."
                    : "Paling cocok untuk koordinasi cepat, penjadwalan wawancara, atau diskusi teknis singkat."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "#047857" }}
              >
                <WhatsappIcon className="w-4 h-4" />
                <span>{isEN ? "Chat WhatsApp" : "Chat WhatsApp"}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={`tel:+${intlPhone}`}
                className="surface-chip inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary-text)]"
                style={{ color: "var(--color-text-main)" }}
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isEN ? "Call" : "Telepon"}</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopy(contactData.phone, "phone")}
                aria-label={
                  copiedField === "phone"
                    ? isEN
                      ? "Phone number copied"
                      : "Nomor telepon tersalin"
                    : isEN
                    ? "Copy phone number"
                    : "Salin nomor telepon"
                }
                className="surface-chip inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors hover:border-[var(--color-primary)]"
                style={{
                  color: copiedField === "phone" ? "var(--color-emerald)" : "var(--color-text-muted)",
                }}
              >
                {copiedField === "phone" ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>{isEN ? "Copied" : "Tersalin"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>{isEN ? "Copy" : "Salin"}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Official Email Card */}
          <div className="surface-card surface-card-interactive rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "var(--color-primary-tint)",
                      color: "var(--color-primary-text)",
                    }}
                  >
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    {isEN ? "OFFICIAL EMAIL" : "EMAIL RESMI"}
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                  style={{
                    backgroundColor: "var(--color-primary-tint)",
                    borderColor: "var(--color-border-inset)",
                    color: "var(--color-primary-text)",
                  }}
                >
                  {isEN ? "Direct Inbox" : "Email Utama"}
                </span>
              </div>

              <div className="space-y-1.5">
                <a
                  href={mailtoUrl}
                  className="font-heading text-lg sm:text-2xl font-extrabold tracking-tight hover:underline inline-block break-all"
                  style={{ color: "var(--color-text-main)" }}
                >
                  {contactData.email}
                </a>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {isEN
                    ? "Best for formal role offers, AWS/DevOps project briefs, or HR correspondence."
                    : "Untuk penawaran posisi resmi, pengiriman detail proyek cloud/DevOps, atau korespondensi HR."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={mailtoUrl}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)",
                  boxShadow: "0 6px 20px var(--color-primary-glow)",
                }}
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>{isEN ? "Open Email App" : "Kirim Email"}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => handleCopy(contactData.email, "email")}
                aria-label={
                  copiedField === "email"
                    ? isEN
                      ? "Email address copied"
                      : "Alamat email tersalin"
                    : isEN
                    ? "Copy email address"
                    : "Salin alamat email"
                }
                className="surface-chip inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors hover:border-[var(--color-primary)]"
                style={{
                  color: copiedField === "email" ? "var(--color-emerald)" : "var(--color-text-muted)",
                }}
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>{isEN ? "Copied" : "Tersalin"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>{isEN ? "Copy Email" : "Salin Email"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Availability + Location + Professional Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Availability, Domicile & Recruiter Quick Tools */}
          <div className="lg:col-span-5 surface-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="surface-inset rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--color-emerald)" }}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--color-emerald)" }}>
                    {isEN ? "WORK AVAILABILITY" : "KETERSEDIAAN KERJA"}
                  </span>
                </div>
                <p className="text-sm font-bold leading-snug" style={{ color: "var(--color-text-main)" }}>
                  {isEN
                    ? "Open for DevOps / Cloud Engineer roles & infrastructure projects"
                    : "Terbuka untuk posisi DevOps / Cloud Engineer & kolaborasi infrastruktur"}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {isEN
                    ? "Full-time, internship, or project-based · Onsite Jabodetabek & Remote."
                    : "Full-time, kontrak, maupun berbasis proyek · Onsite Jabodetabek & Remote."}
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <div
                    className="surface-chip h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ color: "var(--color-primary-text)" }}
                  >
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                      {isEN ? "DOMICILE / LOCATION" : "DOMISILI / LOKASI"}
                    </div>
                    <div className="text-sm font-bold" style={{ color: "var(--color-text-main)" }}>
                      {contactData.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="surface-chip h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ color: "var(--color-primary-text)" }}
                  >
                    <Clock className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                      {isEN ? "TIMEZONE & RESPONSE" : "ZONA WAKTU & RESPON"}
                    </div>
                    <div className="text-sm font-semibold" style={{ color: "var(--color-text-main)" }}>
                      {isEN ? "WIB (UTC+7) · Replies within 24 hours" : "WIB (UTC+7) · Balas maksimal 1×24 jam"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
              <a
                href="/cv.pdf"
                download="CV_Handika_Juan_Putra_Sinaga.pdf"
                className="surface-chip inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary-text)]"
                style={{ color: "var(--color-text-main)" }}
              >
                <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isEN ? "Download CV (PDF)" : "Unduh CV (PDF)"}</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopy(contactSummaryText, "summary")}
                className="surface-chip inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold transition-colors hover:border-[var(--color-primary)]"
                style={{
                  color: copiedField === "summary" ? "var(--color-emerald)" : "var(--color-text-muted)",
                }}
              >
                {copiedField === "summary" ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isEN ? "Contact Info Copied" : "Ringkasan Tersalin"}</span>
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isEN ? "Copy Contact Info" : "Salin Semua Kontak"}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Professional Networks & Profile Channels */}
          <div className="lg:col-span-7 surface-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5">
            <div className="space-y-1.5">
              <h3 className="font-heading text-xl font-bold tracking-tight" style={{ color: "var(--color-text-main)" }}>
                {isEN ? "Professional Networks & Profiles" : "Jaringan Profesional & Profil Online"}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {isEN
                  ? "Explore verified work credentials, source repositories, or download my latest resume."
                  : "Telusuri profil karier terverifikasi, repositori kode infrastruktur, serta salinan CV daring."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {networkChannels.map((channel) => {
                const ChannelIcon = channel.icon;
                return (
                  <a
                    key={channel.name}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-inset group rounded-xl p-4 flex flex-col justify-between gap-4 transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div
                        aria-hidden="true"
                        className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: channel.accentBg,
                          color: channel.accentColor,
                        }}
                      >
                        <ChannelIcon className="w-4 h-4" />
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: "var(--color-text-muted)" }}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-bold" style={{ color: "var(--color-text-main)" }}>
                        {channel.name}
                      </div>
                      <div className="text-[11px] font-semibold" style={{ color: "var(--color-primary-text)" }}>
                        {channel.handle}
                      </div>
                      <p className="text-xs leading-relaxed pt-1" style={{ color: "var(--color-text-muted)" }}>
                        {channel.desc}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div
              role="status"
              aria-live="polite"
              className="pt-3 border-t flex items-center justify-between gap-3 text-xs"
              style={{
                borderColor: "var(--color-border)",
                color: copiedFeedbackLabel ? "var(--color-emerald)" : "var(--color-text-muted)",
              }}
            >
              <span>
                {copiedFeedbackLabel ||
                  (isEN
                    ? "Fastest way to reach me is via WhatsApp or Direct Email above."
                    : "Respon tercepat melalui WhatsApp atau Email Resmi di atas.")}
              </span>
              {copiedFeedbackLabel && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
