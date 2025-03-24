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
          ? "bg-red-100 text-red-800 hover:bg-red-100 border border-red-300" 
          : "bg-green-100 text-green-800 hover:bg-green-100 border border-green-300",
        className
      )}
    >
      {isNSFW ? "NSFW" : "SFW"}
    </Badge>
  );
}