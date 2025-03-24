import fetch from "node-fetch";

// List of tool sites with their details
const sites = [
  // Privacy and Ad-Blocking Tools
  {
    url: "https://ublockorigin.com",
    title: "uBlock Origin",
    description: "A free, open-source browser extension for blocking ads, trackers, and malicious scripts, known for its efficiency and extensive filter list support.",
    category: "tools",
    tags: ["privacy", "ad-blocking", "browser-extension", "open-source"],
    nsfw: false
  },
  {
    url: "https://nordvpn.com",
    title: "NordVPN",
    description: "A virtual private network service that encrypts internet traffic and masks your IP address, enhancing privacy and security online.",
    category: "tools",
    tags: ["vpn", "privacy", "security", "encryption"],
    nsfw: false
  },
  {
    url: "https://protonvpn.com",
    title: "ProtonVPN",
    description: "A secure VPN service focused on privacy, offering free and premium tiers with strong encryption and a no-logs policy.",
    category: "tools",
    tags: ["vpn", "privacy", "security", "encryption"],
    nsfw: false
  },
  {
    url: "https://adguard.com",
    title: "AdGuard",
    description: "An app and browser extension for blocking ads and trackers, available as a standalone application or system-wide filter, with premium features for enhanced protection.",
    category: "tools",
    tags: ["ad-blocking", "privacy", "browser-extension", "system-wide"],
    nsfw: false
  },
  
  // Miscellaneous Tools
  {
    url: "https://git.sr.ht/~thestr4ng3r/chiaki",
    title: "Chiaki",
    description: "An open-source client for remote play, allowing users to stream PlayStation games to their PC or other devices over a local network or the internet.",
    category: "tools",
    tags: ["remote-play", "playstation", "open-source", "gaming"],
    nsfw: false
  },
  {
    url: "https://malsync.moe",
    title: "MAL-sync",
    description: "A browser extension that syncs anime and manga watching/reading progress across platforms like MyAnimeList, Anilist, and various streaming sites.",
    category: "tools",
    tags: ["anime-tracking", "manga-tracking", "browser-extension", "sync"],
    nsfw: false
  },
  {
    url: "https://saucenao.com",
    title: "Saucenao",
    description: "A reverse image search engine specializing in finding the source of anime, manga, and artwork images, useful for identifying origins online.",
    category: "tools",
    tags: ["reverse-image-search", "anime", "manga", "artwork"],
    nsfw: false
  },
  {
    url: "https://trace.moe",
    title: "Trace.moe",
    description: "A reverse image search tool that identifies anime scenes from screenshots, providing episode and timestamp details by comparing frames to a database.",
    category: "tools",
    tags: ["reverse-image-search", "anime", "screenshots", "identification"],
    nsfw: false
  },
  {
    url: "https://cubari.moe",
    title: "Cubari",
    description: "A proxy-based manga reader that displays images from external sources (e.g., Imgur, nhentai) in a clean, manga-oriented interface without hosting content itself.",
    category: "tools",
    tags: ["manga-reader", "proxy", "clean-interface", "external-sources"],
    nsfw: false
  },
  {
    url: "https://karaokemugen.app",
    title: "Karaoke Mugen App",
    description: "An open-source desktop karaoke application for anime songs, providing lyrics and instrumental tracks for community-driven karaoke sessions.",
    category: "tools",
    tags: ["karaoke", "anime-songs", "open-source", "desktop"],
    nsfw: false
  },
  {
    url: "https://taiga.moe",
    title: "Taiga",
    description: "A desktop application for tracking anime and manga, integrating with MyAnimeList and featuring automatic airing notifications.",
    category: "tools",
    tags: ["anime-tracking", "manga-tracking", "desktop", "notifications"],
    nsfw: false
  },
  {
    url: "https://shokoanime.com",
    title: "Shoko",
    description: "A desktop anime collection manager that organizes files, fetches metadata, and integrates with trackers like MyAnimeList or AniDB.",
    category: "tools",
    tags: ["anime-collection", "metadata", "desktop", "organization"],
    nsfw: false
  },
  {
    url: "https://github.com/z411/trackma",
    title: "Trackma",
    description: "A lightweight desktop app for tracking anime and manga, supporting multiple list services (e.g., MyAnimeList, Anilist) with a minimal interface.",
    category: "tools",
    tags: ["anime-tracking", "manga-tracking", "desktop", "lightweight"],
    nsfw: false
  },
  {
    url: "https://komga.org",
    title: "Komga",
    description: "A self-hosted media server for manga and comics, allowing users to manage and read their digital collections via a web interface.",
    category: "tools",
    tags: ["manga-server", "self-hosted", "media-management", "web-interface"],
    nsfw: false
  },
  
  // Additional Tools from Second List
  {
    url: "https://sponsorblock.org",
    title: "SponsorBlock",
    description: "A browser extension that skips sponsor segments, intros, and outros in YouTube videos, including anime episodes and reviews, saving time for binge-watchers.",
    category: "tools",
    tags: ["youtube", "ad-skipping", "browser-extension", "time-saving"],
    nsfw: false
  },
  {
    url: "https://github.com/SimonBrasch/privacy-redirect",
    title: "Privacy Redirect",
    description: "An extension that redirects anime-related social media and video links to privacy-focused alternatives, reducing tracking while browsing fandom content.",
    category: "tools",
    tags: ["privacy", "redirect", "browser-extension", "social-media"],
    nsfw: false
  },
  {
    url: "https://annict.com",
    title: "Annict",
    description: "A Japanese anime tracking platform with a clean interface, offering airing schedules, personal watchlists, and community features.",
    category: "tools",
    tags: ["anime-tracking", "japanese", "airing-schedules", "watchlists"],
    nsfw: false
  },
  {
    url: "https://github.com/Atelier-Shiori/hachidori",
    title: "Hachidori",
    description: "A desktop app for macOS that auto-updates your MyAnimeList, Anilist, or Kitsu lists by detecting anime playback from local files or streaming services.",
    category: "tools",
    tags: ["anime-tracking", "macos", "auto-update", "detection"],
    nsfw: false
  },
  {
    url: "https://www.kavitareader.com",
    title: "Kavita",
    description: "A self-hosted manga and light novel server, allowing you to organize, read, and track your digital collection across devices with a web-based reader.",
    category: "tools",
    tags: ["manga-server", "light-novel", "self-hosted", "web-based"],
    nsfw: false
  },
  {
    url: "https://iqdb.org",
    title: "IQDB",
    description: "A reverse image search tool optimized for anime, manga, and doujinshi artwork, pulling results from multiple booru-style databases to identify sources.",
    category: "tools",
    tags: ["reverse-image-search", "anime", "manga", "doujinshi"],
    nsfw: false
  },
  {
    url: "https://whatanime.ga",
    title: "WaitAnime",
    description: "An alternative to Trace.moe, this tool identifies anime scenes from screenshots and provides episode details, leveraging a broad database of anime frames.",
    category: "tools",
    tags: ["reverse-image-search", "anime", "screenshots", "identification"],
    nsfw: false
  },
  {
    url: "https://animeeffects.org",
    title: "AnimeEffects",
    description: "A free, open-source 2D animation tool designed for creating anime-style keyframes and short sequences, ideal for fan animators or hobbyists.",
    category: "tools",
    tags: ["animation", "open-source", "2d", "keyframes"],
    nsfw: false
  },
  {
    url: "https://waifu2x.udp.jp",
    title: "Waifu2x",
    description: "An online tool that upscales and denoises anime-style images using deep learning, perfect for enhancing low-res artwork or screenshots.",
    category: "tools",
    tags: ["upscaling", "denoising", "anime-images", "deep-learning"],
    nsfw: false
  },
  {
    url: "https://kdenlive.org",
    title: "Kdenlive (Anime Workflow)",
    description: "A free, open-source video editor popular among anime AMV creators, offering robust timeline editing and effects for fan-made content.",
    category: "tools",
    tags: ["video-editor", "amv", "open-source", "timeline-editing"],
    nsfw: false
  },
  {
    url: "https://vocalremover.org",
    title: "VocalRemover",
    description: "An online tool to separate vocals from instrumentals in anime songs, useful for creating karaoke tracks or remixing OSTs.",
    category: "tools",
    tags: ["vocal-separation", "karaoke", "anime-songs", "remixing"],
    nsfw: false
  },
  {
    url: "https://animemusicquiz.com",
    title: "Anime Music Quiz",
    description: "A browser-based game and tool for identifying anime songs, doubles as a fun way to test your OST knowledge and discover new tracks.",
    category: "tools",
    tags: ["music-quiz", "game", "anime-songs", "ost"],
    nsfw: false
  },
  {
    url: "https://www.plex.tv",
    title: "Plex (Anime Setup)",
    description: "A media server that, with plugins like Shoko or Hama, organizes and streams your anime collection with metadata, artwork, and watch progress tracking.",
    category: "tools",
    tags: ["media-server", "anime-collection", "plugins", "streaming"],
    nsfw: false
  },
  {
    url: "https://jellyfin.org",
    title: "Jellyfin (Anime Plugins)",
    description: "An open-source alternative to Plex, with anime-specific plugins for managing and streaming your library across devices.",
    category: "tools",
    tags: ["media-server", "open-source", "anime-plugins", "streaming"],
    nsfw: false
  },
  {
    url: "https://anime-odyssey-hub.github.io",
    title: "Anime Odyssey Hub",
    description: "A community-driven tool aggregating anime streaming sources, trackers, and utilities in one interface, useful for discovery.",
    category: "tools",
    tags: ["aggregator", "community-driven", "discovery", "utilities"],
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
  console.log(`Adding ${sites.length} tool sites to the database...`);
  
  // Add sites sequentially to avoid overwhelming the server
  for (const site of sites) {
    await addSite(site);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log("Finished adding tool sites!");
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});