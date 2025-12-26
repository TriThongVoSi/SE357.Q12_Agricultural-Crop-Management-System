import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, Download, RotateCcw } from 'lucide-react';
import { Document, DocumentVersion } from '../types';

interface VersionHistoryModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    documentVersions: DocumentVersion[];
    selectedDocument: Document | null;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
    open,
    setOpen,
    documentVersions,
    selectedDocument,
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <History className="w-5 h-5" />
                        Complete Version History
                    </DialogTitle>
                    <DialogDescription>
                        All versions of this document with restore capability
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-4 max-h-[500px] overflow-y-auto">
                    {documentVersions.map((version) => (
                        <div
                            key={version.id}
                            className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                <History className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div>
                                        <span className="font-medium font-mono">{version.version}</span>
                                        {version.version === selectedDocument?.version && (
                                            <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-700">
                                                Current
                                            </Badge>
                                        )}
                                    </div>
                                    <span className="text-sm text-muted-foreground shrink-0">
                                        {version.uploadedAt}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{version.changes}</p>
                                <p className="text-xs text-muted-foreground">Uploaded by: {version.uploadedBy}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <Button variant="outline" size="sm">
                                    <Download className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
