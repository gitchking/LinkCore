export interface Link {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  nsfw: boolean;
  createdAt: string;
  featured: boolean;
  views: number;
}

export interface InsertLink {
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  nsfw: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface InsertUser {
  username: string;
  email: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface InsertContactMessage {
  name: string;
  email: string;
  message: string;
} 