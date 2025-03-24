import { Link, InsertLink, links, type User, type InsertUser, users, type ContactMessage, type InsertContactMessage, contactMessages } from "@shared/schema";

// Interface with all the CRUD methods we need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Link methods
  getAllLinks(): Promise<Link[]>;
  getLink(id: number): Promise<Link | undefined>;
  createLink(link: InsertLink & { createdAt: string, featured: boolean }): Promise<Link>;
  updateLink(link: Link): Promise<Link>;
  updateLinkFeatured(id: number, featured: boolean): Promise<Link | undefined>;
  deleteLink(id: number): Promise<boolean>;
  getFeaturedLinks(): Promise<Link[]>;
  getLinksByCategory(category: string): Promise<Link[]>;
  searchLinks(query: string): Promise<Link[]>;
  
  // Contact message methods
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;
  deleteContactMessage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private links: Map<number, Link>;
  private contactMessages: Map<number, ContactMessage>;
  private userId: number;
  private linkId: number;
  private contactMessageId: number;

  constructor() {
    this.users = new Map();
    this.links = new Map();
    this.contactMessages = new Map();
    this.userId = 1;
    this.linkId = 1;
    this.contactMessageId = 1;
    
    // Add some test data
    // SFW links
    this.createLink({
      url: "https://crunchyroll.com",
      title: "Crunchyroll",
      description: "Stream anime online",
      category: "anime",
      tags: ["streaming", "official"],
      nsfw: false,
      createdAt: new Date().toISOString(),
      featured: true
    } as InsertLink & { createdAt: string, featured: boolean });
    
    this.createLink({
      url: "https://mangaplus.shueisha.co.jp",
      title: "Manga Plus",
      description: "Read manga officially from Shueisha",
      category: "manga",
      tags: ["reading", "official"],
      nsfw: false,
      createdAt: new Date().toISOString(),
      featured: false
    } as InsertLink & { createdAt: string, featured: boolean });
    
    // NSFW link
    this.createLink({
      url: "https://example-nsfw-anime.com",
      title: "Adult Anime Content",
      description: "Site with adult-oriented anime content",
      category: "anime",
      tags: ["adult", "18+"],
      nsfw: true,
      createdAt: new Date().toISOString(),
      featured: false
    } as InsertLink & { createdAt: string, featured: boolean });
    
    // Another NSFW link
    this.createLink({
      url: "https://example-nsfw-manga.com",
      title: "Adult Manga",
      description: "Adult manga collection",
      category: "manga",
      tags: ["adult", "mature"],
      nsfw: true,
      createdAt: new Date().toISOString(),
      featured: false
    } as InsertLink & { createdAt: string, featured: boolean });
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
    
    // Type assertion to properly define the structure of insertLink
    const typedLink = insertLink as unknown as {
      url: string;
      title: string;
      description: string;
      category: string;
      tags: string[];
      nsfw: boolean;
      createdAt: string;
      featured: boolean;
    };
    
    // Extract all the properties we need to create a valid Link object
    const {
      url,
      title,
      description,
      category,
      tags,
      nsfw = false, // Default to false if undefined
      createdAt,
      featured
    } = typedLink;
    
    // Create the complete link object
    const link: Link = {
      id,
      url,
      title,
      description,
      category,
      tags,
      nsfw,
      createdAt,
      featured
    };
    
    this.links.set(id, link);
    return link;
  }

  async updateLink(link: Link): Promise<Link> {
    // Ensure the link exists
    if (!this.links.has(link.id)) {
      throw new Error(`Link with ID ${link.id} not found`);
    }
    
    // Update the link in storage
    this.links.set(link.id, link);
    return link;
  }
  
  async updateLinkFeatured(id: number, featured: boolean): Promise<Link | undefined> {
    const link = this.links.get(id);
    if (!link) return undefined;
    
    const updatedLink = { ...link, featured };
    this.links.set(id, updatedLink);
    return updatedLink;
  }
  
  async deleteLink(id: number): Promise<boolean> {
    if (!this.links.has(id)) {
      return false;
    }
    
    return this.links.delete(id);
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
  
  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
  
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const now = new Date().toISOString();
    
    const message: ContactMessage = {
      id,
      name: insertMessage.name,
      email: insertMessage.email,
      message: insertMessage.message,
      createdAt: now,
      read: false
    };
    
    this.contactMessages.set(id, message);
    return message;
  }
  
  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, read: true };
    this.contactMessages.set(id, updatedMessage);
    return updatedMessage;
  }
  
  async deleteContactMessage(id: number): Promise<boolean> {
    if (!this.contactMessages.has(id)) {
      return false;
    }
    
    return this.contactMessages.delete(id);
  }
}

export const storage = new MemStorage();
