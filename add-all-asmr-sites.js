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
  // All 40 ASMR Sites from the list (excluding AnimeSongs.org which is now in Games)
  const asmrSites = [
    // Sites we've already added in the previous script
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
    },
    // New sites to add
    {
      url: "https://hentai-share.com",
      title: "Hentai-Share.com",
      description: "Offers downloadable hentai ASMR alongside other adult anime content, often sourced from fan communities or unofficial releases.",
      tags: ["asmr", "hentai", "download", "community"],
      nsfw: true
    },
    {
      url: "https://hentai-sharing.net",
      title: "Hentai-Sharing.net",
      description: "A sister site to Hentai-Share, providing free hentai ASMR audio downloads with a variety of fetish scenarios.",
      tags: ["asmr", "hentai", "download", "fetish"],
      nsfw: true
    },
    {
      url: "https://f95zone.to",
      title: "F95zone.to (ASMR Section)",
      description: "A forum with a dedicated adult ASMR section, including hentai-themed audio files shared by users, often with direct download links.",
      tags: ["asmr", "forum", "community", "download"],
      nsfw: true
    },
    {
      url: "https://soundgasm.net",
      title: "Soundgasm.net",
      description: "A platform hosting user-uploaded audio, including a significant amount of hentai ASMR created by English and Japanese-speaking creators.",
      tags: ["asmr", "upload", "community", "creators"],
      nsfw: true
    },
    {
      url: "https://www.patreon.com",
      title: "Patreon (ASMR Creators)",
      description: "Many hentai ASMR artists offer exclusive audio content via subscription, often with anime-inspired themes.",
      tags: ["asmr", "subscription", "exclusive", "creators"],
      nsfw: true
    },
    {
      url: "https://hiyoriost.com",
      title: "HiyoriOST (ASMR Section)",
      description: "Primarily an OST site, but includes a niche collection of hentai ASMR tracks available for download.",
      tags: ["asmr", "ost", "download", "niche"],
      nsfw: true
    },
    {
      url: "https://www.reddit.com/r/NSFWASMR",
      title: "Reddit (r/NSFWASMR)",
      description: "A subreddit sharing hentai ASMR audio and links, with community discussions and user uploads.",
      tags: ["asmr", "reddit", "community", "discussion"],
      nsfw: true
    },
    {
      url: "https://www.reddit.com/r/GoneWildAudio",
      title: "Reddit (r/GoneWildAudio)",
      description: "Features amateur and semi-pro hentai ASMR recordings, often with anime-inspired scripts, free to access.",
      tags: ["asmr", "reddit", "amateur", "scripts"],
      nsfw: true
    },
    {
      url: "https://mikudb.moe",
      title: "MikuDB (Erotic Audio)",
      description: "Focused on Vocaloid music, but includes some erotic hentai ASMR tracks featuring virtual singers.",
      tags: ["asmr", "vocaloid", "virtual", "music"],
      nsfw: true
    },
    {
      url: "https://doujinstyle.com",
      title: "DoujinStyle (ASMR Section)",
      description: "A doujin site with a subsection for hentai ASMR downloads, alongside music and games.",
      tags: ["asmr", "doujin", "download", "music"],
      nsfw: true
    },
    {
      url: "https://sukidesuost.info",
      title: "Sukidesuost (ASMR)",
      description: "Primarily an OST site, but offers a selection of hentai ASMR audio files for free download.",
      tags: ["asmr", "ost", "download", "audio"],
      nsfw: true
    },
    {
      url: "https://yumeost.club",
      title: "YumeOST (ASMR)",
      description: "Another OST-focused site with a niche hentai ASMR collection, emphasizing rare audio tracks.",
      tags: ["asmr", "ost", "rare", "audio"],
      nsfw: true
    },
    {
      url: "https://sittingonclouds.net",
      title: "Sitting on Clouds (ASMR)",
      description: "Known for game OSTs, it also hosts a small but growing hentai ASMR archive for download.",
      tags: ["asmr", "ost", "game", "archive"],
      nsfw: true
    },
    {
      url: "https://osanime.com",
      title: "Osanime (ASMR)",
      description: "A site with anime music downloads, including some hentai ASMR tracks for fans of erotic audio.",
      tags: ["asmr", "anime", "music", "download"],
      nsfw: true
    },
    {
      url: "https://sakuraost.com",
      title: "SakuraOST (ASMR)",
      description: "Features hentai ASMR alongside anime OSTs, with a focus on Japanese voice acting.",
      tags: ["asmr", "ost", "voice acting", "japanese"],
      nsfw: true
    },
    {
      url: "https://allanimesongs.com",
      title: "AllAnime Music (ASMR)",
      description: "A broad anime music site with a subsection for hentai ASMR streaming and downloads.",
      tags: ["asmr", "anime", "music", "streaming"],
      nsfw: true
    },
    {
      url: "https://mangazip.is",
      title: "MangaZip (Music/ASMR)",
      description: "Primarily a manga site, but includes hentai ASMR audio files as part of its music offerings.",
      tags: ["asmr", "manga", "music", "audio"],
      nsfw: true
    },
    {
      url: "https://hentag.com",
      title: "Hentag (Audio)",
      description: "A hentai database with an audio section featuring ASMR tracks, tagged by fetish and theme.",
      tags: ["asmr", "database", "fetish", "tags"],
      nsfw: true
    },
    {
      url: "https://wholesomelist.com",
      title: "WholesomeList (Audio)",
      description: "Curates 'wholesome' hentai content, including ASMR audio with a softer erotic focus.",
      tags: ["asmr", "wholesome", "curation", "soft"],
      nsfw: true
    },
    {
      url: "https://cangku.moe",
      title: "Cangku.moe",
      description: "A Chinese-based site with a mix of anime content, including hentai ASMR audio for streaming and download.",
      tags: ["asmr", "chinese", "streaming", "download"],
      nsfw: true
    },
    {
      url: "https://fanbox.cc",
      title: "Fanbox.cc (ASMR Creators)",
      description: "A platform where Japanese ASMR artists share hentai-themed audio works, often behind a paywall.",
      tags: ["asmr", "japanese", "creators", "paywall"],
      nsfw: true
    },
    {
      url: "https://gmgard.com",
      title: "Gmgard.com (ASMR)",
      description: "A Chinese doujin site with a hentai ASMR section, offering free downloads and community shares.",
      tags: ["asmr", "chinese", "doujin", "community"],
      nsfw: true
    },
    {
      url: "https://zodgame.xyz",
      title: "Zodgame.xyz (ASMR)",
      description: "A gaming forum with an adult section, including hentai ASMR audio files shared by users.",
      tags: ["asmr", "gaming", "forum", "sharing"],
      nsfw: true
    },
    {
      url: "https://asmrxz.net",
      title: "ASMRXZ.net",
      description: "A smaller site with a mix of ASMR content, including hentai-themed audio for relaxation and arousal.",
      tags: ["asmr", "relaxation", "hentai", "audio"],
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