import { useCallback } from "react";
import { CATEGORIES } from "@/lib/icons";

interface CategoryNavigationProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function CategoryNavigation({ activeCategory, setActiveCategory }: CategoryNavigationProps) {
  const handleCategoryClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, categoryId: string) => {
    e.preventDefault();
    setActiveCategory(categoryId);
    
    // Scroll to top of content when changing categories
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [setActiveCategory]);
  
  // Get all categories
  const allCategories = Object.keys(CATEGORIES);
  
  return (
    <div className="pt-0 bg-background border-b shadow-sm sticky top-16 z-40">
      <div className="max-w-5xl mx-auto px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <nav className="flex space-x-1 py-3">
            {/* Featured tab */}
            <a 
              href="#featured" 
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap flex items-center ${
                activeCategory === 'featured' 
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
              }`}
              onClick={(e) => handleCategoryClick(e, 'featured')}
            >
              <span className="mr-1.5 flex items-center">{CATEGORIES['featured'].icon}</span> Featured
            </a>
            
            {/* All category tabs */}
            {allCategories.map(categoryId => (
              categoryId !== 'featured' && (
                <a 
                  key={categoryId}
                  href={`#${categoryId}`} 
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap flex items-center ${
                    activeCategory === categoryId 
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                  onClick={(e) => handleCategoryClick(e, categoryId)}
                >
                  <span className="mr-1.5 flex items-center">{CATEGORIES[categoryId].icon}</span> {CATEGORIES[categoryId].name}
                </a>
              )
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
