import fetch from "node-fetch";

// List of hentai manga sites with their details
const sites = [
  {
    url: "https://e-hentai.org",
    title: "E-Hentai",
    description: "A massive archive of hentai manga and doujinshi, with a tagging system for easy browsing. It's community-driven and includes a gallery feature.",
    category: "manga",
    tags: ["hentai", "doujinshi", "archive", "gallery"],
    nsfw: true
  },
  {
    url: "https://asmhentai.com",
    title: "AsmHentai",
    description: "Offers free hentai manga and doujinshi, with a focus on high-resolution scans and a simple interface.",
    category: "manga",
    tags: ["hentai", "doujinshi", "high-resolution", "free"],
    nsfw: true
  },
  {
    url: "https://hentainexus.com",
    title: "HentaiNexus",
    description: "A premium site with uncensored hentai manga, offering clean scans and a curated selection of works.",
    category: "manga",
    tags: ["hentai", "premium", "uncensored", "curated"],
    nsfw: true
  },
  {
    url: "https://koharu.to",
    title: "Koharu",
    description: "A lesser-known site hosting hentai manga, often with a mix of Japanese and translated content.",
    category: "manga",
    tags: ["hentai", "translations", "japanese"],
    nsfw: true
  },
  {
    url: "https://nhentai.net",
    title: "nhentai",
    description: "Famous for its 6-digit code system, it's a free archive of hentai manga and doujinshi with extensive tags.",
    category: "manga",
    tags: ["hentai", "doujinshi", "code-system", "tags"],
    nsfw: true
  },
  {
    url: "https://hitomi.la",
    title: "Hitomi.la",
    description: "A popular site for free hentai manga, doujinshi, and CG art, known for its fast loading and vast library.",
    category: "manga",
    tags: ["hentai", "doujinshi", "cg-art", "fast-loading"],
    nsfw: true
  },
  {
    url: "https://hentalk.com",
    title: "HenTalk",
    description: "Combines hentai manga with a discussion forum, catering to fans who enjoy community interaction.",
    category: "manga",
    tags: ["hentai", "forum", "community", "discussion"],
    nsfw: true
  },
  {
    url: "https://eahentai.com",
    title: "EAHentai",
    description: "Offers manga and doujinshi content with a dedicated adult section.",
    category: "manga",
    tags: ["hentai", "doujinshi", "adult"],
    nsfw: true
  },
  {
    url: "https://pururin.to",
    title: "Pururin",
    description: "A free hentai manga site with a colorful design, featuring doujinshi and original works.",
    category: "manga",
    tags: ["hentai", "doujinshi", "colorful", "original"],
    nsfw: true
  },
  {
    url: "https://hentaihand.com",
    title: "HentaiHand",
    description: "A straightforward platform for hentai manga, offering English translations and a clean layout.",
    category: "manga",
    tags: ["hentai", "translations", "english", "clean-layout"],
    nsfw: true
  },
  {
    url: "https://3hentai.net",
    title: "3Hentai",
    description: "Hosts a variety of hentai manga and doujinshi, with a focus on free access and regular updates.",
    category: "manga",
    tags: ["hentai", "doujinshi", "free", "updates"],
    nsfw: true
  },
  {
    url: "https://hdoujin.com",
    title: "HDoujin",
    description: "Specializes in high-quality doujinshi scans, often with English translations and a user-friendly interface.",
    category: "manga",
    tags: ["hentai", "doujinshi", "high-quality", "translations"],
    nsfw: true
  },
  {
    url: "https://hentaifox.com",
    title: "HentaiFox",
    description: "A free site for hentai manga, known for its extensive tagging and large collection of doujinshi.",
    category: "manga",
    tags: ["hentai", "doujinshi", "tagging", "collection"],
    nsfw: true
  },
  {
    url: "https://simply-hentai.com",
    title: "SimplyHentai",
    description: "Offers hentai manga and animations, with a minimalist design and a broad range of categories.",
    category: "manga",
    tags: ["hentai", "animations", "minimalist", "categories"],
    nsfw: true
  },
  {
    url: "https://hentai.name",
    title: "Hentai.name",
    description: "A basic site hosting hentai manga, focusing on accessibility and a growing library.",
    category: "manga",
    tags: ["hentai", "accessibility", "library"],
    nsfw: true
  },
  {
    url: "https://18kami.com",
    title: "18Kami",
    description: "Features hentai manga and manhwa, with a mix of free and premium content for adult readers.",
    category: "manga",
    tags: ["hentai", "manhwa", "free", "premium"],
    nsfw: true
  },
  {
    url: "https://manytoon.com",
    title: "ManyToon",
    description: "A site for manhwa, including adult titles, with English translations and a mobile-friendly design.",
    category: "manga",
    tags: ["manhwa", "adult", "translations", "mobile-friendly"],
    nsfw: true
  },
  {
    url: "https://imhentai.xxx",
    title: "IMHentai",
    description: "A free hentai manga site with high-quality images and a wide selection of genres.",
    category: "manga",
    tags: ["hentai", "high-quality", "genres"],
    nsfw: true
  },
  {
    url: "https://hentai2.net",
    title: "Hentai2",
    description: "A simple platform offering hentai manga and doujinshi, with a focus on free access.",
    category: "manga",
    tags: ["hentai", "doujinshi", "free"],
    nsfw: true
  },
  {
    url: "https://hentaizap.com",
    title: "HentaiZap",
    description: "Hosts hentai manga with a clean interface, often featuring translated doujinshi.",
    category: "manga",
    tags: ["hentai", "doujinshi", "translations", "clean-interface"],
    nsfw: true
  },
  {
    url: "https://caitlin.top",
    title: "Caitlin.top",
    description: "A lesser-known site offering hentai manga and related content.",
    category: "manga",
    tags: ["hentai", "manga"],
    nsfw: true
  },
  {
    url: "https://hentaiforce.net",
    title: "HentaiForce",
    description: "Provides free hentai manga and doujinshi, with a focus on community uploads.",
    category: "manga",
    tags: ["hentai", "doujinshi", "community", "uploads"],
    nsfw: true
  },
  {
    url: "https://akuma.moe",
    title: "akuma.moe",
    description: "A site for hentai manga and CG sets, known for its dark theme and extensive library.",
    category: "manga",
    tags: ["hentai", "cg-sets", "dark-theme", "library"],
    nsfw: true
  },
  {
    url: "https://tsumino.com",
    title: "Tsumino",
    description: "A community-driven hentai manga site with a rating system and high-quality scans.",
    category: "manga",
    tags: ["hentai", "community", "rating-system", "high-quality"],
    nsfw: true
  },
  {
    url: "https://hentaihug.com",
    title: "Hentaihug",
    description: "Offers free hentai manga with a friendly design, focusing on user accessibility.",
    category: "manga",
    tags: ["hentai", "free", "accessible", "friendly-design"],
    nsfw: true
  },
  {
    url: "https://hentairead.com",
    title: "HentaiRead",
    description: "A free site for hentai manga and doujinshi, with a focus on English translations.",
    category: "manga",
    tags: ["hentai", "doujinshi", "translations", "english"],
    nsfw: true
  },
  {
    url: "https://hentai2read.com",
    title: "Hentai2Read",
    description: "Similar to HentaiRead, offering a large collection of hentai manga with a clean layout.",
    category: "manga",
    tags: ["hentai", "collection", "clean-layout"],
    nsfw: true
  },
  {
    url: "https://m-hentai.net",
    title: "M-Hentai",
    description: "Hosts hentai manga with a mobile-optimized design, featuring various genres.",
    category: "manga",
    tags: ["hentai", "mobile-optimized", "genres"],
    nsfw: true
  },
  {
    url: "https://fhentai.net",
    title: "Fhentai",
    description: "A free hentai manga site with a straightforward interface and regular updates.",
    category: "manga",
    tags: ["hentai", "free", "updates", "straightforward"],
    nsfw: true
  },
  {
    url: "https://hentaikisu.com",
    title: "HentaiKisu",
    description: "Offers hentai manga and doujinshi, with a focus on niche categories and fan works.",
    category: "manga",
    tags: ["hentai", "doujinshi", "niche", "fan-works"],
    nsfw: true
  },
  {
    url: "https://myreadingmanga.info",
    title: "MyReadingManga",
    description: "Specializes in yaoi and bara manga, catering to fans of male-male romance content.",
    category: "manga",
    tags: ["yaoi", "bara", "male-male", "romance"],
    nsfw: true
  },
  {
    url: "https://hentaimanga.me",
    title: "Hentai Manga",
    description: "A basic site for hentai manga, offering free access to a variety of titles.",
    category: "manga",
    tags: ["hentai", "free", "variety"],
    nsfw: true
  },
  {
    url: "https://doujin.sexy",
    title: "Doujin.sexy",
    description: "Focuses on doujinshi and hentai manga, with a sleek design and curated content.",
    category: "manga",
    tags: ["doujinshi", "hentai", "sleek-design", "curated"],
    nsfw: true
  },
  {
    url: "https://hentailoop.com",
    title: "HentaiLoop",
    description: "Provides hentai manga and short animations, with a focus on free streaming.",
    category: "manga",
    tags: ["hentai", "animations", "streaming", "free"],
    nsfw: true
  },
  {
    url: "https://hotcomics.me",
    title: "HotComics",
    description: "A manhwa-focused site with adult titles, offering English translations.",
    category: "manga",
    tags: ["manhwa", "adult", "translations", "english"],
    nsfw: true
  },
  {
    url: "https://hiperdex.com",
    title: "Hiperdex",
    description: "Features manhwa and manga, including adult content, with a modern layout.",
    category: "manga",
    tags: ["manhwa", "manga", "adult", "modern-layout"],
    nsfw: true
  },
  {
    url: "https://saucemanhwa.com",
    title: "Sauce Manhwa",
    description: "A site for adult manhwa, known for its detailed art and English translations.",
    category: "manga",
    tags: ["manhwa", "adult", "detailed-art", "translations"],
    nsfw: true
  },
  {
    url: "https://toonitube.com",
    title: "TooniTube",
    description: "Offers adult manhwa and webtoons, with a focus on free access.",
    category: "manga",
    tags: ["manhwa", "webtoons", "adult", "free"],
    nsfw: true
  },
  {
    url: "https://oppai.stream",
    title: "oppai.stream",
    description: "Primarily a streaming site for hentai videos, with some manhwa content available.",
    category: "manga",
    tags: ["hentai", "streaming", "videos", "manhwa"],
    nsfw: true
  },
  {
    url: "https://hentai20.io",
    title: "Hentai20.io",
    description: "A newer site for adult manhwa and manga, with a growing library.",
    category: "manga",
    tags: ["adult", "manhwa", "manga", "library"],
    nsfw: true
  },
  {
    url: "https://hentaivox.com",
    title: "HentaiVox",
    description: "Combines hentai manga with some audio or voiced content features.",
    category: "manga",
    tags: ["hentai", "audio", "voiced-content"],
    nsfw: true
  },
  {
    url: "https://hentaifc.com",
    title: "HentaiFC",
    description: "A fan club-style site offering hentai manga and doujinshi.",
    category: "manga",
    tags: ["hentai", "fan-club", "doujinshi"],
    nsfw: true
  },
  {
    url: "https://mangaxl.com",
    title: "MangaXL",
    description: "Hosts adult manga and manhwa, with a focus on high-quality scans.",
    category: "manga",
    tags: ["adult", "manga", "manhwa", "high-quality"],
    nsfw: true
  },
  {
    url: "https://doujinli.com",
    title: "Doujinli",
    description: "Specializes in doujinshi, offering a mix of free and premium content.",
    category: "manga",
    tags: ["doujinshi", "free", "premium"],
    nsfw: true
  },
  {
    url: "https://xhentais.com",
    title: "Xhentais",
    description: "A site for hentai manga and videos, with a simple design.",
    category: "manga",
    tags: ["hentai", "manga", "videos", "simple-design"],
    nsfw: true
  },
  {
    url: "https://toongod.com",
    title: "Toongod",
    description: "Features adult manhwa and webtoons, with a focus on English readers.",
    category: "manga",
    tags: ["adult", "manhwa", "webtoons", "english"],
    nsfw: true
  },
  {
    url: "https://manga18.club",
    title: "Manga18.club",
    description: "A club-style site for adult manga and manhwa, with a community feel.",
    category: "manga",
    tags: ["adult", "manga", "manhwa", "community"],
    nsfw: true
  },
  {
    url: "https://manhwa18.cc",
    title: "Manhwa18",
    description: "Dedicated to adult manhwa, offering free access to translated works.",
    category: "manga",
    tags: ["adult", "manhwa", "translations", "free"],
    nsfw: true
  },
  {
    url: "https://manhwaden.com",
    title: "manhwaDen",
    description: "A site for adult manhwa, with a focus on niche genres and high-quality art.",
    category: "manga",
    tags: ["adult", "manhwa", "niche", "high-quality"],
    nsfw: true
  },
  {
    url: "https://hentaipal.com",
    title: "HentaiPal",
    description: "Offers hentai manga and doujinshi, with a friendly interface.",
    category: "manga",
    tags: ["hentai", "doujinshi", "friendly-interface"],
    nsfw: true
  },
  {
    url: "https://doujinen.com",
    title: "Doujinen",
    description: "Focuses on doujinshi and manhwa, with a mix of free content.",
    category: "manga",
    tags: ["doujinshi", "manhwa", "free"],
    nsfw: true
  },
  {
    url: "https://doujins.com",
    title: "Doujins.com",
    description: "A hub for doujinshi, offering high-resolution scans and translations.",
    category: "manga",
    tags: ["doujinshi", "high-resolution", "translations"],
    nsfw: true
  },
  {
    url: "https://hentaihere.com",
    title: "Hentaihere",
    description: "A free hentai manga site with a broad selection of genres.",
    category: "manga",
    tags: ["hentai", "manga", "genres", "free"],
    nsfw: true
  },
  {
    url: "https://yaoimangaonline.com",
    title: "YaoiMangaOnline",
    description: "Specializes in yaoi manga for fans of male-male romance stories.",
    category: "manga",
    tags: ["yaoi", "male-male", "romance", "manga"],
    nsfw: true
  },
  {
    url: "https://mangalotus.com",
    title: "MangaLotus",
    description: "Hosts adult manga and manhwa, with a clean and modern design.",
    category: "manga",
    tags: ["adult", "manga", "manhwa", "modern-design"],
    nsfw: true
  },
  {
    url: "https://okhentai.com",
    title: "okhentai",
    description: "A simple site for hentai manga, offering free access to various titles.",
    category: "manga",
    tags: ["hentai", "manga", "free", "various"],
    nsfw: true
  },
  {
    url: "https://mangahen.com",
    title: "MangaHen",
    description: "Provides hentai manga and doujinshi, with a focus on user uploads.",
    category: "manga",
    tags: ["hentai", "manga", "doujinshi", "uploads"],
    nsfw: true
  },
  {
    url: "https://hentailand.com",
    title: "Hentailand",
    description: "A site for hentai manga and related content, with a playful theme.",
    category: "manga",
    tags: ["hentai", "manga", "playful-theme"],
    nsfw: true
  },
  {
    url: "https://fakku.net",
    title: "Fakku",
    description: "A premium site with licensed hentai manga, offering uncensored, high-quality works.",
    category: "manga",
    tags: ["hentai", "premium", "licensed", "uncensored"],
    nsfw: true
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
  console.log(`Adding ${sites.length} hentai manga sites to the database...`);
  
  // Add sites sequentially to avoid overwhelming the server
  for (const site of sites) {
    await addSite(site);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log("Finished adding hentai manga sites!");
}

// Run the script
addAllSites().catch(error => {
  console.error("Script failed:", error);
});