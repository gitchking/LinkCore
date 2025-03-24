import { useState } from "react";
import { Header } from "@/components/Header";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, CalendarIcon, UserIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNewLinkModal, setShowNewLinkModal] = useState(false);

  // Sample articles
  const articles = [
    {
      id: 1,
      title: "The Best Resources for Anime Enthusiasts",
      description: "A comprehensive guide to finding the best anime-related resources on the web.",
      author: "Admin",
      date: "March 24, 2025",
      category: "Guides",
      imageUrl: null // No image for now
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
          <h1 className="text-3xl font-bold">Articles</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <p className="text-lg text-gray-700 mb-6">
            Read articles and guides about various topics related to our link categories.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                {article.imageUrl && (
                  <div className="h-48 bg-neutral-100">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardHeader>
                  <div className="text-sm text-gray-500 mb-1">{article.category}</div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardFooter className="border-t pt-4 text-sm text-gray-500">
                  <div className="flex justify-between w-full">
                    <div className="flex items-center">
                      <UserIcon className="h-3 w-3 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {article.date}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}