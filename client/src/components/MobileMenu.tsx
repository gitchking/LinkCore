import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X, Home, Info, Settings, Mail, History } from "lucide-react";
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
      <SheetContent side="right" className="w-3/4 max-w-xs p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="font-semibold">Menu</SheetTitle>
          <button 
            className="absolute right-4 top-4 text-muted-foreground"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </SheetHeader>
        
        <div className="p-4">
          {/* Main Menu Items */}
          <nav className="space-y-1">
            <a
              href="/"
              className="flex items-center px-3 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md"
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
              className="flex items-center px-3 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/about';
                onClose();
              }}
            >
              <Info className="mr-2 h-5 w-5" />
              <span>About Info</span>
            </a>
            
            <a
              href="/contact"
              className="flex items-center px-3 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/contact';
                onClose();
              }}
            >
              <Mail className="mr-2 h-5 w-5" />
              <span>Contact</span>
            </a>

            <a
              href="/history"
              className="flex items-center px-3 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/history';
                onClose();
              }}
            >
              <History className="mr-2 h-5 w-5" />
              <span>History</span>
            </a>
            
            {openSettings && (
              <a
                href="#"
                className="flex items-center px-3 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md"
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
