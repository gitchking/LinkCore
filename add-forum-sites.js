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
        category: "forums",
        tags: site.tags || ["forum", "community", "discussion"],
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
  // SFW forums
  const sfwForums = [
    {
      url: "https://www.reddit.com/r/anime",
      title: "Reddit - r/anime",
      description: "A massive community with over 5 million members discussing anime news, reviews, recommendations, and fan content.",
      tags: ["forum", "reddit", "community", "discussion"],
      nsfw: false
    },
    {
      url: "https://myanimelist.net/forum",
      title: "MyAnimeList Forum",
      description: "The official forum for MyAnimeList users, covering anime, manga, and general otaku culture.",
      tags: ["forum", "tracking", "community", "discussion"],
      nsfw: false
    },
    {
      url: "https://anilist.co/forum",
      title: "Anilist Forum",
      description: "Anilist's community forum, integrated with its anime/manga tracking platform. Modern interface focused on series discussions.",
      tags: ["forum", "tracking", "community", "discussion"],
      nsfw: false
    },
    {
      url: "https://anidb.net/forum",
      title: "AniDB Forum",
      description: "The forum for AniDB, a detailed anime database. Technical and niche, with discussions on database entries and anime metadata.",
      tags: ["forum", "database", "technical", "discussion"],
      nsfw: false
    },
    {
      url: "https://forums.mangadex.org",
      title: "MangaDex Forum",
      description: "Attached to the MangaDex scanlation site, this forum focuses on manga releases, scanlation groups, and reader feedback.",
      tags: ["forum", "manga", "scanlation", "discussion"],
      nsfw: false
    },
    {
      url: "https://animeforums.net",
      title: "Animeforums",
      description: "A general anime discussion forum with sections for news, reviews, and fan creations. Welcoming to newcomers.",
      tags: ["forum", "community", "discussion", "reviews"],
      nsfw: false
    },
    {
      url: "https://www.animenewsnetwork.com/bbs",
      title: "ANN Forum",
      description: "The forum for Anime News Network, tied to its news and encyclopedia site. A place for in-depth anime discussions and industry news.",
      tags: ["forum", "news", "industry", "discussion"],
      nsfw: false
    },
    {
      url: "https://forums.animeuknews.net",
      title: "Anime UK News Forum",
      description: "The forum for Anime UK News, a British anime site. Covers anime, manga, and UK-specific events.",
      tags: ["forum", "uk", "regional", "discussion"],
      nsfw: false
    },
    {
      url: "https://www.animenation.net/forums",
      title: "AnimeNation Forums",
      description: "An older forum linked to the now-defunct AnimeNation retailer. Historically significant for early online anime fandom discussions.",
      tags: ["forum", "legacy", "community", "discussion"],
      nsfw: false
    },
    {
      url: "https://www.animeforum.com",
      title: "AnimeForum.com",
      description: "A long-standing general anime forum with sections for series, fan art, and roleplay. Retains a nostalgic charm for veteran fans.",
      tags: ["forum", "general", "roleplay", "fan art"],
      nsfw: false
    },
    {
      url: "https://forums.animesuki.com",
      title: "AnimeSuki Forum",
      description: "A forum tied to the AnimeSuki fansub site, focusing on anime episode discussions, fansubs, and news.",
      tags: ["forum", "fansubs", "discussion", "legacy"],
      nsfw: false
    },
    {
      url: "https://mangahelpers.com",
      title: "MangaHelpers",
      description: "A forum for manga fans, with a strong focus on scanlation, raw chapters, and translation communities.",
      tags: ["forum", "manga", "scanlation", "translation"],
      nsfw: false
    },
    {
      url: "https://anisocial.net",
      title: "AniSocial",
      description: "A newer, smaller forum aiming to be a social hub for anime fans, with threads on series, games, and general otaku topics.",
      tags: ["forum", "social", "new", "community"],
      nsfw: false
    }
  ];
  
  // NSFW forums
  const nsfwForums = [
    {
      url: "https://www.anime-sharing.com",
      title: "Anime-Sharing",
      description: "A forum for sharing anime, visual novels, and hentai content, with a strong emphasis on direct downloads.",
      tags: ["forum", "sharing", "downloads", "hentai"],
      nsfw: true
    },
    {
      url: "https://www.ulmf.org",
      title: "ULMF",
      description: "The Unofficial LineMarvel Forum, focused on adult games and hentai, including anime-style content.",
      tags: ["forum", "adult games", "hentai", "eroge"],
      nsfw: true
    },
    {
      url: "https://boards.4channel.org/a/",
      title: "4ch/a/",
      description: "The /a/ (anime and manga) board on 4chan, an anonymous, fast-paced discussion space. Chaotic, unfiltered, and influential in anime meme culture.",
      tags: ["forum", "anonymous", "unfiltered", "memes"],
      nsfw: true
    },
    {
      url: "https://forums.fuwanovel.net",
      title: "Fuwanovel Forum",
      description: "A community for visual novel fans, offering discussions on games, translations, and downloads. Includes adult visual novels.",
      tags: ["forum", "visual novels", "translations", "downloads"],
      nsfw: true
    }
  ];
  
  let addedCount = 0;
  
  // Add all SFW forums
  console.log("Adding SFW forums...");
  for (const site of sfwForums) {
    const added = await addSite(site);
    if (added) addedCount++;
  }
  
  // Add all NSFW forums
  console.log("Adding NSFW forums...");
  for (const site of nsfwForums) {
    const added = await addSite(site);
    if (added) addedCount++;
  }
  
  console.log(`Added ${addedCount} new forum sites`);
  return addedCount;
}

// Run the main function
addAllSites()
  .then(count => console.log(`Done! Added ${count} forum sites.`))
  .catch(error => console.error(`Failed: ${error.message}`));