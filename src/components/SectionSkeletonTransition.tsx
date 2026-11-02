"use client";

import React from "react";
import { Terminal, Cloud, Server, Award, Mail, Sparkles } from "lucide-react";

interface SectionSkeletonTransitionProps {
  targetSection: string;
  targetTitle: string;
  isFading: boolean;
}

export default function SectionSkeletonTransition({
  targetSection,
  targetTitle,
  isFading,
}: SectionSkeletonTransitionProps) {
  return (
    <div
      className={`fixed inset-0 z-[10000] overflow-y-auto bg-[#f8fafc]/95 dark:bg-[#070b12]/95 backdrop-blur-md transition-opacity duration-300 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Top Progress Loading Bar with Glow */}
      <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[10002] overflow-hidden bg-slate-200/50 dark:bg-slate-800/50">
        <div className="h-full w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 animate-[loading-progress_0.6s_ease-in-out_forwards] shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
      </div>

      {/* Floating Navigation Pill */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[10002] pointer-events-none animate-fadeIn">
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-blue-500/40 dark:border-blue-500/50 shadow-xl shadow-blue-500/10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <span>Memuat:</span>
            <strong className="text-blue-600 dark:text-blue-400 font-semibold">{targetTitle}</strong>
          </span>
        </div>
      </div>

      {/* Static Skeleton Navbar Outline */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-[#070b12]/70 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 animate-pulse skeleton-shimmer" />
            <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>

          <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800">
            <div className="h-7 w-16 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-7 w-16 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-7 w-16 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-7 w-20 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-7 w-24 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-7 w-16 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="hidden sm:block h-9 w-28 rounded-xl bg-blue-600/30 animate-pulse skeleton-shimmer" />
          </div>
        </div>
      </header>

      {/* Dynamic Section Skeleton Container */}
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-screen">
        {/* Render contextual skeleton based on target */}
        {targetSection === "projects" && <ProjectsSkeleton />}
        {targetSection === "about" && <AboutSkeleton />}
        {targetSection === "skills" && <SkillsSkeleton />}
        {targetSection === "certifications" && <CertificationsSkeleton />}
        {targetSection === "contact" && <ContactSkeleton />}
        {(targetSection === "home" || !["projects", "about", "skills", "certifications", "contact"].includes(targetSection)) && (
          <HomeSkeleton />
        )}
      </div>
    </div>
  );
}

// 1. Projects Section Skeleton
function ProjectsSkeleton() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <div className="h-4 w-44 rounded bg-blue-500/20 animate-pulse skeleton-shimmer" />
        <div className="h-10 w-96 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
        <div className="h-5 w-full max-w-xl rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0c1220]/70 p-6 sm:p-8 space-y-6 shadow-sm"
          >
            {/* Meta Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              </div>
              <div className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            </div>

            {/* Title & Role */}
            <div className="space-y-2">
              <div className="h-8 w-4/5 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-4 w-1/2 rounded bg-blue-500/20 animate-pulse skeleton-shimmer" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-3.5 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-3.5 w-11/12 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-3.5 w-4/5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            </div>

            {/* Architecture Highlights Chips */}
            <div className="space-y-2 pt-1">
              <div className="h-3 w-36 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="flex flex-wrap gap-2">
                <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="h-7 w-36 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              </div>
            </div>

            {/* Linked Experience Card Box */}
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
              <div className="h-4 w-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-4 w-20 rounded bg-blue-500/20 animate-pulse skeleton-shimmer" />
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
              <div className="h-5 w-14 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-5 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-5 w-20 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-5 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
              <div className="h-10 flex-1 rounded-xl bg-blue-600/30 animate-pulse skeleton-shimmer" />
              <div className="h-10 w-28 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-10 w-24 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. About Section Skeleton
function AboutSkeleton() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <div className="h-4 w-40 rounded bg-blue-500/20 animate-pulse skeleton-shimmer" />
        <div className="h-10 w-80 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
        <div className="h-5 w-full max-w-xl rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Terminal / Profile Console (Left) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0c1220]/70 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse" />
            </div>
            <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>
          <div className="h-40 rounded-xl bg-slate-100 dark:bg-slate-900/60 animate-pulse skeleton-shimmer" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>
        </div>

        {/* Bio & Tabs Content (Right) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Stat Counters Row */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#0c1220]/60 space-y-2"
              >
                <div className="h-8 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              </div>
            ))}
          </div>

          {/* Tab Navigation Skeleton */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="h-9 w-28 rounded-lg bg-blue-600/30 animate-pulse skeleton-shimmer" />
            <div className="h-9 w-28 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-9 w-28 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-9 w-28 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>

          {/* Timeline Experience Card Skeleton */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0c1220]/70 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            </div>
            <div className="h-4 w-64 rounded bg-blue-500/20 animate-pulse skeleton-shimmer" />
            <div className="space-y-2 pt-2">
              <div className="h-3.5 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-3.5 w-11/12 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-3.5 w-4/5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Skills Section Skeleton
function SkillsSkeleton() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <div className="h-4 w-44 rounded bg-blue-500/20 animate-pulse skeleton-shimmer" />
        <div className="h-10 w-96 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
        <div className="h-5 w-full max-w-xl rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
      </div>

      {/* 4 Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0c1220]/70 p-6 space-y-5 shadow-sm"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 animate-pulse skeleton-shimmer" />
              <div className="space-y-1.5 flex-1">
                <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              </div>
            </div>

            {/* Skill Badges Flow */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[1, 2, 3, 4, 5, 6, 7].map((b) => (
                <div
                  key={b}
                  className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer"
                />
              ))}
            </div>

            {/* Progress / Radar Bar */}
            <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/50 space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full w-4/5 bg-blue-500/40 animate-pulse skeleton-shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Certifications Section Skeleton
function CertificationsSkeleton() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <div className="h-4 w-44 rounded bg-blue-500/20 animate-pulse skeleton-shimmer" />
        <div className="h-10 w-88 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
        <div className="h-5 w-full max-w-xl rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
      </div>

      {/* 3-Column Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0c1220]/70 overflow-hidden shadow-sm space-y-4 p-5"
          >
            {/* Visual Header */}
            <div className="h-36 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="space-y-2">
              <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-4 w-2/3 rounded bg-blue-500/20 animate-pulse skeleton-shimmer" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
              <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-8 w-24 rounded-lg bg-blue-600/30 animate-pulse skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Contact Section Skeleton
function ContactSkeleton() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <div className="h-4 w-40 rounded bg-blue-500/20 animate-pulse skeleton-shimmer" />
        <div className="h-10 w-80 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
        <div className="h-5 w-full max-w-xl rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Cards (Left) */}
        <div className="lg:col-span-5 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0c1220]/70 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/30 animate-pulse skeleton-shimmer" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="h-5 w-44 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>

        {/* Message Form (Right) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0c1220]/70 p-6 sm:p-8 space-y-5">
          <div className="h-6 w-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>
          <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          <div className="h-28 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          <div className="h-12 w-48 rounded-xl bg-blue-600/30 animate-pulse skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

// 6. Home / Hero Fallback Skeleton
function HomeSkeleton() {
  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="h-7 w-64 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          <div className="space-y-3">
            <div className="h-12 w-4/5 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-8 w-2/3 rounded-lg bg-blue-500/20 animate-pulse skeleton-shimmer" />
          </div>
          <div className="space-y-2 max-w-xl">
            <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>
          <div className="flex gap-4 pt-2">
            <div className="h-12 w-44 rounded-xl bg-blue-600/30 animate-pulse skeleton-shimmer" />
            <div className="h-12 w-36 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0c1220]/70 p-6 space-y-5">
            <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-32 rounded-xl bg-slate-100 dark:bg-slate-900/60 animate-pulse skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
