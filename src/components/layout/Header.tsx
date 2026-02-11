import { Search, Plus, Printer, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  showActions?: boolean;
}

export function Header({ showActions = true }: HeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search Transactions"
          className="border-0 shadow-none focus-visible:ring-0 bg-transparent"
        />
      </div>

      {showActions && (
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary">
            <Plus className="w-4 h-4 mr-1" />
            Add Sale
          </Button>
          <Button variant="outline" className="text-secondary border-secondary hover:bg-secondary">
            <Plus className="w-4 h-4 mr-1" />
            Add Purchase
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Printer className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      )}
    </header>
  );
}
