import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    MoreVertical,
    Edit,
    Trash2,
    Calendar,
    ChevronDown,
    Eye,
    Send,
    XCircle,
    Archive,
} from 'lucide-react';
import { Document, DocumentStatus, DocumentTopic, DocumentVisibility } from '../types';
import { TOPIC_LABELS } from '../constants';

interface DocumentTableProps {
    documents: Document[];
    selectedDocuments: string[];
    handleSelectDocument: (id: string) => void;
    handleSelectAll: () => void;
    handleSort: (column: keyof Document) => void;
    sortColumn: keyof Document;
    sortDirection: 'asc' | 'desc';
    handlePreview: (doc: Document) => void;
    handleEdit: (doc: Document) => void;
    handleStatusChange: (id: string, newStatus: DocumentStatus) => void;
    handleDelete: (id: string) => void;
    getStatusBadge: (status: DocumentStatus) => string;
    getVisibilityIcon: (visibility: DocumentVisibility) => JSX.Element;
    getFileTypeIcon: (fileType: string) => JSX.Element;
    allDocumentsCount: number;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({
    documents,
    selectedDocuments,
    handleSelectDocument,
    handleSelectAll,
    handleSort,
    sortColumn,
    sortDirection,
    handlePreview,
    handleEdit,
    handleStatusChange,
    handleDelete,
    getStatusBadge,
    getVisibilityIcon,
    getFileTypeIcon,
    allDocumentsCount,
}) => {
    return (
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={selectedDocuments.length === allDocumentsCount && allDocumentsCount > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => handleSort('title')}
                                >
                                    <div className="flex items-center gap-2">
                                        Title
                                        <ChevronDown className={`w-4 h-4 transition-transform ${sortColumn === 'title' && sortDirection === 'asc' ? 'rotate-180' : ''
                                            }`} />
                                    </div>
                                </TableHead>
                                <TableHead>Topic / Category</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead>Version</TableHead>
                                <TableHead
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => handleSort('status')}
                                >
                                    <div className="flex items-center gap-2">
                                        Status
                                        <ChevronDown className={`w-4 h-4 transition-transform ${sortColumn === 'status' && sortDirection === 'asc' ? 'rotate-180' : ''
                                            }`} />
                                    </div>
                                </TableHead>
                                <TableHead>Uploaded By</TableHead>
                                <TableHead
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => handleSort('updatedAt')}
                                >
                                    <div className="flex items-center gap-2">
                                        Date Updated
                                        <ChevronDown className={`w-4 h-4 transition-transform ${sortColumn === 'updatedAt' && sortDirection === 'asc' ? 'rotate-180' : ''
                                            }`} />
                                    </div>
                                </TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedDocuments.includes(doc.id)}
                                            onCheckedChange={() => handleSelectDocument(doc.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                                {getFileTypeIcon(doc.fileType)}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-medium text-sm truncate">{doc.title}</div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                    {getVisibilityIcon(doc.visibility)}
                                                    <span className="capitalize">{doc.visibility}</span>
                                                    {doc.fileSize && <span>• {doc.fileSize}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-xs">
                                            {TOPIC_LABELS[doc.topic]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {doc.tags.slice(0, 2).map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {doc.tags.length > 2 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{doc.tags.length - 2}
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm font-mono text-muted-foreground">{doc.version}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={getStatusBadge(doc.status)}>
                                            {doc.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-7 h-7">
                                                <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                                    {doc.uploadedBy.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{doc.uploadedBy}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            {doc.updatedAt}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handlePreview(doc)}>
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Preview
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleEdit(doc)}>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {doc.status !== 'published' && (
                                                    <DropdownMenuItem onClick={() => handleStatusChange(doc.id, 'published')}>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Publish
                                                    </DropdownMenuItem>
                                                )}
                                                {doc.status === 'published' && (
                                                    <DropdownMenuItem onClick={() => handleStatusChange(doc.id, 'unpublished')}>
                                                        <XCircle className="w-4 h-4 mr-2" />
                                                        Unpublish
                                                    </DropdownMenuItem>
                                                )}
                                                {doc.status !== 'archived' && (
                                                    <DropdownMenuItem onClick={() => handleStatusChange(doc.id, 'archived')}>
                                                        <Archive className="w-4 h-4 mr-2" />
                                                        Archive
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => handleDelete(doc.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};
