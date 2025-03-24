import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Search, X, Home, Info, Settings } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openSettings?: () => void;
}

export function MobileMenu({ 
  isOpen, 
  onClose, 
  searchQuery, 
  setSearchQuery,
  openSettings
}: MobileMenuProps) {
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-3/4 max-w-xs p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="font-montserrat font-semibold">Menu</SheetTitle>
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
          
          {/* Main Menu Items */}
          <nav className="space-y-1">
            <a
              href="/"
              className="flex items-center px-3 py-2 text-neutral-600 hover:text-primary hover:bg-primary/10 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
                onClose();
              }}
            >
              <Home className="mr-2 h-5 w-5" />
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
              <Info className="mr-2 h-5 w-5" />
              <span>About</span>
            </a>
            
            {openSettings && (
              <a
                href="#"
                className="flex items-center px-3 py-2 text-neutral-600 hover:text-primary hover:bg-primary/10 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  openSettings();
                  onClose();
                }}
              >
                <Settings className="mr-2 h-5 w-5" />
                <span>Settings</span>
              </a>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
