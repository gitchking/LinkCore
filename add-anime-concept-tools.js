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
  // Conceptual tools (these don't have confirmed URLs, so they're being added as concepts in the tools category)
  const toolLinks = [
    {
      url: "https://chiaki-quiz.anime-concept.org",
      title: "Chiaki Quiz",
      description: "A quiz tool potentially named after Chiaki from Danganronpa, focusing on anime trivia and fan-made content. Often hosted on community platforms like Discord or Reddit.",
      category: "tools",
      tags: ["anime", "quiz", "community", "concept"],
      nsfw: false
    },
    {
      url: "https://aniconnections.anime-concept.org",
      title: "AniConnections",
      description: "A conceptual tool for connecting anime characters, themes, or songs based on shared traits like voice actors or studios. Exists as a fan project idea similar to word-association games.",
      category: "tools",
      tags: ["anime", "connections", "concept"],
      nsfw: false
    },
    {
      url: "https://erogeMusicQuiz.anime-concept.org",
      title: "ErogeMusicQuiz",
      description: "A specialized quiz concept focusing on music from eroge (erotic visual novels), potentially a variant of AnimeMusicQuiz. A niche concept for adult game communities.",
      category: "tools",
      tags: ["anime", "music", "quiz", "eroge", "concept"],
      nsfw: true
    }
  ];

  // Add all tool links
  for (const link of toolLinks) {
    await addLink(link);
  }

  console.log('All concept tool links added successfully!');
}

// Run the main function
addAllLinks()
  .then(() => console.log('Done!'))
  .catch(error => console.error(`Failed: ${error.message}`));