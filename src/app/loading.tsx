import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070b12] text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Navbar Skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-[#070b12]/70 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Skeleton */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>

          {/* Nav Items Skeleton */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800">
            <div className="h-7 w-16 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-7 w-16 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-7 w-16 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-7 w-20 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-7 w-24 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-7 w-16 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>

          {/* Action Button Skeleton */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="hidden sm:block h-9 w-28 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="h-7 w-64 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />

            {/* Subtitle / Intro */}
            <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />

            {/* Name Heading */}
            <div className="space-y-3">
              <div className="h-12 sm:h-14 w-4/5 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-8 w-2/3 rounded-lg bg-blue-100 dark:bg-blue-950/60 animate-pulse skeleton-shimmer" />
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-2.5 max-w-xl">
              <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            </div>

            {/* Meta Tags Skeleton */}
            <div className="flex gap-4">
              <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-5 w-44 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            </div>

            {/* CTA Buttons Skeleton */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="h-12 w-44 rounded-xl bg-blue-600/30 dark:bg-blue-600/20 animate-pulse skeleton-shimmer" />
              <div className="h-12 w-36 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="h-12 w-32 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#0c1220]/80 p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse skeleton-shimmer" />
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse skeleton-shimmer" />
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse skeleton-shimmer" />
                </div>
                <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
              </div>

              {/* Status Items */}
              <div className="space-y-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 space-y-2">
                  <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                  <div className="h-3 w-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 space-y-2">
                  <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                  <div className="h-3 w-56 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 space-y-2">
                  <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                  <div className="h-3 w-44 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="h-4 w-20 rounded bg-emerald-500/20 animate-pulse skeleton-shimmer" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Preview Skeletons */}
        <div className="mt-28 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="h-6 w-32 mx-auto rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-8 w-64 mx-auto rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
            <div className="h-4 w-80 mx-auto rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#0c1220]/50 p-6 space-y-4 shadow-sm"
              >
                <div className="h-40 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                <div className="space-y-2 pt-2">
                  <div className="h-3.5 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                  <div className="h-3.5 w-5/6 rounded bg-slate-200 dark:bg-slate-800 animate-pulse skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
