import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/icons";

interface EmptyStateProps {
  category: string;
  openNewLinkModal: (category: string) => void;
}

export function EmptyState({ category, openNewLinkModal }: EmptyStateProps) {
  const categoryInfo = CATEGORIES[category];
  const isFeatured = category === 'featured';

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 bg-card rounded-lg border border-dashed border-border">
      <div className={`w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-${categoryInfo.color}-50 text-${categoryInfo.color}-500`}>
        {categoryInfo.icon}
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        {isFeatured ? "No featured links yet" : `No ${categoryInfo.name.toLowerCase()} links yet`}
      </h3>
      <p className="text-muted-foreground text-center max-w-sm mb-4">
        {isFeatured 
          ? "Be the first to share something interesting with the community!" 
          : `Share your favorite ${categoryInfo.name.toLowerCase()} resources with the community!`}
      </p>
      <Button 
        onClick={() => openNewLinkModal(category)}
        className={isFeatured ? "" : `bg-${categoryInfo.color}-500 hover:bg-${categoryInfo.color}-600`}
      >
        <i className="fas fa-plus-circle mr-1"></i> 
        {isFeatured ? "Add Your First Link" : `Add ${categoryInfo.name} Link`}
      </Button>
    </div>
  );
}
