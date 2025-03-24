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
    <section id={category} className="mb-12">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-montserrat text-neutral-800 flex items-center">
          {categoryInfo.icon}
          {categoryInfo.name}
          {!isFeatured && (
            <span className="ml-3 text-sm font-normal bg-neutral-100 px-2 py-1 rounded-full text-neutral-600">
              {links.length} links
            </span>
          )}
        </h2>
        <div className="flex mt-2 sm:mt-0">
          {!isFeatured && (
            <Button
              onClick={() => openNewLinkModal(category)}
              variant="default"
              size="sm"
              className="mr-2"
            >
              <i className="fas fa-plus mr-1"></i> Add Link
            </Button>
          )}
          <Button
            variant="link"
            size="sm"
            className="text-primary hover:text-primary/90 font-medium"
          >
            View All <i className="fas fa-arrow-right ml-1"></i>
          </Button>
        </div>
      </div>

      {/* Link Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.length === 0 ? (
          <EmptyState 
            category={category}
            openNewLinkModal={openNewLinkModal}
          />
        ) : (
          links.map(link => (
            <div 
              key={link.id}
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg text-neutral-900 line-clamp-2">{link.title}</h3>
                <div className="flex-shrink-0">
                  {CATEGORIES[link.category] && CATEGORIES[link.category].icon}
                </div>
              </div>
              <p className="text-neutral-500 text-sm mt-2 line-clamp-2">{link.description}</p>
              <div className="flex items-center mt-4">
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
                      className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full"
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
