import { useState } from 'react';
import { Globe } from 'lucide-react';

interface WebsiteIconProps {
  url: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function WebsiteIcon({ url, size = 'md', className = '' }: WebsiteIconProps) {
  const [error, setError] = useState(false);
  
  // Extract domain from URL
  let domain = '';
  try {
    domain = new URL(url).hostname;
  } catch (e) {
    domain = url;
  }
  
  // Generate favicon URL
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  
  // Determine size class
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };
  
  const sizeClass = sizeClasses[size];
  
  return (
    <div className={`relative overflow-hidden rounded-full flex items-center justify-center bg-muted border border-border ${sizeClass} ${className}`}>
      {error ? (
        <Globe className="h-1/2 w-1/2 text-muted-foreground" />
      ) : (
        <img 
          src={faviconUrl}
          alt={`${domain} icon`}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}