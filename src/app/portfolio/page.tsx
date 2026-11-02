import React from "react";
import Projects from "@/components/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Cloud Projects | Handika Juan",
  description:
    "Showcase proyek infrastruktur cloud AWS, arsitektur toleran kegagalan Multi-AZ, benchmark performa K6, dan topologi produksi.",
};

export default function PortfolioPage() {
  return (
    <div className="w-full">
      <Projects />
    </div>
  );
}
