export interface ProjectTeamMember {
  name: string;
  role: string;
  isLeader?: boolean;
}

export interface ProjectObjective {
  objective: string;
  goal: string;
}

export interface ProjectTimelineItem {
  period: string;
  milestone: string;
  tasks: string[];
  deliverables: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectImage {
  url: string;
  title: string;
  caption: string;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  organization: string;
  period?: string;
  description: string;
  details: string[];
  techStack: string[];
  architectureHighlights: string[];
  category: "Client Project" | "MSIB Project" | "Infrastructure" | "Cloud";
  githubUrl?: string;
  liveUrl?: string;
  presentationUrl?: string;
  documentationUrl?: string;
  teamName?: string;
  teamMembers?: ProjectTeamMember[];
  painPoints?: { number: string; title: string; desc: string }[];
  objectives?: ProjectObjective[];
  functionalReqs?: { title: string; desc: string }[];
  nonFunctionalReqs?: { title: string; desc: string }[];
  implementationSteps?: string[];
  challenges?: ProjectChallenge[];
  acceptanceCriteria?: string[];
  timelinePhases?: ProjectTimelineItem[];
  nodeFlow?: string[];
  backgroundSummary?: string;
  solutionHighlights?: string[];
  gallery?: ProjectImage[];
  relatedExperienceId?: string;
  relatedExperienceCompany?: string;
  relatedExperienceRole?: string;
  architectureDetails?: {
    region: string;
    zones: string[];
    webTier: string;
    appTier: string;
    dbTier: string;
    networkSecurity: string;
    monitoring: string;
  };
}

export interface ExperienceCertificate {
  id: string;
  title: string;
  issuer: string;
  organization: string;
  program: string;
  credentialId?: string;
  nim?: string;
  period?: string;
  issueDate?: string;
  signatory?: string;
  imageUrl: string;
  description: string;
  skills?: string[];
  verificationUrl?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  placementProgram?: string;
  placementPartner?: string;
  placementNote?: string;
  description?: string;
  highlights: string[];
  techStack: string[];
  relatedProjectId?: string;
  relatedProjectTitle?: string;
  relatedProjectRole?: string;
  certificates?: ExperienceCertificate[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  gpa: string;
  location?: string;
  highlights: string[];
}

export interface Training {
  title: string;
  issuer: string;
  program: string;
  description: string[];
  skillsGained: string[];
  credentialId?: string;
  verificationUrl?: string;
  imageUrl?: string;
  issueDate?: string;
  hours?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  skills: string[];
  category: "Cloud" | "Networking" | "Development" | "Internship";
  imageUrl?: string;
  verificationUrl?: string;
  description?: string;
  signatory?: string;
}

export interface SkillCategory {
  categoryName: string;
  description: string;
  skills: {
    name: string;
    level: "Advanced" | "Proficient" | "Familiar";
    iconName: string;
    details?: string;
  }[];
}

export interface ContactInfo {
  name: string;
  fullName: string;
  roles: string[];
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  linkedin: string;
  github: string;
  cvUrl?: string;
  summary: string;
}
