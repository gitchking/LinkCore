import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { PlusCircle, Menu, Search, Settings as SettingsIcon, Contact as ContactIcon, Mail, History as HistoryIcon, Newspaper } from "lucide-react";

interface HeaderProps {
  openNewLinkModal: () => void;
  openMobileMenu: () => void;
  openSettings?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ 
  openNewLinkModal, 
  openMobileMenu, 
  openSettings, 
  searchQuery, 
  setSearchQuery
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => window.location.href = '/'}
          >
            <span className="text-primary text-xl">✨</span>
            <h1 className="text-xl font-bold text-foreground">
              Animatrix
            </h1>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:block flex-grow max-w-md mx-4">
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
          
          {/* Account/Actions */}
          <div className="flex items-center space-x-2">
            <Link href="/contact" className="hidden md:block">
              <Button 
                variant="ghost"
                size="sm"
                className="flex"
              >
                <Mail className="mr-1 h-4 w-4" /> Contact
              </Button>
            </Link>

            <Link href="/history" className="hidden md:block">
              <Button 
                variant="ghost"
                size="sm"
                className="flex"
              >
                <HistoryIcon className="mr-1 h-4 w-4" /> History
              </Button>
            </Link>

            <Link href="/articles" className="hidden md:block">
              <Button 
                variant="ghost"
                size="sm"
                className="flex"
              >
                <Newspaper className="mr-1 h-4 w-4" /> Articles
              </Button>
            </Link>
            
            <Button 
              onClick={openNewLinkModal}
              className="flex"
              size="sm"
            >
              <PlusCircle className="mr-1 h-4 w-4" /> Add Link
            </Button>

            <Button
              onClick={openMobileMenu}
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
