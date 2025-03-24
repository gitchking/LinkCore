import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { CategorySection } from "@/components/CategorySection";
import { NewLinkModal } from "@/components/NewLinkModal";
import { MobileMenu } from "@/components/MobileMenu";
import { SettingsDialog } from "@/components/SettingsDialog";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { CATEGORIES } from "@/lib/icons";

export default function Home() {
  // State
  const [activeCategory, setActiveCategory] = useState('featured');
  const [newLinkModalOpen, setNewLinkModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showNSFW, setShowNSFW] = useState(false); // Default to not showing NSFW content

  // Fetch links
  const { data: links = [] } = useQuery({
    queryKey: ['/api/links'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter links by search query and NSFW settings
  const filteredLinks = useMemo(() => {
    let result = links;
    
    // First filter by NSFW setting
    if (!showNSFW) {
      result = (result as any[]).filter(link => !link.nsfw);
    }
    
    // Then filter by search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = (result as any[]).filter(link => 
        link.title.toLowerCase().includes(query) || 
        (link.description && link.description.toLowerCase().includes(query)) || 
        link.url.toLowerCase().includes(query) ||
        (link.tags && link.tags.some((tag: string) => tag.toLowerCase().includes(query)))
      );
    }
    
    return result;
  }, [links, searchQuery, showNSFW]);

  // Group links by category
  const linksByCategory = useMemo(() => {
    const result: Record<string, any[]> = {};
    
    // Initialize all categories with empty arrays
    Object.keys(CATEGORIES).forEach(category => {
      result[category] = [];
    });
    
    // Populate with links
    filteredLinks.forEach((link: any) => {
      // Add to appropriate category
      if (result[link.category]) {
        result[link.category].push(link);
      }
      
      // Also add to featured if marked as featured
      if (link.featured && result.featured) {
        result.featured.push(link);
      }
    });
    
    return result;
  }, [filteredLinks]);

  // Modal handlers
  const openNewLinkModal = (category = '') => {
    setSelectedCategory(category);
    setNewLinkModalOpen(true);
  };

  const closeNewLinkModal = () => {
    setNewLinkModalOpen(false);
    setSelectedCategory('');
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
    <>
      <Header 
        openNewLinkModal={() => openNewLinkModal()} 
        openMobileMenu={openMobileMenu}
        openSettings={() => setSettingsOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <CategoryNavigation 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <main className="container mx-auto px-4 py-6 mb-24">
        {/* Featured section */}
        <CategorySection 
          category="featured"
          links={linksByCategory.featured || []}
          openNewLinkModal={openNewLinkModal}
        />
        
        {/* Regular category sections */}
        {Object.keys(CATEGORIES)
          .filter(id => id !== 'featured')
          .map(categoryId => (
            <CategorySection
              key={categoryId}
              category={categoryId}
              links={linksByCategory[categoryId] || []}
              openNewLinkModal={openNewLinkModal}
            />
          ))
        }
      </main>
      
      {/* Floating Action Buttons for mobile */}
      <div className="fixed bottom-6 right-6 md:hidden flex flex-col space-y-4">
        <Button
          onClick={() => setSettingsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg bg-neutral-800 hover:bg-neutral-700"
          size="icon"
        >
          <Settings className="h-6 w-6" />
        </Button>
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
      
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openSettings={() => setSettingsOpen(true)}
      />
      
      <SettingsDialog
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        showNSFW={showNSFW}
        setShowNSFW={setShowNSFW}
      />
    </>
  );
}
