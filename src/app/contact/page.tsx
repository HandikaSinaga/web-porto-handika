import React from "react";
import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Collaboration | Handika Juan",
  description:
    "Hubungi Handika Juan untuk proyek DevOps, rekayasa cloud, konsultasi arsitektur AWS, atau peluang karir.",
};

export default function ContactPage() {
  return (
    <div className="w-full">
      <Contact />
    </div>
  );
}
