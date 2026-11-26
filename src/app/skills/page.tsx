import React from "react";
import Skills from "@/components/Skills";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Technical Stack & Cloud Tooling | Handika Juan Putra Sinaga",
  description:
    "Discover the cloud and DevOps stack behind Handika's portfolio: AWS, Docker, GitLab CI, Nginx, PM2, Linux, Prometheus, and Grafana.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <div className="w-full">
      <Skills />
    </div>
  );
}
