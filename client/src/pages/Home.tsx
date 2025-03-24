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

  // Define link type
  interface Link {
    id: number;
    title: string;
    url: string;
    description: string | null;
    category: string;
    tags: string[] | null;
    featured: boolean;
    createdAt: string | null;
  }

  // Fetch links
  const { data: links = [] } = useQuery<Link[]>({
    queryKey: ['/api/links'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter links by search query
  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return links;
    
    const query = searchQuery.toLowerCase();
    return links.filter((link) => 
      link.title.toLowerCase().includes(query) || 
      (link.description && link.description.toLowerCase().includes(query)) || 
      link.url.toLowerCase().includes(query) ||
      (link.tags && link.tags.some((tag) => tag.toLowerCase().includes(query)))
    );
  }, [links, searchQuery]);

  // Group links by category
  const linksByCategory = useMemo(() => {
    const result: Record<string, Link[]> = {};
    
    // Initialize all categories with empty arrays
    Object.keys(CATEGORIES).forEach(category => {
      result[category] = [];
    });
    
    // Populate with links
    filteredLinks.forEach((link) => {
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
        
        {/* Regular category sections in horizontal layout */}
        <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-6">
          {Object.keys(CATEGORIES)
            .filter(id => id !== 'featured')
            .map(categoryId => (
              <div key={categoryId} className="min-w-[300px] max-w-[400px] w-full flex-shrink-0">
                <CategorySection
                  category={categoryId}
                  links={linksByCategory[categoryId] || []}
                  openNewLinkModal={openNewLinkModal}
                />
              </div>
            ))
          }
        </div>
      </main>
      
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
    </>
  );
}
