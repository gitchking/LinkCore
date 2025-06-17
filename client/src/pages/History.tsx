import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History as HistoryIcon, LogIn, LogOut, ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface HistoryEntry {
  id: number;
  action: 'login' | 'logout';
  timestamp: string;
}

export default function History() {
  const [, setLocation] = useLocation();
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);

  // Simulated history data - in a real app, this would come from an API
  useEffect(() => {
    // Example data - replace with actual API call
    const mockData: HistoryEntry[] = [
      {
        id: 1,
        action: 'login',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      },
      {
        id: 2,
        action: 'logout',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
      {
        id: 3,
        action: 'login',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },
    ];
    setHistoryData(mockData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => setLocation('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <HistoryIcon className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-bold">Login History</h1>
      </div>

      <div className="space-y-4">
        {historyData.map((entry) => (
          <Card key={entry.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {entry.action === 'login' ? 'Login' : 'Logout'}
              </CardTitle>
              <Badge variant={entry.action === 'login' ? 'default' : 'secondary'}>
                {entry.action === 'login' ? (
                  <LogIn className="h-4 w-4 mr-1" />
                ) : (
                  <LogOut className="h-4 w-4 mr-1" />
                )}
                {entry.action}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}