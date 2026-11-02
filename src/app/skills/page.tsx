import React from "react";
import Skills from "@/components/Skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills & Technical Stack | Handika Juan",
  description:
    "Keahlian teknis Cloud Infrastructure, CI/CD, Containerization, Observability, dan Linux Systems Administration.",
};

export default function SkillsPage() {
  return (
    <div className="w-full">
      <Skills />
    </div>
  );
}
