import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalLink, AlertCircle } from "lucide-react";
import { useQuery } from '@tanstack/react-query';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  url: string;
  date: string;
}

export default function Articles() {
  const [news, setNews] = useState<NewsItem[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['animeNews'],
    queryFn: async () => {
      // Use a CORS proxy for development
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch anime news');
      }
      return response.json();
    }
  });

  useEffect(() => {
    if (data) {
      setNews(data);
    }
  }, [data]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Anime News Articles</h1>
      
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-6 w-full" />
              </CardHeader>
              <CardContent className="pb-4">
                <Skeleton className="h-32 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-1/3" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load anime news. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && news.length === 0 && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Articles</AlertTitle>
          <AlertDescription>
            No anime news articles are available at the moment. Please check back later.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Card key={item.id} className="overflow-hidden flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{new Date(item.date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4 flex-grow">
              {item.thumbnail && (
                <div className="mb-4 overflow-hidden rounded-md">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/600x400?text=No+Image';
                    }}
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
            </CardContent>
            <CardFooter>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary inline-flex items-center hover:underline"
              >
                Read more <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}