import { useState } from 'react';
import { toast } from 'sonner';
import { FileText, File as FileIcon, Image, Globe, Users, Shield } from 'lucide-react';
import {
    Document,
    DocumentStatus,
    DocumentTopic,
    DocumentVisibility,
    DocumentFormData,
    UseDocumentManagementReturn,
} from '../types';
import {
    MOCK_DOCUMENTS,
    MOCK_DOCUMENT_VERSIONS,
    STATUS_BADGE_COLORS,
} from '../constants';

export const useDocumentManagement = (): UseDocumentManagementReturn => {
    // State - UI Controls
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [previewDrawerOpen, setPreviewDrawerOpen] = useState(false);
    const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [previewTab, setPreviewTab] = useState('details');

    // State - Pagination & Sorting
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState<keyof Document>('updatedAt');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    // State - Filters
    const [topicFilter, setTopicFilter] = useState<DocumentTopic | 'all'>('all');
    const [statusFilter, setStatusFilter] = useState<DocumentStatus | 'all'>('all');
    const [visibilityFilter, setVisibilityFilter] = useState<DocumentVisibility | 'all'>('all');

    // State - Form Data
    const [formData, setFormData] = useState<DocumentFormData>({
        title: '',
        description: '',
        topic: 'farming_guide',
        tags: [],
        visibility: 'public',
        file: null,
    });
    const [tagInput, setTagInput] = useState('');

    // State - Documents Data
    const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);
    const documentVersions = MOCK_DOCUMENT_VERSIONS;

    // Computed - Calculate summary stats
    const stats = {
        total: documents.length,
        published: documents.filter(d => d.status === 'published').length,
        unpublished: documents.filter(d => d.status === 'unpublished').length,
        archived: documents.filter(d => d.status === 'archived').length,
    };

    // Handler - Sorting
    const handleSort = (column: keyof Document) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    // Handler - Selection
    const handleSelectAll = () => {
        if (selectedDocuments.length === filteredDocuments.length) {
            setSelectedDocuments([]);
        } else {
            setSelectedDocuments(filteredDocuments.map(d => d.id));
        }
    };

    const handleSelectDocument = (id: string) => {
        setSelectedDocuments(prev =>
            prev.includes(id) ? prev.filter(did => did !== id) : [...prev, id]
        );
    };

    // Handler - Preview
    const handlePreview = (doc: Document) => {
        setSelectedDocument(doc);
        setPreviewTab('details');
        setPreviewDrawerOpen(true);
    };

    // Handler - Edit
    const handleEdit = (doc: Document) => {
        setSelectedDocument(doc);
        setFormData({
            title: doc.title,
            description: doc.description || '',
            topic: doc.topic,
            tags: doc.tags,
            visibility: doc.visibility,
            file: null,
        });
        setUploadModalOpen(true);
    };

    // Handler - Upload New
    const handleUploadNew = () => {
        setSelectedDocument(null);
        setFormData({
            title: '',
            description: '',
            topic: 'farming_guide',
            tags: [],
            visibility: 'public',
            file: null,
        });
        setUploadModalOpen(true);
    };

    // Handler - Save (Create/Update)
    const handleSave = () => {
        if (selectedDocument) {
            // Update existing document
            setDocuments(prev => prev.map(d =>
                d.id === selectedDocument.id
                    ? { ...d, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
                    : d
            ));
            toast.success('Document updated', {
                description: `${formData.title} has been updated successfully.`,
            });
        } else {
            // Create new document
            const newDoc: Document = {
                id: String(documents.length + 1),
                ...formData,
                version: 'v1.0',
                status: 'unpublished',
                uploadedBy: 'Admin User',
                updatedAt: new Date().toISOString().split('T')[0],
                fileType: 'pdf',
                fileSize: '1.2 MB',
            };
            setDocuments(prev => [...prev, newDoc]);
            toast.success('Document uploaded', {
                description: `${formData.title} has been uploaded successfully.`,
            });
        }
        setUploadModalOpen(false);
    };

    // Handler - Delete
    const handleDelete = (id: string) => {
        const doc = documents.find(d => d.id === id);
        setDocuments(prev => prev.filter(d => d.id !== id));
        toast.success('Document deleted', {
            description: `${doc?.title} has been deleted.`,
        });
        if (previewDrawerOpen) {
            setPreviewDrawerOpen(false);
        }
    };

    // Handler - Status Change
    const handleStatusChange = (id: string, newStatus: DocumentStatus) => {
        const doc = documents.find(d => d.id === id);
        setDocuments(prev => prev.map(d =>
            d.id === id ? { ...d, status: newStatus } : d
        ));
        toast.success('Status updated', {
            description: `${doc?.title} has been ${newStatus}.`,
        });
    };

    // Handler - Bulk Actions
    const handleBulkAction = (action: string) => {
        if (selectedDocuments.length === 0) {
            toast.error('No documents selected', {
                description: 'Please select at least one document to perform bulk action.',
            });
            return;
        }

        switch (action) {
            case 'publish':
                setDocuments(prev => prev.map(d =>
                    selectedDocuments.includes(d.id) ? { ...d, status: 'published' as DocumentStatus } : d
                ));
                toast.success(`${selectedDocuments.length} documents published`);
                break;
            case 'unpublish':
                setDocuments(prev => prev.map(d =>
                    selectedDocuments.includes(d.id) ? { ...d, status: 'unpublished' as DocumentStatus } : d
                ));
                toast.success(`${selectedDocuments.length} documents unpublished`);
                break;
            case 'archive':
                setDocuments(prev => prev.map(d =>
                    selectedDocuments.includes(d.id) ? { ...d, status: 'archived' as DocumentStatus } : d
                ));
                toast.success(`${selectedDocuments.length} documents archived`);
                break;
        }
        setSelectedDocuments([]);
    };

    // Handler - Tag Management
    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
    };

    // Computed - Filter and sort documents
    const filteredDocuments = documents.filter(doc => {
        const matchesSearch =
            doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            doc.topic.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTopic = topicFilter === 'all' || doc.topic === topicFilter;
        const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
        const matchesVisibility = visibilityFilter === 'all' || doc.visibility === visibilityFilter;

        return matchesSearch && matchesTopic && matchesStatus && matchesVisibility;
    }).sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        // Handle undefined/null values
        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;
        if (aValue === bValue) return 0;

        const direction = sortDirection === 'asc' ? 1 : -1;
        return aValue > bValue ? direction : -direction;
    });

    // Computed - Pagination
    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
    const paginatedDocuments = filteredDocuments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Utility - Get status badge class
    const getStatusBadge = (status: DocumentStatus): string => {
        return STATUS_BADGE_COLORS[status];
    };

    // Utility - Get visibility icon
    const getVisibilityIcon = (visibility: DocumentVisibility): JSX.Element => {
        switch (visibility) {
            case 'public':
                return <Globe className="w-3 h-3" />;
            case 'farmer':
                return <Users className="w-3 h-3" />;
            case 'buyer':
                return <Users className="w-3 h-3" />;
            case 'internal':
                return <Shield className="w-3 h-3" />;
        }
    };

    // Utility - Get file type icon
    const getFileTypeIcon = (fileType: string): JSX.Element => {
        switch (fileType) {
            case 'pdf':
                return <FileText className="w-5 h-5 text-red-600" />;
            case 'doc':
                return <FileIcon className="w-5 h-5 text-blue-600" />;
            case 'image':
                return <Image className="w-5 h-5 text-purple-600" />;
            default:
                return <FileText className="w-5 h-5 text-gray-600" />;
        }
    };

    // Return interface
    return {
        // Data
        documents,
        filteredDocuments,
        paginatedDocuments,
        documentVersions,
        stats,

        // Search & Filters
        searchQuery,
        setSearchQuery,
        topicFilter,
        setTopicFilter,
        statusFilter,
        setStatusFilter,
        visibilityFilter,
        setVisibilityFilter,
        filterOpen,
        setFilterOpen,

        // Selection
        selectedDocuments,
        handleSelectAll,
        handleSelectDocument,

        // Sorting
        sortColumn,
        sortDirection,
        handleSort,

        // Pagination
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        totalPages,

        // Modals & Drawers
        uploadModalOpen,
        setUploadModalOpen,
        previewDrawerOpen,
        setPreviewDrawerOpen,
        versionHistoryOpen,
        setVersionHistoryOpen,

        // Selected Document
        selectedDocument,
        setSelectedDocument,
        previewTab,
        setPreviewTab,

        // Form Data
        formData,
        setFormData,
        tagInput,
        setTagInput,

        // Handlers
        handlePreview,
        handleEdit,
        handleUploadNew,
        handleSave,
        handleDelete,
        handleStatusChange,
        handleBulkAction,
        handleAddTag,
        handleRemoveTag,

        // Utility Functions
        getStatusBadge,
        getVisibilityIcon,
        getFileTypeIcon,
    };
};
