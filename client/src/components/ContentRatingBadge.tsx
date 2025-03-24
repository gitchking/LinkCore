import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ContentRatingBadgeProps {
  isNSFW: boolean;
  className?: string;
}

export function ContentRatingBadge({ isNSFW, className }: ContentRatingBadgeProps) {
  return (
    <Badge 
      className={cn(
        isNSFW 
          ? "bg-red-100 text-red-800 hover:bg-red-100 border border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/50" 
          : "bg-green-100 text-green-800 hover:bg-green-100 border border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50",
        className
      )}
    >
      {isNSFW ? "NSFW" : "SFW"}
    </Badge>
  );
}