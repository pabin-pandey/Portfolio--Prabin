export interface SiteSettings {
  name: string;
  domain: string;
  tagline: string;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface Hero {
  greeting: string;
  name: string;
  roles: string[];
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: HeroStat[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  gpa: string;
  details: string;
  highlight: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Skill {
  name: string;
  category: string;
  level: number;
}

export interface About {
  bio: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  certifications: string[];
  now: string;
}

export interface ProjectEmbed {
  type: "powerbi" | "tableau";
  url: string;
  fallbackText: string;
}

export interface ProjectCaseStudy {
  problem: string;
  approach: string;
  data: string;
  methods: string;
  results: string;
  learnings: string;
}

export interface ProjectLinks {
  [key: string]: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  tags: string[];
  tools: string[];
  metrics: string[];
  featured: boolean;
  caseStudy: ProjectCaseStudy;
  links: ProjectLinks;
  embed: ProjectEmbed | null;
  isGenAI?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  published: boolean;
  tags: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface Social {
  linkedin: string;
  github: string;
  [key: string]: string;
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
  social: Social;
  formMessage: string;
}

export interface Resume {
  buttonLabel: string;
  filePath: string;
}

export interface SiteContent {
  siteSettings: SiteSettings;
  seo: SEO;
  hero: Hero;
  about: About;
  projects: Project[];
  blog: BlogPost[];
  testimonials: Testimonial[];
  contact: Contact;
  resume: Resume;
}
