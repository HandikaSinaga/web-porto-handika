import type { Metadata } from "next";

export const SITE_URL = "https://www.handika.web.id";
export const SITE_NAME = "Handika Juan Putra Sinaga";
export const DEFAULT_TITLE = "Handika Juan Putra Sinaga | Cloud & DevOps Engineer";
export const DEFAULT_DESCRIPTION =
  "Cut AWS costs by ~28.8% while scaling live workloads. Cloud & DevOps Engineer skilled in AWS, Docker, CI/CD, Linux, Prometheus & Grafana. Explore projects & CV.";
export const OG_IMAGE_PATH = "/images/profile.jpg";

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
          width: 1024,
          height: 1024,
          alt: `${SITE_NAME} - Cloud & DevOps Engineer`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}
