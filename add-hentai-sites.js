import fetch from 'node-fetch';

// List of hentai websites with NSFW content
const hentaiWebsites = [
  { url: "https://hanime.tv", title: "Hanime.tv", description: "A popular streaming site offering high-quality hentai videos with a clean interface" },
  { url: "https://hentai.tv", title: "hentai.tv", description: "A platform focused on hentai streaming with a variety of animated content" },
  { url: "https://hentaihaven.xxx", title: "hentaihaven", description: "A legendary name in free hentai streaming with classic and new titles" },
  { url: "https://hentaicity.com", title: "HentaiCity", description: "A hub for hentai videos and manga with a decent selection of episodes" },
  { url: "https://haho.moe", title: "haho.moe", description: "A site offering hentai streams and downloads with niche content" },
  { url: "https://watchhentai.net", title: "WatchHentai", description: "A free streaming site with English-subtitled hentai clips and series" },
  { url: "https://hentaverse.net", title: "Hentaverse", description: "Known for extensive hentai video collection and community features" },
  { url: "https://underhentai.net", title: "UnderHentai DDL", description: "Specializes in direct download links alongside streaming options" },
  { url: "https://oppai.stream", title: "oppai.stream", description: "A streaming-focused site with an emphasis on high-quality hentai" },
  { url: "https://hstream.moe", title: "HStream.moe", description: "Offers ad-free 1080p streaming and downloads with some 4K upscales" },
  { url: "https://hentaistream.com", title: "HentaiStream", description: "A long-standing site for streaming hentai with download options" },
  { url: "https://hentaiplay.net", title: "HentaiPlay", description: "A free platform with uncensored hentai videos and manga" },
  { url: "https://hentaistream.me", title: "HentaiStream.me", description: "A reliable option for streaming enthusiasts with a varied library" },
  { url: "https://myhentaimovie.com", title: "MyHentaiMovie", description: "Focuses on full-length hentai movies rather than episodic content" },
  { url: "https://onlyhentaistuff.com", title: "OnlyHentaiStuff", description: "A site curating exclusive hentai videos and images" },
  { url: "https://hentaiworld.tv", title: "HentaiWorld", description: "A free streaming site with robust collection optimized for high-quality playback" },
  { url: "https://hentai2w.com", title: "Hentai2W", description: "Combines streaming with community aspects and interactive features" },
  { url: "https://hentaimama.io", title: "HentaiMama", description: "A modern site with clean layout and calendar of upcoming releases" },
  { url: "https://hentai0.com", title: "Hentai0.com", description: "A newer platform providing streams and downloads with growing library" },
  { url: "https://iwara.tv", title: "Iwara", description: "A unique platform hosting user-uploaded 3D hentai animations" },
  { url: "https://hentaifox.tv", title: "HentaiFox.tv", description: "Offers hentai videos and manga with massive tag list for easy browsing" },
  { url: "https://hentaibros.net", title: "Hentaibros", description: "A free site with latest episodes and older classics" },
  { url: "https://aki-h.com", title: "Aki-H", description: "A niche site focusing on specific hentai genres or artists" },
  { url: "https://hentai-for.me", title: "hentai-for.me", description: "A straightforward streaming site for quick access" },
  { url: "https://eshentai.com", title: "ESHentai", description: "Offers a mix of manga and videos with focus on free, high-quality content" },
  { url: "https://xanimeporn.com", title: "Xanimeporn", description: "A YouTube-like platform for hentai with subbed and dubbed options" },
  { url: "https://hentaini.com", title: "Hentaini", description: "Provides streaming and downloads with regular updates" },
  { url: "https://hentaifreak.org", title: "HentaiFreak", description: "Known for HD streams and diverse categories including unusual fetishes" },
  { url: "https://hanime1.me", title: "Hanime1.me", description: "An alternative to Hanime.tv with similar high-quality streaming" },
  { url: "https://hentaimoon.com", title: "HentaiMoon", description: "A free streaming site with Spanish-subbed options for broader appeal" },
  { url: "https://mitestream.com", title: "MiteStream", description: "A lesser-known site offering streams with focus on niche content" },
  { url: "https://hentaiser.com", title: "hentaiser", description: "Streams hentai with a simple interface and navigation" },
  { url: "https://muchohentai.com", title: "MuchoHentai", description: "Features Spanish-subbed hentai alongside English with preview section" },
  { url: "https://hentaicloud.com", title: "HentaiCloud", description: "Offers free videos and manga with cloud-based streaming for fast loading" },
  { url: "https://hentaigasm.com", title: "Hentaigasm", description: "A vast library with genre-based navigation and straightforward design" },
  { url: "https://hentia.com", title: "Hentia", description: "Provides standard hentai streaming with basic setup" },
  { url: "https://hentaisea.com", title: "Hentaisea", description: "A free platform with streaming and downloadable content" }
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
        category: 'anime', // Adding to anime category
        tags: ['anime', 'hentai', 'nsfw'],
        nsfw: true // Mark as NSFW
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
  console.log('Starting to add hentai websites to the database...');
  
  let successes = 0;
  let failures = 0;
  
  for (const website of hentaiWebsites) {
    const success = await addLink(website);
    if (success) {
      successes++;
    } else {
      failures++;
    }
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`Finished adding hentai websites. Success: ${successes}, Failures: ${failures}`);
}

// Run the function
addAllLinks();