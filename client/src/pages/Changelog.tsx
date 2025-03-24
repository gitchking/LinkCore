import { useState } from "react";
import { Header } from "@/components/Header";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, CalendarIcon } from "lucide-react";

export default function Changelog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNewLinkModal, setShowNewLinkModal] = useState(false);

  const changelogEntries = [
    {
      date: "March 24, 2025",
      version: "1.0.0",
      changes: [
        "Initial release of LinkHub",
        "Added link submission functionality",
        "Implemented category-based organization",
        "Created responsive UI for all devices"
      ]
    }
  ];

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
          <h1 className="text-3xl font-bold">Changelog</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <p className="text-lg text-gray-700 mb-6">
            Track the development and improvements to the platform. We regularly update this page with new features, bug fixes, and other changes.
          </p>
          
          <div className="space-y-8">
            {changelogEntries.map((entry, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-2">
                <div className="flex items-center mb-2">
                  <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500">{entry.date}</span>
                  <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    v{entry.version}
                  </span>
                </div>
                
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {entry.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="text-gray-700">{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}