import React from "react";
import Skills from "@/components/Skills";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "DevOps & Cloud Tech Stack | Handika Juan Putra Sinaga",
  description:
    "Production stack spanning AWS (EC2, VPC, RDS, ALB, Auto Scaling), AWS Pricing Calculator, Docker, GitLab CI, Nginx, PM2, Prometheus, Grafana & K6.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <div className="w-full">
      <Skills />
    </div>
  );
}
