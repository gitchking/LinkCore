import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    linkURL: ""
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this to your backend
    // For now, we'll just show a success toast
    toast({
      title: "Message Sent",
      description: "Thanks for reaching out! We'll review your submission and get back to you soon.",
      variant: "default",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
      linkURL: ""
    });
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4">
      <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-md p-6 border">
        <div className="flex items-center justify-center mb-6">
          <Mail className="h-10 w-10 text-primary" />
          <h1 className="text-2xl font-bold ml-2">Contact Us</h1>
        </div>
        
        <p className="text-muted-foreground mb-6 text-center">
          Have a link you'd like to add to our directory? Send us the details below and we'll review your submission.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkURL">Link URL (Optional)</Label>
            <Input
              id="linkURL"
              name="linkURL"
              type="url"
              value={formData.linkURL}
              onChange={handleChange}
              placeholder="https://example.com"
            />
            <p className="text-xs text-muted-foreground">
              If you have a specific link you'd like to submit, paste the URL here
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Include any details about your link submission or request"
              rows={4}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}