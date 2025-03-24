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
    
    // Initialize with links for Anime category
    // Add all anime websites to the initial data
    const animeLinks = [
      { url: "https://www.animekai.com", title: "AnimeKai", description: "Free anime streaming website" },
      { url: "https://animepahe.com", title: "animepahe", description: "High-quality anime streaming site" },
      { url: "https://www.hianime.com", title: "HiAnime", description: "Popular anime streaming platform" },
      { url: "https://www.animez.com", title: "AnimeZ", description: "Anime streaming with large collection" },
      { url: "https://www.crunchyroll.com", title: "Crunchyroll", description: "Legal anime streaming service with free tier" },
      { url: "https://www.youtube.com", title: "YouTube", description: "Video platform with anime content" },
      { url: "https://www.animestream.com", title: "AnimeStream", description: "Free anime streaming site" },
      { url: "https://www.kickassanime.com", title: "KickAssAnime", description: "Anime streaming with minimal ads" },
      { url: "https://www.animeowl.com", title: "AnimeOwl", description: "Free anime streaming site" },
      { url: "https://www.wco.tv", title: "WCO", description: "Watch Cartoon Online also has anime" },
      { url: "https://www.animegg.org", title: "ANIMEGG", description: "Free anime streaming site" },
      { url: "https://www.animenexus.com", title: "Anime Nexus", description: "Anime streaming platform" },
      { url: "https://www.animeonsen.com", title: "AnimeOnsen", description: "Free anime streaming site" },
      { url: "https://www.animeheaven.eu", title: "AnimeHeaven", description: "Popular anime streaming site" },
      { url: "https://www.bilibili.com", title: "Bilibili", description: "Chinese video sharing platform with anime" },
      { url: "https://www.hikari.com", title: "Hikari", description: "Anime streaming website" },
      { url: "https://www.allanime.com", title: "AllAnime", description: "Comprehensive anime streaming platform" },
      { url: "https://www.sudatchi.com", title: "Sudatchi", description: "Free anime streaming site" },
      { url: "https://www.animedefenders.com", title: "Anime defenders", description: "Anime streaming website" },
      { url: "https://www.anizone.com", title: "AniZone", description: "Free anime streaming platform" },
      { url: "https://www.miruro.com", title: "Miruro MULT", description: "Multilanguage anime streaming site" },
      { url: "https://www.gojo.com", title: "Gojo MULT", description: "Multilanguage anime platform" },
      { url: "https://www.shiroko.com", title: "Shiroko MULT", description: "Multilanguage anime streaming" },
      { url: "https://animixplay.name", title: "animixplay.name HIA", description: "High-quality anime streaming" },
      { url: "https://www.animeparadise.com", title: "AnimeParadise HIA", description: "High-quality anime content" },
      { url: "https://www.hidive.com", title: "HIDIVE", description: "Legal anime streaming service" },
      { url: "https://www.aniworld.com", title: "AniWorld", description: "Anime streaming platform" },
      { url: "https://www.anify.com", title: "Anify", description: "Free anime streaming website" },
      { url: "https://www.kuudere.com", title: "Kuudere", description: "Anime streaming site" },
      { url: "https://www.animehub.com", title: "AnimeHub", description: "Free anime streaming platform" },
      { url: "https://www.kisskh.com", title: "Kisskh", description: "Anime streaming site" },
      { url: "https://www.kawaiifu.com", title: "Kawaiifu", description: "Free anime streaming" },
      { url: "https://www.anime-stream.com", title: "Anime-Stream", description: "Anime streaming website" },
      { url: "https://www.aniplay.com", title: "AniPlay MULT", description: "Multilanguage anime streaming" },
      { url: "https://www.animerealms.com", title: "Anime Realms MULT", description: "Multilanguage anime platform" },
      { url: "https://www.vumeto.com", title: "Vumeto MULT", description: "Multilanguage anime content" },
      { url: "https://www.anikoto.com", title: "Anikoto MULT", description: "Multilanguage anime site" },
      { url: "https://www.animelon.com", title: "Animelon", description: "Learn Japanese while watching anime" },
      { url: "https://www.otaku-streamers.com", title: "Otaku-Streamers LOGIN", description: "Anime streaming with login required" },
      { url: "https://www.animehi.com", title: "AnimeHi MULT", description: "Multilanguage anime platform" },
      { url: "https://www.animia.com", title: "Animia MULT", description: "Multilanguage anime site" },
      { url: "https://www.aniversehd.com", title: "AniverseHD MULT", description: "HD multilanguage anime content" },
      { url: "https://aniwave.lv", title: "aniwave.lv HIA", description: "High-quality anime streaming" },
      { url: "https://www.freek.com", title: "Freek HIA", description: "Free anime streaming site" }
    ];
    
    // Add all anime links
    for (const link of animeLinks) {
      this.createLink({
        url: link.url,
        title: link.title,
        description: link.description,
        category: "anime",
        tags: ["anime", "streaming"],
        nsfw: false,
        createdAt: new Date().toISOString(),
        featured: false
      } as InsertLink & { createdAt: string, featured: boolean });
    }
    
    // Add a featured anime site
    this.createLink({
      url: "https://www.crunchyroll.com",
      title: "Crunchyroll",
      description: "Premium anime streaming service with free tier",
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

  constructor(primary: IStorage, fallback: IStorage) {
    this.primaryStorage = primary;
    this.fallbackStorage = fallback;
    console.log('ResilientStorage initialized with primary and fallback storage');
  }

  // Generic method to handle all operations with fallback support
  private async withFallback<T>(operation: () => Promise<T>, fallbackOperation: () => Promise<T>, methodName: string): Promise<T> {
    try {
      // First attempt with primary storage
      return await operation();
    } catch (error) {
      // Log the error and try the fallback
      console.error(`Error in ${methodName}, using fallback:`, error);
      try {
        return await fallbackOperation();
      } catch (fallbackError) {
        console.error(`Fallback also failed in ${methodName}:`, fallbackError);
        throw fallbackError; // If both fail, propagate the fallback error
      }
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.withFallback(
      () => this.primaryStorage.getUser(id),
      () => this.fallbackStorage.getUser(id),
      'getUser'
    );
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.withFallback(
      () => this.primaryStorage.getUserByUsername(username),
      () => this.fallbackStorage.getUserByUsername(username),
      'getUserByUsername'
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    return this.withFallback(
      () => this.primaryStorage.createUser(user),
      () => this.fallbackStorage.createUser(user),
      'createUser'
    );
  }

  // Link methods
  async getAllLinks(): Promise<Link[]> {
    return this.withFallback(
      () => this.primaryStorage.getAllLinks(),
      () => this.fallbackStorage.getAllLinks(),
      'getAllLinks'
    );
  }

  async getLink(id: number): Promise<Link | undefined> {
    return this.withFallback(
      () => this.primaryStorage.getLink(id),
      () => this.fallbackStorage.getLink(id),
      'getLink'
    );
  }

  async createLink(link: InsertLink & { createdAt: string, featured: boolean }): Promise<Link> {
    return this.withFallback(
      () => this.primaryStorage.createLink(link),
      () => this.fallbackStorage.createLink(link),
      'createLink'
    );
  }

  async updateLink(link: Link): Promise<Link> {
    return this.withFallback(
      () => this.primaryStorage.updateLink(link),
      () => this.fallbackStorage.updateLink(link),
      'updateLink'
    );
  }

  async updateLinkFeatured(id: number, featured: boolean): Promise<Link | undefined> {
    return this.withFallback(
      () => this.primaryStorage.updateLinkFeatured(id, featured),
      () => this.fallbackStorage.updateLinkFeatured(id, featured),
      'updateLinkFeatured'
    );
  }

  async deleteLink(id: number): Promise<boolean> {
    return this.withFallback(
      () => this.primaryStorage.deleteLink(id),
      () => this.fallbackStorage.deleteLink(id),
      'deleteLink'
    );
  }

  async getFeaturedLinks(): Promise<Link[]> {
    return this.withFallback(
      () => this.primaryStorage.getFeaturedLinks(),
      () => this.fallbackStorage.getFeaturedLinks(),
      'getFeaturedLinks'
    );
  }

  async getLinksByCategory(category: string): Promise<Link[]> {
    return this.withFallback(
      () => this.primaryStorage.getLinksByCategory(category),
      () => this.fallbackStorage.getLinksByCategory(category),
      'getLinksByCategory'
    );
  }

  async searchLinks(query: string): Promise<Link[]> {
    return this.withFallback(
      () => this.primaryStorage.searchLinks(query),
      () => this.fallbackStorage.searchLinks(query),
      'searchLinks'
    );
  }

  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return this.withFallback(
      () => this.primaryStorage.getAllContactMessages(),
      () => this.fallbackStorage.getAllContactMessages(),
      'getAllContactMessages'
    );
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.withFallback(
      () => this.primaryStorage.getContactMessage(id),
      () => this.fallbackStorage.getContactMessage(id),
      'getContactMessage'
    );
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    return this.withFallback(
      () => this.primaryStorage.createContactMessage(message),
      () => this.fallbackStorage.createContactMessage(message),
      'createContactMessage'
    );
  }

  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    return this.withFallback(
      () => this.primaryStorage.markContactMessageAsRead(id),
      () => this.fallbackStorage.markContactMessageAsRead(id),
      'markContactMessageAsRead'
    );
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    return this.withFallback(
      () => this.primaryStorage.deleteContactMessage(id),
      () => this.fallbackStorage.deleteContactMessage(id),
      'deleteContactMessage'
    );
  }
}

// Create the appropriate storage implementation
let storage: IStorage;

// Check for environment variable to determine which storage to use
const useFirebase = process.env.USE_FIREBASE === 'true';

// Create in-memory storage regardless
const memStorage = new MemStorage();

// Let's immediately check what links are available in memory storage
memStorage.getAllLinks().then(links => {
  console.log(`Memory Storage initialized with ${links.length} links`);
  const animeLinks = links.filter(link => link.category === 'anime');
  console.log(`Memory Storage has ${animeLinks.length} anime links`);
});

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
