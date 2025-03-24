import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { CATEGORIES } from "@/lib/icons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function MobileMenu({ 
  isOpen, 
  onClose, 
  activeCategory, 
  setActiveCategory, 
  searchQuery, 
  setSearchQuery 
}: MobileMenuProps) {
  
  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: string) => {
    e.preventDefault();
    setActiveCategory(categoryId);
    onClose();
    
    // Smooth scroll to the section
    setTimeout(() => {
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
    }, 100);
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-3/4 max-w-xs p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="font-montserrat font-semibold">Categories</SheetTitle>
          <button 
            className="absolute right-4 top-4 text-neutral-500"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </SheetHeader>
        
        <div className="p-4">
          {/* Mobile Search */}
          <div className="mb-4">
            <div className="relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all categories..."
                className="w-full py-2 pl-10 pr-4 rounded-full"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          {/* Category List */}
          <nav className="space-y-1">
            {Object.entries(CATEGORIES).map(([id, { icon, name }]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-center px-3 py-2 rounded-md ${
                  activeCategory === id 
                    ? 'text-primary bg-primary/10' 
                    : 'text-neutral-600 hover:text-primary hover:bg-primary/10'
                }`}
                onClick={(e) => handleCategoryClick(e, id)}
              >
                <span className="w-6">{icon}</span>
                <span>{name}</span>
              </a>
            ))}
            
            {/* Additional Menu Items */}
            <div className="pt-2 border-t mt-2 space-y-1">
              <a
                href="/"
                className="flex items-center px-3 py-2 text-neutral-600 hover:text-primary hover:bg-primary/10 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/';
                  onClose();
                }}
              >
                <i className="fas fa-home w-6"></i>
                <span>Home</span>
              </a>
              
              <a
                href="/about"
                className="flex items-center px-3 py-2 text-neutral-600 hover:text-primary hover:bg-primary/10 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/about';
                  onClose();
                }}
              >
                <i className="fas fa-info-circle w-6"></i>
                <span>About</span>
              </a>
              
              <a
                href="/history"
                className="flex items-center px-3 py-2 text-neutral-600 hover:text-primary hover:bg-primary/10 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/history';
                  onClose();
                }}
              >
                <i className="fas fa-history w-6"></i>
                <span>History</span>
              </a>
              
              <a
                href="/settings"
                className="flex items-center px-3 py-2 text-neutral-600 hover:text-primary hover:bg-primary/10 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/settings';
                  onClose();
                }}
              >
                <i className="fas fa-cog w-6"></i>
                <span>Settings</span>
              </a>
              
              <a
                href="#allcategories"
                className="flex items-center px-3 py-2 text-neutral-600 hover:text-primary hover:bg-primary/10 rounded-md"
              >
                <i className="fas fa-th-list w-6"></i>
                <span>All Categories</span>
              </a>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
