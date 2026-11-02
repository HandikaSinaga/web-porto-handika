"use client";

import React, { useState, useEffect } from "react";
import { contactData } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import {
  FileDown,
  ArrowRight,
  Mail,
  MapPin,
  ShieldCheck,
  Server,
  Cloud,
  CheckCircle2,
  Terminal as TerminalIcon,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  const titles = [
    "Cloud Engineer",
    "DevOps Engineer",
    "AWS Infrastructure Specialist",
    "Linux & CI/CD Practitioner",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const fullText = titles[currentTitleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(90);

        if (currentText.length + 1 === fullText.length) {
          // Pause at full word
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting backward
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(45);

        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          setTypingSpeed(300);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIndex, titles, typingSpeed]);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background Gradient & Grid Accent */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-blue-500/15 to-sky-400/10 dark:from-blue-600/20 dark:to-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-400/10 dark:bg-blue-700/15 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-20 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-900/20 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Introductions & Typewriter & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 dark:bg-blue-950/50 dark:border-blue-800/60 dark:text-blue-300 text-xs sm:text-sm font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Open to Cloud & DevOps Opportunities</span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <p className="text-slate-600 dark:text-slate-400 font-mono text-sm tracking-wide uppercase">
                Hello World, Saya
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {contactData.fullName}
              </h1>

              {/* Animated Typing Title */}
              <div className="flex items-center justify-center lg:justify-start gap-1 font-mono text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-600 dark:text-blue-400 pt-2 min-h-[44px]">
                <span className="text-slate-400 dark:text-slate-500">&gt;</span>
                <span>{currentText}</span>
                <span className="inline-block w-2.5 h-6 sm:h-7 bg-blue-600 dark:bg-blue-400 animate-pulse ml-0.5" />
              </div>
            </div>

            {/* Bio Summary */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Lulusan S1 Teknik Informatika Universitas Pamulang yang fokus pada{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                Cloud Computing (AWS), CI/CD Automation, Containerization,
              </span>{" "}
              dan pengelolaan infrastruktur yang aman, efisien, serta scalable.
            </p>

            {/* Quick Location & Email Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-500" />
                {contactData.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-500" />
                {contactData.email}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <a
                href={contactData.cvUrl || "https://s.id/cv-handika"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <FileDown className="w-5 h-5" />
                <span>Download CV Lengkap</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-sm transition-all"
              >
                <span>Lihat Project</span>
                <ArrowRight className="w-4 h-4 text-blue-500" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>Hubungi Saya</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                Connect:
              </span>
              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={contactData.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${contactData.email}`}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive DevOps Terminal & Architecture Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer Decorative Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 dark:opacity-40 blur-xl transition-all" />

              {/* Terminal Box */}
              <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0c1220]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-100/90 dark:bg-[#090e1a] border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <TerminalIcon className="w-3.5 h-3.5 text-blue-500" />
                    <span>handika@aws-bastion:~</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    READY
                  </span>
                </div>

                {/* Terminal Content */}
                <div className="p-5 font-mono text-xs sm:text-sm space-y-3">
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">handika@cloud</span>
                    <span className="text-slate-400">:</span>
                    <span className="text-slate-500">~</span>
                    <span className="text-slate-400">$</span>{" "}
                    <span className="text-slate-800 dark:text-slate-200">
                      aws sts get-caller-identity
                    </span>
                  </div>
                  <div className="pl-3 text-slate-600 dark:text-slate-300 text-xs bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800/80">
                    <p className="text-emerald-600 dark:text-emerald-400">
                      &#123; &quot;UserId&quot;: &quot;AROA-HANDIKA-CLOUD-OPS&quot;,
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      &nbsp;&nbsp;&quot;Account&quot;: &quot;AWS-ID-PRODUCTION&quot;,
                    </p>
                    <p className="text-blue-600 dark:text-blue-400">
                      &nbsp;&nbsp;&quot;Arn&quot;: &quot;arn:aws:iam::role/DevOpsEngineer&quot; &#125;
                    </p>
                  </div>

                  <div className="pt-1">
                    <span className="text-blue-600 dark:text-blue-400">handika@cloud</span>
                    <span className="text-slate-400">:</span>
                    <span className="text-slate-500">~</span>
                    <span className="text-slate-400">$</span>{" "}
                    <span className="text-slate-800 dark:text-slate-200">
                      kubectl get pods -n production
                    </span>
                  </div>

                  <div className="pl-3 space-y-1 text-[11px] sm:text-xs">
                    <div className="flex justify-between text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
                      <span>NAME</span>
                      <span>READY</span>
                      <span>STATUS</span>
                      <span>RESTARTS</span>
                    </div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300">
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        polinema-api-7b8c-x9k
                      </span>
                      <span>1/1</span>
                      <span className="text-emerald-500 font-semibold">Running</span>
                      <span>0</span>
                    </div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300">
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        gazebo-samasta-6d4a-3lm
                      </span>
                      <span>1/1</span>
                      <span className="text-emerald-500 font-semibold">Running</span>
                      <span>0</span>
                    </div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300">
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        prometheus-k8s-node-89j
                      </span>
                      <span>2/2</span>
                      <span className="text-emerald-500 font-semibold">Running</span>
                      <span>0</span>
                    </div>
                  </div>

                  {/* Highlights Mini Grid */}
                  <div className="pt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/50 flex items-center gap-2">
                      <Server className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500">Infrastructure</div>
                        <div className="font-bold text-slate-800 dark:text-white">
                          AWS & Multi-AZ
                        </div>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/50 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500">Certifications</div>
                        <div className="font-bold text-slate-800 dark:text-white">
                          BNSP & Alibaba ACA
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
