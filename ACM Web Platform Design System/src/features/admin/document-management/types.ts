export type DocumentStatus = 'published' | 'unpublished' | 'archived';

export type DocumentTopic =
    | 'farming_guide'
    | 'crop_diseases'
    | 'pest_control'
    | 'soil_management'
    | 'irrigation'
    | 'harvest_tips'
    | 'market_prices'
    | 'compliance';

export type DocumentVisibility = 'public' | 'farmer' | 'buyer' | 'internal';

export interface Document {
    id: string;
    title: string;
    description?: string;
    topic: DocumentTopic;
    tags: string[];
    version: string;
    status: DocumentStatus;
    visibility: DocumentVisibility;
    uploadedBy: string;
    updatedAt: string;
    fileType: 'pdf' | 'doc' | 'image';
    fileUrl?: string;
    fileSize?: string;
}

export interface DocumentVersion {
    id: string;
    version: string;
    uploadedBy: string;
    uploadedAt: string;
    changes: string;
}

export interface DocumentFormData {
    title: string;
    description: string;
    topic: DocumentTopic;
    tags: string[];
    visibility: DocumentVisibility;
    file: File | null;
}

export interface FilterState {
    topic: DocumentTopic | 'all';
    status: DocumentStatus | 'all';
    visibility: DocumentVisibility | 'all';
}

export interface DocumentStats {
    total: number;
    published: number;
    unpublished: number;
    archived: number;
}

export interface UseDocumentManagementReturn {
    // Data
    documents: Document[];
    filteredDocuments: Document[];
    paginatedDocuments: Document[];
    documentVersions: DocumentVersion[];
    stats: DocumentStats;

    // Search & Filters
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    topicFilter: DocumentTopic | 'all';
    setTopicFilter: (filter: DocumentTopic | 'all') => void;
    statusFilter: DocumentStatus | 'all';
    setStatusFilter: (filter: DocumentStatus | 'all') => void;
    visibilityFilter: DocumentVisibility | 'all';
    setVisibilityFilter: (filter: DocumentVisibility | 'all') => void;
    filterOpen: boolean;
    setFilterOpen: (open: boolean) => void;

    // Selection
    selectedDocuments: string[];
    handleSelectAll: () => void;
    handleSelectDocument: (id: string) => void;

    // Sorting
    sortColumn: keyof Document;
    sortDirection: 'asc' | 'desc';
    handleSort: (column: keyof Document) => void;

    // Pagination
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    setItemsPerPage: (items: number) => void;
    totalPages: number;

    // Modals & Drawers
    uploadModalOpen: boolean;
    setUploadModalOpen: (open: boolean) => void;
    previewDrawerOpen: boolean;
    setPreviewDrawerOpen: (open: boolean) => void;
    versionHistoryOpen: boolean;
    setVersionHistoryOpen: (open: boolean) => void;

    // Selected Document
    selectedDocument: Document | null;
    setSelectedDocument: (doc: Document | null) => void;
    previewTab: string;
    setPreviewTab: (tab: string) => void;

    // Form Data
    formData: DocumentFormData;
    setFormData: (data: DocumentFormData) => void;
    tagInput: string;
    setTagInput: (input: string) => void;

    // Handlers
    handlePreview: (doc: Document) => void;
    handleEdit: (doc: Document) => void;
    handleUploadNew: () => void;
    handleSave: () => void;
    handleDelete: (id: string) => void;
    handleStatusChange: (id: string, newStatus: DocumentStatus) => void;
    handleBulkAction: (action: string) => void;
    handleAddTag: () => void;
    handleRemoveTag: (tag: string) => void;

    // Utility Functions
    getStatusBadge: (status: DocumentStatus) => string;
    getVisibilityIcon: (visibility: DocumentVisibility) => JSX.Element;
    getFileTypeIcon: (fileType: string) => JSX.Element;
}
