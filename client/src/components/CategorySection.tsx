import { Button } from "@/components/ui/button";
import { EmptyState } from "./EmptyState";
import { Link } from "lucide-react";
import { CATEGORIES } from "@/lib/icons";
import { ContentRatingBadge } from "./ContentRatingBadge";
import { WebsiteIcon } from "./WebsiteIcon";

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
            variant="link"
            size="sm"
            className="text-primary hover:text-primary/90 text-xs p-0 h-7"
          >
            View All →
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
            <div 
              key={link.id}
              className="bg-card rounded-md shadow-sm border border-border p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-1 items-center">
                  <WebsiteIcon url={link.url} size="sm" className="mr-2" />
                  <div className="min-w-0">
                    <h3 className="font-medium text-base text-card-foreground line-clamp-1">{link.title}</h3>
                    <ContentRatingBadge isNSFW={link.nsfw} className="mt-1" />
                  </div>
                </div>
                <div className="flex-shrink-0 ml-1">
                  {CATEGORIES[link.category] && CATEGORIES[link.category].icon}
                </div>
              </div>
              <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{link.description}</p>
              <div className="flex flex-col gap-1 mt-2">
                {/* Main URL */}
                <div className="flex items-center">
                  <Link className="h-3 w-3 mr-1 text-muted-foreground" />
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline truncate flex-1"
                  >
                    {link.url}
                  </a>
                </div>
                
                {/* Alternative domains - extract from tags that start with "domain:" */}
                {link.tags && link.tags
                  .filter(tag => tag.startsWith('domain:'))
                  .map((domain, idx) => {
                    const altDomain = domain.replace('domain:', '');
                    // Skip if it's empty or the same as the main URL
                    if (!altDomain || link.url.includes(altDomain)) return null;
                    
                    // Format as a proper URL if needed
                    let formattedUrl = altDomain;
                    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
                      formattedUrl = 'https://' + formattedUrl;
                    }
                    
                    return (
                      <div key={idx} className="flex items-center ml-4">
                        <Link className="h-3 w-3 mr-1 text-muted-foreground opacity-60" />
                        <a 
                          href={formattedUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary/80 hover:underline truncate flex-1"
                        >
                          {altDomain}
                        </a>
                      </div>
                    );
                  })
                  .filter(Boolean)
                }
              </div>
              {link.tags && link.tags.filter(tag => !tag.startsWith('domain:')).length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {link.tags
                    .filter(tag => !tag.startsWith('domain:')) // Filter out domain tags
                    .map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))
                  }
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
