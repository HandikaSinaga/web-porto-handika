import React from "react";
import ResumeView from "@/components/ResumeView";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Resume, Experience & Education | Handika Juan Putra Sinaga",
  description:
    "View Handika's cloud engineering background: MSIB AWS experience, Universitas Pamulang Informatics Engineering (GPA 3.59/4.00), and HKI thesis work.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="w-full">
      <ResumeView />
    </div>
  );
}
