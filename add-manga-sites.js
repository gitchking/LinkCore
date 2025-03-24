import fetch from 'node-fetch';

async function addSite(site) {
  try {
    const response = await fetch('http://localhost:5000/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: site.url,
        title: site.title,
        description: site.description,
        category: "manga",
        tags: ["manga", "hentai", "nsfw", "doujinshi"],
        nsfw: true,
        featured: site.featured || false
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    console.log(`Added ${site.title} successfully`);
  } catch (error) {
    console.error(`Error adding ${site.title}:`, error);
  }
}

async function addAllSites() {
  console.log("Adding Hentai Manga sites to the manga category...");
  
  // Create an array of popular sites to feature
  const popularSites = [
    "https://nhentai.net",
    "https://e-hentai.org",
    "https://hentaifox.com",
    "https://hitomi.la",
    "https://fakku.net"
  ];
  
  // Define all sites
  const sites = [
    {
      url: "https://e-hentai.org",
      title: "E-Hentai",
      description: "A massive archive of hentai manga and doujinshi, with a tagging system for easy browsing. It's community-driven and includes a gallery feature."
    },
    {
      url: "https://asmhentai.com",
      title: "AsmHentai",
      description: "Offers free hentai manga and doujinshi, with a focus on high-resolution scans and a simple interface."
    },
    {
      url: "https://hentainexus.com",
      title: "HentaiNexus",
      description: "A premium site with uncensored hentai manga, offering clean scans and a curated selection of works."
    },
    {
      url: "https://koharu.to",
      title: "Koharu",
      description: "A lesser-known site hosting hentai manga, often with a mix of Japanese and translated content."
    },
    {
      url: "https://nhentai.net",
      title: "nhentai",
      description: "Famous for its 6-digit code system, it's a free archive of hentai manga and doujinshi with extensive tags."
    },
    {
      url: "https://hitomi.la",
      title: "Hitomi.la",
      description: "A popular site for free hentai manga, doujinshi, and CG art, known for its fast loading and vast library."
    },
    {
      url: "https://hentalk.com",
      title: "HenTalk",
      description: "Combines hentai manga with a discussion forum, catering to fans who enjoy community interaction."
    },
    {
      url: "https://eahentai.com",
      title: "EAHentai",
      description: "A variant of E-Hentai, offering similar manga and doujinshi content with a different domain."
    },
    {
      url: "https://pururin.to",
      title: "Pururin",
      description: "A free hentai manga site with a colorful design, featuring doujinshi and original works."
    },
    {
      url: "https://hentaihand.com",
      title: "HentaiHand",
      description: "A straightforward platform for hentai manga, offering English translations and a clean layout."
    },
    {
      url: "https://3hentai.net",
      title: "3Hentai",
      description: "Hosts a variety of hentai manga and doujinshi, with a focus on free access and regular updates."
    },
    {
      url: "https://hdoujin.com",
      title: "HDoujin",
      description: "Specializes in high-quality doujinshi scans, often with English translations and a user-friendly interface."
    },
    {
      url: "https://hentaifox.com",
      title: "HentaiFox",
      description: "A free site for hentai manga, known for its extensive tagging and large collection of doujinshi."
    },
    {
      url: "https://simply-hentai.com",
      title: "SimplyHentai",
      description: "Offers hentai manga and animations, with a minimalist design and a broad range of categories."
    },
    {
      url: "https://hentai.name",
      title: "Hentai.name",
      description: "A basic site hosting hentai manga, focusing on accessibility and a growing library."
    },
    {
      url: "https://18kami.com",
      title: "18Kami",
      description: "Features hentai manga and manhwa, with a mix of free and premium content for adult readers."
    },
    {
      url: "https://manytoon.com",
      title: "ManyToon",
      description: "A site for manhwa, including adult titles, with English translations and a mobile-friendly design."
    },
    {
      url: "https://imhentai.xxx",
      title: "IMHentai",
      description: "A free hentai manga site with high-quality images and a wide selection of genres."
    },
    {
      url: "https://hentai2.net",
      title: "Hentai2",
      description: "A simple platform offering hentai manga and doujinshi, with a focus on free access."
    },
    {
      url: "https://hentaizap.com",
      title: "HentaiZap",
      description: "Hosts hentai manga with a clean interface, often featuring translated doujinshi."
    }
  ];
  
  // Mark popular sites as featured
  for (const site of sites) {
    site.featured = popularSites.includes(site.url);
    await addSite(site);
  }
  
  console.log("First batch of hentai manga sites added successfully!");
  
  // Second batch of sites
  const sites2 = [
    {
      url: "https://caitlin.top",
      title: "Caitlin.top",
      description: "A lesser-known site offering hentai manga or related content with a unique domain."
    },
    {
      url: "https://hentaiforce.net",
      title: "HentaiForce",
      description: "Provides free hentai manga and doujinshi, with a focus on community uploads."
    },
    {
      url: "https://akuma.moe",
      title: "akuma.moe",
      description: "A site for hentai manga and CG sets, known for its dark theme and extensive library."
    },
    {
      url: "https://tsumino.com",
      title: "Tsumino",
      description: "A community-driven hentai manga site with a rating system and high-quality scans."
    },
    {
      url: "https://hentaihug.com",
      title: "Hentaihug",
      description: "Offers free hentai manga with a friendly design, focusing on user accessibility."
    },
    {
      url: "https://hentairead.com",
      title: "HentaiRead",
      description: "A free site for hentai manga and doujinshi, with a focus on English translations."
    },
    {
      url: "https://hentai2read.com",
      title: "Hentai2Read",
      description: "Similar to HentaiRead, offering a large collection of hentai manga with a clean layout."
    },
    {
      url: "https://m-hentai.net",
      title: "M-Hentai",
      description: "Hosts hentai manga with a mobile-optimized design, featuring various genres."
    },
    {
      url: "https://fhentai.net",
      title: "Fhentai",
      description: "A free hentai manga site with a straightforward interface and regular updates."
    },
    {
      url: "https://hentaikisu.com",
      title: "HentaiKisu",
      description: "Offers hentai manga and doujinshi, with a focus on niche categories and fan works."
    },
    {
      url: "https://myreadingmanga.info",
      title: "MyReadingManga",
      description: "Specializes in yaoi and bara manga, catering to fans of male-male romance content."
    },
    {
      url: "https://hentaimanga.me",
      title: "Hentai Manga",
      description: "A basic site for hentai manga, offering free access to a variety of titles."
    },
    {
      url: "https://doujin.sexy",
      title: "Doujin.sexy",
      description: "Focuses on doujinshi and hentai manga, with a sleek design and curated content."
    },
    {
      url: "https://hentailoop.com",
      title: "HentaiLoop",
      description: "Provides hentai manga and short animations, with a focus on free streaming."
    },
    {
      url: "https://hotcomics.me",
      title: "HotComics",
      description: "A manhwa-focused site with adult titles, offering English translations."
    },
    {
      url: "https://hiperdex.com",
      title: "Hiperdex",
      description: "Features manhwa and manga, including adult content, with a modern layout."
    },
    {
      url: "https://saucemanhwa.com",
      title: "Sauce Manhwa",
      description: "A site for adult manhwa, known for its detailed art and English translations."
    },
    {
      url: "https://toonitube.com",
      title: "TooniTube",
      description: "Offers adult manhwa and webtoons, with a focus on free access."
    },
    {
      url: "https://hentai20.io",
      title: "Hentai20.io",
      description: "A newer site for adult manhwa and manga, with a growing library."
    },
    {
      url: "https://hentaivox.com",
      title: "HentaiVox",
      description: "Combines hentai manga with some audio or voiced content features."
    }
  ];
  
  // Add second batch
  for (const site of sites2) {
    site.featured = popularSites.includes(site.url);
    await addSite(site);
  }
  
  console.log("Second batch of hentai manga sites added successfully!");
  
  // Third batch of sites
  const sites3 = [
    {
      url: "https://hentaifc.com",
      title: "HentaiFC",
      description: "A fan club-style site offering hentai manga and doujinshi."
    },
    {
      url: "https://mangaxl.com",
      title: "MangaXL",
      description: "Hosts adult manga and manhwa, with a focus on high-quality scans."
    },
    {
      url: "https://doujinli.com",
      title: "Doujinli",
      description: "Specializes in doujinshi, offering a mix of free and premium content."
    },
    {
      url: "https://xhentais.com",
      title: "Xhentais",
      description: "A site for hentai manga and videos, with a simple design."
    },
    {
      url: "https://toongod.com",
      title: "Toongod",
      description: "Features adult manhwa and webtoons, with a focus on English readers."
    },
    {
      url: "https://manga18.club",
      title: "Manga18.club",
      description: "A club-style site for adult manga and manhwa, with a community feel."
    },
    {
      url: "https://manhwa18.cc",
      title: "Manhwa18",
      description: "Dedicated to adult manhwa, offering free access to translated works."
    },
    {
      url: "https://manhwaden.com",
      title: "manhwaDen",
      description: "A site for adult manhwa, with a focus on niche genres and high-quality art."
    },
    {
      url: "https://hentaipal.com",
      title: "HentaiPal",
      description: "Offers hentai manga and doujinshi, with a friendly interface."
    },
    {
      url: "https://doujinen.com",
      title: "Doujinen",
      description: "Focuses on doujinshi and manhwa, with a mix of free content."
    },
    {
      url: "https://doujins.com",
      title: "Doujins.com",
      description: "A hub for doujinshi, offering high-resolution scans and translations."
    },
    {
      url: "https://hentaihere.com",
      title: "Hentaihere",
      description: "A free hentai manga site with a broad selection of genres."
    },
    {
      url: "https://yaoimangaonline.com",
      title: "YaoiMangaOnline",
      description: "Specializes in yaoi manga for fans of male-male romance stories."
    },
    {
      url: "https://mangalotus.com",
      title: "MangaLotus",
      description: "Hosts adult manga and manhwa, with a clean and modern design."
    },
    {
      url: "https://okhentai.com",
      title: "okhentai",
      description: "A simple site for hentai manga, offering free access to various titles."
    },
    {
      url: "https://mangahen.com",
      title: "MangaHen",
      description: "Provides hentai manga and doujinshi, with a focus on user uploads."
    },
    {
      url: "https://hentailand.com",
      title: "Hentailand",
      description: "A site for hentai manga and related content, with a playful theme."
    },
    {
      url: "https://fakku.net",
      title: "Fakku",
      description: "A premium site with licensed hentai manga, offering uncensored, high-quality works."
    }
  ];
  
  // Add third batch
  for (const site of sites3) {
    site.featured = popularSites.includes(site.url);
    await addSite(site);
  }
  
  console.log("Third batch of hentai manga sites added successfully!");
  console.log("All hentai manga sites have been added to the manga category!");
}

// Execute the function
addAllSites().catch(console.error);