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
        category: "amvs",
        tags: site.tags || ["amv", "anime music videos", "fan videos"],
        featured: false,
        nsfw: site.nsfw || false
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
  // All AMV sites
  const amvSites = [
    {
      url: "https://www.animemusicvideos.org",
      title: "AnimeMusicVideos.org",
      description: "A central community hub founded in 2000 for AMV creators to list, host, and discuss their works. Features forums, guides, and a database of over 100,000 AMVs.",
      tags: ["amv", "community", "database", "contests"],
      nsfw: false
    },
    {
      url: "https://www.youtube.com/results?search_query=anime+music+videos",
      title: "YouTube AMVs",
      description: "A major platform where AMVs are widely uploaded by creators and fans. Offers accessibility but has copyright claim issues for many anime music videos.",
      tags: ["amv", "streaming", "popular", "mainstream"],
      nsfw: false
    },
    {
      url: "https://www.akross.ru",
      title: "AKROSS",
      description: "A Russian AMV community launched in 2002, hosting the prestigious annual AKROSS Con contest since 2003. Focused on high-quality, exclusive premieres.",
      tags: ["amv", "russian", "contests", "premieres"],
      nsfw: false
    },
    {
      url: "https://amvnews.ru",
      title: "AMVnews",
      description: "A Russian site started in 2006, showcasing top AMVs globally and hosting contests like Big Contest and Level Up. Emphasizes accessibility and broad appeal.",
      tags: ["amv", "russian", "contests", "community"],
      nsfw: false
    },
    {
      url: "https://animeclips.online",
      title: "AnimeClips",
      description: "A site that aggregates AMV clips for streaming or download, focusing on short edits or highlights rather than full AMV hosting.",
      tags: ["amv", "clips", "streaming", "highlights"],
      nsfw: false
    },
    {
      url: "https://www.amv-bb.net",
      title: "AMV-BB",
      description: "A community forum for AMV creators and fans to share their works, discuss techniques, and connect with others in the AMV scene.",
      tags: ["amv", "forum", "community", "discussion"],
      nsfw: false
    },
    {
      url: "https://www.amvhell.com",
      title: "AMV Hell",
      description: "Home of the popular AMV Hell series - collaborative comedy compilations of short, humorous anime clips set to music or sound effects.",
      tags: ["amv", "comedy", "compilation", "series"],
      nsfw: true // Some AMV Hell content contains mature humor
    }
  ];
  
  let addedCount = 0;
  
  // Add all sites
  console.log("Adding AMV websites...");
  for (const site of amvSites) {
    const added = await addSite(site);
    if (added) addedCount++;
  }
  
  console.log(`Added ${addedCount} new AMV websites`);
  return addedCount;
}

// Run the main function
addAllSites()
  .then(count => console.log(`Done! Added ${count} AMV websites.`))
  .catch(error => console.error(`Failed: ${error.message}`));