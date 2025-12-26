import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, XCircle, Archive } from 'lucide-react';
import { Document } from '../types';

interface BulkActionToolbarProps {
    selectedDocuments: string[];
    filteredDocuments: Document[];
    handleSelectAll: () => void;
    handleBulkAction: (action: string) => void;
}

export const BulkActionToolbar: React.FC<BulkActionToolbarProps> = ({
    selectedDocuments,
    filteredDocuments,
    handleSelectAll,
    handleBulkAction,
}) => {
    if (selectedDocuments.length === 0) {
        return null;
    }

    return (
        <Card className="border-[#2563EB] bg-blue-50/50">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={selectedDocuments.length === filteredDocuments.length}
                            onCheckedChange={handleSelectAll}
                        />
                        <span className="text-sm">
                            {selectedDocuments.length} document{selectedDocuments.length > 1 ? 's' : ''} selected
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBulkAction('publish')}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Publish
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBulkAction('unpublish')}
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Unpublish
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBulkAction('archive')}
                        >
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
