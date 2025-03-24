import fetch from "node-fetch";

// List of additional SFW manga sites with their details
const sites = [
  {
    url: "https://godacomic.com",
    title: "GodaComic",
    description: "A free site for manga and manhwa, with a focus on community uploads.",
    category: "manga",
    tags: ["manga", "manhwa", "community", "uploads"],
    nsfw: false
  },
  {
    url: "https://fanfox.net",
    title: "Mangafox",
    description: "A long-standing site for free manga scans, known as 'MangaFox' to many fans.",
    category: "manga",
    tags: ["manga", "scans", "long-standing", "free"],
    nsfw: false
  },
  {
    url: "https://mangabtt.com",
    title: "MangaBTT",
    description: "Offers free manga and manhwa, with a straightforward browsing experience.",
    category: "manga",
    tags: ["manga", "manhwa", "straightforward", "browsing"],
    nsfw: false
  },
  {
    url: "https://ninekon.com",
    title: "Ninekon",
    description: "A site for manga and manhwa, often featuring diverse content and fan translations.",
    category: "manga",
    tags: ["manga", "manhwa", "diverse", "translations"],
    nsfw: false
  },
  {
    url: "https://mangatab.com",
    title: "MangaTab",
    description: "A free manga reader with a growing library and simple navigation.",
    category: "manga",
    tags: ["manga", "reader", "growing", "simple-navigation"],
    nsfw: false
  },
  {
    url: "https://mangapill.com",
    title: "mangapill",
    description: "A popular site for free manga, offering a clean design and regular updates.",
    category: "manga",
    tags: ["manga", "free", "clean-design", "updates"],
    nsfw: false
  },
  {
    url: "https://hachi.moe",
    title: "hachi",
    description: "A lesser-known site for manga, with a focus on niche or fan-uploaded content.",
    category: "manga",
    tags: ["manga", "niche", "fan-uploaded", "content"],
    nsfw: false
  },
  {
    url: "https://w13.mangafreak.net",
    title: "MangaFreak",
    description: "A free manga site with a large library and options to download chapters.",
    category: "manga",
    tags: ["manga", "free", "download", "large-library"],
    nsfw: false
  },
  {
    url: "https://novamanga.com",
    title: "NovaManga",
    description: "Offers free manga and manhwa, with a modern interface and translated works.",
    category: "manga",
    tags: ["manga", "manhwa", "modern", "translated"],
    nsfw: false
  },
  {
    url: "https://holymanga.net",
    title: "HolyManga",
    description: "A free site for manga and manhwa, featuring a mix of genres and fan scans.",
    category: "manga",
    tags: ["manga", "manhwa", "genres", "fan-scans"],
    nsfw: false
  },
  {
    url: "https://atsumaru.com",
    title: "Atsumaru",
    description: "A site for manga, often with raw or lightly translated content from Japan.",
    category: "manga",
    tags: ["manga", "raw", "japanese", "translated"],
    nsfw: false
  },
  {
    url: "https://mangataro.com",
    title: "MangaTaro",
    description: "Offers free manga scans, with a focus on Japanese titles and fan translations.",
    category: "manga",
    tags: ["manga", "scans", "japanese", "fan-translations"],
    nsfw: false
  },
  {
    url: "https://toomics.com",
    title: "Toomics",
    description: "A premium platform for manhwa, offering mainstream titles with a subscription.",
    category: "manga",
    tags: ["manhwa", "premium", "subscription", "mainstream"],
    nsfw: false
  },
  {
    url: "https://manhwaz.com",
    title: "Manhwaz",
    description: "A free site for manhwa, featuring translated works and a clean layout.",
    category: "manga",
    tags: ["manhwa", "free", "translated", "clean-layout"],
    nsfw: false
  },
  {
    url: "https://manhwatop.com",
    title: "Manhwatop",
    description: "Specializes in free manhwa, with a focus on popular and trending titles.",
    category: "manga",
    tags: ["manhwa", "free", "popular", "trending"],
    nsfw: false
  },
  {
    url: "https://topmanhua.com",
    title: "TopManhua",
    description: "A site for manhua, offering free English translations of Chinese comics.",
    category: "manga",
    tags: ["manhua", "chinese", "english", "translations"],
    nsfw: false
  },
  {
    url: "https://mangagg.com",
    title: "MangaGG",
    description: "A free site for manga and manhwa, with a user-friendly design and updates.",
    category: "manga",
    tags: ["manga", "manhwa", "user-friendly", "updates"],
    nsfw: false
  },
  {
    url: "https://mangazin.org",
    title: "Mangazin",
    description: "Offers free manhwa and manga, with a focus on translated content.",
    category: "manga",
    tags: ["manhwa", "manga", "free", "translated"],
    nsfw: false
  },
  {
    url: "https://harimanga.com",
    title: "Harimanga",
    description: "A free site for manhwa and manga, known for its colorful webtoon offerings.",
    category: "manga",
    tags: ["manhwa", "manga", "colorful", "webtoons"],
    nsfw: false
  },
  {
    url: "https://kissmanga.in",
    title: "Kissmanga.in",
    description: "A free manga reader with a large library, successor to the original KissManga.",
    category: "manga",
    tags: ["manga", "reader", "large-library", "successor"],
    nsfw: false
  },
  {
    url: "https://shiroko-manga.com",
    title: "Shiroko Manga",
    description: "A lesser-known site for manga, offering free scans and translations.",
    category: "manga",
    tags: ["manga", "free", "scans", "translations"],
    nsfw: false
  },
  {
    url: "https://anipaca.com",
    title: "anipaca Manga",
    description: "A site combining manga and anime content, with a focus on free access.",
    category: "manga",
    tags: ["manga", "anime", "combined", "free"],
    nsfw: false
  },
  {
    url: "https://comicmanga.com",
    title: "ComicManga",
    description: "Offers free manga and manhwa, with a simple interface and fan uploads.",
    category: "manga",
    tags: ["manga", "manhwa", "simple", "fan-uploads"],
    nsfw: false
  },
  {
    url: "https://www.mangatown.com",
    title: "MangaTown",
    description: "A long-standing site for free manga, featuring a broad range of genres.",
    category: "manga",
    tags: ["manga", "free", "long-standing", "genres"],
    nsfw: false
  },
  {
    url: "https://comic.pixiv.net",
    title: "Pixiv Comics",
    description: "An official Japanese platform for manga and user-created comics.",
    category: "manga",
    tags: ["manga", "japanese", "official", "user-created"],
    nsfw: false
  },
  {
    url: "https://danke.moe",
    title: "Danke fürs Lesen",
    description: "A scanlation group site offering translated manga, often with a German touch.",
    category: "manga",
    tags: ["manga", "scanlation", "german", "translated"],
    nsfw: false
  },
  {
    url: "https://omegascans.org",
    title: "OmegaScans",
    description: "A scanlation group providing manga and manhwa, including popular titles.",
    category: "manga",
    tags: ["manga", "manhwa", "scanlation", "popular"],
    nsfw: false
  },
  {
    url: "https://zeroscans.com",
    title: "Zero Scans",
    description: "A scanlation group site with high-quality manga and manhwa translations.",
    category: "manga",
    tags: ["manga", "manhwa", "high-quality", "translations"],
    nsfw: false
  },
  {
    url: "https://hachirumi.com",
    title: "Hachirumi",
    description: "A scanlation group offering niche manga and manhwa scans.",
    category: "manga",
    tags: ["manga", "manhwa", "niche", "scans"],
    nsfw: false
  },
  {
    url: "https://reaperscans.com",
    title: "ReaperScans",
    description: "A popular scanlation group for manga and manhwa, known for quality releases.",
    category: "manga",
    tags: ["manga", "manhwa", "scanlation", "quality"],
    nsfw: false
  },
  {
    url: "https://anigliscans.com",
    title: "AnigliScans",
    description: "A scanlation group focusing on manga and manhwa translations.",
    category: "manga",
    tags: ["manga", "manhwa", "scanlation", "translations"],
    nsfw: false
  },
  {
    url: "https://flamecomics.com",
    title: "Flame Comics",
    description: "A scanlation site offering manga and manhwa with a fiery theme.",
    category: "manga",
    tags: ["manga", "manhwa", "scanlation", "themed"],
    nsfw: false
  },
  {
    url: "https://hivescans.com",
    title: "Hive Scans",
    description: "A scanlation group providing translated manga and manhwa.",
    category: "manga",
    tags: ["manga", "manhwa", "scanlation", "translated"],
    nsfw: false
  },
  {
    url: "https://demonicscans.com",
    title: "Demonicscans",
    description: "A scanlation group with a focus on darker-themed manga and manhwa.",
    category: "manga",
    tags: ["manga", "manhwa", "dark-themed", "scanlation"],
    nsfw: false
  },
  {
    url: "https://asurascans.com",
    title: "Asura Scans",
    description: "A well-known scanlation group for manga and manhwa, offering high-quality releases.",
    category: "manga",
    tags: ["manga", "manhwa", "high-quality", "scanlation"],
    nsfw: false
  },
  {
    url: "https://templescan.net",
    title: "TempleScan",
    description: "A scanlation group site with translated manga and manhwa.",
    category: "manga",
    tags: ["manga", "manhwa", "scanlation", "translated"],
    nsfw: false
  },
  {
    url: "https://lscomic.com",
    title: "LSComic",
    description: "A scanlation site offering manga and manhwa translations.",
    category: "manga",
    tags: ["manga", "manhwa", "scanlation", "translations"],
    nsfw: false
  },
  {
    url: "https://mangademon.org",
    title: "MangaDemon",
    description: "A free site for manga scans, with a focus on fan translations.",
    category: "manga",
    tags: ["manga", "scans", "fan-translations", "free"],
    nsfw: false
  },
  {
    url: "https://mangabay.co",
    title: "MangaBay",
    description: "A manga reader offering a mix of free and premium content.",
    category: "manga",
    tags: ["manga", "reader", "free", "premium"],
    nsfw: false
  },
  {
    url: "https://manganato.info",
    title: "manganato.info",
    description: "A variant of Manganato, providing free manga with a similar design.",
    category: "manga",
    tags: ["manga", "free", "variant", "similar-design"],
    nsfw: false
  },
  {
    url: "https://todaymanga.com",
    title: "Todaymanga",
    description: "A free site for manga, focusing on daily updates and fan scans.",
    category: "manga",
    tags: ["manga", "free", "daily-updates", "fan-scans"],
    nsfw: false
  },
  {
    url: "https://freemanga.me",
    title: "Freemanga",
    description: "Offers free manga scans, with a broad selection of titles.",
    category: "manga",
    tags: ["manga", "free", "scans", "selection"],
    nsfw: false
  },
  {
    url: "https://comicfans.io",
    title: "ComicFans",
    description: "A site for manhua and manga, with a focus on fan translations.",
    category: "manga",
    tags: ["manhua", "manga", "fan-translations", "community"],
    nsfw: false
  },
  {
    url: "https://nineanime.to",
    title: "Nine Anime",
    description: "Primarily an anime site, but may include manga-related content.",
    category: "manga",
    tags: ["anime", "manga", "related-content", "combined"],
    nsfw: false
  },
  {
    url: "https://www.mangasail.co",
    title: "Mangasail",
    description: "A free manga reader with a searchable database and fan scans.",
    category: "manga",
    tags: ["manga", "reader", "searchable", "fan-scans"],
    nsfw: false
  },
  {
    url: "https://manhwasco.net",
    title: "Manhwasco",
    description: "Specializes in free manhwa, with English translations.",
    category: "manga",
    tags: ["manhwa", "free", "english", "translations"],
    nsfw: false
  },
  {
    url: "https://mangagojo.com",
    title: "MangaGojo",
    description: "A free site for manga, inspired by 'Jujutsu Kaisen' naming.",
    category: "manga",
    tags: ["manga", "free", "themed", "inspired"],
    nsfw: false
  },
  {
    url: "https://mangaclash.com",
    title: "Mangaclash",
    description: "Offers free manga scans, with a focus on action titles.",
    category: "manga",
    tags: ["manga", "scans", "action", "free"],
    nsfw: false
  },
  {
    url: "https://mangadoom.com",
    title: "MangaDoom",
    description: "A free manga reader with a long history of fan translations.",
    category: "manga",
    tags: ["manga", "reader", "long-history", "fan-translations"],
    nsfw: false
  },
  {
    url: "https://mangaready.com",
    title: "Mangaready",
    description: "Provides free manga scans, with a simple interface.",
    category: "manga",
    tags: ["manga", "scans", "free", "simple-interface"],
    nsfw: false
  },
  {
    url: "https://zinmanga.com",
    title: "Zinmanga",
    description: "A free site for manga and manhwa, with a growing library.",
    category: "manga",
    tags: ["manga", "manhwa", "free", "growing-library"],
    nsfw: false
  },
  {
    url: "https://mangazoro.com",
    title: "MangaZoro",
    description: "Offers free manga, inspired by 'One Piece' naming.",
    category: "manga",
    tags: ["manga", "free", "inspired", "one-piece"],
    nsfw: false
  },
  {
    url: "https://mangaread.org",
    title: "MangaRead",
    description: "A free manga reader with a broad selection of titles.",
    category: "manga",
    tags: ["manga", "reader", "broad-selection", "free"],
    nsfw: false
  },
  {
    url: "https://aquamanga.com",
    title: "Aqua manga",
    description: "A free site for manga and manhwa, with a clean design.",
    category: "manga",
    tags: ["manga", "manhwa", "clean-design", "free"],
    nsfw: false
  },
  {
    url: "https://mangahot.jp",
    title: "Mangahot",
    description: "A Japanese site for manga, with some translated options.",
    category: "manga",
    tags: ["manga", "japanese", "translated", "options"],
    nsfw: false
  },
  {
    url: "https://coffeemanga.io",
    title: "CoffeManga",
    description: "A free manga reader with a cozy theme and fan scans.",
    category: "manga",
    tags: ["manga", "reader", "cozy-theme", "fan-scans"],
    nsfw: false
  },
  {
    url: "https://retsu.org",
    title: "Retsu",
    description: "A lesser-known site for manga, offering free content.",
    category: "manga",
    tags: ["manga", "free", "lesser-known", "content"],
    nsfw: false
  },
  {
    url: "https://readmanga.io",
    title: "ReadManga",
    description: "A free manga reader with a focus on English translations.",
    category: "manga",
    tags: ["manga", "reader", "english", "translations"],
    nsfw: false
  },
  {
    url: "https://mangakomi.io",
    title: "MangaKomi",
    description: "Offers free manga and manhwa, with a modern layout.",
    category: "manga",
    tags: ["manga", "manhwa", "free", "modern-layout"],
    nsfw: false
  },
  {
    url: "https://mangasushi.net",
    title: "Mangasushi",
    description: "A free site for manga, with a playful sushi-inspired theme.",
    category: "manga",
    tags: ["manga", "free", "sushi-inspired", "playful"],
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
  console.log(`Adding ${sites.length} more SFW manga sites to the database...`);
  
  // Add sites sequentially to avoid overwhelming the server
  for (const site of sites) {
    await addSite(site);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log("Finished adding more SFW manga sites!");
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});