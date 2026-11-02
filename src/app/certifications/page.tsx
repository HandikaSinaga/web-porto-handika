import React from "react";
import Certifications from "@/components/Certifications";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verified Certifications & Credentials | Handika Juan",
  description:
    "Sertifikasi resmi BNSP Network Administrator, AWS Academy Cloud Architecting, dan Alibaba Cloud Certified Associate.",
};

export default function CertificationsPage() {
  return (
    <div className="w-full">
      <Certifications />
    </div>
  );
}
