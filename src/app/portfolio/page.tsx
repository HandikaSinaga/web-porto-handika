import React from "react";
import Projects from "@/components/Projects";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Cloud Projects & Architecture Case Studies | Handika Juan Putra Sinaga",
  description:
    "Inside Handika's engineering portfolio: real-world AWS Multi-AZ infrastructure, Nginx & PM2 deployments, and Grafana K6 load-test case studies.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="w-full">
      <Projects />
    </div>
  );
}
