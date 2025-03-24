import fetch from "node-fetch";

// List of SFW manga sites with their details
const sites = [
  {
    url: "https://comick.app",
    title: "ComicK",
    description: "A free manga and manhwa reader with a clean interface and community-uploaded translations.",
    category: "manga",
    tags: ["manga", "manhwa", "free", "translations"],
    nsfw: false
  },
  {
    url: "https://mangadex.org",
    title: "MangaDex",
    description: "A fan-driven platform hosting manga scans in multiple languages, known for its vast library and active community.",
    category: "manga",
    tags: ["manga", "scans", "multilingual", "community"],
    nsfw: false
  },
  {
    url: "https://mangapark.net",
    title: "MangaPark",
    description: "Offers free manga scans with a user-friendly design and frequent updates from various scanlation groups.",
    category: "manga",
    tags: ["manga", "scans", "free", "updates"],
    nsfw: false
  },
  {
    url: "https://bato.to",
    title: "Bato.to",
    description: "A community hub for manga and manhwa, featuring fan translations and a simple browsing experience.",
    category: "manga",
    tags: ["manga", "manhwa", "translations", "community"],
    nsfw: false
  },
  {
    url: "https://mangafire.to",
    title: "MangaFire",
    description: "A free site for manga and manhwa, optimized for fast loading and a sleek, modern layout.",
    category: "manga",
    tags: ["manga", "manhwa", "fast-loading", "modern-layout"],
    nsfw: false
  },
  {
    url: "https://cubari.moe",
    title: "Cubari Proxy",
    description: "A proxy service for reading manga from multiple sources, often used for aggregated scans.",
    category: "manga",
    tags: ["manga", "proxy", "aggregator", "scans"],
    nsfw: false
  },
  {
    url: "https://weebcentral.com",
    title: "Weeb Central",
    description: "A lesser-known site offering manga and anime-related content, with a focus on fan uploads.",
    category: "manga",
    tags: ["manga", "anime", "fan-uploads"],
    nsfw: false
  },
  {
    url: "https://global.bookwalker.jp",
    title: "Bookwalker",
    description: "An official digital bookstore for manga and light novels, offering licensed English translations.",
    category: "manga",
    tags: ["manga", "light-novels", "official", "licensed"],
    nsfw: false
  },
  {
    url: "https://www.kobo.com",
    title: "Rakuten Kobo",
    description: "A global e-book platform with a manga section, featuring licensed titles for purchase.",
    category: "manga",
    tags: ["manga", "e-book", "licensed", "purchase"],
    nsfw: false
  },
  {
    url: "https://www.mangago.me",
    title: "Mangago",
    description: "A free site for manga and yaoi, popular for its community comments and extensive library.",
    category: "manga",
    tags: ["manga", "yaoi", "community", "library"],
    nsfw: false
  },
  {
    url: "https://vymanga.net",
    title: "VyManga",
    description: "Offers free manga and manhwa scans, with a focus on colorful webtoons and user accessibility.",
    category: "manga",
    tags: ["manga", "manhwa", "webtoons", "accessibility"],
    nsfw: false
  },
  {
    url: "https://mangabuddy.com",
    title: "MangaBuddy",
    description: "A free manga and manhwa reader with a clean design and a mix of genres.",
    category: "manga",
    tags: ["manga", "manhwa", "clean-design", "genres"],
    nsfw: false
  },
  {
    url: "https://kaliscan.com",
    title: "KaliScan",
    description: "A scanlation group site providing translated manga and manhwa, often with niche titles.",
    category: "manga",
    tags: ["manga", "manhwa", "scanlation", "niche"],
    nsfw: false
  },
  {
    url: "https://mangahasu.se",
    title: "MangaHasu",
    description: "A free manga site with fan translations, known for its straightforward navigation.",
    category: "manga",
    tags: ["manga", "translations", "straightforward", "navigation"],
    nsfw: false
  },
  {
    url: "https://allmanga.to",
    title: "AllManga",
    description: "Aggregates manga and manhwa scans, offering a broad selection of free content.",
    category: "manga",
    tags: ["manga", "manhwa", "aggregator", "free"],
    nsfw: false
  },
  {
    url: "https://mangakatana.com",
    title: "MangaKatana",
    description: "A popular site for free manga, featuring high-quality scans and regular updates.",
    category: "manga",
    tags: ["manga", "high-quality", "scans", "regular-updates"],
    nsfw: false
  },
  {
    url: "https://mangahub.io",
    title: "MangaHub",
    description: "A free manga reader with a large library and a focus on English translations.",
    category: "manga",
    tags: ["manga", "reader", "english", "translations"],
    nsfw: false
  },
  {
    url: "https://likemanga.online",
    title: "LikeManga",
    description: "Offers free manga and manhwa, with a simple interface and frequent updates.",
    category: "manga",
    tags: ["manga", "manhwa", "simple-interface", "updates"],
    nsfw: false
  },
  {
    url: "https://manganato.com",
    title: "Manganato",
    description: "A widely used site for free manga, known for its clean design and extensive catalog.",
    category: "manga",
    tags: ["manga", "free", "clean-design", "catalog"],
    nsfw: false
  },
  {
    url: "https://mangaplus.shueisha.co.jp",
    title: "MANGA Plus",
    description: "An official platform by Shueisha, offering free and paid manga chapters in multiple languages.",
    category: "manga",
    tags: ["manga", "official", "shueisha", "multilingual"],
    nsfw: false
  },
  {
    url: "https://mangageko.com",
    title: "mangageko",
    description: "A free manga and manhwa site with a growing library and user-friendly layout.",
    category: "manga",
    tags: ["manga", "manhwa", "library", "user-friendly"],
    nsfw: false
  },
  {
    url: "https://taadd.com",
    title: "Taadd",
    description: "Provides free manga scans, with a focus on aggregating content from various sources.",
    category: "manga",
    tags: ["manga", "scans", "aggregator", "free"],
    nsfw: false
  },
  {
    url: "https://www.webtoons.com",
    title: "Webtoons",
    description: "An official platform for webtoons and manhwa, offering free and premium content in English.",
    category: "manga",
    tags: ["webtoons", "manhwa", "official", "english"],
    nsfw: false
  },
  {
    url: "https://dynasty-scans.com",
    title: "Dynasty Reader",
    description: "A hub for yuri (female-female romance) manga, featuring fan-translated works.",
    category: "manga",
    tags: ["manga", "yuri", "female-female", "romance"],
    nsfw: false
  },
  {
    url: "https://toonily.com",
    title: "Toonily",
    description: "A free site for manhwa and webtoons, often with adult themes and English translations.",
    category: "manga",
    tags: ["manhwa", "webtoons", "english", "translations"],
    nsfw: false
  },
  {
    url: "https://webtooni.com",
    title: "Webtooni",
    description: "Offers manhwa and webtoons, including some mature content, with a focus on free access.",
    category: "manga",
    tags: ["manhwa", "webtoons", "free", "access"],
    nsfw: false
  },
  {
    url: "https://mangareader.to",
    title: "MangaReader",
    description: "A free manga reader with a broad selection of titles and a clean interface.",
    category: "manga",
    tags: ["manga", "reader", "selection", "clean-interface"],
    nsfw: false
  },
  {
    url: "https://mangago.io",
    title: "Mangago.io",
    description: "A variant of Mangago, offering free manga and manhwa with a focus on diverse content.",
    category: "manga",
    tags: ["manga", "manhwa", "free", "diverse"],
    nsfw: false
  },
  {
    url: "https://manhwabuddy.com",
    title: "ManhwaBuddy",
    description: "Specializes in free manhwa, including trending titles, with a simple design.",
    category: "manga",
    tags: ["manhwa", "free", "trending", "simple-design"],
    nsfw: false
  },
  {
    url: "https://tapas.io",
    title: "Tapas",
    description: "An official platform for webtoons and manhwa, with a mix of free and premium episodes.",
    category: "manga",
    tags: ["webtoons", "manhwa", "official", "premium"],
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
  console.log(`Adding ${sites.length} SFW manga sites to the database...`);
  
  // Add sites sequentially to avoid overwhelming the server
  for (const site of sites) {
    await addSite(site);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log("Finished adding SFW manga sites!");
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});