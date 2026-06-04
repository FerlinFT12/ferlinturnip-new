/**
 * Type declarations for Ferlin Firdaus Turnip's Portfolio & SEO Blog
 */

export interface Competency {
  title: string;
  description: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  tasks: string[];
  projectsDelivered?: string[];
  categories: ("Project Management" | "System Analysis" | "Enterprise Architecture" | "Development")[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  focusAreas: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  courses?: string[];
  year?: string;
}

export interface ProjectPortfolio {
  id: string;
  title: string;
  alias?: string;
  client?: string;
  platform?: string;
  description: string;
  role: string;
  deliverables?: {
    charter?: string;
    fsd?: string;
    brd?: string;
    uiux?: string;
    achievement?: string;
  };
  details: string[];
  tags: string[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  focusKeywords: string[];
  schemaMarkup: string; // JSON-LD string
  seoScore: number;
  suggestions: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: string;
  seoMetadata: SeoMetadata;
  isAiGeneratedSeo?: boolean;
}

export interface CvData {
  name: string;
  title: string;
  contact: {
    phone: string;
    email: string;
    location: string;
    linkedin: string;
  };
  profile: string;
  competencies: Competency[];
  experiences: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  skillsAndTools: {
    category: string;
    items: string[];
  }[];
}
