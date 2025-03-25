import fetch from "node-fetch";

// List of image board sites from the provided list
const imageboardSites = [
  {
    url: "https://rule34.xxx",
    title: "Rule 34",
    description: "A popular adult image board hosting explicit anime and cartoon content, based on the \"Rule 34\" internet meme (\"If it exists, there is porn of it\"). Features extensive tagging and a large user-uploaded library.",
    category: "imageboards",
    tags: ["imageboard", "anime", "explicit", "rule34"],
    nsfw: true
  },
  {
    url: "https://gelbooru.com",
    title: "Gelbooru",
    description: "A major anime and hentai image board with millions of images, offering detailed tag-based filtering for both explicit and non-explicit content. Known for its liberal posting policies.",
    category: "imageboards",
    tags: ["imageboard", "anime", "hentai", "tag-based"],
    nsfw: true
  },
  {
    url: "https://danbooru.donmai.us",
    title: "Danbooru",
    description: "A highly organized anime image board with a focus on quality and strict tagging, hosting both SFW and NSFW content. It's a foundational booru with a robust community and API.",
    category: "imageboards",
    tags: ["imageboard", "anime", "organized", "api"],
    nsfw: true
  },
  {
    url: "https://safebooru.org",
    title: "Safebooru",
    description: "A family-friendly booru importing SFW content from Gelbooru and Danbooru, designed for users seeking anime art without explicit material.",
    category: "imageboards",
    tags: ["imageboard", "anime", "sfw", "family-friendly"],
    nsfw: false
  },
  {
    url: "https://www.sakugabooru.com",
    title: "Sakugabooru",
    description: "A niche booru dedicated to animation keyframes and sakuga (high-quality animation sequences), primarily SFW, used by animation enthusiasts and analysts.",
    category: "imageboards",
    tags: ["imageboard", "anime", "animation", "sakuga"],
    nsfw: false
  },
  {
    url: "https://pixiv.cat",
    title: "Pixiv Viewer",
    description: "Third-party viewers for browsing Pixiv art without an account, offering streamlined access to anime-style illustrations, including NSFW works.",
    category: "imageboards",
    tags: ["imageboard", "pixiv", "viewer", "illustrations"],
    nsfw: true
  },
  {
    url: "https://www.pixiv.net",
    title: "Pixiv",
    description: "A Japanese art community platform where artists share anime-style illustrations, ranging from SFW to NSFW (behind age gates). It's a primary source for fan art and original works.",
    category: "imageboards",
    tags: ["art-community", "japanese", "illustrations", "fan-art"],
    nsfw: true
  },
  {
    url: "https://medibang.com/artstreet",
    title: "ARTstreet",
    description: "A social platform by MediBang for manga and anime-style art, mostly SFW, aimed at creators and readers with a focus on community engagement.",
    category: "imageboards",
    tags: ["art-community", "manga", "creators", "medibang"],
    nsfw: false
  },
  {
    url: "https://kusowanka.com",
    title: "Kusowanka",
    description: "A lesser-known site offering hentai and adult anime content, with a mix of images and videos, often less structured than larger boorus.",
    category: "imageboards",
    tags: ["imageboard", "hentai", "adult", "anime"],
    nsfw: true
  },
  {
    url: "https://yande.re",
    title: "Yande.re",
    description: "An anime image board specializing in high-resolution art, including wallpapers and doujinshi scans, with a mix of SFW and NSFW content curated by a tight-knit community.",
    category: "imageboards",
    tags: ["imageboard", "anime", "high-resolution", "doujinshi"],
    nsfw: true
  },
  {
    url: "https://konachan.com",
    title: "Konachan",
    description: "A booru focused on high-definition anime wallpapers, offering both SFW (.net) and NSFW (.com) versions, known for its quality over quantity approach.",
    category: "imageboards",
    tags: ["imageboard", "anime", "wallpapers", "high-definition"],
    nsfw: true
  },
  {
    url: "https://hypnohub.net",
    title: "HypnoHub",
    description: "A niche adult booru dedicated to hypnosis-themed hentai art, featuring a specific fetish focus with detailed tagging.",
    category: "imageboards",
    tags: ["imageboard", "hentai", "hypnosis", "fetish"],
    nsfw: true
  },
  {
    url: "https://setteidreams.net",
    title: "Settei Dreams",
    description: "A site hosting anime production materials like character sheets (settei) and scans, mostly SFW, aimed at collectors and animation fans.",
    category: "imageboards",
    tags: ["anime", "production", "character-sheets", "settei"],
    nsfw: false
  },
  {
    url: "https://booru.wf",
    title: "Booru.wf",
    description: "A small, generic booru aggregator or mirror site, hosting a variety of anime and hentai images, though less prominent than major platforms.",
    category: "imageboards",
    tags: ["imageboard", "anime", "aggregator", "mirror"],
    nsfw: true
  },
  {
    url: "https://kemono.su",
    title: "Kemono",
    description: "An archive site for Patreon, Fanbox, and other paywalled content from artists, including NSFW anime art and doujinshi, often controversial due to its pirated nature.",
    category: "imageboards",
    tags: ["archive", "patreon", "fanbox", "paywalled"],
    nsfw: true
  },
  {
    url: "https://e-shuushuu.net",
    title: "E-Shuushuu",
    description: "A SFW anime image board with a curated collection of high-quality illustrations, focusing on cute and aesthetic art without explicit content.",
    category: "imageboards",
    tags: ["imageboard", "anime", "sfw", "illustrations"],
    nsfw: false
  },
  {
    url: "https://tbib.org",
    title: "tbib.org",
    description: "The Big Image Board, an expansive booru with over 3 million images, including a significant NSFW section, offering broad tag-based searching.",
    category: "imageboards",
    tags: ["imageboard", "anime", "extensive", "tag-based"],
    nsfw: true
  },
  {
    url: "https://aibooru.online",
    title: "AIBooru",
    description: "A booru for AI-generated anime art, featuring both SFW and NSFW content created by tools like Stable Diffusion, with a focus on synthetic creativity.",
    category: "imageboards",
    tags: ["imageboard", "ai-generated", "anime", "stable-diffusion"],
    nsfw: true
  },
  {
    url: "https://nozomi.la",
    title: "Nozomi.la",
    description: "An adult-oriented image board hosting hentai and anime art, with a simple interface and tag-driven navigation, similar to other boorus.",
    category: "imageboards",
    tags: ["imageboard", "adult", "hentai", "tag-driven"],
    nsfw: true
  },
  {
    url: "https://allthefallen.moe",
    title: "All The Fallen",
    description: "A community site with forums and galleries for NSFW anime content, including hentai and lolicon, often requiring registration for full access.",
    category: "imageboards",
    tags: ["community", "forums", "galleries", "nsfw"],
    nsfw: true
  },
  {
    url: "https://hentaigamecg.com",
    title: "HentaiGameCG",
    description: "A site hosting CG (computer graphics) sets from adult visual novels and games, focusing on explicit content with downloadable collections.",
    category: "imageboards",
    tags: ["cg", "visual-novels", "games", "collections"],
    nsfw: true
  },
  {
    url: "https://xbooru.com",
    title: "Xbooru",
    description: "An adult booru specializing in hentai and pornographic anime art, with a straightforward design and extensive NSFW tagging.",
    category: "imageboards",
    tags: ["imageboard", "adult", "hentai", "tagging"],
    nsfw: true
  },
  {
    url: "https://r-34.xyz",
    title: "r-34.xyz",
    description: "A Rule 34-focused site offering adult anime images and animations, with a minimalist layout and direct content access.",
    category: "imageboards",
    tags: ["rule34", "adult", "anime", "animations"],
    nsfw: true
  },
  {
    url: "https://mikubooru.com",
    title: "Mikubooru",
    description: "A niche booru dedicated to Hatsune Miku and Vocaloid-related art, ranging from SFW fan art to occasional NSFW pieces.",
    category: "imageboards",
    tags: ["imageboard", "hatsune-miku", "vocaloid", "fan-art"],
    nsfw: true
  },
  {
    url: "https://tsundora.com",
    title: "Tsundora",
    description: "An anime art gallery with a mix of SFW and NSFW content, featuring high-quality images and a focus on aesthetic presentation.",
    category: "imageboards",
    tags: ["gallery", "anime", "aesthetic", "high-quality"],
    nsfw: true
  },
  {
    url: "https://anime-pictures.net",
    title: "anime-pictures.net",
    description: "A SFW anime art database with a large collection of fan art and illustrations, offering tag searches and high-resolution downloads.",
    category: "imageboards",
    tags: ["database", "anime", "fan-art", "illustrations"],
    nsfw: false
  },
  {
    url: "https://www.zerochan.net",
    title: "Zerochan",
    description: "A SFW anime image board with a focus on character-specific art, featuring a clean interface and a massive library of fan-uploaded content.",
    category: "imageboards",
    tags: ["imageboard", "anime", "character-specific", "clean-interface"],
    nsfw: false
  },
  {
    url: "https://www.minitokyo.net",
    title: "Minitokyo",
    description: "A SFW anime art community specializing in high-quality wallpapers and scans, with a focus on official and fan-made illustrations.",
    category: "imageboards",
    tags: ["community", "anime", "wallpapers", "scans"],
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
  console.log(`Adding ${imageboardSites.length} image board sites to the database...`);
  
  // Count SFW and NSFW sites
  const sfwCount = imageboardSites.filter(site => !site.nsfw).length;
  const nsfwCount = imageboardSites.filter(site => site.nsfw).length;
  console.log(`Sites breakdown: ${sfwCount} SFW sites, ${nsfwCount} NSFW sites`);
  
  // Add sites sequentially to avoid overwhelming the server
  let successCount = 0;
  let failureCount = 0;
  
  for (const site of imageboardSites) {
    const result = await addSite(site);
    if (result) {
      successCount++;
    } else {
      failureCount++;
    }
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`Finished adding image board sites! Success: ${successCount}, Failures: ${failureCount}`);
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});