import fetch from "node-fetch";

// List of SFW novel sites with their details
const sites = [
  {
    url: "https://www.novelupdates.com",
    title: "NovelUpdates",
    description: "A community-driven site tracking light novel and web novel translations, with release updates and forums.",
    category: "novels",
    tags: ["light-novels", "web-novels", "community", "tracking"],
    nsfw: false
  },
  {
    url: "https://global.bookwalker.jp",
    title: "Bookwalker",
    description: "An official digital bookstore offering licensed manga and light novels in English and other languages.",
    category: "novels",
    tags: ["light-novels", "official", "licensed", "digital-bookstore"],
    nsfw: false
  },
  {
    url: "https://wuxiaclick.com",
    title: "WuxiaClick",
    description: "A site for wuxia and xianxia (immortal hero) novels, providing free fan translations.",
    category: "novels",
    tags: ["wuxia", "xianxia", "fan-translations", "free"],
    nsfw: false
  },
  {
    url: "https://vynovel.com",
    title: "VyNovel",
    description: "Offers free light novels and web novels, with a focus on Asian genres like wuxia and isekai.",
    category: "novels",
    tags: ["light-novels", "web-novels", "wuxia", "isekai"],
    nsfw: false
  },
  {
    url: "https://j-novel.club",
    title: "J-Novel Club",
    description: "A premium service for licensed English translations of Japanese light novels, with a subscription model.",
    category: "novels",
    tags: ["light-novels", "licensed", "premium", "subscription"],
    nsfw: false
  },
  {
    url: "https://novelbuddy.com",
    title: "NovelBuddy",
    description: "A free site aggregating web novels and light novels, often with fan translations.",
    category: "novels",
    tags: ["web-novels", "light-novels", "aggregator", "fan-translations"],
    nsfw: false
  },
  {
    url: "https://lightnovelpub.vip",
    title: "LightNovelPub",
    description: "Provides free English translations of light novels, with a focus on Japanese and Korean works.",
    category: "novels",
    tags: ["light-novels", "translations", "japanese", "korean"],
    nsfw: false
  },
  {
    url: "https://wuxiabox.com",
    title: "Wuxia Box",
    description: "A free site for wuxia and xianxia novels, offering fan-translated chapters.",
    category: "novels",
    tags: ["wuxia", "xianxia", "fan-translated", "free"],
    nsfw: false
  },
  {
    url: "https://wuxiaworld.site",
    title: "Wuxiaworld.site",
    description: "A fan site for wuxia novels, distinct from the official Wuxiaworld, with free translations.",
    category: "novels",
    tags: ["wuxia", "fan-site", "translations", "free"],
    nsfw: false
  },
  {
    url: "https://freewebnovel.com",
    title: "FreeWebNovel",
    description: "Aggregates free web novels, including wuxia, fantasy, and romance genres.",
    category: "novels",
    tags: ["web-novels", "wuxia", "fantasy", "romance"],
    nsfw: false
  },
  {
    url: "https://novelsonline.net",
    title: "NovelsOnline",
    description: "A free site hosting web novels and light novels, with a mix of translated content.",
    category: "novels",
    tags: ["web-novels", "light-novels", "translations", "free"],
    nsfw: false
  },
  {
    url: "https://foxaholic.com",
    title: "Foxaholic",
    description: "A fan translation site for light novels and web novels, often with niche titles.",
    category: "novels",
    tags: ["light-novels", "web-novels", "fan-translations", "niche"],
    nsfw: false
  },
  {
    url: "https://ranobes.net",
    title: "Ranobes",
    description: "Offers free light novels and web novels, with a focus on Russian and English translations.",
    category: "novels",
    tags: ["light-novels", "web-novels", "russian", "english"],
    nsfw: false
  },
  {
    url: "https://asianovel.net",
    title: "Asianovel",
    description: "A site for Asian web novels, including wuxia and danmei (Chinese BL), with fan translations.",
    category: "novels",
    tags: ["web-novels", "asian", "wuxia", "danmei"],
    nsfw: false
  },
  {
    url: "https://novelusb.com",
    title: "Novel Usb",
    description: "Provides free web novels and light novels, with a simple interface and translated works.",
    category: "novels",
    tags: ["web-novels", "light-novels", "simple-interface", "translations"],
    nsfw: false
  },
  {
    url: "https://www.novelhall.com",
    title: "Novelhall",
    description: "A free site for web novels, offering English translations of Chinese and Korean titles.",
    category: "novels",
    tags: ["web-novels", "translations", "chinese", "korean"],
    nsfw: false
  },
  {
    url: "https://www.novelcool.com",
    title: "NovelCool",
    description: "Hosts free web novels and light novels, with a broad selection of genres.",
    category: "novels",
    tags: ["web-novels", "light-novels", "genres", "free"],
    nsfw: false
  },
  {
    url: "https://annas-archive.org",
    title: "Anna's Archive",
    description: "A digital archive with links for books, including light novels and web novels.",
    category: "novels",
    tags: ["digital-archive", "books", "light-novels", "web-novels"],
    nsfw: false
  },
  {
    url: "https://server.elscione.com",
    title: "server.elscione",
    description: "A lesser-known server hosting light novels and related files.",
    category: "novels",
    tags: ["light-novels", "hosting", "files", "lesser-known"],
    nsfw: false
  },
  {
    url: "https://justlightnovels.com",
    title: "JustLightNovel",
    description: "Offers light novels, often with fan translations and PDF formats.",
    category: "novels",
    tags: ["light-novels", "fan-translations", "pdf", "formats"],
    nsfw: false
  },
  {
    url: "https://kureha.one",
    title: "Kureha One forum",
    description: "A forum sharing light novels and web novels, with community contributions.",
    category: "novels",
    tags: ["forum", "light-novels", "web-novels", "community"],
    nsfw: false
  },
  {
    url: "https://jnovels.com",
    title: "jnovels",
    description: "Provides Japanese light novels, often with English fan translations.",
    category: "novels",
    tags: ["japanese", "light-novels", "fan-translations", "english"],
    nsfw: false
  },
  {
    url: "https://armaell-library.net",
    title: "Armaell's Library",
    description: "A personal archive offering light novels in various formats.",
    category: "novels",
    tags: ["personal-archive", "light-novels", "formats", "collection"],
    nsfw: false
  },
  {
    url: "https://www.royalroad.com",
    title: "Royalroad",
    description: "A platform for original and fan-made web novels, popular with indie authors.",
    category: "novels",
    tags: ["web-novels", "original", "indie-authors", "platform"],
    nsfw: false
  },
  {
    url: "https://www.wuxiaworld.com",
    title: "Wuxiaworld",
    description: "An official site for licensed wuxia and xianxia translations, with free and premium content.",
    category: "novels",
    tags: ["wuxia", "xianxia", "licensed", "premium"],
    nsfw: false
  },
  {
    url: "https://www.webnovel.com",
    title: "Webnovel",
    description: "A platform for web novels, offering both free and paid chapters, with a focus on Chinese titles.",
    category: "novels",
    tags: ["web-novels", "chinese", "paid", "free"],
    nsfw: false
  },
  {
    url: "https://www.scribblehub.com",
    title: "ScribbleHub",
    description: "A community site for original and fan-made web novels, with a creative focus.",
    category: "novels",
    tags: ["web-novels", "original", "fan-made", "community"],
    nsfw: false
  },
  {
    url: "https://pandasnovel.com",
    title: "Pandasnovel",
    description: "A free site for web novels, including wuxia and fantasy, with fan translations.",
    category: "novels",
    tags: ["web-novels", "wuxia", "fantasy", "fan-translations"],
    nsfw: false
  },
  {
    url: "https://novelfull.me",
    title: "NovelFull",
    description: "A popular site for free web novels, offering English translations of Asian works.",
    category: "novels",
    tags: ["web-novels", "free", "english", "asian"],
    nsfw: false
  },
  {
    url: "https://woopread.com",
    title: "WoopRead",
    description: "Provides free web novels and light novels, with a focus on translated content.",
    category: "novels",
    tags: ["web-novels", "light-novels", "translated", "free"],
    nsfw: false
  },
  {
    url: "https://asuralightnovel.com",
    title: "Asuralightnovel",
    description: "A free site for light novels, often linked to Asura Scans, with fan translations.",
    category: "novels",
    tags: ["light-novels", "asura", "fan-translations", "free"],
    nsfw: false
  },
  {
    url: "https://novelable.net",
    title: "Novelable",
    description: "Offers free web novels and light novels, with a simple reading interface.",
    category: "novels",
    tags: ["web-novels", "light-novels", "reading-interface", "free"],
    nsfw: false
  },
  {
    url: "https://novgo.com",
    title: "Novgo",
    description: "A lesser-known site for web novels, providing free translated content.",
    category: "novels",
    tags: ["web-novels", "lesser-known", "translated", "free"],
    nsfw: false
  },
  {
    url: "https://www.mtlnovel.com",
    title: "MTL Novel",
    description: "A site for web novels, offering quick English versions of Asian titles.",
    category: "novels",
    tags: ["web-novels", "english", "asian", "translations"],
    nsfw: false
  },
  {
    url: "https://lnmtl.com",
    title: "LNMTL",
    description: "A translation platform for light novels, with a focus on raw-to-English conversions.",
    category: "novels",
    tags: ["light-novels", "translation-platform", "raw-to-english", "conversions"],
    nsfw: false
  },
  {
    url: "https://fictionzone.me",
    title: "FictionZone",
    description: "A site for web novels, offering free access to various genres.",
    category: "novels",
    tags: ["web-novels", "free", "genres", "access"],
    nsfw: false
  },
  {
    url: "https://noblemtl.com",
    title: "NobleMTL",
    description: "Provides light novels and web novels, with a clean layout.",
    category: "novels",
    tags: ["light-novels", "web-novels", "clean-layout", "translations"],
    nsfw: false
  },
  {
    url: "https://readnovelmtl.com",
    title: "ReadnovelMTL",
    description: "A site for novels, focusing on fast releases of Asian works.",
    category: "novels",
    tags: ["novels", "fast-releases", "asian", "translations"],
    nsfw: false
  },
  {
    url: "https://readmtl.com",
    title: "ReadMTL",
    description: "Another platform for web novels, offering free content.",
    category: "novels",
    tags: ["web-novels", "platform", "free", "content"],
    nsfw: false
  },
  {
    url: "https://requiemtranslations.com",
    title: "Requiem Translations",
    description: "A site providing novels, often with a focus on niche titles.",
    category: "novels",
    tags: ["novels", "niche", "translations", "titles"],
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
    console.log(`Added ${site.title} (ID: ${data.id})`);
    return data;
  } catch (error) {
    console.error(`Error adding ${site.title}:`, error.message);
    return null;
  }
}

async function addAllSites() {
  console.log(`Adding ${sites.length} SFW novel sites to the database...`);
  
  // Add sites sequentially to avoid overwhelming the server
  for (const site of sites) {
    await addSite(site);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log("Finished adding SFW novel sites!");
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});