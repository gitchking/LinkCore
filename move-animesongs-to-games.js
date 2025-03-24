import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update specific link
async function moveAnimeSongsToGames() {
  try {
    // Read existing links
    const linksFilePath = path.join(__dirname, 'links.json');
    const linksData = JSON.parse(fs.readFileSync(linksFilePath, 'utf8'));
    
    // Look for AnimeSongs.org
    let changed = false;
    
    linksData.links = linksData.links.map(link => {
      // Find AnimeSongs.org by URL
      if (link.url === "https://animesongs.org") {
        // Create a modified version with "games" category and mark as NSFW
        const updatedLink = {
          ...link,
          category: "games",
          nsfw: true // Mark as NSFW since it contains hentai ASMR content
        };
        
        changed = true;
        console.log(`Updated link: ${link.title} (ID: ${link.id})`);
        console.log(`  - Changed category from "${link.category}" to "games"`);
        console.log(`  - Changed NSFW flag from ${link.nsfw} to true`);
        
        // Return the modified link
        return updatedLink;
      }
      
      // Return the link unchanged if not AnimeSongs.org
      return link;
    });
    
    if (changed) {
      // Write back to file
      fs.writeFileSync(linksFilePath, JSON.stringify(linksData, null, 2));
      console.log('Updated AnimeSongs.org successfully!');
    } else {
      console.log('AnimeSongs.org link not found.');
    }
    
    return changed;
  } catch (error) {
    console.error(`Error updating link: ${error.message}`);
    throw error;
  }
}

// Run the main function
moveAnimeSongsToGames()
  .then((changed) => console.log(`Done! ${changed ? 'Changes applied.' : 'No changes needed.'}`))
  .catch(error => console.error(`Failed: ${error.message}`));