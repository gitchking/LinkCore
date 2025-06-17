import { Button } from "@/components/ui/button";
import { EmptyState } from "./EmptyState";
import { Link, ExternalLink } from "lucide-react";
import { CATEGORIES } from "@/lib/icons";
import { ContentRatingBadge } from "./ContentRatingBadge";
import { WebsiteIcon } from "./WebsiteIcon";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface Link {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  nsfw: boolean;
}

interface CategorySectionProps {
  category: string;
  links: Link[];
  openNewLinkModal: (category: string) => void;
}

const getTagColor = (tag: string) => {
  const colors = {
    // Content Type Tags
    'anime': 'bg-gradient-to-r from-violet-400 to-violet-500 text-white shadow-sm hover:from-violet-500 hover:to-violet-600',
    'manga': 'bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 text-white shadow-sm hover:from-fuchsia-500 hover:to-fuchsia-600',
    'game': 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-sm hover:from-green-500 hover:to-green-600',
    'music': 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-sm hover:from-rose-500 hover:to-rose-600',
    'asmr': 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-sm hover:from-pink-500 hover:to-pink-600',
    'amv': 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-sm hover:from-blue-500 hover:to-blue-600',
    'hentai': 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:from-red-600 hover:to-red-700',
    'doujinshi': 'bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-sm hover:from-purple-500 hover:to-purple-600',
    'vtuber': 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-sm hover:from-cyan-500 hover:to-cyan-600',
    'imageboard': 'bg-gradient-to-r from-indigo-400 to-indigo-500 text-white shadow-sm hover:from-indigo-500 hover:to-indigo-600',
    'art-community': 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-sm hover:from-amber-500 hover:to-amber-600',
    'illustrations': 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-sm hover:from-orange-500 hover:to-orange-600',
    'fan-art': 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-sm hover:from-emerald-500 hover:to-emerald-600',
    'creators': 'bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-sm hover:from-teal-500 hover:to-teal-600',
    'high-resolution': 'bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-sm hover:from-sky-500 hover:to-sky-600',

    // Content Rating Tags
    'nsfw': 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:from-red-600 hover:to-red-700',
    'sfw': 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-sm hover:from-green-500 hover:to-green-600',

    // Content Source Tags
    'official': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm hover:from-blue-600 hover:to-blue-700',
    'free': 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-sm hover:from-emerald-500 hover:to-emerald-600',
    'resource': 'bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-sm hover:from-purple-500 hover:to-purple-600',
    'community': 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-sm hover:from-orange-500 hover:to-orange-600',
    'tool': 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-sm hover:from-cyan-500 hover:to-cyan-600',
    'guide': 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-sm hover:from-amber-500 hover:to-amber-600',
    'download': 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-sm hover:from-pink-500 hover:to-pink-600',
    'streaming': 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-sm hover:from-red-500 hover:to-red-600',
    'social': 'bg-gradient-to-r from-indigo-400 to-indigo-500 text-white shadow-sm hover:from-indigo-500 hover:to-indigo-600',

    // Content Format Tags
    'torrent': 'bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-sm hover:from-slate-500 hover:to-slate-600',
    'usenet': 'bg-gradient-to-r from-zinc-400 to-zinc-500 text-white shadow-sm hover:from-zinc-500 hover:to-zinc-600',
    'xdcc': 'bg-gradient-to-r from-stone-400 to-stone-500 text-white shadow-sm hover:from-stone-500 hover:to-stone-600',
    'direct download': 'bg-gradient-to-r from-neutral-400 to-neutral-500 text-white shadow-sm hover:from-neutral-500 hover:to-neutral-600',
    'subtitles': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-sm hover:from-gray-500 hover:to-gray-600',
    'movies': 'bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-sm hover:from-slate-500 hover:to-slate-600',
    'cartoons': 'bg-gradient-to-r from-zinc-400 to-zinc-500 text-white shadow-sm hover:from-zinc-500 hover:to-zinc-600',
    'fan videos': 'bg-gradient-to-r from-stone-400 to-stone-500 text-white shadow-sm hover:from-stone-500 hover:to-stone-600',
    'anime music videos': 'bg-gradient-to-r from-neutral-400 to-neutral-500 text-white shadow-sm hover:from-neutral-500 hover:to-neutral-600',

    // Platform Tags
    'japanese': 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-sm hover:from-red-500 hover:to-red-600',
    'medibang': 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-sm hover:from-blue-500 hover:to-blue-600',
    'pixiv': 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-sm hover:from-green-500 hover:to-green-600',
    'viewer': 'bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-sm hover:from-purple-500 hover:to-purple-600',
    'tracking': 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-sm hover:from-cyan-500 hover:to-cyan-600',
    'discussion': 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-sm hover:from-amber-500 hover:to-amber-600',
    'forum': 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-sm hover:from-orange-500 hover:to-orange-600',

    // Default
    'default': 'bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-sm hover:from-slate-500 hover:to-slate-600'
  };

  const tagLower = tag.toLowerCase();
  for (const [key, value] of Object.entries(colors)) {
    if (tagLower.includes(key)) return value;
  }
  return colors.default;
};

// Add type for category colors
type CategoryColorKey = 'anime' | 'manga' | 'games' | 'music' | 'tools' | 'community' | 'default';

const getCategoryColor = (category: string) => {
  const colors: Record<CategoryColorKey, string> = {
    'anime': 'hover:border-blue-500/50 hover:ring-blue-500/20 group-hover:text-blue-600',
    'manga': 'hover:border-purple-500/50 hover:ring-purple-500/20 group-hover:text-purple-600',
    'games': 'hover:border-green-500/50 hover:ring-green-500/20 group-hover:text-green-600',
    'music': 'hover:border-pink-500/50 hover:ring-pink-500/20 group-hover:text-pink-600',
    'tools': 'hover:border-cyan-500/50 hover:ring-cyan-500/20 group-hover:text-cyan-600',
    'community': 'hover:border-orange-500/50 hover:ring-orange-500/20 group-hover:text-orange-600',
    'default': 'hover:border-primary/50 hover:ring-primary/20 group-hover:text-primary'
  };

  return colors[category as CategoryColorKey] || colors.default;
};

export function CategorySection({ category, links, openNewLinkModal }: CategorySectionProps) {
  const categoryInfo = CATEGORIES[category];
  const isFeatured = category === 'featured';
  
  return (
    <section id={category} className={`mb-8 ${!isFeatured ? 'h-full' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground flex items-center">
          <span className="mr-2">{categoryInfo.icon}</span>
          {categoryInfo.name}
          {!isFeatured && (
            <span className="ml-2 text-xs font-normal bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
              {links.length}
            </span>
          )}
        </h2>
        <div className="flex">
          {!isFeatured && (
            <Button
              onClick={() => openNewLinkModal(category)}
              variant="ghost"
              size="sm"
              className="mr-1 p-1 h-7"
            >
              + Add
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary p-1 h-7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
          >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            List
          </Button>
        </div>
      </div>

      {/* Link Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full px-2">
        {links.length === 0 ? (
          <EmptyState 
            category={category}
            openNewLinkModal={openNewLinkModal}
          />
        ) : (
          links.map(link => (
            <HoverCard key={link.id}>
              <HoverCardTrigger asChild>
                <div 
                  className={cn(
                    "bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border border-border/50 p-4",
                    "hover:shadow-lg transition-all duration-300",
                    "group cursor-pointer",
                    "hover:bg-card/80",
                    "hover:border-primary/20",
                    "hover:ring-1 hover:ring-primary/10",
                    "hover:scale-[1.02]",
                    getCategoryColor(link.category)
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-1 items-center">
                      <WebsiteIcon url={link.url} size="sm" className="mr-2" />
                      <div className="min-w-0">
                        <h3 className="font-medium text-base text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {link.title}
                        </h3>
                        <ContentRatingBadge isNSFW={link.nsfw} className="mt-1" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-1">
                      {CATEGORIES[link.category] && CATEGORIES[link.category].icon}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{link.description}</p>
                  
                  {link.tags && 
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {link.tags
                        .filter(tag => !tag.startsWith('domain:'))
                        .map((tag, index) => (
                          <span 
                            key={index} 
                            className={cn(
                              "text-xs px-2.5 py-1 rounded-full font-medium",
                              "transform transition-all duration-200",
                              "hover:scale-105 hover:shadow-md",
                              "border border-white/10",
                              getTagColor(tag)
                            )}
                          >
                            {tag}
                          </span>
                        ))
                      }
                    </div>
                  }

                  <div className="flex flex-col gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "w-full",
                        "relative overflow-hidden",
                        "transition-all duration-200",
                        "bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700",
                        "text-white",
                        "border-0",
                        "hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-700 dark:hover:to-indigo-800",
                        "shadow-[0_2px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.1)]",
                        "hover:shadow-[0_4px_0_0_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_0_0_rgba(255,255,255,0.1)]",
                        "active:translate-y-[2px] active:shadow-none",
                        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
                        "before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000",
                        "font-medium tracking-wide"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(link.url, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <span className="truncate">Open Link</span>
                    </Button>
                    
                    {/* Alternative domains */}
                    {link.tags && link.tags
                      .filter(tag => tag.startsWith('domain:'))
                      .map((domain, idx) => {
                        const altDomain = domain.replace('domain:', '');
                        if (!altDomain || link.url.includes(altDomain)) return null;
                        
                        let formattedUrl = altDomain;
                        if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
                          formattedUrl = 'https://' + formattedUrl;
                        }
                        
                        return (
                          <Button
                            key={idx}
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "w-full justify-between",
                              "text-muted-foreground",
                              "hover:text-black dark:hover:text-white",
                              "relative overflow-hidden",
                              "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
                              "before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000"
                            )}
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(formattedUrl, '_blank', 'noopener,noreferrer');
                            }}
                          >
                            <span className="truncate">{altDomain}</span>
                            <ExternalLink className="h-4 w-4 ml-2 flex-shrink-0" />
                          </Button>
                        );
                      })
                      .filter(Boolean)
                    }
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">{link.title}</h4>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Link className="h-3 w-3 mr-1" />
                    <span className="truncate">{link.url}</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))
        )}
      </div>
    </section>
  );
}
