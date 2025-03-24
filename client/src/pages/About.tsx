import { useState } from "react";
import { Header } from "@/components/Header";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
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
          <h1 className="text-3xl font-bold">About & Info</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LinkIcon className="text-primary mr-2 h-5 w-5" />
                About EverythingMoe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                EverythingMoe is a curated collection of links related to anime, manga, and Japanese pop culture. 
                Our goal is to provide a comprehensive resource for finding the best websites, tools, and communities.
              </p>
              <p>
                The site is organized into categories to help you quickly find what you're looking for.
                Each link is carefully selected and verified to ensure it's relevant and valuable.
              </p>
              <p>
                This is a community-driven project. We encourage users to submit their favorite links
                to help grow and improve our collection.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">How to Submit Links</h3>
                <p className="text-gray-700">
                  Click the "New Link" button in the top right corner of the page and fill out the form
                  with the link details. Be sure to select the appropriate category.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Contact</h3>
                <p className="text-gray-700">
                  For questions, suggestions, or feedback, please contact the site administrator
                  through the submission form or via email.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Rules</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Only submit links that are related to the site's focus</li>
                  <li>Do not submit illegal or harmful content</li>
                  <li>Choose the appropriate category for your submissions</li>
                  <li>Provide accurate and descriptive information</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}