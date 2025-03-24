import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update links
async function updateQuizToAsmr() {
  try {
    // Read existing links
    const linksFilePath = path.join(__dirname, 'links.json');
    const linksData = JSON.parse(fs.readFileSync(linksFilePath, 'utf8'));
    
    // IDs of the quiz links we added
    const quizLinkIds = [2093, 2094, 2095, 2096]; // AnimeMusicQuiz, AniGuessr, AnimeSongs.org, Anime Quizzes
    
    // Counter for changes
    let changedCount = 0;
    
    // Update the links
    linksData.links = linksData.links.map(link => {
      // Check if this is one of the quiz links we added
      if (quizLinkIds.includes(link.id)) {
        // Create a modified version with "ASMR" category
        const updatedLink = {
          ...link,
          category: "ASMR"
        };
        
        changedCount++;
        console.log(`Updated link: ${link.title} (ID: ${link.id}) from category "games" to "ASMR"`);
        
        // Return the modified link
        return updatedLink;
      }
      
      // Return the link unchanged if not a quiz link
      return link;
    });
    
    // Write back to file
    fs.writeFileSync(linksFilePath, JSON.stringify(linksData, null, 2));
    
    console.log(`Updated ${changedCount} links from "games" to "ASMR"`);
    return changedCount;
  } catch (error) {
    console.error(`Error updating links: ${error.message}`);
    throw error;
  }
}

// Run the main function
updateQuizToAsmr()
  .then((count) => console.log(`Done! Updated ${count} links.`))
  .catch(error => console.error(`Failed: ${error.message}`));