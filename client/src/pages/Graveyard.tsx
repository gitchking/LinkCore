import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function Graveyard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNewLinkModal, setShowNewLinkModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        openNewLinkModal={() => setShowNewLinkModal(true)}
        openMobileMenu={() => setShowMobileMenu(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="container mx-auto px-4 pt-24 pb-10">
        <div className="mb-8 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Graveyard</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <p className="text-lg text-gray-700 mb-4">
            This is the graveyard section where we keep links to discontinued services, websites, or resources that 
            are no longer active but might still be of historical interest.
          </p>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500">No dead links added yet. They will appear here when added.</p>
          </div>
        </div>
      </main>
    </div>
  );
}