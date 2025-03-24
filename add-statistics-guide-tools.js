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
        category: "tools",
        tags: site.tags || ["statistics", "guides", "resources"],
        featured: false,
        nsfw: false // All marked as SFW
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
  // All sites are SFW
  const statToolsSites = [
    {
      url: "https://www.anime-stats.net",
      title: "Anime Stats",
      description: "A site offering detailed statistics on anime viewership, ratings, and trends, often pulling data from platforms like MyAnimeList to analyze popularity and demographics.",
      tags: ["statistics", "analytics", "ratings", "trends"]
    },
    {
      url: "https://animekarmalist.com",
      title: "AnimeKarmaList",
      description: "An interactive chart tracking the most popular anime based on Reddit's r/anime community votes and discussions, updated weekly to reflect current karma rankings.",
      tags: ["statistics", "reddit", "rankings", "popularity"]
    },
    {
      url: "https://www.anitrendz.com",
      title: "Anime Trending",
      description: "A site providing weekly and seasonal top anime charts, based on community votes and trends, with a focus on what's hot in the anime world right now.",
      tags: ["statistics", "rankings", "seasonal", "polls"]
    },
    {
      url: "https://animecorner.me",
      title: "AnimeCorner",
      description: "Features weekly and seasonal anime polls, ranking the best series, characters, and voice actors based on fan votes, alongside news and reviews.",
      tags: ["statistics", "polls", "rankings", "characters"]
    },
    {
      url: "https://kitsu.io/trending/anime",
      title: "Kitsu Season Trends",
      description: "Part of the Kitsu platform, this section tracks trending anime by season, using user activity and ratings to highlight what's popular among its community.",
      tags: ["statistics", "trends", "seasonal", "community"]
    },
    {
      url: "https://www.japanesewithanime.com",
      title: "Japanese with Anime",
      description: "A blog teaching Japanese language concepts through anime examples, explaining grammar, vocabulary, and cultural nuances for learners.",
      tags: ["guides", "japanese", "language", "learning"]
    },
    {
      url: "https://wotaku.moe",
      title: "Wotaku",
      description: "A guide site offering insights into anime terminology, tropes, and culture, aimed at both newbies and seasoned otaku, with a focus on educational content.",
      tags: ["guides", "terminology", "culture", "education"]
    },
    {
      url: "https://www.animefillerlist.com",
      title: "AnimeFillerList",
      description: "A resource listing filler episodes for popular anime series, helping viewers skip non-canon content and stick to the main storyline.",
      tags: ["guides", "filler", "episodes", "canon"]
    },
    {
      url: "https://www.animefillerguide.com",
      title: "AnimeFillerGuide",
      description: "Similar to AnimeFillerList, this site provides detailed guides on filler episodes and arcs across various anime, with episode-by-episode breakdowns.",
      tags: ["guides", "filler", "episodes", "breakdown"]
    },
    {
      url: "https://tagsearchblogs.neocities.org",
      title: "Tag Search Blogs",
      description: "A directory of anime blogs searchable by tags (e.g., genres, themes), linking to fan reviews, analyses, and niche discussions.",
      tags: ["guides", "blogs", "search", "reviews"]
    },
    {
      url: "https://en.touhouwiki.net",
      title: "Touhou Wiki",
      description: "A comprehensive wiki for the Touhou Project, covering its games, characters, music, and anime-style fan works, maintained by an active community.",
      tags: ["guides", "wiki", "touhou", "games"]
    },
    {
      url: "https://fansubindex.neocities.org",
      title: "Certain Fansubber's Index",
      description: "An index of fansub groups cataloging active and historical subbers with release details for anime series.",
      tags: ["guides", "fansub", "index", "releases"]
    },
    {
      url: "https://recommendmeanime.com",
      title: "RecommendMeAnime",
      description: "A blog offering anime recommendations based on genres, themes, or similar series, with detailed write-ups to help fans discover new titles.",
      tags: ["guides", "recommendations", "reviews", "discovery"]
    }
  ];
  
  let addedCount = 0;
  
  // Add all sites
  console.log("Adding anime statistics and guide tools...");
  for (const site of statToolsSites) {
    const added = await addSite(site);
    if (added) addedCount++;
  }
  
  console.log(`Added ${addedCount} new anime statistics and guide tools`);
  return addedCount;
}

// Run the main function
addAllSites()
  .then(count => console.log(`Done! Added ${count} anime statistics and guide tools.`))
  .catch(error => console.error(`Failed: ${error.message}`));