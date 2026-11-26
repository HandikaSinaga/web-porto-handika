import React from "react";
import Contact from "@/components/Contact";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact & Resume | Handika Juan Putra Sinaga",
  description:
    "Connect with Handika Juan Putra Sinaga for Cloud & DevOps Engineer opportunities, view LinkedIn & GitHub profiles, or download his EN/ID CV.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="w-full">
      <Contact />
    </div>
  );
}
