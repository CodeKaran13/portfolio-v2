import type { ComponentType } from 'react';

export interface Project {
  codename: string;
  engine: string;
  engineColor: string;
  title: string;
  role: string;
  platform: string;
  year: string;
  status: string;
  bullets: string[];
  tags: string[];
  caseStudy: string;
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
