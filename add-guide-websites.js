import fetch from "node-fetch";

// List of anime guide websites with their details
const guideWebsites = [
  {
    url: "https://www.animefillerlist.com",
    title: "AnimeFillerList",
    description: "A comprehensive guide listing filler episodes for popular anime like Naruto and Bleach, helping viewers skip non-canon content with detailed episode breakdowns.",
    category: "guides",
    tags: ["filler", "episodes", "watch-guide", "viewing-order"],
    nsfw: false
  },
  {
    url: "https://www.animefillerguide.com",
    title: "AnimeFillerGuide",
    description: "Similar to AnimeFillerList, this site provides guides on filler arcs and episodes, distinguishing canon from filler for a streamlined viewing experience.",
    category: "guides",
    tags: ["filler", "episodes", "arcs", "canon"],
    nsfw: false
  },
  {
    url: "https://www.japanesewithanime.com",
    title: "Japanese with Anime",
    description: "A blog teaching Japanese through anime examples, covering grammar, slang, and cultural nuances, ideal for fans wanting to understand dialogue authentically.",
    category: "guides",
    tags: ["japanese", "language", "learning", "culture"],
    nsfw: false
  },
  {
    url: "https://wotaku.moe",
    title: "Wotaku",
    description: "An educational resource explaining anime tropes, terminology, and otaku culture, guiding both newbies and veterans through the medium's quirks.",
    category: "guides",
    tags: ["tropes", "terminology", "culture", "educational"],
    nsfw: false
  },
  {
    url: "https://en.touhouwiki.net",
    title: "Touhou Wiki",
    description: "A detailed wiki guiding users through the Touhou Project universe, including games, characters, music, and anime-style fan works, maintained by a dedicated community.",
    category: "guides",
    tags: ["wiki", "touhou", "games", "fan-works"],
    nsfw: false
  },
  {
    url: "https://recommendmeanime.com",
    title: "RecommendMeAnime",
    description: "A blog with curated anime recommendation guides based on genres or similar series, offering in-depth suggestions to help fans find their next watch.",
    category: "guides",
    tags: ["recommendations", "genres", "similar-series", "blog"],
    nsfw: false
  },
  {
    url: "https://www.anime-planet.com",
    title: "Anime-Planet (Guides)",
    description: "Beyond its database, it offers watch guides and recommendation lists, aiding users in planning their anime journey with community-driven insights.",
    category: "guides",
    tags: ["recommendations", "watch-guides", "community", "database"],
    nsfw: false
  },
  {
    url: "https://www.fandom.com/topics/anime",
    title: "Fandom (Anime Wikis)",
    description: "A network of fan-edited wikis for specific anime (e.g., One Piece Wiki), providing episode summaries, character details, and lore guides.",
    category: "guides",
    tags: ["wikis", "fan-edited", "lore", "summaries"],
    nsfw: false
  },
  {
    url: "https://www.animenewsnetwork.com/encyclopedia",
    title: "Anime News Network (Encyclopedia)",
    description: "An authoritative guide with entries on anime titles, staff, and studios, serving as a reference for production details and historical context.",
    category: "guides",
    tags: ["encyclopedia", "reference", "production", "historical"],
    nsfw: false
  },
  {
    url: "https://theanimewatchersguide.com",
    title: "The Anime Watcher's Guide",
    description: "A beginner-friendly site with guides on starting anime, including platform recommendations, genre intros, and viewing orders for complex series.",
    category: "guides",
    tags: ["beginner", "genre-intros", "viewing-orders", "recommendations"],
    nsfw: false
  },
  {
    url: "https://animify.fun",
    title: "Animify.fun",
    description: "A site offering guides and tools for anime fans, including watch order lists, episode trackers, and recommendations, with a fun, user-friendly design to enhance the viewing experience.",
    category: "guides",
    tags: ["watch-order", "trackers", "recommendations", "user-friendly"],
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
  console.log(`Adding ${guideWebsites.length} guide websites to the database...`);
  
  // Add sites sequentially to avoid overwhelming the server
  let successCount = 0;
  let failureCount = 0;
  
  for (const site of guideWebsites) {
    const result = await addSite(site);
    if (result) {
      successCount++;
    } else {
      failureCount++;
    }
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`Finished adding guide websites! Success: ${successCount}, Failures: ${failureCount}`);
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});