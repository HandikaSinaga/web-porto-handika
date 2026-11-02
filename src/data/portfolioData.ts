import {
  contactData as contactDataID,
  educationData as educationDataID,
  trainingsData as trainingsDataID,
  experiencesData as experiencesDataID,
  projectsData as projectsDataID,
  certificationsData as certificationsDataID,
  skillCategoriesData as skillCategoriesDataID,
} from "./portfolioData.id";

import {
  contactDataEN,
  educationDataEN,
  trainingsDataEN,
  experiencesDataEN,
  projectsDataEN,
  certificationsDataEN,
  skillCategoriesDataEN,
} from "./portfolioData.en";

import { Language, useLanguage } from "@/context/LanguageContext";
import {
  ContactInfo,
  Education,
  WorkExperience,
  Training,
  Certification,
  Project,
  SkillCategory,
} from "@/types/portfolio";

// ========================================================
// 1. DEFAULT STATIC EXPORTS (Defaulting to Indonesian)
// ========================================================
export const contactData = contactDataID;
export const educationData = educationDataID;
export const trainingsData = trainingsDataID;
export const experiencesData = experiencesDataID;
export const projectsData = projectsDataID;
export const certificationsData = certificationsDataID;
export const skillCategoriesData = skillCategoriesDataID;

// Re-export language-specific datasets
export {
  contactDataID,
  educationDataID,
  trainingsDataID,
  experiencesDataID,
  projectsDataID,
  certificationsDataID,
  skillCategoriesDataID,
  contactDataEN,
  educationDataEN,
  trainingsDataEN,
  experiencesDataEN,
  projectsDataEN,
  certificationsDataEN,
  skillCategoriesDataEN,
};

// ========================================================
// 2. DYNAMIC ACCESSORS BY LANGUAGE ("EN" | "ID")
// ========================================================
export function getContactData(lang: Language): ContactInfo {
  return lang === "EN" ? contactDataEN : contactDataID;
}

export function getEducationData(lang: Language): Education {
  return lang === "EN" ? educationDataEN : educationDataID;
}

export function getTrainingsData(lang: Language): Training[] {
  return lang === "EN" ? trainingsDataEN : trainingsDataID;
}

export function getExperiencesData(lang: Language): WorkExperience[] {
  return lang === "EN" ? experiencesDataEN : experiencesDataID;
}

export function getProjectsData(lang: Language): Project[] {
  return lang === "EN" ? projectsDataEN : projectsDataID;
}

export function getCertificationsData(lang: Language): Certification[] {
  return lang === "EN" ? certificationsDataEN : certificationsDataID;
}

export function getSkillCategoriesData(lang: Language): SkillCategory[] {
  return lang === "EN" ? skillCategoriesDataEN : skillCategoriesDataID;
}

// ========================================================
// 3. REACT HOOK FOR REACTIVE LOCALIZED PORTFOLIO DATA
// ========================================================
export function usePortfolioData() {
  const { lang, isEN, isID, setLang, toggleLang, t } = useLanguage();

  return {
    lang,
    isEN,
    isID,
    setLang,
    toggleLang,
    t,
    contactData: getContactData(lang),
    educationData: getEducationData(lang),
    trainingsData: getTrainingsData(lang),
    experiencesData: getExperiencesData(lang),
    projectsData: getProjectsData(lang),
    certificationsData: getCertificationsData(lang),
    skillCategoriesData: getSkillCategoriesData(lang),
  };
}
