import fetch from 'node-fetch';

// List of anime websites
const animeWebsites = [
  { url: "https://www.animekai.com", title: "AnimeKai", description: "Free anime streaming website" },
  { url: "https://animepahe.com", title: "animepahe", description: "High-quality anime streaming site" },
  { url: "https://www.hianime.com", title: "HiAnime", description: "Popular anime streaming platform" },
  { url: "https://www.animez.com", title: "AnimeZ", description: "Anime streaming with large collection" },
  { url: "https://www.crunchyroll.com", title: "Crunchyroll", description: "Legal anime streaming service with free tier" },
  { url: "https://www.youtube.com", title: "YouTube", description: "Video platform with anime content" },
  { url: "https://www.animestream.com", title: "AnimeStream", description: "Free anime streaming site" },
  { url: "https://www.kickassanime.com", title: "KickAssAnime", description: "Anime streaming with minimal ads" },
  { url: "https://www.animeowl.com", title: "AnimeOwl", description: "Free anime streaming site" },
  { url: "https://www.wco.tv", title: "WCO", description: "Watch Cartoon Online also has anime" },
  { url: "https://www.animegg.org", title: "ANIMEGG", description: "Free anime streaming site" },
  { url: "https://www.animenexus.com", title: "Anime Nexus", description: "Anime streaming platform" },
  { url: "https://www.animeonsen.com", title: "AnimeOnsen", description: "Free anime streaming site" },
  { url: "https://www.animeheaven.eu", title: "AnimeHeaven", description: "Popular anime streaming site" },
  { url: "https://www.bilibili.com", title: "Bilibili", description: "Chinese video sharing platform with anime" },
  { url: "https://www.hikari.com", title: "Hikari", description: "Anime streaming website" },
  { url: "https://www.allanime.com", title: "AllAnime", description: "Comprehensive anime streaming platform" },
  { url: "https://www.sudatchi.com", title: "Sudatchi", description: "Free anime streaming site" },
  { url: "https://www.animedefenders.com", title: "Anime defenders", description: "Anime streaming website" },
  { url: "https://www.anizone.com", title: "AniZone", description: "Free anime streaming platform" },
  { url: "https://www.miruro.com", title: "Miruro MULT", description: "Multilanguage anime streaming site" },
  { url: "https://www.gojo.com", title: "Gojo MULT", description: "Multilanguage anime platform" },
  { url: "https://www.shiroko.com", title: "Shiroko MULT", description: "Multilanguage anime streaming" },
  { url: "https://animixplay.name", title: "animixplay.name HIA", description: "High-quality anime streaming" },
  { url: "https://www.animeparadise.com", title: "AnimeParadise HIA", description: "High-quality anime content" },
  { url: "https://www.hidive.com", title: "HIDIVE", description: "Legal anime streaming service" },
  { url: "https://www.aniworld.com", title: "AniWorld", description: "Anime streaming platform" },
  { url: "https://www.anify.com", title: "Anify", description: "Free anime streaming website" },
  { url: "https://www.kuudere.com", title: "Kuudere", description: "Anime streaming site" },
  { url: "https://www.animehub.com", title: "AnimeHub", description: "Free anime streaming platform" },
  { url: "https://www.kisskh.com", title: "Kisskh", description: "Anime streaming site" },
  { url: "https://www.kawaiifu.com", title: "Kawaiifu", description: "Free anime streaming" },
  { url: "https://www.anime-stream.com", title: "Anime-Stream", description: "Anime streaming website" },
  { url: "https://www.aniplay.com", title: "AniPlay MULT", description: "Multilanguage anime streaming" },
  { url: "https://www.animerealms.com", title: "Anime Realms MULT", description: "Multilanguage anime platform" },
  { url: "https://www.vumeto.com", title: "Vumeto MULT", description: "Multilanguage anime content" },
  { url: "https://www.anikoto.com", title: "Anikoto MULT", description: "Multilanguage anime site" },
  { url: "https://www.animelon.com", title: "Animelon", description: "Learn Japanese while watching anime" },
  { url: "https://www.otaku-streamers.com", title: "Otaku-Streamers LOGIN", description: "Anime streaming with login required" },
  { url: "https://www.animehi.com", title: "AnimeHi MULT", description: "Multilanguage anime platform" },
  { url: "https://www.animia.com", title: "Animia MULT", description: "Multilanguage anime site" },
  { url: "https://www.aniversehd.com", title: "AniverseHD MULT", description: "HD multilanguage anime content" },
  { url: "https://aniwave.lv", title: "aniwave.lv HIA", description: "High-quality anime streaming" },
  { url: "https://www.freek.com", title: "Freek HIA", description: "Free anime streaming site" }
];

// Function to add a link
async function addLink(link) {
  try {
    const response = await fetch('http://localhost:5000/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: link.url,
        title: link.title,
        description: link.description,
        category: 'anime', // All links are in the anime category
        tags: ['anime', 'streaming'],
        nsfw: false // All links are SFW as per your instructions
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error adding ${link.title}: ${errorText}`);
      return false;
    }

    const data = await response.json();
    console.log(`Added ${link.title} with ID ${data.id}`);
    return true;
  } catch (error) {
    console.error(`Exception adding ${link.title}: ${error.message}`);
    return false;
  }
}

// Add all links sequentially
async function addAllLinks() {
  console.log('Starting to add anime websites to the database...');
  
  let successes = 0;
  let failures = 0;
  
  for (const website of animeWebsites) {
    const success = await addLink(website);
    if (success) {
      successes++;
    } else {
      failures++;
    }
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`Finished adding anime websites. Success: ${successes}, Failures: ${failures}`);
}

// Run the function
addAllLinks();