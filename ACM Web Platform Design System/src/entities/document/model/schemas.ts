import { z } from 'zod';

// Document API schema (matches backend DocumentResponse)
export const DocumentSchema = z.object({
    documentId: z.number().int().positive(),
    title: z.string(),
    url: z.string(),
    description: z.string().optional().nullable(),
    crop: z.string().optional().nullable(),
    stage: z.string().optional().nullable(),
    topic: z.string().optional().nullable(),
    isActive: z.boolean().optional().nullable(),
    createdAt: z.string().optional().nullable(),
    updatedAt: z.string().optional().nullable(),
    isFavorited: z.boolean().optional().nullable(),
});

export type Document = z.infer<typeof DocumentSchema>;

// Paginated response schema
export const DocumentPageResponseSchema = z.object({
    items: z.array(DocumentSchema),
    page: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
});

export type DocumentPageResponse = z.infer<typeof DocumentPageResponseSchema>;

// Request schemas for admin
export const DocumentCreateRequestSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title must not exceed 255 characters'),
    url: z.string().url('Must be a valid URL').max(1000, 'URL must not exceed 1000 characters'),
    description: z.string().optional(),
    crop: z.string().max(50).optional(),
    stage: z.string().max(50).optional(),
    topic: z.string().max(50).optional(),
    isActive: z.boolean().optional(),
    isPublic: z.boolean().optional(),
});

export type DocumentCreateRequest = z.infer<typeof DocumentCreateRequestSchema>;

export const DocumentUpdateRequestSchema = DocumentCreateRequestSchema;

export type DocumentUpdateRequest = z.infer<typeof DocumentUpdateRequestSchema>;

// Filter params for list request
export interface DocumentListParams {
    tab?: 'all' | 'favorites' | 'recent';
    q?: string;
    crop?: string;
    stage?: string;
    topic?: string;
    page?: number;
    size?: number;
}
