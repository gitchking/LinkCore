import fetch from "node-fetch";

// List of anime trend sites with their details
const trendSites = [
  {
    url: "https://anitrendz.com",
    title: "Anime Trending",
    description: "A go-to site for weekly and seasonal anime charts, driven by fan votes. It ranks top anime, characters, couples, and soundtracks, making it a pulse-check for what's trending each season. Updated regularly with news and community insights, it's ideal for tracking current favorites.",
    category: "trends",
    tags: ["rankings", "charts", "fan-votes", "seasonal"],
    nsfw: false
  },
  {
    url: "https://animecorner.me",
    title: "AnimeCorner",
    description: "Known for its weekly polls and seasonal rankings, this site aggregates fan votes to list the most popular anime, characters, and voice actors. It's a reliable source for spotting trending series and staying updated with community sentiment.",
    category: "trends",
    tags: ["polls", "rankings", "community", "weekly"],
    nsfw: false
  },
  {
    url: "https://myanimelist.net",
    title: "MyAnimeList (MAL)",
    description: "A massive anime database with a 'Top Anime' section that reflects trending and all-time popular series based on user scores and activity. Its seasonal charts and news updates also highlight what's currently buzzing among millions of users.",
    category: "trends",
    tags: ["database", "rankings", "user-ratings", "top-anime"],
    nsfw: false
  },
  {
    url: "https://kitsu.io",
    title: "Kitsu",
    description: "Features a 'Trending Anime' section driven by user engagement and ratings, alongside seasonal recommendations. It's a community-focused platform that shows what's gaining traction in real-time.",
    category: "trends",
    tags: ["community", "trending", "recommendations", "realtime"],
    nsfw: false
  },
  {
    url: "https://www.animenewsnetwork.com",
    title: "Anime News Network (ANN)",
    description: "While primarily a news site, its seasonal previews, reviews, and 'This Week in Anime' columns spotlight trending shows based on industry buzz and viewer interest, backed by editorial insights.",
    category: "trends",
    tags: ["news", "reviews", "industry", "previews"],
    nsfw: false
  },
  {
    url: "https://www.crunchyroll.com",
    title: "Crunchyroll",
    description: "A leading streaming platform with a 'Popular' and 'Trending' section, showcasing anime based on viewership and simulcast hype. Its news feed also covers trending topics and new releases.",
    category: "trends",
    tags: ["streaming", "popular", "simulcast", "official"],
    nsfw: false
  },
  {
    url: "https://anichart.net",
    title: "AniChart",
    description: "A seasonal chart site that visually tracks airing anime, with filters for popularity and community interest. It's a quick way to see what's trending based on current broadcasts and fan anticipation.",
    category: "trends",
    tags: ["seasonal", "charts", "visual", "airing"],
    nsfw: false
  },
  {
    url: "https://www.livechart.me",
    title: "LiveChart.me",
    description: "Similar to AniChart, it lists airing anime with a focus on schedules and popularity metrics, helping you spot trending shows by season or week through user interaction and views.",
    category: "trends",
    tags: ["seasonal", "schedules", "metrics", "interactive"],
    nsfw: false
  },
  {
    url: "https://www.reddit.com/r/anime",
    title: "Reddit (r/anime)",
    description: "A community hub where trending anime emerge through discussion threads, karma rankings (e.g., AnimeKarmaList), and weekly episode polls. It's raw, real-time fan sentiment at its core.",
    category: "trends",
    tags: ["community", "discussions", "karma", "polls"],
    nsfw: false
  },
  {
    url: "https://www.tokyoinsider.com",
    title: "Tokyo Insider",
    description: "A lesser-known site that tracks trending anime via downloads and community activity, often highlighting what's hot among avid watchers, though it leans toward unofficial sources.",
    category: "trends",
    tags: ["downloads", "activity", "underground", "unofficial"],
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
  console.log(`Adding ${trendSites.length} trend sites to the database...`);
  
  // Add sites sequentially to avoid overwhelming the server
  let successCount = 0;
  let failureCount = 0;
  
  for (const site of trendSites) {
    const result = await addSite(site);
    if (result) {
      successCount++;
    } else {
      failureCount++;
    }
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`Finished adding trend sites! Success: ${successCount}, Failures: ${failureCount}`);
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});