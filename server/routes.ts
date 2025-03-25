import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, getMemoryStorageInstance } from "./storage";
import { z } from "zod";
import { insertLinkSchema, insertContactMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";

export async function registerRoutes(app: Express): Promise<Server> {
  // API for links
  app.get("/api/links", async (req, res) => {
    try {
      console.log("GET /api/links - Fetching all links");
      const links = await storage.getAllLinks();
      console.log(`GET /api/links - Retrieved ${links.length} links`);
      
      // Debug: count links by category
      const categories: Record<string, number> = {};
      links.forEach(link => {
        categories[link.category] = (categories[link.category] || 0) + 1;
      });
      console.log("Links by category:", categories);
      
      res.json(links);
    } catch (error) {
      console.error("Error getting all links:", error);
      res.status(500).json({ message: "Failed to fetch links" });
    }
  });

  app.get("/api/links/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const link = await storage.getLink(id);
      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }

      res.json(link);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch link" });
    }
  });

  app.post("/api/links", async (req, res) => {
    try {
      const linkData = insertLinkSchema.parse(req.body);
      
      // Add current timestamp
      const newLink = {
        ...linkData,
        createdAt: new Date().toISOString(),
        featured: false // Default to non-featured
      };
      
      const createdLink = await storage.createLink(newLink);
      res.status(201).json(createdLink);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create link" });
    }
  });

  // API to feature/unfeature a link
  app.patch("/api/links/:id/featured", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const { featured } = z.object({ featured: z.boolean() }).parse(req.body);
      
      const updatedLink = await storage.updateLinkFeatured(id, featured);
      if (!updatedLink) {
        return res.status(404).json({ message: "Link not found" });
      }

      res.json(updatedLink);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to update link" });
    }
  });
  
  // API to update link
  app.patch("/api/links/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const linkData = insertLinkSchema.partial().parse(req.body);
      
      // Add ID to the data for the storage method
      const updatedLinkData = {
        ...linkData,
        id
      };
      
      const existingLink = await storage.getLink(id);
      if (!existingLink) {
        return res.status(404).json({ message: "Link not found" });
      }
      
      // Create updated link combining existing data with new data
      const updatedLink = {
        ...existingLink,
        ...updatedLinkData
      };
      
      const result = await storage.updateLink(updatedLink);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to update link" });
    }
  });
  
  // API to delete link
  app.delete("/api/links/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteLink(id);
      if (!success) {
        return res.status(404).json({ message: "Link not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete link" });
    }
  });

  // API to get links by category
  app.get("/api/categories/:category/links", async (req, res) => {
    try {
      const { category } = req.params;
      console.log(`GET /api/categories/${category}/links - Fetching links for category: ${category}`);
      
      const links = await storage.getLinksByCategory(category);
      console.log(`GET /api/categories/${category}/links - Retrieved ${links.length} links`);
      
      // Debug: log first 3 links if available
      if (links.length > 0) {
        console.log(`First ${Math.min(3, links.length)} links in ${category} category:`, 
          links.slice(0, 3).map(l => ({ id: l.id, title: l.title })));
      }
      
      res.json(links);
    } catch (error) {
      console.error(`Error getting links for category ${req.params.category}:`, error);
      res.status(500).json({ message: "Failed to fetch links for category" });
    }
  });

  // API to get featured links
  app.get("/api/links/featured", async (req, res) => {
    try {
      const links = await storage.getFeaturedLinks();
      res.json(links);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured links" });
    }
  });

  // Search API
  app.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const links = await storage.searchLinks(q);
      res.json(links);
    } catch (error) {
      res.status(500).json({ message: "Failed to search links" });
    }
  });

  // Contact Message APIs
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Received contact form submission:", req.body);
      
      // Validate the contact message data
      const messageData = insertContactMessageSchema.parse(req.body);
      console.log("Validated contact form data:", messageData);
      
      try {
        // Try to use the configured storage (FirebaseStorage with fallback)
        const createdMessage = await storage.createContactMessage(messageData);
        console.log("Successfully created contact message:", createdMessage);
        
        return res.status(201).json(createdMessage);
      } catch (storageError) {
        console.error("Storage error creating contact message:", storageError);
        
        try {
          // Explicitly try the in-memory fallback as a last resort
          console.log("Explicitly trying in-memory storage as fallback...");
          const memStorage = getMemoryStorageInstance();
          const createdMessage = await memStorage.createContactMessage(messageData);
          console.log("Successfully created contact message with fallback storage:", createdMessage);
          
          return res.status(201).json(createdMessage);
        } catch (fallbackError) {
          console.error("Even fallback storage failed:", fallbackError);
          throw storageError; // Re-throw the original error
        }
      }
    } catch (error) {
      console.error("Error details:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to submit contact message" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  app.patch("/api/contact/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const updatedMessage = await storage.markContactMessageAsRead(id);
      if (!updatedMessage) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      res.json(updatedMessage);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });

  app.delete("/api/contact/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteContactMessage(id);
      if (!success) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete message" });
    }
  });

  // Anime News API
  app.get("/api/news", async (req, res) => {
    try {
      console.log("Fetching anime news from Anime News Network...");
      const response = await fetch("https://www.animenewsnetwork.com/newsroom/rss.xml");
      
      if (!response.ok) {
        console.error("Failed to fetch from ANN:", response.statusText);
        return res.status(502).json({ message: "Failed to fetch from news source" });
      }
      
      const xmlData = await response.text();
      const result = await parseStringPromise(xmlData, { explicitArray: false });
      
      if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
        console.error("Invalid RSS format received");
        return res.status(502).json({ message: "Invalid news data format" });
      }
      
      // Ensure items is always an array
      const items = Array.isArray(result.rss.channel.item) 
        ? result.rss.channel.item 
        : [result.rss.channel.item];
      
      // Process and transform the news items
      const newsItems = items.slice(0, 20).map((item: any, index: number) => {
        // Extract image from description if available
        let thumbnail = null;
        if (item.description) {
          const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch && imgMatch[1]) {
            thumbnail = imgMatch[1];
          }
        }
        
        // Clean description text
        let cleanDescription = item.description || "";
        cleanDescription = cleanDescription.replace(/<[^>]*>/g, ""); // Remove HTML tags
        
        return {
          id: item.guid || `news-${index}`,
          title: item.title || "Untitled",
          description: cleanDescription,
          url: item.link || "",
          date: item.pubDate || new Date().toISOString(),
          thumbnail: thumbnail
        };
      });
      
      console.log(`Successfully fetched ${newsItems.length} anime news items`);
      res.json(newsItems);
    } catch (error) {
      console.error("Error fetching anime news:", error);
      res.status(500).json({ message: "Failed to fetch anime news" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
