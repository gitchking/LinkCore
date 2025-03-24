import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertLinkSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API for links
  app.get("/api/links", async (req, res) => {
    try {
      const links = await storage.getAllLinks();
      res.json(links);
    } catch (error) {
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
      const links = await storage.getLinksByCategory(category);
      res.json(links);
    } catch (error) {
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

  const httpServer = createServer(app);
  return httpServer;
}
