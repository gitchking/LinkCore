export interface Link {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  nsfw: boolean;
  createdAt: string;
} 