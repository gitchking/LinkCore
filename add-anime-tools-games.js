import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to add a link
async function addLink(link) {
  try {
    // Read existing links
    const linksFilePath = path.join(__dirname, 'links.json');
    const linksData = JSON.parse(fs.readFileSync(linksFilePath, 'utf8'));
    
    // Find the max ID to create a new one
    const maxId = linksData.links.reduce((max, link) => Math.max(max, link.id), 0);
    
    // Create new link with next ID
    const newLink = {
      ...link,
      id: maxId + 1,
      createdAt: new Date().toISOString(),
      featured: false
    };
    
    // Add to links array
    linksData.links.push(newLink);
    
    // Write back to file
    fs.writeFileSync(linksFilePath, JSON.stringify(linksData, null, 2));
    
    console.log(`Added: ${newLink.title} (ID: ${newLink.id})`);
    return newLink;
  } catch (error) {
    console.error(`Error adding link: ${error.message}`);
    throw error;
  }
}

// Function to add all links
async function addAllLinks() {
  // Game links from the list
  const gameLinks = [
    {
      url: "https://animemusicquiz.com",
      title: "AnimeMusicQuiz",
      description: "A multiplayer online game where players guess anime songs (openings, endings, and inserts) from short clips. Features community-driven song database with MyAnimeList integration.",
      category: "games",
      tags: ["anime", "music", "quiz", "multiplayer"],
      nsfw: false
    },
    {
      url: "https://aniguessr.com",
      title: "AniGuessr",
      description: "A browser-based game inspired by GeoGuessr, where players identify anime by analyzing still images from scenes. Tests visual recognition of art styles and settings.",
      category: "games",
      tags: ["anime", "quiz", "visual recognition"],
      nsfw: false
    },
    {
      url: "https://animesongs.org",
      title: "AnimeSongs.org",
      description: "A site offering an anime song guessing game where players identify tracks from a database of openings, endings, and OSTs. Simple interface for solo play.",
      category: "games",
      tags: ["anime", "music", "quiz"],
      nsfw: false
    },
    {
      url: "https://www.anime-quiz.com",
      title: "Anime Quizzes",
      description: "A platform offering various anime trivia quizzes on characters, plots, and music. Browser-based with diverse question types for casual fans.",
      category: "games",
      tags: ["anime", "trivia", "quiz"],
      nsfw: false
    }
  ];

  // Tool links (none in this specific list, but we'll keep the structure for future updates)
  const toolLinks = [];

  // Add all game links
  for (const link of gameLinks) {
    await addLink(link);
  }

  // Add all tool links
  for (const link of toolLinks) {
    await addLink(link);
  }

  console.log('All links added successfully!');
}

// Run the main function
addAllLinks()
  .then(() => console.log('Done!'))
  .catch(error => console.error(`Failed: ${error.message}`));