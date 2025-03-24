import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History as HistoryIcon, Plus, Trash, Eye, Clock, Link2 } from "lucide-react";
import { WebsiteIcon } from "@/components/WebsiteIcon";
import { formatDistanceToNow } from "date-fns";

interface HistoryEntry {
  id: number;
  action: 'add' | 'remove' | 'update' | 'view';
  title: string;
  url: string;
  category: string;
  timestamp: string;
  description?: string;
}

export default function History() {
  // Simulated history data - in a real app, this would come from an API
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);

  // Simulate fetching history data with API integration
  const { data: links = [] } = useQuery<any[]>({ 
    queryKey: ["/api/links"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    // Generate mock history data based on links
    if (links) {
      const generateHistoryEntries = () => {
        // Sort links by ID to get latest first when creating history
        const sortedLinks = [...links].sort((a, b) => b.id - a.id);
        
        const now = new Date();
        const mockHistory: HistoryEntry[] = [];
        
        // Create some sample history entries
        sortedLinks.forEach((link, index) => {
          // Add an "add" action for each link
          mockHistory.push({
            id: mockHistory.length + 1,
            action: 'add',
            title: link.title,
            url: link.url,
            category: link.category,
            timestamp: new Date(now.getTime() - (index * 2 * 60 * 60 * 1000)).toISOString(), // Every 2 hours in the past
            description: `Link added to ${link.category} category`
          });
          
          // For some links, add view actions
          if (index % 2 === 0) {
            mockHistory.push({
              id: mockHistory.length + 1,
              action: 'view',
              title: link.title,
              url: link.url, 
              category: link.category,
              timestamp: new Date(now.getTime() - (index * 2 * 60 * 60 * 1000) + 30 * 60 * 1000).toISOString(), // 30 min after add
              description: 'Link was viewed'
            });
          }
          
          // For some links, add update actions
          if (index % 3 === 0) {
            mockHistory.push({
              id: mockHistory.length + 1,
              action: 'update',
              title: link.title,
              url: link.url,
              category: link.category, 
              timestamp: new Date(now.getTime() - (index * 2 * 60 * 60 * 1000) + 45 * 60 * 1000).toISOString(), // 45 min after add
              description: 'Link details were updated'
            });
          }
          
          // For a few links, add remove actions
          if (index % 5 === 0 && index > 0) {
            mockHistory.push({
              id: mockHistory.length + 1,
              action: 'remove',
              title: `Removed Link ${index}`,
              url: `https://example${index}.com`,
              category: link.category,
              timestamp: new Date(now.getTime() - (index * 2 * 60 * 60 * 1000) + 90 * 60 * 1000).toISOString(), // 90 min after add
              description: `Link was removed from ${link.category} category`
            });
          }
        });
        
        // Sort by timestamp, most recent first
        return mockHistory.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      };
      
      setHistoryData(generateHistoryEntries());
    }
  }, [links]);

  const getActionIcon = (action: string) => {
    switch(action) {
      case 'add': return <Plus className="h-4 w-4 text-green-500" />;
      case 'remove': return <Trash className="h-4 w-4 text-red-500" />;
      case 'update': return <Link2 className="h-4 w-4 text-blue-500" />;
      case 'view': return <Eye className="h-4 w-4 text-purple-500" />;
      default: return <HistoryIcon className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getActionColor = (action: string) => {
    switch(action) {
      case 'add': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'remove': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'update': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'view': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getActionLabel = (action: string) => {
    switch(action) {
      case 'add': return 'Added';
      case 'remove': return 'Removed';
      case 'update': return 'Updated';
      case 'view': return 'Viewed';
      default: return 'Action';
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex items-center mb-6">
        <HistoryIcon className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-bold">Link History</h1>
      </div>
      
      <p className="text-muted-foreground mb-6">
        View a chronological record of all link activities including additions, removals, and updates.
      </p>
      
      <div className="space-y-4">
        {historyData.length > 0 ? (
          historyData.map((entry) => (
            <Card key={entry.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="py-4 px-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className="bg-card p-2 rounded-full border">
                      <WebsiteIcon url={entry.url} size="sm" />
                    </div>
                    
                    <div>
                      <CardTitle className="text-lg">
                        {entry.title}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}</span>
                      </CardDescription>
                    </div>
                  </div>
                  
                  <Badge className={getActionColor(entry.action)} variant="outline">
                    <span className="flex items-center">
                      {getActionIcon(entry.action)}
                      <span className="ml-1">{getActionLabel(entry.action)}</span>
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="py-2 px-6 pb-4">
                <p className="text-sm text-muted-foreground">{entry.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline">{entry.category}</Badge>
                  <Badge variant="secondary" className="overflow-hidden text-ellipsis max-w-[200px]">
                    {entry.url}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <HistoryIcon className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
            <h3 className="text-xl font-medium mb-2">No History Available</h3>
            <p className="text-muted-foreground max-w-md">
              The history will populate as you interact with links in the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}