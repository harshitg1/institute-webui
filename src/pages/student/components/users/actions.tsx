import { Edit3, Zap, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableActionsProps {
  onEdit: (id: string) => void;
  onQuickAction: (id: string) => void;
  onBlock: (id: string) => void;
  studentId: string;
}

export const TableActions = ({ studentId, onEdit, onQuickAction, onBlock }: TableActionsProps) => (
  <div className="flex justify-end gap-2">
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => onEdit(studentId)}
      className="h-9 w-9 rounded-xl bg-lavender-light/30 text-lavender-deep hover:bg-lavender-deep hover:text-white transition-all"
    >
      <Edit3 className="h-4 w-4" />
    </Button>
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => onQuickAction(studentId)}
      className="h-9 w-9 rounded-xl bg-lavender-light/30 text-lavender-deep hover:bg-vibrant-teal hover:text-white transition-all"
    >
      <Zap className="h-4 w-4" />
    </Button>
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => onBlock(studentId)}
      className="h-9 w-9 rounded-xl bg-lavender-light/30 text-lavender-deep hover:bg-pink-500 hover:text-white transition-all"
    >
      <ShieldAlert className="h-4 w-4" />
    </Button>
  </div>
);