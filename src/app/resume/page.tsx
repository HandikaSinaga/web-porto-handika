import React from "react";
import ResumeView from "@/components/ResumeView";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Resume, Experience & Education | Handika Juan Putra Sinaga",
  description:
    "B.S. Informatics Engineering (GPA 3.59/4.00) with HKI-output thesis, AWS & SEAL MSIB Cloud Engineering experience, and 28.8% AWS cost optimization results.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="w-full">
      <ResumeView />
    </div>
  );
}
