import fetch from "node-fetch";

// List of app sites with their details, properly labeled for NSFW content
const sites = [
  {
    url: "https://kotatsu.app",
    title: "Kotatsu",
    description: "An open-source Android manga reader with built-in online sources, designed for simplicity and community support.",
    category: "apps",
    tags: ["android", "manga-reader", "open-source", "community"],
    nsfw: false
  },
  {
    url: "https://github.com/LNReader/lnreader",
    title: "LNReader",
    description: "An Android app for reading light novels, supporting multiple sources and offline reading with a clean interface.",
    category: "apps",
    tags: ["android", "light-novels", "offline-reading", "clean-interface"],
    nsfw: false
  },
  {
    url: "https://mihon.app",
    title: "Mihon",
    description: "The official successor to Tachiyomi, an open-source Android manga reader with extensive extension support.",
    category: "apps",
    tags: ["android", "manga-reader", "open-source", "extensions"],
    nsfw: false
  },
  {
    url: "https://miru.moe",
    title: "Miru",
    description: "An Android app for streaming anime and reading manga, offering a lightweight, multi-purpose experience.",
    category: "apps",
    tags: ["android", "anime-streaming", "manga-reader", "lightweight"],
    nsfw: false
  },
  {
    url: "https://mangaplus.shueisha.co.jp",
    title: "MANGA Plus App",
    description: "An official app by Shueisha, providing free and paid manga chapters from popular series like One Piece, with simulpub releases.",
    category: "apps",
    tags: ["official", "manga", "shueisha", "simulpub"],
    nsfw: false
  },
  {
    url: "https://www.webtoons.com",
    title: "Webtoons App",
    description: "An official platform for webtoons, featuring Korean manhwa and original content, with free and premium options.",
    category: "apps",
    tags: ["official", "webtoons", "korean", "premium"],
    nsfw: false
  },
  {
    url: "https://aniyomi.org",
    title: "Aniyomi",
    description: "A fork of Tachiyomi that adds anime streaming alongside manga reading, supporting extensions for both.",
    category: "apps",
    tags: ["android", "anime-streaming", "manga-reader", "extensions"],
    nsfw: false
  },
  {
    url: "https://komikku.info",
    title: "Komikku",
    description: "An open-source Android manga reader with a focus on offline reading and a sleek, customizable design.",
    category: "apps",
    tags: ["android", "manga-reader", "open-source", "offline-reading"],
    nsfw: false
  },
  {
    url: "https://github.com/Yokai-Team/Yokai",
    title: "Yokai",
    description: "A Tachiyomi fork (J2K variant) for Android, offering manga reading with enhanced features and extension support.",
    category: "apps",
    tags: ["android", "manga-reader", "tachiyomi-fork", "extensions"],
    nsfw: false
  },
  {
    url: "https://github.com/jobobby04/TachiyomiSY",
    title: "TachiyomiSY",
    description: "A Tachiyomi fork for Android with additional features like smart upgrades and a focus on manga enthusiasts.",
    category: "apps",
    tags: ["android", "manga-reader", "tachiyomi-fork", "smart-upgrades"],
    nsfw: false
  },
  {
    url: "https://github.com/rebelonion/Dantotsu",
    title: "Dantotsu",
    description: "An Android app for anime and manga, offering streaming and reading with a modern, community-driven approach.",
    category: "apps",
    tags: ["android", "anime-streaming", "manga-reader", "community-driven"],
    nsfw: false
  },
  {
    url: "https://github.com/AweryApp/Awery",
    title: "Awery",
    description: "An open-source Android app for manga and anime, combining reading and streaming in a lightweight package.",
    category: "apps",
    tags: ["android", "manga-reader", "anime-streaming", "open-source"],
    nsfw: false
  },
  {
    url: "https://github.com/Hebiko/Mangayomi",
    title: "Mangayomi",
    description: "A versatile Android app for manga, anime, and novels, supporting multiple sources and platforms.",
    category: "apps",
    tags: ["android", "manga", "anime", "novels"],
    nsfw: false
  },
  {
    url: "https://github.com/Zeddex/AnymeX",
    title: "AnymeX",
    description: "An Android app for anime streaming and tracking, with a focus on integrating with MyAnimeList.",
    category: "apps",
    tags: ["android", "anime-streaming", "tracking", "myanimelist"],
    nsfw: false
  },
  {
    url: "https://github.com/AnimeTV-App/AnimeTV",
    title: "AnimeTV",
    description: "An Android app for streaming anime, offering a simple interface and support for various sources.",
    category: "apps",
    tags: ["android", "anime-streaming", "simple-interface", "sources"],
    nsfw: false
  },
  {
    url: "https://cloudstream.cf",
    title: "CloudStream",
    description: "An Android app for streaming movies, TV shows, and anime from multiple sources, highly customizable.",
    category: "apps",
    tags: ["android", "streaming", "movies", "anime"],
    nsfw: false
  },
  {
    url: "https://github.com/Neko-Night/Neko",
    title: "Neko",
    description: "A Tachiyomi fork for Android, focused on manga reading with a minimalist design and extension support.",
    category: "apps",
    tags: ["android", "manga-reader", "tachiyomi-fork", "minimalist"],
    nsfw: false
  },
  {
    url: "https://suwayomi.org",
    title: "Suwayomi",
    description: "A desktop and Android manga reader, open-source, with a server-client model for syncing across devices.",
    category: "apps",
    tags: ["desktop", "android", "manga-reader", "open-source"],
    nsfw: false
  },
  {
    url: "https://hakuneko.download",
    title: "Hakuneko",
    description: "A desktop manga downloader and reader, supporting numerous online sources for offline access.",
    category: "apps",
    tags: ["desktop", "manga-downloader", "offline-access", "reader"],
    nsfw: false
  },
  {
    url: "https://github.com/FMD2/FMD2",
    title: "FMD2",
    description: "A desktop manga reader (Free Manga Downloader 2), designed for downloading and organizing manga.",
    category: "apps",
    tags: ["desktop", "manga-reader", "downloader", "organizer"],
    nsfw: false
  },
  {
    url: "https://houdoku.moe",
    title: "Houdoku",
    description: "A desktop manga reader with a modern interface, supporting extensions and local file management.",
    category: "apps",
    tags: ["desktop", "manga-reader", "modern-interface", "extensions"],
    nsfw: false
  },
  {
    url: "https://github.com/LagradOst/QuickNovel",
    title: "QuickNovel",
    description: "An Android app for reading light novels, offering source integration and offline capabilities.",
    category: "apps",
    tags: ["android", "light-novels", "offline", "source-integration"],
    nsfw: false
  },
  {
    url: "https://github.com/AzyxApp/Azyx",
    title: "Azyx",
    description: "A multi-platform app for anime, manga, and novels, still in development with broad compatibility goals.",
    category: "apps",
    tags: ["multi-platform", "anime", "manga", "novels"],
    nsfw: false
  },
  {
    url: "https://github.com/Jays2Kings/tachiyomiJ2K",
    title: "TachiyomiJ2K",
    description: "A Tachiyomi fork for Android with enhanced features like dual-page reading and custom layouts.",
    category: "apps",
    tags: ["android", "manga-reader", "tachiyomi-fork", "dual-page"],
    nsfw: false
  },
  {
    url: "https://github.com/NovelDokusha/NovelDokusha",
    title: "NovelDokusha",
    description: "An Android app for reading light novels, with a focus on local files and source scraping.",
    category: "apps",
    tags: ["android", "light-novels", "local-files", "source-scraping"],
    nsfw: false
  },
  {
    url: "https://github.com/rebelonion/Dartotsu",
    title: "Dartotsu",
    description: "A variant of Dantotsu, offering anime and manga support across platforms with a unified design.",
    category: "apps",
    tags: ["multi-platform", "anime", "manga", "unified-design"],
    nsfw: false
  },
  {
    url: "https://seanime.rahgozar.dev",
    title: "Seanime",
    description: "A desktop app for managing and streaming anime, integrating with AniList and local libraries.",
    category: "apps",
    tags: ["desktop", "anime-streaming", "anilist", "local-libraries"],
    nsfw: false
  },
  {
    url: "https://github.com/TotoroApp/Totoro",
    title: "Totoro",
    description: "A desktop app for anime and manga, offering a clean interface and source integration.",
    category: "apps",
    tags: ["desktop", "anime", "manga", "clean-interface"],
    nsfw: false
  },
  {
    url: "https://github.com/ZenshinApp/Zenshin",
    title: "Zenshin",
    description: "A desktop manga reader in development, aiming for a lightweight and extensible experience.",
    category: "apps",
    tags: ["desktop", "manga-reader", "lightweight", "extensible"],
    nsfw: false
  },
  {
    url: "https://github.com/MiguApp/Migu",
    title: "Migu",
    description: "An Android app for manga reading, with a focus on simplicity and source compatibility.",
    category: "apps",
    tags: ["android", "manga-reader", "simplicity", "compatibility"],
    nsfw: false
  },
  {
    url: "https://github.com/tachimanga/tachimanga",
    title: "Tachimanga",
    description: "An iOS manga reader inspired by Tachiyomi, offering source extensions and offline reading.",
    category: "apps",
    tags: ["ios", "manga-reader", "tachiyomi-inspired", "offline-reading"],
    nsfw: false
  },
  {
    url: "https://paperback.moe",
    title: "Paperback",
    description: "An iOS manga reader with a polished design, supporting extensions and a variety of sources.",
    category: "apps",
    tags: ["ios", "manga-reader", "polished-design", "extensions"],
    nsfw: false
  },
  {
    url: "https://github.com/kaguya-app/kaguya",
    title: "Kaguya App",
    description: "An Android app for streaming anime and reading manga, with a focus on open-source development.",
    category: "apps",
    tags: ["android", "anime-streaming", "manga-reader", "open-source"],
    nsfw: false
  },
  {
    url: "https://www.viz.com/shonenjump",
    title: "Shonen Jump App",
    description: "An official app by VIZ Media, offering free and subscription-based access to Shonen Jump manga.",
    category: "apps",
    tags: ["official", "manga", "viz-media", "subscription"],
    nsfw: false
  },
  {
    url: "https://github.com/shosetsuorg/shosetsu",
    title: "Shosetsu",
    description: "An Android app for reading light novels, with customizable sources and offline support.",
    category: "apps",
    tags: ["android", "light-novels", "offline", "customizable"],
    nsfw: false
  },
  {
    url: "https://github.com/EhViewer-Neko/EhViewer",
    title: "Ehviewer",
    description: "An Android app for browsing E-Hentai galleries, popular for adult manga and doujinshi.",
    category: "apps",
    tags: ["android", "e-hentai", "adult", "doujinshi"],
    nsfw: true
  },
  {
    url: "https://github.com/EhPanda-Team/EhPanda",
    title: "EhPanda",
    description: "An iOS app for accessing E-Hentai, offering a modern interface for adult content browsing.",
    category: "apps",
    tags: ["ios", "e-hentai", "adult", "modern-interface"],
    nsfw: true
  },
  {
    url: "https://github.com/UnyoApp/Unyo",
    title: "Unyo",
    description: "A desktop manga reader in early development, aiming for cross-platform compatibility.",
    category: "apps",
    tags: ["desktop", "manga-reader", "early-development", "cross-platform"],
    nsfw: false
  },
  {
    url: "https://github.com/sora-app/sora",
    title: "Sora",
    description: "An iOS manga reader with a focus on simplicity and integration with online sources.",
    category: "apps",
    tags: ["ios", "manga-reader", "simplicity", "online-sources"],
    nsfw: false
  },
  {
    url: "https://github.com/KetsuApp/Ketsu",
    title: "Ketsu",
    description: "An iOS app for manga and anime, offering modular extensions and a clean design.",
    category: "apps",
    tags: ["ios", "manga", "anime", "modular-extensions"],
    nsfw: false
  },
  {
    url: "https://github.com/OtakuWorldApp/OtakuWorld",
    title: "OtakuWorld",
    description: "An Android app for anime, manga, and novels, aiming for an all-in-one otaku experience.",
    category: "apps",
    tags: ["android", "anime", "manga", "novels"],
    nsfw: false
  },
  {
    url: "https://github.com/animityapp/animity",
    title: "Animity",
    description: "An Android app for streaming anime, with a focus on high-quality playback and source variety.",
    category: "apps",
    tags: ["android", "anime-streaming", "high-quality", "source-variety"],
    nsfw: false
  },
  {
    url: "https://github.com/akuseapp/akuse",
    title: "akuse",
    description: "A desktop app for anime streaming, offering a lightweight and customizable experience.",
    category: "apps",
    tags: ["desktop", "anime-streaming", "lightweight", "customizable"],
    nsfw: false
  },
  {
    url: "https://github.com/exhentai-manager/exhentai-manager",
    title: "exhentai-manager",
    description: "A desktop tool for managing ExHentai downloads, tailored for adult manga enthusiasts.",
    category: "apps",
    tags: ["desktop", "exhentai", "adult", "downloads"],
    nsfw: true
  },
  {
    url: "https://github.com/KotatsuApp/Kotatsu-dl",
    title: "Kotatsu-dl",
    description: "A desktop companion to Kotatsu, focused on downloading manga for offline use.",
    category: "apps",
    tags: ["desktop", "manga-downloader", "offline-use", "kotatsu"],
    nsfw: false
  },
  {
    url: "https://github.com/Senpwai/Senpwai",
    title: "Senpwai",
    description: "A desktop app for streaming anime, with a sleek design and community-driven development.",
    category: "apps",
    tags: ["desktop", "anime-streaming", "sleek-design", "community-driven"],
    nsfw: false
  },
  {
    url: "https://github.com/TeemiiApp/Teemii",
    title: "Teemii",
    description: "A desktop manga and anime app, offering a unified interface for multiple content types.",
    category: "apps",
    tags: ["desktop", "manga", "anime", "unified-interface"],
    nsfw: false
  },
  {
    url: "https://github.com/KitsuneApp/Kitsune",
    title: "Kitsune App",
    description: "An Android app for manga reading, with a focus on open-source development and customization.",
    category: "apps",
    tags: ["android", "manga-reading", "open-source", "customization"],
    nsfw: false
  },
  {
    url: "https://github.com/AnimeChicken/AnimeChicken",
    title: "AnimeChicken",
    description: "An Android app for streaming anime, known for its quirky name and source support.",
    category: "apps",
    tags: ["android", "anime-streaming", "quirky", "source-support"],
    nsfw: false
  },
  {
    url: "https://github.com/InkNest/InkNest",
    title: "InkNest",
    description: "An Android manga reader in development, aiming for a smooth and intuitive experience.",
    category: "apps",
    tags: ["android", "manga-reader", "development", "intuitive"],
    nsfw: false
  },
  {
    url: "https://github.com/MangaPin/MangaPin",
    title: "MangaPin",
    description: "An Android app for pinning and reading manga, with a focus on bookmarking features.",
    category: "apps",
    tags: ["android", "manga-reader", "bookmarking", "pinning"],
    nsfw: false
  },
  {
    url: "https://github.com/IReaderApp/IReader",
    title: "IReader",
    description: "An Android app for reading novels and manga, supporting multiple formats and sources.",
    category: "apps",
    tags: ["android", "novels", "manga", "multiple-formats"],
    nsfw: false
  },
  {
    url: "https://github.com/AniVu/AniVu",
    title: "AniVu",
    description: "An Android app for anime streaming, offering a lightweight alternative to larger platforms.",
    category: "apps",
    tags: ["android", "anime-streaming", "lightweight", "alternative"],
    nsfw: false
  },
  {
    url: "https://aidoku.app",
    title: "Aidoku",
    description: "An iOS manga reader with a focus on privacy and extension-based source support.",
    category: "apps",
    tags: ["ios", "manga-reader", "privacy", "extensions"],
    nsfw: false
  },
  {
    url: "https://github.com/Suwatte/Suwatte",
    title: "Suwatte",
    description: "An iOS manga reader with a modern design, supporting local files and online sources.",
    category: "apps",
    tags: ["ios", "manga-reader", "modern-design", "local-files"],
    nsfw: false
  },
  {
    url: "https://global.manga-up.com",
    title: "Manga UP!",
    description: "An official app by Square Enix, offering free and paid manga chapters from their catalog.",
    category: "apps",
    tags: ["official", "manga", "square-enix", "paid"],
    nsfw: false
  },
  {
    url: "https://comikey.com",
    title: "Comikey",
    description: "A legal platform for reading manga and webtoons, with a mix of free and subscription-based content.",
    category: "apps",
    tags: ["legal", "manga", "webtoons", "subscription"],
    nsfw: false
  },
  {
    url: "https://mangazoneapp.com",
    title: "MangaZone",
    description: "An Android app for reading manga, offering a community-driven library and offline options.",
    category: "apps",
    tags: ["android", "manga-reader", "community-driven", "offline"],
    nsfw: false
  },
  {
    url: "https://github.com/ranobe-org/ranobe",
    title: "Ranobe",
    description: "An Android app for reading light novels, with a focus on Russian and English translations.",
    category: "apps",
    tags: ["android", "light-novels", "russian", "english"],
    nsfw: false
  },
  {
    url: "https://github.com/ChoutenApp/Chouten",
    title: "Chouten",
    description: "An Android app for anime streaming, offering modular extensions and a clean interface.",
    category: "apps",
    tags: ["android", "anime-streaming", "modular", "clean-interface"],
    nsfw: false
  },
  {
    url: "https://github.com/Nekoflix/Nekoflix",
    title: "Nekoflix",
    description: "An Android app for streaming anime, with a playful cat-themed design and source support.",
    category: "apps",
    tags: ["android", "anime-streaming", "cat-themed", "source-support"],
    nsfw: false
  },
  {
    url: "https://github.com/Kaizoyu/Kaizoyu",
    title: "Kaizoyu!",
    description: "An Android app for manga and anime, offering a pirate-themed experience with multiple sources.",
    category: "apps",
    tags: ["android", "manga", "anime", "pirate-themed"],
    nsfw: false
  },
  {
    url: "https://github.com/AnilabApp/Anilab",
    title: "Anilab",
    description: "An Android app for streaming anime, focusing on a lab-like experimental approach to features.",
    category: "apps",
    tags: ["android", "anime-streaming", "experimental", "features"],
    nsfw: false
  },
  {
    url: "https://github.com/CSCLAB/CSCLAB",
    title: "CSC LAB",
    description: "An Android app for anime and manga, developed as a community-driven project with source integration.",
    category: "apps",
    tags: ["android", "anime", "manga", "community-driven"],
    nsfw: false
  },
  {
    url: "https://github.com/saikou-app/saikou",
    title: "SaikouTV",
    description: "An Android app for anime streaming and manga reading, known for its high-quality design and performance.",
    category: "apps",
    tags: ["android", "anime-streaming", "manga-reading", "high-quality"],
    nsfw: false
  },
  {
    url: "https://github.com/Suwayomi/Tachidesk-Server",
    title: "Tachidesk",
    description: "A desktop manga reader and server, allowing web-based access to your manga library.",
    category: "apps",
    tags: ["desktop", "manga-reader", "server", "web-based"],
    nsfw: false
  },
  {
    url: "https://mangarock.io",
    title: "MangaRock",
    description: "A revived version of the classic app, offering manga reading with a focus on fan translations.",
    category: "apps",
    tags: ["manga-reading", "fan-translations", "revived", "classic"],
    nsfw: false
  },
  {
    url: "https://animesuge.to",
    title: "AnimeSuge",
    description: "A free website for streaming anime and reading manga, with a simple interface and English subs.",
    category: "apps",
    tags: ["anime-streaming", "manga-reading", "free", "english-subs"],
    nsfw: false
  },
  {
    url: "https://www.bilibilicomics.com",
    title: "Bilibili Comics",
    description: "An official app for webtoons and manga, offering free and premium content from Asian creators.",
    category: "apps",
    tags: ["official", "webtoons", "manga", "asian"],
    nsfw: false
  },
  {
    url: "https://zoro.to",
    title: "Zoro.to",
    description: "A free site for streaming anime and reading manga, popular for its extensive library and fast updates.",
    category: "apps",
    tags: ["anime-streaming", "manga-reading", "free", "fast-updates"],
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
  console.log(`Adding ${sites.length} app sites to the database...`);
  
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
  
  console.log("Finished adding app sites!");
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});