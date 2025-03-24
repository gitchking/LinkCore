import fetch from "node-fetch";

// List of SFW drama sites with their details
const sites = [
  {
    url: "https://www.goplay.co.id",
    title: "GoPlay",
    description: "An Indonesian streaming service offering local and Asian content, including dramas, with a focus on Southeast Asian audiences. Requires a subscription for full access.",
    category: "dramas",
    tags: ["indonesian", "asian", "subscription", "southeast-asian"],
    nsfw: false
  },
  {
    url: "https://www.viki.com",
    title: "Rakuten Viki",
    description: "A legal platform streaming Asian dramas and movies with English subtitles. Offers free content with ads and a premium Viki Pass for ad-free, exclusive access.",
    category: "dramas",
    tags: ["asian", "legal", "english-subtitles", "premium"],
    nsfw: false
  },
  {
    url: "https://www.iq.com",
    title: "iQIYI",
    description: "A Chinese streaming service with a wide range of Asian dramas, including C-dramas and K-dramas. Free with ads, or premium for additional content and higher quality.",
    category: "dramas",
    tags: ["chinese", "asian", "c-dramas", "k-dramas"],
    nsfw: false
  },
  {
    url: "https://onetouch.tv",
    title: "OneTouchTV",
    description: "A free app-based platform offering Asian dramas and TV shows, often with English subtitles, targeting international viewers with a mix of content.",
    category: "dramas",
    tags: ["asian", "free", "english-subtitles", "app-based"],
    nsfw: false
  },
  {
    url: "https://kisskh.co",
    title: "Kisskh",
    description: "A free site for Asian dramas (Korean, Chinese, Thai, etc.) with English subtitles. Known for fast updates but may rely on unofficial sources.",
    category: "dramas",
    tags: ["asian", "korean", "chinese", "thai"],
    nsfw: false
  },
  {
    url: "https://kdramaweb.com",
    title: "Kdramaweb",
    description: "A free site focused on K-dramas, offering streaming with English subs. It's simple but may lack the polish of official platforms.",
    category: "dramas",
    tags: ["k-dramas", "free", "english-subs", "streaming"],
    nsfw: false
  },
  {
    url: "https://asiaflix.app",
    title: "Asiaflix",
    description: "A free streaming app for Asian dramas and movies, with a variety of genres and subtitles, though availability can vary by region.",
    category: "dramas",
    tags: ["asian", "app", "free", "subtitles"],
    nsfw: false
  },
  {
    url: "https://wetv.vip",
    title: "WeTV",
    description: "A Tencent-owned platform offering Asian dramas (especially Chinese) with English subtitles. Free with ads, or VIP for premium content.",
    category: "dramas",
    tags: ["tencent", "chinese", "english-subtitles", "premium"],
    nsfw: false
  },
  {
    url: "https://dramafull.net",
    title: "DramaFull",
    description: "A free site streaming Asian dramas with English subs, covering Korean, Chinese, and Japanese titles, often updated quickly.",
    category: "dramas",
    tags: ["asian", "korean", "chinese", "japanese"],
    nsfw: false
  },
  {
    url: "https://dramahood.live",
    title: "Dramahood",
    description: "A free K-drama streaming site with English subtitles, popular for its user-friendly interface and latest releases.",
    category: "dramas",
    tags: ["k-drama", "free", "english-subtitles", "user-friendly"],
    nsfw: false
  },
  {
    url: "https://kissasian.vip",
    title: "Kissasianvip",
    description: "A variant of KissAsian, offering free Asian dramas with English subs. Focuses on high-quality streams and a broad library.",
    category: "dramas",
    tags: ["asian", "free", "english-subs", "high-quality"],
    nsfw: false
  },
  {
    url: "https://kissoppa.com",
    title: "KissOppa",
    description: "A free site dedicated to K-dramas, providing English-subtitled content with a focus on romance and popular series.",
    category: "dramas",
    tags: ["k-dramas", "free", "english-subtitled", "romance"],
    nsfw: false
  },
  {
    url: "https://asianview.co",
    title: "Asianview",
    description: "A free streaming site for Asian dramas and movies, offering subtitles and a mix of genres from across Asia.",
    category: "dramas",
    tags: ["asian", "free", "subtitles", "streaming"],
    nsfw: false
  },
  {
    url: "https://dramacity.se",
    title: "Dramacity",
    description: "A free platform for Asian dramas, including K-dramas and C-dramas, with English subs and a simple layout.",
    category: "dramas",
    tags: ["asian", "k-dramas", "c-dramas", "english-subs"],
    nsfw: false
  },
  {
    url: "https://dramafire.info",
    title: "Dramafire",
    description: "A free site offering K-dramas and Asian movies with English subtitles, known for its early uploads of popular titles.",
    category: "dramas",
    tags: ["k-dramas", "asian", "english-subtitles", "early-uploads"],
    nsfw: false
  },
  {
    url: "https://dramago.com",
    title: "DramaGo",
    description: "A free streaming site for Asian dramas, providing English subs and a variety of genres, though it may face domain changes.",
    category: "dramas",
    tags: ["asian", "free", "english-subs", "streaming"],
    nsfw: false
  },
  {
    url: "https://myasiantv.li",
    title: "Myasiantv",
    description: "A free site for Asian dramas and variety shows with English subtitles, covering Korean, Chinese, and more.",
    category: "dramas",
    tags: ["asian", "variety-shows", "english-subtitles", "free"],
    nsfw: false
  },
  {
    url: "https://asianc.top",
    title: "asianc.top",
    description: "A free streaming site for Asian content, offering dramas and movies with English subs, though less known and potentially unofficial.",
    category: "dramas",
    tags: ["asian", "free", "english-subs", "streaming"],
    nsfw: false
  },
  {
    url: "https://kisskhdrama.com",
    title: "kisskhdrama.com",
    description: "A free mirror of Kisskh, streaming Asian dramas with English subtitles, focusing on fast updates and variety.",
    category: "dramas",
    tags: ["asian", "free", "english-subtitles", "fast-updates"],
    nsfw: false
  },
  {
    url: "https://kdramatv.net",
    title: "KDramaTv",
    description: "A free site dedicated to K-dramas, offering English-subtitled streams of both new and classic series.",
    category: "dramas",
    tags: ["k-dramas", "free", "english-subtitled", "classic"],
    nsfw: false
  },
  {
    url: "https://asiansubs.com",
    title: "AsianSubs",
    description: "A free platform providing English subtitles for Asian dramas, often linked to fan-subbed content.",
    category: "dramas",
    tags: ["asian", "english-subtitles", "fan-subbed", "free"],
    nsfw: false
  },
  {
    url: "https://viewasian.dc",
    title: "Viewasian DC",
    description: "A free streaming site for Asian dramas with English subs, offering a wide range of titles and easy navigation.",
    category: "dramas",
    tags: ["asian", "free", "english-subs", "navigation"],
    nsfw: false
  },
  {
    url: "https://kissasiantv.one",
    title: "Kissasiantv",
    description: "Another KissAsian variant, providing free Asian dramas and movies with English subtitles, known for its reliability.",
    category: "dramas",
    tags: ["asian", "free", "english-subtitles", "reliability"],
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
  console.log(`Adding ${sites.length} SFW drama sites to the database...`);
  
  // Add sites sequentially to avoid overwhelming the server
  for (const site of sites) {
    await addSite(site);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log("Finished adding SFW drama sites!");
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});