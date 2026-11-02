"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";

interface ExpandableTextProps {
  text?: string;
  previewWords?: number; // Word threshold for preview snippet (default: 28 words)
  maxWords?: number; // Absolute safety ceiling (default: 300 words max per industry standard)
  className?: string;
  buttonClassName?: string;
  expandLabel?: string;
  collapseLabel?: string;
  clampLines?: number;
  children?: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  defaultExpanded?: boolean;
}

/**
 * Reusable ExpandableText component.
 * - Displays a clean preview snippet (default ~28 words or 2-3 lines).
 * - Caps maximum content at maxWords (default: 300 words) to prevent layout bloat.
 * - Provides an interactive "Lihat selengkapnya" / "Read more" toggle.
 * - Supports rich expandable children (bullet points, tech stack, action links).
 */
export default function ExpandableText({
  text = "",
  previewWords = 28,
  maxWords = 300,
  className = "text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-loose",
  buttonClassName = "",
  expandLabel,
  collapseLabel,
  clampLines,
  children,
  isExpanded: controlledExpanded,
  onToggle,
  defaultExpanded = false,
}: ExpandableTextProps) {
  const { lang } = useLanguage();
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const effectiveExpandLabel =
    expandLabel !== undefined
      ? expandLabel
      : lang === "EN"
      ? "Read more"
      : "Lihat selengkapnya";

  const effectiveCollapseLabel =
    collapseLabel !== undefined
      ? collapseLabel
      : lang === "EN"
      ? "Show less"
      : "Tampilkan lebih sedikit";

  if (!text && !children) return null;

  const rawText = (text || "").trim();
  const allWords = rawText ? rawText.split(/\s+/).filter(Boolean) : [];

  // Enforce 300 words maximum limit per specification
  const isCappedAtMax = allWords.length > maxWords;
  const fullText = isCappedAtMax
    ? allWords.slice(0, maxWords).join(" ") + "..."
    : rawText;

  // Check if text or extra content requires expand toggle
  const isOverPreview = previewWords ? allWords.length > previewWords : false;
  const hasExpandableContent = isOverPreview || Boolean(clampLines) || Boolean(children);

  // Preview snippet
  const previewText = isOverPreview && previewWords
    ? allWords.slice(0, previewWords).join(" ") + "..."
    : fullText;

  const displayedText = isExpanded ? fullText : previewText;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isExpanded;
    if (controlledExpanded === undefined) {
      setInternalExpanded(next);
    }
    onToggle?.(next);
  };

  // If text is short, no children, and no clamping, render simply
  if (!hasExpandableContent) {
    return <p className={className}>{fullText}</p>;
  }

  return (
    <div className="space-y-3">
      {rawText && (
        <p
          className={`${className} ${
            clampLines && !isExpanded ? `line-clamp-${clampLines}` : ""
          } transition-all`}
        >
          {displayedText}
        </p>
      )}

      {/* Render optional rich children only when expanded */}
      {isExpanded && children && (
        <div className="space-y-4 pt-1 animate-fadeIn">{children}</div>
      )}

      {hasExpandableContent && (
        <div className="pt-1">
          <button
            type="button"
            onClick={handleToggle}
            aria-expanded={isExpanded}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 border border-blue-200/80 dark:border-blue-800/80 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer select-none shadow-sm ${buttonClassName}`}
          >
            <span>{isExpanded ? effectiveCollapseLabel : effectiveExpandLabel}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
