export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tech: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  slug?: string;
}

export interface Principle {
  statement: string;
  context: string;
}

export interface Skill {
  name: string;
  icon: string;
}
