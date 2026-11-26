import React from "react";
import Contact from "@/components/Contact";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Hire & Collaborate | Handika Juan Putra Sinaga",
  description:
    "Looking for a Cloud or DevOps Engineer? Connect via LinkedIn, GitHub, email, or download my EN/ID CV to discuss infrastructure and engineering roles.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="w-full">
      <Contact />
    </div>
  );
}
