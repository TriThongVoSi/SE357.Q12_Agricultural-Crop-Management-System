import { Check, Users, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface BulkActionToolbarProps {
  selectedCount: number;
  onComplete: () => void;
  onReassign: () => void;
  onChangeDueDate: () => void;
  onClose: () => void;
}

export function BulkActionToolbar({
  selectedCount,
  onComplete,
  onReassign,
  onChangeDueDate,
  onClose,
}: BulkActionToolbarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white border border-[#E0E0E0] rounded-xl shadow-lg px-6 py-4 acm-card-shadow">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[#777777]">
          <span className="numeric text-[#333333]">{selectedCount}</span> selected
        </span>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="outline"
          size="sm"
          onClick={onComplete}
          className="acm-rounded-sm border-[#3BA55D] text-[#3BA55D] hover:bg-[#3BA55D]/10"
        >
          <Check className="w-4 h-4 mr-2" />
          Complete
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onReassign}
          className="acm-rounded-sm border-[#E0E0E0]"
        >
          <Users className="w-4 h-4 mr-2" />
          Reassign
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onChangeDueDate}
          className="acm-rounded-sm border-[#E0E0E0]"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Change Due Date
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="ghost" size="sm" onClick={onClose} className="acm-rounded-sm">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

