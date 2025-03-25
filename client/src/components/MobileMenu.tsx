import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Home, Info, Settings, Mail, History, Newspaper } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

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
      <SheetContent side="right" className="w-2/5 max-w-[220px] p-0">
        <SheetHeader className="p-2 border-b">
          <SheetTitle className="font-medium flex items-center text-xs">
            <span className="text-primary mr-1">✨</span>
            Animatrix Menu
          </SheetTitle>
        </SheetHeader>
        
        <div className="p-2">
          {/* Main Menu Items */}
          <nav className="space-y-0.5">
            <a
              href="/"
              className="flex items-center px-2 py-1.5 text-sm text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-150"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
                onClose();
              }}
            >
              <Home className="mr-1.5 h-4 w-4" />
              <span>Home</span>
            </a>
            
            <a
              href="/about"
              className="flex items-center px-2 py-1.5 text-sm text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-150"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/about';
                onClose();
              }}
            >
              <Info className="mr-1.5 h-4 w-4" />
              <span>About</span>
            </a>
            
            <a
              href="/contact"
              className="flex items-center px-2 py-1.5 text-sm text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-150"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/contact';
                onClose();
              }}
            >
              <Mail className="mr-1.5 h-4 w-4" />
              <span>Contact</span>
            </a>

            <a
              href="/history"
              className="flex items-center px-2 py-1.5 text-sm text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-150"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/history';
                onClose();
              }}
            >
              <History className="mr-1.5 h-4 w-4" />
              <span>History</span>
            </a>

            <a
              href="/articles"
              className="flex items-center px-2 py-1.5 text-sm text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-150"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/articles';
                onClose();
              }}
            >
              <Newspaper className="mr-1.5 h-4 w-4" />
              <span>Articles</span>
            </a>
            
            {openSettings && (
              <a
                href="#"
                className="flex items-center px-2 py-1.5 text-sm text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-150"
                onClick={(e) => {
                  e.preventDefault();
                  openSettings();
                  onClose();
                }}
              >
                <Settings className="mr-1.5 h-4 w-4" />
                <span>Settings</span>
              </a>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
