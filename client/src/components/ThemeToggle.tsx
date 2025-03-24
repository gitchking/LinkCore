import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-context";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`${className}`}
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-4 w-4" />
                {showLabel && <span className="ml-2">Dark Mode</span>}
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                {showLabel && <span className="ml-2">Light Mode</span>}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}