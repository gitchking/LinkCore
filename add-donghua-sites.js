// Script to add Donghua (Chinese anime) streaming sites to the API
import fetch from 'node-fetch';

// List of Donghua streaming websites to add
const donghuaSites = [
  {
    url: "https://www.animekhor.com",
    title: "AnimeKhor",
    description: "Offers a wide range of the latest Chinese anime with English subtitles.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.animexin.com",
    title: "AnimeXin",
    description: "Provides an extensive collection of Donghua series and movies.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://myanime.live",
    title: "MyAnime.live",
    description: "Features a variety of Donghua series for online streaming.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.lmanime.com",
    title: "LMAnime",
    description: "A platform dedicated to streaming Chinese anime with various genres.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.comicxy.com",
    title: "ComicXY",
    description: "Offers a selection of Donghua titles with decent translations and timely releases.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.naruldonghua.com",
    title: "NarulDonghua",
    description: "Provides a collection of Chinese animated series for streaming.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.luciferdonghua.com",
    title: "LuciferDonghua",
    description: "A website to watch Chinese anime online with various categories.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.anime4i.com",
    title: "Anime4i",
    description: "Offers a variety of Chinese anime series and movies for free streaming.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.dongsub.com",
    title: "Dongsub",
    description: "Provides Donghua series with subtitles in multiple languages.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.crimsonsubs.com",
    title: "Crimson Subs",
    description: "Specializes in subbing and streaming Chinese anime series.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.chikianimation.com",
    title: "ChikiAnimation",
    description: "Features a selection of Donghua titles for online viewing.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.donghuaworld.com",
    title: "DonghuaWorld",
    description: "Offers a comprehensive library of Chinese anime with multilingual subtitles.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.hdonghua.com",
    title: "HDonghua",
    description: "Provides high-definition streaming of various Donghua series.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.jhdanime.com",
    title: "JHDAnime",
    description: "A platform to watch Chinese anime series online.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.donghuastream.com",
    title: "DonghuaStream",
    description: "Offers a vast collection of Chinese anime with subtitles in multiple languages.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.infinitzanime.com",
    title: "Infinitz Anime",
    description: "Features a variety of Donghua titles for streaming.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.anihuatv.com",
    title: "Ani-HuaTV",
    description: "Provides a selection of Chinese animated series.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.nkdonghua.com",
    title: "NKDonghua",
    description: "Offers a library of Donghua series and movies.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.vip110.com",
    title: "Vip110",
    description: "A platform to watch various Chinese anime titles.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  },
  {
    url: "https://www.cksub.com",
    title: "CKSub",
    description: "Specializes in subtitling and streaming Donghua series.",
    category: "anime",
    tags: ["anime", "donghua", "chinese", "streaming"],
    nsfw: false
  }
];

// Function to add each site to the API
async function addSite(site) {
  try {
    const response = await fetch('http://localhost:5000/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(site),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to add ${site.title}: ${errorData.message}`);
      return false;
    }

    const data = await response.json();
    console.log(`Added ${site.title} with ID: ${data.id}`);
    return true;
  } catch (error) {
    console.error(`Error adding ${site.title}: ${error.message}`);
    return false;
  }
}

// Add all sites one by one
async function addAllSites() {
  console.log('Adding Donghua streaming sites...');
  let addedCount = 0;

  for (const site of donghuaSites) {
    const success = await addSite(site);
    if (success) addedCount++;
  }

  console.log(`Added ${addedCount} of ${donghuaSites.length} Donghua sites.`);
}

// Run the function
addAllSites();