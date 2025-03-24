import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { CategorySection } from "@/components/CategorySection";
import { NewLinkModal } from "@/components/NewLinkModal";
import { MobileMenu } from "@/components/MobileMenu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CATEGORIES } from "@/lib/icons";

export default function Home() {
  // State
  const [activeCategory, setActiveCategory] = useState('featured');
  const [newLinkModalOpen, setNewLinkModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch links
  const { data: links = [] } = useQuery({
    queryKey: ['/api/links'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter links by search query
  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return links;
    
    const query = searchQuery.toLowerCase();
    return links.filter((link: any) => 
      link.title.toLowerCase().includes(query) || 
      link.description.toLowerCase().includes(query) || 
      link.url.toLowerCase().includes(query) ||
      (link.tags && link.tags.some((tag: string) => tag.toLowerCase().includes(query)))
    );
  }, [links, searchQuery]);

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
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <h1 className="text-2xl font-bold">Home</h1>
        <div className="flex items-center space-x-2">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all categories..."
              className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button 
            onClick={() => openNewLinkModal()}
            size="sm"
          >
            <Plus className="mr-1 h-4 w-4" /> New Link
          </Button>
        </div>
      </div>
      
      <div className="flex">
        <div className="hidden md:block w-64 p-4 bg-gray-50">
          <CategoryNavigation 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>
        
        <main className="flex-1 p-6 mb-24">
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
      </div>
      
      {/* Floating Action Button for mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
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
      />
    </div>
  );
}
