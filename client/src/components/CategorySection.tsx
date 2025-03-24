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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.length === 0 ? (
          <EmptyState 
            category={category}
            openNewLinkModal={openNewLinkModal}
          />
        ) : (
          links.map(link => (
            <div 
              key={link.id}
              className="bg-white rounded-md shadow-sm border border-neutral-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-base text-neutral-900 line-clamp-2">{link.title}</h3>
                  <ContentRatingBadge isNSFW={link.nsfw} className="mt-1" />
                </div>
                <div className="flex-shrink-0 ml-2">
                  {CATEGORIES[link.category] && CATEGORIES[link.category].icon}
                </div>
              </div>
              <p className="text-neutral-500 text-sm mt-2 line-clamp-2">{link.description}</p>
              <div className="flex items-center mt-3">
                <Link className="h-4 w-4 mr-1 text-neutral-400" />
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline truncate flex-1"
                >
                  {link.url}
                </a>
              </div>
              {link.tags && link.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {link.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
