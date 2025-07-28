export interface ResumeData {
  fullName: string;
  title: string;
  summary: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  experience: {
    role: string;
    company: string;
    years: number;
    summary: string;
  }[];
  projects: {
    name: string;
    techstack: string[];
    year: number;
    summary: string;
  }[];
}
