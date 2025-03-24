import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function addSite(site) {
  try {
    // Read existing links
    const linksFilePath = path.join(__dirname, 'links.json');
    const linksData = JSON.parse(fs.readFileSync(linksFilePath, 'utf8'));
    
    // Check if the site already exists
    const exists = linksData.links.some(link => link.url === site.url);
    
    if (!exists) {
      // Find the highest ID to ensure uniqueness
      const highestId = Math.max(...linksData.links.map(link => link.id), 0);
      
      // Create a new link
      const newLink = {
        id: highestId + 1,
        url: site.url,
        title: site.title,
        description: site.description,
        category: "vtubers",
        tags: site.tags || ["vtuber", "streaming", "tracking"],
        featured: false,
        nsfw: false // All marked as SFW
      };
      
      // Add the link to the data
      linksData.links.push(newLink);
      
      // Write back to file
      fs.writeFileSync(linksFilePath, JSON.stringify(linksData, null, 2));
      
      console.log(`Added site: ${site.title}`);
      return true;
    } else {
      console.log(`Site already exists: ${site.url}`);
      return false;
    }
  } catch (error) {
    console.error(`Error adding site: ${error.message}`);
    throw error;
  }
}

async function addAllSites() {
  // All VTuber sites are SFW
  const vtuberSites = [
    {
      url: "https://holodex.net",
      title: "Holodex",
      description: "A fan-made multiview tool for watching multiple VTuber streams simultaneously, with features like live schedules, clip searching, and music playback.",
      tags: ["vtuber", "streaming", "multiview", "hololive"]
    },
    {
      url: "https://vstats.pw",
      title: "vstats",
      description: "A statistics tracker for VTuber channels, offering detailed data on subscriber counts, viewership, and growth trends for Hololive and Nijisanji.",
      tags: ["vtuber", "statistics", "analytics", "tracking"]
    },
    {
      url: "https://amatsukaze.live",
      title: "Amatsukaze",
      description: "A VTuber streaming and tracking tool, providing live schedules and notifications, with a focus on Japanese VTubers and a clean interface.",
      tags: ["vtuber", "streaming", "schedules", "notifications"]
    },
    {
      url: "https://vchama.com",
      title: "vChama",
      description: "A community-driven site for VTuber schedules and live stream updates, supporting various groups and indie creators, with a simple design.",
      tags: ["vtuber", "schedules", "community", "indie"]
    },
    {
      url: "https://vtubie.com",
      title: "vTubie",
      description: "A wholesome platform for discovering VTubers and VStreamers, featuring profiles, schedules, and a database to connect creators with viewers.",
      tags: ["vtuber", "discovery", "profiles", "database"]
    },
    {
      url: "https://hololist.net",
      title: "Hololist",
      description: "A comprehensive database of VTubers, VStreamers, and VUPs, listing profiles, stats, and links to their content, cataloging the virtual creator community.",
      tags: ["vtuber", "database", "profiles", "creator"]
    },
    {
      url: "https://holoclips.net",
      title: "HoloClips",
      description: "A site aggregating Hololive clips from YouTube, allowing fans to browse highlights and memorable moments from streams, with easy filtering options.",
      tags: ["vtuber", "clips", "highlights", "hololive"]
    },
    {
      url: "https://ragtag.moe",
      title: "Ragtag Archive",
      description: "An archive of VTuber content, including streams and clips, focused on preserving Hololive and indie material that might otherwise be lost.",
      tags: ["vtuber", "archive", "preservation", "hololive"]
    },
    {
      url: "https://patchworkarchive.com",
      title: "Patchwork Archive",
      description: "A collaborative archive project for VTuber streams, offering downloads and backups of VTuber content, emphasizing community preservation.",
      tags: ["vtuber", "archive", "downloads", "preservation"]
    },
    {
      url: "https://hololyzer.net",
      title: "hololyzer",
      description: "A tool analyzing Hololive stream data, such as chat activity, viewer counts, and trends, providing insights for fans and researchers.",
      tags: ["vtuber", "analytics", "chat", "hololive"]
    },
    {
      url: "https://holotracker.net",
      title: "HoloTracker",
      description: "A tracking tool for Hololive streams, offering real-time updates, schedules, and historical data on member activities and collaborations.",
      tags: ["vtuber", "tracking", "schedules", "hololive"]
    },
    {
      url: "https://virtual-youtuber.userlocal.jp",
      title: "UserLocal VTuber",
      description: "A Japanese site ranking VTubers by popularity, with stats on subscribers and views, covering Hololive, Nijisanji, and independents.",
      tags: ["vtuber", "ranking", "statistics", "japanese"]
    },
    {
      url: "https://goodvtubersubs.com",
      title: "GoodVTuberSubs",
      description: "A resource for finding high-quality English subtitles for VTuber streams, focusing on Hololive and other popular creators, with fan-submitted content.",
      tags: ["vtuber", "subtitles", "translation", "community"]
    },
    {
      url: "https://vtuberschedules.com",
      title: "VTuberSchedules",
      description: "A schedule aggregator for VTuber streams across multiple groups, providing time zone adjustments and notifications for upcoming broadcasts.",
      tags: ["vtuber", "schedules", "notifications", "timezones"]
    }
  ];
  
  let addedCount = 0;
  
  // Add all sites
  console.log("Adding VTuber tools and websites...");
  for (const site of vtuberSites) {
    const added = await addSite(site);
    if (added) addedCount++;
  }
  
  console.log(`Added ${addedCount} new VTuber tools and websites`);
  return addedCount;
}

// Run the main function
addAllSites()
  .then(count => console.log(`Done! Added ${count} VTuber tools and websites.`))
  .catch(error => console.error(`Failed: ${error.message}`));