import fetch from "node-fetch";

// List of game sites with their details, properly labeled for NSFW content
const sites = [
  {
    url: "https://vndb.org",
    title: "Visual Novel DB",
    description: "A comprehensive database for visual novels, offering details on titles, developers, and releases, widely used by fans for cataloging.",
    category: "games",
    tags: ["visual-novels", "database", "catalog", "reference"],
    nsfw: false
  },
  {
    url: "https://www.dlsite.com",
    title: "DLsite",
    description: "A Japanese digital marketplace selling visual novels, doujin games, and adult content, with English support available.",
    category: "games",
    tags: ["visual-novels", "doujin", "marketplace", "adult-content"],
    nsfw: true
  },
  {
    url: "https://www.mangagamer.com",
    title: "MangaGamer",
    description: "An official retailer for English-translated visual novels and eroge, offering both all-ages and adult titles.",
    category: "games",
    tags: ["visual-novels", "eroge", "english-translations", "official"],
    nsfw: true
  },
  {
    url: "https://kimochi-gaming.com",
    title: "Kimochi Gaming",
    description: "A site offering direct downloads of adult visual novels and games, often with a focus on free or pirated content.",
    category: "games",
    tags: ["visual-novels", "adult", "direct-downloads", "free"],
    nsfw: true
  },
  {
    url: "https://ggbases.com",
    title: "GGBases",
    description: "A torrent site for visual novels and eroge, providing links to Japanese and translated games, primarily for adult content.",
    category: "games",
    tags: ["visual-novels", "eroge", "torrents", "japanese"],
    nsfw: true
  },
  {
    url: "https://fapforfun.net",
    title: "FapForFun",
    description: "A torrent and download site for adult visual novels and hentai games, offering free access to a variety of titles.",
    category: "games",
    tags: ["visual-novels", "adult", "hentai", "torrents"],
    nsfw: true
  },
  {
    url: "https://www.ryuugames.com",
    title: "Ryuugames",
    description: "A site providing direct downloads of visual novels and eroge, including Japanese originals and English translations.",
    category: "games",
    tags: ["visual-novels", "eroge", "direct-downloads", "english-translations"],
    nsfw: true
  },
  {
    url: "https://erogedownload.com",
    title: "Eroge Download",
    description: "A resource for downloading English-translated eroge and visual novels, often with direct links and guides.",
    category: "games",
    tags: ["eroge", "visual-novels", "english-translations", "guides"],
    nsfw: true
  },
  {
    url: "https://otomi-games.com",
    title: "Otomi Games",
    description: "A free download site for adult visual novels and hentai games, offering high-speed links and torrents.",
    category: "games",
    tags: ["visual-novels", "adult", "hentai", "free"],
    nsfw: true
  },
  {
    url: "https://www.nutaku.net",
    title: "Nutaku",
    description: "A platform for adult games, including visual novels, with a mix of free-to-play and premium titles.",
    category: "games",
    tags: ["adult", "visual-novels", "free-to-play", "premium"],
    nsfw: true
  },
  {
    url: "https://www.erolabs.com",
    title: "EROLABS",
    description: "A mobile-focused platform for adult visual novels and gacha games, offering uncensored content for mature audiences.",
    category: "games",
    tags: ["mobile", "adult", "visual-novels", "gacha"],
    nsfw: true
  },
  {
    url: "https://www.reddit.com/r/Roms",
    title: "r/Roms Megathread",
    description: "A Reddit community thread sharing ROMs and game downloads, including visual novels, via direct links.",
    category: "games",
    tags: ["roms", "visual-novels", "reddit", "community"],
    nsfw: false
  },
  {
    url: "https://erista.me",
    title: "Erista",
    description: "A site offering ROMs and direct downloads for games, including visual novels, often for emulation purposes.",
    category: "games",
    tags: ["roms", "visual-novels", "emulation", "direct-downloads"],
    nsfw: false
  },
  {
    url: "https://androidvisualnovels.com",
    title: "AndroidVisualNovels",
    description: "A site providing visual novel downloads specifically for Android devices, with direct links.",
    category: "games",
    tags: ["visual-novels", "android", "mobile", "downloads"],
    nsfw: false
  },
  {
    url: "https://betterrepack.com",
    title: "BetterRepack",
    description: "Offers pre-patched and repacked visual novels for easy installation, focusing on adult titles with direct downloads.",
    category: "games",
    tags: ["visual-novels", "repacks", "adult", "installation"],
    nsfw: true
  },
  {
    url: "https://f95zone.to",
    title: "F95zone",
    description: "A forum for adult games and visual novels, offering downloads, discussions, and community support.",
    category: "games",
    tags: ["adult", "visual-novels", "forum", "community"],
    nsfw: true
  },
  {
    url: "https://h-suki.com",
    title: "h-suki.com",
    description: "A French-based site for downloading adult visual novels, with direct links and English options.",
    category: "games",
    tags: ["visual-novels", "adult", "french", "downloads"],
    nsfw: true
  },
  {
    url: "https://hcapital.net",
    title: "Hcapital",
    description: "A lesser-known site offering direct downloads of adult visual novels and eroge.",
    category: "games",
    tags: ["visual-novels", "adult", "eroge", "direct-downloads"],
    nsfw: true
  },
  {
    url: "https://deso-novel.com",
    title: "Deso Novel",
    description: "A site for downloading visual novels, often with a focus on Japanese titles and direct links.",
    category: "games",
    tags: ["visual-novels", "japanese", "direct-links", "downloads"],
    nsfw: false
  },
  {
    url: "https://doujinstyle.com",
    title: "DoujinStyle",
    description: "A community site for doujin content, including visual novels, with direct download options.",
    category: "games",
    tags: ["doujin", "visual-novels", "community", "downloads"],
    nsfw: false
  },
  {
    url: "https://cpg-repacks.site",
    title: "CPG Repacks",
    description: "A torrent site offering repacked visual novels and games, optimized for smaller file sizes.",
    category: "games",
    tags: ["visual-novels", "repacks", "torrents", "optimization"],
    nsfw: false
  },
  {
    url: "https://hentaibedta.net",
    title: "HentaiBedta",
    description: "A site for downloading adult visual novels and hentai games, with direct links and a simple interface.",
    category: "games",
    tags: ["visual-novels", "adult", "hentai", "direct-links"],
    nsfw: true
  },
  {
    url: "https://vnpocket.com",
    title: "VNPocket",
    description: "A site focused on visual novels for mobile devices, often with adult content and direct downloads.",
    category: "games",
    tags: ["visual-novels", "mobile", "adult", "downloads"],
    nsfw: true
  },
  {
    url: "https://jpcompendium.com",
    title: "JP Compendium",
    description: "A resource for Japanese game ROMs, including visual novels, with direct download links.",
    category: "games",
    tags: ["japanese", "roms", "visual-novels", "downloads"],
    nsfw: false
  },
  {
    url: "https://www.johren.games",
    title: "Johren",
    description: "A platform for adult visual novels and games, offering both free and paid content with English support.",
    category: "games",
    tags: ["visual-novels", "adult", "english", "platform"],
    nsfw: true
  },
  {
    url: "https://sekaiproject.com",
    title: "SekaiProject",
    description: "An official publisher of English-translated visual novels, selling all-ages and adult titles.",
    category: "games",
    tags: ["visual-novels", "official", "english-translations", "publisher"],
    nsfw: false
  },
  {
    url: "https://jastusa.com",
    title: "JAST",
    description: "A veteran retailer of English-localized eroge and visual novels, focusing on mature content.",
    category: "games",
    tags: ["eroge", "visual-novels", "english-localized", "mature"],
    nsfw: true
  },
  {
    url: "https://www.kaguragames.com",
    title: "KaguraGames",
    description: "A publisher of English-translated adult RPGs and visual novels, available for purchase.",
    category: "games",
    tags: ["rpgs", "visual-novels", "adult", "english-translations"],
    nsfw: true
  },
  {
    url: "https://shiravune.com",
    title: "Shiravune",
    description: "An official publisher offering English-localized visual novels, often with mature themes.",
    category: "games",
    tags: ["visual-novels", "official", "english-localized", "mature"],
    nsfw: true
  },
  {
    url: "https://visualdise.com",
    title: "VisualDise",
    description: "A site for downloading visual novels, with a mix of free and repacked content.",
    category: "games",
    tags: ["visual-novels", "free", "repacked", "downloads"],
    nsfw: false
  },
  {
    url: "https://www.qoo-app.com",
    title: "QooApp",
    description: "A mobile app store for Asian games, including visual novels, with a focus on Japanese and Korean titles.",
    category: "games",
    tags: ["mobile", "app-store", "asian", "visual-novels"],
    nsfw: false
  }
];

async function addSite(site) {
  try {
    const response = await fetch("http://localhost:5000/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(site),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add site ${site.title}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`Added ${site.title} (ID: ${data.id}) - NSFW: ${site.nsfw ? 'Yes' : 'No'}`);
    return data;
  } catch (error) {
    console.error(`Error adding ${site.title}:`, error.message);
    return null;
  }
}

async function addAllSites() {
  console.log(`Adding ${sites.length} game sites to the database...`);
  
  // Count NSFW and SFW sites
  const nsfwCount = sites.filter(site => site.nsfw).length;
  const sfwCount = sites.filter(site => !site.nsfw).length;
  console.log(`NSFW sites: ${nsfwCount}, SFW sites: ${sfwCount}`);
  
  // Add sites sequentially to avoid overwhelming the server
  for (const site of sites) {
    await addSite(site);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log("Finished adding game sites!");
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});