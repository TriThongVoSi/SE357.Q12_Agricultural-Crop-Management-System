import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { Document, DocumentFormData, DocumentTopic, DocumentVisibility } from '../types';

interface UploadModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    formData: DocumentFormData;
    setFormData: (data: DocumentFormData) => void;
    tagInput: string;
    setTagInput: (input: string) => void;
    handleAddTag: () => void;
    handleRemoveTag: (tag: string) => void;
    handleSave: () => void;
    selectedDocument: Document | null;
}

export const UploadModal: React.FC<UploadModalProps> = ({
    open,
    setOpen,
    formData,
    setFormData,
    tagInput,
    setTagInput,
    handleAddTag,
    handleRemoveTag,
    handleSave,
    selectedDocument,
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        {selectedDocument ? 'Edit Document' : 'Upload New Document'}
                    </DialogTitle>
                    <DialogDescription>
                        {selectedDocument ? 'Update document information and file' : 'Upload a new document to the knowledge base'}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            placeholder="Enter document title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter document description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="file">File Upload *</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-2">
                                {formData.file ? formData.file.name : 'Click to upload or drag and drop'}
                            </p>
                            <p className="text-xs text-muted-foreground mb-3">
                                PDF, DOC, or Image files (max 10MB)
                            </p>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                                className="hidden"
                                id="file-upload"
                            />
                            <label htmlFor="file-upload">
                                <Button variant="outline" asChild>
                                    <span>Browse Files</span>
                                </Button>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="topic">Topic / Category *</Label>
                            <Select value={formData.topic} onValueChange={(v: string) => setFormData({ ...formData, topic: v as DocumentTopic })}>
                                <SelectTrigger id="topic">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="farming_guide">Farming Guide</SelectItem>
                                    <SelectItem value="crop_diseases">Crop Diseases</SelectItem>
                                    <SelectItem value="pest_control">Pest Control</SelectItem>
                                    <SelectItem value="soil_management">Soil Management</SelectItem>
                                    <SelectItem value="irrigation">Irrigation</SelectItem>
                                    <SelectItem value="harvest_tips">Harvest Tips</SelectItem>
                                    <SelectItem value="market_prices">Market Prices</SelectItem>
                                    <SelectItem value="compliance">Compliance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="visibility">Visibility *</Label>
                            <Select value={formData.visibility} onValueChange={(v: string) => setFormData({ ...formData, visibility: v as DocumentVisibility })}>
                                <SelectTrigger id="visibility">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="farmer">Farmer Only</SelectItem>
                                    <SelectItem value="buyer">Buyer Only</SelectItem>
                                    <SelectItem value="internal">Internal Only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <div className="flex gap-2">
                            <Input
                                id="tags"
                                placeholder="Add tag and press Enter"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddTag();
                                    }
                                }}
                            />
                            <Button type="button" variant="outline" onClick={handleAddTag}>
                                Add
                            </Button>
                        </div>
                        {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="gap-1">
                                        {tag}
                                        <X
                                            className="w-3 h-3 cursor-pointer"
                                            onClick={() => handleRemoveTag(tag)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button className="bg-[#2563EB] hover:bg-[#1E40AF]" onClick={handleSave}>
                        {selectedDocument ? 'Update Document' : 'Upload Document'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
