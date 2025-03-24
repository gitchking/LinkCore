import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { LinkIcon, PlusCircle, Menu, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  openNewLinkModal: () => void;
  openMobileMenu: () => void;
  openSettings?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ openNewLinkModal, openMobileMenu, openSettings, searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <LinkIcon className="text-primary h-5 w-5" />
              <h1 className="text-xl font-bold text-foreground">
                Link<span className="text-primary">Hub</span>
              </h1>
            </div>
          </Link>
          
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
            <ThemeToggle />
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
