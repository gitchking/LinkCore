import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="bg-card rounded-lg shadow-md p-6 border">
          <h1 className="text-3xl font-bold mb-6 text-primary">🎌 About Animatrix</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl mb-6">Welcome to Animatrix — your ultimate guide to the anime and manga universe! 🌟</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our mission:</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-2 text-xl">🔥</span> 
                <span><strong>Discover the Best:</strong> We curate and rank the top anime/manga websites — no bias, no sponsorships, just pure recommendations.</span>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 text-xl">🎯</span> 
                <span><strong>Easy Navigation:</strong> Whether you're looking for streaming sites, manga hubs, or niche fan content, we organize everything in one convenient place.</span>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 text-xl">💪</span> 
                <span><strong>Trustworthy & Transparent:</strong> Every site is reviewed based on popularity, content quality, reliability, and user experience — no blacklists or hidden promotions.</span>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 text-xl">🛠️</span> 
                <span><strong>Community Driven:</strong> We value feedback from anime fans worldwide to ensure our listings stay accurate, updated, and helpful.</span>
              </li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">🗂 Why Animatrix?</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-2 text-xl">🌟</span> 
                <span><strong>Ranked Listings</strong> — From legendary sites to hidden gems, we rank them fairly.</span>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 text-xl">📚</span> 
                <span><strong>Diverse Categories</strong> — Streaming, downloads, manhwa, donghua, scanlation hubs, and more.</span>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 text-xl">🔍</span> 
                <span><strong>Simplified Browsing</strong> — Skip the ads, broken links, and dead ends — we've done the legwork for you.</span>
              </li>
              
              <li className="flex items-start">
                <span className="mr-2 text-xl">🚀</span> 
                <span><strong>Always Up to Date</strong> — Anime culture evolves fast, and so do we!</span>
              </li>
            </ul>
            
            <p className="text-xl mt-8">Animatrix — because the anime world deserves a navigator that's built by fans, for fans. 🎮✨</p>
          </div>
        </div>
      </div>
    </div>
  );
}