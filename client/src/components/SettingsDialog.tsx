import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  showNSFW: boolean;
  setShowNSFW: (show: boolean) => void;
}

export function SettingsDialog({ isOpen, onClose, showNSFW, setShowNSFW }: SettingsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="text-primary mr-2 h-5 w-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Customize your Animatrix experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Shield className="mr-2 h-5 w-5 text-neutral-600" />
              Content Filters
            </h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Show NSFW Content</Label>
                <p className="text-sm text-neutral-500">
                  Toggle to show or hide mature content
                </p>
              </div>
              <Switch 
                checked={showNSFW}
                onCheckedChange={setShowNSFW}
              />
            </div>
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