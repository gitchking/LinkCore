import { Button } from "@/components/ui/button";
import { EmptyState } from "./EmptyState";
import { Link } from "lucide-react";
import { CATEGORIES } from "@/lib/icons";
import { ContentRatingBadge } from "./ContentRatingBadge";

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
        <h2 className="text-lg font-bold font-montserrat text-neutral-800 flex items-center">
          <span className="mr-2">{categoryInfo.icon}</span>
          {categoryInfo.name}
          {!isFeatured && (
            <span className="ml-2 text-xs font-normal bg-neutral-100 px-2 py-0.5 rounded-full text-neutral-600">
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
      <div className="grid grid-cols-1 gap-3">
        {links.length === 0 ? (
          <EmptyState 
            category={category}
            openNewLinkModal={openNewLinkModal}
          />
        ) : (
          links.slice(0, 4).map(link => (
            <div 
              key={link.id}
              className="bg-white rounded-md shadow-sm border border-neutral-100 p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-neutral-900 line-clamp-1">{link.title}</h3>
                  <ContentRatingBadge isNSFW={link.nsfw} className="mt-0.5" />
                </div>
                <div className="flex-shrink-0 ml-2">
                  {CATEGORIES[link.category] && CATEGORIES[link.category].icon}
                </div>
              </div>
              <p className="text-neutral-500 text-xs mt-1 line-clamp-1">{link.description}</p>
              <div className="flex items-center mt-2">
                <Link className="h-3 w-3 mr-1 text-neutral-400" />
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline truncate flex-1"
                >
                  {link.url}
                </a>
              </div>
              {link.tags && link.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {link.tags.slice(0, 2).map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {link.tags.length > 2 && (
                    <span className="text-[10px] text-neutral-400">+{link.tags.length - 2}</span>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
