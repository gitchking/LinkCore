import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function addSite(site) {
  try {
    // Read existing links
    const linksFilePath = path.join(__dirname, 'links.json');
    const linksData = JSON.parse(fs.readFileSync(linksFilePath, 'utf8'));
    
    // Check if the site already exists
    const exists = linksData.links.some(link => link.url === site.url);
    
    if (!exists) {
      // Find the highest ID to ensure uniqueness
      const highestId = Math.max(...linksData.links.map(link => link.id), 0);
      
      // Create a new link
      const newLink = {
        id: highestId + 1,
        url: site.url,
        title: site.title,
        description: site.description,
        category: "ASMR",
        tags: site.tags || ["asmr"],
        featured: false,
        nsfw: site.nsfw || true // Default to NSFW for ASMR sites since most are adult content
      };
      
      // Add the link to the data
      linksData.links.push(newLink);
      
      // Write back to file
      fs.writeFileSync(linksFilePath, JSON.stringify(linksData, null, 2));
      
      console.log(`Added site: ${site.title}`);
      return true;
    } else {
      console.log(`Site already exists: ${site.url}`);
      return false;
    }
  } catch (error) {
    console.error(`Error adding site: ${error.message}`);
    throw error;
  }
}

async function addAllSites() {
  // The remaining mainstream porn sites with hentai ASMR content
  const asmrSites = [
    {
      url: "https://www.pornhub.com/video/search?search=hentai+asmr",
      title: "Pornhub (Hentai ASMR Category)",
      description: "A mainstream porn site with a growing hentai ASMR section, featuring free audio uploads with hentai visuals.",
      tags: ["asmr", "hentai", "mainstream", "visuals"],
      nsfw: true
    },
    {
      url: "https://www.xvideos.com/?k=hentai+asmr",
      title: "XVideos (Hentai ASMR)",
      description: "Hosts a collection of hentai ASMR videos, often audio-focused with static images, free to stream.",
      tags: ["asmr", "hentai", "streaming", "static images"],
      nsfw: true
    },
    {
      url: "https://www.xnxx.com/search/hentai+asmr",
      title: "Xnxx (Hentai ASMR)",
      description: "An adult tube with over 30,000 hentai ASMR clips, emphasizing high-quality audio porn from various creators.",
      tags: ["asmr", "hentai", "clips", "creators"],
      nsfw: true
    },
    {
      url: "https://www.literotica.com/c/audio-sex-stories",
      title: "Literotica (Audio Section)",
      description: "Offers erotic audio stories, including some hentai-themed ASMR narrated by users, free with text accompaniment.",
      tags: ["asmr", "stories", "narration", "text"],
      nsfw: true
    },
    {
      url: "https://www.lushstories.com",
      title: "LushStories (Audio)",
      description: "A site with audio sex stories, including occasional hentai ASMR submissions from its community.",
      tags: ["asmr", "stories", "community", "submissions"],
      nsfw: true
    },
    {
      url: "https://www.nutaku.net",
      title: "Nutaku (Audio Content)",
      description: "A platform for adult games, some of which include hentai ASMR audio tracks as part of their experience, often premium.",
      tags: ["asmr", "games", "premium", "tracks"],
      nsfw: true
    },
    {
      url: "https://www.erolabs.com",
      title: "EROLABS (Audio Features)",
      description: "A mobile adult gaming site with hentai ASMR elements in certain titles, blending audio with interactive content.",
      tags: ["asmr", "mobile", "interactive", "gaming"],
      nsfw: true
    }
  ];
  
  let addedCount = 0;
  
  // Add all sites
  for (const site of asmrSites) {
    const added = await addSite(site);
    if (added) addedCount++;
  }
  
  console.log(`Added ${addedCount} new ASMR sites`);
  return addedCount;
}

// Run the main function
addAllSites()
  .then(count => console.log(`Done! Added ${count} ASMR sites.`))
  .catch(error => console.error(`Failed: ${error.message}`));