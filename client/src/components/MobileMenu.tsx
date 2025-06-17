import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Info, Settings, Mail, History, Newspaper, Menu } from "lucide-react";
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-medium flex items-center">
          <span className="text-primary mr-1">✨</span>
          Animatrix Menu
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={() => {
            window.location.href = '/';
            onClose();
          }}
        >
          <Home className="mr-2 h-4 w-4" />
          <span>Home</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => {
            window.location.href = '/about';
            onClose();
          }}
        >
          <Info className="mr-2 h-4 w-4" />
          <span>About</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => {
            window.location.href = '/contact';
            onClose();
          }}
        >
          <Mail className="mr-2 h-4 w-4" />
          <span>Contact</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            window.location.href = '/history';
            onClose();
          }}
        >
          <History className="mr-2 h-4 w-4" />
          <span>History</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            window.location.href = '/articles';
            onClose();
          }}
        >
          <Newspaper className="mr-2 h-4 w-4" />
          <span>Articles</span>
        </DropdownMenuItem>
        
        {openSettings && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                openSettings();
                onClose();
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
