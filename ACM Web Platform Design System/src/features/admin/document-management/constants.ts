import { DocumentTopic, Document, DocumentVersion } from './types';

export const TOPIC_LABELS: Record<DocumentTopic, string> = {
    farming_guide: 'Farming Guide',
    crop_diseases: 'Crop Diseases',
    pest_control: 'Pest Control',
    soil_management: 'Soil Management',
    irrigation: 'Irrigation',
    harvest_tips: 'Harvest Tips',
    market_prices: 'Market Prices',
    compliance: 'Compliance',
};

export const STATUS_BADGE_COLORS = {
    published: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
    unpublished: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
    archived: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
};

export const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

export const MOCK_DOCUMENTS: Document[] = [
    {
        id: '1',
        title: 'Organic Farming Best Practices 2025',
        description: 'Comprehensive guide to organic farming methods',
        topic: 'farming_guide',
        tags: ['organic', 'sustainable', 'best-practices'],
        version: 'v2.1',
        status: 'published',
        visibility: 'public',
        uploadedBy: 'Admin User',
        updatedAt: '2025-11-10',
        fileType: 'pdf',
        fileSize: '2.4 MB',
    },
    {
        id: '2',
        title: 'Common Tomato Diseases Identification',
        description: 'Visual guide to identify and treat tomato diseases',
        topic: 'crop_diseases',
        tags: ['tomato', 'diseases', 'identification'],
        version: 'v1.5',
        status: 'published',
        visibility: 'farmer',
        uploadedBy: 'Sarah Miller',
        updatedAt: '2025-11-08',
        fileType: 'pdf',
        fileSize: '5.2 MB',
    },
    {
        id: '3',
        title: 'Integrated Pest Management Strategy',
        description: 'Effective IPM techniques for crop protection',
        topic: 'pest_control',
        tags: ['ipm', 'pest-control', 'prevention'],
        version: 'v1.0',
        status: 'unpublished',
        visibility: 'farmer',
        uploadedBy: 'John Anderson',
        updatedAt: '2025-11-05',
        fileType: 'doc',
        fileSize: '1.8 MB',
    },
    {
        id: '4',
        title: 'Soil pH Testing and Management',
        description: 'Guide to soil testing and pH adjustment',
        topic: 'soil_management',
        tags: ['soil', 'ph-testing', 'nutrients'],
        version: 'v3.0',
        status: 'published',
        visibility: 'public',
        uploadedBy: 'Admin User',
        updatedAt: '2025-11-01',
        fileType: 'pdf',
        fileSize: '3.1 MB',
    },
    {
        id: '5',
        title: 'Drip Irrigation System Installation',
        description: 'Step-by-step guide for drip irrigation setup',
        topic: 'irrigation',
        tags: ['irrigation', 'water-management', 'drip-system'],
        version: 'v2.0',
        status: 'archived',
        visibility: 'farmer',
        uploadedBy: 'David Chen',
        updatedAt: '2025-10-15',
        fileType: 'pdf',
        fileSize: '4.5 MB',
    },
];

export const MOCK_DOCUMENT_VERSIONS: DocumentVersion[] = [
    {
        id: '1',
        version: 'v2.1',
        uploadedBy: 'Admin User',
        uploadedAt: '2025-11-10 14:30',
        changes: 'Updated organic certification requirements',
    },
    {
        id: '2',
        version: 'v2.0',
        uploadedBy: 'Admin User',
        uploadedAt: '2025-10-15 10:20',
        changes: 'Added new section on composting techniques',
    },
    {
        id: '3',
        version: 'v1.0',
        uploadedBy: 'Sarah Miller',
        uploadedAt: '2025-09-01 09:00',
        changes: 'Initial document creation',
    },
];
