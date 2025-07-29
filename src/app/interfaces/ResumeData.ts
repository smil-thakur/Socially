export interface ResumeData {
  fullName: string;
  title: string;
  summary: string;
  skills: string[];
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
}

export interface Experience {
  role: string;
  company: string;
  years: string;
  summary: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Project {
  name: string;
  techstack: string[];
  year: string;
  summary: string;
}
