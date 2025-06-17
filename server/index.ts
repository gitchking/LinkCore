import 'dotenv/config'; // Load environment variables
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { Link } from './types';
import { storage } from './storage';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add caching for links
const linksCache = new Map<string, any>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper function to get cached data
function getCachedData(key: string) {
  const cached = linksCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

// Helper function to set cached data
function setCachedData(key: string, data: any) {
  linksCache.set(key, {
    data,
    timestamp: Date.now()
  });
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 3000
  // this serves both the API and the client.
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    log(`[express] serving on port ${PORT}`);
  });
})();

// Update the links endpoint to support pagination
app.get('/api/links', async (req, res) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const cacheKey = `links:${category}:${page}:${limit}`;
    
    // Try to get from cache first
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Get all links
    const links = await storage.getAllLinks();
    
    // Filter by category if specified
    let filteredLinks = links;
    if (category) {
      filteredLinks = links.filter((link: Link) => link.category === category);
    }

    // Calculate pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedLinks = filteredLinks.slice(startIndex, endIndex);

    // Cache the results
    setCachedData(cacheKey, paginatedLinks);

    res.json(paginatedLinks);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Failed to fetch links' });
  }
});
