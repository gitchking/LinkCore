import { Link, InsertLink, links, type User, type InsertUser, users } from "@shared/schema";

// Interface with all the CRUD methods we need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Link methods
  getAllLinks(): Promise<Link[]>;
  getLink(id: number): Promise<Link | undefined>;
  createLink(link: InsertLink & { createdAt: string, featured: boolean }): Promise<Link>;
  updateLinkFeatured(id: number, featured: boolean): Promise<Link | undefined>;
  getFeaturedLinks(): Promise<Link[]>;
  getLinksByCategory(category: string): Promise<Link[]>;
  searchLinks(query: string): Promise<Link[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private links: Map<number, Link>;
  private userId: number;
  private linkId: number;

  constructor() {
    this.users = new Map();
    this.links = new Map();
    this.userId = 1;
    this.linkId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Link methods
  async getAllLinks(): Promise<Link[]> {
    return Array.from(this.links.values());
  }

  async getLink(id: number): Promise<Link | undefined> {
    return this.links.get(id);
  }

  async createLink(insertLink: InsertLink & { createdAt: string, featured: boolean }): Promise<Link> {
    const id = this.linkId++;
    const link: Link = { ...insertLink, id };
    this.links.set(id, link);
    return link;
  }

  async updateLinkFeatured(id: number, featured: boolean): Promise<Link | undefined> {
    const link = this.links.get(id);
    if (!link) return undefined;
    
    const updatedLink = { ...link, featured };
    this.links.set(id, updatedLink);
    return updatedLink;
  }

  async getFeaturedLinks(): Promise<Link[]> {
    return Array.from(this.links.values()).filter(link => link.featured);
  }

  async getLinksByCategory(category: string): Promise<Link[]> {
    return Array.from(this.links.values()).filter(link => link.category === category);
  }

  async searchLinks(query: string): Promise<Link[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.links.values()).filter(link => 
      link.title.toLowerCase().includes(lowerQuery) ||
      (link.description && link.description.toLowerCase().includes(lowerQuery)) ||
      link.url.toLowerCase().includes(lowerQuery) ||
      (link.tags && link.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }
}

export const storage = new MemStorage();
