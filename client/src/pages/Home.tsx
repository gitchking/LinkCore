import { useState, useEffect, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { CategorySection } from "@/components/CategorySection";
import { NewLinkModal } from "@/components/NewLinkModal";
import { MobileMenu } from "@/components/MobileMenu";
import { SettingsDialog } from "@/components/SettingsDialog";
import { PostManagementDialog } from "@/components/PostManagementDialog";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Wrench, Home as HomeIcon } from "lucide-react";
import { CATEGORIES } from "@/lib/icons";
import { apiRequest } from "@/lib/queryClient";
import { useDevMode } from "../lib/useDevMode";
import { Link as LinkType } from "@/types";
import { LinkCard } from "../components/LinkCard";
import { useInView } from "react-intersection-observer";

export default function HomePage() {
  // State
  const [activeCategory, setActiveCategory] = useState('featured');
  const [newLinkModalOpen, setNewLinkModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  // Default to showing NSFW content and use localStorage to persist the setting
  const [showNSFW, setShowNSFW] = useState(() => {
    // Check localStorage first, if not found, default to true
    const savedPreference = localStorage.getItem('showNSFW');
    return savedPreference !== null ? savedPreference === 'true' : true;
  });
  const { isDevMode, setIsDevMode } = useDevMode();
  const [postManagementOpen, setPostManagementOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false
  });
  const ITEMS_PER_PAGE = 20;
  
  // Query client for mutations
  const queryClient = useQueryClient();

  const { data: links = [], isLoading } = useQuery<LinkType[]>({
    queryKey: ['links', selectedCategory, page],
    queryFn: async () => {
      const response = await fetch(`/api/links?category=${selectedCategory || ''}&page=${page}&limit=${ITEMS_PER_PAGE}`);
      if (!response.ok) throw new Error('Failed to fetch links');
      return response.json();
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  useEffect(() => {
    if (inView && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [inView, isLoading]);

  // Memoize filtered links by category
  const linksByCategory = useMemo(() => {
    const result: Record<string, LinkType[]> = {};
    
    // Initialize categories
    Object.keys(CATEGORIES).forEach(category => {
      result[category] = [];
    });
    
    // Filter and categorize links
    links.forEach(link => {
      // Skip if doesn't match search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches = 
          link.title.toLowerCase().includes(query) || 
          (link.description && link.description.toLowerCase().includes(query)) || 
          link.url.toLowerCase().includes(query) ||
          (link.tags && link.tags.some((tag: string) => tag.toLowerCase().includes(query)));
        
        if (!matches) return;
      }
      
      // Add to appropriate category
      if (link.category && result[link.category]) {
        result[link.category].push(link);
      }
      
      // Add to featured if applicable
      if (link.featured) {
        result.featured.push(link);
      }
    });
    
    return result;
  }, [links, searchQuery]);

  // Add memoized pagination for tools
  const paginatedTools = useMemo(() => {
    if (activeCategory !== 'tools') return linksByCategory.tools || [];
    
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return linksByCategory.tools.slice(start, end);
  }, [linksByCategory.tools, activeCategory, page]);

  // Add load more function
  const loadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  // Modal handlers
  const openNewLinkModal = (category = '') => {
    setSelectedCategory(category);
    setNewLinkModalOpen(true);
  };

  const closeNewLinkModal = () => {
    setNewLinkModalOpen(false);
    setSelectedCategory(undefined);
  };

  // Mobile menu handlers
  const openMobileMenu = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Handle scroll position to update active category
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(CATEGORIES).map(categoryId => {
        const element = document.getElementById(categoryId);
        if (!element) return { id: categoryId, position: Infinity };
        
        const rect = element.getBoundingClientRect();
        return {
          id: categoryId,
          position: Math.abs(rect.top - 150) // 150px offset for header
        };
      });
      
      // Find the closest section to the top of the viewport
      const closest = sections.reduce((prev, current) => 
        prev.position < current.position ? prev : current
      );
      
      if (closest.id !== activeCategory) {
        setActiveCategory(closest.id);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-full border-r bg-card">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-6">Animatrix</h1>
          <nav className="space-y-2 overflow-y-auto max-h-[calc(100vh-6rem)] scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-accent hover:scrollbar-track-transparent">
            {Object.entries(CATEGORIES).map(([category, { icon, name }]) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center space-x-2 px-3 py-2 w-full rounded-md transition-colors ${
                  activeCategory === category
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent/50'
                }`}
              >
                {icon}
                <span className="capitalize">{name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <Header 
          openNewLinkModal={() => openNewLinkModal()} 
          openSettings={() => setSettingsOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <main className="w-full max-w-[1500px] mx-auto px-6 py-6 mb-24">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold capitalize">{CATEGORIES[activeCategory]?.name || activeCategory}</h2>
          </div>
          
          {activeCategory === 'featured' ? (
            <CategorySection 
              category="featured"
              links={linksByCategory.featured || []}
              openNewLinkModal={openNewLinkModal}
            />
          ) : activeCategory === 'tools' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedTools.map((link) => (
                  <LinkCard key={link.id} link={link} />
                ))}
              </div>
              {paginatedTools.length < linksByCategory.tools.length && (
                <div className="mt-4 text-center">
                  <Button onClick={loadMore} variant="outline">
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <CategorySection
              category={activeCategory}
              links={linksByCategory[activeCategory] || []}
              openNewLinkModal={openNewLinkModal}
            />
          )}
        </main>
      </div>
      
      {/* Floating Action Buttons for mobile */}
      <div className="fixed bottom-6 right-6 md:hidden flex flex-col space-y-4">
        <Button
          onClick={() => setSettingsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg bg-muted text-muted-foreground hover:bg-muted/80"
          size="icon"
          variant="outline"
        >
          <Settings className="h-6 w-6" />
        </Button>
        {isDevMode && (
          <Button
            onClick={() => setPostManagementOpen(true)}
            className="w-14 h-14 rounded-full shadow-lg bg-yellow-500 hover:bg-yellow-600"
            size="icon"
          >
            <Wrench className="h-6 w-6" />
          </Button>
        )}
        <Button
          onClick={() => openNewLinkModal()}
          className="w-14 h-14 rounded-full shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Modals */}
      <NewLinkModal 
        isOpen={newLinkModalOpen} 
        onClose={closeNewLinkModal}
        initialCategory={selectedCategory}
      />
      
      <SettingsDialog
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        showNSFW={showNSFW}
        setShowNSFW={(value) => {
          setShowNSFW(value);
          localStorage.setItem('showNSFW', String(value));
        }}
        isDevMode={isDevMode}
        toggleDevMode={() => {
          setIsDevMode(!isDevMode);
          if (isDevMode) {
            setPostManagementOpen(false);
          }
        }}
        openPostManagement={() => setPostManagementOpen(true)}
      />
      
      <PostManagementDialog 
        isOpen={postManagementOpen}
        onClose={() => setPostManagementOpen(false)}
        links={links as any[]}
      />
    </div>
  );
}
