import fetch from "node-fetch";

// List of database sites with their details, properly labeled for NSFW content
const sites = [
  // Anime Schedules and Calendars
  {
    url: "https://anichart.net",
    title: "Anichart",
    description: "A seasonal anime chart displaying upcoming and airing shows, with filters for genres, studios, and airing dates.",
    category: "databases",
    tags: ["anime", "seasonal", "charts", "airing"],
    nsfw: false
  },
  {
    url: "https://www.livechart.me",
    title: "Livechart",
    description: "A detailed anime schedule with real-time updates, countdowns, and streaming platform links for new releases.",
    category: "databases",
    tags: ["anime", "schedule", "real-time", "countdowns"],
    nsfw: false
  },
  {
    url: "https://cal.syoboi.jp",
    title: "Syoboi Calendar",
    description: "A Japanese anime airing calendar, offering detailed broadcast schedules and episode tracking, primarily in Japanese.",
    category: "databases",
    tags: ["anime", "calendar", "japanese", "broadcast"],
    nsfw: false
  },
  {
    url: "https://animeschedule.net",
    title: "AnimeSchedule",
    description: "A clean, English-friendly anime airing schedule with countdowns, simulcast info, and customizable time zones.",
    category: "databases",
    tags: ["anime", "schedule", "english", "simulcast"],
    nsfw: false
  },
  {
    url: "https://upcomingdubbedanime.com",
    title: "Upcoming Dubbed Anime",
    description: "A site focused on upcoming English-dubbed anime releases, listing dates and platforms for dubbed versions.",
    category: "databases",
    tags: ["anime", "dubbed", "english", "releases"],
    nsfw: false
  },
  {
    url: "https://dubsreleasecalendar.com",
    title: "Dubs Release Calendar",
    description: "A calendar tracking English dub releases, providing schedules for dubbed anime across streaming services.",
    category: "databases",
    tags: ["anime", "dubs", "calendar", "english"],
    nsfw: false
  },
  {
    url: "https://otakucalendar.com",
    title: "Otaku Calendar",
    description: "A lesser-known site offering anime and manga release dates, aimed at otaku with a simple, functional design.",
    category: "databases",
    tags: ["anime", "manga", "calendar", "releases"],
    nsfw: false
  },
  
  // Databases and Trackers
  {
    url: "https://myanimelist.net",
    title: "MyAnimeList",
    description: "A leading anime and manga database with user tracking, reviews, and a vast community for cataloging titles.",
    category: "databases",
    tags: ["anime", "manga", "tracking", "community"],
    nsfw: false
  },
  {
    url: "https://anilist.co",
    title: "Anilist",
    description: "A modern anime and manga tracker with a sleek interface, social features, and detailed statistics.",
    category: "databases",
    tags: ["anime", "manga", "tracker", "statistics"],
    nsfw: false
  },
  {
    url: "https://anidb.net",
    title: "AniDB",
    description: "A comprehensive anime database with technical details, file tracking, and a focus on raw data for enthusiasts.",
    category: "databases",
    tags: ["anime", "database", "technical", "enthusiasts"],
    nsfw: false
  },
  {
    url: "https://www.mangaupdates.com",
    title: "Baka-Updates",
    description: "A manga-focused database tracking scanlations, releases, and groups, with a strong community presence.",
    category: "databases",
    tags: ["manga", "database", "scanlations", "tracking"],
    nsfw: false
  },
  {
    url: "https://vndb.org",
    title: "Visual Novel DB",
    description: "A detailed database for visual novels, cataloging titles, developers, and releases with user ratings.",
    category: "databases",
    tags: ["visual-novels", "database", "developers", "ratings"],
    nsfw: false
  },
  {
    url: "https://vocadb.net",
    title: "VocaDB",
    description: "A database for Vocaloid songs and artists, offering metadata, lyrics, and community contributions.",
    category: "databases",
    tags: ["vocaloid", "database", "songs", "lyrics"],
    nsfw: false
  },
  {
    url: "https://kuroiru.com",
    title: "Kuroiru",
    description: "A lesser-known tracker for anime and manga, with a focus on personal libraries and niche content.",
    category: "databases",
    tags: ["anime", "manga", "tracker", "personal-libraries"],
    nsfw: false
  },
  {
    url: "https://simkl.com",
    title: "SIMKL",
    description: "A multi-media tracker for anime, TV shows, and movies, integrating with streaming platforms and apps.",
    category: "databases",
    tags: ["multi-media", "tracker", "anime", "integration"],
    nsfw: false
  },
  {
    url: "https://mydramalist.com",
    title: "MyDramaList",
    description: "A database for Asian dramas (Korean, Chinese, etc.), with user ratings, reviews, and airing schedules.",
    category: "databases",
    tags: ["asian-dramas", "database", "korean", "chinese"],
    nsfw: false
  },
  {
    url: "https://kenmei.co",
    title: "Kenmei",
    description: "A manga tracking tool with a clean design, allowing users to follow series and scanlation updates.",
    category: "databases",
    tags: ["manga", "tracking", "clean-design", "scanlations"],
    nsfw: false
  },
  {
    url: "https://scanupdates.com",
    title: "ScanUpdates",
    description: "A site tracking manga scanlations, offering release notifications and group information.",
    category: "databases",
    tags: ["manga", "scanlations", "tracking", "notifications"],
    nsfw: false
  },
  {
    url: "https://mywaifulist.moe",
    title: "MyWaifuList",
    description: "A fun database for anime characters, letting users vote on and rank their favorite 'waifus' and 'husbandos.'",
    category: "databases",
    tags: ["anime-characters", "database", "ranking", "community"],
    nsfw: false
  },
  {
    url: "https://vgmdb.net",
    title: "VGMdb",
    description: "A database for video game and anime music, providing detailed info on albums, artists, and releases.",
    category: "databases",
    tags: ["video-game", "anime-music", "database", "albums"],
    nsfw: false
  },
  {
    url: "https://anison.info",
    title: "Anison Charts",
    description: "A Japanese site charting anime songs, with historical data and rankings for openings and endings.",
    category: "databases",
    tags: ["anime-songs", "charts", "rankings", "japanese"],
    nsfw: false
  },
  {
    url: "https://www.anime-planet.com",
    title: "AnimePlanet",
    description: "An anime and manga database with recommendations, user lists, and a friendly community interface.",
    category: "databases",
    tags: ["anime", "manga", "recommendations", "community"],
    nsfw: false
  },
  {
    url: "https://kitsu.io",
    title: "Kitsu",
    description: "A tracker for anime and manga, offering a social platform with discovery tools and progress tracking.",
    category: "databases",
    tags: ["anime", "manga", "social", "tracking"],
    nsfw: false
  },
  {
    url: "https://wholesomelist.com",
    title: "WholesomeList",
    description: "A curated list of wholesome hentai and adult anime/manga, with a focus on positive content.",
    category: "databases",
    tags: ["hentai", "curated", "positive", "adult"],
    nsfw: true
  },
  {
    url: "https://hentag.com",
    title: "Hentag",
    description: "A database for adult anime and manga, offering tags and tracking for hentai enthusiasts.",
    category: "databases",
    tags: ["hentai", "database", "tags", "tracking"],
    nsfw: true
  },
  {
    url: "https://doujinshi.wiki",
    title: "Doujinshi.wiki",
    description: "A wiki-style database for doujinshi, cataloging fan-made works with detailed metadata.",
    category: "databases",
    tags: ["doujinshi", "database", "wiki", "metadata"],
    nsfw: true
  },
  {
    url: "https://doujinshi.info",
    title: "Doujinshi.info",
    description: "Another doujinshi database, providing info on artists, circles, and publications.",
    category: "databases",
    tags: ["doujinshi", "database", "artists", "publications"],
    nsfw: true
  },
  {
    url: "https://kurozora.app",
    title: "Kurozora",
    description: "An anime and manga tracker app with a sleek design, offering personalized lists and notifications.",
    category: "databases",
    tags: ["anime", "manga", "tracker", "app"],
    nsfw: false
  },
  {
    url: "https://www.anisearch.com",
    title: "AniSearch",
    description: "A multilingual anime and manga database, with detailed entries and user reviews, popular in Europe.",
    category: "databases",
    tags: ["anime", "manga", "multilingual", "europe"],
    nsfw: false
  },
  {
    url: "https://notify.moe",
    title: "Notify.moe",
    description: "A minimalist anime tracker with airing notifications and integration with MyAnimeList.",
    category: "databases",
    tags: ["anime", "tracker", "minimalist", "notifications"],
    nsfw: false
  },
  {
    url: "https://shikimori.one",
    title: "Шикимори (Shikimori)",
    description: "A Russian-based anime and manga tracker, offering a colorful interface and community features.",
    category: "databases",
    tags: ["anime", "manga", "russian", "community"],
    nsfw: false
  },
  {
    url: "https://www.animenewsnetwork.com",
    title: "AnimeNewsNetwork",
    description: "A news and database site for anime, with an encyclopedia of titles, staff, and production details.",
    category: "databases",
    tags: ["anime", "news", "encyclopedia", "titles"],
    nsfw: false
  },
  {
    url: "https://nevix.app",
    title: "Nevix",
    description: "A newer anime and manga tracker, focusing on a mobile-friendly experience and personal libraries.",
    category: "databases",
    tags: ["anime", "manga", "mobile-friendly", "personal-libraries"],
    nsfw: false
  },
  {
    url: "https://medialib.tv",
    title: "MediaLib",
    description: "A tracker for anime, dramas, and other media, with a focus on organizing personal collections.",
    category: "databases",
    tags: ["anime", "dramas", "tracker", "personal-collections"],
    nsfw: false
  },
  {
    url: "https://www.animecharactersdatabase.com",
    title: "Anime Characters DB",
    description: "A database of anime characters, searchable by traits, series, and voice actors, with user contributions.",
    category: "databases",
    tags: ["anime-characters", "database", "traits", "voice-actors"],
    nsfw: false
  },
  {
    url: "https://bgm.tv",
    title: "Bangumi",
    description: "A Chinese anime, manga, and game database, popular among Asian fans for its detailed entries.",
    category: "databases",
    tags: ["anime", "manga", "chinese", "detailed"],
    nsfw: false
  },
  {
    url: "https://trakt.tv",
    title: "Trakt",
    description: "A general media tracker that includes anime, syncing with streaming services and personal watchlists.",
    category: "databases",
    tags: ["media", "tracker", "anime", "syncing"],
    nsfw: false
  },
  {
    url: "https://hummingbird.me",
    title: "Hummingbird",
    description: "An older anime and manga tracker (predecessor to Kitsu), still used by some for its nostalgic interface.",
    category: "databases",
    tags: ["anime", "manga", "tracker", "nostalgic"],
    nsfw: false
  },
  {
    url: "https://animethemes.wiki",
    title: "AnimeThemes.wiki",
    description: "A wiki-style tracker for anime themes (openings/endings), with metadata and streaming links.",
    category: "databases",
    tags: ["anime-themes", "wiki", "openings", "endings"],
    nsfw: false
  },
  {
    url: "https://mangadex.org",
    title: "MangaDex Tracker",
    description: "While primarily a manga reader, it includes a basic tracker for following series and updates.",
    category: "databases",
    tags: ["manga", "tracker", "reader", "updates"],
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
  console.log(`Adding ${sites.length} database sites to the database...`);
  
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
  
  console.log("Finished adding database sites!");
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});