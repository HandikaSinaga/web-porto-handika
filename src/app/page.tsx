import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ResumeView from "@/components/ResumeView";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Handika Juan Putra Sinaga | DevOps & Cloud Engineer",
  description:
    "Portofolio Handika Juan Putra Sinaga, DevOps & Cloud Engineer spesialisasi AWS, Docker, CI/CD, Linux, dan Observabilitas Prometheus & Grafana.",
};

export default function HomePage() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Projects />
      <ResumeView />
      <Certifications />
      <Contact />
    </div>
  );
}
