import React from "react";
import Projects from "@/components/Projects";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Cloud Architecture & Case Studies | Handika Juan Putra Sinaga",
  description:
    "See how I built fault-tolerant Multi-AZ AWS architectures, cut cloud spend by ~28.8%, and ran 20,100+ request Grafana K6 stress tests in production.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="w-full">
      <Projects />
    </div>
  );
}
