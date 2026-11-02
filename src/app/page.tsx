import React from "react";
import About from "@/components/About";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & Professional Overview | Handika Juan Putra Sinaga — DevOps Cloud Engineer",
  description:
    "Profil profesional & Overview Handika Juan Putra Sinaga, DevOps Cloud Engineer spesialisasi AWS, Docker, Kubernetes, CI/CD, dan Observabilitas.",
};

export default function HomePage() {
  return (
    <div className="w-full">
      <About />
    </div>
  );
}
