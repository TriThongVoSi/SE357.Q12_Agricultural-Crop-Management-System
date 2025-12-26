import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    FileText,
    Download,
    Edit,
    Send,
    Archive,
    Trash2,
    History,
    RotateCcw,
} from 'lucide-react';
import { Document, DocumentVersion, DocumentStatus, DocumentTopic, DocumentVisibility } from '../types';

interface PreviewDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedDocument: Document | null;
    previewTab: string;
    setPreviewTab: (tab: string) => void;
    documentVersions: DocumentVersion[];
    handleEdit: (doc: Document) => void;
    handleStatusChange: (id: string, newStatus: DocumentStatus) => void;
    handleDelete: (id: string) => void;
    getStatusBadge: (status: DocumentStatus) => string;
    getFileTypeIcon: (fileType: string) => JSX.Element;
    topicLabels: Record<DocumentTopic, string>;
    setVersionHistoryOpen: (open: boolean) => void;
}

export const PreviewDrawer: React.FC<PreviewDrawerProps> = ({
    open,
    setOpen,
    selectedDocument,
    previewTab,
    setPreviewTab,
    documentVersions,
    handleEdit,
    handleStatusChange,
    handleDelete,
    getStatusBadge,
    getFileTypeIcon,
    topicLabels,
    setVersionHistoryOpen,
}) => {
    if (!selectedDocument) return null;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="w-full sm:w-[800px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Document Preview
                    </SheetTitle>
                    <SheetDescription>
                        View and manage document details
                    </SheetDescription>
                </SheetHeader>

                <Tabs value={previewTab} onValueChange={setPreviewTab} className="mt-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="versions">Version History</TabsTrigger>
                        <TabsTrigger value="access">Access Control</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-6 mt-6">
                        {/* File Preview Area */}
                        <div className="border rounded-lg bg-muted/30 p-8 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-card flex items-center justify-center">
                                {getFileTypeIcon(selectedDocument.fileType)}
                            </div>
                            <h3 className="mb-2">{selectedDocument.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {selectedDocument.description || 'No description available'}
                            </p>
                            <Button variant="outline">
                                <Download className="w-4 h-4 mr-2" />
                                Download File
                            </Button>
                        </div>

                        {/* Metadata */}
                        <div className="space-y-4">
                            <div>
                                <Label className="text-xs text-muted-foreground">Topic / Category</Label>
                                <p className="text-sm mt-1">{topicLabels[selectedDocument.topic]}</p>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Tags</Label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {selectedDocument.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs text-muted-foreground">Version</Label>
                                    <p className="text-sm mt-1 font-mono">{selectedDocument.version}</p>
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">Status</Label>
                                    <div className="mt-1">
                                        <Badge variant="secondary" className={getStatusBadge(selectedDocument.status)}>
                                            {selectedDocument.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs text-muted-foreground">Visibility</Label>
                                    <p className="text-sm mt-1 capitalize">{selectedDocument.visibility}</p>
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">File Size</Label>
                                    <p className="text-sm mt-1">{selectedDocument.fileSize || 'N/A'}</p>
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Uploaded By</Label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Avatar className="w-6 h-6">
                                        <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                            {selectedDocument.uploadedBy.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{selectedDocument.uploadedBy}</span>
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Last Updated</Label>
                                <p className="text-sm mt-1">{selectedDocument.updatedAt}</p>
                            </div>
                        </div>

                        <Separator />

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            {selectedDocument.status !== 'published' && (
                                <Button
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                                    onClick={() => handleStatusChange(selectedDocument.id, 'published')}
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Publish
                                </Button>
                            )}
                            {selectedDocument.status !== 'archived' && (
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => handleStatusChange(selectedDocument.id, 'archived')}
                                >
                                    <Archive className="w-4 h-4 mr-2" />
                                    Archive
                                </Button>
                            )}
                            <Button variant="outline" className="flex-1" onClick={() => handleEdit(selectedDocument)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 text-red-600 hover:text-red-700"
                                onClick={() => handleDelete(selectedDocument.id)}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="versions" className="space-y-4 mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4>Version History</h4>
                            <Button variant="outline" size="sm" onClick={() => setVersionHistoryOpen(true)}>
                                <History className="w-4 h-4 mr-2" />
                                View All
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {documentVersions.map((version) => (
                                <div
                                    key={version.id}
                                    className="flex gap-3 p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <History className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <span className="font-medium text-sm font-mono">{version.version}</span>
                                            <span className="text-xs text-muted-foreground shrink-0">
                                                {version.uploadedAt}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-1">{version.changes}</p>
                                        <p className="text-xs text-muted-foreground">By: {version.uploadedBy}</p>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <RotateCcw className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="access" className="space-y-6 mt-6">
                        <div>
                            <h4 className="mb-4">Access Control Settings</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                                    <div className="flex-1">
                                        <Label htmlFor="publicAccess" className="cursor-pointer">
                                            Public Access
                                        </Label>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Document visible to all users
                                        </p>
                                    </div>
                                    <Switch
                                        id="publicAccess"
                                        checked={selectedDocument.visibility === 'public'}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                                    <div className="flex-1">
                                        <Label htmlFor="farmerAccess" className="cursor-pointer">
                                            Farmer Access
                                        </Label>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Document visible to farmers only
                                        </p>
                                    </div>
                                    <Switch
                                        id="farmerAccess"
                                        checked={selectedDocument.visibility === 'farmer'}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                                    <div className="flex-1">
                                        <Label htmlFor="buyerAccess" className="cursor-pointer">
                                            Buyer Access
                                        </Label>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Document visible to buyers only
                                        </p>
                                    </div>
                                    <Switch
                                        id="buyerAccess"
                                        checked={selectedDocument.visibility === 'buyer'}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                                    <div className="flex-1">
                                        <Label htmlFor="internalAccess" className="cursor-pointer">
                                            Internal Only
                                        </Label>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Document visible to internal staff only
                                        </p>
                                    </div>
                                    <Switch
                                        id="internalAccess"
                                        checked={selectedDocument.visibility === 'internal'}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <Button className="w-full bg-[#2563EB] hover:bg-[#1E40AF]">
                            Save Access Settings
                        </Button>
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>
    );
};
