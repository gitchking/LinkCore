import { Button } from "@/components/ui/button";
import { EmptyState } from "./EmptyState";
import { Link } from "lucide-react";
import { CATEGORIES } from "@/lib/icons";

interface Link {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
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
    <section id={category} className={isFeatured ? "mb-12" : "mb-4"}>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-montserrat text-neutral-800 flex items-center">
          {categoryInfo.icon}
          {categoryInfo.name}
          {!isFeatured && (
            <span className="ml-2 text-xs font-normal bg-neutral-100 px-2 py-1 rounded-full text-neutral-600">
              {links.length} links
            </span>
          )}
        </h2>
        <div className="flex">
          {!isFeatured && (
            <Button
              onClick={() => openNewLinkModal(category)}
              variant="default"
              size="sm"
              className="h-8 mr-1"
            >
              <i className="fas fa-plus mr-1"></i> Add
            </Button>
          )}
          <Button
            variant="link"
            size="sm"
            className="text-primary hover:text-primary/90 font-medium h-8 p-0"
          >
            View All
          </Button>
        </div>
      </div>

      {/* Link List */}
      <div className={isFeatured ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-2"}>
        {links.length === 0 ? (
          <EmptyState 
            category={category}
            openNewLinkModal={openNewLinkModal}
          />
        ) : (
          links.slice(0, isFeatured ? undefined : 3).map(link => (
            <div 
              key={link.id}
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-base text-neutral-900 line-clamp-1">{link.title}</h3>
                <div className="flex-shrink-0 ml-2">{categoryInfo.icon}</div>
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
                      className="text-xs bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {link.tags.length > 2 && (
                    <span className="text-xs text-neutral-500">+{link.tags.length - 2} more</span>
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
