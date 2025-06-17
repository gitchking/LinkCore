import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, X, Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { CATEGORIES } from "@/lib/icons";

// Define form data interface with alternative domains
interface LinkFormData {
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string;
  nsfw: boolean;
  altDomains: string;
}

interface NewLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export function NewLinkModal({ isOpen, onClose, initialCategory = "" }: NewLinkModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<LinkFormData>({
    url: "",
    title: "",
    description: "",
    category: initialCategory,
    tags: "",
    nsfw: false,
    altDomains: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Password protection
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Reset form when modal opens or initialCategory changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        url: "",
        title: "",
        description: "",
        category: initialCategory,
        tags: "",
        nsfw: false,
        altDomains: ""
      });
      setErrors({});
      // Reset password state
      setShowPasswordPrompt(true);
      setPassword('');
      setPasswordError('');
    }
  }, [isOpen, initialCategory]);
  
  // Handle password verification
  const verifyPassword = () => {
    if (password === 'Proxima.Dev') {
      setShowPasswordPrompt(false);
      setPasswordError('');
    } else {
      setPasswordError('Invalid password. Please try again.');
    }
  };

  const createLinkMutation = useMutation({
    mutationFn: (data: typeof formData) => {
      // Convert tags string to array
      const tagsArray = data.tags
        ? data.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
        : [];
      
      // Process alternative domains and add them as special tags
      if (data.altDomains) {
        const altDomainsArray = data.altDomains
          .split(",")
          .map((domain: string) => domain.trim())
          .filter((domain: string) => domain !== "")
          .map((domain: string) => `domain:${domain}`);
          
        // Add the domain tags to the tags array
        tagsArray.push(...altDomainsArray);
      }
      
      return apiRequest("POST", "/api/links", {
        ...data,
        tags: tagsArray
      });
    },
    onSuccess: () => {
      // Invalidate queries to refresh the link lists
      queryClient.invalidateQueries({ queryKey: ["/api/links"] });
      onClose();
      toast({
        title: "Success!",
        description: "Your link has been added successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add link. Please try again.",
        variant: "destructive",
      });
    }
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.url) {
      newErrors.url = "URL is required";
    } else {
      try {
        // Use URL constructor for validation - more flexible and correct
        new URL(formData.url);
      } catch (e) {
        newErrors.url = "Please enter a valid URL";
      }
    }
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      createLinkMutation.mutate(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear the error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
    
    // Clear the category error if it exists
    if (errors.category) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.category;
        return newErrors;
      });
    }
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, nsfw: checked }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <PlusCircle className="text-primary mr-2 h-5 w-5" />
            Add New Link
          </DialogTitle>
          <DialogDescription>
            Add a new link to share with the community
          </DialogDescription>
        </DialogHeader>
        
        {showPasswordPrompt ? (
          <div className="py-4 space-y-4">
            <div className="flex items-center space-x-2 text-amber-600">
              <Lock className="h-5 w-5" />
              <h3 className="font-medium">Authentication Required</h3>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Please enter the administrator password to add a new link.
            </p>
            
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <span className="font-medium">Tip:</span> If you want to add your link, navigate to the <span className="inline-flex items-center text-primary font-medium"><Mail className="h-3 w-3 mr-1" /> Contact</span> option in the menu bar to request access.
              </p>
            </div>
            
            <div className="space-y-2 mt-3">
              <div className="flex space-x-2">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? "border-red-500" : ""}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      verifyPassword();
                    }
                  }}
                />
                <Button onClick={verifyPassword}>Submit</Button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-500">{passwordError}</p>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {/* URL Field */}
            <div className="space-y-1">
              <Label htmlFor="linkUrl">
                URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="linkUrl"
                name="url"
                type="text"
                placeholder="https://example.com"
                value={formData.url}
                onChange={handleChange}
                className={errors.url ? "border-red-500" : ""}
              />
              {errors.url && (
                <p className="text-xs text-red-500">{errors.url}</p>
              )}
            </div>
            
            {/* Title Field */}
            <div className="space-y-1">
              <Label htmlFor="linkTitle">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="linkTitle"
                name="title"
                type="text"
                placeholder="Enter a descriptive title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title}</p>
              )}
            </div>
            
            {/* Description Field */}
            <div className="space-y-1">
              <Label htmlFor="linkDescription">
                Description
              </Label>
              <Textarea
                id="linkDescription"
                name="description"
                placeholder="Brief description of this link (optional)"
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            {/* Category Field */}
            <div className="space-y-1">
              <Label htmlFor="linkCategory">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger 
                  id="linkCategory"
                  className={errors.category ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORIES).map(([id, { name }]) => (
                    id !== 'featured' && (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    )
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-red-500">{errors.category}</p>
              )}
            </div>
            
            {/* Alternative Domains */}
            <div className="space-y-1">
              <Label htmlFor="altDomains">
                Alternative Domains
              </Label>
              <Input
                id="altDomains"
                name="altDomains"
                type="text"
                placeholder="example.net, example.org (no http://, separated by commas)"
                value={formData.altDomains || ""}
                onChange={(e) => {
                  // Store in form data but will be processed during submission
                  setFormData(prev => ({ ...prev, altDomains: e.target.value }));
                }}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Add alternative domains if this website is accessible through multiple URLs
              </p>
            </div>
            
            {/* Tags Field */}
            <div className="space-y-1">
              <Label htmlFor="linkTags">
                Tags
              </Label>
              <Input
                id="linkTags"
                name="tags"
                type="text"
                placeholder="Comma-separated tags (e.g., official, free, resource)"
                value={formData.tags}
                onChange={handleChange}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Add relevant tags to make your link easier to find
              </p>
            </div>
            
            {/* NSFW Toggle */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Content Rating</Label>
                  <p className="text-xs text-muted-foreground">Indicate whether this link contains mature content</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-1 ${!formData.nsfw ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                    <span>SFW</span>
                  </div>
                  <Switch 
                    checked={formData.nsfw}
                    onCheckedChange={handleSwitchChange}
                  />
                  <div className={`flex items-center space-x-1 ${formData.nsfw ? 'text-red-600 font-semibold' : 'text-muted-foreground'}`}>
                    <span>NSFW</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
        
        <DialogFooter className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          {!showPasswordPrompt && (
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={createLinkMutation.isPending}
            >
              {createLinkMutation.isPending ? "Submitting..." : "Submit Link"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
