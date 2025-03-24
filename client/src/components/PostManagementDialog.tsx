import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Eye, EyeOff, Mail, CheckCircle2, XCircle } from "lucide-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CATEGORIES } from "@/lib/icons";
import { format } from "date-fns";

interface Link {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  nsfw: boolean;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface PostManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  links: Link[];
}

export function PostManagementDialog({ isOpen, onClose, links }: PostManagementDialogProps) {
  // Query client for mutations
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // State for the selected link and edit mode
  const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    description: "",
    category: "",
    tags: "",
    featured: false,
    nsfw: false
  });
  
  // Get the selected link
  const selectedLink = links.find(link => link.id === selectedLinkId);
  
  // Handle link selection
  const handleSelectLink = (id: number) => {
    const link = links.find(link => link.id === id);
    if (link) {
      setSelectedLinkId(id);
      setFormData({
        url: link.url,
        title: link.title,
        description: link.description,
        category: link.category,
        tags: link.tags.join(", "),
        featured: link.featured,
        nsfw: link.nsfw
      });
      setIsEditing(false);
      setConfirmDelete(false);
    }
  };
  
  // Reset form
  const resetForm = () => {
    setSelectedLinkId(null);
    setIsEditing(false);
    setConfirmDelete(false);
    setFormData({
      url: "",
      title: "",
      description: "",
      category: "",
      tags: "",
      featured: false,
      nsfw: false
    });
  };
  
  // Update link mutation
  const updateLinkMutation = useMutation({
    mutationFn: async (updatedLink: any) => {
      return apiRequest("PATCH", `/api/links/${updatedLink.id}`, updatedLink);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/links'] });
      toast({
        title: "Link updated",
        description: "The link has been successfully updated.",
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update the link.",
        variant: "destructive",
      });
    }
  });
  
  // Delete link mutation
  const deleteLinkMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/links/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/links'] });
      toast({
        title: "Link deleted",
        description: "The link has been successfully deleted.",
      });
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete the link.",
        variant: "destructive",
      });
    }
  });
  
  // Toggle featured mutation
  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, featured }: { id: number, featured: boolean }) => {
      return apiRequest("PATCH", `/api/links/${id}/featured`, { featured });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/links'] });
      toast({
        title: "Link updated",
        description: "The link's featured status has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update the link's featured status.",
        variant: "destructive",
      });
    }
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLink) return;
    
    const updatedLink = {
      id: selectedLink.id,
      url: formData.url,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
      featured: formData.featured,
      nsfw: formData.nsfw
    };
    
    updateLinkMutation.mutate(updatedLink);
  };
  
  // Handle delete
  const handleDelete = () => {
    if (selectedLinkId) {
      deleteLinkMutation.mutate(selectedLinkId);
    }
  };
  
  // Handle toggling featured status
  const handleToggleFeatured = () => {
    if (selectedLinkId && selectedLink) {
      toggleFeaturedMutation.mutate({ 
        id: selectedLinkId, 
        featured: !selectedLink.featured 
      });
    }
  };
  
  // Fetch contact messages
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState(false);
  
  // Contact message query
  const {
    data: contactMessages = [],
    isLoading: isLoadingMessages,
    isError: isErrorMessages,
  } = useQuery<ContactMessage[]>({
    queryKey: ['/api/contact'],
    refetchOnWindowFocus: false,
  });
  
  // Get selected message
  const selectedMessage = contactMessages.find(msg => msg.id === selectedContactId);
  
  // Mark message as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("PATCH", `/api/contact/${id}/read`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      toast({
        title: "Message updated",
        description: "The message has been marked as read.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to mark message as read.",
        variant: "destructive",
      });
    }
  });
  
  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/contact/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      toast({
        title: "Message deleted",
        description: "The message has been successfully deleted.",
      });
      setSelectedContactId(null);
      setConfirmDeleteMessage(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the message.",
        variant: "destructive",
      });
    }
  });
  
  // Handle mark as read
  const handleMarkAsRead = () => {
    if (selectedContactId) {
      markAsReadMutation.mutate(selectedContactId);
    }
  };
  
  // Handle delete message
  const handleDeleteMessage = () => {
    if (selectedContactId) {
      deleteMessageMutation.mutate(selectedContactId);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Management Dashboard</DialogTitle>
          <DialogDescription>
            Manage your content in Animatrix - links, contact messages, and more.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="links" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="messages">
              Contact Messages 
              {contactMessages.filter(msg => !msg.read).length > 0 && (
                <span className="ml-1.5 rounded-full bg-primary text-primary-foreground text-xs px-2 py-0.5">
                  {contactMessages.filter(msg => !msg.read).length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="links" className="pt-4">
            <div className="grid gap-4">
              {/* Link selection */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="linkSelect">Select a link to manage</Label>
                <Select 
                  value={selectedLinkId?.toString() || ""} 
                  onValueChange={(value) => handleSelectLink(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a link" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {links.map((link) => (
                        <SelectItem key={link.id} value={link.id.toString()}>
                          {link.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
          
          {selectedLink && (
            <>
              {!isEditing ? (
                /* View mode */
                <div className="space-y-4 border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedLink.title}</h3>
                      <a href={selectedLink.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                        {selectedLink.url}
                      </a>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button 
                        variant={selectedLink.featured ? "default" : "outline"} 
                        size="sm" 
                        onClick={handleToggleFeatured}
                      >
                        {selectedLink.featured ? (
                          <>
                            <Eye className="h-4 w-4 mr-1" /> Featured
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4 mr-1" /> Not Featured
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => setConfirmDelete(true)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description:</p>
                    <p className="text-sm">{selectedLink.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Category:</p>
                      <p className="text-sm font-medium">
                        {CATEGORIES[selectedLink.category]?.name || selectedLink.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">NSFW:</p>
                      <p className="text-sm">{selectedLink.nsfw ? "Yes" : "No"}</p>
                    </div>
                  </div>
                  
                  {selectedLink.tags && selectedLink.tags.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedLink.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Confirmation for delete */}
                  {confirmDelete && (
                    <div className="mt-4 p-4 border border-destructive rounded-md bg-destructive/10">
                      <p className="text-sm font-medium text-destructive mb-2">
                        Are you sure you want to delete this link?
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleDelete}
                        >
                          Yes, Delete
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setConfirmDelete(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Edit mode */
                <form onSubmit={handleSubmit} className="space-y-4 border rounded-md p-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      type="url"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(CATEGORIES).filter(cat => cat !== 'featured').map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {CATEGORIES[cat].name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="anime, manga, free, etc."
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("featured", checked === true)
                        }
                      />
                      <Label htmlFor="featured">Featured</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="nsfw"
                        checked={formData.nsfw}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("nsfw", checked === true)
                        }
                      />
                      <Label htmlFor="nsfw">NSFW</Label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              )}
            </>
          )}
            </div>
          </TabsContent>
          
          <TabsContent value="messages" className="pt-4">
            <div className="grid gap-4">
              {isLoadingMessages ? (
                <div className="flex justify-center items-center py-8">
                  <p className="text-muted-foreground">Loading messages...</p>
                </div>
              ) : isErrorMessages ? (
                <div className="flex justify-center items-center py-8">
                  <p className="text-destructive">Error loading messages</p>
                </div>
              ) : contactMessages.length === 0 ? (
                <div className="flex flex-col justify-center items-center py-12 border rounded-md p-4 text-center">
                  <Mail className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No messages yet</h3>
                  <p className="text-muted-foreground">
                    When users send messages through the contact form, they'll appear here.
                  </p>
                </div>
              ) : (
                <>
                  {/* Message selection */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="messageSelect">Select a message to view</Label>
                    <Select 
                      value={selectedContactId?.toString() || ""} 
                      onValueChange={(value) => setSelectedContactId(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a message" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {contactMessages.map((msg) => (
                            <SelectItem key={msg.id} value={msg.id.toString()}>
                              <div className="flex items-center">
                                {!msg.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                                )}
                                {msg.name} - {msg.createdAt ? format(new Date(msg.createdAt), 'MMM d, yyyy') : 'No date'}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedMessage && (
                    <div className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {selectedMessage.name}
                            {!selectedMessage.read && (
                              <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                New
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedMessage.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {selectedMessage.createdAt ? format(new Date(selectedMessage.createdAt), 'MMMM d, yyyy - h:mm a') : 'No date'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {!selectedMessage.read && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={handleMarkAsRead}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Mark as Read
                            </Button>
                          )}
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => setConfirmDeleteMessage(true)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                      
                      {/* Confirmation for delete */}
                      {confirmDeleteMessage && (
                        <div className="mt-4 p-4 border border-destructive rounded-md bg-destructive/10">
                          <p className="text-sm font-medium text-destructive mb-2">
                            Are you sure you want to delete this message?
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={handleDeleteMessage}
                            >
                              Yes, Delete
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setConfirmDeleteMessage(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}