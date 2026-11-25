"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getContactData } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons/SocialIcons";
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare, AlertCircle } from "lucide-react";

export default function Contact() {
  const { lang } = useLanguage();
  const isEN = lang === "EN";
  const contactData = getContactData(lang);

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError(
        isEN
          ? "Please fill in your name, email address, and message before sending."
          : "Mohon lengkapi nama lengkap, alamat email, dan pesan Anda terlebih dahulu."
      );
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setFormError(
        isEN
          ? "Please enter a valid email address (example: name@company.com)."
          : "Format email belum valid (contoh: nama@perusahaan.com)."
      );
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = encodeURIComponent(
      formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim()}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\n${formData.message.trim()}`
    );

    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
    setDispatchStatus(
      isEN
        ? "Your email app has been opened with your drafted message."
        : "Aplikasi email Anda telah dibuka dengan draf pesan yang siap dikirim."
    );
  };

  const handleWhatsAppSend = () => {
    const cleanPhone = contactData.phone.replace(/[^0-9]/g, "");
    const intlPhone = cleanPhone.startsWith("0") ? `62${cleanPhone.slice(1)}` : cleanPhone;

    const textParts = [
      formData.name.trim() ? `Halo Handika, saya ${formData.name.trim()}.` : "Halo Handika,",
      formData.subject.trim() ? `Topik: ${formData.subject.trim()}` : "",
      formData.message.trim() ? formData.message.trim() : "",
    ].filter(Boolean);

    const encoded = encodeURIComponent(textParts.join("\n"));
    window.open(`https://wa.me/${intlPhone}?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 scroll-mt-20 transition-colors"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
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
              ? "Interested in discussing DevOps roles, AWS cloud infrastructure, or project collaboration? Reach out via the channels below."
              : "Tertarik mendiskusikan peluang kerja DevOps, arsitektur cloud AWS, atau kolaborasi proyek? Silakan hubungi saya di bawah ini."}
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone / WhatsApp Card */}
            <div className="surface-card rounded-2xl p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "var(--color-emerald-tint)",
                    color: "var(--color-emerald)",
                  }}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    {isEN ? "PHONE / WHATSAPP" : "TELEPON / WHATSAPP"}
                  </div>
                  <a
                    href={`https://wa.me/${contactData.phone.replace(/[^0-9]/g, "").replace(/^0/, "62")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-bold hover:underline block truncate"
                    style={{ color: "var(--color-text-main)" }}
                  >
                    {contactData.phone}
                  </a>
                </div>
              </div>
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
                className="surface-chip h-11 w-11 inline-flex items-center justify-center rounded-xl shrink-0 transition-colors"
                style={{ color: "var(--color-text-muted)" }}
              >
                {copiedField === "phone" ? (
                  <Check className="w-4 h-4" style={{ color: "var(--color-emerald)" }} aria-hidden="true" />
                ) : (
                  <Copy className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Email Card */}
            <div className="surface-card rounded-2xl p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "var(--color-primary-tint)",
                    color: "var(--color-primary-text)",
                  }}
                >
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                    {isEN ? "OFFICIAL EMAIL" : "EMAIL RESMI"}
                  </div>
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-sm sm:text-base font-bold hover:underline block truncate"
                    style={{ color: "var(--color-text-main)" }}
                  >
                    {contactData.email}
                  </a>
                </div>
              </div>
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
                className="surface-chip h-11 w-11 inline-flex items-center justify-center rounded-xl shrink-0 transition-colors"
                style={{ color: "var(--color-text-muted)" }}
              >
                {copiedField === "email" ? (
                  <Check className="w-4 h-4" style={{ color: "var(--color-emerald)" }} aria-hidden="true" />
                ) : (
                  <Copy className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Location Card */}
            <div className="surface-card rounded-2xl p-5 flex items-center gap-3.5">
              <div
                className="surface-chip h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ color: "var(--color-text-main)" }}
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                  {isEN ? "LOCATION" : "DOMISILI / LOKASI"}
                </div>
                <div className="text-sm sm:text-base font-bold" style={{ color: "var(--color-text-main)" }}>
                  {contactData.location}
                </div>
              </div>
            </div>

            {/* Social Network Pills */}
            <div className="surface-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color: "var(--color-text-main)" }}>
                {isEN ? "Social Connections" : "Koneksi Jaringan Sosial"}
              </h3>
              <div className="flex flex-wrap gap-2">
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-chip inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary-text)]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-chip inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary-text)]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={`https://wa.me/${contactData.phone.replace(/[^0-9]/g, "").replace(/^0/, "62")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-chip inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary-text)]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <WhatsappIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Message Composer */}
          <div className="lg:col-span-7 surface-card rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" style={{ color: "var(--color-primary-text)" }} aria-hidden="true" />
                <h3 className="font-heading text-xl font-bold" style={{ color: "var(--color-text-main)" }}>
                  {isEN ? "Send a Direct Message" : "Kirim Pesan Langsung"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {isEN
                  ? "Fill out the fields below to open a pre-addressed email draft, or send directly via WhatsApp."
                  : "Isi formulir di bawah untuk menyiapkan draf email langsung, atau kirim cepat lewat WhatsApp."}
              </p>
            </div>

            {formError && (
              <div
                role="alert"
                className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm"
                style={{
                  backgroundColor: "var(--color-primary-tint)",
                  borderColor: "var(--color-primary)",
                  color: "var(--color-primary-text)",
                }}
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{formError}</span>
              </div>
            )}

            {dispatchStatus && (
              <div
                role="status"
                aria-live="polite"
                className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm"
                style={{
                  backgroundColor: "var(--color-emerald-tint)",
                  borderColor: "var(--color-emerald-border)",
                  color: "var(--color-emerald)",
                }}
              >
                <Check className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{dispatchStatus}</span>
              </div>
            )}

            <form onSubmit={handleEmailSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "var(--color-text-main)" }}
                  >
                    {isEN ? "Full Name" : "Nama Lengkap"}{" "}
                    <span style={{ color: "var(--color-primary-text)" }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isEN ? "Your name" : "Nama Anda"}
                    className="surface-chip w-full min-h-[44px] px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
                    style={{ color: "var(--color-text-main)" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "var(--color-text-main)" }}
                  >
                    {isEN ? "Email Address" : "Alamat Email"}{" "}
                    <span style={{ color: "var(--color-primary-text)" }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="surface-chip w-full min-h-[44px] px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
                    style={{ color: "var(--color-text-main)" }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "var(--color-text-main)" }}
                >
                  {isEN ? "Subject / Topic" : "Subjek / Topik"}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={isEN ? "e.g., Cloud Engineer Role or Project Discussion" : "Contoh: Peluang Kerja Cloud Engineer / Diskusi Proyek"}
                  className="surface-chip w-full min-h-[44px] px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
                  style={{ color: "var(--color-text-main)" }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "var(--color-text-main)" }}
                >
                  {isEN ? "Your Message" : "Pesan Anda"}{" "}
                  <span style={{ color: "var(--color-primary-text)" }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isEN ? "Write your message or project details here..." : "Tuliskan rincian pesan atau kebutuhan Anda di sini..."}
                  className="surface-chip w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors resize-y"
                  style={{ color: "var(--color-text-main)" }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)",
                    boxShadow: "0 6px 20px var(--color-primary-glow)",
                  }}
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{isEN ? "Compose Email" : "Kirim lewat Email"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "#047857" }}
                >
                  <WhatsappIcon className="w-4 h-4" />
                  <span>{isEN ? "Chat WhatsApp" : "Chat WhatsApp"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
