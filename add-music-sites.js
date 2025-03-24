import fetch from "node-fetch";

// List of music sites with their details, all marked as SFW
const sites = [
  {
    url: "https://karaokemugen.app",
    title: "Karaoke Mugen",
    description: "An open-source karaoke project for anime songs, offering a database of lyrics and instrumental tracks for fans to sing along.",
    category: "music",
    tags: ["karaoke", "anime-songs", "open-source", "lyrics"],
    nsfw: false
  },
  {
    url: "https://animesonglyrics.com",
    title: "Anime Song Lyrics",
    description: "A site providing lyrics for anime songs, including openings, endings, and inserts, with romanizations and translations.",
    category: "music",
    tags: ["lyrics", "anime-songs", "romanizations", "translations"],
    nsfw: false
  },
  {
    url: "https://lyrical-nonsense.com",
    title: "Lyrical Nonsense",
    description: "A database of anime and J-pop song lyrics, offering Japanese text, romanizations, and English translations.",
    category: "music",
    tags: ["lyrics", "j-pop", "romanizations", "translations"],
    nsfw: false
  },
  {
    url: "https://animethemes.moe",
    title: "AnimeThemes",
    description: "A site hosting high-quality videos and audio of anime openings and endings, with a focus on cataloging theme songs.",
    category: "music",
    tags: ["anime-themes", "openings", "endings", "high-quality"],
    nsfw: false
  },
  {
    url: "https://anisongdb.com",
    title: "AnisongDB",
    description: "A searchable database of anime songs, including metadata like artists and series, useful for identifying tracks.",
    category: "music",
    tags: ["anime-songs", "database", "metadata", "search"],
    nsfw: false
  },
  {
    url: "https://www.youtube.com",
    title: "Youtube",
    description: "A universal platform where fans upload anime songs, karaoke versions, OSTs, and lyric videos, widely accessible.",
    category: "music",
    tags: ["platform", "anime-songs", "karaoke", "osts"],
    nsfw: false
  },
  {
    url: "https://listen.moe",
    title: "listen.moe",
    description: "An online streaming service for J-pop and anime music, offering a live radio experience with a community chat.",
    category: "music",
    tags: ["streaming", "j-pop", "anime-music", "radio"],
    nsfw: false
  },
  {
    url: "https://r-a-d.io",
    title: "R/a/dio",
    description: "An internet radio station playing anime and J-pop music, run by fans with a focus on continuous playback.",
    category: "music",
    tags: ["radio", "anime", "j-pop", "fan-run"],
    nsfw: false
  },
  {
    url: "https://sukidesuost.info",
    title: "Sukidesuost",
    description: "A site offering downloadable anime OSTs and singles, often with direct links to high-quality files.",
    category: "music",
    tags: ["osts", "downloads", "anime", "singles"],
    nsfw: false
  },
  {
    url: "https://yumeost.club",
    title: "YumeOST",
    description: "Provides downloadable anime soundtracks, focusing on rare and nostalgic OSTs from various series.",
    category: "music",
    tags: ["osts", "downloads", "nostalgic", "rare"],
    nsfw: false
  },
  {
    url: "https://sittingonclouds.net",
    title: "Sitting on Clouds",
    description: "A popular archive for downloading anime and game OSTs, known for its extensive collection and organized layout.",
    category: "music",
    tags: ["osts", "archive", "downloads", "organized"],
    nsfw: false
  },
  {
    url: "https://doujinstyle.com",
    title: "DoujinStyle",
    description: "A community site for doujin music and anime OSTs, offering direct downloads and a forum for fans.",
    category: "music",
    tags: ["doujin", "osts", "downloads", "community"],
    nsfw: false
  },
  {
    url: "https://mikudb.moe",
    title: "MikuDB",
    description: "A site dedicated to Vocaloid music, including Hatsune Miku songs, with downloadable albums and singles.",
    category: "music",
    tags: ["vocaloid", "hatsune-miku", "downloads", "albums"],
    nsfw: false
  },
  {
    url: "https://tlmc.eu",
    title: "TLMC",
    description: "A Touhou music collection, offering downloads of fan-made arrangements and original tracks from the series.",
    category: "music",
    tags: ["touhou", "fan-made", "arrangements", "downloads"],
    nsfw: false
  },
  {
    url: "https://touhouplayer.com",
    title: "Touhou Player",
    description: "A platform for streaming and downloading Touhou music, with a focus on fan arrangements and OSTs.",
    category: "music",
    tags: ["touhou", "streaming", "downloads", "arrangements"],
    nsfw: false
  },
  {
    url: "https://downloads.khinsider.com",
    title: "KHInsider",
    description: "A massive archive for video game soundtracks, including anime-inspired games, with free direct downloads.",
    category: "music",
    tags: ["game-soundtracks", "archive", "downloads", "anime-inspired"],
    nsfw: false
  },
  {
    url: "https://sonixgvn.net",
    title: "Sonix's OST",
    description: "A site offering anime and game OST downloads, curated by Sonix, with a focus on high-quality rips.",
    category: "music",
    tags: ["osts", "downloads", "curated", "high-quality"],
    nsfw: false
  },
  {
    url: "https://hiyoriost.com",
    title: "HiyoriOST",
    description: "A newer site for downloading anime OSTs, featuring a clean design and regular updates with series soundtracks.",
    category: "music",
    tags: ["osts", "downloads", "clean-design", "regular-updates"],
    nsfw: false
  },
  {
    url: "https://osanime.com",
    title: "Osanime",
    description: "A site providing anime music downloads, including OSTs and singles, often with direct links.",
    category: "music",
    tags: ["anime-music", "downloads", "osts", "singles"],
    nsfw: false
  },
  {
    url: "https://allanimesongs.com",
    title: "AllAnime Music",
    description: "A resource for streaming and downloading anime music, covering openings, endings, and OSTs.",
    category: "music",
    tags: ["anime-music", "streaming", "downloads", "openings"],
    nsfw: false
  },
  {
    url: "https://sakuraost.com",
    title: "SakuraOST",
    description: "A site focused on anime OST downloads, with an emphasis on Japanese music and cherry blossom-themed branding.",
    category: "music",
    tags: ["osts", "downloads", "japanese", "themed"],
    nsfw: false
  },
  {
    url: "https://jpopsingles.eu",
    title: "JPopSingles",
    description: "A site offering downloadable J-pop singles, including anime tie-ins, with high-quality audio files.",
    category: "music",
    tags: ["j-pop", "singles", "downloads", "anime-tie-ins"],
    nsfw: false
  },
  {
    url: "https://squidify.org",
    title: "Squidify",
    description: "An online player and downloader for anime music, integrating with Spotify-like features for fans.",
    category: "music",
    tags: ["player", "downloader", "anime-music", "spotify-like"],
    nsfw: false
  },
  {
    url: "https://yggdrasilradio.net",
    title: "Yggdrasil Radio",
    description: "An internet radio station streaming anime and J-pop music, with a mythological Norse theme.",
    category: "music",
    tags: ["radio", "streaming", "anime", "j-pop"],
    nsfw: false
  },
  {
    url: "https://gensokyoradio.net",
    title: "Gensokyo Radio",
    description: "A Touhou-focused radio station streaming fan-made and original music from the series 24/7.",
    category: "music",
    tags: ["radio", "touhou", "fan-made", "streaming"],
    nsfw: false
  },
  {
    url: "https://openings.moe",
    title: "Openings.moe",
    description: "A site for streaming and downloading anime openings and endings, with a random playback feature.",
    category: "music",
    tags: ["openings", "endings", "streaming", "downloads"],
    nsfw: false
  },
  {
    url: "https://aniplaylist.com",
    title: "AniPlaylist",
    description: "A site curating Spotify playlists of anime songs, linking to official streams of openings and OSTs.",
    category: "music",
    tags: ["spotify", "playlists", "anime-songs", "official"],
    nsfw: false
  },
  {
    url: "https://mangazip.is",
    title: "MangaZip Music",
    description: "Primarily a manga site, but also offers anime music downloads, including OSTs and singles.",
    category: "music",
    tags: ["manga", "music", "downloads", "osts"],
    nsfw: false
  },
  {
    url: "https://animemusicquiz.com",
    title: "AnimeMusicQuiz",
    description: "A game and resource for identifying anime songs, with a community database and playback features.",
    category: "music",
    tags: ["quiz", "game", "anime-songs", "community"],
    nsfw: false
  },
  {
    url: "https://vgmdb.net",
    title: "VGMdb",
    description: "A detailed database for video game and anime music, offering metadata and links to purchase OSTs.",
    category: "music",
    tags: ["database", "video-game", "anime-music", "metadata"],
    nsfw: false
  },
  {
    url: "https://www.nicovideo.jp",
    title: "Nico Nico Douga",
    description: "A Japanese video platform with user-uploaded anime songs, karaoke versions, and Vocaloid content.",
    category: "music",
    tags: ["japanese", "platform", "anime-songs", "vocaloid"],
    nsfw: false
  },
  {
    url: "https://open.spotify.com/genre/anime",
    title: "Spotify (Anime Hub)",
    description: "An official streaming service with curated anime playlists, including openings, endings, and OSTs.",
    category: "music",
    tags: ["official", "streaming", "playlists", "curated"],
    nsfw: false
  },
  {
    url: "https://www.zophar.net/music",
    title: "Zophar's Domain",
    description: "A site for downloading game music, including anime tie-in games, in various formats like MP3.",
    category: "music",
    tags: ["game-music", "downloads", "anime-tie-in", "formats"],
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
  console.log(`Adding ${sites.length} music sites to the database...`);
  
  // Add sites sequentially to avoid overwhelming the server
  for (const site of sites) {
    await addSite(site);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log("Finished adding music sites!");
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});