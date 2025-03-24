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
  // ASMR Sites from the list
  const asmrSites = [
    {
      url: "https://hentaiasmr.moe",
      title: "HentaiASMR.moe",
      description: "A free site with thousands of hentai ASMR audio tracks, featuring Japanese voice actors and static thumbnails of anime-style artwork.",
      tags: ["asmr", "hentai", "audio", "japanese"],
      nsfw: true
    },
    {
      url: "https://japaneseasmr.com",
      title: "JapaneseASMR.com",
      description: "Offers free Japanese ASMR with erotic themes, including whispers, moans, and roleplay scenarios, paired with hentai thumbnails.",
      tags: ["asmr", "japanese", "audio", "roleplay"],
      nsfw: true
    },
    {
      url: "https://asmrhentai.net",
      title: "ASMRHentai.net",
      description: "A growing collection of hentai ASMR with AI-translated subtitles in English and Japanese, emphasizing professional voice acting.",
      tags: ["asmr", "hentai", "subtitles", "voice acting"],
      nsfw: true
    },
    {
      url: "https://jasmr.net",
      title: "JASMR.net",
      description: "Provides Japanese ASMR with English subtitles, covering all-ages and R18 content. Features multi-track support.",
      tags: ["asmr", "japanese", "subtitles", "multi-track"],
      nsfw: true
    },
    {
      url: "https://eroasmr.com",
      title: "EroASMR.com",
      description: "A site blending erotic ASMR with hentai-inspired roleplays, offering categories like dirty talk, blowjobs, and moaning.",
      tags: ["asmr", "erotic", "roleplay", "categories"],
      nsfw: true
    },
    {
      url: "https://www.dlsite.com",
      title: "DLsite",
      description: "A major Japanese digital marketplace with a vast section of R18 ASMR audio works, including hentai-themed voice dramas by professional creators.",
      tags: ["asmr", "marketplace", "voice drama", "professional"],
      nsfw: true
    },
    {
      url: "https://asmr18.fans",
      title: "ASMR18.fans",
      description: "A free site hosting adult ASMR, including hentai-inspired audio, with a focus on Japanese content and frequent updates.",
      tags: ["asmr", "adult", "japanese", "free"],
      nsfw: true
    },
    {
      url: "https://asmr.one",
      title: "ASMR.one",
      description: "A site with a mix of SFW and NSFW ASMR, including hentai audio from Japanese sources, popular among fans for its variety.",
      tags: ["asmr", "sfw", "nsfw", "variety"],
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