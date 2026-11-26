import React from "react";
import Certifications from "@/components/Certifications";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Verified Cloud & Networking Credentials | Handika Juan Putra Sinaga",
  description:
    "Browse Handika's verified credentials including BNSP Network Engineer, AWS Academy Cloud Architecting & Foundations, and Alibaba Cloud certifications.",
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <div className="w-full">
      <Certifications />
    </div>
  );
}
