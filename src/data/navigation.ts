import type { Language } from "@/context/LanguageContext";

export type SectionKey =
  | "home"
  | "about"
  | "education"
  | "experience"
  | "portfolio"
  | "certifications"
  | "contact";

export interface NavSectionItem {
  key: SectionKey;
  domId: string;
  hashEN: string;
  hashID: string;
  labelEN: string;
  labelID: string;
  routeMatch: string;
}

export const NAV_SECTIONS: NavSectionItem[] = [
  { key: "home", domId: "home", hashEN: "home", hashID: "beranda", labelEN: "Home", labelID: "Beranda", routeMatch: "/" },
  { key: "about", domId: "about", hashEN: "about", hashID: "tentang", labelEN: "About", labelID: "Tentang Saya", routeMatch: "/about" },
  { key: "education", domId: "pendidikan", hashEN: "education", hashID: "pendidikan", labelEN: "Education", labelID: "Pendidikan", routeMatch: "/skills" },
  { key: "experience", domId: "pengalaman", hashEN: "experience", hashID: "pengalaman", labelEN: "Experience", labelID: "Pengalaman", routeMatch: "/resume" },
  { key: "portfolio", domId: "portfolio", hashEN: "portfolio", hashID: "portfolio", labelEN: "Portfolio", labelID: "Portfolio", routeMatch: "/portfolio" },
  { key: "certifications", domId: "sertifikasi", hashEN: "certifications", hashID: "sertifikasi", labelEN: "Certifications", labelID: "Sertifikasi", routeMatch: "/certifications" },
  { key: "contact", domId: "contact", hashEN: "contact", hashID: "kontak", labelEN: "Contact", labelID: "Kontak", routeMatch: "/contact" },
];

export function getSectionHash(key: SectionKey, lang: Language): string {
  const item = NAV_SECTIONS.find((s) => s.key === key);
  if (!item) return key;
  return lang === "EN" ? item.hashEN : item.hashID;
}

export function getSectionHref(key: SectionKey, lang: Language): string {
  return `/#${getSectionHash(key, lang)}`;
}

export function getSectionDomId(key: SectionKey): string {
  return NAV_SECTIONS.find((s) => s.key === key)?.domId ?? key;
}

export function translateSectionHash(currentHash: string, targetLang: Language): string | null {
  const clean = currentHash.replace(/^#/, "");
  const item = NAV_SECTIONS.find((s) => s.hashEN === clean || s.hashID === clean || s.domId === clean);
  if (!item) return null;
  return `#${targetLang === "EN" ? item.hashEN : item.hashID}`;
}
