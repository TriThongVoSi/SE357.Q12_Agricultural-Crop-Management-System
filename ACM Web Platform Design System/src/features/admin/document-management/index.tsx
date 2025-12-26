import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Upload, Send, XCircle, Archive } from 'lucide-react';
import { useDocumentManagement } from './hooks/useDocumentManagement';
import { StatCards } from './components/StatCards';
import { FilterBar } from './components/FilterBar';
import { BulkActionToolbar } from './components/BulkActionToolbar';
import { DocumentTable } from './components/DocumentTable';
import { Pagination } from './components/Pagination';
import { UploadModal } from './components/UploadModal';
import { PreviewDrawer } from './components/PreviewDrawer';
import { VersionHistoryModal } from './components/VersionHistoryModal';
import { TOPIC_LABELS } from './constants';

export const DocumentManagement: React.FC = () => {
    const {
        // Data
        paginatedDocuments,
        filteredDocuments,
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
    } = useDocumentManagement();

    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="mb-1">Document Management</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage knowledge base documents and resources
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {selectedDocuments.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Bulk Actions
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleBulkAction('publish')}>
                                    <Send className="w-4 h-4 mr-2" />
                                    Publish
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleBulkAction('unpublish')}>
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Unpublish
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleBulkAction('archive')}>
                                    <Archive className="w-4 h-4 mr-2" />
                                    Archive
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    <Button className="bg-[#2563EB] hover:bg-[#1E40AF]" onClick={handleUploadNew}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                    </Button>
                </div>
            </div>

            {/* Summary Stats */}
            <StatCards stats={stats} />

            {/* Search and Filter Bar */}
            <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                topicFilter={topicFilter}
                setTopicFilter={setTopicFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                visibilityFilter={visibilityFilter}
                setVisibilityFilter={setVisibilityFilter}
                filterOpen={filterOpen}
                setFilterOpen={setFilterOpen}
            />

            {/* Bulk Action Toolbar */}
            <BulkActionToolbar
                selectedDocuments={selectedDocuments}
                filteredDocuments={filteredDocuments}
                handleSelectAll={handleSelectAll}
                handleBulkAction={handleBulkAction}
            />

            {/* Document List Table with Pagination */}
            <DocumentTable
                documents={paginatedDocuments}
                selectedDocuments={selectedDocuments}
                handleSelectDocument={handleSelectDocument}
                handleSelectAll={handleSelectAll}
                handleSort={handleSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handlePreview={handlePreview}
                handleEdit={handleEdit}
                handleStatusChange={handleStatusChange}
                handleDelete={handleDelete}
                getStatusBadge={getStatusBadge}
                getVisibilityIcon={getVisibilityIcon}
                getFileTypeIcon={getFileTypeIcon}
                allDocumentsCount={filteredDocuments.length}
            />

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                totalItems={filteredDocuments.length}
            />

            {/* Upload/Edit Modal */}
            <UploadModal
                open={uploadModalOpen}
                setOpen={setUploadModalOpen}
                formData={formData}
                setFormData={setFormData}
                tagInput={tagInput}
                setTagInput={setTagInput}
                handleAddTag={handleAddTag}
                handleRemoveTag={handleRemoveTag}
                handleSave={handleSave}
                selectedDocument={selectedDocument}
            />

            {/* Preview Drawer */}
            <PreviewDrawer
                open={previewDrawerOpen}
                setOpen={setPreviewDrawerOpen}
                selectedDocument={selectedDocument}
                previewTab={previewTab}
                setPreviewTab={setPreviewTab}
                documentVersions={documentVersions}
                handleEdit={handleEdit}
                handleStatusChange={handleStatusChange}
                handleDelete={handleDelete}
                getStatusBadge={getStatusBadge}
                getFileTypeIcon={getFileTypeIcon}
                topicLabels={TOPIC_LABELS}
                setVersionHistoryOpen={setVersionHistoryOpen}
            />

            {/* Version History Modal */}
            <VersionHistoryModal
                open={versionHistoryOpen}
                setOpen={setVersionHistoryOpen}
                documentVersions={documentVersions}
                selectedDocument={selectedDocument}
            />
        </div>
    );
};
