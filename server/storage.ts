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

class MemStorage implements IStorage {
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

import { FirebaseStorage } from './firebaseStorage';

// Create a resilient storage class that wraps FirebaseStorage and falls back to MemStorage
class ResilientStorage implements IStorage {
  private primaryStorage: IStorage;
  private fallbackStorage: IStorage;
  private usesFallback: boolean = false;

  constructor(primary: IStorage, fallback: IStorage) {
    this.primaryStorage = primary;
    this.fallbackStorage = fallback;
  }

  private async withFallback<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (!this.usesFallback) {
        console.error('Firebase operation failed, switching to in-memory fallback:', error);
        this.usesFallback = true;
      }
      // Re-throw specific errors that are not related to Firebase connection
      throw error;
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      return await this.primaryStorage.getUser(id);
    } catch (error) {
      console.error('Error in getUser, using fallback:', error);
      return this.fallbackStorage.getUser(id);
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      return await this.primaryStorage.getUserByUsername(username);
    } catch (error) {
      console.error('Error in getUserByUsername, using fallback:', error);
      return this.fallbackStorage.getUserByUsername(username);
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      return await this.primaryStorage.createUser(user);
    } catch (error) {
      console.error('Error in createUser, using fallback:', error);
      return this.fallbackStorage.createUser(user);
    }
  }

  // Link methods
  async getAllLinks(): Promise<Link[]> {
    try {
      return await this.primaryStorage.getAllLinks();
    } catch (error) {
      console.error('Error in getAllLinks, using fallback:', error);
      return this.fallbackStorage.getAllLinks();
    }
  }

  async getLink(id: number): Promise<Link | undefined> {
    try {
      return await this.primaryStorage.getLink(id);
    } catch (error) {
      console.error('Error in getLink, using fallback:', error);
      return this.fallbackStorage.getLink(id);
    }
  }

  async createLink(link: InsertLink & { createdAt: string, featured: boolean }): Promise<Link> {
    try {
      return await this.primaryStorage.createLink(link);
    } catch (error) {
      console.error('Error in createLink, using fallback:', error);
      return this.fallbackStorage.createLink(link);
    }
  }

  async updateLink(link: Link): Promise<Link> {
    try {
      return await this.primaryStorage.updateLink(link);
    } catch (error) {
      console.error('Error in updateLink, using fallback:', error);
      return this.fallbackStorage.updateLink(link);
    }
  }

  async updateLinkFeatured(id: number, featured: boolean): Promise<Link | undefined> {
    try {
      return await this.primaryStorage.updateLinkFeatured(id, featured);
    } catch (error) {
      console.error('Error in updateLinkFeatured, using fallback:', error);
      return this.fallbackStorage.updateLinkFeatured(id, featured);
    }
  }

  async deleteLink(id: number): Promise<boolean> {
    try {
      return await this.primaryStorage.deleteLink(id);
    } catch (error) {
      console.error('Error in deleteLink, using fallback:', error);
      return this.fallbackStorage.deleteLink(id);
    }
  }

  async getFeaturedLinks(): Promise<Link[]> {
    try {
      return await this.primaryStorage.getFeaturedLinks();
    } catch (error) {
      console.error('Error in getFeaturedLinks, using fallback:', error);
      return this.fallbackStorage.getFeaturedLinks();
    }
  }

  async getLinksByCategory(category: string): Promise<Link[]> {
    try {
      return await this.primaryStorage.getLinksByCategory(category);
    } catch (error) {
      console.error('Error in getLinksByCategory, using fallback:', error);
      return this.fallbackStorage.getLinksByCategory(category);
    }
  }

  async searchLinks(query: string): Promise<Link[]> {
    try {
      return await this.primaryStorage.searchLinks(query);
    } catch (error) {
      console.error('Error in searchLinks, using fallback:', error);
      return this.fallbackStorage.searchLinks(query);
    }
  }

  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    try {
      return await this.primaryStorage.getAllContactMessages();
    } catch (error) {
      console.error('Error in getAllContactMessages, using fallback:', error);
      return this.fallbackStorage.getAllContactMessages();
    }
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    try {
      return await this.primaryStorage.getContactMessage(id);
    } catch (error) {
      console.error('Error in getContactMessage, using fallback:', error);
      return this.fallbackStorage.getContactMessage(id);
    }
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    try {
      return await this.primaryStorage.createContactMessage(message);
    } catch (error) {
      console.error('Error in createContactMessage, using fallback:', error);
      return this.fallbackStorage.createContactMessage(message);
    }
  }

  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    try {
      return await this.primaryStorage.markContactMessageAsRead(id);
    } catch (error) {
      console.error('Error in markContactMessageAsRead, using fallback:', error);
      return this.fallbackStorage.markContactMessageAsRead(id);
    }
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    try {
      return await this.primaryStorage.deleteContactMessage(id);
    } catch (error) {
      console.error('Error in deleteContactMessage, using fallback:', error);
      return this.fallbackStorage.deleteContactMessage(id);
    }
  }
}

// Create the appropriate storage implementation
let storage: IStorage;

// Check for environment variable to determine which storage to use
const useFirebase = process.env.USE_FIREBASE === 'true';

// Create in-memory storage regardless
const memStorage = new MemStorage();

if (useFirebase) {
  try {
    console.log('Setting up resilient storage with Firebase primary and in-memory fallback');
    const firebaseStorage = new FirebaseStorage();
    // Create a resilient storage that will gracefully fall back to in-memory if Firebase fails
    storage = new ResilientStorage(firebaseStorage, memStorage);
  } catch (error) {
    console.error('Error initializing Firebase storage:', error);
    console.log('Using in-memory storage due to Firebase initialization failure');
    storage = memStorage;
  }
} else {
  console.log('Using in-memory storage (by configuration)');
  storage = memStorage;
}

// Export a function to get a new memory storage instance when needed
export function getMemoryStorageInstance() {
  return new MemStorage();
}

export { storage };
