import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsDataEN } from "@/data/portfolioData.en";
import { buildPageMetadata } from "@/lib/metadata";
import ProjectDetailView from "@/components/ProjectDetailView";

export async function generateStaticParams() {
  return projectsDataEN.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projectsDataEN.find((p) => p.id === id);

  if (!project) {
    return buildPageMetadata({
      title: "Project Not Found | Handika Juan Putra Sinaga Portfolio",
      description: "Requested cloud engineering case study could not be found.",
      path: `/portfolio/${id}`,
    });
  }

  return buildPageMetadata({
    title: `${project.title} | Handika Juan Putra Sinaga Portfolio`,
    description: project.description,
    path: `/portfolio/${project.id}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exists = projectsDataEN.some((p) => p.id === id);

  if (!exists) {
    notFound();
  }

  return <ProjectDetailView projectId={id} />;
}
