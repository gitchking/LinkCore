import { db } from './firebase';
import { User, Link, ContactMessage, InsertUser, InsertLink, InsertContactMessage } from '@shared/schema';
import { IStorage } from './storage';

export class FirebaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const userDoc = await db.collection('users').doc(id.toString()).get();
    if (!userDoc.exists) return undefined;
    return userDoc.data() as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('username', '==', username).limit(1).get();
    
    if (snapshot.empty) return undefined;
    return snapshot.docs[0].data() as User;
  }

  async createUser(user: InsertUser): Promise<User> {
    // Get the next ID
    const counterRef = db.collection('counters').doc('users');
    const counterDoc = await counterRef.get();
    
    let id = 1;
    if (counterDoc.exists) {
      const counter = counterDoc.data();
      id = (counter?.value || 0) + 1;
      await counterRef.update({ value: id });
    } else {
      await counterRef.set({ value: id });
    }
    
    const newUser: User = { ...user, id };
    await db.collection('users').doc(id.toString()).set(newUser);
    return newUser;
  }

  // Link methods
  async getAllLinks(): Promise<Link[]> {
    const snapshot = await db.collection('links').get();
    return snapshot.docs.map(doc => doc.data() as Link);
  }

  async getLink(id: number): Promise<Link | undefined> {
    const linkDoc = await db.collection('links').doc(id.toString()).get();
    if (!linkDoc.exists) return undefined;
    return linkDoc.data() as Link;
  }

  async createLink(link: InsertLink & { createdAt: string, featured: boolean }): Promise<Link> {
    // Get the next ID
    const counterRef = db.collection('counters').doc('links');
    const counterDoc = await counterRef.get();
    
    let id = 1;
    if (counterDoc.exists) {
      const counter = counterDoc.data();
      id = (counter?.value || 0) + 1;
      await counterRef.update({ value: id });
    } else {
      await counterRef.set({ value: id });
    }
    
    // Create a properly typed Link object
    const newLink: Link = {
      id,
      url: link.url,
      title: link.title,
      description: link.description ?? null,
      category: link.category,
      tags: link.tags ?? [],
      featured: link.featured,
      nsfw: link.nsfw ?? false,
      createdAt: link.createdAt
    };
    await db.collection('links').doc(id.toString()).set(newLink);
    return newLink;
  }

  async updateLink(link: Link): Promise<Link> {
    await db.collection('links').doc(link.id.toString()).update(link);
    return link;
  }

  async updateLinkFeatured(id: number, featured: boolean): Promise<Link | undefined> {
    const linkRef = db.collection('links').doc(id.toString());
    const linkDoc = await linkRef.get();
    
    if (!linkDoc.exists) return undefined;
    
    await linkRef.update({ featured });
    return { ...linkDoc.data(), featured } as Link;
  }

  async deleteLink(id: number): Promise<boolean> {
    const linkRef = db.collection('links').doc(id.toString());
    const linkDoc = await linkRef.get();
    
    if (!linkDoc.exists) return false;
    
    await linkRef.delete();
    return true;
  }

  async getFeaturedLinks(): Promise<Link[]> {
    const snapshot = await db.collection('links').where('featured', '==', true).get();
    return snapshot.docs.map(doc => doc.data() as Link);
  }

  async getLinksByCategory(category: string): Promise<Link[]> {
    const snapshot = await db.collection('links').where('category', '==', category).get();
    return snapshot.docs.map(doc => doc.data() as Link);
  }

  async searchLinks(query: string): Promise<Link[]> {
    // Firebase doesn't support full-text search natively
    // For simplicity, we'll do a client-side search on all links
    const allLinks = await this.getAllLinks();
    const lowercaseQuery = query.toLowerCase();
    
    return allLinks.filter(link => 
      link.title.toLowerCase().includes(lowercaseQuery) || 
      (link.description && link.description.toLowerCase().includes(lowercaseQuery)) ||
      link.url.toLowerCase().includes(lowercaseQuery) ||
      (link.tags && link.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
    );
  }

  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    const snapshot = await db.collection('contactMessages').get();
    return snapshot.docs.map(doc => doc.data() as ContactMessage);
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const messageDoc = await db.collection('contactMessages').doc(id.toString()).get();
    if (!messageDoc.exists) return undefined;
    return messageDoc.data() as ContactMessage;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    // Get the next ID
    const counterRef = db.collection('counters').doc('contactMessages');
    const counterDoc = await counterRef.get();
    
    let id = 1;
    if (counterDoc.exists) {
      const counter = counterDoc.data();
      id = (counter?.value || 0) + 1;
      await counterRef.update({ value: id });
    } else {
      await counterRef.set({ value: id });
    }
    
    const newMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt: new Date().toISOString(),
      read: false
    };
    await db.collection('contactMessages').doc(id.toString()).set(newMessage);
    return newMessage;
  }

  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const messageRef = db.collection('contactMessages').doc(id.toString());
    const messageDoc = await messageRef.get();
    
    if (!messageDoc.exists) return undefined;
    
    await messageRef.update({ read: true });
    return { ...messageDoc.data(), read: true } as ContactMessage;
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    const messageRef = db.collection('contactMessages').doc(id.toString());
    const messageDoc = await messageRef.get();
    
    if (!messageDoc.exists) return false;
    
    await messageRef.delete();
    return true;
  }
}