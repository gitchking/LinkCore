import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings, Shield, Moon, Wrench } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "./ThemeToggle";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  showNSFW: boolean;
  setShowNSFW: (show: boolean) => void;
  isDevMode?: boolean;
  toggleDevMode?: () => void;
  openPostManagement?: () => void;
}

export function SettingsDialog({ 
  isOpen, 
  onClose, 
  showNSFW, 
  setShowNSFW, 
  isDevMode = false, 
  toggleDevMode, 
  openPostManagement 
}: SettingsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="text-primary mr-2 h-5 w-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Customize your LinkHub experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 space-y-6">
          {/* Theme Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center text-foreground">
              <Moon className="mr-2 h-5 w-5 text-muted-foreground" />
              Theme
            </h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Appearance</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark mode
                </p>
              </div>
              <ThemeToggle showLabel={true} />
            </div>
          </div>
          
          {/* Content Filter Settings */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium flex items-center text-foreground">
              <Shield className="mr-2 h-5 w-5 text-muted-foreground" />
              Content Filters
            </h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Show NSFW Content</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle to show or hide mature content
                </p>
              </div>
              <Switch 
                checked={showNSFW}
                onCheckedChange={setShowNSFW}
              />
            </div>
          </div>
          
          {/* Developer Mode Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium flex items-center text-foreground">
              <Wrench className="mr-2 h-5 w-5 text-muted-foreground" />
              Developer Options
            </h3>
            
            {toggleDevMode && (
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Developer Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable admin controls for content management
                  </p>
                </div>
                <Switch 
                  checked={isDevMode}
                  onCheckedChange={() => toggleDevMode()}
                />
              </div>
            )}
            
            {isDevMode && openPostManagement && (
              <div className="mt-4">
                <Button 
                  onClick={() => {
                    openPostManagement();
                    onClose();
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <Wrench className="mr-2 h-4 w-4" />
                  Manage Posts
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}