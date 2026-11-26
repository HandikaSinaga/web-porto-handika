/*  */import type { Metadata } from "next";

export const SITE_URL = "https://www.handika.web.id";
export const SITE_NAME = "Handika Juan Putra Sinaga Portfolio";
export const DEFAULT_TITLE = "Handika Juan Putra Sinaga | Cloud & DevOps Engineer Portfolio";
export const DEFAULT_DESCRIPTION =
  "Explore Handika Juan Putra Sinaga's portfolio: production AWS architectures, Docker & CI/CD workflows, Grafana K6 benchmarks, and verified cloud credentials.";
export const OG_IMAGE_PATH = "/images/og-cover.png?v=2";

export function buildPageMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: "Handika Juan Putra Sinaga - Cloud & DevOps Engineer Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}
