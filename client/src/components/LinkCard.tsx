import { Link } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LinkCardProps {
  link: Link;
}

export function LinkCard({ link }: LinkCardProps) {
  // Extract domain for favicon
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  };

  const domain = getDomain(link.url);
  const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 shrink-0">
            <img 
              src={faviconUrl} 
              alt={`${link.title} favicon`}
              className="w-6 h-6 object-contain"
              onError={(e) => {
                // Fallback to a generic globe icon if favicon fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <Globe className="w-6 h-6 text-muted-foreground hidden" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="flex items-center justify-between">
              <span className="line-clamp-1">{link.title}</span>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors ml-2"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardTitle>
            {link.nsfw && (
              <Badge variant="destructive" className="mt-1">NSFW</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2">{link.description}</CardDescription>
        <div className="mt-2 flex flex-wrap gap-1">
          {link.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 