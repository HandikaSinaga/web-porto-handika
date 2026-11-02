import React from "react";
import ResumeView from "@/components/ResumeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume, Education & Academy Trainings | Handika Juan",
  description:
    "Rekam jejak profesional, pengalaman kerja DevOps, riwayat pendidikan S1 Teknik Informatika (IPK 3.59), serta pelatihan resmi AWS Academy.",
};

export default function ResumePage() {
  return (
    <div className="w-full">
      <ResumeView />
    </div>
  );
}
