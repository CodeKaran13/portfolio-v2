import type { ComponentType } from 'react';

export interface Project {
  slug: string;
  codename: string;
  title: string;
  role: string;
  engine: 'Unity' | 'Unreal Engine 5';
  engineColor: string;
  platform: string;
  year: number;
  status: 'Live on Play Store' | 'Shipped' | 'In Development';
  summary: string;
  owned: string[];
  decisions: { title: string; rationale: string }[];
  tags: string[];
  media: {
    image: string;
    video?: string;
    videoPoster?: string;
  };
  links: {
    caseStudy: string;
    gameplay?: string;
  };
}

export interface System {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  Diagram: ComponentType;
  detail: string;
}

export interface Role {
  title: string;
  company: string;
  period: string;
  type: string;
  bullets: string[];
  tags: string[];
  accent: string;
}

export interface Post {
  slug: string;
  tag: string;
  tagColor: string;
  title: string;
  summary: string;
  engine: string;
  readTime: string;
  href: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  hud: string;
}

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  readTime: string;
  engine: string;
  summary: string;
  content: ContentBlock[];
}

export interface CaseStudySubSection {
  title: string;
  intro?: string;
  bulletLabel?: string;
  items: string[];
  footer?: string;
}

export interface CaseStudyDecision {
  index: string;
  title: string;
  before: string[];
  bulletLabel?: string;
  bullets?: string[];
  transition?: string[];
  bulletLabel2?: string;
  bullets2?: string[];
  subsections?: CaseStudySubSection[];
  after?: string[];
}

export interface CaseStudy {
  slug: string;
  subtitle: string;
  techTags: string[];
  intro: string[];

  overview: string[];
  overviewBullets?: string[];
  overviewPost?: string[];

  ownership: {
    intro: string;
    items: string[];
    footer: string;
  };

  challenge: {
    opening: string[];
    bottlenecks?: string[];
    connector?: string;
    notText?: string;
    wasText?: string;
    realQuestion?: string;
    closing: string;
  };

  decisions: CaseStudyDecision[];

  results: {
    opening: string;
    items: string[];
    closing: string[];
  };

  improvements: {
    opening: string;
    items: string[];
    closing: string[];
  };

  reflection: {
    opening: string[];
    principle: string;
    closing: string[];
  };
}
