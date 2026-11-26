import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ResumeView from "@/components/ResumeView";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import { buildPageMetadata, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

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
