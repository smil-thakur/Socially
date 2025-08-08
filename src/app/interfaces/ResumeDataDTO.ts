export interface ResumeDataDTO {
  fullName: string | null;
  title: string | null;
  summary: string | null;
  skills: (string | null)[] | null;
  educations: (EducationDTO | null)[] | null;
  experiences: (ExperienceDTO | null)[] | null;
  projects: (ProjectDTO | null)[] | null;
}

export interface ExperienceDTO {
  role: string | null;
  company: string | null;
  years: string | null;
  summary: string | null;
}

export interface EducationDTO {
  degree: string | null;
  institution: string | null;
  year: string | null;
}

export interface ProjectDTO {
  name: string | null;
  techstack: (string | null)[] | null;
  year: string | null;
  summary: string | null;
}
