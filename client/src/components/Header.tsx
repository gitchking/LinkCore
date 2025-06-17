import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { PlusCircle, Menu, Search, Settings as SettingsIcon, Contact as ContactIcon, Mail, History as HistoryIcon, Newspaper, Home, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useDevMode } from "../lib/useDevMode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  openNewLinkModal: () => void;
  openSettings?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ 
  openNewLinkModal, 
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
              <DropdownMenuContent align="end" className="w-[calc(100vw-12rem)] max-w-[140px] p-1">
                <DropdownMenuItem
                  onClick={() => {
                    window.location.href = '/';
                  }}
                  className="px-2 py-1.5"
                >
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem
                  onClick={() => {
                    window.location.href = '/about';
                  }}
                  className="px-2 py-1.5"
                >
                  <Info className="mr-2 h-4 w-4" />
                  <span>About</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem
                  onClick={() => {
                    window.location.href = '/contact';
                  }}
                  className="px-2 py-1.5"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Contact</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    window.location.href = '/history';
                  }}
                  className="px-2 py-1.5"
                >
                  <HistoryIcon className="mr-2 h-4 w-4" />
                  <span>History</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    window.location.href = '/articles';
                  }}
                  className="px-2 py-1.5"
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
                      }}
                      className="px-2 py-1.5"
                    >
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
