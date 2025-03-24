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
    
    // Smooth scroll to the section
    const element = document.getElementById(categoryId);
    if (element) {
      const headerHeight = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [setActiveCategory]);
  
  // Get all categories
  const allCategories = Object.keys(CATEGORIES);
  
  return (
    <div className="pt-16 bg-white shadow-sm sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <nav className="flex space-x-1 py-3">
            {/* Featured tab */}
            <a 
              href="#featured" 
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                activeCategory === 'featured' 
                  ? 'text-primary bg-primary/10'
                  : 'text-neutral-600 hover:text-primary hover:bg-primary/10'
              }`}
              onClick={(e) => handleCategoryClick(e, 'featured')}
            >
              {CATEGORIES['featured'].icon} Featured
            </a>
            
            {/* All category tabs */}
            {allCategories.map(categoryId => (
              categoryId !== 'featured' && (
                <a 
                  key={categoryId}
                  href={`#${categoryId}`} 
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                    activeCategory === categoryId 
                      ? 'text-primary bg-primary/10'
                      : 'text-neutral-600 hover:text-primary hover:bg-primary/10'
                  }`}
                  onClick={(e) => handleCategoryClick(e, categoryId)}
                >
                  {CATEGORIES[categoryId].icon} {CATEGORIES[categoryId].name}
                </a>
              )
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
